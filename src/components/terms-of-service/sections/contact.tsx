"use client";

import { Mail } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ContactProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function Contact({ id, isOpen, onToggle }: ContactProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={Mail}
      title={`10. ${t("termsOfService.sections.contact.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p className="mb-4">
        {t("termsOfService.sections.contact.intro")}
      </p>
      <a
        href="mailto:support@jotatech.org"
        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
      >
        <Mail className="w-4 h-4" aria-hidden="true" />
        support@jotatech.org
      </a>
    </ExpandableSection>
  );
}
