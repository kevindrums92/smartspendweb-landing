import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./src/i18n/config";

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle root path: redirect to locale-prefixed version
  // Other paths without locale are handled by dedicated redirect pages
  if (pathname === "/") {
    const preferredLocale = getPreferredLocale(request);
    const newUrl = new URL(`/${preferredLocale}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Only match root path
  matcher: ["/"],
};
