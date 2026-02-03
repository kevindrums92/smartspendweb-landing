import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

/**
 * Detect preferred locale from Accept-Language header
 */
function getPreferredLocale(acceptLanguage: string | null): Locale {
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

export default async function PrivacyPolicyRedirect() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const preferredLocale = getPreferredLocale(acceptLanguage);

  redirect(`/${preferredLocale}/privacy-policy`);
}
