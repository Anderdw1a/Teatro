# Ortzai Astro Rework: Project Initialization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the Ortzai project using Astro 4.x with trilingual i18n and "Charlie" theme infrastructure using Tailwind v4.

**Architecture:** Minimal Astro setup with native trilingual routing and a global CSS-first theme configuration using Tailwind v4 Vite plugin.

**Tech Stack:** Astro 4.x, Tailwind CSS v4, @tailwindcss/vite, Framer Motion, TypeScript.

---

### Task 1: Astro Project Initialization

**Files:**
- Create: All base Astro files in `.`

- [ ] **Step 1: Run Astro initialization**
Run: `npm create astro@latest . -- --template minimal --install --no-git --typescript strict`
Expected: Astro project files created and dependencies installed.

- [ ] **Step 2: Install additional dependencies**
Run: `npm install tailwindcss @tailwindcss/vite motion clsx tailwind-merge`
Expected: Dependencies added to `package.json`.

- [ ] **Step 3: Commit initialization**
Run: `git add . && git commit -m "chore: initial astro setup"`

---

### Task 2: Configure i18n and Tailwind v4

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update `astro.config.mjs` with i18n and Tailwind plugin**
```javascript
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'eu', 'en'],
    routing: {
      prefixDefaultLocale: true,
      fallbackType: 'redirect',
    },
  },
  vite: {
    plugins: [tailwindv4()],
  },
});
```

- [ ] **Step 2: Commit configuration**
Run: `git add astro.config.mjs && git commit -m "chore: configure i18n and tailwind v4 plugin"`

---

### Task 3: Setup "Charlie" Global Styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css` with "Charlie" theme**
```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-midnight-ink: #0D0D0D;
  --color-paper-white: #F0F0F0;
  --color-concrete-gray: #525252;
  --color-alert-red: #A30000;

  /* Typography */
  --font-display: "Bebas Neue", sans-serif;
  --font-body: "Helvetica Neue", sans-serif;

  /* Radius */
  --radius-pill: 32px;
  --radius-buttons: 100px;
}

@layer base {
  body {
    @apply bg-midnight-ink text-paper-white font-body;
  }
}
```

- [ ] **Step 2: Update `src/pages/index.astro` to import global styles**
```astro
---
---

<html lang="es">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro</title>
	</head>
	<body>
		<h1 class="font-display text-4xl">Astro</h1>
	</body>
</html>

<style is:global>
  @import "../styles/global.css";
</style>
```

- [ ] **Step 3: Verify the setup**
Run: `npm run build`
Expected: Build succeeds without errors.

- [ ] **Step 4: Commit styles**
Run: `git add src/styles/global.css src/pages/index.astro && git commit -m "feat: add global styles with Charlie theme"`

---

### Task 4: Final Verification and Cleanup

**Files:**
- Delete: `index.html` (if exists from previous state)

- [ ] **Step 1: Remove legacy files**
Run: `rm index.html` (if it exists)

- [ ] **Step 2: Final commit**
Run: `git add . && git commit -m "chore: final cleanup and infrastructure complete"`
