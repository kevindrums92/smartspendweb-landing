"use client";

import { ContactForm } from "@/components/contact-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import { Mail, MapPin, Clock } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0a0c10]">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("contact.title")}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]">
                <div className="w-12 h-12 rounded-xl bg-[#18B7B0]/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#18B7B0]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {t("contact.info.email.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {t("contact.info.email.description")}
                </p>
                <a 
                  href="mailto:support@joratech.org" 
                  className="text-[#18B7B0] hover:underline font-medium"
                >
                  support@joratech.org
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {t("contact.info.hours.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("contact.info.hours.schedule")}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {t("contact.info.location.title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("contact.info.location.address")}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-3xl bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e]">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t("contact.formTitle")}
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
