import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createTrustedDeviceCookie } from "@/lib/admin/trusted-device";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { factorId, code } = body;

    if (!factorId || !code) {
      return NextResponse.json(
        { error: "Factor ID y codigo son requeridos" },
        { status: 400 }
      );
    }

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

    // Create a challenge for this factor
    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId });

    if (challengeError) {
      console.error("[MFA Verify] Challenge error:", challengeError.message);
      return NextResponse.json(
        { error: "Error al crear desafio MFA" },
        { status: 500 }
      );
    }

    // Verify the TOTP code
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code,
    });

    if (verifyError) {
      console.error("[MFA Verify] Verify error:", verifyError.message);
      return NextResponse.json(
        { error: "Codigo incorrecto. Intenta de nuevo." },
        { status: 400 }
      );
    }

    // Set trusted device cookie
    const cookie = await createTrustedDeviceCookie(user.id);
    const response = NextResponse.json({ success: true });
    response.cookies.set(cookie.name, cookie.value, cookie.options);

    return response;
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
