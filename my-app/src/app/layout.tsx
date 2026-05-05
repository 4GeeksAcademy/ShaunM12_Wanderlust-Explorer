import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

const appSans = Manrope({
  variable: "--font-app-sans",
  subsets: ["latin"],
});

const appSerif = Cormorant_Garamond({
  variable: "--font-app-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const appMono = Manrope({
  variable: "--font-app-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust Explorer",
  description: "Discover, save, and plan your next travel experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${appSans.variable} ${appSerif.variable} ${appMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gradient-to-b from-stone-100 via-amber-50 to-stone-100 font-sans text-stone-800 transition-colors dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 dark:text-stone-100">
        <AppSettingsProvider>
          <FavoritesProvider>
            <AppHeader />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
          </FavoritesProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}
