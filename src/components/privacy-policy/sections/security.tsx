"use client";

import { Lock, Fingerprint, Key, Shield } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface SecurityProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Security({ isOpen, onToggle }: SecurityProps) {
  return (
    <ExpandableSection
      id="security"
      icon={Lock}
      title="7. Security Measures & Encryption"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          We implement industry-standard security measures to protect your data:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" aria-hidden="true" />
              Local Encryption
            </h4>
            <p className="text-sm">
              All data stored on your device is encrypted using AES-256 encryption.
              iOS uses Data Protection, Android uses AES encryption.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-primary" aria-hidden="true" />
              Biometric Authentication
            </h4>
            <p className="text-sm">
              Optional Face ID, Touch ID, or fingerprint authentication to access the app.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" aria-hidden="true" />
              Secure Backups
            </h4>
            <p className="text-sm">
              Optional cloud backups are encrypted before upload using industry-standard protocols.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
              No Server Storage
            </h4>
            <p className="text-sm">
              By default, no data is stored on our servers, minimizing exposure to data breaches.
            </p>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Security Limitations</h4>
          <p className="text-sm text-red-800 dark:text-red-200">
            While we take extensive measures to protect your data, no method of electronic storage
            is 100% secure. We recommend enabling device-level security (PIN, password, biometric)
            and keeping your device&apos;s operating system updated.
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
