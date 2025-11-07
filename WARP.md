# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common commands

Use npm for scripts unless you’ve installed an alternative client.

- Install deps:
  - npm install
- Develop (Next.js dev server at http://localhost:3000):
  - npm run dev
- Build (production):
  - npm run build
- Start (serve production build):
  - npm run start
- Lint:
  - npm run lint
  - If eslint exits without scanning files, run: npx eslint . --ext ts,tsx
- Type-check only (no emit):
  - npx tsc --noEmit

There is no test runner configured in this repo (no jest/vitest/playwright/cypress scripts or configs present).

## High-level architecture

This is a Next.js App Router project (Next 16, React 19) with Tailwind CSS v4 and PostCSS. Structure focuses on a single landing page that renders a list of developer events.

- Routing and layout (app/)
  - app/layout.tsx: Root layout. Loads Google fonts via next/font, imports global Tailwind CSS, renders a persistent <Navbar /> and a full-viewport <LightRays /> background, then the routed page content.
  - app/page.tsx: Home page. Renders hero text, an Explore button, and a grid of EventCard components sourced from lib/constants.ts.
  - app/globals.css: Tailwind v4 entry with design tokens. Defines:
    - :root CSS variables for colors and radii.
    - @theme inline mappings for Tailwind design tokens.
    - Custom @utility classes (e.g., flex-center, text-gradient, glass).
    - Component-level styles for header, events grid, event card, and booking form sections.

- UI components (components/)
  - Navbar.tsx: Sticky glass header with logo and navigation links.
  - ExploreBtn.tsx: "use client" button linking to #events.
  - EventCard.tsx: Links to /events/[slug] with poster, title, location, date/time (uses next/image and next/link).
  - LightRays.tsx: "use client" WebGL background built with ogl that:
    - Mounts a full-canvas renderer inside an absolutely positioned container.
    - Exposes props to control origin, color, speed, spread, length, noise, distortion, mouse following, etc.
    - Uses IntersectionObserver to only initialize when visible and thoroughly cleans up GL resources on unmount.

- Utilities and data (lib/)
  - constants.ts: Typed EventItem[] seed data for prominent dev events (images under public/images, used by the home page).
  - utils.ts: cn() helper that merges class names via clsx and tailwind-merge.

- Static assets (public/)
  - icons/* and images/* consumed by components via next/image.

- Configuration
  - next.config.ts:
    - Rewrites /ingest/* to PostHog endpoints.
    - skipTrailingSlashRedirect: true.
  - tsconfig.json:
    - Path alias @/* → project root. Imports in code use this alias (e.g., @/components/*, @/lib/*).
    - Strict type settings; noEmit; bundler moduleResolution suitable for Next 16.
  - postcss.config.mjs: Uses @tailwindcss/postcss (Tailwind v4 pipeline). No separate tailwind.config.* file is required for Tailwind v4.

## Notes derived from README

- Start the dev server with npm run dev and open http://localhost:3000.
- The primary page to edit is app/page.tsx; changes hot-reload in dev.
- Fonts are managed by next/font and loaded in app/layout.tsx.
