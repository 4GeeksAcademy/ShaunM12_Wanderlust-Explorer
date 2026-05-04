"use client";

import { ExperienceCard } from "@/components/ExperienceCard";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { experiences } from "@/data/experiences";

export default function FavoritesPage() {
  const { language } = useAppSettings();
  const isSpanish = language === "spanish";
  const { favoriteIdSet, isFavorite, toggleFavorite } = useFavorites();

  const favoriteExperiences = experiences.filter((experience) => favoriteIdSet.has(experience.id));

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          {isSpanish ? "Tus favoritos" : "Your Favorites"}
        </h1>
        <p className="text-sm text-slate-600">
          {isSpanish
            ? `${favoriteExperiences.length} experiencias seleccionadas por ti.`
            : `${favoriteExperiences.length} experiences you have selected.`}
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
