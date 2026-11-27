"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight, Expand, Share2, X } from "lucide-react";

const UPLOADS = "https://adivinaprovidencia.com.br/wp-content/uploads/";

export type StripPhoto = {
  slug: string;
  title: string;
  cover: string;
  group: string;
  groupLabel: string;
  published: string; // AAAA-MM-DD
  count: number;
};

/** Contexto de cada tipo de galeria, a partir do que o próprio site já conta sobre a comunidade. */
const groupBlurb: Record<string, string> = {
  acampamentos: "Os acampamentos são o centro da evangelização da comunidade, com edições para crianças, adolescentes, jovens, adultos e casais.",
  oracao: "Missas, adoração e o Cerco de Jericó: os momentos em que a comunidade se reúne para rezar.",
  retiros: "Retiros e cursos de formação, como o Desperta, o Homens de Fé e o 5 Linguagens do Amor.",
  "divina-jovem": "O Divina Jovem reúne a juventude com pregações, louvor e shows.",
  festas: "Festas beneficentes, como a Festa das Nações e o Festival Divina Brasa, ajudam a manter as obras da comunidade.",
  jovens: "Encontros da juventude da comunidade.",
  obras: "As obras sociais nascidas da comunidade, como a Comunidade Terapêutica.",
};

const fmtDate = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Cuiaba" });
const published = (iso: string) => fmtDate.format(new Date(`${iso}T12:00:00-04:00`));

/**
 * Tira de fotos que corre sem parar (mesmo CSS do <Marquee>) e abre cada foto em tela cheia,
 * com uma ficha que explica de onde ela veio. A segunda cópia da tira, que só existe para o
 * laço não ter emenda, fica fora do leitor de tela e da ordem de tabulação.
 */
export function PhotoStrip({ photos, speed = 60 }: { photos: StripPhoto[]; speed?: number }) {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (delta: 1 | -1) => {
      setDir(delta);
      setCopied(false);
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
    },
    [photos.length],
  );
  const jump = (i: number) => {
    if (index === null || i === index) return;
    setDir(i > index ? 1 : -1);
    setCopied(false);
    setIndex(i);
  };

  // Abre/fecha o <dialog> nativo (foco preso, Esc, fundo inerte) e devolve o foco a quem abriu
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index === null) {
      if (d.open) d.close();
      triggerRef.current?.focus({ preventScroll: true });
    } else if (!d.open) {
      d.showModal();
    }
  }, [index]);

  // O trilho de miniaturas acompanha a foto aberta
  useEffect(() => {
    if (index === null) return;
    dialogRef.current?.querySelector('.lb-thumb[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const share = async (p: StripPhoto) => {
    const url = `${window.location.origin}/galeria/${p.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: p.title, text: `${p.title} · Comunidade Divina Providência`, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      }
    } catch {
      /* compartilhamento cancelado */
    }
  };

  const row = (clone: boolean) => (
    <ul className="marquee-row" aria-hidden={clone || undefined}>
      {photos.map((p, i) => (
        <li key={p.slug}>
          <button
            type="button"
            tabIndex={clone ? -1 : undefined}
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setDir(1);
              setCopied(false);
              setIndex(i);
            }}
            className="strip-photo group relative block h-32 w-48 overflow-hidden rounded-[var(--radius-md)] bg-white/5 sm:h-40 sm:w-60"
          >
            <Image src={`${UPLOADS}${p.cover}`} alt="" fill sizes="240px" quality={60} className="object-cover" />
            <span className="strip-veil absolute inset-0 flex flex-col whitespace-normal justify-end bg-gradient-to-t from-night/90 via-night/20 to-transparent p-3 text-left" aria-hidden="true">
              <span className="strip-zoom absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-gold text-ink">
                <Expand size={16} />
              </span>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-night">{p.groupLabel}</span>
              <span className="mt-0.5 line-clamp-2 font-display text-[1.05rem] leading-tight text-on-night">{p.title}</span>
            </span>
            {!clone && <span className="sr-only">Ampliar foto: {p.title}</span>}
          </button>
        </li>
      ))}
    </ul>
  );

  const p = index !== null ? photos[index] : null;

  return (
    <>
      <div className="marquee marquee-reverse photo-strip" style={{ ["--speed" as string]: `${speed}s`, ["--gap" as string]: "0.75rem" }}>
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={p ? `Foto: ${p.title}` : "Foto ampliada"}
        onClose={close}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        className="lightbox on-night m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-night/75 p-0 text-on-night backdrop:bg-night/85 backdrop:backdrop-blur-md"
      >
        {p && index !== null && (
          <div className="grid min-h-full grid-rows-[auto_minmax(55vh,1fr)_auto] lg:h-full lg:grid-cols-[1fr_24rem] lg:grid-rows-[auto_1fr_auto]">
            {/* topo */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:col-span-2">
              <p className="inline-flex items-center gap-2 text-sm text-on-night-soft">
                <Camera size={16} aria-hidden="true" className="text-gold-night" />
                <span className="tabular">
                  {index + 1} / {photos.length}
                </span>
                <span className="hidden sm:inline">· Momentos que ficaram</span>
              </p>
              <button type="button" onClick={close} className="lb-btn grid h-12 w-12 place-items-center rounded-full" aria-label="Fechar">
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* foto */}
            <div
              className="relative overflow-hidden"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/20 border-t-gold-light" aria-hidden="true" />
              <div key={p.slug} className="lb-photo absolute inset-3 sm:inset-6" data-dir={dir}>
                <Image src={`${UPLOADS}${p.cover}`} alt={`Foto de capa da galeria ${p.title}`} fill sizes="(min-width: 1024px) 70vw, 100vw" quality={85} loading="eager" className="object-contain drop-shadow-[0_30px_60px_rgb(0_0_0/0.6)]" />
              </div>
              <button type="button" onClick={() => go(-1)} className="lb-btn lb-nav absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 sm:left-6" aria-label="Foto anterior">
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className="lb-btn lb-nav absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 sm:right-6" aria-label="Próxima foto">
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>

            {/* ficha que explica a foto */}
            <aside key={`info-${p.slug}`} className="lb-info overflow-y-auto border-t border-white/10 px-5 py-6 sm:px-6 lg:row-span-2 lg:border-l lg:border-t-0 lg:py-8" aria-live="polite">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-[0.8rem] font-semibold text-ink">{p.groupLabel}</span>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,1.4rem+1.2vw,2.3rem)] leading-[1.05]">{p.title}</h2>
              <p className="mt-4 text-on-night-soft">{groupBlurb[p.group] ?? "Um dos momentos registrados pela comunidade."}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-white/12 py-5">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-on-night-soft">Fotos no álbum</dt>
                  <dd className="mt-1 font-display text-[1.9rem] leading-none text-gold-night tabular">{p.count.toLocaleString("pt-BR")}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-on-night-soft">Publicado em</dt>
                  <dd className="mt-1.5 leading-snug">{published(p.published)}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-on-night-soft">Esta é a foto de capa do álbum. As outras estão na galeria completa.</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/galeria/${p.slug}`} className="btn" onClick={close}>
                  <span>Ver o álbum</span>
                  <span className="btn-icon" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
                <button type="button" onClick={() => share(p)} className="btn btn-ghost-light btn-plain">
                  <Share2 size={17} aria-hidden="true" />
                  {copied ? "Link copiado!" : "Compartilhar"}
                </button>
              </div>
            </aside>

            {/* trilho de miniaturas */}
            <ol className="lb-rail flex justify-center-safe gap-2 overflow-x-auto px-4 pb-4 pt-2 sm:px-6" aria-label="Outras fotos">
              {photos.map((t, i) => (
                <li key={t.slug} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === index || undefined}
                    aria-label={`Ver ${t.title}`}
                    className="lb-thumb relative block h-14 w-20 overflow-hidden rounded-[var(--radius-sm)] sm:h-16 sm:w-24"
                  >
                    <Image src={`${UPLOADS}${t.cover}`} alt="" fill sizes="96px" quality={60} className="object-cover" />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </dialog>
    </>
  );
}
