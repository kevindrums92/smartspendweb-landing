import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import type { AdminUser, AdminSubscription } from "@/lib/admin/types";

interface AuthUserData {
  id: string;
  email?: string;
  is_anonymous?: boolean;
  created_at: string;
  last_sign_in_at?: string;
  raw_user_meta_data?: Record<string, string>;
}

interface UserStateLite {
  user_id: string;
  updated_at: string;
}

interface UserStateFull {
  user_id: string;
  state: { transactions?: unknown[] };
}

function getAdminEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function GET(request: NextRequest) {
  // Verify admin session
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user?.email ||
    !getAdminEmails().includes(user.email.toLowerCase())
  ) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "all";

  const admin = createAdminClient();

  // Fetch ALL users in one call (max 1000 — enough for current scale)
  const { data: usersData, error: usersError } =
    await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (usersError) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }

  const allUsers = (usersData.users || []) as AuthUserData[];
  const allUserIds = allUsers.map((u) => u.id);

  // Fetch LIGHTWEIGHT data for ALL users in parallel:
  // - user_state: only user_id + updated_at (NO heavy state JSON)
  // - user_subscriptions: full rows (small)
  let allSubscriptions: AdminSubscription[] = [];
  let allSyncDates: UserStateLite[] = [];

  if (allUserIds.length > 0) {
    const [subsResult, syncResult] = await Promise.all([
      admin
        .from("user_subscriptions")
        .select("*")
        .in("user_id", allUserIds),
      admin
        .from("user_state")
        .select("user_id, updated_at")
        .in("user_id", allUserIds),
    ]);

    allSubscriptions = (subsResult.data as AdminSubscription[]) || [];
    allSyncDates = (syncResult.data as UserStateLite[]) || [];
  }

  const subsMap = new Map(allSubscriptions.map((s) => [s.user_id, s]));
  const syncMap = new Map(allSyncDates.map((s) => [s.user_id, s.updated_at]));

  // Build enriched list (without transaction counts yet)
  let enrichedUsers: AdminUser[] = allUsers.map((u) => ({
    id: u.id,
    email: u.email || null,
    is_anonymous: u.is_anonymous || false,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at || null,
    subscription: subsMap.get(u.id) || null,
    total_transactions: null,
    last_sync: syncMap.get(u.id) || null,
    full_name: u.raw_user_meta_data?.full_name || null,
  }));

  // Filter by type
  if (filter === "authenticated") {
    enrichedUsers = enrichedUsers.filter((u) => !u.is_anonymous);
  } else if (filter === "anonymous") {
    enrichedUsers = enrichedUsers.filter((u) => u.is_anonymous);
  }

  // Filter by search (email or ID)
  if (search) {
    const searchLower = search.toLowerCase();
    enrichedUsers = enrichedUsers.filter(
      (u) =>
        u.email?.toLowerCase().includes(searchLower) ||
        u.id.toLowerCase().includes(searchLower)
    );
  }

  // Sort by last_sync descending (most recent first, nulls last)
  enrichedUsers.sort((a, b) => {
    if (!a.last_sync && !b.last_sync) return 0;
    if (!a.last_sync) return 1;
    if (!b.last_sync) return -1;
    return new Date(b.last_sync).getTime() - new Date(a.last_sync).getTime();
  });

  // Paginate
  const total = enrichedUsers.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedUsers = enrichedUsers.slice(offset, offset + limit);

  // Now fetch transaction counts ONLY for the current page (max 20 users)
  const pageUserIds = paginatedUsers.map((u) => u.id);
  if (pageUserIds.length > 0) {
    const { data: stateData } = await admin
      .from("user_state")
      .select("user_id, state")
      .in("user_id", pageUserIds);

    if (stateData) {
      const txMap = new Map<string, number>();
      for (const row of stateData as UserStateFull[]) {
        const txs = row.state?.transactions;
        txMap.set(row.user_id, Array.isArray(txs) ? txs.length : 0);
      }
      for (const u of paginatedUsers) {
        u.total_transactions = txMap.get(u.id) ?? null;
      }
    }
  }

  return NextResponse.json({
    data: paginatedUsers,
    total,
    page,
    totalPages,
  });
}
