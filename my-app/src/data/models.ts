export type LanguageOption = "english" | "spanish";

export type CurrencyOption = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CNY";

export const languageOptions: LanguageOption[] = [
  "english",
  "spanish",
];

export const currencyOptions: CurrencyOption[] = ["USD", "EUR", "GBP", "JPY", "AUD", "CNY"];

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isAuthenticated: boolean;
  favorites: FavoriteItem[];
  bookings: Booking[];
  preferences: {
    language: LanguageOption;
    currency: CurrencyOption;
    currencyDisplayLanguage: LanguageOption;
    locale: string;
    homeAirport?: string;
  };
};

export type Experience = {
  id: string;
  title: string;
  description: string;
  destination: string;
  category: "adventure" | "culture" | "food" | "wellness" | "nature";
  imageUrl: string;
  price: number;
  priceFrom: number;
  currency: CurrencyOption;
  rating: number;
  reviewCount: number;
  duration?: string;
  cancellationPolicy?: string;
  badge?: "Likely to Sell Out" | "Special Offer" | "Travelers Choice";
  isFavorite?: boolean;
};

export type FavoriteItem = {
  id: string;
  userId: string;
  experienceId: string;
  savedAt: string;
  listId?: string;
};

export type Destination = {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
};

export type Booking = {
  id: string;
  userId: string;
  experienceId: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled";
};
