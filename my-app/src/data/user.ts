import { User } from "@/data/models";

const favoriteExperienceIds = [
  "exp-001",
  "exp-004",
  "exp-009",
  "exp-015",
  "exp-022",
  "exp-037",
  "exp-044",
  "exp-058",
];

export const mockUser: User = {
  id: "user-001",
  name: "Shaun Miller",
  email: "shaun@example.com",
  avatarUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
  isAuthenticated: true,
  favorites: favoriteExperienceIds.map((experienceId, index) => ({
    id: `fav-${String(index + 1).padStart(3, "0")}`,
    userId: "user-001",
    experienceId,
    savedAt: new Date(Date.now() - index * 86_400_000).toISOString(),
  })),
  bookings: [
    {
      id: "booking-001",
      userId: "user-001",
      experienceId: "exp-012",
      date: "2026-06-21",
      status: "upcoming",
    },
    {
      id: "booking-002",
      userId: "user-001",
      experienceId: "exp-003",
      date: "2026-04-12",
      status: "completed",
    },
  ],
  preferences: {
    language: "english",
    currency: "USD",
    currencyDisplayLanguage: "english",
    locale: "en-US",
    homeAirport: "MIA",
  },
};
