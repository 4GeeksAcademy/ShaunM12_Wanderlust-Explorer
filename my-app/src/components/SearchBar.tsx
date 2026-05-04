"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useAppSettings } from "@/context/AppSettingsContext";

type SearchBarProps = {
  action?: string;
  placeholder?: string;
  submitLabel?: string;
  defaultValue?: string;
  value?: string;
  compact?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export function SearchBar({
  action = "/experiences",
  placeholder,
  submitLabel,
  defaultValue = "",
  value,
  compact = false,
  onChange,
  onSubmit,
}: SearchBarProps) {
  const { language } = useAppSettings();
  const isSpanish = language === "spanish";

  const resolvedPlaceholder =
    placeholder ??
    (isSpanish
      ? "Buscar experiencias o destinos"
      : "Search experiences or destinations");

  const resolvedSubmitLabel = submitLabel ?? (isSpanish ? "Buscar" : "Search");

  const isControlled = typeof value === "string";
  const [internalQuery, setInternalQuery] = useState(defaultValue);
  const query = isControlled ? value : internalQuery;

  useEffect(() => {
    if (isControlled) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get("q");
    if (urlQuery !== null) {
      setInternalQuery(urlQuery);
      return;
    }

    setInternalQuery(defaultValue);
  }, [defaultValue, isControlled]);

  function handleChange(nextValue: string) {
    if (!isControlled) {
      setInternalQuery(nextValue);
    }

    onChange?.(nextValue);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!onSubmit) {
      return;
    }

    event.preventDefault();
    onSubmit(query);
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={resolvedPlaceholder}
        className={`w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${compact ? "text-sm" : "text-base"}`}
      />
      <button
        type="submit"
        className="rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
      >
        {resolvedSubmitLabel}
      </button>
    </form>
  );
}
