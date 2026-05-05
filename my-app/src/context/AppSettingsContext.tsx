"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  colorSchemeOptions,
  currencyOptions,
  languageOptions,
  type ColorSchemeOption,
  type CurrencyOption,
  type LanguageOption,
} from "@/data/models";

type AppSettingsContextValue = {
  language: LanguageOption;
  currency: CurrencyOption;
  colorScheme: ColorSchemeOption;
  locale: string;
  setLanguage: (language: LanguageOption) => void;
  setCurrency: (currency: CurrencyOption) => void;
  setColorScheme: (scheme: ColorSchemeOption) => void;
};

const LANGUAGE_TO_LOCALE: Record<LanguageOption, string> = {
  english: "en-US",
  spanish: "es-ES",
  japanese: "ja-JP",
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

const STORAGE_CURRENCY_KEY = "wanderlust.currency";
const STORAGE_COLOR_SCHEME_KEY = "wanderlust.colorScheme";

type AppSettingsProviderProps = {
  children: ReactNode;
};

export function AppSettingsProvider({ children }: AppSettingsProviderProps) {
  const [language, setLanguageState] = useState<LanguageOption>("english");
  const [currency, setCurrencyState] = useState<CurrencyOption>("USD");
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeOption>("light");

  useEffect(() => {
    const storedCurrency = window.localStorage.getItem(STORAGE_CURRENCY_KEY);
    const storedColorScheme = window.localStorage.getItem(STORAGE_COLOR_SCHEME_KEY);

    if (
      storedCurrency &&
      currencyOptions.includes(storedCurrency as CurrencyOption)
    ) {
      setCurrencyState(storedCurrency as CurrencyOption);
    }

    if (
      storedColorScheme &&
      colorSchemeOptions.includes(storedColorScheme as ColorSchemeOption)
    ) {
      setColorSchemeState(storedColorScheme as ColorSchemeOption);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", colorScheme === "dark");
    root.style.colorScheme = colorScheme;
  }, [colorScheme]);

  function setLanguage(languageValue: LanguageOption) {
    setLanguageState(languageValue);
  }

  function setCurrency(currencyValue: CurrencyOption) {
    setCurrencyState(currencyValue);
    window.localStorage.setItem(STORAGE_CURRENCY_KEY, currencyValue);
  }

  function setColorScheme(schemeValue: ColorSchemeOption) {
    setColorSchemeState(schemeValue);
    window.localStorage.setItem(STORAGE_COLOR_SCHEME_KEY, schemeValue);
  }

  const locale = LANGUAGE_TO_LOCALE[language];

  const value = useMemo(
    () => ({
      language,
      currency,
      colorScheme,
      locale,
      setLanguage,
      setCurrency,
      setColorScheme,
    }),
    [colorScheme, currency, language, locale]
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
export const appColorSchemeOptions = colorSchemeOptions;
