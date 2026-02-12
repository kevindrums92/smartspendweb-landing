"use client";

import { TrendingUp, Github, Twitter, Instagram, Mail } from "lucide-react";
import { useI18n } from "@/i18n/i18n-context";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Footer() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const [buildInfo, setBuildInfo] = useState<{ version: string; buildCode: number } | null>(null);

  useEffect(() => {
    fetch("/build-info.json")
      .then((res) => res.json())
      .then((data) => setBuildInfo(data))
      .catch(() => {});
  }, []);
  
  const isHomePage = pathname === `/${locale}` || pathname === "/";

  const footerLinks = {
    product: [
      { name: t("footer.product.ai"), href: isHomePage ? "#ai-batch-entry" : `/${locale}#ai-batch-entry` },
      { name: t("footer.product.features"), href: isHomePage ? "#features" : `/${locale}#features` },
      { name: t("footer.product.download"), href: isHomePage ? "#download" : `/${locale}#download` },
      { name: t("footer.product.changelog"), href: "#" },
      { name: t("footer.product.roadmap"), href: "#" },
    ],
    resources: [
      { name: t("footer.resources.budgetGuide"), href: "#" },
      { name: t("footer.resources.blog"), href: "#" },
      { name: t("footer.resources.tutorials"), href: "#" },
      { name: t("footer.resources.faq"), href: "#" },
    ],
    legal: [
      { name: t("footer.legal.privacy"), href: `/${locale}/privacy-policy` },
      { name: t("footer.legal.terms"), href: "#" },
      { name: t("footer.legal.support"), href: "#" },
      { name: t("footer.legal.contact"), href: `/${locale}/contacto` },
    ],
  };

  const featureTags = [
    t("footer.featureTags.multiCurrency"),
    t("footer.featureTags.csvExport"),
    t("footer.featureTags.autoDarkMode"),
    t("footer.featureTags.optionalSync"),
    t("footer.featureTags.smartBudgets"),
    t("footer.featureTags.advancedStats"),
    t("footer.featureTags.scheduledTransactions"),
    t("footer.featureTags.customCategories"),
  ];

  return (
    <footer className="bg-gray-100 dark:bg-[#0a0c10] border-t border-gray-200 dark:border-[#2d313e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#18B7B0] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SmartSpend</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-transparent flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252836] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-transparent flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252836] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-transparent flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252836] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-transparent flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#252836] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t("footer.links.product")}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t("footer.links.resources")}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{t("footer.links.legal")}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="py-8 border-t border-gray-200 dark:border-[#2d313e]">
          <p className="text-sm text-gray-500 mb-4">{t("footer.features")}</p>
          <div className="flex flex-wrap gap-2">
            {featureTags.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 rounded-full bg-white dark:bg-[#1a1d26] border border-gray-200 dark:border-[#2d313e] text-xs text-gray-500 dark:text-gray-400"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-[#2d313e] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SmartSpend. {t("footer.copyright")}
          </p>
          <p className="text-sm text-gray-500">
            {t("footer.madeWith")}
          </p>
          {buildInfo && (
            <p className="text-xs text-gray-400 dark:text-gray-600">
              v{buildInfo.version} (build {buildInfo.buildCode})
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
