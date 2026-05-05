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

  const text = {
    english: {
      title: "Profile",
      authenticated: "Authenticated",
      yes: "Yes",
      no: "No",
      preferredLanguage: "Preferred language",
      preferredCurrency: "Preferred currency",
      displayLanguage: "Currency display language",
      homeAirport: "Home airport",
      notSet: "Not set",
      savedFavorites: "Saved favorites",
      totalBookings: "Total bookings",
      favoriteExperiences: "Favorite Experiences",
      noFavorites: "You have not selected any favorite experiences yet.",
    },
    spanish: {
      title: "Perfil",
      authenticated: "Autenticado",
      yes: "Sí",
      no: "No",
      preferredLanguage: "Idioma preferido",
      preferredCurrency: "Moneda preferida",
      displayLanguage: "Idioma de visualización de moneda",
      locale: "Configuración regional",
      homeAirport: "Aeropuerto de origen",
      notSet: "No definido",
      savedFavorites: "Favoritos guardados",
      totalBookings: "Reservas totales",
      favoriteExperiences: "Experiencias favoritas",
      noFavorites: "Aún no has seleccionado experiencias favoritas.",
    },
    japanese: {
      title: "プロフィール",
      authenticated: "認証済み",
      yes: "はい",
      no: "いいえ",
      preferredLanguage: "優先言語",
      preferredCurrency: "優先通貨",
      displayLanguage: "通貨表示言語",
      locale: "ロケール",
      homeAirport: "出発空港",
      notSet: "未設定",
      savedFavorites: "保存済みお気に入り",
      totalBookings: "予約件数",
      favoriteExperiences: "お気に入りの体験",
      noFavorites: "まだお気に入りの体験を選択していません。",
    },
  } as const;

  const localeLabel =
    language === "spanish"
        ? text.spanish.locale
      : language === "japanese"
        ? text.japanese.locale
        : "Locale";

  const labels = text[language];

  const favoriteExperiences = experiences.filter((experience) => favoriteIdSet.has(experience.id));

  return (
    <section className="space-y-6">
      <h1 className="border border-stone-300 bg-stone-50 p-6 font-serif text-5xl font-semibold text-stone-800 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 sm:text-6xl">{labels.title}</h1>
      <article className="border border-stone-300 bg-stone-50 p-6 shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 overflow-hidden border border-stone-300 dark:border-stone-700">
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
            <h2 className="font-serif text-3xl font-semibold text-stone-800 dark:text-stone-100">{mockUser.name}</h2>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">{mockUser.email}</p>
            <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
              {labels.authenticated}: {mockUser.isAuthenticated ? labels.yes : labels.no}
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 text-sm font-medium text-stone-600 dark:text-stone-300 sm:grid-cols-2">
          <p>{labels.preferredLanguage}: {language}</p>
          <p>{labels.preferredCurrency}: {currency}</p>
          <p>{labels.displayLanguage}: {language}</p>
          <p>{localeLabel}: {locale}</p>
          <p>{labels.homeAirport}: {mockUser.preferences.homeAirport ?? labels.notSet}</p>
          <p>{labels.savedFavorites}: {favoriteExperiences.length}</p>
          <p>{labels.totalBookings}: {mockUser.bookings.length}</p>
        </div>
      </article>

      <section className="space-y-3">
        <h2 className="font-serif text-4xl font-semibold text-stone-800 dark:text-stone-100">{labels.favoriteExperiences}</h2>
        {favoriteExperiences.length === 0 ? (
          <p className="border border-stone-300 bg-stone-50 p-6 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            {labels.noFavorites}
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
