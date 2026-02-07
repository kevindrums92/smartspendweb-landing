"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Type, Mic, Camera } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";
import { IPhoneMockup } from "@/components/iphone-mockup";
import { BatchEntryScreen } from "@/components/app-screens/batch-entry-screen";

interface InputModeCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  delay: number;
  isInView: boolean;
}

function InputModeCard({ icon: Icon, title, description, color, bgColor, delay, isInView }: InputModeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] card-hover shadow-sm dark:shadow-none"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function AIBatchEntry() {
  const { t } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-[#1a1d26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t("aiBatchEntry.title")}{" "}
            <span className="gradient-text">{t("aiBatchEntry.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("aiBatchEntry.subtitle")}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:justify-center order-2 lg:order-1"
          >
            <div className="relative">
              <IPhoneMockup>
                <BatchEntryScreen />
              </IPhoneMockup>

              {/* Floating sparkle effect */}
              <motion.div
                className="absolute -right-6 top-16 p-2.5 rounded-xl bg-white/95 dark:bg-[#1a1d26]/95 backdrop-blur-sm border border-gray-200 dark:border-[#2d313e] shadow-2xl z-20"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#18B7B0]/20 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#18B7B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900 dark:text-white">IA activa</p>
                    <p className="text-[10px] text-[#18B7B0]">Gemini 2.5</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Input Mode Cards */}
          <div className="space-y-4 order-1 lg:order-2">
            <InputModeCard
              icon={Type}
              title={t("aiBatchEntry.textInput.title")}
              description={t("aiBatchEntry.textInput.description")}
              color="#10b981"
              bgColor="rgba(16, 185, 129, 0.15)"
              delay={0.2}
              isInView={isInView}
            />
            <InputModeCard
              icon={Mic}
              title={t("aiBatchEntry.voiceInput.title")}
              description={t("aiBatchEntry.voiceInput.description")}
              color="#18B7B0"
              bgColor="rgba(24, 183, 176, 0.15)"
              delay={0.35}
              isInView={isInView}
            />
            <InputModeCard
              icon={Camera}
              title={t("aiBatchEntry.imageInput.title")}
              description={t("aiBatchEntry.imageInput.description")}
              color="#a855f7"
              bgColor="rgba(168, 85, 247, 0.15)"
              delay={0.5}
              isInView={isInView}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
