"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

/** Carrega o player do YouTube só depois do clique (privacidade e desempenho). */
export function VideoFacade({ id, title, className = "", priority }: { id: string; title: string; className?: string; priority?: boolean }) {
  const [active, setActive] = useState(false);
  return (
    <div className={`relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-night ${className}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full text-left">
          <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" preload={priority} className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" aria-hidden="true" />
          <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
            <span className="font-display text-[1.25rem] leading-tight text-on-night sm:text-[1.6rem]">{title}</span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-wine text-white transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
              <Play size={22} fill="currentColor" />
            </span>
          </span>
          <span className="sr-only">Assistir ao vídeo: {title}</span>
        </button>
      )}
    </div>
  );
}
