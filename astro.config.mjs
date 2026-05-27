// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://plinko-slot.space',
  trailingSlash: 'always',
  compressHTML: true,
  integrations: [sitemap()],
});
