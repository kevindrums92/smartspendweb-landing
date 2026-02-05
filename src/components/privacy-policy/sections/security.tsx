"use client";

import { Lock, Fingerprint, Key, Shield } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface SecurityProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Security({ isOpen, onToggle }: SecurityProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="security"
      icon={Lock}
      title={t("privacyPolicy.sections.security.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          {t("privacyPolicy.sections.security.intro")}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.security.localEncryption.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.security.localEncryption.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.security.biometric.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.security.biometric.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.security.secureBackups.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.security.secureBackups.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.security.noServerStorage.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.security.noServerStorage.content")}
            </p>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">{t("privacyPolicy.sections.security.limitations.title")}</h4>
          <p className="text-sm text-red-800 dark:text-red-200">
            {t("privacyPolicy.sections.security.limitations.content")}
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
