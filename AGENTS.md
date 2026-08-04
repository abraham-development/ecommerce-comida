# AGENTS.md - Alicia · Comida en casa

Guía operativa para esta landing page.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Después de cambios significativos de código, ejecutar `npm run build`.

## Producto y alcance

- Landing de una sola página para vender papa rellena criolla.
- Marca: `Alicia · Comida en casa`.
- Precio: S/ 15 por unidad.
- Cobertura inicial: Lince, Lima.
- Conversión: pedido directo por WhatsApp.
- Sin base de datos, autenticación, panel administrativo, carrito ni checkout.

## Estructura

```text
src/app/page.tsx                         Landing completa
src/app/layout.tsx                       Metadatos y layout raíz
src/app/globals.css                      Tema y estilos globales
src/components/landing/WhatsAppOrder.tsx Selector y CTA de WhatsApp
src/components/landing/WhatsAppIcon.tsx  Icono accesible
src/lib/site.ts                          Configuración del producto
src/lib/whatsapp.ts                      Mensaje y URL de pedido
recursos_imagenes/papa_rellena.jpeg      Foto principal
```

## Variables de entorno

- `WHATSAPP_NUMBER`: código de país y número, solo dígitos. No mostrarlo como texto visible.
- `SITE_URL`: origen público para metadatos sociales.
- `.env.local` es local e ignorado por Git. No publicar credenciales.

## Convenciones

- TypeScript estricto, sin `any`.
- Server Components por defecto; `"use client"` solo para interacción.
- Imports internos con alias `@/`.
- Tailwind CSS v4 configurado en `src/app/globals.css`.
- Preservar la imagen original; ajustar su presentación con `next/image` y CSS.
- Los enlaces de WhatsApp deben construir el texto mediante `src/lib/whatsapp.ts`.
- Mantener foco visible, etiquetas accesibles y soporte de movimiento reducido.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
