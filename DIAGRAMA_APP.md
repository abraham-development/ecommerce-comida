# Arquitectura de Alicia · Comida en casa

```mermaid
flowchart LR
  V[Visitante] --> L[Landing page estática]
  I[Foto local] --> L
  E[WHATSAPP_NUMBER] --> L
  L --> Q[Selector de cantidad]
  Q --> M[Mensaje con cantidad y subtotal]
  M --> W[WhatsApp]
  W --> A[Alicia confirma disponibilidad y delivery]
```

La aplicación no usa base de datos, autenticación, carrito persistente ni rutas API. Next.js renderiza la landing y el navegador solo mantiene la cantidad elegida durante la visita.
