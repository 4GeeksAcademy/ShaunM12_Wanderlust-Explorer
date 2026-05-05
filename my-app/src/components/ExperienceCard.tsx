"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LanguageOption } from "@/data/models";
import { Experience } from "@/data/models";
import { useAppSettings } from "@/context/AppSettingsContext";

type LocalizedText = {
  english: string;
  spanish: string;
  japanese: string;
};

const CURRENCY_PER_USD = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154,
  AUD: 1.52,
  CNY: 7.23,
} as const;

const CATEGORY_LABELS = {
  adventure: { english: "Adventure", spanish: "Aventura", japanese: "アドベンチャー" },
  culture: { english: "Culture", spanish: "Cultura", japanese: "カルチャー" },
  food: { english: "Food", spanish: "Gastronomía", japanese: "グルメ" },
  wellness: { english: "Wellness", spanish: "Bienestar", japanese: "ウェルネス" },
  nature: { english: "Nature", spanish: "Naturaleza", japanese: "自然" },
} as const;

const BADGE_LABELS: Record<NonNullable<Experience["badge"]>, LocalizedText> = {
  "Likely to Sell Out": { english: "Likely to Sell Out", spanish: "Probable que se agote", japanese: "売り切れ間近" },
  "Special Offer": { english: "Special Offer", spanish: "Oferta especial", japanese: "特別オファー" },
  "Travelers Choice": { english: "Travelers Choice", spanish: "Elección de viajeros", japanese: "旅行者のおすすめ" },
};

const DESCRIPTION_LABELS: Record<string, LocalizedText> = {
  "Explore iconic landmarks with a local expert and small-group pacing.": {
    english: "Explore iconic landmarks with a local expert and small-group pacing.",
    spanish: "Explora lugares icónicos con un experto local y ritmo de grupo reducido.",
    japanese: "現地の専門ガイドと少人数ペースで、象徴的な名所を巡ります。",
  },
  "Experience the local vibe with curated stops, stories, and insider tips.": {
    english: "Experience the local vibe with curated stops, stories, and insider tips.",
    spanish: "Vive el ambiente local con paradas seleccionadas, historias y consejos expertos.",
    japanese: "厳選スポットや物語、地元のコツでその街らしさを体験できます。",
  },
  "Enjoy a flexible itinerary designed for comfort, discovery, and value.": {
    english: "Enjoy a flexible itinerary designed for comfort, discovery, and value.",
    spanish: "Disfruta un itinerario flexible pensado para comodidad, descubrimiento y valor.",
    japanese: "快適さと発見、満足度を重視した柔軟な行程を楽しめます。",
  },
  "Discover top highlights and hidden corners with timed entry advantages.": {
    english: "Discover top highlights and hidden corners with timed entry advantages.",
    spanish: "Descubre lugares destacados y rincones ocultos con ventajas de horario de entrada.",
    japanese: "時間指定入場の利点を活かして、人気名所と穴場を巡ります。",
  },
  "Take in unforgettable views, regional flavors, and authentic culture.": {
    english: "Take in unforgettable views, regional flavors, and authentic culture.",
    spanish: "Disfruta vistas inolvidables, sabores regionales y cultura auténtica.",
    japanese: "忘れられない景色、地域の味、本物の文化を満喫できます。",
  },
  "Push your limits with guided action-focused routes, expert support, and epic viewpoints.": {
    english: "Push your limits with guided action-focused routes, expert support, and epic viewpoints.",
    spanish: "Lleva tus límites al máximo con rutas de acción guiadas, apoyo experto y vistas épicas.",
    japanese: "アクティブなガイド付きルートと専門サポートで、限界に挑戦し絶景を楽しめます。",
  },
  "Dive into local history, architecture, and traditions through immersive storytelling.": {
    english: "Dive into local history, architecture, and traditions through immersive storytelling.",
    spanish: "Sumergente en la historia local, arquitectura y tradiciones con relatos inmersivos.",
    japanese: "没入感のあるストーリーを通して、地域の歴史・建築・伝統を深く知れます。",
  },
  "Taste signature local flavors with curated stops, chef insights, and unforgettable bites.": {
    english: "Taste signature local flavors with curated stops, chef insights, and unforgettable bites.",
    spanish: "Prueba sabores locales emblemáticos con paradas seleccionadas, consejos de chefs y bocados inolvidables.",
    japanese: "厳選された立ち寄り先とシェフの視点で、名物料理を堪能できます。",
  },
  "Recharge body and mind with calming rituals, restorative sessions, and scenic settings.": {
    english: "Recharge body and mind with calming rituals, restorative sessions, and scenic settings.",
    spanish: "Recarga cuerpo y mente con rituales relajantes, sesiones restaurativas y entornos escénicos.",
    japanese: "穏やかなリチュアルと回復セッション、景観豊かな環境で心身をリフレッシュ。",
  },
  "Explore protected landscapes and wildlife-rich routes with a low-impact, eco-first approach.": {
    english: "Explore protected landscapes and wildlife-rich routes with a low-impact, eco-first approach.",
    spanish: "Explora paisajes protegidos y rutas ricas en vida silvestre con un enfoque ecológico y de bajo impacto.",
    japanese: "低環境負荷のエコ志向で、保護景観と野生動物豊かなルートを巡ります。",
  },
};

const CITY_TRANSLATIONS: Record<string, LocalizedText> = {
  Queenstown: { english: "Queenstown", spanish: "Queenstown", japanese: "クイーンズタウン" },
  Banff: { english: "Banff", spanish: "Banff", japanese: "バンフ" },
  Cusco: { english: "Cusco", spanish: "Cusco", japanese: "クスコ" },
  Marrakech: { english: "Marrakech", spanish: "Marrakech", japanese: "マラケシュ" },
  Reykjavik: { english: "Reykjavik", spanish: "Reikiavik", japanese: "レイキャビク" },
  Kyoto: { english: "Kyoto", spanish: "Kioto", japanese: "京都" },
  Seville: { english: "Seville", spanish: "Sevilla", japanese: "セビリア" },
  Istanbul: { english: "Istanbul", spanish: "Estambul", japanese: "イスタンブール" },
  "Mexico City": { english: "Mexico City", spanish: "Ciudad de Mexico", japanese: "メキシコシティ" },
  Lisbon: { english: "Lisbon", spanish: "Lisboa", japanese: "リスボン" },
  Hanoi: { english: "Hanoi", spanish: "Hanói", japanese: "ハノイ" },
  "Cape Town": { english: "Cape Town", spanish: "Ciudad del Cabo", japanese: "ケープタウン" },
  Bali: { english: "Bali", spanish: "Bali", japanese: "バリ" },
  Dubrovnik: { english: "Dubrovnik", spanish: "Dubrovnik", japanese: "ドゥブロヴニク" },
  Athens: { english: "Athens", spanish: "Atenas", japanese: "アテネ" },
  Edinburgh: { english: "Edinburgh", spanish: "Edimburgo", japanese: "エディンバラ" },
  Auckland: { english: "Auckland", spanish: "Auckland", japanese: "オークランド" },
  "Chiang Mai": { english: "Chiang Mai", spanish: "Chiang Mai", japanese: "チェンマイ" },
  Patagonia: { english: "Patagonia", spanish: "Patagonia", japanese: "パタゴニア" },
  Santorini: { english: "Santorini", spanish: "Santorini", japanese: "サントリーニ" },
};

const COUNTRY_TRANSLATIONS: Record<string, LocalizedText> = {
  "New Zealand": { english: "New Zealand", spanish: "Nueva Zelanda", japanese: "ニュージーランド" },
  Canada: { english: "Canada", spanish: "Canada", japanese: "カナダ" },
  Peru: { english: "Peru", spanish: "Peru", japanese: "ペルー" },
  Morocco: { english: "Morocco", spanish: "Marruecos", japanese: "モロッコ" },
  Iceland: { english: "Iceland", spanish: "Islandia", japanese: "アイスランド" },
  Japan: { english: "Japan", spanish: "Japón", japanese: "日本" },
  Spain: { english: "Spain", spanish: "España", japanese: "スペイン" },
  Turkey: { english: "Turkey", spanish: "Turquía", japanese: "トルコ" },
  Mexico: { english: "Mexico", spanish: "Mexico", japanese: "メキシコ" },
  Portugal: { english: "Portugal", spanish: "Portugal", japanese: "ポルトガル" },
  Vietnam: { english: "Vietnam", spanish: "Vietnam", japanese: "ベトナム" },
  "South Africa": { english: "South Africa", spanish: "Sudáfrica", japanese: "南アフリカ" },
  Indonesia: { english: "Indonesia", spanish: "Indonesia", japanese: "インドネシア" },
  Croatia: { english: "Croatia", spanish: "Croacia", japanese: "クロアチア" },
  Greece: { english: "Greece", spanish: "Grecia", japanese: "ギリシャ" },
  Scotland: { english: "Scotland", spanish: "Escocia", japanese: "スコットランド" },
  Argentina: { english: "Argentina", spanish: "Argentina", japanese: "アルゼンチン" },
};

const CANCELLATION_LABELS: Record<string, LocalizedText> = {
  "Non-refundable": { english: "Non-refundable", spanish: "No reembolsable", japanese: "返金不可" },
  "Free cancellation up to 24 hours before start": {
    english: "Free cancellation up to 24 hours before start",
    spanish: "Cancelación gratuita hasta 24 horas antes del inicio",
    japanese: "開始24時間前までキャンセル無料",
  },
};

function translateByLanguage(value: LocalizedText, language: LanguageOption) {
  return value[language] ?? value.english;
}

function translateDestination(destination: string, language: LanguageOption) {
  const [cityPart, countryPart] = destination.split(",").map((segment) => segment.trim());

  const translatedCity = cityPart
    ? translateByLanguage(
        CITY_TRANSLATIONS[cityPart] ?? { english: cityPart, spanish: cityPart, japanese: cityPart },
        language
      )
    : destination;
  const translatedCountry = countryPart
    ? translateByLanguage(
        COUNTRY_TRANSLATIONS[countryPart] ?? {
          english: countryPart,
          spanish: countryPart,
          japanese: countryPart,
        },
        language
      )
    : "";

  return translatedCountry ? `${translatedCity}, ${translatedCountry}` : translatedCity;
}

function translateTitle(title: string, language: LanguageOption) {
  const sortedCities = Object.keys(CITY_TRANSLATIONS).sort((a, b) => b.length - a.length);

  for (const city of sortedCities) {
    const prefix = `${city} `;
    if (title.startsWith(prefix)) {
      const translatedCity = translateByLanguage(CITY_TRANSLATIONS[city], language);
      const activitySuffix = title.slice(prefix.length);
      return `${translatedCity} ${activitySuffix}`;
    }
  }

  return title;
}

function translateDescription(description: string, language: LanguageOption) {
  return translateByLanguage(
    DESCRIPTION_LABELS[description] ?? {
      english: description,
      spanish: description,
      japanese: description,
    },
    language
  );
}

function translateDuration(duration: string | undefined, language: LanguageOption) {
  if (!duration) {
    return undefined;
  }

  if (language === "spanish") {
    return duration.replace(" hours", " horas");
  }

  if (language === "japanese") {
    return duration.replace(" hours", "時間");
  }

  if (language === "english") {
    return duration;
  }

  return duration;
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
  const translatedDestination = translateDestination(experience.destination, language);
  const translatedTitle = translateTitle(experience.title, language);
  const translatedDescription = translateDescription(experience.description, language);
  const translatedDuration = translateDuration(experience.duration, language);
  const translatedBadge = experience.badge
    ? translateByLanguage(BADGE_LABELS[experience.badge], language)
    : null;
  const translatedCategory = translateByLanguage(CATEGORY_LABELS[experience.category], language);
  const translatedCancellation = translateByLanguage(
    CANCELLATION_LABELS[experience.cancellationPolicy ?? ""] ?? {
      english: experience.cancellationPolicy ?? "Policy varies by supplier",
      spanish: experience.cancellationPolicy ?? "La política varía según el proveedor",
      japanese: experience.cancellationPolicy ?? "ポリシーは提供会社により異なります",
    },
    language
  );

  const uiCopy: Record<LanguageOption, Record<string, string>> = {
    english: {
      reviews: "reviews",
      from: "From",
      category: "Category",
      cancellation: "Cancellation",
      saved: "Saved",
      yes: "Yes",
      no: "No",
      removeFavorite: "Remove from favorites",
      addFavorite: "Add to favorites",
    },
    spanish: {
      reviews: "reseñas",
      from: "Desde",
      category: "Categoría",
      cancellation: "Cancelación",
      saved: "Guardado",
      yes: "Sí",
      no: "No",
      removeFavorite: "Quitar de favoritos",
      addFavorite: "Agregar a favoritos",
    },
    japanese: {
      reviews: "件のレビュー",
      from: "料金",
      category: "カテゴリ",
      cancellation: "キャンセル",
      saved: "保存",
      yes: "はい",
      no: "いいえ",
      removeFavorite: "お気に入りから削除",
      addFavorite: "お気に入りに追加",
    },
  };

  const labels = uiCopy[language];

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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/35 via-transparent to-stone-100/10" />
        {translatedBadge ? (
          <span className="absolute left-3 top-3 border border-amber-200 bg-amber-50/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-900 dark:border-amber-700 dark:bg-amber-950/85 dark:text-amber-100">
            {translatedBadge}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/80 dark:text-emerald-200/80">
          {translatedDestination}
        </p>
        <h3 className="line-clamp-2 font-serif text-3xl font-semibold leading-tight text-stone-800 dark:text-stone-100">{translatedTitle}</h3>
        <p className="line-clamp-2 text-sm font-medium text-stone-600 dark:text-stone-300">{translatedDescription}</p>
        <div className="flex items-center justify-between text-sm font-medium text-stone-600 dark:text-stone-300">
          <span>
            {experience.rating.toFixed(1)} ({experience.reviewCount.toLocaleString()} {labels.reviews})
          </span>
          {translatedDuration ? <span>{translatedDuration}</span> : null}
        </div>
        <p className="text-base font-semibold uppercase tracking-[0.15em] text-amber-900 dark:text-amber-100">
          {labels.from} {formattedPrice}
        </p>
        {showFullDetails ? (
          <div className="space-y-1 border-t border-stone-300 pt-3 text-sm font-medium text-stone-600 dark:border-stone-700 dark:text-stone-300">
            <p>{labels.category}: {translatedCategory}</p>
            <p>
              {labels.cancellation}: {translatedCancellation}
            </p>
            <p>{labels.saved}: {favoriteActive ? labels.yes : labels.no}</p>
            <p>ID: {experience.id}</p>
          </div>
        ) : null}
      </div>
      </>
  );

  return (
    <article className="relative overflow-hidden border border-stone-300 bg-stone-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-stone-700 dark:bg-stone-900">
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
          aria-label={favoriteActive ? labels.removeFavorite : labels.addFavorite}
          aria-pressed={favoriteActive}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onFavoriteToggle?.(experience.id);
          }}
          className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border text-lg leading-none shadow-sm transition ${
            favoriteActive
              ? "border-rose-300 bg-rose-500 text-white hover:bg-rose-600"
              : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-300 hover:text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-amber-700 dark:hover:text-amber-100"
          }`}
        >
          {favoriteActive ? "♥" : "♡"}
        </button>
      ) : null}
    </article>
  );
}
