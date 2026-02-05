"use client";

import { Baby } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ChildrenPrivacyProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChildrenPrivacy({ isOpen, onToggle }: ChildrenPrivacyProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="children"
      icon={Baby}
      title={t("privacyPolicy.sections.children.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          {t("privacyPolicy.sections.children.intro")}
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
            {t("privacyPolicy.sections.children.parentalNotice.title")}
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t("privacyPolicy.sections.children.parentalNotice.content")}
          </p>
        </div>

        <p>
          {t("privacyPolicy.sections.children.compliance.intro")}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>{t("privacyPolicy.sections.children.compliance.items.0")}</li>
          <li>{t("privacyPolicy.sections.children.compliance.items.1")}</li>
          <li>{t("privacyPolicy.sections.children.compliance.items.2")}</li>
        </ul>
      </div>
    </ExpandableSection>
  );
}
