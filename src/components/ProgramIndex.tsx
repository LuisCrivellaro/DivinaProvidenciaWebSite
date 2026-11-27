import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "./ui";
import { events } from "@/content/events";
import type { Program } from "@/content/programs";
import { dateRange } from "@/lib/dates";

/** Lista editorial de programas, alternando foto e texto (composição inspirada no Fosters). */
export function ProgramIndex({ items, base }: { items: Program[]; base: string }) {
  return (
    <ul className="space-y-6" data-reveal-stagger="">
      {items.map((p, i) => {
        const ev = events.find((e) => e.slug === p.nextEventSlug);
        const reversed = i % 2 === 1;
        return (
          <li key={p.slug}>
            <Link href={`${base}/${p.slug}`} className="group lift grid overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-paper md:grid-cols-2">
              <div className={`relative min-h-[16rem] ${reversed ? "md:order-2" : ""}`}>
                {p.photo ? (
                  <Photo photo={p.photo} sizes="(min-width: 768px) 50vw, 100vw" className="zoom-frame !absolute inset-0" />
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between bg-night p-8 text-on-night">
                    {p.brandMark ? (
                      <span className="inline-block w-fit rounded-[var(--radius-md)] bg-paper p-3">
                        <Image src={p.brandMark} alt="" width={600} height={300} className="h-14 w-auto object-contain" />
                      </span>
                    ) : (
                      <span className="h-px w-16 bg-gold" aria-hidden="true" />
                    )}
                    <span className="font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] italic leading-tight text-gold-night">{p.audience}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <h2 className="font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)] leading-none transition-colors group-hover:text-gold-deep">{p.name}</h2>
                <p className="mt-4 max-w-[44ch] text-[1.08rem] text-ink-soft">{p.short}</p>
                <dl className="mt-8 grid gap-4 border-t border-ink/12 pt-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm text-ink-soft">Para quem</dt>
                    <dd className="mt-0.5 font-medium">{p.audience}</dd>
                  </div>
                  {ev && (
                    <div>
                      <dt className="text-sm text-ink-soft">Próxima data</dt>
                      <dd className="mt-0.5 font-medium">{dateRange(ev.start, ev.end)}</dd>
                    </div>
                  )}
                </dl>
                <span className="mt-8 inline-flex items-center gap-2 font-medium text-gold-deep">
                  {p.registration ? "Ver inscrições" : "Saiba mais"} <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
