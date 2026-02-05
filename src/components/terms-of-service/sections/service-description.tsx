"use client";

import { Smartphone } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ServiceDescriptionProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function ServiceDescription({ id, isOpen, onToggle }: ServiceDescriptionProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={Smartphone}
      title={`2. ${t("termsOfService.sections.service.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p className="mb-4">{t("termsOfService.sections.service.intro")}</p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>{t("termsOfService.sections.service.features.tracking")}</li>
        <li>{t("termsOfService.sections.service.features.categories")}</li>
        <li>{t("termsOfService.sections.service.features.statistics")}</li>
        <li>{t("termsOfService.sections.service.features.sync")}</li>
        <li>{t("termsOfService.sections.service.features.guest")}</li>
        <li>{t("termsOfService.sections.service.features.backup")}</li>
      </ul>
    </ExpandableSection>
  );
}
