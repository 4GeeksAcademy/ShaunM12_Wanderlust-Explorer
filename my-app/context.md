# Core Data Models

```ts
type LanguageOption =
  | "english"
  | "spanish"
  | "chinese"
  | "french"
  | "japanese";

type CurrencyOption = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CNY";

type User = {
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

type Experience = {
  id: string;
  title: string;
  destination: string;
  imageUrl: string;
  priceFrom: number;
  currency: CurrencyOption;
  rating: number;
  reviewCount: number;
  duration?: string;
  cancellationPolicy?: string;
  badge?: "Likely to Sell Out" | "Special Offer" | "Travelers Choice";
  category?: string;
  isFavorite?: boolean;
};

type FavoriteItem = {
  id: string;
  userId: string;
  experienceId: string;
  savedAt: string;
  listId?: string;
};

type Destination = {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
};

type Category = {
  id: string;
  name: string;
  imageUrl: string;
};

type Booking = {
  id: string;
  userId: string;
  experienceId: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled";
};
```

# Shared Components

```ts
Header {
  logoUrl: string;
  searchPlaceholder?: string;
  user?: User;
  showSearch?: boolean;
  showCart?: boolean;
  onSearch(query: string): void;
  onProfileClick(): void;
}

SearchBar {
  placeholder: string;
  value: string;
  compact?: boolean;
  onChange(value: string): void;
  onSubmit(value: string): void;
}

ExperienceCard {
  experience: Experience;
  variant: "grid" | "list" | "compact" | "wishlist";
  showFavoriteButton?: boolean;
  showMenuButton?: boolean;
  onFavoriteToggle(experienceId: string): void;
  onClick(experienceId: string): void;
}

FavoriteButton {
  active: boolean;
  size?: "sm" | "md" | "lg";
  onClick(): void;
}

Rating {
  value: number;
  reviewCount: number;
  style?: "dots" | "stars";
}

ImageTile {
  title: string;
  imageUrl: string;
  aspectRatio: "wide" | "square" | "portrait";
  overlay?: boolean;
  onClick(): void;
}

Section {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

Footer {
  links: FooterLink[];
  socialLinks: SocialLink[];
  appStoreLinks?: AppStoreLink[];
}
```

# Home Page

Purpose: broad discovery page for Viator-style travel browsing.

Layout relationship:

```text
HomePage
|- Header
|  |- SearchBar
|- HeroSearchSection
|  |- BackgroundImage
|  |- Headline
|  \- SearchBar
|- TrustReasonsSection
|  \- TrustReason[]
|- LoginPromptCard
|- TopDestinationsSection
|  \- DestinationTileGrid
|- FlexibilityBanner
|- TopAttractionsSection
|  \- AttractionCompactGrid
|- TopToursSection
|  \- ExperienceCard[]
|- TrustpilotSection
|- WarmDestinationsSection
|- FeedbackPrompt
|- PopularLinksSection
\- Footer
```

Key components:

```ts
HeroSearchSection {
  title: string; // "Do more with Viator"
  subtitle: string;
  backgroundImageUrl: string;
  searchPlaceholder: string;
}

TrustReason {
  icon: string;
  title: string;
  description: string;
}

LoginPromptCard {
  title: string;
  subtitle: string;
  ctaLabel: string;
  onLogin(): void;
}

DestinationTileGrid {
  destinations: Destination[];
  columns: {
    mobile: 1 | 2;
    desktop: 5;
  };
}
```

Visual notes:

- Mobile header is compact with hamburger, centered logo, avatar icon.
- Hero uses a full-width background photo with centered text and rounded search input.
- Sections are vertically stacked on mobile.
- Footer is black, link-heavy, and includes social/app store rows.

# Experiences Page

Purpose: search/listing page for a destination, such as "All Paris Tours & Experiences."

Layout relationship:

```text
ExperiencesPage
|- Header
|  \- SearchBar
|- DestinationBreadcrumb
|- PageTitle
|- FilterBar
|  |- DateSelector
|  |- TravelersSelector
|  \- AddDatesButton
|- ExperienceList
|  \- ExperienceListCard[]
|- Pagination
|- TopAttractionsCarousel
|- ReviewSnippetsSection
|- HelpfulnessPrompt
|- FAQAccordion
\- Footer
```

Key components:

```ts
ExperiencesPage {
  destination: Destination;
  experiences: Experience[];
  filters: ExperienceFilters;
  user?: User;
}

ExperienceFilters {
  destinationId?: string;
  date?: string;
  travelers?: number;
  sort?: "recommended" | "price_low" | "rating" | "popular";
  categoryIds?: string[];
  minPrice?: number;
  maxPrice?: number;
}

ExperienceListCard {
  experience: Experience;
  rank?: number;
  showBadge?: boolean;
  showDuration?: boolean;
  showCancellation?: boolean;
  showFavoriteButton: boolean;
}
```

Visual notes:

- Cards are narrow vertical list cards on mobile.
- Each result has image left or top, title, rating, metadata, and price aligned toward the right/bottom.
- Badges such as "Likely to Sell Out" appear over or near the card image.
- Favorite heart appears on image/card.
- Pagination appears as small circular controls.

# Favorites Page

Purpose: authenticated or semi-authenticated wishlist page.

Layout relationship:

```text
FavoritesPage
|- Header
|  \- SearchBar
|- BackLink
|- WishlistNotice
|- PageTitle
|- DateButton
|- Tabs
|  |- Saved
|  \- RecommendedForYou
|- WishlistExperienceList
|  \- WishlistExperienceCard[]
\- Footer
```

Key components:

```ts
FavoritesPage {
  user: User;
  savedExperiences: Experience[];
  recommendedExperiences: Experience[];
  activeTab: "saved" | "recommended";
}

WishlistNotice {
  message: string;
  loginHref?: string;
  signupHref?: string;
}

Tabs {
  tabs: {
    id: string;
    label: string;
    count?: number;
  }[];
  activeTab: string;
  onTabChange(tabId: string): void;
}

WishlistExperienceCard {
  experience: Experience;
  favoriteActive: true;
  showMenuButton: true;
  onFavoriteToggle(experienceId: string): void;
  onMenuClick(experienceId: string): void;
}
```

Visual notes:

- Saved cards are large image-first cards.
- Heart button is overlaid top-right on the image.
- Overflow menu button sits beside the heart.
- Details below image include title, star rating, review count, duration, cancellation, and price.
- Wishlist state should read from user.favorites.

Favorite logic:

```ts
function toggleFavorite(user: User, experience: Experience): User {
  const exists = user.favorites.some(
    favorite => favorite.experienceId === experience.id
  );

  return {
    ...user,
    favorites: exists
      ? user.favorites.filter(f => f.experienceId !== experience.id)
      : [
          ...user.favorites,
          {
            id: crypto.randomUUID(),
            userId: user.id,
            experienceId: experience.id,
            savedAt: new Date().toISOString()
          }
        ]
  };
}
```

# Profile Page

Purpose: account hub for saved items, bookings, preferences, and login state.

Suggested layout, based on the header/account patterns shown:

```text
ProfilePage
|- Header
|- ProfileSummary
|  |- Avatar
|  |- Name
|  \- Email
|- AccountMenu
|  |- My Bookings
|  |- My Wishlist
|  |- Rewards
|  |- Payment Methods
|  |- Preferences
|  \- Help Center
|- SavedPreviewSection
|  \- ExperienceCard[]
|- UpcomingBookingsSection
|  \- BookingCard[]
\- Footer
```

Key components:

```ts
ProfileSummary {
  user: User;
  onEditProfile(): void;
}

AccountMenuItem {
  label: string;
  icon: string;
  href: string;
  badgeCount?: number;
}

SavedPreviewSection {
  favorites: Experience[];
  maxItems?: number;
  onViewAll(): void;
}

BookingCard {
  booking: Booking;
  experience: Experience;
}
```

# Primary Page Relationships

```text
User
|- has many FavoriteItem
|  \- references Experience
|- has many Booking
|  \- references Experience
\- owns Preferences

HomePage
\- recommends Experience + Destination + Category

ExperiencesPage
\- lists Experience filtered by Destination/Search

FavoritesPage
\- renders User.favorites as Experience cards

ProfilePage
|- links to FavoritesPage
|- links to Bookings
\- manages User preferences
```

# Recommended Route Structure

```ts
const routes = {
  home: "/",
  experiences: "/experiences",
  destinationExperiences: "/destinations/:destinationSlug/experiences",
  favorites: "/favorites",
  profile: "/profile",
  login: "/login"
};
```

# Minimum Component Set To Build First

- Header
- SearchBar
- ExperienceCard
- FavoriteButton
- Rating
- ImageTile
- Section
- Footer
- HomePage
- ExperiencesPage
- FavoritesPage
- ProfilePage

This gives you a clean reusable system: the same ExperienceCard powers home recommendations, search results, and wishlist items, while User.favorites becomes the single source of truth for saved experiences.

# Technology Stack

- React
- Next.js
- TypeScript
- Tailwind CSS
- ESLint

# Constraints

- Do not use an external state management library.
- Use only Tailwind CSS for styling.
- Use client-side navigation between internal routes (for example, Next.js Link/router), not full page reloads.
