"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  Users,
  Cookie,
  Baby,
  Mail,
  Calendar,
  FileText,
  Server,
  Smartphone,
  MapPin,
  BarChart3,
  CreditCard,
  Cloud,
  Trash2,
  Key,
  ExternalLink,
  Fingerprint,
} from "lucide-react";

interface SectionProps {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function ExpandableSection({ id, icon: Icon, title, children, isOpen, onToggle }: SectionProps) {
  return (
    <section className="border border-border rounded-xl overflow-hidden bg-card" id={id}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-border">
              <div className="pt-6 text-muted leading-relaxed">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TableOfContents({ sections, onNavigate }: { sections: { id: string; title: string }[]; onNavigate: (id: string) => void }) {
  return (
    <nav className="bg-card border border-border rounded-xl p-6 sticky top-24" aria-label="Table of contents">
      <h3 className="font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
        Contents
      </h3>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onNavigate(section.id)}
              className="text-sm text-muted hover:text-primary transition-colors text-left w-full py-1"
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PrivacyPolicyContent() {
  // TODO: Translate privacy policy content (see Task #4 - Refactorizar Privacy Policy Component)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "company-info": true,
    "data-collection": true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: true }));
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const lastUpdated = "February 3, 2026";
  const effectiveDate = "February 3, 2026";

  const sections = [
    { id: "company-info", title: "Company & App Information" },
    { id: "data-collection", title: "Data We Collect" },
    { id: "data-usage", title: "How We Use Your Data" },
    { id: "third-parties", title: "Third-Party Services" },
    { id: "user-rights", title: "Your Rights & Controls" },
    { id: "retention", title: "Data Retention & Deletion" },
    { id: "security", title: "Security Measures" },
    { id: "international", title: "International Data Transfers" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "children", title: "Children's Privacy" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">Legal Document</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Your privacy is our absolute priority. This policy explains how we collect, use, protect, and handle your information when you use SmartSpend.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Last Updated: {lastUpdated}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Effective Date: {effectiveDate}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <TableOfContents sections={sections} onNavigate={openSection} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Introduction */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-foreground leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the SmartSpend mobile application and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Section 1: Company & App Information */}
            <ExpandableSection
              id="company-info"
              icon={Server}
              title="1. Company & App Information"
              isOpen={openSections["company-info"]}
              onToggle={() => toggleSection("company-info")}
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

            {/* Section 2: Data Collection */}
            <ExpandableSection
              id="data-collection"
              icon={Database}
              title="2. Information We Collect"
              isOpen={openSections["data-collection"]}
              onToggle={() => toggleSection("data-collection")}
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

            {/* Section 3: Data Usage */}
            <ExpandableSection
              id="data-usage"
              icon={Eye}
              title="3. How We Use Your Data"
              isOpen={openSections["data-usage"]}
              onToggle={() => toggleSection("data-usage")}
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

            {/* Section 4: Third-Party Services */}
            <ExpandableSection
              id="third-parties"
              icon={Cloud}
              title="4. Third-Party Services & Integrations"
              isOpen={openSections["third-parties"]}
              onToggle={() => toggleSection("third-parties")}
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

            {/* Section 5: User Rights */}
            <ExpandableSection
              id="user-rights"
              icon={Users}
              title="5. Your Rights & Control Mechanisms"
              isOpen={openSections["user-rights"]}
              onToggle={() => toggleSection("user-rights")}
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

            {/* Section 6: Data Retention */}
            <ExpandableSection
              id="retention"
              icon={Calendar}
              title="6. Data Retention & Deletion Policies"
              isOpen={openSections["retention"]}
              onToggle={() => toggleSection("retention")}
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

            {/* Section 7: Security */}
            <ExpandableSection
              id="security"
              icon={Lock}
              title="7. Security Measures & Encryption"
              isOpen={openSections["security"]}
              onToggle={() => toggleSection("security")}
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

            {/* Section 8: International Transfers */}
            <ExpandableSection
              id="international"
              icon={Globe}
              title="8. International Data Transfers & Compliance"
              isOpen={openSections["international"]}
              onToggle={() => toggleSection("international")}
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

            {/* Section 9: Cookies & Tracking */}
            <ExpandableSection
              id="cookies"
              icon={Cookie}
              title="9. Cookies & Tracking Technologies"
              isOpen={openSections["cookies"]}
              onToggle={() => toggleSection("cookies")}
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

            {/* Section 10: Children's Privacy */}
            <ExpandableSection
              id="children"
              icon={Baby}
              title="10. Children's Privacy (COPPA Compliance)"
              isOpen={openSections["children"]}
              onToggle={() => toggleSection("children")}
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

            {/* Section 11: Contact */}
            <ExpandableSection
              id="contact"
              icon={Mail}
              title="11. Contact Information"
              isOpen={openSections["contact"]}
              onToggle={() => toggleSection("contact")}
            >
              <div className="space-y-4">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or 
                  our data practices, please contact us:
                </p>

                <div className="bg-accent/50 rounded-lg p-6">
                  <h4 className="font-medium text-foreground mb-4">Privacy Inquiries</h4>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <a href="mailto:privacy@smartspend.app" className="text-primary hover:underline">
                        privacy@smartspend.app
                      </a>
                    </p>
                    <p className="text-sm text-muted">
                      For general support inquiries, please visit our <a href={`/${locale}/contacto`} className="text-primary hover:underline">contact page</a>.
                    </p>
                  </div>
                </div>

                <div className="bg-accent/50 rounded-lg p-6">
                  <h4 className="font-medium text-foreground mb-4">Data Protection Officer</h4>
                  <p className="text-sm">
                    For GDPR-related inquiries or to exercise your EU data protection rights, 
                    please contact our Data Protection Officer at:
                  </p>
                  <p className="mt-2">
                    <a href="mailto:dpo@smartspend.app" className="text-primary hover:underline">
                      dpo@smartspend.app
                    </a>
                  </p>
                </div>

                <p className="text-sm text-muted">
                  We aim to respond to all privacy-related inquiries within 30 days. For complex requests 
                  or high volumes, this may take up to 90 days, in which case we will notify you of the delay.
                </p>
              </div>
            </ExpandableSection>

            {/* Policy Updates Notice */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                Changes to This Privacy Policy
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                For significant changes, we will provide a more prominent notice (including, for certain services,
                email notification of Privacy Policy changes). You are advised to review this Privacy Policy
                periodically for any changes.
              </p>
            </div>

            {/* Legal Documents Links */}
            <div className="flex flex-wrap gap-4 justify-center mt-8 pt-8 border-t border-border">
              <a 
                href="#" 
                className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Terms of Service
              </a>
              <span className="text-border">|</span>
              <a 
                href="#" 
                className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Privacy Policy
              </a>
              <span className="text-border">|</span>
              <a 
                href={`/${locale}/contacto`}
                className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
