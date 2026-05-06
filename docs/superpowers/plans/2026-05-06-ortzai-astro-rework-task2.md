# Task 2: Content Collections Definition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up Astro Content Collections for trilingual content with validated schemas.

**Architecture:** Use `astro:content` to define strongly-typed collections for productions, training, team, and generic pages.

**Tech Stack:** Astro 6.x, TypeScript, Zod.

---

### Task 2.1: Define Collections Schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create `src/content/config.ts` with defined schemas**

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

---

### Task 2.2: Setup Directory Structure

**Files:**
- Create folders: `src/content/producciones`, `src/content/formacion`, `src/content/equipo`, `src/content/paginas`

- [ ] **Step 1: Create necessary content directories**

Run: `mkdir -p src/content/producciones src/content/formacion src/content/equipo src/content/paginas`
Expected: Directories created successfully.

---

### Task 2.3: Add Sample Content

**Files:**
- Create: `src/content/producciones/es/de-profundis.md`

- [ ] **Step 1: Create a sample Spanish production file**

```markdown
---
title: "De Profundis"
description: "Obra basada en la carta de Oscar Wilde."
year: 2022
lang: "es"
---
Contenido de la obra...
```

---

### Task 2.4: Verification and Commit

- [ ] **Step 1: Run Astro Sync to verify schemas**

Run: `npx astro sync`
Expected: "Successfully generated content collection types."

- [ ] **Step 2: Commit changes**

Run: `git add src/content && git commit -m "feat: define content collections and schemas"`
