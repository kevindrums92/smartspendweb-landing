"use client";

import { Database, Smartphone, MapPin, BarChart3 } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface DataCollectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DataCollection({ isOpen, onToggle }: DataCollectionProps) {
  return (
    <ExpandableSection
      id="data-collection"
      icon={Database}
      title="2. Information We Collect"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" />
            Personal Information (Optional)
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Name or nickname (if you choose to set one)</li>
            <li>Profile preferences (currency, language, theme)</li>
            <li>Biometric authentication preferences (Face ID, Fingerprint)</li>
          </ul>
          <p className="mt-2 text-sm italic">
            Note: All personal information is stored locally on your device and never transmitted to our servers.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" aria-hidden="true" />
            Financial Data (Local Only)
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Transaction records (amounts, dates, categories, notes)</li>
            <li>Budget configurations and spending limits</li>
            <li>Scheduled/recurring transaction settings</li>
            <li>Category customizations and icons</li>
          </ul>
          <p className="mt-2 text-sm italic">
            Important: Your financial data never leaves your device unless you explicitly export it or enable optional cloud backup.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" />
            Device Information (Minimal)
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Device type and operating system version (for compatibility)</li>
            <li>App version and settings</li>
            <li>Screen size/orientation preferences</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
            Location Data
          </h4>
          <p>
            SmartSpend does <strong>not</strong> collect, store, or transmit your location data.
            All location-related features (if any) are processed locally on your device.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
            Usage Analytics
          </h4>
          <p>
            We collect minimal, anonymized usage statistics only if you explicitly opt-in.
            This data helps us improve the app and includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
            <li>Feature usage frequency (anonymized)</li>
            <li>Crash reports and error logs</li>
            <li>App performance metrics</li>
          </ul>
          <p className="mt-2 text-sm italic">
            You can disable analytics at any time in Settings → Privacy → Analytics.
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
