# AGENTS.md - Alicia · Comida en casa

Memoria operativa de esta landing. Léela al empezar una sesión. Si en la sesión cambia el producto, los precios, el mensaje de pedido, las variables de entorno, la arquitectura o una restricción de UI, actualiza la sección correspondiente y agrega una línea fechada en Bitácora antes de terminar.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Después de cambios significativos de código, ejecutar `npm run build`. El sitio local queda en `http://localhost:3000`. Hace falta `.env.local` (copiado de `.env.example`); sin `WHATSAPP_NUMBER` válido la página lanza error al renderizar.

## Stack

- Next.js 16 (App Router) y React 19. Antes de usar APIs de Next, leer la guía en `node_modules/next/dist/docs/`: esta versión no coincide con el Next.js de los datos de entrenamiento.
- TypeScript estricto, sin `any`.
- Tailwind CSS v4, solo en `src/app/globals.css` (`@import "tailwindcss"`).
- Iconos con `lucide-react`, salvo el de WhatsApp (`WhatsAppIcon`).
- Server Components por defecto. `"use client"` solo en `WhatsAppOrder` (cantidades) y `error.tsx`.

## Producto

Fuente de verdad: `src/lib/site.ts`. No hardcodear precios ni nombres en componentes nuevos; si el copy de la página o el FAQ los menciona, mantenerlos alineados con esa config.

- Marca: `Alicia · Comida en casa`.
- Dos variedades, combinables en el mismo pedido:
  - `tradicional`: papa rellena tradicional, S/ 15.
  - `lomo-saltado`: papa rellena de lomo saltado, S/ 17.
- Cada pedido incluye crema huancaína, crema de ocopa y ají. No son opcionales ni tienen precio aparte.
- Cantidad independiente de 0 a 20 por variedad. Estado inicial: 1 tradicional y 0 de lomo saltado.
- El subtotal es solo de las papas. El delivery no se cobra en la página: Alicia lo confirma por WhatsApp.
- Cobertura: solo Lince, Lima. La ampliación a otros distritos es una intención futura, no una función.
- Escribir por WhatsApp no confirma el pedido.
- Alérgeno declarado en el FAQ: contiene huevo.
- Badge visible del hero: «Desde S/ 15».

## Pedido por WhatsApp

Todo enlace `wa.me` se arma en `src/lib/whatsapp.ts` con `buildWhatsAppOrderUrl`. No concatenar el mensaje en componentes.

- El número sale de `WHATSAPP_NUMBER`, solo dígitos, patrón `51` + nueve dígitos. Nunca mostrarlo como texto.
- El mensaje lista cada variedad con cantidad, precio unitario y subtotal de línea, el subtotal general, las tres cremas y la entrega en Lince, y pide confirmar disponibilidad y costo de delivery.
- Si no hay unidades, el selector deshabilita el CTA («Agrega al menos una papa rellena») y no genera URL.
- El CTA del header y el del cierre usan un pedido fijo de 1 tradicional. No reflejan las cantidades del selector, que viven solo en el cliente durante la visita.
- En móvil, con al menos una unidad, hay un CTA fijo abajo a la derecha (`md:hidden`) con el total del selector. El footer deja `pb-24` en móvil para no quedar tapado.

## Alcance cerrado

Landing de una sola página. No hay base de datos, autenticación, panel, carrito persistente, checkout ni rutas API.

En agosto de 2026 se retiró un ecommerce completo (Supabase, auth, admin, catálogo, carrito). No reintroducirlo salvo que Abraham lo pida de forma explícita. Las skills locales de Supabase no autorizan a volver a conectarlo.

`next.config.ts` redirige las rutas viejas para que no revivan como páginas:

- `/menu`, `/productos`, `/categorias`, `/marcas`, `/carrito`, `/checkout` → `/#pedido`
- `/acerca-de-nosotros` → `/#historia`
- `/login`, `/registro`, `/recuperar-contrasena`, `/verificar-email`, `/cuenta`, `/admin` → `/`

## Estructura

```text
src/app/page.tsx                         Landing: header fijo, hero, producto, historia, pasos, FAQ, cierre
src/app/layout.tsx                       Metadatos, Open Graph y metadataBase
src/app/globals.css                      Tema, foco visible y movimiento reducido
src/app/loading.tsx                      Pulso de carga
src/app/error.tsx                        Error con reintento
src/app/icon.svg                         Favicon
src/components/landing/WhatsAppOrder.tsx Selector de variedades y CTAs
src/components/landing/WhatsAppIcon.tsx  Icono accesible (aria-hidden)
src/lib/site.ts                          Marca, variedades, precios, cremas, tope y zona
src/lib/whatsapp.ts                      Mensaje y URL de pedido
next.config.ts                           Redirects de las rutas del ecommerce anterior
recursos_imagenes/papa_rellena.jpeg      Foto principal; no recortarla: presentarla con next/image
```

Secciones con ancla: `#inicio`, `#pedido`, `#la-papa`, `#historia`, `#como-pedir`. El header es fijo (franja de delivery + marca + nav). En `lg` la nav va en el header; debajo, una nav móvil. El `main` compensa esa altura con padding superior.

## Variables de entorno

- `WHATSAPP_NUMBER`: código de país y número, solo dígitos. Perú: `51` + nueve dígitos.
- `SITE_URL`: origen público para metadatos. `getMetadataBase()` en `layout.tsx` acepta el valor con o sin protocolo; si falta el protocolo, antepone `https://`. En local, `.env.example` usa `http://localhost:3000`.
- `.env.local` está ignorado por Git. No publicar el número ni otras credenciales.

## UI que hay que preservar

- Idioma `es-PE`. Paleta de la marca: crema `#fff8eb`, rojo `#b83a2d`, verde `#3f5b3b`, dorado `#e6a63a`.
- Tipografía de sistema: Arial para texto y Georgia (`.font-display`) para títulos. No agregar fuentes remotas.
- Foto hero con `priority`, `alt` propio y `object-cover`. No sustituir el archivo salvo pedido explícito.
- Foco visible (outline dorado), controles de cantidad con nombre accesible, y `prefers-reduced-motion` en `globals.css`.
- `<body suppressHydrationWarning>`: dejarlo. Evita el aviso cuando el navegador o una extensión escribe atributos en `body` antes de hidratar.
- JSON-LD `Product` con `AggregateOffer` de S/ 15 a S/ 17. Actualizarlo si cambian los precios.
- El título mobile del hero usa `clamp` para no desbordar en pantallas angostas. Los botones de cantidad miden al menos 44px en móvil.

## Convenciones

- Imports internos con alias `@/`.
- Precios y nombres de variedad salen de `siteConfig`. El texto del pedido sale de `whatsapp.ts`.
- Copy en español de Perú, tono casero y directo. No prometer confirmación ni precio de delivery en la página.
- Verificar cambios de UI en el navegador (escritorio y móvil): selector en 0, una variedad, ambas, y que el CTA flotante no tape el footer.

## Bitácora

- 2026-08-04 · v1: el ecommerce (Supabase, auth, carrito, admin, checkout) pasó a ser esta landing de un solo producto con pedido por WhatsApp.
- 2026-08-04 · v2: ajuste móvil de tipo, paddings, áreas táctiles del selector y CTA flotante; el footer reserva espacio inferior en móvil.
- 2026-10-03 · `SITE_URL` vale con o sin protocolo. `metadataBase` normaliza a URL absoluta y, si no hay esquema, usa `https://`. Se documentó en el README.
- 2026-10-03 · `AGENTS.md` queda como memoria entre sesiones: producto de dos variedades, redirects heredados y reglas de pedido descritas arriba.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
