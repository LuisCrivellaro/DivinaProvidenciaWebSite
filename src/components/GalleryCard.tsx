import Link from "next/link";
import { Lock } from "lucide-react";
import { Photo } from "./ui";
import type { Gallery } from "@/lib/galleries";

/** Cartão de galeria. Uma galeria marcada como restrita (restricted: true) não exibe a capa. */
export function GalleryCard({ g, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw", headingLevel = "h3" }: { g: Gallery; sizes?: string; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Link href={`/galeria/${g.slug}`} className="group block">
      {g.restricted ? (
        <span className="flex aspect-[4/3] flex-col justify-between rounded-[var(--radius-md)] bg-night p-5 text-on-night">
          <Lock size={20} aria-hidden="true" className="text-gold-night" />
          <span className="font-display text-[1.25rem] italic leading-snug text-gold-night">Fotos disponíveis sob pedido à secretaria.</span>
        </span>
      ) : (
        <Photo src={g.cover} alt="" sizes={sizes} className="zoom-frame aspect-[4/3] rounded-[var(--radius-md)]" />
      )}
      <H className="mt-3 font-display text-[1.25rem] leading-tight transition-colors group-hover:text-gold-deep">{g.title}</H>
      <p className="mt-1 text-sm text-ink-soft tabular">
        {g.year} · {g.images.length} fotos
      </p>
    </Link>
  );
}
