# 🎮 Portal de Juegos - Repositorio de Contenido y Catálogo Markdown

Bienvenido al repositorio oficial de **DropGames**, un sistema de gestión y catálogo basado en archivos **Markdown con Frontmatter YAML** diseñado para estructurar información de videojuegos, requisitos de sistema, galerías multimedia y enlaces de descarga seguros a través de **Terabox**.

---

## 📂 Estructura del Repositorio

Cada videojuego se administra de manera independiente mediante un archivo `.md` ubicado en la raíz o en la carpeta de contenidos del proyecto. La estructura estandarizada incluye metadatos avanzados para motores de plantillas (Astro, Next.js, Hugo, Jekyll) y una sección descriptiva enriquecida.

```text
/
├── dark_souls.md
├── elden_ring.md
├── subnautica.md
├── subnautica_android.md
├── fallout_new_vegas.md
├── cuphead.md
├── ultrakill.md
├── halo_campaign_evolved.md
└── README.md
```

---

## 📋 Especificación del Frontmatter YAML

Cada archivo Markdown inicia con un bloque de metadatos YAML estricto que alimenta la interfaz de usuario:

```yaml
---
title: "Nombre del Videojuego"
categoria: "rpg" # Opciones comunes: rpg, accion, supervivencia, aventura, estrategia
plataforma: "PC" # Ej: PC, Android, Consola
tamano: "14 GB"
imagen: "https://i.ibb.co/..." # Imagen principal de portada
imagenes:
  - "https://i.ibb.co/..." # Captura 1
  - "https://i.ibb.co/..." # Captura 2
  - "https://i.ibb.co/..." # Captura 3
descripcionCorta: "Breve resumen atractivo para tarjetas de presentación."
fecha: 2026-07-28
nivelRequisitos: "medios" # bajos, medios, altos
requisitos:
  minimos:
    so: "Windows 10 64-bit"
    cpu: "Intel Core i5 / AMD Ryzen 3"
    ram: "8 GB"
    gpu: "NVIDIA GTX 1060 / AMD RX 580"
    almacenamiento: "20 GB disponibles"
  recomendados:
    so: "Windows 10/11 64-bit"
    cpu: "Intel Core i7 / AMD Ryzen 5"
    ram: "16 GB"
    gpu: "NVIDIA GTX 1070 / AMD Vega 56"
    almacenamiento: "20 GB disponibles (SSD)"
enlaces:
  - servidor: "Terabox"
    url: "https://playpaste.net/?v=..."
trailer: "ID_DE_YOUTUBE"
destacado: true # true o false para carrusel principal
---
```

---

## 📝 Estructura del Contenido Markdown

El cuerpo de cada documento sigue un estándar editorial claro:

1. **Introducción / Sinopsis:** Párrafo principal introductorio sobre la historia y ambientación del título.
2. **Características Principales:** Lista de viñetas destacando la jugabilidad, mecánicas y apartados técnicos.
3. **Contenido Incluido:** Detalle de expansiones, DLCs y parches integrados en el instalador.
4. **Requisitos y Notas de Instalación:** Consejos de optimización, uso de SSD, parches de estabilidad o configuración de mandos.

---

## 🚀 Cómo Añadir un Nuevo Juego

1. Copia cualquiera de los archivos existentes (por ejemplo, `halo_campaign_evolved.md` o `elden_ring.md`) como plantilla.
2. Actualiza los campos del **Frontmatter YAML** con la información correspondiente (Título, enlaces de imágenes en Imbb, tamaño y enlace de Terabox vía PlayPaste).
3. Redacta las características y notas de instalación respetando el formato de Markdown.
4. Guarda el archivo con nomenclatura en minúsculas y guiones bajos (ej. `nombre_del_juego.md`).

---

## 🛠️ Tecnologías y Compatibilidad

- **Formato de Datos:** Markdown (`.md`) / YAML
- **Alojamiento de Imágenes:** ImgBB
- **Servidor de Descargas:** Terabox (enlaces protegidos / acortados)
- **Compatibilidad de Motores:** Diseñado para integrarse perfectamente con generadores de sitios estáticos (SSG) como **Astro**, **Next.js (MDX)** o **Hugo**.
