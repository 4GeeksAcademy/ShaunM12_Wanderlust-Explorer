"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  currencyOptions,
  languageOptions,
  type CurrencyOption,
  type LanguageOption,
} from "@/data/models";

type AppSettingsContextValue = {
  language: LanguageOption;
  currency: CurrencyOption;
  locale: string;
  setLanguage: (language: LanguageOption) => void;
  setCurrency: (currency: CurrencyOption) => void;
};

const LANGUAGE_TO_LOCALE: Record<LanguageOption, string> = {
  english: "en-US",
  spanish: "es-ES",
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

const STORAGE_LANGUAGE_KEY = "wanderlust.language";
const STORAGE_CURRENCY_KEY = "wanderlust.currency";

type AppSettingsProviderProps = {
  children: ReactNode;
};

export function AppSettingsProvider({ children }: AppSettingsProviderProps) {
  const [language, setLanguageState] = useState<LanguageOption>("english");
  const [currency, setCurrencyState] = useState<CurrencyOption>("USD");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(STORAGE_LANGUAGE_KEY);
    const storedCurrency = window.localStorage.getItem(STORAGE_CURRENCY_KEY);

    if (
      storedLanguage &&
      languageOptions.includes(storedLanguage as LanguageOption)
    ) {
      setLanguageState(storedLanguage as LanguageOption);
    }

    if (
      storedCurrency &&
      currencyOptions.includes(storedCurrency as CurrencyOption)
    ) {
      setCurrencyState(storedCurrency as CurrencyOption);
    }
  }, []);

  function setLanguage(languageValue: LanguageOption) {
    setLanguageState(languageValue);
    window.localStorage.setItem(STORAGE_LANGUAGE_KEY, languageValue);
  }

  function setCurrency(currencyValue: CurrencyOption) {
    setCurrencyState(currencyValue);
    window.localStorage.setItem(STORAGE_CURRENCY_KEY, currencyValue);
  }

  const locale = LANGUAGE_TO_LOCALE[language];

  const value = useMemo(
    () => ({
      language,
      currency,
      locale,
      setLanguage,
      setCurrency,
    }),
    [currency, language, locale]
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }

  return context;
}

export const appLanguageOptions = languageOptions;
export const appCurrencyOptions = currencyOptions;
