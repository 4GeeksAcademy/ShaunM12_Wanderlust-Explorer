"use client";

import Image from "next/image";
import { ExperienceCard } from "@/components/ExperienceCard";
import { useAppSettings } from "@/context/AppSettingsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { experiences } from "@/data/experiences";
import { mockUser } from "@/data/user";

export default function ProfilePage() {
  const { language, currency, locale } = useAppSettings();
  const { favoriteIdSet, isFavorite, toggleFavorite } = useFavorites();
  const isSpanish = language === "spanish";

  const favoriteExperiences = experiences.filter((experience) => favoriteIdSet.has(experience.id));

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
        {isSpanish ? "Perfil" : "Profile"}
      </h1>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200">
            {mockUser.avatarUrl ? (
              <Image
                src={mockUser.avatarUrl}
                alt={mockUser.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : null}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">{mockUser.name}</h2>
            <p className="text-sm text-slate-600">{mockUser.email}</p>
            <p className="text-sm text-slate-600">
              {isSpanish ? "Autenticado" : "Authenticated"}: {mockUser.isAuthenticated ? (isSpanish ? "Si" : "Yes") : "No"}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>{isSpanish ? "Idioma preferido" : "Preferred language"}: {language}</p>
          <p>{isSpanish ? "Moneda preferida" : "Preferred currency"}: {currency}</p>
          <p>{isSpanish ? "Idioma de visualizacion de moneda" : "Currency display language"}: {language}</p>
          <p>Locale: {locale}</p>
          <p>{isSpanish ? "Aeropuerto de origen" : "Home airport"}: {mockUser.preferences.homeAirport ?? (isSpanish ? "No definido" : "Not set")}</p>
          <p>{isSpanish ? "Favoritos guardados" : "Saved favorites"}: {favoriteExperiences.length}</p>
          <p>{isSpanish ? "Reservas totales" : "Total bookings"}: {mockUser.bookings.length}</p>
        </div>
      </article>

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-slate-900">
          {isSpanish ? "Experiencias favoritas" : "Favorite Experiences"}
        </h2>
        {favoriteExperiences.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            {isSpanish
              ? "Aun no has seleccionado experiencias favoritas."
              : "You have not selected any favorite experiences yet."}
          </p>
        ) : (
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
        )}
      </section>
    </section>
  );
}
