"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/i18n-context";
import {
  Shield,
  Calendar,
  FileText,
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

function TableOfContents({ sections, onNavigate, tocTitle }: { sections: { id: string; title: string }[]; onNavigate: (id: string) => void; tocTitle: string }) {
  return (
    <nav className="bg-card border border-border rounded-xl p-6 sticky top-24" aria-label="Table of contents">
      <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
        {tocTitle}
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
  const { t, locale } = useI18n();
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
    { id: "company-info", title: t("privacyPolicy.sections.companyInfo.title") },
    { id: "data-collection", title: t("privacyPolicy.sections.dataCollection.title") },
    { id: "data-usage", title: t("privacyPolicy.sections.dataUsage.title") },
    { id: "third-parties", title: t("privacyPolicy.sections.thirdParties.title") },
    { id: "user-rights", title: t("privacyPolicy.sections.userRights.title") },
    { id: "retention", title: t("privacyPolicy.sections.retention.title") },
    { id: "security", title: t("privacyPolicy.sections.security.title") },
    { id: "international", title: t("privacyPolicy.sections.international.title") },
    { id: "cookies", title: t("privacyPolicy.sections.cookies.title") },
    { id: "children", title: t("privacyPolicy.sections.children.title") },
    { id: "contact", title: t("privacyPolicy.sections.contact.title") },
  ];

  return (
    <div className="pt-20 pb-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">{t("privacyPolicy.header.badge")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("privacyPolicy.header.title")}
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            {t("privacyPolicy.header.subtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {t("privacyPolicy.header.lastUpdated")}: {lastUpdated}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{t("privacyPolicy.header.effectiveDate")}: {effectiveDate}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <TableOfContents sections={sections} onNavigate={openSection} tocTitle={t("privacyPolicy.toc.title")} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-foreground leading-relaxed">
                {t("privacyPolicy.intro")}
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
                {t("privacyPolicy.changesNotice.title")}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {t("privacyPolicy.changesNotice.content")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
