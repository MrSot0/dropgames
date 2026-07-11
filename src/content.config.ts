import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // ¡Importante usar glob en Astro v5!

const juegos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/juegos" }),
  schema: z.object({
    title: z.string(),
    categoria: z.string(),
    plataforma: z.string(),
    tamano: z.string(),
    imagen: z.string(),
    // 🌟 AGREGA ESTA LÍNEA AQUÍ ABAJO 🌟
    imagenes: z.array(z.string()).optional(),
    descripcionCorta: z.string(),
    fecha: z.date(),
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