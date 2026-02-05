"use client";

import { FileText } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface IntroductionProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function Introduction({ id, isOpen, onToggle }: IntroductionProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={FileText}
      title={`1. ${t("termsOfService.sections.introduction.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p>
        {t("termsOfService.sections.introduction.content")}
      </p>
    </ExpandableSection>
  );
}
