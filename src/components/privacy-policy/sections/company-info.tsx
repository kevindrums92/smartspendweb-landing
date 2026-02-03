"use client";

import { Server } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";

interface CompanyInfoProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function CompanyInfo({ isOpen, onToggle }: CompanyInfoProps) {
  return (
    <ExpandableSection
      id="company-info"
      icon={Server}
      title="1. Company & App Information"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Application Name</h4>
            <p className="text-sm">SmartSpend</p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Developer</h4>
            <p className="text-sm">SmartSpend Team</p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Platform Availability</h4>
            <p className="text-sm">iOS (App Store) & Android (Google Play)</p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">App Category</h4>
            <p className="text-sm">Finance / Budget & Expense Tracking</p>
          </div>
        </div>
        <p>
          SmartSpend is a local-first budgeting and expense tracking application designed with privacy at its core.
          Our mission is to provide powerful financial management tools without compromising your personal data.
        </p>
      </div>
    </ExpandableSection>
  );
}
