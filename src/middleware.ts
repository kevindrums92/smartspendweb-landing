import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./i18n/config";
import { updateSession } from "./lib/supabase/middleware";

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
    // Allow login page without auth
    if (pathname === "/admin/login") {
      try {
        const { user, supabaseResponse } = await updateSession(request);
        if (user) {
          const allowedEmails = getAdminAllowedEmails();
          if (
            user.email &&
            allowedEmails.includes(user.email.toLowerCase())
          ) {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/users";
            return NextResponse.redirect(url);
          }
        }
        return supabaseResponse;
      } catch {
        // If session check fails, just show login page
        return NextResponse.next({ request });
      }
    }

    // All other /admin/* routes require auth + admin email
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
