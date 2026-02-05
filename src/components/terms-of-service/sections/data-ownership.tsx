"use client";

import { Database } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface DataOwnershipProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function DataOwnership({ id, isOpen, onToggle }: DataOwnershipProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={Database}
      title={`5. ${t("termsOfService.sections.ownership.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p>
        {t("termsOfService.sections.ownership.content")}
      </p>
    </ExpandableSection>
  );
}
