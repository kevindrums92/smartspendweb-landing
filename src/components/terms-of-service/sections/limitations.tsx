"use client";

import { AlertTriangle } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface LimitationsProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function Limitations({ id, isOpen, onToggle }: LimitationsProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={AlertTriangle}
      title={`7. ${t("termsOfService.sections.limitations.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p>
        {t("termsOfService.sections.limitations.content")}
      </p>
    </ExpandableSection>
  );
}
