"use client";

import { useAppSettings } from "@/context/AppSettingsContext";

type FilterBarProps = {
  categories: string[];
  selectedCategory?: string;
  destinationValue?: string;
  className?: string;
  onCategoryChange?: (value: string) => void;
  onDestinationChange?: (value: string) => void;
};

export function FilterBar({
  categories,
  selectedCategory = "",
  destinationValue = "",
  className = "",
  onCategoryChange,
  onDestinationChange,
}: FilterBarProps) {
  const { language } = useAppSettings();
  const isSpanish = language === "spanish";

  const categoryLabels: Record<string, string> = {
    adventure: isSpanish ? "Aventura" : "Adventure",
    culture: isSpanish ? "Cultura" : "Culture",
    food: isSpanish ? "Gastronomia" : "Food",
    wellness: isSpanish ? "Bienestar" : "Wellness",
    nature: isSpanish ? "Naturaleza" : "Nature",
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 ${className}`}>
      <label className="min-w-36 flex-1 text-sm">
        <span className="mb-1 block font-semibold text-slate-700">{isSpanish ? "Categoria" : "Category"}</span>
        <select
          name="category"
          value={selectedCategory}
          onChange={(event) => onCategoryChange?.(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800"
        >
          <option value="">{isSpanish ? "Todas las categorias" : "All categories"}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category] ?? category}
            </option>
          ))}
        </select>
      </label>
      <label className="min-w-52 flex-1 text-sm">
        <span className="mb-1 block font-semibold text-slate-700">{isSpanish ? "Destino" : "Destination"}</span>
        <input
          type="search"
          name="destination"
          value={destinationValue}
          onChange={(event) => onDestinationChange?.(event.target.value)}
          placeholder={isSpanish ? "Filtrar por ciudad o pais" : "Filter by city or country"}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </label>
    </div>
  );
}
