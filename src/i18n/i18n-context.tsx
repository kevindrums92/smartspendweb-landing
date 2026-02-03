"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { locales, defaultLocale, type Locale } from "./config";

// Import all messages
import esMessages from "../../messages/es.json";
import enMessages from "../../messages/en.json";
import ptMessages from "../../messages/pt.json";
import frMessages from "../../messages/fr.json";

const messages: Record<Locale, typeof esMessages> = {
  es: esMessages,
  en: enMessages,
  pt: ptMessages,
  fr: frMessages,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  locales: Locale[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ 
  children, 
  initialLocale = defaultLocale 
}: { 
  children: ReactNode; 
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      // Update URL without reloading
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(/^\/(es|en|pt|fr)/, `/${newLocale}`);
      if (newPath !== currentPath) {
        window.history.pushState({}, "", newPath);
      }
    }
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to default locale
        let fallbackValue: unknown = messages[defaultLocale];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
            fallbackValue = (fallbackValue as Record<string, unknown>)[fk];
          } else {
            return key; // Return key if not found
          }
        }
        return typeof fallbackValue === "string" ? fallbackValue : key;
      }
    }
    
    return typeof value === "string" ? value : key;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, locales }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
