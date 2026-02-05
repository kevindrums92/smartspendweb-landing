"use client";

import { Eye } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface DataUsageProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DataUsage({ isOpen, onToggle }: DataUsageProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="data-usage"
      icon={Eye}
      title={t("privacyPolicy.sections.dataUsage.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>{t("privacyPolicy.sections.dataUsage.intro")}</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.dataUsage.coreFunctionality.title")}</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>{t("privacyPolicy.sections.dataUsage.coreFunctionality.items.0")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.coreFunctionality.items.1")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.coreFunctionality.items.2")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.coreFunctionality.items.3")}</li>
            </ul>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.dataUsage.improvement.title")}</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>{t("privacyPolicy.sections.dataUsage.improvement.items.0")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.improvement.items.1")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.improvement.items.2")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.improvement.items.3")}</li>
            </ul>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.dataUsage.security.title")}</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>{t("privacyPolicy.sections.dataUsage.security.items.0")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.security.items.1")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.security.items.2")}</li>
            </ul>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.dataUsage.support.title")}</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>{t("privacyPolicy.sections.dataUsage.support.items.0")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.support.items.1")}</li>
              <li>{t("privacyPolicy.sections.dataUsage.support.items.2")}</li>
            </ul>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
          <p className="text-sm text-amber-800 dark:text-amber-200" dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.dataUsage.weDoNot") }} />
        </div>
      </div>
    </ExpandableSection>
  );
}
