"use client";

import { CreditCard } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface SubscriptionsPaymentsProps {
  id: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export function SubscriptionsPayments({ id, isOpen, onToggle }: SubscriptionsPaymentsProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id={id}
      icon={CreditCard}
      title={`4. ${t("termsOfService.sections.subscriptions.title")}`}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
    >
      <p>
        {t("termsOfService.sections.subscriptions.content")}
      </p>
    </ExpandableSection>
  );
}
