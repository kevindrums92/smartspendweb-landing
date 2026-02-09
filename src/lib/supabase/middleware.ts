import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // Treat auth errors (expired token, invalid session) as no user
    if (error) {
      return { user: null, supabaseResponse, aal: null };
    }

    // Get MFA authenticator assurance level (local operation, reads from JWT)
    const {
      data: aal,
    } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

    return { user, supabaseResponse, aal };
  } catch {
    return { user: null, supabaseResponse, aal: null };
  }
}
