"use client";
// Mesmo visual do GalleryCard (server), para uso dentro do filtro client-side.
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import type { Gallery } from "@/lib/galleries";

const UPLOADS = "https://adivinaprovidencia.com.br/wp-content/uploads/";

export function GalleryCardClient({ g }: { g: Gallery }) {
  return (
    <Link href={`/galeria/${g.slug}`} className="group block">
      {g.restricted ? (
        <span className="flex aspect-[4/3] flex-col justify-between rounded-[var(--radius-md)] bg-night p-5 text-on-night">
          <Lock size={20} aria-hidden="true" className="text-gold-night" />
          <span className="font-display text-[1.2rem] italic leading-snug text-gold-night">{g.slug.includes("teatro") ? "Fotos de pessoas em tratamento ficam no acervo oficial." : "Fotos com crianças e adolescentes ficam no acervo oficial."}</span>
        </span>
      ) : (
        <span className="zoom-frame relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-linen">
          <Image src={`${UPLOADS}${g.cover}`} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" quality={60} className="object-cover" />
        </span>
      )}
      <h2 className="mt-3 font-display text-[1.25rem] leading-tight transition-colors group-hover:text-gold-deep">{g.title}</h2>
      <p className="mt-1 text-sm text-ink-soft tabular">
        {g.year} · {g.images.length} fotos
      </p>
    </Link>
  );
}
