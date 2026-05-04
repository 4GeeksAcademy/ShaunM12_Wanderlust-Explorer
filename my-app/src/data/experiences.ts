import { CurrencyOption, Experience } from "@/data/models";

type Destination = {
  city: string;
  country: string;
};

const destinations: Destination[] = [
  { city: "Queenstown", country: "New Zealand" },
  { city: "Banff", country: "Canada" },
  { city: "Cusco", country: "Peru" },
  { city: "Marrakech", country: "Morocco" },
  { city: "Reykjavik", country: "Iceland" },
  { city: "Kyoto", country: "Japan" },
  { city: "Seville", country: "Spain" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Mexico City", country: "Mexico" },
  { city: "Lisbon", country: "Portugal" },
  { city: "Hanoi", country: "Vietnam" },
  { city: "Cape Town", country: "South Africa" },
  { city: "Bali", country: "Indonesia" },
  { city: "Dubrovnik", country: "Croatia" },
  { city: "Athens", country: "Greece" },
  { city: "Edinburgh", country: "Scotland" },
  { city: "Auckland", country: "New Zealand" },
  { city: "Chiang Mai", country: "Thailand" },
  { city: "Patagonia", country: "Argentina" },
  { city: "Santorini", country: "Greece" },
];

const categoryActivities: Record<Experience["category"], string[]> = {
  adventure: [
    "Mountain Ridge Zipline",
    "Canyon Rappelling Expedition",
    "Volcano Trail 4x4 Safari",
    "Whitewater River Challenge",
    "Glacier Ice Climbing Session",
    "Desert Dune Buggy Adventure",
    "Coastal Cliff Kayak Route",
    "Rainforest Canopy Trek",
    "Night Caving Discovery",
    "Highland ATV Traverse",
    "Sunrise Paragliding Flight",
    "Jungle Survival Skills Camp",
    "Sea Cave Paddle Quest",
    "Alpine Via Ferrata Course",
    "Wild Rapids Rafting Day",
    "Backcountry Snowshoe Journey",
    "Sandstone Slot Canyon Hike",
    "Off-Road Valley Explorer",
    "Summit Scramble Challenge",
    "Waterfall Abseil and Swim",
  ],
  culture: [
    "Old Town Heritage Walk",
    "World History Museum Trail",
    "Royal Palace and Courtyard Tour",
    "Architectural Gems Circuit",
    "Historic Neighborhood Story Walk",
    "Ancient Ruins Priority Entry",
    "Cathedral and Monastery Route",
    "Legends and Landmarks Evening Walk",
    "Traditional Arts Workshop Visit",
    "City Civilization Highlights",
    "UNESCO District Exploration",
    "Sacred Sites Cultural Journey",
    "Historic Fortress Discovery",
    "Classical Theater Backstage Tour",
    "Empire Era Monument Trail",
    "Timeless Traditions Experience",
    "Iconic Squares and Statues Route",
    "Archaeology Insider Guided Tour",
    "Cultural Capitals Walking Pass",
    "Royal Residences and Gardens Tour",
  ],
  food: [
    "Street Food Tasting Crawl",
    "Farm-to-Table Culinary Route",
    "Night Market Flavor Safari",
    "Local Bakery and Coffee Trail",
    "Regional Wine and Tapas Pairing",
    "Chef-Led Cooking Studio Class",
    "Seafood Market and Kitchen Tour",
    "Traditional Spice Bazaar Tasting",
    "Authentic Brunch Neighborhood Tour",
    "Rooftop Dining and City Bites",
    "Signature Dessert Discovery",
    "Artisan Cheese and Charcuterie Walk",
    "Countryside Vineyard Lunch Escape",
    "Hidden Food Alleys Experience",
    "Plant-Based Global Tasting Tour",
    "Late-Night Local Eats Ride",
    "Historic Tavern and Bistro Crawl",
    "Seasonal Market Chef Picks Tour",
    "Craft Cocktail and Small Plates Night",
    "Regional Kitchen Masterclass",
  ],
  wellness: [
    "Sunrise Beach Yoga Flow",
    "Thermal Springs Relaxation Day",
    "Forest Breathing Mindfulness Walk",
    "Spa and Sound Bath Escape",
    "Meditation and Tea Ceremony",
    "Coastal Stretch and Recovery Session",
    "Mountain Hot Stone Retreat",
    "Holistic Healing Workshop",
    "Pilates and Scenic Harbor Session",
    "Ayurvedic Wellness Ritual",
    "Oceanfront Breathwork Journey",
    "Digital Detox Nature Sanctuary",
    "Lakeside Gentle Yoga Class",
    "Mind-Body Balance Retreat",
    "Therapeutic Massage and Steam Day",
    "Sunset Mobility and Calm Practice",
    "Wellness Brunch and Recovery Club",
    "Wellbeing Circuit and Cold Plunge",
    "Tranquil Garden Meditation Experience",
    "Recharge and Restore City Escape",
  ],
  nature: [
    "National Park Scenic Loop",
    "Wildlife Safari Photography Drive",
    "Waterfall Valley Trail",
    "Coastal Birdwatching Expedition",
    "Lakes and Forest Panorama Tour",
    "Botanical Garden and Arboretum Visit",
    "Sunset Fjord Cruise",
    "Mangrove Eco Kayak Journey",
    "Alpine Wildflower Hike",
    "Ocean Cliffs Nature Walk",
    "Glacial Lagoon Boat Tour",
    "Dawn Nature Reserve Trek",
    "Canyon Viewpoint Discovery",
    "Rainforest River Safari",
    "Island Nature and Reef Cruise",
    "Mountain Lake Paddle Tour",
    "Desert Oasis Nature Route",
    "Forest Canopy Observation Day",
    "Volcanic Landscape Exploration",
    "Coastline Seals and Seabirds Tour",
  ],
};

const categoryImageKeywords: Record<Experience["category"], string[]> = {
  adventure: [
    "zipline",
    "rappelling",
    "offroad",
    "whitewater",
    "iceclimb",
    "dunebuggy",
    "kayak",
    "rainforesttrek",
    "caving",
    "atv",
    "paragliding",
    "survivalcamp",
    "seacave",
    "viaferrata",
    "rafting",
    "snowshoe",
    "slotcanyon",
    "offroadtrail",
    "summithike",
    "waterfalladventure",
  ],
  culture: [
    "heritage",
    "museum",
    "palace",
    "architecture",
    "historicstreet",
    "ruins",
    "monastery",
    "oldtown",
    "artisan",
    "culturetour",
    "unesco",
    "sacredsite",
    "fortress",
    "theater",
    "monument",
    "traditions",
    "citysquare",
    "archaeology",
    "culturalcapital",
    "royalgarden",
  ],
  food: [
    "streetfood",
    "farmtotable",
    "nightmarket",
    "bakery",
    "wine",
    "cookingclass",
    "seafood",
    "spice",
    "brunch",
    "rooftopdining",
    "dessert",
    "charcuterie",
    "vineyard",
    "localfood",
    "veganfood",
    "latenighteats",
    "tavern",
    "farmersmarket",
    "cocktails",
    "regionalcuisine",
  ],
  wellness: [
    "yoga",
    "hotsprings",
    "mindfulness",
    "spa",
    "meditation",
    "stretching",
    "retreat",
    "healing",
    "pilates",
    "ayurveda",
    "breathwork",
    "detox",
    "lakesideyoga",
    "balance",
    "massage",
    "mobility",
    "wellnessbrunch",
    "coldplunge",
    "zen",
    "recharge",
  ],
  nature: [
    "nationalpark",
    "wildlife",
    "waterfall",
    "birdwatching",
    "forest",
    "botanicalgarden",
    "fjord",
    "mangrove",
    "wildflowers",
    "coastline",
    "glacierlagoon",
    "naturereserve",
    "canyon",
    "rainforestriver",
    "reef",
    "mountainlake",
    "desertoasis",
    "canopy",
    "volcanic",
    "seabirds",
  ],
};

const categoryPhotoTags: Record<Experience["category"], string[]> = {
  adventure: ["travel", "adventure", "outdoor", "mountain", "action"],
  culture: ["travel", "culture", "architecture", "heritage", "city"],
  food: ["travel", "food", "restaurant", "streetfood", "cuisine"],
  wellness: ["travel", "wellness", "spa", "yoga", "relaxation"],
  nature: ["travel", "nature", "landscape", "wildlife", "scenic"],
};

const stopWords = new Set([
  "and",
  "the",
  "with",
  "for",
  "day",
  "tour",
  "route",
  "session",
  "experience",
  "discovery",
  "exploration",
  "journey",
]);

function buildActivityTags(activity: string) {
  return activity
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .slice(0, 4);
}

const categoryDescriptions: Record<Experience["category"], string> = {
  adventure:
    "Push your limits with guided action-focused routes, expert support, and epic viewpoints.",
  culture:
    "Dive into local history, architecture, and traditions through immersive storytelling.",
  food:
    "Taste signature local flavors with curated stops, chef insights, and unforgettable bites.",
  wellness:
    "Recharge body and mind with calming rituals, restorative sessions, and scenic settings.",
  nature:
    "Explore protected landscapes and wildlife-rich routes with a low-impact, eco-first approach.",
};

const badges: Array<Experience["badge"]> = [
  "Likely to Sell Out",
  "Special Offer",
  "Travelers Choice",
  undefined,
];

const currencies: CurrencyOption[] = ["USD", "EUR", "GBP", "JPY", "AUD", "CNY"];

function buildCategoryExperiences(
  category: Experience["category"],
  startSig: number,
  destinationOffset: number
) {
  return categoryActivities[category].map((activity, index) => {
    const destination = destinations[(index + destinationOffset) % destinations.length];
    const sig = startSig + index;
    const keyword = categoryImageKeywords[category][index];
    const activityTags = buildActivityTags(activity);
    const imageSeed = [
      category,
      keyword,
      destination.city.toLowerCase().replace(/\s+/g, "-"),
      ...activityTags,
      String(sig),
    ].join("-");
    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(imageSeed)}/1200/800`;

    return {
      title: `${destination.city} ${activity}`,
      description: categoryDescriptions[category],
      destination: `${destination.city}, ${destination.country}`,
      category,
      imageUrl,
    };
  });
}

const rawExperiences = [
  ...buildCategoryExperiences("adventure", 1, 0),
  ...buildCategoryExperiences("culture", 21, 3),
  ...buildCategoryExperiences("food", 41, 6),
  ...buildCategoryExperiences("wellness", 61, 9),
  ...buildCategoryExperiences("nature", 81, 12),
];

export const experiences: Experience[] = rawExperiences.map((item, index) => {
  const sequence = index + 1;
  const price = 39 + (index % 16) * 8;

  return {
    id: `exp-${String(sequence).padStart(3, "0")}`,
    title: item.title,
    description: item.description,
    destination: item.destination,
    category: item.category,
    imageUrl: item.imageUrl,
    price,
    priceFrom: price,
    currency: currencies[index % currencies.length],
    rating: 4.2 + (index % 8) * 0.1,
    reviewCount: 140 + sequence * 31,
    duration: `${2 + (index % 9)} hours`,
    cancellationPolicy:
      index % 6 === 0
        ? "Non-refundable"
        : "Free cancellation up to 24 hours before start",
    badge: badges[index % badges.length],
    isFavorite: false,
  };
});
