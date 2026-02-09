"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useI18n } from "@/i18n/i18n-context";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { usePathname } from "next/navigation";

export function Header() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === `/${locale}` || pathname === "/";
  
  const navLinks = [
    { name: t("navigation.home") as string, href: `/${locale}` },
    { name: t("navigation.ai") as string, href: isHomePage ? "#ai-batch-entry" : `/${locale}#ai-batch-entry` },
    { name: t("navigation.features") as string, href: isHomePage ? "#features" : `/${locale}#features` },
    { name: t("navigation.privacy") as string, href: isHomePage ? "#privacy" : `/${locale}#privacy` },
    { name: t("navigation.contact") as string, href: `/${locale}/contacto` },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-xl border-b border-gray-200 dark:border-[#2d313e]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href={`/${locale}`} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#18B7B0] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SmartSpend</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Locale Switcher */}
              <LocaleSwitcher />

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1a1d26] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#252836] transition-colors"
                aria-label={t("header.menu.open") as string}
              >
                {mounted ? (
                  <AnimatePresence mode="wait">
                    {resolvedTheme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <div className="w-5 h-5" />
                )}
              </button>

              {/* CTA Button */}
              <a
                href={isHomePage ? "#download" : `/${locale}#download`}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18B7B0] text-white font-medium hover:bg-[#149E98] transition-colors"
              >
                {t("header.download")}
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1a1d26] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={isMobileMenuOpen ? t("header.menu.close") as string : t("header.menu.open") as string}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="bg-white/95 dark:bg-[#0a0c10]/95 backdrop-blur-xl border-b border-gray-200 dark:border-[#2d313e] p-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1d26] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href={isHomePage ? "#download" : `/${locale}#download`}
                  className="mt-2 px-4 py-3 rounded-xl bg-[#18B7B0] text-white font-medium text-center hover:bg-[#149E98] transition-colors"
                >
                  {t("header.download")} App
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
