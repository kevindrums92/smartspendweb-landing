"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/i18n-context";
import {
  FileText,
  Calendar,
  Mail,
} from "lucide-react";
import { Introduction } from "./sections/introduction";
import { ServiceDescription } from "./sections/service-description";
import { UserAccounts } from "./sections/user-accounts";
import { SubscriptionsPayments } from "./sections/subscriptions-payments";
import { DataOwnership } from "./sections/data-ownership";
import { AcceptableUse } from "./sections/acceptable-use";
import { Limitations } from "./sections/limitations";
import { ServiceAvailability } from "./sections/service-availability";
import { Changes } from "./sections/changes";
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

export function TermsOfServiceContent() {
  const { t } = useI18n();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "introduction": true,
    "service": true,
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

  const lastUpdated = "February 5, 2026";
  const effectiveDate = "February 1, 2026";

  const sections = [
    { id: "introduction", title: t("termsOfService.sections.introduction.title") },
    { id: "service", title: t("termsOfService.sections.service.title") },
    { id: "accounts", title: t("termsOfService.sections.accounts.title") },
    { id: "subscriptions", title: t("termsOfService.sections.subscriptions.title") },
    { id: "ownership", title: t("termsOfService.sections.ownership.title") },
    { id: "acceptable-use", title: t("termsOfService.sections.acceptableUse.title") },
    { id: "limitations", title: t("termsOfService.sections.limitations.title") },
    { id: "availability", title: t("termsOfService.sections.availability.title") },
    { id: "changes", title: t("termsOfService.sections.changes.title") },
    { id: "contact", title: t("termsOfService.sections.contact.title") },
  ];

  return (
    <div className="pt-20 pb-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">{t("termsOfService.header.badge")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("termsOfService.header.title")}
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            {t("termsOfService.header.subtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {t("termsOfService.header.lastUpdated")}: <time dateTime={lastUpdated}>{lastUpdated}</time>
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              {t("termsOfService.header.effectiveDate")}: <time dateTime={effectiveDate}>{effectiveDate}</time>
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="hidden lg:block lg:col-span-3">
            <TableOfContents sections={sections} onNavigate={openSection} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              <Introduction id="introduction" isOpen={openSections["introduction"]} onToggle={toggleSection} />
              <ServiceDescription id="service" isOpen={openSections["service"]} onToggle={toggleSection} />
              <UserAccounts id="accounts" isOpen={openSections["accounts"]} onToggle={toggleSection} />
              <SubscriptionsPayments id="subscriptions" isOpen={openSections["subscriptions"]} onToggle={toggleSection} />
              <DataOwnership id="ownership" isOpen={openSections["ownership"]} onToggle={toggleSection} />
              <AcceptableUse id="acceptable-use" isOpen={openSections["acceptable-use"]} onToggle={toggleSection} />
              <Limitations id="limitations" isOpen={openSections["limitations"]} onToggle={toggleSection} />
              <ServiceAvailability id="availability" isOpen={openSections["availability"]} onToggle={toggleSection} />
              <Changes id="changes" isOpen={openSections["changes"]} onToggle={toggleSection} />
              <Contact id="contact" isOpen={openSections["contact"]} onToggle={toggleSection} />
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-card border border-border rounded-xl p-8 text-center">
          <Mail className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">{t("termsOfService.cta.title")}</h2>
          <p className="text-muted mb-6">
            {t("termsOfService.cta.description")}
          </p>
          <a
            href="mailto:support@jotatech.org"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            {t("termsOfService.cta.button")}
          </a>
        </div>
      </div>
    </div>
  );
}
