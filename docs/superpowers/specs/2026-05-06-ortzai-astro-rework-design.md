# Spec: Ortzai Astro Rework — "Charlie" Edition
**Date:** 2026-05-06
**Status:** Draft
**Topic:** Web Rework (Wix to Astro)

## 1. Executive Summary
Rework the current `ortzai.com` website from Wix to Astro. The goal is to fix major SEO issues (clean sitemap, eliminate duplicate URLs), improve performance (100/100 PageSpeed), and apply a high-contrast editorial design based on the "Charlie" style reference.

## 2. Technical Stack
- **Framework:** Astro 4.x (SSG preferred)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion / Motion for Astro
- **Content Management:** Astro Content Collections (Local Markdown/YAML)
- **Internationalization:** Native Astro i18n (`/es/`, `/eu/`, `/en/`)
- **Assets:** `astro:assets` for automated image optimization

## 3. Architecture & Data Model
### Content Collections (`src/content/`)
- `producciones/`: Theatre plays. Fields: `title`, `description`, `year`, `cast`, `image`, `gallery`.
- `formacion/`: Courses and workshops. Fields: `title`, `instructor`, `duration`, `description`.
- `equipo/`: Biographies of directors and collaborators. Fields: `name`, `role`, `bio`, `image`.
- `paginas/`: Content for static pages in 3 languages (Spanish first) (Home, Contact, School).

### Routing (i18n)
- Root `/` redirects to detected browser language or `/es/` default.
- Structure:
  - `/[lang]/index.astro`
  - `/[lang]/producciones/index.astro`
  - `/[lang]/producciones/[slug].astro`
  - `/[lang]/formacion/index.astro`
  - `/[lang]/equipo/index.astro`
  - `/[lang]/contacto.astro`

## 4. Design System (Charlie Style)
### Colors
- **Midnight Ink:** `#0D0D0D` (Background)
- **Paper White:** `#F0F0F0` (Primary text, borders, active states)
- **Concrete Gray:** `#525252` (Muted text)
- **Alert Red:** `#A30000` (Hero backgrounds, high emphasis)

### Typography
- **Display:** `Bebas Neue`. Large, condensed, negative letter-spacing.
- **Body/UI:** `Helvetica Neue`. 400/700 weights.

### Key Components
- **Pill Buttons:** 32px border-radius, high-contrast borders (2px).
- **Hero Sections:** High-impact type on Red or Black backgrounds.
- **Page Transitions:** Fade/Slide "Scene" transitions.

## 5. SEO & Migration Plan
- **Sitemap Cleanup:** Only index the 5 main sections. Block or delete all Wix-specific duplicates (`copia-de-*`, `iker-*`).
- **Metadata:** Unique title tags and meta-descriptions for every page/language.
- **Performance:** Zero layout shift (CLS) and sub-second LCP.

## 6. Success Criteria
- 100/100 Lighthouse score (SEO, Performance, Accessibility).
- Functional trilingue navigation without broken links.
- Visual parity with the "Charlie" style guide.
- All "trash" URLs from the Wix sitemap removed from search results.
