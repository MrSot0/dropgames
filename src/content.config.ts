import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // ¡Importante usar glob en Astro v5!

// Creamos un validador híbrido: acepta URL válida o una ruta de texto local
const imagenHibrida = z.union([z.string().url(), z.string()]);

const juegos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/juegos" }),
  schema: z.object({
    title: z.string(),
    categoria: z.string(),
    plataforma: z.string(),
    tamano: z.string(),
    
    // 🌟 Soportan tanto URLs externas como rutas locales (/img/...)
    imagen: imagenHibrida,
    imagenes: z.array(imagenHibrida).optional(),
    
    descripcionCorta: z.string(),
    
    // Forzamos la conversión automática del string del Markdown a un objeto Date real
    fecha: z.coerce.date(), 
    
    nivelRequisitos: z.string(),
    requisitos: z.object({
      minimos: z.object({
        so: z.string(),
        cpu: z.string(),
        ram: z.string(),
        gpu: z.string(),
        almacenamiento: z.string(),
      }),
      recomendados: z.object({
        so: z.string(),
        cpu: z.string(),
        ram: z.string(),
        gpu: z.string(),
        almacenamiento: z.string(),
      }),
    }),
    enlaces: z.array(z.object({
      servidor: z.string(),
      url: z.string(),
    })),
    destacado: z.boolean(),
    trailer: z.string().optional(),
  })
});

export const collections = { juegos };
