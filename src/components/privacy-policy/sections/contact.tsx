"use client";

import { Mail } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface ContactProps {
  isOpen: boolean;
  onToggle: () => void;
  locale: string;
}

export function Contact({ isOpen, onToggle, locale }: ContactProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="contact"
      icon={Mail}
      title={t("privacyPolicy.sections.contact.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          {t("privacyPolicy.sections.contact.intro")}
        </p>

        <div className="bg-accent/50 rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">{t("privacyPolicy.sections.contact.privacyInquiries.title")}</h4>
          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
              <a href={`mailto:${t("privacyPolicy.sections.contact.privacyInquiries.email")}`} className="text-primary hover:underline">
                {t("privacyPolicy.sections.contact.privacyInquiries.email")}
              </a>
            </p>
            <p className="text-sm text-muted" dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.contact.privacyInquiries.supportNote").replace('contact page', `<a href="/${locale}/contacto" class="text-primary hover:underline">contact page</a>`) }} />
          </div>
        </div>

        <div className="bg-accent/50 rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">{t("privacyPolicy.sections.contact.dpo.title")}</h4>
          <p className="text-sm">
            {t("privacyPolicy.sections.contact.dpo.content")}
          </p>
          <p className="mt-2">
            <a href={`mailto:${t("privacyPolicy.sections.contact.dpo.email")}`} className="text-primary hover:underline">
              {t("privacyPolicy.sections.contact.dpo.email")}
            </a>
          </p>
        </div>

        <p className="text-sm text-muted">
          {t("privacyPolicy.sections.contact.responseTime")}
        </p>
      </div>
    </ExpandableSection>
  );
}
