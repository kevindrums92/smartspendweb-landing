"use client";

import { Calendar, Database, BarChart3, Mail } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface DataRetentionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DataRetention({ isOpen, onToggle }: DataRetentionProps) {
  return (
    <ExpandableSection
      id="retention"
      icon={Calendar}
      title="6. Data Retention & Deletion Policies"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-3">Retention Periods</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
              <Database className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Financial Data</p>
                <p className="text-sm">
                  Stored locally on your device until you delete it or uninstall the app.
                  We do not retain copies on our servers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
              <BarChart3 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Analytics Data</p>
                <p className="text-sm">
                  Anonymized analytics data is retained for up to 26 months to help us improve the app.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Support Communications</p>
                <p className="text-sm">
                  Retained for 2 years to help us provide better support and resolve disputes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">Data Deletion</h4>
          <p>You can delete your data in the following ways:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
            <li><strong>Individual Items:</strong> Delete specific transactions or budgets in the app</li>
            <li><strong>All App Data:</strong> Settings → Data → Delete All Data</li>
            <li><strong>Complete Removal:</strong> Uninstall the app from your device</li>
            <li><strong>Cloud Backups:</strong> Delete backups from your iCloud or Google Drive account</li>
          </ul>
          <p className="mt-3 text-sm italic">
            Note: Once data is deleted from your device, we cannot recover it as we do not maintain server copies.
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
