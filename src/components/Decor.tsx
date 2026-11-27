import type { CSSProperties, ReactNode } from "react";

/* Elementos decorativos animados só com CSS (estilos em globals.css, seção "Movimento contínuo").
   Todos são aria-hidden e param com prefers-reduced-motion. */

/** Gerador determinístico: o mesmo HTML no servidor e no cliente, sem Math.random. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Brasas/luzes douradas que sobem devagar, como velas e fogueira de acampamento. */
export function Embers({ count = 22, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  const rnd = seeded(seed);
  const items = Array.from({ length: count }, (_, i) => {
    const dur = 9 + rnd() * 10;
    return {
      i,
      style: {
        "--x": `${(rnd() * 100).toFixed(2)}%`,
        "--size": `${(2 + rnd() * 5).toFixed(1)}px`,
        "--dur": `${dur.toFixed(1)}s`,
        "--delay": `${(-rnd() * dur).toFixed(1)}s`,
        "--drift": `${((rnd() - 0.5) * 120).toFixed(0)}px`,
        "--peak": (0.45 + rnd() * 0.55).toFixed(2),
      } as CSSProperties,
    };
  });
  return (
    <div className={`embers pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((it) => (
        <span key={it.i} style={it.style} />
      ))}
    </div>
  );
}

/** Faixa de palavras que corre sem parar (o conteúdo é duplicado para o laço não ter emenda). */
export function Marquee({ items, reverse = false, speed = 38, className = "", separator = "✦", gap }: { items: ReactNode[]; reverse?: boolean; speed?: number; className?: string; separator?: ReactNode; gap?: string }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          <div>{it}</div>
          {separator != null && (
            <span className="marquee-sep" aria-hidden="true">
              {separator}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""} ${className}`} style={{ ["--speed" as string]: `${speed}s`, ...(gap ? { ["--gap" as string]: gap } : {}) }}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Selo circular com texto que gira devagar. Quem usa define a posição (absolute/relative) no className. */
export function RotatingBadge({ text, children, className = "" }: { text: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`rotating-badge grid aspect-square place-items-center rounded-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="badge-ring absolute inset-0 h-full w-full">
        <defs>
          <path id="badge-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text className="fill-current text-[15.5px] font-semibold uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
