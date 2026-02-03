"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n/i18n-context";
import { Shield, Lock, WifiOff, Fingerprint, Eye, Database } from "lucide-react";

export function Privacy() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: WifiOff,
      key: "offline",
    },
    {
      icon: Lock,
      key: "encryption",
    },
    {
      icon: Fingerprint,
      key: "biometric",
    },
    {
      icon: Eye,
      key: "noTracking",
    },
    {
      icon: Database,
      key: "backup",
    },
    {
      icon: Shield,
      key: "gdpr",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#0a0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-emerald-500 font-medium">{t("privacy.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("privacy.title")}{" "}
            <span className="text-emerald-500">{t("privacy.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("privacy.subtitle")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t(`privacy.features.${feature.key}.title`)}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t(`privacy.features.${feature.key}.description`)}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-gray-100 dark:via-[#1a1d26] to-emerald-500/10 border border-emerald-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{t("privacy.certification.title")}</h3>
                <p className="text-gray-500 dark:text-gray-400">{t("privacy.certification.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-500">0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("privacy.certification.breaches")}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-500">100%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("privacy.certification.localData")}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-500">0</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("privacy.certification.thirdPartyAccess")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
