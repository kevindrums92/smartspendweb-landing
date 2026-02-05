"use client";

import { Calendar, Database, BarChart3, Mail } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface DataRetentionProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function DataRetention({ isOpen, onToggle }: DataRetentionProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="retention"
      icon={Calendar}
      title={t("privacyPolicy.sections.retention.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-3">{t("privacyPolicy.sections.retention.retentionPeriods.title")}</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
              <Database className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">{t("privacyPolicy.sections.retention.retentionPeriods.financialData.title")}</p>
                <p className="text-sm">
                  {t("privacyPolicy.sections.retention.retentionPeriods.financialData.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
              <BarChart3 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">{t("privacyPolicy.sections.retention.retentionPeriods.analyticsData.title")}</p>
                <p className="text-sm">
                  {t("privacyPolicy.sections.retention.retentionPeriods.analyticsData.content")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-accent/50 rounded-lg p-4">
              <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">{t("privacyPolicy.sections.retention.retentionPeriods.supportData.title")}</p>
                <p className="text-sm">
                  {t("privacyPolicy.sections.retention.retentionPeriods.supportData.content")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">{t("privacyPolicy.sections.retention.deletion.title")}</h4>
          <p>{t("privacyPolicy.sections.retention.deletion.intro")}</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.retention.deletion.items.0") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.retention.deletion.items.1") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.retention.deletion.items.2") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.retention.deletion.items.3") }} />
          </ul>
          <p className="mt-3 text-sm italic">
            {t("privacyPolicy.sections.retention.deletion.note")}
          </p>
        </div>
      </div>
    </ExpandableSection>
  );
}
