"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useState } from "react";

import WhatsAppIcon from "@/components/landing/WhatsAppIcon";
import type { ProductOption } from "@/lib/site";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

interface WhatsAppOrderProps {
  phone: string;
  options: readonly ProductOption[];
  maxQuantity: number;
}

export default function WhatsAppOrder({ phone, options, maxQuantity }: WhatsAppOrderProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(options.map((option, index) => [option.id, index === 0 ? 1 : 0]))
  );

  function setOptionQuantity(optionId: string, quantity: number): void {
    setQuantities((current) => ({
      ...current,
      [optionId]: Math.min(maxQuantity, Math.max(0, quantity)),
    }));
  }

  const orderItems = options
    .map((option) => ({
      quantity: quantities[option.id] ?? 0,
      unitPrice: option.price,
      itemSingular: option.singular,
      itemPlural: option.plural,
    }))
    .filter((item) => item.quantity > 0);
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const hasItems = totalQuantity > 0;
  const orderUrl = hasItems ? buildWhatsAppOrderUrl({ phone, items: orderItems }) : "";

  return (
    <>
      <section id="pedido" aria-labelledby="pedido-title" className="max-w-xl scroll-mt-44 rounded-[1.5rem] border border-[#e4d2b8] bg-white/90 p-4 shadow-[0_18px_55px_rgba(75,48,28,.1)] backdrop-blur sm:rounded-[2rem] sm:p-6 lg:scroll-mt-32">
        <div>
          <p id="pedido-title" className="text-sm font-black tracking-[0.12em] text-[#8d3b2e] uppercase">Arma tu pedido</p>
          <p className="font-display mt-1 text-2xl font-black text-[#2d2118]">Elige una o combina las dos</p>
          <p className="mt-2 text-sm leading-6 text-[#806953]">Indica por separado cuántas unidades quieres de cada variedad.</p>
        </div>

        <fieldset className="mt-5 grid gap-3">
          <legend className="sr-only">Variedades y cantidades de papas rellenas</legend>
          {options.map((option) => {
            const quantity = quantities[option.id] ?? 0;
            const isSelected = quantity > 0;

            return (
              <article
                key={option.id}
                className={`flex flex-col gap-4 rounded-2xl border-2 p-3.5 transition sm:flex-row sm:items-center sm:justify-between sm:p-4 ${isSelected ? "border-[#b83a2d] bg-[#fff4e7] shadow-sm" : "border-[#eadcc8] bg-white"}`}
              >
                <label className="flex min-w-0 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(event) => setOptionQuantity(option.id, event.target.checked ? Math.max(1, quantity) : 0)}
                    className="sr-only"
                  />
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 transition ${isSelected ? "border-[#b83a2d] bg-[#b83a2d] text-white" : "border-[#cdb99d] text-transparent"}`}>
                    <Check className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-sm leading-5 text-[#3c2b20] sm:text-base">{option.name}</strong>
                    <span className="mt-1 block font-black text-[#b83a2d]">S/ {option.price.toFixed(2)} c/u</span>
                  </span>
                </label>

                <div className="flex items-center justify-between gap-3 sm:block sm:text-center">
                  <span className="text-xs font-extrabold tracking-wide text-[#755e4b] uppercase sm:mb-2 sm:block">Cantidad</span>
                  <div className="inline-flex items-center rounded-full border border-[#d8c4a7] bg-[#fff8eb] p-1" role="group" aria-label={`Cantidad de ${option.plural}`}>
                    <button type="button" onClick={() => setOptionQuantity(option.id, quantity - 1)} disabled={quantity === 0} aria-label={`Reducir cantidad de ${option.name}`} className="grid h-11 w-11 place-items-center rounded-full text-[#704c32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 sm:h-10 sm:w-10"><Minus className="h-4 w-4" /></button>
                    <output aria-live="polite" aria-label={`Cantidad actual de ${option.name}`} className="min-w-10 text-center text-lg font-black text-[#2d2118]">{quantity}</output>
                    <button type="button" onClick={() => setOptionQuantity(option.id, quantity + 1)} disabled={quantity === maxQuantity} aria-label={`Aumentar cantidad de ${option.name}`} className="grid h-11 w-11 place-items-center rounded-full text-[#704c32] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 sm:h-10 sm:w-10"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            );
          })}
        </fieldset>

        <div className="mt-4 rounded-2xl bg-[#f4e7d2] px-4 py-3 text-sm leading-6 text-[#684f3c]">
          <strong className="text-[#3f5b3b]">Incluye sus cremas:</strong> huancaína, ocopa y ají.
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-dashed border-[#dec9ad] pt-5">
          <div>
            <span className="block text-sm font-bold text-[#806953]">Total del pedido</span>
            <span className="mt-1 block text-xs text-[#9a8069]">{totalQuantity} {totalQuantity === 1 ? "unidad" : "unidades"}</span>
          </div>
          <strong className="font-display text-3xl text-[#b83a2d]">S/ {total.toFixed(2)}</strong>
        </div>

        {hasItems ? (
          <a href={orderUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-4 text-base font-black whitespace-nowrap text-[#102b19] shadow-[0_12px_28px_rgba(37,211,102,.25)] transition hover:-translate-y-0.5 hover:bg-[#21c15d] sm:gap-3 sm:px-6 sm:text-lg">
            <WhatsAppIcon className="h-6 w-6 shrink-0" /> Pedir por WhatsApp
          </a>
        ) : (
          <button type="button" disabled className="mt-5 flex min-h-14 w-full cursor-not-allowed items-center justify-center rounded-full bg-[#d8d0c4] px-6 text-base font-black text-[#776d63]">
            Agrega al menos una papa rellena
          </button>
        )}
        <p className="mt-3 text-center text-xs leading-5 text-[#8a705a]">El mensaje no confirma el pedido. Alicia responderá con disponibilidad y costo de delivery en Lince.</p>
      </section>

      {hasItems && (
        <a href={orderUrl} target="_blank" rel="noreferrer" aria-label={`Pedir ${totalQuantity} ${totalQuantity === 1 ? "papa rellena" : "papas rellenas"} por WhatsApp`} className="fixed right-3 bottom-3 z-50 flex min-h-12 items-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-black whitespace-nowrap text-[#102b19] shadow-[0_14px_36px_rgba(16,43,25,.3)] transition hover:-translate-y-1 sm:right-4 sm:bottom-4 sm:min-h-14 sm:gap-3 sm:px-5 sm:text-base md:hidden">
          <WhatsAppIcon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" /> Pedir · S/ {total.toFixed(2)}
        </a>
      )}
    </>
  );
}
