"use client";

import { useAppSettings } from "@/context/AppSettingsContext";

export function useThemeMode() {
  const { colorScheme, setColorScheme } = useAppSettings();
  const isDark = colorScheme === "dark";

  function toggleTheme() {
    setColorScheme(isDark ? "light" : "dark");
  }

  return {
    theme: colorScheme,
    isDark,
    setTheme: setColorScheme,
    toggleTheme,
  };
}
