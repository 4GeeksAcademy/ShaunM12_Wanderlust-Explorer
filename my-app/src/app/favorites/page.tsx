"use client";

import { ExperienceCard } from "@/components/ExperienceCard";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { experiences } from "@/data/experiences";

export default function FavoritesPage() {
  const { language } = useAppSettings();
  const text = {
    english: {
      title: "Your Favorites",
      subtitle: (count: number) => `${count} experiences you have selected.`,
    },
    spanish: {
      title: "Tus favoritos",
      subtitle: (count: number) => `${count} experiencias seleccionadas por ti.`,
    },
    japanese: {
      title: "お気に入り",
      subtitle: (count: number) => `選択した体験は${count}件です。`,
    },
  } as const;

  const labels = text[language];
  const { favoriteIdSet, isFavorite, toggleFavorite } = useFavorites();

  const favoriteExperiences = experiences.filter((experience) => favoriteIdSet.has(experience.id));

  return (
    <section className="space-y-6">
      <div className="space-y-2 border border-stone-300 bg-stone-50 p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800/80 dark:text-amber-300/80">Wishlist Collection</p>
        <h1 className="font-serif text-5xl font-semibold text-stone-800 dark:text-stone-100 sm:text-6xl">{labels.title}</h1>
        <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
          {labels.subtitle(favoriteExperiences.length)}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteExperiences.map((experience) => (
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
    </section>
  );
}
