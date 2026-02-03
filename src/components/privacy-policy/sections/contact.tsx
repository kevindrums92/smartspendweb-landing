"use client";

import { Mail } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface ContactProps {
  isOpen: boolean;
  onToggle: () => void;
  locale: string;
}

export function Contact({ isOpen, onToggle, locale }: ContactProps) {
  return (
    <ExpandableSection
      id="contact"
      icon={Mail}
      title="11. Contact Information"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or
          our data practices, please contact us:
        </p>

        <div className="bg-accent/50 rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Privacy Inquiries</h4>
          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
              <a href="mailto:privacy@smartspend.app" className="text-primary hover:underline">
                privacy@smartspend.app
              </a>
            </p>
            <p className="text-sm text-muted">
              For general support inquiries, please visit our <a href={`/${locale}/contacto`} className="text-primary hover:underline">contact page</a>.
            </p>
          </div>
        </div>

        <div className="bg-accent/50 rounded-lg p-6">
          <h4 className="font-medium text-foreground mb-4">Data Protection Officer</h4>
          <p className="text-sm">
            For GDPR-related inquiries or to exercise your EU data protection rights,
            please contact our Data Protection Officer at:
          </p>
          <p className="mt-2">
            <a href="mailto:dpo@smartspend.app" className="text-primary hover:underline">
              dpo@smartspend.app
            </a>
          </p>
        </div>

        <p className="text-sm text-muted">
          We aim to respond to all privacy-related inquiries within 30 days. For complex requests
          or high volumes, this may take up to 90 days, in which case we will notify you of the delay.
        </p>
      </div>
    </ExpandableSection>
  );
}
