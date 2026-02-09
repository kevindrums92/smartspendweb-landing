import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  validateTrustedDevice,
  TRUSTED_DEVICE_COOKIE_NAME,
} from "@/lib/admin/trusted-device";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: "Credenciales invalidas" },
        { status: 401 }
      );
    }

    // Verify the user is an allowed admin
    const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (
      !data.user.email ||
      !allowedEmails.includes(data.user.email.toLowerCase())
    ) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: "No tienes permisos de administrador" },
        { status: 403 }
      );
    }

    // Check MFA status
    const { data: factorsData } = await supabase.auth.mfa.listFactors();
    const verifiedTotp = factorsData?.totp?.filter(
      (f) => f.status === "verified"
    ) || [];

    if (verifiedTotp.length === 0) {
      // No MFA enrolled — require enrollment
      return NextResponse.json({
        success: true,
        mfa: "enroll",
      });
    }

    // MFA is enrolled — check trusted device cookie
    const trustedCookie = request.cookies.get(TRUSTED_DEVICE_COOKIE_NAME);
    const isTrusted = await validateTrustedDevice(
      trustedCookie?.value,
      data.user.id
    );

    if (isTrusted) {
      return NextResponse.json({
        success: true,
        mfa: "none",
      });
    }

    // MFA enrolled but device not trusted — require verification
    return NextResponse.json({
      success: true,
      mfa: "verify",
      factorId: verifiedTotp[0].id,
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
