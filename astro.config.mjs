import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

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

  integrations: [sitemap()],
});