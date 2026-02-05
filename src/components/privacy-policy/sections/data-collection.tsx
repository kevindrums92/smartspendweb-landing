"use client";

import { Database, Smartphone, MapPin, BarChart3 } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface DataCollectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DataCollection({ isOpen, onToggle }: DataCollectionProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="data-collection"
      icon={Database}
      title={t("privacyPolicy.sections.dataCollection.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.dataCollection.personalInfo.title")}
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t("privacyPolicy.sections.dataCollection.personalInfo.items.0")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.personalInfo.items.1")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.personalInfo.items.2")}</li>
          </ul>
          <p className="mt-2 text-sm italic">
            {t("privacyPolicy.sections.dataCollection.personalInfo.note")}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.dataCollection.financialData.title")}
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t("privacyPolicy.sections.dataCollection.financialData.items.0")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.financialData.items.1")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.financialData.items.2")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.financialData.items.3")}</li>
          </ul>
          <p className="mt-2 text-sm italic">
            {t("privacyPolicy.sections.dataCollection.financialData.note")}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.dataCollection.deviceInfo.title")}
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{t("privacyPolicy.sections.dataCollection.deviceInfo.items.0")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.deviceInfo.items.1")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.deviceInfo.items.2")}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.dataCollection.locationData.title")}
          </h4>
          <p dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.dataCollection.locationData.content") }} />
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
            {t("privacyPolicy.sections.dataCollection.analytics.title")}
          </h4>
          <p>
            {t("privacyPolicy.sections.dataCollection.analytics.content")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
            <li>{t("privacyPolicy.sections.dataCollection.analytics.items.0")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.analytics.items.1")}</li>
            <li>{t("privacyPolicy.sections.dataCollection.analytics.items.2")}</li>
          </ul>
          <p className="mt-2 text-sm italic">
            {t("privacyPolicy.sections.dataCollection.analytics.note")}
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
