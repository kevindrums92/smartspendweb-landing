"use client";

import { Users, Eye, Key, Trash2, Database } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface UserRightsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function UserRights({ isOpen, onToggle }: UserRightsProps) {
  return (
    <ExpandableSection
      id="user-rights"
      icon={Users}
      title="5. Your Rights & Control Mechanisms"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <p>
          Depending on your location, you may have the following rights regarding your personal data:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
              Right to Access
            </h4>
            <p className="text-sm">
              You can view all your data at any time within the app. Export your data in JSON or CSV format from Settings.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" aria-hidden="true" />
              Right to Correction
            </h4>
            <p className="text-sm">
              Edit or update any transaction, budget, or profile information directly in the app.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-primary" aria-hidden="true" />
              Right to Deletion
            </h4>
            <p className="text-sm">
              Delete individual records or all app data. Uninstalling the app removes all local data.
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" aria-hidden="true" />
              Right to Portability
            </h4>
            <p className="text-sm">
              Export your data in standard formats (JSON, CSV) to transfer to other services.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">How to Exercise Your Rights</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Access/Export:</strong> Settings → Data → Export Data</li>
            <li><strong>Correction:</strong> Edit any transaction or budget directly in the app</li>
            <li><strong>Deletion:</strong> Settings → Data → Delete All Data, or uninstall the app</li>
            <li><strong>Opt-out of Analytics:</strong> Settings → Privacy → Analytics → Disable</li>
            <li><strong>Contact us:</strong> Use the contact information at the bottom of this policy</li>
          </ul>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
          <p className="text-sm text-emerald-800 dark:text-emerald-200">
            <strong>Regional Rights:</strong> Residents of the EU (GDPR), California (CCPA),
            Brazil (LGPD), and other jurisdictions have additional rights. Contact us for
            jurisdiction-specific requests.
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
