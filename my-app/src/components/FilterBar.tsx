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

  const labels = {
    english: {
      category: "Category",
      allCategories: "All categories",
      destination: "Destination",
      destinationPlaceholder: "Filter by city or country",
      adventure: "Adventure",
      culture: "Culture",
      food: "Food",
      wellness: "Wellness",
      nature: "Nature",
    },
    spanish: {
      category: "Categoría",
      allCategories: "Todas las categorías",
      destination: "Destino",
      destinationPlaceholder: "Filtrar por ciudad o país",
      adventure: "Aventura",
      culture: "Cultura",
      food: "Gastronomía",
      wellness: "Bienestar",
      nature: "Naturaleza",
    },
    japanese: {
      category: "カテゴリ",
      allCategories: "すべてのカテゴリ",
      destination: "目的地",
      destinationPlaceholder: "都市名または国名で絞り込み",
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

  return (
    <div className={`flex flex-wrap items-end gap-3 border border-stone-300 bg-stone-50 p-4 shadow-sm dark:border-stone-600 dark:bg-stone-900 ${className}`}>
      <label className="min-w-36 flex-1 text-sm">
        <span className="mb-1 block font-semibold uppercase tracking-[0.15em] text-stone-600 dark:text-stone-300">{text.category}</span>
        <select
          name="category"
          value={selectedCategory}
          onChange={(event) => onCategoryChange?.(event.target.value)}
          className="w-full border border-stone-300 bg-white px-3 py-2 font-medium text-stone-700 outline-none transition focus:border-amber-300 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-amber-700"
        >
          <option value="">{text.allCategories}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category] ?? category}
            </option>
          ))}
        </select>
      </label>
      <label className="min-w-52 flex-1 text-sm">
        <span className="mb-1 block font-semibold uppercase tracking-[0.15em] text-stone-600 dark:text-stone-300">{text.destination}</span>
        <input
          type="search"
          name="destination"
          value={destinationValue}
          onChange={(event) => onDestinationChange?.(event.target.value)}
          placeholder={text.destinationPlaceholder}
          className="w-full border border-stone-300 bg-white px-3 py-2 font-medium text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-amber-300 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-700"
        />
      </label>
    </div>
  );
}
