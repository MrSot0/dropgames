import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Define la URL raíz de tu sitio en producción para que las rutas internas funcionen bien
  site: 'https://dropgames.blog',
  
  // Si vas a usar GitHub Pages con el dominio personalizado, mantén la base en '/' 
  // ya que el dominio propio apunta directamente a la raíz.
  base: '/',
  
  server: {
    port: 4321
  }
});
