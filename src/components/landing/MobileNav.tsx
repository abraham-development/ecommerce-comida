"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["#inicio", "Inicio"],
  ["#la-papa", "La papa"],
  ["#historia", "Nuestra historia"],
  ["#como-pedir", "Cómo pedir"],
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#2d2118] transition hover:bg-[#f4e7d2] lg:hidden"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Navegación móvil"
          className="fixed inset-x-0 top-[124px] z-[70] border-b border-[#eadcc8] bg-[#fff8eb] px-4 py-3 shadow-[0_18px_40px_rgba(75,48,28,.12)] sm:top-[120px] lg:hidden"
        >
          <ul className="grid gap-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-3 text-base font-bold text-[#684f3c] transition hover:bg-[#f4e7d2] hover:text-[#b83a2d]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
