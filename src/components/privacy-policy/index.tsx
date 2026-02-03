"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/i18n-context";
import {
  Shield,
  Calendar,
  FileText,
  Mail,
} from "lucide-react";
import { CompanyInfo } from "./sections/company-info";
import { DataCollection } from "./sections/data-collection";
import { DataUsage } from "./sections/data-usage";
import { ThirdParty } from "./sections/third-party";
import { UserRights } from "./sections/user-rights";
import { DataRetention } from "./sections/data-retention";
import { Security } from "./sections/security";
import { International } from "./sections/international";
import { Cookies } from "./sections/cookies";
import { ChildrenPrivacy } from "./sections/children-privacy";
import { Contact } from "./sections/contact";

function TableOfContents({ sections, onNavigate }: { sections: { id: string; title: string }[]; onNavigate: (id: string) => void }) {
  return (
    <nav className="bg-card border border-border rounded-xl p-6 sticky top-24" aria-label="Table of contents">
      <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
        Contents
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onNavigate(section.id)}
              className="text-sm text-muted hover:text-primary transition-colors text-left w-full py-1"
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PrivacyPolicyContent() {
  // TODO: Translate privacy policy content (see Task #4 - Refactorizar Privacy Policy Component)
  const { locale } = useI18n();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "company-info": true,
    "data-collection": true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: true }));
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const lastUpdated = "February 3, 2026";
  const effectiveDate = "February 3, 2026";

  const sections = [
    { id: "company-info", title: "Company & App Information" },
    { id: "data-collection", title: "Data We Collect" },
    { id: "data-usage", title: "How We Use Your Data" },
    { id: "third-parties", title: "Third-Party Services" },
    { id: "user-rights", title: "Your Rights & Controls" },
    { id: "retention", title: "Data Retention & Deletion" },
    { id: "security", title: "Security Measures" },
    { id: "international", title: "International Data Transfers" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "children", title: "Children's Privacy" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">Legal Document</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Your privacy is our absolute priority. This policy explains how we collect, use, protect, and handle your information when you use SmartSpend.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Last Updated: {lastUpdated}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Effective Date: {effectiveDate}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <TableOfContents sections={sections} onNavigate={openSection} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-foreground leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the SmartSpend mobile application and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Section 1: Company & App Information */}
            <CompanyInfo
              isOpen={openSections["company-info"]}
              onToggle={() => toggleSection("company-info")}
            />

            {/* Section 2: Data Collection */}
            <DataCollection
              isOpen={openSections["data-collection"]}
              onToggle={() => toggleSection("data-collection")}
            />

            {/* Section 3: Data Usage */}
            <DataUsage
              isOpen={openSections["data-usage"]}
              onToggle={() => toggleSection("data-usage")}
            />

            {/* Section 4: Third-Party Services */}
            <ThirdParty
              isOpen={openSections["third-parties"]}
              onToggle={() => toggleSection("third-parties")}
            />

            {/* Section 5: User Rights */}
            <UserRights
              isOpen={openSections["user-rights"]}
              onToggle={() => toggleSection("user-rights")}
            />

            {/* Section 6: Data Retention */}
            <DataRetention
              isOpen={openSections["retention"]}
              onToggle={() => toggleSection("retention")}
            />

            {/* Section 7: Security */}
            <Security
              isOpen={openSections["security"]}
              onToggle={() => toggleSection("security")}
            />

            {/* Section 8: International Transfers */}
            <International
              isOpen={openSections["international"]}
              onToggle={() => toggleSection("international")}
            />

            {/* Section 9: Cookies & Tracking */}
            <Cookies
              isOpen={openSections["cookies"]}
              onToggle={() => toggleSection("cookies")}
            />

            {/* Section 10: Children's Privacy */}
            <ChildrenPrivacy
              isOpen={openSections["children"]}
              onToggle={() => toggleSection("children")}
            />

            {/* Section 11: Contact */}
            <Contact
              isOpen={openSections["contact"]}
              onToggle={() => toggleSection("contact")}
              locale={locale}
            />

            {/* Policy Updates Notice */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                Changes to This Privacy Policy
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                For significant changes, we will provide a more prominent notice (including, for certain services,
                email notification of Privacy Policy changes). You are advised to review this Privacy Policy
                periodically for any changes.
              </p>
            </div>

            {/* Legal Documents Links */}
            <div className="flex flex-wrap gap-4 justify-center mt-8 pt-8 border-t border-border">
              <a
                href="#"
                className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Terms of Service
              </a>
              <span className="text-border">|</span>
              <a
                href="#"
                className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Privacy Policy
              </a>
              <span className="text-border">|</span>
              <a
                href={`/${locale}/contacto`}
                className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
