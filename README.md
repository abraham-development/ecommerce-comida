# Alicia · Comida en casa

Landing page de una sola especialidad: papa rellena criolla preparada por Alicia. No utiliza base de datos, autenticación ni carrito; el pedido se coordina directamente por WhatsApp.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación queda disponible en [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.example` a `.env.local` y configura:

- `WHATSAPP_NUMBER`: número con código de país, solo dígitos. Para Perú: `51` más nueve dígitos.
- `SITE_URL`: URL pública del sitio para metadatos Open Graph.

El número no se imprime en la interfaz. Solo se incorpora en el enlace que abre WhatsApp con el pedido preparado.

## Verificación

```bash
npm run lint
npm run build
npm run start
```

## Alcance actual

- Dos variedades: tradicional a S/ 15 y lomo saltado a S/ 17.
- Cada pedido incluye crema huancaína, crema de ocopa y ají.
- Cantidad independiente de 0 a 20 unidades por variedad y subtotal combinado automático.
- Entrega inicial en Lince; disponibilidad y delivery se confirman por WhatsApp.
- Foto local en `recursos_imagenes/papa_rellena.jpeg`.
- Sin Supabase, InsForge, APIs propias ni persistencia.
