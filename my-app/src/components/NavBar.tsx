"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsToggle } from "@/components/SettingsToggle";
import { useAppSettings } from "@/context/AppSettingsContext";
import { routes } from "@/data/routes";

export function NavBar() {
  const pathname = usePathname();
  const { language } = useAppSettings();
  const isSpanish = language === "spanish";

  const navItems = [
    { href: routes.experiences, label: isSpanish ? "Experiencias" : "Experiences" },
    { href: routes.favorites, label: isSpanish ? "Favoritos" : "Favorites" },
    { href: routes.profile, label: isSpanish ? "Perfil" : "Profile" },
  ];

  function isActivePath(href: string) {
    if (href === routes.home) {
      return pathname === routes.home;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          href={routes.home}
          className="flex items-center"
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
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
            {navItems.map((item) => {
              const active = isActivePath(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 transition ${
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <SettingsToggle />
        </div>
      </div>
    </header>
  );
}
