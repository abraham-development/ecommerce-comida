interface WhatsAppOrderItem {
  quantity: number;
  unitPrice: number;
  itemSingular: string;
  itemPlural: string;
}

interface WhatsAppOrderInput {
  phone: string;
  items: readonly WhatsAppOrderItem[];
}

export function buildWhatsAppOrderUrl({ phone, items }: WhatsAppOrderInput): string {
  const safeItems = items
    .map((item) => ({ ...item, quantity: Math.max(0, Math.floor(item.quantity)) }))
    .filter((item) => item.quantity > 0);

  if (safeItems.length === 0) {
    throw new Error("El pedido de WhatsApp necesita al menos un producto.");
  }

  const orderLines = safeItems.map((item) => {
    const name = item.quantity === 1 ? item.itemSingular : item.itemPlural;
    const lineTotal = item.quantity * item.unitPrice;
    return `• ${item.quantity} ${name} — S/ ${item.unitPrice.toFixed(2)} c/u — S/ ${lineTotal.toFixed(2)}`;
  });
  const total = safeItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const message = [
    "Hola, Alicia 👋",
    "",
    "Quiero hacer este pedido:",
    ...orderLines,
    "",
    `Subtotal: S/ ${total.toFixed(2)}`,
    "Tu pedido incluye gratis crema huancaína, crema de ocopa y ají.",
    "Entrega en Lince.",
    "",
    "¿Me confirmas disponibilidad y costo de delivery, por favor?",
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
