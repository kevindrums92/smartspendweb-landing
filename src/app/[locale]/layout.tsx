import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n/i18n-context";
import { locales, type Locale } from "@/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable:"--font-inter",
});

export async function generateMetadata({ params }: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Load translations for the current locale using require to bypass webpack issues
  const messagesModule = await import(`../../../messages/${locale}.json`);
  const messages = messagesModule.default || messagesModule;

  // Map locale to Open Graph locale format
  const ogLocaleMap: Record<string, string> = {
    es: "es_ES",
    en: "en_US",
    pt: "pt_BR",
    fr: "fr_FR",
  };

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords: messages.metadata.keywords || [],
    authors: [{ name: "SmartSpend" }],
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.description,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      siteName: "SmartSpend",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider initialLocale={locale as Locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
