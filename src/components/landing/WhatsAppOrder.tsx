"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";

import WhatsAppIcon from "@/components/landing/WhatsAppIcon";
import type { ProductOption } from "@/lib/site";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

interface WhatsAppOrderProps {
  phone: string;
  options: readonly ProductOption[];
  creams: readonly string[];
  maxQuantity: number;
}

interface SelectedOption extends ProductOption {
  quantity: number;
}

function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

function formatList(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

export default function WhatsAppOrder({ phone, options, creams, maxQuantity }: WhatsAppOrderProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(options.map((option, index) => [option.id, index === 0 ? 1 : 0]))
  );

  function setOptionQuantity(optionId: string, quantity: number): void {
    setQuantities((current) => ({
      ...current,
      [optionId]: Math.min(maxQuantity, Math.max(0, quantity)),
    }));
  }

  const selected = options
    .map((option) => ({ ...option, quantity: quantities[option.id] ?? 0 }))
    .filter((option) => option.quantity > 0);
  const totalQuantity = selected.reduce((sum, option) => sum + option.quantity, 0);
  const total = selected.reduce((sum, option) => sum + option.quantity * option.price, 0);
  const hasItems = totalQuantity > 0;
  const orderUrl = hasItems
    ? buildWhatsAppOrderUrl({
        phone,
        items: selected.map((option) => ({
          quantity: option.quantity,
          unitPrice: option.price,
          itemSingular: option.singular,
          itemPlural: option.plural,
        })),
      })
    : "";

  return (
    <>
      <section id="pedido" aria-labelledby="pedido-title" className="scroll-mt-32 rounded-[1.5rem] border border-[#e4d2b8] bg-white/90 p-4 pb-4 shadow-[0_18px_55px_rgba(75,48,28,.1)] backdrop-blur sm:rounded-[2rem] sm:p-5">
        <div>
          <p id="pedido-title" className="text-sm font-black tracking-[0.12em] text-[#8d3b2e] uppercase">Arma tu pedido</p>
          <p className="font-display mt-1 text-2xl font-black text-[#2d2118]">Elige y mira tu cuenta</p>
          <p className="mt-2 text-sm leading-6 text-[#806953]">Marca el check para elegir una papa. A la derecha se arma lo que vas escogiendo.</p>
        </div>

        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
          <fieldset className="grid gap-3">
            <legend className="mb-1 text-xs font-extrabold tracking-[0.14em] text-[#8d3b2e] uppercase">Disponibles</legend>
            {options.map((option) => {
              const quantity = quantities[option.id] ?? 0;
              const isSelected = quantity > 0;

              return (
                <article
                  key={option.id}
                  className={`rounded-2xl border-2 p-3.5 transition ${isSelected ? "border-[#b83a2d] bg-[#fff4e7] shadow-sm" : "border-[#eadcc8] bg-white"}`}
                >
                  <div className="flex items-start gap-3">
                    <label className="mt-0.5 grid h-11 w-11 shrink-0 cursor-pointer place-items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(event) => setOptionQuantity(option.id, event.target.checked ? Math.max(1, quantity) : 0)}
                        aria-label={`Elegir ${option.name}`}
                        className="sr-only"
                      />
                      <span className={`grid h-7 w-7 place-items-center rounded-lg border-2 transition ${isSelected ? "border-[#b83a2d] bg-[#b83a2d] text-white" : "border-[#cdb99d] bg-white text-transparent"}`}>
                        <Check className="h-4 w-4" />
                      </span>
                    </label>
                    <div className="min-w-0 flex-1">
                      <strong className="block text-sm leading-5 text-[#3c2b20]">{option.name}</strong>
                      <span className="mt-1 block text-sm font-black text-[#b83a2d]">{formatSoles(option.price)} c/u</span>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-extrabold tracking-wide text-[#755e4b] uppercase">Cantidad</span>
                        <div className="inline-flex items-center rounded-full border border-[#d8c4a7] bg-[#fff8eb] p-1" role="group" aria-label={`Cantidad de ${option.plural}`}>
                          <button type="button" onClick={() => setOptionQuantity(option.id, quantity - 1)} disabled={quantity <= 1} aria-label={`Reducir cantidad de ${option.name}`} className="grid h-11 w-11 place-items-center rounded-full text-[#704c32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"><Minus className="h-4 w-4" /></button>
                          <output aria-live="polite" aria-label={`Cantidad actual de ${option.name}`} className="min-w-8 text-center text-lg font-black text-[#2d2118]">{quantity}</output>
                          <button type="button" onClick={() => setOptionQuantity(option.id, quantity + 1)} disabled={!isSelected || quantity === maxQuantity} aria-label={`Aumentar cantidad de ${option.name}`} className="grid h-11 w-11 place-items-center rounded-full text-[#704c32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"><Plus className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </fieldset>

          <OrderTicket
            className="hidden lg:block"
            selected={selected}
            creams={creams}
            totalQuantity={totalQuantity}
            total={total}
            hasItems={hasItems}
            orderUrl={orderUrl}
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e4d2b8] bg-[#fffaf1]/96 px-3 pt-3 shadow-[0_-16px_40px_rgba(75,48,28,.16)] backdrop-blur lg:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <OrderTicket
          selected={selected}
          creams={creams}
          totalQuantity={totalQuantity}
          total={total}
          hasItems={hasItems}
          orderUrl={orderUrl}
          compact
        />
      </div>
    </>
  );
}

function OrderTicket({
  selected,
  creams,
  totalQuantity,
  total,
  hasItems,
  orderUrl,
  compact = false,
  className = "",
}: {
  selected: readonly SelectedOption[];
  creams: readonly string[];
  totalQuantity: number;
  total: number;
  hasItems: boolean;
  orderUrl: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <aside aria-label="Tu pedido" className={`rounded-[1.25rem] bg-[#2d2118] p-4 text-[#fff8eb] ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-black tracking-[0.14em] text-[#efb24f] uppercase">Tu pedido</p>
        <span className="text-xs text-[#e8d8c2]">{totalQuantity} {totalQuantity === 1 ? "unidad" : "unidades"}</span>
      </div>

      {selected.length === 0 ? (
        <p className="mt-4 text-sm leading-6 text-[#e8d8c2]">Todavía no elegiste ninguna papa. Marca un check a la izquierda.</p>
      ) : (
        <ul className={`mt-3 divide-y divide-white/10 ${compact ? "max-h-24 overflow-y-auto" : ""}`}>
          {selected.map((option) => (
            <li key={option.id} className="flex items-start justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block text-sm leading-5 font-bold">{option.name}</span>
                <span className="mt-0.5 block text-xs text-[#e8d8c2]">{option.quantity} × {formatSoles(option.price)}</span>
              </span>
              <strong className="shrink-0 text-sm">{formatSoles(option.quantity * option.price)}</strong>
            </li>
          ))}
        </ul>
      )}

      {!compact && (
        <p className="mt-3 text-xs leading-5 text-[#e8d8c2]">
          <strong className="text-[#efb24f]">Tu pedido incluye gratis:</strong> {formatList(creams)}.
        </p>
      )}

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-dashed border-white/20 pt-3">
        <span className="text-sm text-[#e8d8c2]">Total</span>
        <strong className="font-display text-3xl text-white">{formatSoles(total)}</strong>
      </div>

      {hasItems ? (
        <a href={orderUrl} target="_blank" rel="noreferrer" className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-black text-[#102b19] transition hover:bg-[#21c15d]">
          <WhatsAppIcon className="h-5 w-5 shrink-0" /> Pedir por WhatsApp
        </a>
      ) : (
        <button type="button" disabled className="mt-4 flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-white/15 px-4 text-sm font-black text-[#e8d8c2]">
          Agrega al menos una papa rellena
        </button>
      )}

      {!compact && (
        <p className="mt-3 text-center text-[11px] leading-4 text-[#cbb9a5]">El mensaje no confirma el pedido. Alicia responde con disponibilidad y el costo de delivery en Lince.</p>
      )}
    </aside>
  );
}
