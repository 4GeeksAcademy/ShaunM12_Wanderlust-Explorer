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

  const labels = {
    english: {
      placeholder: "Search experiences or destinations",
      submit: "Search",
    },
    spanish: {
      placeholder: "Buscar experiencias o destinos",
      submit: "Buscar",
    },
    japanese: {
      placeholder: "体験または目的地を検索",
      submit: "検索",
    },
  } as const;

  const text = labels[language];

  const resolvedPlaceholder =
    placeholder ?? text.placeholder;

  const resolvedSubmitLabel = submitLabel ?? text.submit;

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
    <form
      action={action}
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-0 border border-stone-300 bg-stone-50 shadow-sm dark:border-stone-600 dark:bg-stone-900"
    >
      <input
        type="search"
        name="q"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={resolvedPlaceholder}
        className={`w-full border-0 bg-transparent px-4 py-3 font-medium text-stone-700 outline-none transition placeholder:text-stone-400 focus:bg-amber-50/50 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-stone-800 ${compact ? "text-sm" : "text-base"}`}
      />
      <button
        type="submit"
        className="border-l border-stone-300 bg-emerald-800 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-100 transition hover:bg-emerald-700 dark:border-stone-600 dark:bg-emerald-900 dark:text-emerald-50 dark:hover:bg-emerald-800"
      >
        {resolvedSubmitLabel}
      </button>
    </form>
  );
}
