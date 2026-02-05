"use client";

import { Users } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface UserAccountsProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function UserAccounts({ id, isOpen, onToggle }: UserAccountsProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={Users}
      title={`3. ${t("termsOfService.sections.accounts.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p className="mb-4">{t("termsOfService.sections.accounts.intro")}</p>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-card-foreground mb-2">{t("termsOfService.sections.accounts.guest.title")}</h3>
          <p>{t("termsOfService.sections.accounts.guest.description")}</p>
        </div>

        <div>
          <h3 className="font-semibold text-card-foreground mb-2">{t("termsOfService.sections.accounts.cloud.title")}</h3>
          <p>{t("termsOfService.sections.accounts.cloud.description")}</p>
        </div>
      </div>
    </ExpandableSection>
  );
}
