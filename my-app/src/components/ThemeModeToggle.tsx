"use client";

import { useAppSettings } from "@/context/AppSettingsContext";
import { useThemeMode } from "@/hooks/useThemeMode";

const labels = {
  english: {
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
  },
  spanish: {
    switchToDark: "Cambiar a modo oscuro",
    switchToLight: "Cambiar a modo claro",
  },
  japanese: {
    switchToDark: "ダークモードに切り替え",
    switchToLight: "ライトモードに切り替え",
  },
} as const;

export function ThemeModeToggle() {
  const { language } = useAppSettings();
  const { isDark, toggleTheme } = useThemeMode();
  const text = labels[language];
  const ariaLabel = isDark ? text.switchToLight : text.switchToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      className="flex h-11 w-11 items-center justify-center border border-stone-300 bg-stone-50 text-stone-700 shadow-sm transition hover:border-amber-300 hover:text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-amber-700 dark:hover:text-amber-100"
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3V5M12 19V21M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M3 12H5M19 12H21M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
