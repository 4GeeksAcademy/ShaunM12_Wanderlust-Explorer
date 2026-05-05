"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsToggle } from "@/components/SettingsToggle";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { useAppSettings } from "@/context/AppSettingsContext";
import { routes } from "@/data/routes";

export function NavBar() {
  const pathname = usePathname();
  const { language } = useAppSettings();

  const navLabels = {
    english: {
      experiences: "Experiences",
      favorites: "Favorites",
      profile: "Profile",
    },
    spanish: {
      experiences: "Experiencias",
      favorites: "Favoritos",
      profile: "Perfil",
    },
    japanese: {
      experiences: "体験",
      favorites: "お気に入り",
      profile: "プロフィール",
    },
  } as const;

  const labels = navLabels[language];

  const navItems = [
    { href: routes.experiences, label: labels.experiences },
    { href: routes.favorites, label: labels.favorites },
    { href: routes.profile, label: labels.profile },
  ];

  function isActivePath(href: string) {
    if (href === routes.home) {
      return pathname === routes.home;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-stone-300/80 bg-stone-100/90 text-stone-800 backdrop-blur-md dark:border-stone-700/80 dark:bg-stone-950/90 dark:text-stone-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <Link
          href={routes.home}
          className="flex items-center border border-stone-300 bg-stone-50/90 px-3 py-2 shadow-sm transition hover:border-amber-300 dark:border-stone-600 dark:bg-stone-900"
          aria-current={isActivePath(routes.home) ? "page" : undefined}
        >
          <Image
            src="/wanderlust-logo.svg"
            alt="Wanderlust Explorer"
            width={170}
            height={50}
            priority
            className="h-10 w-auto sm:h-11"
          />
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700 dark:text-stone-200">
            {navItems.map((item) => {
              const active = isActivePath(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border px-3 py-1.5 transition ${
                    active
                      ? "border-amber-300 bg-amber-100 text-stone-900 dark:border-amber-700 dark:bg-amber-900/50 dark:text-amber-100"
                      : "border-stone-300 bg-stone-50 text-stone-700 hover:border-amber-300 hover:text-stone-900 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-amber-700 dark:hover:text-amber-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeModeToggle />
          <SettingsToggle />
        </div>
      </div>
    </header>
  );
}
