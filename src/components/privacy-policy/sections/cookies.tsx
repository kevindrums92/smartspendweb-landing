"use client";

import { Cookie } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface CookiesProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Cookies({ isOpen, onToggle }: CookiesProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="cookies"
      icon={Cookie}
      title={t("privacyPolicy.sections.cookies.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">{t("privacyPolicy.sections.cookies.mobileApp.title")}</h4>
        <p>
          {t("privacyPolicy.sections.cookies.mobileApp.content")}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>{t("privacyPolicy.sections.cookies.mobileApp.items.0")}</li>
          <li>{t("privacyPolicy.sections.cookies.mobileApp.items.1")}</li>
          <li>{t("privacyPolicy.sections.cookies.mobileApp.items.2")}</li>
        </ul>

        <h4 className="font-medium text-foreground mt-6">{t("privacyPolicy.sections.cookies.website.title")}</h4>
        <p>
          {t("privacyPolicy.sections.cookies.website.content")}
        </p>

        <div className="bg-accent/50 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.cookies.types.title")}</h4>
          <ul className="text-sm space-y-2">
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.cookies.types.essential") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.cookies.types.analytics") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.cookies.types.preferences") }} />
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}
