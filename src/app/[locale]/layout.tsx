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

export const metadata: Metadata = {
  title: "SmartSpend - Control de Gastos Offline y 100% Privado",
  description: "La herramienta definitiva de presupuesto Local-First para iOS y Android. Tu dinero, tus reglas. Sin conexión y 100% Privado.",
  keywords: ["control de gastos", "app de finanzas offline", "presupuesto personal local-first", "finanzas personales", "app de presupuesto"],
  authors: [{ name: "SmartSpend" }],
  openGraph: {
    title: "SmartSpend - Control de Gastos Offline",
    description: "La herramienta definitiva de presupuesto Local-First para iOS y Android.",
    type: "website",
    locale: "es_CO",
  },
};

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
