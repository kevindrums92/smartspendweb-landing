import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable:"--font-inter",
});

export const metadata: Metadata = {
  title: "SmartSpend - Control de Gastos Offline y 100% Privado",
  description: "La herramienta definitiva de presupuesto Local-First para iOS y Android. Tu dinero, tus reglas. Sin conexión y 100% Privado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
