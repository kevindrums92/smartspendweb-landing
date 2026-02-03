"use client";

import { Eye } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface DataUsageProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DataUsage({ isOpen, onToggle }: DataUsageProps) {
  return (
    <ExpandableSection
      id="data-usage"
      icon={Eye}
      title="3. How We Use Your Data"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <p>We use the collected data for the following purposes:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Core Functionality</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Displaying your financial dashboard</li>
              <li>Calculating budgets and spending analytics</li>
              <li>Generating reports and statistics</li>
              <li>Sending local notifications for reminders</li>
            </ul>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">App Improvement</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Fixing bugs and crashes</li>
              <li>Optimizing performance</li>
              <li>Understanding feature usage (anonymized)</li>
              <li>Planning new features</li>
            </ul>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Security</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Protecting against unauthorized access</li>
              <li>Verifying biometric authentication</li>
              <li>Detecting suspicious activity</li>
            </ul>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">User Support</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Responding to your inquiries</li>
              <li>Providing technical assistance</li>
              <li>Processing feedback</li>
            </ul>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>We do not:</strong> Sell your data, use it for advertising profiling,
            share it with data brokers, or use it for any purpose beyond providing and improving SmartSpend.
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
