"use client";

import { ShieldCheck } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface AcceptableUseProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function AcceptableUse({ id, isOpen, onToggle }: AcceptableUseProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={ShieldCheck}
      title={`6. ${t("termsOfService.sections.acceptableUse.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p className="mb-4">{t("termsOfService.sections.acceptableUse.intro")}</p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>{t("termsOfService.sections.acceptableUse.rules.legal")}</li>
        <li>{t("termsOfService.sections.acceptableUse.rules.access")}</li>
        <li>{t("termsOfService.sections.acceptableUse.rules.modify")}</li>
        <li>{t("termsOfService.sections.acceptableUse.rules.damage")}</li>
      </ul>
    </ExpandableSection>
  );
}
