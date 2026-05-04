"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { Experience } from "@/data/models";
import { useAppSettings } from "@/context/AppSettingsContext";

const CURRENCY_PER_USD = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154,
  AUD: 1.52,
  CNY: 7.23,
} as const;

const CATEGORY_LABELS = {
  adventure: { english: "Adventure", spanish: "Aventura" },
  culture: { english: "Culture", spanish: "Cultura" },
  food: { english: "Food", spanish: "Gastronomia" },
  wellness: { english: "Wellness", spanish: "Bienestar" },
  nature: { english: "Nature", spanish: "Naturaleza" },
} as const;

const BADGE_LABELS: Record<NonNullable<Experience["badge"]>, { english: string; spanish: string }> = {
  "Likely to Sell Out": { english: "Likely to Sell Out", spanish: "Probable que se agote" },
  "Special Offer": { english: "Special Offer", spanish: "Oferta especial" },
  "Travelers Choice": { english: "Travelers Choice", spanish: "Eleccion de viajeros" },
};

const TITLE_LABELS: Record<string, { english: string; spanish: string }> = {
  "Guided City Highlights": { english: "Guided City Highlights", spanish: "Lo mejor de la ciudad con guia" },
  "Sunset Panorama Tour": { english: "Sunset Panorama Tour", spanish: "Tour panoramico al atardecer" },
  "Hidden Gems Walking Tour": { english: "Hidden Gems Walking Tour", spanish: "Caminata por joyas ocultas" },
  "Museum and Culture Pass": { english: "Museum and Culture Pass", spanish: "Pase de museos y cultura" },
  "Landmark Priority Entry": { english: "Landmark Priority Entry", spanish: "Entrada prioritaria a monumentos" },
  "Neighborhood Food Crawl": { english: "Neighborhood Food Crawl", spanish: "Ruta gastronomica por barrios" },
  "Riverside Evening Cruise": { english: "Riverside Evening Cruise", spanish: "Crucero nocturno junto al rio" },
  "Historic District Discovery": { english: "Historic District Discovery", spanish: "Descubrimiento del distrito historico" },
  "Scenic Full-Day Escape": { english: "Scenic Full-Day Escape", spanish: "Escapada panoramica de dia completo" },
  "Top Attractions Fast Track": { english: "Top Attractions Fast Track", spanish: "Acceso rapido a atracciones top" },
};

const DESCRIPTION_LABELS: Record<string, { english: string; spanish: string }> = {
  "Explore iconic landmarks with a local expert and small-group pacing.": {
    english: "Explore iconic landmarks with a local expert and small-group pacing.",
    spanish: "Explora lugares iconicos con un experto local y ritmo de grupo reducido.",
  },
  "Experience the local vibe with curated stops, stories, and insider tips.": {
    english: "Experience the local vibe with curated stops, stories, and insider tips.",
    spanish: "Vive el ambiente local con paradas seleccionadas, historias y consejos expertos.",
  },
  "Enjoy a flexible itinerary designed for comfort, discovery, and value.": {
    english: "Enjoy a flexible itinerary designed for comfort, discovery, and value.",
    spanish: "Disfruta un itinerario flexible pensado para comodidad, descubrimiento y valor.",
  },
  "Discover top highlights and hidden corners with timed entry advantages.": {
    english: "Discover top highlights and hidden corners with timed entry advantages.",
    spanish: "Descubre lugares destacados y rincones ocultos con ventajas de horario de entrada.",
  },
  "Take in unforgettable views, regional flavors, and authentic culture.": {
    english: "Take in unforgettable views, regional flavors, and authentic culture.",
    spanish: "Disfruta vistas inolvidables, sabores regionales y cultura autentica.",
  },
};

const CITY_TRANSLATIONS: Record<string, { english: string; spanish: string }> = {
  Paris: { english: "Paris", spanish: "Paris" },
  Rome: { english: "Rome", spanish: "Roma" },
  Barcelona: { english: "Barcelona", spanish: "Barcelona" },
  London: { english: "London", spanish: "Londres" },
  "New York": { english: "New York", spanish: "Nueva York" },
  Tokyo: { english: "Tokyo", spanish: "Tokio" },
  "Cape Town": { english: "Cape Town", spanish: "Ciudad del Cabo" },
  Sydney: { english: "Sydney", spanish: "Sidney" },
  Reykjavik: { english: "Reykjavik", spanish: "Reikiavik" },
  Dubai: { english: "Dubai", spanish: "Dubai" },
};

const COUNTRY_TRANSLATIONS: Record<string, { english: string; spanish: string }> = {
  France: { english: "France", spanish: "Francia" },
  Italy: { english: "Italy", spanish: "Italia" },
  Spain: { english: "Spain", spanish: "Espana" },
  "United Kingdom": { english: "United Kingdom", spanish: "Reino Unido" },
  "United States": { english: "United States", spanish: "Estados Unidos" },
  Japan: { english: "Japan", spanish: "Japon" },
  "South Africa": { english: "South Africa", spanish: "Sudafrica" },
  Australia: { english: "Australia", spanish: "Australia" },
  Iceland: { english: "Iceland", spanish: "Islandia" },
  "United Arab Emirates": {
    english: "United Arab Emirates",
    spanish: "Emiratos Arabes Unidos",
  },
};

const CANCELLATION_LABELS: Record<string, { english: string; spanish: string }> = {
  "Non-refundable": { english: "Non-refundable", spanish: "No reembolsable" },
  "Free cancellation up to 24 hours before start": {
    english: "Free cancellation up to 24 hours before start",
    spanish: "Cancelacion gratuita hasta 24 horas antes del inicio",
  },
};

function translateByLanguage(value: { english: string; spanish: string }, isSpanish: boolean) {
  return isSpanish ? value.spanish : value.english;
}

function translateDestination(destination: string, isSpanish: boolean) {
  const [cityPart, countryPart] = destination.split(",").map((segment) => segment.trim());

  const translatedCity = cityPart
    ? translateByLanguage(CITY_TRANSLATIONS[cityPart] ?? { english: cityPart, spanish: cityPart }, isSpanish)
    : destination;
  const translatedCountry = countryPart
    ? translateByLanguage(
        COUNTRY_TRANSLATIONS[countryPart] ?? { english: countryPart, spanish: countryPart },
        isSpanish
      )
    : "";

  return translatedCountry ? `${translatedCity}, ${translatedCountry}` : translatedCity;
}

function translateTitle(title: string, isSpanish: boolean) {
  const sortedTitleKeys = Object.keys(TITLE_LABELS).sort((a, b) => b.length - a.length);

  for (const key of sortedTitleKeys) {
    if (title.endsWith(key)) {
      const city = title.slice(0, -key.length).trim();
      const translatedCity = translateByLanguage(
        CITY_TRANSLATIONS[city] ?? { english: city, spanish: city },
        isSpanish
      );
      const translatedSuffix = translateByLanguage(TITLE_LABELS[key], isSpanish);
      return `${translatedCity} ${translatedSuffix}`;
    }
  }

  return title;
}

function translateDescription(description: string, isSpanish: boolean) {
  return translateByLanguage(
    DESCRIPTION_LABELS[description] ?? { english: description, spanish: description },
    isSpanish
  );
}

function translateDuration(duration: string | undefined, isSpanish: boolean) {
  if (!duration) {
    return undefined;
  }

  if (!isSpanish) {
    return duration;
  }

  return duration.replace(" hours", " horas");
}

function convertCurrency(amount: number, fromCurrency: Experience["currency"], toCurrency: Experience["currency"]) {
  const amountInUsd = amount / CURRENCY_PER_USD[fromCurrency];
  return amountInUsd * CURRENCY_PER_USD[toCurrency];
}

type ExperienceCardProps = {
  experience: Experience;
  href?: string;
  showFullDetails?: boolean;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: (experienceId: string) => void;
};

export function ExperienceCard({
  experience,
  href,
  showFullDetails = false,
  showFavoriteButton = false,
  isFavorite,
  onFavoriteToggle,
}: ExperienceCardProps): ReactElement {
  const favoriteActive = isFavorite ?? Boolean(experience.isFavorite);
  const { currency: selectedCurrency, locale, language } = useAppSettings();
  const isSpanish = language === "spanish";
  const translatedDestination = translateDestination(experience.destination, isSpanish);
  const translatedTitle = translateTitle(experience.title, isSpanish);
  const translatedDescription = translateDescription(experience.description, isSpanish);
  const translatedDuration = translateDuration(experience.duration, isSpanish);
  const translatedBadge = experience.badge
    ? translateByLanguage(BADGE_LABELS[experience.badge], isSpanish)
    : null;
  const translatedCategory = translateByLanguage(CATEGORY_LABELS[experience.category], isSpanish);
  const translatedCancellation = translateByLanguage(
    CANCELLATION_LABELS[experience.cancellationPolicy ?? ""] ?? {
      english: experience.cancellationPolicy ?? "Policy varies by supplier",
      spanish: experience.cancellationPolicy ?? "La politica varia segun el proveedor",
    },
    isSpanish
  );

  const convertedPrice = convertCurrency(
    experience.price,
    experience.currency,
    selectedCurrency
  );

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: selectedCurrency,
    maximumFractionDigits: selectedCurrency === "JPY" ? 0 : 2,
  }).format(convertedPrice);

  const content: ReactElement = (
    <>
      <div className="relative h-44 w-full">
        <Image
          src={experience.imageUrl}
          alt={translatedTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {translatedBadge ? (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-amber-950">
            {translatedBadge}
          </span>
        ) : null}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {translatedDestination}
        </p>
        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">{translatedTitle}</h3>
        <p className="line-clamp-2 text-sm text-slate-600">{translatedDescription}</p>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            {experience.rating.toFixed(1)} ({experience.reviewCount.toLocaleString()} {isSpanish ? "resenas" : "reviews"})
          </span>
          {translatedDuration ? <span>{translatedDuration}</span> : null}
        </div>
        <p className="text-base font-extrabold text-slate-900">
          {isSpanish ? "Desde" : "From"} {formattedPrice}
        </p>
        {showFullDetails ? (
          <div className="space-y-1 border-t border-slate-200 pt-2 text-sm text-slate-600">
            <p>{isSpanish ? "Categoria" : "Category"}: {translatedCategory}</p>
            <p>
              {isSpanish ? "Cancelacion" : "Cancellation"}: {translatedCancellation}
            </p>
            <p>{isSpanish ? "Guardado" : "Saved"}: {favoriteActive ? (isSpanish ? "Si" : "Yes") : (isSpanish ? "No" : "No")}</p>
            <p>ID: {experience.id}</p>
          </div>
        ) : null}
      </div>
      </>
  );

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {href ? (
        <Link
          href={href}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          {content}
        </Link>
      ) : (
        content
      )}

      {showFavoriteButton ? (
        <button
          type="button"
          aria-label={favoriteActive ? (isSpanish ? "Quitar de favoritos" : "Remove from favorites") : (isSpanish ? "Agregar a favoritos" : "Add to favorites")}
          aria-pressed={favoriteActive}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onFavoriteToggle?.(experience.id);
          }}
          className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border text-lg leading-none shadow-sm transition ${
            favoriteActive
              ? "border-rose-300 bg-rose-500 text-white hover:bg-rose-600"
              : "border-slate-300 bg-white/95 text-slate-700 hover:bg-slate-100"
          }`}
        >
          {favoriteActive ? "♥" : "♡"}
        </button>
      ) : null}
    </article>
  );
}
