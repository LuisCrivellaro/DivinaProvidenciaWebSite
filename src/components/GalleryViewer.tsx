"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const UPLOADS = "https://adivinaprovidencia.com.br/wp-content/uploads/";
const PAGE = 48;

/**
 * Grade de fotos com visualização ampliada.
 * - <dialog> nativo: foco preso, Esc fecha, fundo inerte.
 * - Setas do teclado, botões e gesto de arrastar (com alternativas por botão).
 * - A foto aberta fica na URL (?foto=N) para compartilhar.
 * - Carrega 48 miniaturas por vez.
 */
export function GalleryViewer({ images, title }: { images: string[]; title: string }) {
  const [shown, setShown] = useState(PAGE);
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = useCallback((i: number, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null;
    setIndex(i);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
  }, []);

  const go = useCallback((delta: number) => {
    setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));
  }, [images.length]);

  // Abre a foto indicada na URL ao carregar
  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("foto"));
    if (!(n >= 1 && n <= images.length)) return;
    const raf = requestAnimationFrame(() => {
      setShown((s) => Math.max(s, n));
      setIndex(n - 1);
    });
    return () => cancelAnimationFrame(raf);
  }, [images.length]);

  // Sincroniza diálogo e URL
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const url = new URL(window.location.href);
    if (index === null) {
      if (d.open) d.close();
      url.searchParams.delete("foto");
      triggerRef.current?.focus();
    } else {
      if (!d.open) d.showModal();
      url.searchParams.set("foto", String(index + 1));
    }
    window.history.replaceState(null, "", url);
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

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {images.slice(0, shown).map((src, i) => (
          <li key={src} className="[content-visibility:auto] [contain-intrinsic-size:auto_240px]">
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-sm)] bg-linen"
            >
              <Image
                src={`${UPLOADS}${src}`}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                quality={60}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="sr-only">
                Ampliar foto {i + 1} de {images.length}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown < images.length && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <button type="button" className="btn btn-ghost btn-plain" onClick={() => setShown((s) => Math.min(s + PAGE, images.length))}>
            Mostrar mais fotos
          </button>
          <p className="text-sm text-ink-soft tabular" aria-live="polite">
            {shown} de {images.length}
          </p>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`${title}: foto ${index !== null ? index + 1 : ""} de ${images.length}`}
        onClose={close}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none overscroll-contain bg-night/96 p-0 text-on-night backdrop:bg-night/80"
      >
        {index !== null && (
          <div
            className="relative flex h-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="min-w-0 truncate text-sm text-on-night-soft">
                <span className="text-on-night">{title}</span> · <span className="tabular">{index + 1} / {images.length}</span>
              </p>
              <button type="button" onClick={close} className="grid h-12 w-12 shrink-0 place-items-center rounded-full hover:bg-white/10" aria-label="Fechar">
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex-1">
              {/* indicador de carregamento (anel girando, inspirado nos loaders do Uiverse); a foto cobre ao carregar */}
              <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/20 border-t-gold-light" aria-hidden="true" />
              <Image key={images[index]} src={`${UPLOADS}${images[index]}`} alt={`${title}, foto ${index + 1}`} fill sizes="100vw" quality={85} loading="eager" className="object-contain" />
              {/* pré-carrega a próxima */}
              <link rel="prefetch" as="image" href={`${UPLOADS}${images[(index + 1) % images.length]}`} />
            </div>
            <div className="flex items-center justify-center gap-3 px-4 py-4">
              <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Foto anterior">
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/25 hover:bg-white/10" aria-label="Próxima foto">
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
