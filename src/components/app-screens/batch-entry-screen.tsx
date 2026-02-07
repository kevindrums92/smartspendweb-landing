"use client";

import { motion } from "framer-motion";
import { X, Type, Mic, Camera, Sparkles, UtensilsCrossed, Car, Check } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";

export function BatchEntryScreen() {
  const { t } = useI18n();

  return (
    <div className="h-full bg-white dark:bg-[#0f1117] text-gray-900 dark:text-white flex flex-col text-[11px]">
      {/* Header */}
      <div className="px-3 pt-2 pb-2 flex items-center justify-between">
        <button className="w-7 h-7 rounded-full flex items-center justify-center">
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <span className="text-sm font-semibold">{t("aiBatchEntry.mockup.header")}</span>
        <div className="w-7" />
      </div>

      {/* Input Mode Tabs */}
      <div className="px-3 pb-2">
        <div className="flex gap-1.5 bg-gray-100 dark:bg-[#1a1d26] rounded-xl p-1">
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white dark:bg-[#252836] shadow-sm">
            <Type className="w-3 h-3 text-[#18B7B0]" />
            <span className="text-[10px] font-medium text-[#18B7B0]">{t("aiBatchEntry.mockup.tabs.text")}</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg">
            <Mic className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] font-medium text-gray-400">{t("aiBatchEntry.mockup.tabs.voice")}</span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg">
            <Camera className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] font-medium text-gray-400">{t("aiBatchEntry.mockup.tabs.image")}</span>
          </div>
        </div>
      </div>

      {/* Text Input Area */}
      <div className="px-3 mb-2">
        <div className="rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] p-2.5">
          <motion.p
            className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t("aiBatchEntry.mockup.inputExample")}
          </motion.p>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="px-3 mb-3">
        <motion.div
          className="w-full py-2 rounded-xl bg-[#18B7B0] flex items-center justify-center gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="text-[11px] font-semibold text-white">{t("aiBatchEntry.mockup.analyzeButton")}</span>
        </motion.div>
      </div>

      {/* Parsed Transactions Preview */}
      <div className="px-3 mb-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{t("aiBatchEntry.mockup.detected")}</span>
          </div>

          <div className="space-y-2">
            {/* Transaction 1 */}
            <motion.div
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium truncate">{t("aiBatchEntry.mockup.lunch")}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{t("aiBatchEntry.mockup.restaurants")}</p>
              </div>
              <p className="text-[11px] font-medium shrink-0">-$ 50.000</p>
            </motion.div>

            {/* Transaction 2 */}
            <motion.div
              className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <Car className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium truncate">{t("aiBatchEntry.mockup.taxi")}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{t("aiBatchEntry.mockup.transport")}</p>
              </div>
              <p className="text-[11px] font-medium shrink-0">-$ 20.000</p>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div
            className="mt-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">{t("aiBatchEntry.mockup.totalExpenses")}</span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">-$ 70.000</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="px-3 mt-3 mb-6 shrink-0">
        <motion.div
          className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span className="text-xs font-semibold text-white dark:text-gray-900">{t("aiBatchEntry.mockup.saveButton")}</span>
        </motion.div>
      </div>
    </div>
  );
}
