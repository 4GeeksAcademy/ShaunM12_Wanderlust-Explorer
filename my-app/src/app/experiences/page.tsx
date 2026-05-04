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
  const isSpanish = language === "spanish";

  const categoryLabels: Record<string, string> = {
    adventure: isSpanish ? "Aventura" : "Adventure",
    culture: isSpanish ? "Cultura" : "Culture",
    food: isSpanish ? "Gastronomia" : "Food",
    wellness: isSpanish ? "Bienestar" : "Wellness",
    nature: isSpanish ? "Naturaleza" : "Nature",
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
    food: ["food", "gastronomia", "comida"],
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
          label: `${isSpanish ? "Busqueda" : "Search"}: ${query}`,
          onRemove: () => applyFilters({ query: "" }),
        }
      : null,
    selectedCategory
      ? {
          id: "category",
          label: `${isSpanish ? "Categoria" : "Category"}: ${categoryLabels[selectedCategory] ?? selectedCategory}`,
          onRemove: () => applyFilters({ category: "" }),
        }
      : null,
    destinationFilter
      ? {
          id: "destination",
          label: `${isSpanish ? "Destino" : "Destination"}: ${destinationFilter}`,
          onRemove: () => applyFilters({ destination: "" }),
        }
      : null,
  ].filter((item): item is { id: string; label: string; onRemove: () => void } => Boolean(item));

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          {isSpanish ? "Todas las experiencias" : "All Experiences"}
        </h1>
        <p className="text-sm text-slate-600">
          {isSpanish
            ? "Mostrando todas las experiencias en una cuadrícula del explorador facil de usar."
            : "Showing all experiences in an easy to use explorer grid"}
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
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3">
          {activeFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={filter.onRemove}
              className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              aria-label={isSpanish ? `Quitar filtro ${filter.label}` : `Remove ${filter.label} filter`}
            >
              {filter.label} x
            </button>
          ))}
          <button
            type="button"
            onClick={() => applyFilters({ query: "", category: "", destination: "" })}
            className="ml-auto rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            {isSpanish ? "Limpiar todo" : "Clear all"}
          </button>
        </div>
      )}
      {filteredExperiences.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          {isSpanish
            ? "No se encontraron resultados con tus filtros actuales."
            : "No results found for your current filters."}
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
  const isSpanish = language === "spanish";

  return (
    <Suspense
      fallback={
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
              {isSpanish ? "Todas las experiencias" : "All Experiences"}
            </h1>
            <p className="text-sm text-slate-600">
              {isSpanish ? "Cargando experiencias..." : "Loading experiences..."}
            </p>
          </div>
        </section>
      }
    >
      <ExperiencesPageContent />
    </Suspense>
  );
}
