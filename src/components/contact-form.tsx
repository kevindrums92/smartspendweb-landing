"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Info } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";
import { contactSchema, type ContactFormData, subjectOptions } from "@/lib/contact-schema";

type FormStatus = "idle" | "loading" | "success" | "error" | "fallback";

interface ApiResponse {
  error?: string;
  message?: string;
  fallback?: boolean;
  success?: boolean;
  id?: string;
}

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fallbackMessage, setFallbackMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      newsletter: false,
      website: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");
    setFallbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        reset();
      } else if (result.fallback) {
        // Graceful degradation - form submission logged but email not sent
        setStatus("fallback");
        setFallbackMessage(result.message || t("contact.errors.fallback_default") as string);
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "default");
      }
    } catch {
      setStatus("error");
      setErrorMessage("network");
    }
  };

  const subjectLabels: Record<string, string> = {
    general: t("contact.subjects.general") as string,
    support: t("contact.subjects.support") as string,
    sales: t("contact.subjects.sales") as string,
    bug: t("contact.subjects.bug") as string,
    other: t("contact.subjects.other") as string,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              {t("contact.success.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t("contact.success.message")}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-3 rounded-xl bg-[#18B7B0] text-white font-medium hover:bg-[#149E98] transition-colors"
            >
              {t("contact.success.button")}
            </button>
          </motion.div>
        ) : status === "fallback" ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-10 h-10 text-amber-500" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
              {t("contact.fallback.title")}
            </h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 mx-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200 text-left">
                  {fallbackMessage || t("contact.fallback.message")}
                </p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {t("contact.fallback.subtitle")}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-3 rounded-xl bg-[#18B7B0] text-white font-medium hover:bg-[#149E98] transition-colors"
            >
              {t("contact.fallback.button")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Honeypot field - hidden from users */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                {...register("website")}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.fields.name.label")} *
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1d26] border ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 dark:border-[#2d313e] focus:border-[#18B7B0] focus:ring-[#18B7B0]/20"
                } outline-none transition-all focus:ring-4`}
                placeholder={t("contact.fields.name.placeholder") as string}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="name-error"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message ? t(errors.name.message) : t("contact.errors.name.min")}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.fields.email.label")} *
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1d26] border ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 dark:border-[#2d313e] focus:border-[#18B7B0] focus:ring-[#18B7B0]/20"
                } outline-none transition-all focus:ring-4`}
                placeholder={t("contact.fields.email.placeholder") as string}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="email-error"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message ? t(errors.email.message) : t("contact.errors.email.invalid")}
                </motion.p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.fields.subject.label")} *
              </label>
              <select
                id="subject"
                {...register("subject")}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1d26] border ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 dark:border-[#2d313e] focus:border-[#18B7B0] focus:ring-[#18B7B0]/20"
                } outline-none transition-all focus:ring-4 appearance-none cursor-pointer`}
                aria-invalid={errors.subject ? "true" : "false"}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              >
                <option value="">{t("contact.fields.subject.placeholder")}</option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {subjectLabels[option]}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="subject-error"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.subject.message ? t(errors.subject.message) : t("contact.errors.subject.required")}
                </motion.p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {t("contact.fields.message.label")} *
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1d26] border ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-200 dark:border-[#2d313e] focus:border-[#18B7B0] focus:ring-[#18B7B0]/20"
                } outline-none transition-all focus:ring-4 resize-none`}
                placeholder={t("contact.fields.message.placeholder") as string}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="message-error"
                  className="mt-2 text-sm text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.message.message ? t(errors.message.message) : t("contact.errors.message.min")}
                </motion.p>
              )}
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter"
                {...register("newsletter")}
                className="w-5 h-5 rounded border-gray-300 text-[#18B7B0] focus:ring-[#18B7B0] mt-0.5 cursor-pointer"
              />
              <label
                htmlFor="newsletter"
                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                {t("contact.fields.newsletter.label")}
              </label>
            </div>

            {/* Error Message */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">{t(`contact.errors.${errorMessage}`)}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#18B7B0] text-white font-semibold hover:bg-[#149E98] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t("contact.submit.loading")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t("contact.submit.button")}
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
