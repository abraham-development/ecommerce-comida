import Image from "next/image";
import {
  ArrowDown,
  Check,
  ChefHat,
  Clock3,
  Heart,
  MapPin,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import heroImage from "../../recursos_imagenes/papa_rellena.jpeg";
import WhatsAppIcon from "@/components/landing/WhatsAppIcon";
import WhatsAppOrder from "@/components/landing/WhatsAppOrder";
import { siteConfig } from "@/lib/site";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

function getWhatsAppNumber(): string {
  const phone = process.env.WHATSAPP_NUMBER?.replace(/\D/g, "");

  if (!phone || !/^51\d{9}$/.test(phone)) {
    throw new Error(
      "WHATSAPP_NUMBER debe incluir el código de país y nueve dígitos, por ejemplo 51999999999."
    );
  }

  return phone;
}

export default function HomePage() {
  const phone = getWhatsAppNumber();
  const defaultOption = siteConfig.product.options[0];
  const directOrderUrl = buildWhatsAppOrderUrl({
    phone,
    items: [
      {
        quantity: 1,
        unitPrice: defaultOption.price,
        itemSingular: defaultOption.singular,
        itemPlural: defaultOption.plural,
      },
    ],
  });

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.product.name,
    description:
      "Papa rellena criolla preparada en casa por Alicia, con carne sazonada, cebolla, huevo y aceituna.",
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 15,
      highPrice: 17,
      priceCurrency: "PEN",
      offerCount: 2,
      areaServed: "Lince, Lima, Perú",
    },
  };

  return (
    <main className="overflow-hidden pt-[172px] sm:pt-[168px] lg:pt-[120px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="fixed inset-x-0 top-0 z-[60] shadow-[0_8px_30px_rgba(72,46,27,.1)]">
        <div className="flex h-11 items-center justify-center border-b border-[#ddcdb5] bg-[#3f5b3b] px-4 text-center text-xs font-bold tracking-[0.12em] text-white uppercase sm:h-10 sm:text-sm">
          Delivery en Lince · Disponibilidad y costo a coordinar
        </div>

        <header className="border-b border-[#eadcc8]/90 bg-[#fff8eb]/96 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <a href="#inicio" className="group flex items-center gap-3" aria-label="Ir al inicio">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#b83a2d] text-white shadow-[0_8px_24px_rgba(184,58,45,.22)] transition group-hover:-rotate-6">
                <ChefHat className="h-6 w-6" />
              </span>
              <span>
                <strong className="font-display block text-xl leading-none text-[#2d2118]">Alicia</strong>
                <span className="mt-1 block text-[10px] font-extrabold tracking-[0.18em] text-[#7d6651] uppercase">
                  Comida en casa
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-7 text-sm font-bold text-[#684f3c] lg:flex" aria-label="Navegación principal">
              <a href="#inicio" className="transition hover:text-[#b83a2d]">Inicio</a>
              <a href="#la-papa" className="transition hover:text-[#b83a2d]">La papa</a>
              <a href="#historia" className="transition hover:text-[#b83a2d]">Nuestra historia</a>
              <a href="#como-pedir" className="transition hover:text-[#b83a2d]">Cómo pedir</a>
            </nav>

            <a
              href={directOrderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-black text-[#102b19] shadow-[0_8px_24px_rgba(37,211,102,.2)] transition hover:-translate-y-0.5 hover:bg-[#21c15d] sm:px-5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Pedir por WhatsApp</span>
              <span className="sm:hidden">Pedir</span>
            </a>
          </div>

          <nav className="flex h-12 items-center justify-between gap-2 border-t border-[#eadcc8]/75 px-4 text-xs font-black tracking-wide text-[#684f3c] sm:justify-center sm:gap-8 sm:text-sm lg:hidden" aria-label="Navegación móvil">
            <a href="#inicio" className="transition hover:text-[#b83a2d]">Inicio</a>
            <a href="#la-papa" className="transition hover:text-[#b83a2d]">La papa</a>
            <a href="#historia" className="transition hover:text-[#b83a2d]">Nuestra historia</a>
            <a href="#como-pedir" className="transition hover:text-[#b83a2d]">Cómo pedir</a>
          </nav>
        </header>
      </div>

      <section id="inicio" className="paper-texture relative scroll-mt-44 lg:scroll-mt-32">
        <div className="pointer-events-none absolute -top-32 -right-28 h-96 w-96 rounded-full bg-[#e6a63a]/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-40 h-80 w-80 rounded-full bg-[#b83a2d]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e4cfad] bg-white/75 px-4 py-2 text-xs font-black tracking-[0.14em] text-[#8d3b2e] uppercase shadow-sm">
              <Sparkles className="h-4 w-4 text-[#d88a22]" /> Hecha en casa, en Lince
            </span>

            <h1 className="font-display mt-7 max-w-3xl text-[clamp(2.65rem,12vw,3rem)] leading-[0.98] font-black tracking-[-0.045em] text-[#2d2118] sm:text-6xl lg:text-7xl">
              La papa rellena de Alicia:
              <span className="mt-2 block text-[#b83a2d]">doradita por fuera, criolla por dentro.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#725b47] sm:mt-7 sm:text-xl sm:leading-8">
              Papa suave y dorada con un relleno casero de carne sazonada, cebolla, huevo y aceituna. Servida con salsa criolla para completar el antojo.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5 text-xs font-extrabold text-[#4d3a2c] sm:gap-3 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2.5 shadow-sm sm:px-4"><Check className="h-4 w-4 text-[#3f5b3b]" /> Preparada por Alicia</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2.5 shadow-sm sm:px-4"><MapPin className="h-4 w-4 text-[#b83a2d]" /> Delivery en Lince</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2.5 shadow-sm sm:px-4"><Heart className="h-4 w-4 text-[#b83a2d]" /> Sabor casero</span>
            </div>

            <div className="mt-9">
              <WhatsAppOrder
                phone={phone}
                options={siteConfig.product.options}
                maxQuantity={siteConfig.product.maxQuantity}
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-4 rotate-2 rounded-[2.75rem] bg-[#e6a63a]" aria-hidden="true" />
            <figure className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-[#ead8bd] shadow-[0_28px_80px_rgba(65,39,22,.25)] sm:rounded-[2.5rem] sm:border-8">
              <Image
                src={heroImage}
                alt="Papa rellena dorada servida con salsa criolla"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/6]"
              />
              <figcaption className="absolute right-4 bottom-4 left-4 rounded-2xl bg-[#2d2118]/88 px-4 py-3 text-center text-xs font-bold tracking-wide text-white backdrop-blur">
                Nuestra protagonista: papa rellena con salsa criolla
              </figcaption>
            </figure>
            <div className="absolute -right-2 -bottom-4 grid h-24 w-24 rotate-6 place-items-center rounded-full border-4 border-[#fff8eb] bg-[#b83a2d] text-center text-white shadow-xl sm:-right-8 sm:-bottom-5 sm:h-32 sm:w-32">
              <span><small className="font-bold">Desde</small><strong className="font-display block text-2xl sm:text-3xl">S/ 15</strong></span>
            </div>
          </div>
        </div>

        <a href="#la-papa" aria-label="Conocer más" className="mx-auto mb-10 hidden h-11 w-11 animate-bounce place-items-center rounded-full border border-[#d8c5a9] text-[#8d3b2e] md:grid">
          <ArrowDown className="h-5 w-5" />
        </a>
      </section>

      <section id="la-papa" className="scroll-mt-44 bg-[#2d2118] text-white lg:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black tracking-[0.18em] text-[#efb24f] uppercase">Qué vas a saborear</p>
              <h2 className="font-display mt-4 text-3xl leading-tight font-black sm:text-5xl">Un antojo completo en cada bocado.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#e8d8c2]">
              Una cubierta de papa tierna con acabado dorado y un corazón criollo bien sazonado. La cebolla fresca y el limón de la salsa criolla aportan el contraste que hace imposible dejarla a medias.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Papa dorada", "Suave por dentro, con una superficie apetecible y bien dorada."],
              ["02", "Relleno criollo", "Carne sazonada con cebolla y los sabores reconocibles de nuestra mesa."],
              ["03", "El toque clásico", "Huevo y aceituna para completar el relleno tradicional."],
              ["04", "Salsa criolla", "Cebolla, limón y ají para aportar frescura y carácter."],
            ].map(([number, title, description]) => (
              <article key={number} className="rounded-3xl border border-white/12 bg-white/[.055] p-6 transition hover:-translate-y-1 hover:bg-white/[.08]">
                <span className="font-display text-3xl font-black text-[#efb24f]">{number}</span>
                <h3 className="mt-8 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#cfbea8]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="historia" className="scroll-mt-44 bg-[#f4e7d2] lg:scroll-mt-32">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:gap-8 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <article className="rounded-[1.75rem] bg-[#fffaf1] p-6 shadow-[0_18px_55px_rgba(75,48,28,.08)] sm:rounded-[2.25rem] sm:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e6a63a]/20 text-[#9a5616]"><UtensilsCrossed className="h-7 w-7" /></span>
            <p className="mt-8 text-sm font-black tracking-[0.16em] text-[#b83a2d] uppercase">Un clásico criollo</p>
            <h2 className="font-display mt-3 text-3xl font-black text-[#2d2118] sm:text-4xl">Una historia de encuentro y sabor.</h2>
            <p className="mt-5 leading-8 text-[#725b47]">
              La papa rellena es una de esas preparaciones que resumen el mestizaje culinario del Perú: nuestra papa envuelve un guiso de carne y se transforma en un plato generoso, cotidiano y profundamente criollo.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#8a705a]">
              En el Perú suele disfrutarse como entrada o plato principal, acompañada de ají y una buena salsa criolla.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[1.75rem] bg-[#b83a2d] p-6 text-white sm:rounded-[2.25rem] sm:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[34px] border-white/10" aria-hidden="true" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15"><ChefHat className="h-7 w-7" /></span>
            <p className="mt-8 text-sm font-black tracking-[0.16em] text-[#ffda9d] uppercase">Alicia, detrás del sabor</p>
            <h2 className="font-display mt-3 max-w-md text-3xl font-black sm:text-4xl">Comida hecha en casa, de verdad.</h2>
            <p className="mt-5 max-w-lg leading-8 text-[#ffe9dd]">
              Alicia prepara cada pedido con el cuidado de una comida para la familia. Hoy comienza con una sola especialidad: una papa rellena sabrosa, honesta y lista para compartir.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 font-black text-[#8d2d23]">
              <Heart className="h-5 w-5 fill-current" /> Preparada por Alicia
            </div>
          </article>
        </div>
      </section>

      <section id="como-pedir" className="scroll-mt-44 bg-[#fffaf1] lg:scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black tracking-[0.18em] text-[#b83a2d] uppercase">Así de sencillo</p>
            <h2 className="font-display mt-4 text-3xl font-black text-[#2d2118] sm:text-5xl">Del antojo al pedido en tres pasos.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["1", Clock3, "Arma tu combinación", "Indica por separado cuántas papas tradicionales y de lomo saltado quieres."],
              ["2", WhatsAppIcon, "Escríbenos por WhatsApp", "Abriremos un mensaje listo para que solo tengas que enviarlo."],
              ["3", MapPin, "Coordinamos en Lince", "Alicia confirmará disponibilidad, dirección y costo de delivery."],
            ].map(([number, Icon, title, description]) => {
              const StepIcon = Icon as typeof Clock3;
              return (
                <article key={String(number)} className="relative rounded-3xl border border-[#ead9bf] bg-white p-7 shadow-sm">
                  <span className="absolute right-6 top-5 font-display text-5xl font-black text-[#eadbc5]">{String(number)}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#3f5b3b] text-white"><StepIcon className="h-6 w-6" /></span>
                  <h3 className="mt-7 text-xl font-black text-[#2d2118]">{String(title)}</h3>
                  <p className="mt-3 leading-7 text-[#725b47]">{String(description)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#3f5b3b] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-black tracking-[0.18em] text-[#ffd087] uppercase">Antes de pedir</p>
            <h2 className="font-display mt-4 text-3xl font-black sm:text-5xl">Todo claro, desde el primer mensaje.</h2>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {[
              ["¿Dónde entregan?", "Por ahora atendemos únicamente en el distrito de Lince. Más adelante ampliaremos la cobertura a otros distritos de Lima Metropolitana."],
              ["¿Cuánto cuesta?", "La papa rellena tradicional cuesta S/ 15 y la de lomo saltado S/ 17. Ambas incluyen crema huancaína, crema de ocopa y ají. El delivery se confirma por WhatsApp."],
              ["¿El pedido queda confirmado al escribir?", "No todavía. Alicia confirmará disponibilidad y los detalles de entrega directamente en la conversación."],
              ["¿Contiene alérgenos?", "La preparación contiene huevo. Si tienes alguna alergia o restricción alimentaria, consúltala antes de confirmar."],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black">
                  {question}<span className="text-2xl text-[#ffd087] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl pr-10 leading-7 text-[#dae5d7]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-texture px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] bg-[#e6a63a] px-5 py-10 text-center shadow-[0_24px_70px_rgba(104,64,24,.16)] sm:rounded-[2.5rem] sm:px-12 sm:py-16">
          <p className="text-sm font-black tracking-[0.18em] text-[#6d3c13] uppercase">¿Ya se te antojó?</p>
          <h2 className="font-display mx-auto mt-4 max-w-3xl text-3xl font-black text-[#2d2118] sm:text-6xl">Tu próxima papa rellena está a un mensaje.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#684514]">Escríbele a Alicia, confirma la disponibilidad y coordinemos tu entrega en Lince.</p>
          <a
            href={directOrderUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#25d366] px-8 text-lg font-black text-[#102b19] shadow-xl transition hover:-translate-y-1 hover:bg-[#21c15d]"
          >
            <WhatsAppIcon className="h-6 w-6" /> Pedir por WhatsApp
          </a>
        </div>
      </section>

      <footer className="border-t border-[#ddcdb5] bg-[#2d2118] px-4 pt-10 pb-24 text-white md:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <strong className="font-display text-2xl">Alicia</strong>
            <p className="mt-1 text-xs font-bold tracking-[0.15em] text-[#cbb9a5] uppercase">Comida en casa · Lince, Lima</p>
          </div>
          <p className="text-sm text-[#cbb9a5]">© {new Date().getFullYear()} · Hecho con cariño y sabor criollo.</p>
        </div>
      </footer>
    </main>
  );
}
