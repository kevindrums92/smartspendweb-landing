"use client";

import { Cloud, BarChart3, CreditCard, Smartphone, ExternalLink } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface ThirdPartyProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ThirdParty({ isOpen, onToggle }: ThirdPartyProps) {
  return (
    <ExpandableSection
      id="third-parties"
      icon={Cloud}
      title="4. Third-Party Services & Integrations"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <p>
          SmartSpend is designed to work offline with minimal third-party dependencies.
          However, certain optional features may involve third-party services:
        </p>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
            Analytics Providers (Optional)
          </h4>
          <div className="bg-accent/50 rounded-lg p-4">
            <p className="font-medium">Firebase Analytics / Crashlytics (Google)</p>
            <p className="text-sm mt-1">
              Used only if you opt-in to analytics. Collects anonymized usage data and crash reports.
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
            >
              View Google Privacy Policy <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" aria-hidden="true" />
            Payment Processors
          </h4>
          <p className="text-sm">
            SmartSpend does not process payments directly. If you make in-app purchases,
            transactions are handled entirely by Apple App Store or Google Play Store.
            We do not receive or store your payment information.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-primary" aria-hidden="true" />
            Cloud Backup Services (Optional)
          </h4>
          <p className="text-sm">
            If you enable optional cloud backup, your encrypted data may be stored using:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2 text-sm">
            <li><strong>iCloud:</strong> Apple&apos;s cloud storage service (for iOS users)</li>
            <li><strong>Google Drive:</strong> Google&apos;s cloud storage service (for Android users)</li>
          </ul>
          <p className="text-sm mt-2 italic">
            Your data is encrypted before being uploaded to these services.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" />
            Device Platform Services
          </h4>
          <p className="text-sm">
            The app uses standard device services for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2 text-sm">
            <li>Biometric authentication (Face ID, Touch ID, Fingerprint)</li>
            <li>Local notifications and reminders</li>
            <li>File export/import functionality</li>
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}
