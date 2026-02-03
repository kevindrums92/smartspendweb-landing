"use client";

import { Globe } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface InternationalProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function International({ isOpen, onToggle }: InternationalProps) {
  return (
    <ExpandableSection
      id="international"
      icon={Globe}
      title="8. International Data Transfers & Compliance"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          SmartSpend is designed to keep your data local to your device. However, certain optional
          features may involve international data transfers:
        </p>

        <div className="space-y-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">GDPR (European Union)</h4>
            <p className="text-sm">
              For EU users, we comply with the General Data Protection Regulation.
              If you opt-in to analytics, data may be transferred to the US under
              Standard Contractual Clauses (SCCs). You can withdraw consent at any time.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">CCPA (California, USA)</h4>
            <p className="text-sm">
              California residents have the right to know what personal information is collected,
              the right to deletion, and the right to opt-out of the sale of personal information.
              We do not sell personal information.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">LGPD (Brazil)</h4>
            <p className="text-sm">
              We comply with the Lei Geral de Proteção de Dados. Brazilian users have
              rights to confirmation of processing, access, correction, and deletion of personal data.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Other Jurisdictions</h4>
            <p className="text-sm">
              We strive to comply with privacy laws in all jurisdictions where our app is available,
              including PIPEDA (Canada), POPIA (South Africa), and others.
            </p>
          </div>
        </div>

        <p className="text-sm">
          If you have questions about how we comply with specific privacy regulations in your region,
          please contact us using the information provided below.
        </p>
      </div>
    </ExpandableSection>
  );
}
