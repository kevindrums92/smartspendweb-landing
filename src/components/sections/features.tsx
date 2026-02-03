"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n/i18n-context";
import { IPhoneMockup } from "@/components/iphone-mockup";
import { BudgetScreen } from "@/components/app-screens/budget-screen";
import { StatsScreen } from "@/components/app-screens/stats-screen";
import { SubscriptionsScreen } from "@/components/app-screens/subscriptions-screen";

export function Features() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gray-50 dark:bg-[#0f1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("features.title")}{" "}
            <span className="gradient-text">{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid - 3 Columnas iguales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] overflow-hidden card-hover shadow-sm dark:shadow-none"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{t("features.budget.title")}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t("features.budget.description")}
              </p>
              
              <div className="flex justify-center">
                <div className="transform scale-90 origin-top">
                  <IPhoneMockup>
                    <BudgetScreen />
                  </IPhoneMockup>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] overflow-hidden card-hover shadow-sm dark:shadow-none"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#18B7B0]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#18B7B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{t("features.stats.title")}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t("features.stats.description")}
              </p>
              
              <div className="flex justify-center">
                <div className="transform scale-90 origin-top">
                  <IPhoneMockup>
                    <StatsScreen />
                  </IPhoneMockup>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subscriptions Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] overflow-hidden card-hover shadow-sm dark:shadow-none"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{t("features.subscriptions.title")}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {t("features.subscriptions.description")}
              </p>
              
              <div className="flex justify-center">
                <div className="transform scale-90 origin-top">
                  <IPhoneMockup>
                    <SubscriptionsScreen />
                  </IPhoneMockup>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
