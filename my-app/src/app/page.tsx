"use client";

import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { useAppSettings } from "@/context/AppSettingsContext";
import { routes } from "@/data/routes";

export default function Home() {
  const { language } = useAppSettings();
  const isSpanish = language === "spanish";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 text-white sm:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.35),_transparent_48%)]" />
      <div className="relative max-w-2xl space-y-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-200">
          {isSpanish ? "Haz mas con Wanderlust Explorer" : "Do more with Wanderlust explorer"}
        </p>
        <h1 className="text-4xl font-black leading-tight sm:text-6xl">
          {isSpanish
            ? "Encuentra tours y experiencias inolvidables alrededor del mundo."
            : "Find unforgettable tours and experiences around the world."}
        </h1>
        <p className="max-w-xl text-base text-slate-200 sm:text-lg">
          {isSpanish
            ? "Explora todas nuestras experiencias, revisa todos los detalles y guarda tus favoritos en un solo lugar."
            : "Browse all of our experiences, dive into full details and keep your favorites in one place"}
        </p>
        <div className="max-w-xl">
          <SearchBar
            action={routes.experiences}
            placeholder={isSpanish ? "Buscar Paris, Roma, Tokio..." : "Search Paris, Rome, Tokyo..."}
            compact
          />
        </div>
        <Link
          href={routes.experiences}
          className="inline-flex items-center rounded-full bg-sky-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-sky-950 transition hover:bg-sky-300"
        >
          {isSpanish ? "Explorar experiencias" : "Explore Experiences"}
        </Link>
      </div>
    </section>
  );
}
