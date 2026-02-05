"use client";

import { Users, Eye, Key, Trash2, Database } from "lucide-react";
import { ExpandableSection } from "../ExpandableSection";
import { useI18n } from "@/i18n/i18n-context";

interface UserRightsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function UserRights({ isOpen, onToggle }: UserRightsProps) {
  const { t } = useI18n();

  return (
    <ExpandableSection
      id="user-rights"
      icon={Users}
      title={t("privacyPolicy.sections.userRights.title")}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="space-y-6">
        <p>
          {t("privacyPolicy.sections.userRights.intro")}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.userRights.access.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.userRights.access.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.userRights.correction.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.userRights.correction.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.userRights.deletion.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.userRights.deletion.content")}
            </p>
          </div>
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" aria-hidden="true" />
              {t("privacyPolicy.sections.userRights.portability.title")}
            </h4>
            <p className="text-sm">
              {t("privacyPolicy.sections.userRights.portability.content")}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-3">{t("privacyPolicy.sections.userRights.howToExercise.title")}</h4>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.userRights.howToExercise.items.0") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.userRights.howToExercise.items.1") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.userRights.howToExercise.items.2") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.userRights.howToExercise.items.3") }} />
            <li dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.userRights.howToExercise.items.4") }} />
          </ul>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
          <p className="text-sm text-emerald-800 dark:text-emerald-200" dangerouslySetInnerHTML={{ __html: t("privacyPolicy.sections.userRights.regionalRights") }} />
        </div>
      </div>
    </ExpandableSection>
  );
}
