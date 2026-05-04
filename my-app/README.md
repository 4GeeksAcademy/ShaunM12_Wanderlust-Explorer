# Wanderlust Explorer

Wanderlust Explorer is a responsive travel discovery web application built with Next.js, React, TypeScript, and Tailwind CSS.

Users can browse experiences, filter by search and categories, switch language and currency preferences, view full experience details, and manage favorites through a shared client-side state.

## Project Description

This project is designed as a modern, easy-to-use explorer for tours and activities around the world. It combines:

- A marketing-style landing page
- A searchable and filterable experience listing page
- A detailed experience view
- A favorites workflow with heart toggles
- A profile page that includes account summary plus favorited experiences

The UI supports both English and Spanish text labels and dynamic currency conversion for experience prices.

## Design Inspiration

The design direction and experience flow are inspired by:

- https://www.viator.com
- https://www.tripadvisor.com

Key inspiration elements include:

- Travel-first discovery layout
- Experience cards with image-led content
- Ratings and social-proof-style metadata
- Favorites and saved experiences workflow
- Mobile-first responsive behavior across devices

## Site Walkthrough

### Home Page

- Hero section with clear value proposition and call-to-action
- Search bar that routes users to the experiences explorer
- Bilingual text support (English and Spanish)

### Experiences Explorer

- URL-driven search and filters using query parameters
- Filters for search term, category, and destination
- Active filter chips with remove and clear-all behavior
- No-results message when filters return zero matches
- Heart toggles on cards connected to shared favorites state

### Experience Detail Page

- Dynamic route by experience id
- Back navigation to explorer
- Full detail card view

### Favorites Page

- Displays selected favorites only
- Starts empty by default and updates from current session state
- Full card grid with heart toggle support

### Profile Page

- User summary and preference snapshot
- Displays all currently selected favorite experiences directly on the page
- Favorites count reflects live shared state

### Global Navigation and Settings

- Sticky navbar shown across all routes
- Active link styles based on pathname
- Custom logo in navbar
- Language and currency settings toggle with:
  - Globe icon trigger
  - Backdrop click-to-close
  - Explicit close button

## Core Features

- Responsive design for mobile, tablet, and desktop
- English and Spanish interface options
- Currency switching with live conversion display
- Shared favorites state across explorer, favorites, and profile pages
- Client-side navigation and filtering UX
- Tailwind-based reusable UI components

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Installation Instructions

### Prerequisites

- Node.js 18+ recommended
- npm 9+ recommended

### Setup

1. Clone the repository.
2. Move into the app folder:

	cd my-app

3. Install dependencies:

	npm install

4. Start the development server:

	npm run dev

5. Open the app in your browser:

	http://localhost:3000

## Usage Examples

### Browse all experiences

- Open the explorer route and scroll the responsive card grid.

### Search and filter

- Enter a search term in the explorer search bar.
- Select a category.
- Filter by destination city or country text.
- Share the URL to preserve current filter state.

### Manage favorites

- Click the heart icon on any experience card.
- View selected favorites on both the Favorites page and the Profile page.

### Switch language and currency

- Click the globe icon in the navbar.
- Choose English or Spanish.
- Choose a display currency (USD, EUR, GBP, JPY, AUD, CNY).

## Available Scripts

- npm run dev: Run the local development server.
- npm run build: Build the production bundle.
- npm run start: Run the production server.
- npm run lint: Run ESLint checks.

## Project Structure

- src/app: Route pages (home, experiences, favorites, profile)
- src/components: Reusable UI components (navbar, cards, filters, search, settings)
- src/context: Shared app state (language/currency settings and favorites)
- src/data: Mock data models and generated experiences
- public: Static assets including logo and icons

## Contributing Guidelines

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch from main.
3. Keep changes focused and scoped.
4. Run lint and verify core routes manually.
5. Open a pull request with a clear description and screenshots for UI changes.

Recommended pull request checklist:

- Feature or fix summary
- Before and after screenshots for UI updates
- Notes on testing performed
- Any known limitations or follow-up work

## Photo Credits and Attribution

Experience images are loaded remotely (not stored locally in this repository).

- Current image provider: https://picsum.photos
- Dataset implementation: seeded image URLs are generated in src/data/experiences.ts

Attribution notes:

- Lorem Picsum serves publicly available sample photography and exposes source metadata via its API/docs.
- For production/commercial releases, verify image licensing and attribution requirements for each photo you use.
- If strict attribution compliance is required, replace seeded random photos with a curated list of licensed image URLs and track author/source metadata in your dataset.

## License

No license file is currently defined in this project.

Until a license is added, treat usage and redistribution as restricted.

If you want this repository to be open source, add a LICENSE file (for example MIT) and update this section.

## Contact and Credits

- Repository owner: 4GeeksAcademy
- Project: Wanderlust Explorer
- Design inspiration references:
  - https://www.viator.com
  - https://www.tripadvisor.com

If you are collaborating on this project, add team names and contact channels here (email, LinkedIn, GitHub profiles, or Discord).
