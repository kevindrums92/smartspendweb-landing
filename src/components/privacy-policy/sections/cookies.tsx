"use client";

import { Cookie } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface CookiesProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Cookies({ isOpen, onToggle }: CookiesProps) {
  return (
    <ExpandableSection
      id="cookies"
      icon={Cookie}
      title="9. Cookies & Tracking Technologies"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Mobile App</h4>
        <p>
          The SmartSpend mobile app does not use cookies. We use local storage on your device
          to save your preferences and data. This storage is:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Contained entirely on your device</li>
          <li>Not accessible to third parties</li>
          <li>Deleted when you uninstall the app (unless backed up to cloud)</li>
        </ul>

        <h4 className="font-medium text-foreground mt-6">Website</h4>
        <p>
          Our website may use essential cookies for functionality and optional analytics cookies.
          When you visit our website, you will be presented with a cookie consent banner allowing
          you to control non-essential cookies.
        </p>

        <div className="bg-accent/50 rounded-lg p-4 mt-4">
          <h4 className="font-medium text-foreground mb-2">Types of Cookies We May Use</h4>
          <ul className="text-sm space-y-2">
            <li><strong>Essential:</strong> Required for the website to function properly</li>
            <li><strong>Analytics:</strong> Help us understand how visitors interact with our website (optional)</li>
            <li><strong>Preferences:</strong> Remember your settings and preferences</li>
          </ul>
        </div>
      </div>
    </ExpandableSection>
  );
}
