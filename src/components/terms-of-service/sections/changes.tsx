"use client";

import { RefreshCw } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ChangesProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function Changes({ id, isOpen, onToggle }: ChangesProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={RefreshCw}
      title={`9. ${t("termsOfService.sections.changes.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p>
        {t("termsOfService.sections.changes.content")}
      </p>
    </ExpandableSection>
  );
}
