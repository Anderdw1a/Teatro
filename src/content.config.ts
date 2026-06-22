import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const producciones = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/producciones' }),
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
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/formacion' }),
  schema: z.object({
    title: z.string(),
    instructor: z.string(),
    duration: z.string(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

const equipo = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/equipo' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/paginas' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['es', 'eu', 'en']),
  }),
});

export const collections = { producciones, formacion, equipo, paginas };
