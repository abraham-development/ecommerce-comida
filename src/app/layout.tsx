import type { Metadata, Viewport } from "next";

import heroImage from "../../recursos_imagenes/papa_rellena.jpeg";
import "./globals.css";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Papa rellena en Lince | Alicia · Comida en casa",
  description:
    "Papa rellena criolla preparada en casa por Alicia. Pide por WhatsApp y coordina tu delivery en Lince.",
  keywords: [
    "papa rellena",
    "papa rellena Lince",
    "comida criolla",
    "comida casera",
    "delivery Lince",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "Alicia · Comida en casa",
    title: "La papa rellena de Alicia",
    description: "Doradita por fuera, criolla por dentro. Pídela por WhatsApp en Lince.",
    images: [
      {
        url: heroImage.src,
        width: heroImage.width,
        height: heroImage.height,
        alt: "Papa rellena dorada con salsa criolla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La papa rellena de Alicia",
    description: "Comida criolla hecha en casa, con delivery coordinado en Lince.",
    images: [heroImage.src],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff8eb",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
