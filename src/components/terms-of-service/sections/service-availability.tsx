"use client";

import { Server } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ServiceAvailabilityProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function ServiceAvailability({ id, isOpen, onToggle }: ServiceAvailabilityProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={Server}
      title={`8. ${t("termsOfService.sections.availability.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p>
        {t("termsOfService.sections.availability.content")}
      </p>
    </ExpandableSection>
  );
}
