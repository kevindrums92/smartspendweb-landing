import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
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

    const { data, error } = await supabase.auth.mfa.listFactors();

    if (error) {
      console.error("[MFA Factors] Error:", error.message);
      return NextResponse.json(
        { error: "Error al obtener factores MFA" },
        { status: 500 }
      );
    }

    // Return only verified TOTP factors
    const verifiedTotp = data.totp.filter(
      (f) => f.status === "verified"
    );

    return NextResponse.json({ factors: verifiedTotp });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
