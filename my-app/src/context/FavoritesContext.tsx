"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FavoritesContextValue = {
  favoriteIds: string[];
  favoriteIdSet: Set<string>;
  isFavorite: (experienceId: string) => boolean;
  toggleFavorite: (experienceId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = useCallback(
    (experienceId: string) => favoriteIdSet.has(experienceId),
    [favoriteIdSet]
  );

  const toggleFavorite = useCallback((experienceId: string) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(experienceId)
        ? currentIds.filter((id) => id !== experienceId)
        : [...currentIds, experienceId]
    );
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      favoriteIdSet,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, favoriteIdSet, isFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }

  return context;
}
