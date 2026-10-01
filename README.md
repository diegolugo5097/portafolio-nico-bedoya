# Portafolio · Nicol Bedoya

React 18 + Vite + Tailwind CSS 3.

```bash
npm install
npm run dev           # desarrollo en http://localhost:5173
npm run build         # sitio estático en /dist (Netlify, Vercel, GitHub Pages…)
npm run build:single  # un solo index.html con todo embebido en /dist-single
```

- Contenido (textos, habilidades, áreas, contacto): constantes al inicio de `src/App.jsx`.
- Fotos: `src/assets/` y videos: `src/assets/videos/` (ya optimizados para web). Un video se agrega en `AREAS` con `{ src: portada, video: archivo, alt }`.
- Fuentes: Fraunces (títulos), Instrument Sans (texto) y Pinyon Script (firma), autoalojadas con @fontsource, sin depender de Google Fonts.
- Modo noche: botón en el menú; se recuerda la elección del visitante.
- Colores: variables CSS en `src/index.css` (incluye modo oscuro) y nombres en `tailwind.config.js`.
