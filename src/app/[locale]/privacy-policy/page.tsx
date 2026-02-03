import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import { PrivacyPolicyContent } from "@/components/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy - SmartSpend",
  description: "Learn how SmartSpend protects your privacy. Our comprehensive privacy policy details data collection, usage, storage, and your rights under GDPR, CCPA, and other privacy regulations.",
  keywords: ["privacy policy", "data protection", "GDPR", "CCPA", "privacy rights", "data security"],
  openGraph: {
    title: "Privacy Policy - SmartSpend",
    description: "Learn how SmartSpend protects your privacy and handles your data.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PrivacyPolicyContent />
      <Footer />
    </main>
  );
}
