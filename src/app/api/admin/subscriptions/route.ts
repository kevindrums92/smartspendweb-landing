import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import type { AdminSubscription } from "@/lib/admin/types";

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
  const status = searchParams.get("status") || "all";

  const admin = createAdminClient();
  const offset = (page - 1) * limit;

  // Build query
  let query = admin
    .from("user_subscriptions")
    .select("*", { count: "exact" })
    .order("updated_at", { ascending: false });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, count, error } = await query.range(
    offset,
    offset + limit - 1
  );

  if (error) {
    return NextResponse.json(
      { error: "Error al obtener suscripciones" },
      { status: 500 }
    );
  }

  const subscriptions = (data as AdminSubscription[]) || [];
  const total = count || 0;

  // Enrich with user emails — fetch ALL in parallel (not sequential)
  const uniqueUserIds = [...new Set(subscriptions.map((s) => s.user_id))];

  const userResults = await Promise.all(
    uniqueUserIds.map((id) =>
      admin.auth.admin.getUserById(id).catch(() => ({ data: { user: null } }))
    )
  );

  const emailMap = new Map<string, string | null>();
  for (let i = 0; i < uniqueUserIds.length; i++) {
    const u = userResults[i]?.data?.user;
    emailMap.set(uniqueUserIds[i], u?.email || null);
  }

  const enriched = subscriptions.map((s) => ({
    ...s,
    user_email: emailMap.get(s.user_id) || null,
  }));

  return NextResponse.json({
    data: enriched,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
