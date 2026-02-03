"use client";

import { Baby } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface ChildrenPrivacyProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ChildrenPrivacy({ isOpen, onToggle }: ChildrenPrivacyProps) {
  return (
    <ExpandableSection
      id="children"
      icon={Baby}
      title="10. Children's Privacy (COPPA Compliance)"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>
          SmartSpend is not intended for use by children under the age of 13 (or the minimum
          age required for providing consent in your jurisdiction). We do not knowingly collect
          personal information from children under 13.
        </p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
            Parental Notice
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            If you are a parent or guardian and believe your child under 13 has provided us
            with personal information, please contact us immediately. We will take steps to
            remove that information and terminate the child&apos;s account if applicable.
          </p>
        </div>

        <p>
          In accordance with the Children&apos;s Online Privacy Protection Act (COPPA) and similar
          regulations worldwide:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>We do not market to children under 13</li>
          <li>We do not collect personal information from children under 13</li>
          <li>Parents can review, delete, or refuse further collection of their child&apos;s information</li>
        </ul>
      </div>
    </ExpandableSection>
  );
}
