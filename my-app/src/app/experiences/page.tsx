"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterBar } from "@/components/FilterBar";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SearchBar } from "@/components/SearchBar";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { experiences } from "@/data/experiences";

const MAX_CATEGORY_OPTIONS = 5;

function updateQueryParam(
  params: URLSearchParams,
  key: string,
  value: string
) {
  const cleanedValue = value.trim();

  if (cleanedValue) {
    params.set(key, cleanedValue);
    return;
  }

  params.delete(key);
}

function ExperiencesPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { language } = useAppSettings();
  const { isFavorite, toggleFavorite } = useFavorites();

  const labels = {
    english: {
      search: "Search",
      category: "Category",
      destination: "Destination",
      title: "All Experiences",
      subtitle: "Showing all experiences in an easy to use explorer grid",
      removeFilter: "Remove",
      clearAll: "Clear all",
      noResults: "No results found for your current filters.",
      loading: "Loading experiences...",
      adventure: "Adventure",
      culture: "Culture",
      food: "Food",
      wellness: "Wellness",
      nature: "Nature",
    },
    spanish: {
      search: "Búsqueda",
      category: "Categoría",
      destination: "Destino",
      title: "Todas las experiencias",
      subtitle: "Mostrando todas las experiencias en una cuadrícula del explorador fácil de usar.",
      removeFilter: "Quitar filtro",
      clearAll: "Limpiar todo",
      noResults: "No se encontraron resultados con tus filtros actuales.",
      loading: "Cargando experiencias...",
      adventure: "Aventura",
      culture: "Cultura",
      food: "Gastronomía",
      wellness: "Bienestar",
      nature: "Naturaleza",
    },
    japanese: {
      search: "検索",
      category: "カテゴリ",
      destination: "目的地",
      title: "すべての体験",
      subtitle: "使いやすい探索グリッドですべての体験を表示しています。",
      removeFilter: "フィルターを削除",
      clearAll: "すべてクリア",
      noResults: "現在のフィルターに一致する結果が見つかりません。",
      loading: "体験を読み込み中...",
      adventure: "アドベンチャー",
      culture: "カルチャー",
      food: "グルメ",
      wellness: "ウェルネス",
      nature: "自然",
    },
  } as const;

  const text = labels[language];

  const categoryLabels: Record<string, string> = {
    adventure: text.adventure,
    culture: text.culture,
    food: text.food,
    wellness: text.wellness,
    nature: text.nature,
  };

  const query = (searchParams.get("q") ?? "").trim();
  const selectedCategory = (searchParams.get("category") ?? "").trim();
  const destinationFilter = (searchParams.get("destination") ?? "").trim();

  const [draftQuery, setDraftQuery] = useState(query);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  const categoryOptions = useMemo(
    () =>
      Array.from(
        new Set(
          experiences
            .map((experience) => experience.category?.trim())
            .filter((category): category is string => Boolean(category))
        )
      ).slice(0, MAX_CATEGORY_OPTIONS),
    []
  );

  function applyFilters(nextValues: {
    query?: string;
    category?: string;
    destination?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    updateQueryParam(params, "q", nextValues.query ?? query);
    updateQueryParam(params, "category", nextValues.category ?? selectedCategory);
    updateQueryParam(params, "destination", nextValues.destination ?? destinationFilter);

    const nextQueryString = params.toString();
    const targetPath = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;
    router.replace(targetPath, { scroll: false });
  }

  const normalizedQuery = query.toLowerCase();
  const normalizedCategory = selectedCategory.toLowerCase();
  const normalizedDestination = destinationFilter.toLowerCase();

  const categorySearchAliases: Record<string, string[]> = {
    adventure: ["adventure", "aventura"],
    culture: ["culture", "cultura"],
    food: ["food", "gastronomia", "gastronomía", "comida"],
    wellness: ["wellness", "bienestar"],
    nature: ["nature", "naturaleza"],
  };

  const filteredExperiences = experiences.filter((experience) => {
    const categoryTerms = categorySearchAliases[experience.category] ?? [experience.category];
    const searchableText = [
      experience.title,
      experience.description,
      experience.destination,
      experience.category,
      ...categoryTerms,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);

    const matchesCategory =
      !normalizedCategory ||
      (experience.category ?? "").toLowerCase() === normalizedCategory;

    const matchesDestination =
      !normalizedDestination ||
      experience.destination.toLowerCase().includes(normalizedDestination);

    return matchesSearch && matchesCategory && matchesDestination;
  });

  const activeFilters = [
    query
      ? {
          id: "q",
          label: `${text.search}: ${query}`,
          onRemove: () => applyFilters({ query: "" }),
        }
      : null,
    selectedCategory
      ? {
          id: "category",
          label: `${text.category}: ${categoryLabels[selectedCategory] ?? selectedCategory}`,
          onRemove: () => applyFilters({ category: "" }),
        }
      : null,
    destinationFilter
      ? {
          id: "destination",
          label: `${text.destination}: ${destinationFilter}`,
          onRemove: () => applyFilters({ destination: "" }),
        }
      : null,
  ].filter((item): item is { id: string; label: string; onRemove: () => void } => Boolean(item));

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <section className="space-y-6">
      <div className="space-y-2 border border-stone-300 bg-stone-50 p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/80 dark:text-emerald-300/80">Editorial Explorer</p>
        <h1 className="font-serif text-5xl font-semibold text-stone-800 dark:text-stone-100 sm:text-6xl">{text.title}</h1>
        <p className="max-w-2xl text-sm font-medium text-stone-600 dark:text-stone-300">
          {text.subtitle}
        </p>
      </div>
      <SearchBar
        action="/experiences"
        compact
        value={draftQuery}
        onChange={setDraftQuery}
        onSubmit={(value) => applyFilters({ query: value })}
      />
      <FilterBar
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        destinationValue={destinationFilter}
        onCategoryChange={(value) => applyFilters({ category: value })}
        onDestinationChange={(value) => applyFilters({ destination: value })}
      />
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 border border-stone-300 bg-stone-50 p-3 shadow-sm dark:border-stone-700 dark:bg-stone-900">
          {activeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={filter.onRemove}
              className="border border-stone-300 bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone-700 transition hover:border-amber-300 hover:text-stone-900 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-amber-700 dark:hover:text-amber-100"
              aria-label={`${text.removeFilter}: ${filter.label}`}
            >
              {filter.label} x
            </button>
          ))}
          <button
            type="button"
            onClick={() => applyFilters({ query: "", category: "", destination: "" })}
            className="ml-auto border border-emerald-900 bg-emerald-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50 transition hover:bg-emerald-800 dark:border-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-700"
          >
            {text.clearAll}
          </button>
        </div>
      )}
      {filteredExperiences.length === 0 ? (
        <p className="border border-stone-300 bg-stone-50 p-6 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
          {text.noResults}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              href={`/experiences/${experience.id}`}
              showFavoriteButton
              isFavorite={isFavorite(experience.id)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function ExperiencesPage() {
  const { language } = useAppSettings();
  const loadingText = {
    english: { title: "All Experiences", body: "Loading experiences..." },
    spanish: { title: "Todas las experiencias", body: "Cargando experiencias..." },
    japanese: { title: "すべての体験", body: "体験を読み込み中..." },
  } as const;

  const text = loadingText[language];

  return (
    <Suspense
      fallback={
        <section className="space-y-6">
          <div className="space-y-2 border border-stone-300 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-900">
            <h1 className="font-serif text-5xl font-semibold text-stone-800 dark:text-stone-100 sm:text-6xl">{text.title}</h1>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">{text.body}</p>
          </div>
        </section>
      }
    >
      <ExperiencesPageContent />
    </Suspense>
  );
}
