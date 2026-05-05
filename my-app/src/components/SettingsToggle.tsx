"use client";

import { useEffect, useRef, useState } from "react";
import {
  appColorSchemeOptions,
  appCurrencyOptions,
  appLanguageOptions,
  useAppSettings,
} from "@/context/AppSettingsContext";
import type { ColorSchemeOption, CurrencyOption, LanguageOption } from "@/data/models";

const languageNames = {
  english: { english: "English", spanish: "Inglés", japanese: "英語" },
  spanish: { english: "Spanish", spanish: "Español", japanese: "スペイン語" },
  japanese: { english: "Japanese", spanish: "Japonés", japanese: "日本語" },
} as const;

const colorSchemeNames = {
  light: { english: "Light", spanish: "Claro", japanese: "ライト" },
  dark: { english: "Dark", spanish: "Oscuro", japanese: "ダーク" },
} as const;

const uiLabels = {
  english: {
    language: "Language",
    currency: "Currency",
    colorScheme: "Color scheme",
    close: "Close",
    settings: "Settings",
    closeSettings: "Close settings",
  },
  spanish: {
    language: "Idioma",
    currency: "Moneda",
    colorScheme: "Esquema de color",
    close: "Cerrar",
    settings: "Configuración",
    closeSettings: "Cerrar configuración",
  },
  japanese: {
    language: "言語",
    currency: "通貨",
    colorScheme: "カラースキーム",
    close: "閉じる",
    settings: "設定",
    closeSettings: "設定を閉じる",
  },
} as const;

export function SettingsToggle() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { language, currency, colorScheme, setLanguage, setCurrency, setColorScheme } = useAppSettings();
  const labels = uiLabels[language];
  const languageLabel = labels.language;
  const currencyLabel = labels.currency;
  const colorSchemeLabel = labels.colorScheme;
  const closeLabel = labels.close;
  const ariaLabel = `${languageLabel} ${languageNames[language][language]}, ${currencyLabel} ${currency}, ${colorSchemeLabel} ${colorSchemeNames[colorScheme][language]}`;

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      const targetNode = event.target;
      if (targetNode instanceof Node && !containerRef.current.contains(targetNode)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-11 w-11 items-center justify-center border shadow-sm transition ${
          open
            ? "border-amber-300 bg-amber-100 text-stone-900 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-100"
            : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-300 hover:text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-amber-700 dark:hover:text-amber-100"
        }`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-slate-900 dark:text-slate-100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 3C9.7 5.2 8.5 8.2 8.5 12C8.5 15.8 9.7 18.8 12 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 3C14.3 5.2 15.5 8.2 15.5 12C15.5 15.8 14.3 18.8 12 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div
          className="absolute right-0 z-30 mt-2 w-64 space-y-3 border border-stone-300 bg-stone-50 p-4 shadow-xl dark:border-stone-600 dark:bg-stone-900"
          role="dialog"
          aria-label={labels.settings}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-700 dark:text-stone-200">
              {labels.settings}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border border-stone-300 bg-stone-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-stone-700 transition hover:border-amber-300 hover:text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-amber-700 dark:hover:text-amber-100"
              aria-label={labels.closeSettings}
            >
              {closeLabel}
            </button>
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-semibold uppercase tracking-[0.15em] text-stone-600 dark:text-stone-300">{languageLabel}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguageOption)}
              className="w-full border border-stone-300 bg-white px-3 py-2 font-medium text-stone-700 outline-none transition focus:border-amber-300 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-amber-700"
            >
              {appLanguageOptions.map((option) => (
                <option key={option} value={option}>
                  {languageNames[option][language]}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-semibold uppercase tracking-[0.15em] text-stone-600 dark:text-stone-300">{currencyLabel}</span>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as CurrencyOption)}
              className="w-full border border-stone-300 bg-white px-3 py-2 font-medium text-stone-700 outline-none transition focus:border-amber-300 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-amber-700"
            >
              {appCurrencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-semibold uppercase tracking-[0.15em] text-stone-600 dark:text-stone-300">{colorSchemeLabel}</span>
            <select
              value={colorScheme}
              onChange={(event) => setColorScheme(event.target.value as ColorSchemeOption)}
              className="w-full border border-stone-300 bg-white px-3 py-2 font-medium text-stone-700 outline-none transition focus:border-amber-300 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-amber-700"
            >
              {appColorSchemeOptions.map((option) => (
                <option key={option} value={option}>
                  {colorSchemeNames[option][language]}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}
    </div>
  );
}
