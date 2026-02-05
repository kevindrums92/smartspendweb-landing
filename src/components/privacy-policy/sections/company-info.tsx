"use client";

import { Server } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface CompanyInfoProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function CompanyInfo({ isOpen, onToggle }: CompanyInfoProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="company-info"
      icon={Server}
      title={t("privacyPolicy.sections.companyInfo.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.companyInfo.appName")}</h4>
            <p className="text-sm">SmartSpend</p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.companyInfo.developer")}</h4>
            <p className="text-sm">SmartSpend Team</p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.companyInfo.platform")}</h4>
            <p className="text-sm">iOS (App Store) & Android (Google Play)</p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.companyInfo.category")}</h4>
            <p className="text-sm">Finance / Budget & Expense Tracking</p>
          </div>
        </div>
        <p>
          {t("privacyPolicy.sections.companyInfo.description")}
        </p>
      </div>
    </ExpandableSection>
  );
}
