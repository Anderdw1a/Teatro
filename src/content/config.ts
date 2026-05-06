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
