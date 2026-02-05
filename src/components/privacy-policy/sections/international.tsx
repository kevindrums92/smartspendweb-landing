"use client";

import { Globe } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface InternationalProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function International({ isOpen, onToggle }: InternationalProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="international"
      icon={Globe}
      title={t("privacyPolicy.sections.international.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          {t("privacyPolicy.sections.international.intro")}
        </p>

        <div className="space-y-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.international.gdpr.title")}</h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.international.gdpr.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.international.ccpa.title")}</h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.international.ccpa.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.international.lgpd.title")}</h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.international.lgpd.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">{t("privacyPolicy.sections.international.other.title")}</h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.international.other.content")}
            </p>
          </div>
        </div>

        <p className="text-sm">
          {t("privacyPolicy.sections.international.contact")}
        </p>
      </div>
    </ExpandableSection>
  );
}
