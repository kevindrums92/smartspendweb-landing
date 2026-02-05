import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import { TermsOfServiceContent } from "@/components/terms-of-service";

export const metadata: Metadata = {
  title: "Terms of Service - SmartSpend",
  description: "Review SmartSpend's terms of service, user agreements, and acceptable use policy. Understand your rights and responsibilities when using our personal finance management app.",
  keywords: ["terms of service", "user agreement", "acceptable use", "legal terms", "service agreement"],
  openGraph: {
    title: "Terms of Service - SmartSpend",
    description: "Review SmartSpend's terms of service and user agreements.",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <TermsOfServiceContent />
      <Footer />
    </main>
  );
}
