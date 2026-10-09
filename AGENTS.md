# AGENTS.md - Alicia · Comida en casa

Memoria operativa de esta landing. Léela al empezar una sesión. Si en la sesión cambia el producto, los precios, el mensaje de pedido, las variables de entorno, la arquitectura o una restricción de UI, actualiza la sección correspondiente y agrega una línea fechada en Bitácora antes de terminar.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
npm run build:hostinger
npm run start
```

Después de cambios significativos de código, ejecutar `npm run build`. El sitio local queda en `http://localhost:3000`. Hace falta `.env.local`; sin `WHATSAPP_NUMBER` válido la página lanza error al renderizar. En Hostinger el comando de build es `build:hostinger` (`next build --webpack`): ese servidor no carga el SWC nativo de Turbopack.

## Stack

- Next.js 16 (App Router) y React 19. Antes de usar APIs de Next, leer la guía en `node_modules/next/dist/docs/`: esta versión no coincide con el Next.js de los datos de entrenamiento.
- TypeScript estricto, sin `any`.
- Tailwind CSS v4, solo en `src/app/globals.css` (`@import "tailwindcss"`).
- Iconos con `lucide-react`, salvo el de WhatsApp (`WhatsAppIcon`).
- Server Components por defecto. `"use client"` en `WhatsAppOrder` (cantidades), `MobileNav` (menú) y `error.tsx`.

## Producto

Fuente de verdad: `src/lib/site.ts`. No hardcodear precios ni nombres en componentes nuevos; si el copy de la página o el FAQ los menciona, mantenerlos alineados con esa config.

- Marca: `Alicia · Comida en casa`.
- Tres variedades de prueba, combinables en el mismo pedido:
  - `tradicional`: papa rellena + ensalada especial, S/ 7.
  - `lomo-saltado`: papa rellena + ensalada especial + arroz chaufa, S/ 12.
  - `aji-de-gallina`: papa rellena de ají de gallina, S/ 16. Es una muestra para ver el selector; Abraham la confirma o la retira.
- Cada pedido incluye crema huancaína, crema de ocopa y ají. No son opcionales ni tienen precio aparte.
- Cantidad independiente de 0 a 20 por variedad. Estado inicial: 1 tradicional y 0 del resto.
- El selector muestra las disponibles a la izquierda, con un check para incluirlas, el precio y la cantidad. El check enciende la papa en 1 y la apaga en 0. El menos queda deshabilitado en 1; el más, si la variedad está apagada o ya llegó a 20. A la derecha, en «Tu pedido», salen solo las marcadas, el precio de cada línea y el total. En pantallas menores a `lg`, ese pedido queda fijo abajo y se puede plegar.
- El subtotal es solo de las papas. El delivery no se cobra en la página: Alicia lo confirma por WhatsApp.
- Cobertura: solo Lince, Lima. La ampliación a otros distritos es una intención futura, no una función.
- Escribir por WhatsApp no confirma el pedido.
- Alérgeno declarado en el FAQ: contiene huevo.
- Badge visible del hero: «Desde S/» más el precio más bajo de `siteConfig.product.options` (hoy S/ 7). El JSON-LD usa el mismo mínimo y el máximo (hoy S/ 16). El FAQ de `page.tsx` escribe los tres precios a mano; si cambia un precio, actualizar esa respuesta junto con `site.ts`.

## Pedido por WhatsApp

Todo enlace `wa.me` se arma en `src/lib/whatsapp.ts` con `buildWhatsAppOrderUrl`. No concatenar el mensaje en componentes.

- El número sale de `WHATSAPP_NUMBER`, solo dígitos, patrón `51` + nueve dígitos. Nunca mostrarlo como texto.
- El mensaje lista cada variedad con cantidad, precio unitario y subtotal de línea, el subtotal general, la frase fija «Tu pedido incluye gratis crema huancaína, crema de ocopa y ají.» y la entrega en Lince, y pide confirmar disponibilidad y costo de delivery. Esa frase vive en `whatsapp.ts`. El ticket de escritorio arma la misma idea con `siteConfig.product.creams`. Si cambian las cremas, actualizar los dos sitios.
- Si no hay unidades, el selector deshabilita el CTA («Agrega al menos una papa rellena») y no genera URL. El vacío dice: «Todavía no elegiste ninguna papa. Marca un check a la izquierda.»
- El CTA del header y el del cierre usan un pedido fijo de 1 tradicional. No reflejan las cantidades del selector, que viven solo en el cliente durante la visita. En el header, el texto es «Pedir» por debajo de `sm` y «Pedir por WhatsApp» desde `sm`.
- Desde `lg`, «Tu pedido» vive a la derecha del catálogo e incluye «Tu pedido incluye gratis» y el aviso de que el mensaje no confirma el pedido. Por debajo de `lg` el panel va fijo al borde inferior y arranca desplegado. Un botón visible dice «Plegar» y lo reduce a una franja con el total; plegado, el botón dice «Ver pedido» y lo abre de nuevo. En modo compacto: cada papa en una línea de 13px con su subtotal (sin la línea «N × S/ …»; la cantidad queda en «N unidades»), cremas a 11px, total en `text-2xl` y botón de al menos 44px, con `safe-area-inset-bottom`. El nombre más largo puede partir en dos líneas; las tres variedades siguen visibles, sin scroll interno. Ese modo omite solo el aviso de confirmación. El bloque del pedido reserva `max-lg:mb-80` y el footer reserva `pb-96` (`lg:py-10` sin ese hueco) para no quedar tapados.

## Alcance cerrado

Landing de una sola página. No hay base de datos, autenticación, panel, carrito persistente, checkout ni rutas API.

En agosto de 2026 se retiró un ecommerce completo (Supabase, auth, admin, catálogo, carrito). No reintroducirlo salvo que Abraham lo pida de forma explícita. Las skills locales de Supabase no autorizan a volver a conectarlo.

`next.config.mjs` es JavaScript a propósito, para que Hostinger lea la config sin el SWC nativo. Redirige las rutas viejas para que no revivan como páginas:

- `/menu/:path*`, `/productos/:path*`, `/categorias/:path*`, `/marcas/:path*`, `/carrito`, `/checkout` → `/#pedido`
- `/acerca-de-nosotros` → `/#historia`
- `/login`, `/registro`, `/recuperar-contrasena`, `/verificar-email`, `/cuenta/:path*`, `/admin/:path*` → `/`

## Estructura

```text
src/app/page.tsx                         Landing: header fijo, hero, producto, historia, pasos, FAQ, cierre
src/app/layout.tsx                       Metadatos, Open Graph y metadataBase
src/app/globals.css                      Tema, foco visible y movimiento reducido
src/app/loading.tsx                      Pulso de carga
src/app/error.tsx                        Error con reintento
src/app/icon.svg                         Favicon
src/components/landing/WhatsAppOrder.tsx Selector de variedades, ticket y CTAs
src/components/landing/MobileNav.tsx     Menú hamburguesa; cliente, solo bajo `lg`
src/components/landing/WhatsAppIcon.tsx  Icono accesible (aria-hidden)
src/lib/site.ts                          Marca, variedades, precios, cremas, tope y zona
src/lib/whatsapp.ts                      Mensaje y URL de pedido
next.config.mjs                          Redirects de las rutas del ecommerce anterior
recursos_imagenes/papa_rellena.jpeg      Foto principal; no recortarla: presentarla con next/image
```

Secciones con ancla: `#inicio`, `#pedido`, `#la-papa`, `#historia`, `#como-pedir`. El FAQ y el cierre no tienen ancla. El header es fijo (`z-[60]`): franja de delivery (`h-11`, en `sm` `h-10`) y fila de marca (`h-20`). El `main` compensa esa suma con `pt-[124px]` y, desde `sm`, `pt-[120px]`.

En `lg` la navegación va en el header. Por debajo de `lg`, `MobileNav` pone un botón de 44px a la izquierda del logotipo. El panel (`z-[70]`) se ancla justo bajo el header (`top-[124px]`, desde `sm` `top-[120px]`), lista Inicio, La papa, Nuestra historia y Cómo pedir, se cierra al seguir un enlace o con Escape, y no incluye `#pedido`.

## Despliegue

Producción en Hostinger, web app `lightgrey-sheep-820074.hostingersite.com`, desde `abraham-development/ecommerce-comida` rama `main`. El build de esa app es `npm run build:hostinger`. Variables de producción: `WHATSAPP_NUMBER` y `SITE_URL` (el dominio de esa web app).

## Variables de entorno

- `WHATSAPP_NUMBER`: código de país y número, solo dígitos. Perú: `51` + nueve dígitos. `getWhatsAppNumber()` en `page.tsx` exige el patrón `51` + nueve dígitos.
- `SITE_URL`: origen público para metadatos. `getMetadataBase()` en `layout.tsx` acepta el valor con o sin protocolo; si falta el protocolo, antepone `https://`. Si la variable no está, usa `http://localhost:3000`.
- `.env*` está ignorado por Git, con la excepción `!.env.example`. En el árbol hay `.env.local` y `.env.production`; `.env.example` lo nombra el README y hoy no está en el repositorio. No publicar el número ni otras credenciales.

## UI que hay que preservar

- Idioma `es-PE`. Paleta de la marca: crema `#fff8eb`, rojo `#b83a2d`, verde `#3f5b3b`, dorado `#e6a63a`.
- Tipografía de sistema: Arial para texto y Georgia (`.font-display`) para títulos. No agregar fuentes remotas.
- Foto hero con `priority`, `alt` propio y `object-cover`. No sustituir el archivo salvo pedido explícito.
- Foco visible (outline dorado), controles de cantidad con nombre accesible, y `prefers-reduced-motion` en `globals.css`.
- `<body suppressHydrationWarning>`: dejarlo. Evita el aviso cuando el navegador o una extensión escribe atributos en `body` antes de hidratar.
- JSON-LD `Product` con `AggregateOffer` calculado desde las variedades: hoy de S/ 7 a S/ 16, tres ofertas, zona «Lince, Lima, Perú». El nombre del producto en el schema es «Papas rellenas criollas».
- El título mobile del hero usa `clamp` para no desbordar en pantallas angostas. Los botones de cantidad miden al menos 44px en móvil.

## Convenciones

- Imports internos con alias `@/`.
- Precios y nombres de variedad salen de `siteConfig`. El texto del pedido sale de `whatsapp.ts`.
- Copy en español de Perú, tono casero y directo. No prometer confirmación ni precio de delivery en la página.
- Verificar cambios de UI en el navegador (escritorio y móvil): selector en 0, una variedad, las tres, el total de la derecha y que el pedido fijo no tape el footer.

## Bitácora

- 2026-08-04 · v1: el ecommerce (Supabase, auth, carrito, admin, checkout) pasó a ser esta landing de un solo producto con pedido por WhatsApp.
- 2026-08-04 · v2: ajuste móvil de tipo, paddings, áreas táctiles del selector y CTA flotante; el footer reserva espacio inferior en móvil.
- 2026-10-03 · `SITE_URL` vale con o sin protocolo. `metadataBase` normaliza a URL absoluta y, si no hay esquema, usa `https://`. Se documentó en el README.
- 2026-10-03 · `AGENTS.md` queda como memoria entre sesiones: producto de dos variedades, redirects heredados y reglas de pedido descritas arriba.
- 2026-10-03 · Producción en Hostinger, web app nueva `lightgrey-sheep-820074.hostingersite.com`, desplegada desde `abraham-development/ecommerce-comida` rama `main`. El build de Hostinger es `build:hostinger` (`next build --webpack`) porque el servidor no carga el SWC nativo de Turbopack. `next.config.mjs` evita que ese mismo fallo impida leer la config. Variables de producción: `WHATSAPP_NUMBER` y `SITE_URL` (el dominio de esa web app).
- 2026-10-03 · Selector de pedido de prueba: catálogo a la izquierda y «Tu pedido» a la derecha, con una tercera variedad de muestra (ají de gallina, S/ 16). En móvil el pedido queda fijo abajo. Se elige cada papa con el check de la izquierda.
- 2026-10-03 · La variedad `tradicional` se muestra como «Papa rellena + ensalada especial», a S/ 15.
- 2026-10-03 · La variedad `lomo-saltado` se muestra como «Papa rellena + ensalada especial + arroz chaufa», a S/ 17.
- 2026-10-03 · La papa rellena + ensalada especial baja a S/ 7. El badge del hero muestra el precio más bajo.
- 2026-10-03 · La papa rellena + ensalada especial + arroz chaufa baja a S/ 12.
- 2026-10-03 · En «Tu pedido» las cremas se anuncian como «Tu pedido incluye gratis». El mensaje de WhatsApp dice lo mismo.
- 2026-10-03 · En celular, la navegación sale de la franja bajo el header y pasa a un menú hamburguesa a la izquierda del logotipo.
- 2026-10-03 · Memoria alineada con el código: `MobileNav` es cliente; el ticket bajo `lg` es compacto (sin cremas ni aviso); el badge y el JSON-LD salen del mínimo y el máximo de `site.ts`; el build de Hostinger y los redirects con `:path*` quedan en las secciones operativas.
- 2026-10-03 · «Tu pedido incluye gratis» también se muestra en el panel fijo del celular. El compacto sigue omitiendo el aviso de que el mensaje no confirma. El pedido reserva `max-lg:mb-64` y el footer `pb-[28rem]`.
- 2026-10-03 · El panel fijo del celular usa tipo e interlineado más justos: papa en una línea de 13px, cremas a 11px, total en `text-2xl` y botón de 44px. Reserva `max-lg:mb-80` y el footer `pb-96`.
- 2026-10-09 · En celular, «Tu pedido» se pliega a una franja con el total y se vuelve a desplegar tocando esa misma fila. En escritorio el resumen sigue abierto a la derecha.
- 2026-10-09 · El plegado del celular lleva un botón visible: «Plegar» cuando está abierto y «Ver pedido» cuando está cerrado.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
