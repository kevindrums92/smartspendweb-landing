import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n/config";
import { updateSession } from "./lib/supabase/middleware";
import {
  validateTrustedDevice,
  TRUSTED_DEVICE_COOKIE_NAME,
} from "./lib/admin/trusted-device";

/**
 * Detect the preferred locale from the Accept-Language header
 */
function getPreferredLocale(request: NextRequest): Locale {
  // Get Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  // Parse Accept-Language header (format: "es-ES,es;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";");
      const quality = qValue ? parseFloat(qValue.split("=")[1]) : 1.0;
      // Extract base language code (e.g., "es" from "es-ES")
      const baseCode = code.split("-")[0].toLowerCase();
      return { code: baseCode, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching supported locale
  for (const { code } of languages) {
    const matchedLocale = locales.find(
      (locale) => locale.toLowerCase() === code
    );
    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return defaultLocale;
}

function getAdminAllowedEmails(): string[] {
  return (process.env.ADMIN_ALLOWED_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ==============================
  // ADMIN API ROUTES - session refresh only (no redirects)
  // ==============================
  if (pathname.startsWith("/api/admin")) {
    const { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  // ==============================
  // ADMIN ROUTE PROTECTION
  // ==============================
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth (redirect to admin if already fully authenticated)
    if (pathname === "/admin/login") {
      try {
        const { user, aal, supabaseResponse } = await updateSession(request);
        if (user) {
          const allowedEmails = getAdminAllowedEmails();
          if (
            user.email &&
            allowedEmails.includes(user.email.toLowerCase())
          ) {
            // Check if MFA is fully resolved before redirecting to admin
            const mfaVerified = aal?.currentLevel === "aal2";
            const trustedCookie = request.cookies.get(TRUSTED_DEVICE_COOKIE_NAME);
            const isTrusted = await validateTrustedDevice(
              trustedCookie?.value,
              user.id
            );

            if (mfaVerified || isTrusted) {
              const url = request.nextUrl.clone();
              url.pathname = "/admin/users";
              return NextResponse.redirect(url);
            }
          }
        }
        return supabaseResponse;
      } catch {
        return NextResponse.next({ request });
      }
    }

    // MFA flow pages — require auth (aal1) but skip MFA enforcement
    if (
      pathname === "/admin/mfa-enroll" ||
      pathname === "/admin/mfa-verify"
    ) {
      try {
        const { user, supabaseResponse } = await updateSession(request);

        if (!user) {
          const url = request.nextUrl.clone();
          url.pathname = "/admin/login";
          return NextResponse.redirect(url);
        }

        const allowedEmails = getAdminAllowedEmails();
        if (
          !user.email ||
          !allowedEmails.includes(user.email.toLowerCase())
        ) {
          const url = request.nextUrl.clone();
          url.pathname = "/admin/login";
          return NextResponse.redirect(url);
        }

        return supabaseResponse;
      } catch {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }
    }

    // All other /admin/* routes require auth + admin email + MFA
    try {
      const { user, aal, supabaseResponse } = await updateSession(request);

      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }

      const allowedEmails = getAdminAllowedEmails();
      if (
        !user.email ||
        !allowedEmails.includes(user.email.toLowerCase())
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
      }

      // MFA enforcement
      if (aal) {
        const needsMfa = aal.nextLevel === "aal2";
        const mfaVerified = aal.currentLevel === "aal2";

        if (needsMfa && !mfaVerified) {
          // Check trusted device cookie
          const trustedCookie = request.cookies.get(TRUSTED_DEVICE_COOKIE_NAME);
          const isTrusted = await validateTrustedDevice(
            trustedCookie?.value,
            user.id
          );

          if (!isTrusted) {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/mfa-verify";
            return NextResponse.redirect(url);
          }
        }

        // No MFA enrolled — force enrollment
        if (aal.nextLevel === "aal1" && aal.currentLevel === "aal1") {
          const url = request.nextUrl.clone();
          url.pathname = "/admin/mfa-enroll";
          return NextResponse.redirect(url);
        }
      }

      return supabaseResponse;
    } catch (error) {
      console.error("[Middleware] Admin auth check failed:", error);
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // ==============================
  // LOCALE REDIRECT (existing)
  // ==============================
  if (pathname === "/") {
    const preferredLocale = getPreferredLocale(request);
    const newUrl = new URL(`/${preferredLocale}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin", "/admin/:path*", "/api/admin/:path*"],
};
