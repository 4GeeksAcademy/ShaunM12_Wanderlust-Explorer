"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { useAppSettings } from "@/context/AppSettingsContext";
import { experiences } from "@/data/experiences";
import { routes } from "@/data/routes";

export default function Home() {
  const { language } = useAppSettings();

  const copy = {
    english: {
      kicker: "Tour your way",
      title: "Find unforgettable tours and experiences around the world.",
      body: "Browse all of our experiences, dive into full details and keep your favorites in one place",
      placeholder: "Search Paris, Rome, Tokyo...",
      cta: "Explore Experiences",
    },
    spanish: {
      kicker: "Viaja a tu manera",
      title: "Encuentra tours y experiencias inolvidables alrededor del mundo.",
      body: "Explora todas nuestras experiencias, revisa todos los detalles y guarda tus favoritos en un solo lugar.",
      placeholder: "Buscar Paris, Roma, Tokio...",
      cta: "Explorar experiencias",
    },
    japanese: {
      kicker: "自分らしい旅へ",
      title: "世界中の忘れられないツアーと体験を見つけよう。",
      body: "すべての体験を閲覧し、詳細を確認して、お気に入りを1か所で管理できます。",
      placeholder: "パリ、ローマ、東京を検索...",
      cta: "体験を探す",
    },
  } as const;

  const text = copy[language];
  const heroImage = experiences[0]?.imageUrl;
  const supportingImageOne = experiences[5]?.imageUrl;
  const supportingImageTwo = experiences[10]?.imageUrl;

  return (
    <section className="space-y-8 lg:space-y-10">
      <div className="grid overflow-hidden border border-stone-300 bg-stone-50 shadow-xl dark:border-stone-700 dark:bg-stone-900 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[320px] border-b border-stone-300 dark:border-stone-700 lg:min-h-[560px] lg:border-b-0 lg:border-r">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={text.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stone-900/25 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950/35 via-stone-900/10 to-transparent" />
        </div>
        <div className="relative flex flex-col justify-center gap-6 bg-gradient-to-b from-stone-50 to-amber-50/70 px-6 py-10 text-stone-800 dark:from-stone-900 dark:to-stone-800 sm:px-10">
          <div className="absolute right-5 top-5 hidden h-28 w-28 rounded-full border border-amber-200/80 bg-amber-100/60 blur-2xl dark:border-amber-700/40 dark:bg-amber-900/20 sm:block" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-800/80 dark:text-emerald-300/80">{text.kicker}</p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] text-stone-800 dark:text-stone-100 sm:text-6xl">{text.title}</h1>
          <p className="max-w-xl text-sm font-medium text-stone-600 dark:text-stone-300 sm:text-base">{text.body}</p>
          <SearchBar action={routes.experiences} placeholder={text.placeholder} compact />
          <Link
            href={routes.experiences}
            className="inline-flex w-fit items-center border border-emerald-900 bg-emerald-900 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-50 transition hover:bg-emerald-800 dark:border-emerald-700 dark:bg-emerald-800 dark:text-emerald-50 dark:hover:bg-emerald-700"
          >
            {text.cta}
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="relative overflow-hidden border border-stone-300 bg-stone-50 p-6 dark:border-stone-700 dark:bg-stone-900">
          {supportingImageOne ? (
            <div className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 overflow-hidden rounded-full opacity-25">
              <Image
                src={supportingImageOne}
                alt=""
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          ) : null}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800/80 dark:text-amber-300/80">Journal style picks</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-stone-800 dark:text-stone-100">Curated routes with thoughtful pacing and local depth.</h2>
          <p className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-300">Every experience is selected to balance iconic highlights with slower moments, so your journey feels personal, calm, and memorable.</p>
        </article>

        <article className="relative overflow-hidden border border-stone-300 bg-emerald-950/95 p-6 text-emerald-50 dark:border-emerald-800">
          {supportingImageTwo ? (
            <div className="absolute inset-0 opacity-30">
              <Image
                src={supportingImageTwo}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-100/90">Destination stories</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold">Layered imagery, cultural detail, and premium planning tools.</h2>
            <p className="mt-3 max-w-xl text-sm text-emerald-100/90">Browse, compare, and save experiences with a refined interface designed to feel like a contemporary travel editorial.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
