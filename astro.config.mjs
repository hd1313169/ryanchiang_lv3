// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://hd1313169.github.io',
  base: '/ryanchiang_lv3',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
