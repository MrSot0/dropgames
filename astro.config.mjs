import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://dropgames.blog',
  base: '/',
  
  image: {
    domains: ['i.ibb.co'], 
  },
  
  server: {
    port: 4321
  }
});
