import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { giftSubscriptionSchema } from "@/lib/admin/schemas";
import { PRODUCT_MAP, type GiftDuration } from "@/lib/admin/types";

function getAdminEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function calculateExpiresAt(duration: GiftDuration): string | null {
  if (duration === "lifetime") return null;

  const now = new Date();
  if (duration === "monthly") {
    now.setDate(now.getDate() + 30);
  } else if (duration === "annual") {
    now.setDate(now.getDate() + 365);
  }
  return now.toISOString();
}

export async function POST(request: Request) {
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

  try {
    const body = await request.json();
    const parsed = giftSubscriptionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos invalidos" },
        { status: 400 }
      );
    }

    const { userId, duration } = parsed.data;
    const productId = PRODUCT_MAP[duration];
    const expiresAt = calculateExpiresAt(duration);
    const now = new Date().toISOString();
    const eventId = `admin-gift-${Date.now()}`;

    const admin = createAdminClient();

    // Verify user exists
    const { data: targetUser, error: userError } =
      await admin.auth.admin.getUserById(userId);

    if (userError || !targetUser.user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Upsert subscription
    const { data: subscription, error: subError } = await admin
      .from("user_subscriptions")
      .upsert(
        {
          user_id: userId,
          product_id: productId,
          entitlement_ids: ["pro"],
          original_transaction_id: null,
          status: "active",
          period_type: "normal",
          purchased_at: now,
          expires_at: expiresAt,
          billing_issue_detected_at: null,
          environment: "PRODUCTION",
          last_event_id: eventId,
          updated_at: now,
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (subError) {
      console.error("[GiftSubscription] Upsert error:", subError);
      return NextResponse.json(
        { error: "Error al crear la suscripcion" },
        { status: 500 }
      );
    }

    // Log to revenuecat_events for audit trail
    await admin.from("revenuecat_events").insert({
      event_id: eventId,
      event_type: "ADMIN_GIFT",
      user_id: userId,
      payload: {
        admin_email: user.email,
        duration,
        product_id: productId,
        gifted_at: now,
        target_email: targetUser.user.email || null,
      },
      processed_at: now,
    });

    return NextResponse.json({ success: true, subscription });
  } catch (err) {
    console.error("[GiftSubscription] Error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
