import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { revealBootScript } from "@/lib/reveal";
import { site } from "@/content/site";
import "./globals.css";

// Fontshare (ITF Free Font License, auto-hospedagem permitida) — ver src/app/fonts/LICENSE-FONTSHARE-ITF-FFL.txt
const gambetta = localFont({
  src: [
    { path: "./fonts/Gambetta-Variable.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/Gambetta-VariableItalic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-gambetta",
  display: "swap",
});

const switzer = localFont({
  src: [{ path: "./fonts/Switzer-Variable.woff2", style: "normal", weight: "100 900" }],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Rondonópolis (MT)`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: `${site.name} · Rondonópolis (MT)`,
    description: site.description,
    images: [{ url: "https://adivinaprovidencia.com.br/wp-content/uploads/2026/07/DLS0930.jpg", width: 1920, height: 1280, alt: "Acampantes do 25º Acampamento Sênior" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.legalName,
  url: site.url,
  logo: `${site.url}/wp-content/uploads/2022/07/logo-divina-h.png`,
  slogan: site.motto,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Padre Anchieta, s/n, Vila Goulart",
    addressLocality: "Rondonópolis",
    addressRegion: "MT",
    postalCode: "78745-400",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.instagram.com/adivinaprovidencia/",
    "https://www.facebook.com/adivinaprovidencia",
    "https://www.youtube.com/@ComunidadeDivinaProvid%C3%AAncia",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${gambetta.variable} ${switzer.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Liga as animações de entrada antes da primeira pintura (ver src/lib/reveal.ts) */}
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-paper transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
