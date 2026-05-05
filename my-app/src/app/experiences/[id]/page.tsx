"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { experiences } from "@/data/experiences";
import { routes } from "@/data/routes";

type ExperienceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { language } = useAppSettings();
  const { isFavorite, toggleFavorite } = useFavorites();
  const labels = {
    english: {
      back: "Back to all experiences",
      title: "Experience Details",
    },
    spanish: {
      back: "Volver a todas las experiencias",
      title: "Detalles de la experiencia",
    },
    japanese: {
      back: "すべての体験に戻る",
      title: "体験の詳細",
    },
  } as const;

  const text = labels[language];
  const { id } = use(params);
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <Link href={routes.experiences} className="inline-block border border-stone-300 bg-stone-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 transition hover:border-amber-300 hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-700 dark:hover:text-amber-100">
        {text.back}
      </Link>
      <h1 className="border border-stone-300 bg-stone-50 p-6 font-serif text-5xl font-semibold text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100">{text.title}</h1>
      <div className="max-w-2xl">
        <ExperienceCard
          experience={experience}
          showFullDetails
          showFavoriteButton
          isFavorite={isFavorite(experience.id)}
          onFavoriteToggle={toggleFavorite}
        />
      </div>
    </section>
  );
}
