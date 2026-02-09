import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: "SmartSpend Admin",
    });

    if (error) {
      console.error("[MFA Enroll] Error:", error.message);
      return NextResponse.json(
        { error: "Error al configurar 2FA" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      factorId: data.id,
      qr: data.totp.qr_code,
      uri: data.totp.uri,
      secret: data.totp.secret,
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
