# Ortzai Astro Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework ortzai.com from Wix to a high-performance Astro site with "Charlie" design style and trilingual support.

**Architecture:** SSG-first approach using Astro Content Collections for data and dynamic i18n routing. Styling with Tailwind CSS v4 and Framer Motion for animations.

**Tech Stack:** Astro 4.x, Tailwind CSS v4, Motion (for Astro/Vanilla), Markdown/YAML.

---

### Task 1: Project Initialization & Infrastructure

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`
- Create: `src/env.d.ts`

- [ ] **Step 1: Initialize Astro project**
Run: `npm create astro@latest . -- --template minimal --install --no-git --typescript strict`
Expected: Project scaffolded in current directory.

- [ ] **Step 2: Install dependencies**
Run: `npm install tailwindcss @tailwindcss/vite motion clsx tailwind-merge`
Expected: Core packages installed.

- [ ] **Step 3: Configure Astro for i18n**
Modify `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';

export default defineConfig({
  integrations: [],
  vite: {
    plugins: [tailwindv4()],
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'eu', 'en'],
    routing: {
      prefixDefaultLocale: true,
      fallbackType: 'redirect'
    }
  }
});
```

- [ ] **Step 4: Setup Tailwind v4 CSS**
Create `src/styles/global.css`:
```css
@import "tailwindcss";

@theme {
  --color-midnight-ink: #0D0D0D;
  --color-paper-white: #F0F0F0;
  --color-concrete-gray: #525252;
  --color-alert-red: #A30000;

  --font-display: "Bebas Neue", sans-serif;
  --font-body: "Helvetica Neue", sans-serif;

  --radius-pill: 32px;
}

:root {
  background-color: var(--color-midnight-ink);
  color: var(--color-paper-white);
  font-family: var(--font-body);
}

h1, h2, h3, .display-text {
  font-family: var(--font-display);
  text-transform: uppercase;
  line-height: 0.7;
}
```

- [ ] **Step 5: Commit infrastructure**
Run: `git add . && git commit -m "chore: initial astro setup with tailwind v4 and i18n"`

---

### Task 2: Content Collections Definition

**Files:**
- Create: `src/content/config.ts`
- Create folders: `src/content/producciones`, `src/content/formacion`, `src/content/equipo`, `src/content/paginas`

- [ ] **Step 1: Define schemas**
Create `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const producciones = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    cast: z.array(z.string()).optional(),
    image: z.string().optional(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

const formacion = defineCollection({
  schema: z.object({
    title: z.string(),
    instructor: z.string(),
    duration: z.string(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

const equipo = defineCollection({
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

const paginas = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

export const collections = { producciones, formacion, equipo, paginas };
```

- [ ] **Step 2: Create sample content (Spanish)**
Create `src/content/producciones/es/de-profundis.md`:
```markdown
---
title: "De Profundis"
description: "Obra basada en la carta de Oscar Wilde."
year: 2022
lang: "es"
---
Contenido de la obra...
```

- [ ] **Step 3: Commit collections**
Run: `git add src/content && git commit -m "feat: define content collections and schemas"`

---

### Task 3: Base Layout & Components (Charlie Style)

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Navigation.astro`, `src/components/Button.astro`

- [ ] **Step 1: Create Button component**
Create `src/components/Button.astro`:
```astro
---
interface Props {
  href?: string;
  variant?: 'ghost' | 'filled';
  class?: string;
}
const { href, variant = 'ghost', class: className } = Astro.props;
const base = "px-5 py-2 rounded-[32px] font-body text-[19px] transition-colors border-2";
const variants = {
  ghost: "border-paper-white text-paper-white bg-transparent hover:bg-paper-white hover:text-midnight-ink",
  filled: "border-paper-white bg-paper-white text-midnight-ink hover:bg-transparent hover:text-paper-white"
};
const Element = href ? 'a' : 'button';
---
<Element href={href} class:list={[base, variants[variant], className]}>
  <slot />
</Element>
```

- [ ] **Step 2: Create Base Layout**
Create `src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';
const { title, lang = 'es' } = Astro.props;
---
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <title>{title} | Ortzai</title>
    <meta name="viewport" content="width=device-width" />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  </head>
  <body class="bg-midnight-ink text-paper-white max-w-[1306px] mx-auto px-5">
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Commit Layouts**
Run: `git add src/layouts src/components && git commit -m "feat: base layout and pill button component"`

---

### Task 4: Trilingual Home Page

**Files:**
- Create: `src/pages/[lang]/index.astro`

- [ ] **Step 1: Implement dynamic index**
Create `src/pages/[lang]/index.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';

export function getStaticPaths() {
  return [
    { params: { lang: 'es' } },
    { params: { lang: 'eu' } },
    { params: { lang: 'en' } },
  ];
}
const { lang } = Astro.params;
const titles = { es: 'Inicio', eu: 'Hasiera', en: 'Home' };
---
<BaseLayout title={titles[lang]} lang={lang}>
  <header class="py-20 bg-alert-red -mx-5 px-5 mb-10">
    <h1 class="text-[145px] md:text-[360px] tracking-[-0.079em] text-midnight-ink">ORTZAI</h1>
  </header>
  <main>
    <h2 class="text-subheading mb-10">Teatro · Antzerkia · Theatre</h2>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Verify build**
Run: `npx astro check && npx astro build`
Expected: Build success with folders `/es/`, `/eu/`, `/en/`.

- [ ] **Step 3: Commit Home**
Run: `git commit -am "feat: implement trilingual home page with dynamic routing"`

---

### Task 5: Production List & Details

**Files:**
- Create: `src/pages/[lang]/producciones/index.astro`
- Create: `src/pages/[lang]/producciones/[slug].astro`

- [ ] **Step 1: List productions**
Implement fetching from `getCollection('producciones')` filtered by `lang`.

- [ ] **Step 2: Detail page**
Implement dynamic paths for each production slug.

- [ ] **Step 3: Commit Productions**
Run: `git commit -am "feat: add productions list and detail pages"`
