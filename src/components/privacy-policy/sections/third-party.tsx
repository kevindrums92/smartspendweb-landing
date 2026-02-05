"use client";

import { Cloud, BarChart3, CreditCard, Smartphone, ExternalLink } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ThirdPartyProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ThirdParty({ isOpen, onToggle }: ThirdPartyProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="third-parties"
      icon={Cloud}
      title={t("privacyPolicy.sections.thirdParties.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <p>
          {t("privacyPolicy.sections.thirdParties.intro")}
        </p>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.thirdParties.analytics.title")}
          </h4>
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-medium">{t("privacyPolicy.sections.thirdParties.analytics.provider")}</p>
            <p className="text-sm mt-1">
              {t("privacyPolicy.sections.thirdParties.analytics.description")}
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
            >
              {t("privacyPolicy.sections.thirdParties.analytics.link")} <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.thirdParties.payments.title")}
          </h4>
          <p className="text-sm">
            {t("privacyPolicy.sections.thirdParties.payments.content")}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.thirdParties.cloudBackup.title")}
          </h4>
          <p className="text-sm">
            {t("privacyPolicy.sections.thirdParties.cloudBackup.content")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2 text-sm">
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.thirdParties.cloudBackup.items.0") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.thirdParties.cloudBackup.items.1") }} />
          </ul>
          <p className="text-sm mt-2 italic">
            {t("privacyPolicy.sections.thirdParties.cloudBackup.note")}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.thirdParties.platformServices.title")}
          </h4>
          <p className="text-sm">
            {t("privacyPolicy.sections.thirdParties.platformServices.content")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2 text-sm">
            <li>{t("privacyPolicy.sections.thirdParties.platformServices.items.0")}</li>
            <li>{t("privacyPolicy.sections.thirdParties.platformServices.items.1")}</li>
            <li>{t("privacyPolicy.sections.thirdParties.platformServices.items.2")}</li>
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}
