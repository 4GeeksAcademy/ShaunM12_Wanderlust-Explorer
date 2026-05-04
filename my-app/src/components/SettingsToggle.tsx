"use client";

import { useEffect, useRef, useState } from "react";
import {
  appCurrencyOptions,
  appLanguageOptions,
  useAppSettings,
} from "@/context/AppSettingsContext";
import type { CurrencyOption, LanguageOption } from "@/data/models";

const languageNames = {
  english: { english: "English", spanish: "Ingles" },
  spanish: { english: "Spanish", spanish: "Espanol" },
} as const;

export function SettingsToggle() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { language, currency, setLanguage, setCurrency } = useAppSettings();
  const isSpanish = language === "spanish";

  const languageLabel = isSpanish ? "Idioma" : "Language";
  const currencyLabel = isSpanish ? "Moneda" : "Currency";
  const closeLabel = isSpanish ? "Cerrar" : "Close";
  const ariaLabel = isSpanish
    ? `${languageLabel} ${languageNames[language].spanish}, ${currencyLabel} ${currency}`
    : `${languageLabel} ${languageNames[language].english}, ${currencyLabel} ${currency}`;

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
        className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
          open
            ? "border-slate-400 bg-slate-200"
            : "border-slate-200 bg-slate-100 hover:bg-slate-200"
        }`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={ariaLabel}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6 text-slate-900"
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
          className="absolute right-0 z-30 mt-2 w-64 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg"
          role="dialog"
          aria-label={isSpanish ? "Configuracion" : "Settings"}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {isSpanish ? "Configuracion" : "Settings"}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              {closeLabel}
            </button>
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-slate-700">{languageLabel}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguageOption)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800"
            >
              {appLanguageOptions.map((option) => (
                <option key={option} value={option}>
                  {isSpanish ? languageNames[option].spanish : languageNames[option].english}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-semibold text-slate-700">{currencyLabel}</span>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value as CurrencyOption)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800"
            >
              {appCurrencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : null}
    </div>
  );
}
