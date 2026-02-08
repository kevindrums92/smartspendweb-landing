"use client";

import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";
import { IPhoneMockup } from "@/components/iphone-mockup";
import { HomeScreen } from "@/components/app-screens/home-screen";

export function Hero() {
  const { t } = useI18n();
  const testFlightUrl = process.env.NEXT_PUBLIC_TESTFLIGHT_URL || "#";
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAYSTORE_URL || "https://play.google.com/store/apps/details?id=com.jhotech.smartspend";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-50 via-gray-50 to-white dark:from-[#0f1117] dark:via-[#0f1117] dark:to-[#1a1d26]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#18B7B0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#18B7B0]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18B7B0]/10 border border-[#18B7B0]/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#18B7B0] animate-pulse" />
              <span className="text-sm text-[#18B7B0] font-medium">{t("hero.badge")}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              {t("hero.title")}{" "}
              <span className="gradient-text">{t("hero.titleHighlight")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={testFlightUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">{t("hero.testFlightBeta")}</p>
                  <p className="text-sm font-bold">TestFlight</p>
                </div>
              </motion.a>

              <motion.a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gray-900 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] text-white font-semibold hover:bg-gray-800 dark:hover:bg-[#252836] transition-colors"
              >
                <Play className="w-6 h-6 fill-current" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">{t("hero.downloadPlayStore")}</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </motion.a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-gray-200 dark:border-[#2d313e]">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">50K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("hero.stats.users")}</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-[#2d313e]" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("hero.stats.rating")}</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-[#2d313e]" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("hero.stats.dataSold")}</p>
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <IPhoneMockup>
                <HomeScreen />
              </IPhoneMockup>
              
              {/* Floating Elements - positioned relative to phone */}
              <motion.div
                className="absolute -left-8 top-20 p-3 rounded-xl bg-white/95 dark:bg-[#1a1d26]/95 backdrop-blur-sm border border-gray-200 dark:border-[#2d313e] shadow-2xl z-20 whitespace-nowrap"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="text-emerald-500 text-sm font-bold">+</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{t("hero.notifications.incomeRegistered")}</p>
                    <p className="text-xs text-emerald-500">+$ 2.500.000</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 top-40 p-3 rounded-xl bg-white/95 dark:bg-[#1a1d26]/95 backdrop-blur-sm border border-gray-200 dark:border-[#2d313e] shadow-2xl z-20 whitespace-nowrap"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#18B7B0]/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#18B7B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{t("hero.notifications.budgetAlert")}</p>
                    <p className="text-xs text-[#18B7B0]">{t("hero.notifications.85percentUsed")}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-32 p-3 rounded-xl bg-white/95 dark:bg-[#1a1d26]/95 backdrop-blur-sm border border-gray-200 dark:border-[#2d313e] shadow-2xl z-20 whitespace-nowrap"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{t("hero.notifications.reminder")}</p>
                    <p className="text-xs text-purple-500">{t("hero.notifications.subscriptionDue")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
