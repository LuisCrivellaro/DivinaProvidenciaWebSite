"use client";

import { useSyncExternalStore } from "react";

/* Relógio compartilhado: um único setInterval para todas as contagens da página. */
let now = 0;
let timer = 0;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = window.setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = 0;
    }
  };
}
const getSnapshot = () => now || (now = Date.now());

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Contagem regressiva até o início do evento (meia-noite do dia, horário de Rondonópolis).
 * No servidor e na hidratação usa `serverNow` (o mesmo número nos dois lados, sem mismatch);
 * depois passa a contar segundo a segundo. Cada dígito que muda entra com uma pequena virada.
 */
export function Countdown({ start, end, serverNow }: { start: string; end?: string; serverNow: number }) {
  const t = useSyncExternalStore(subscribe, getSnapshot, () => serverNow);
  const begin = Date.parse(`${start}T00:00:00-04:00`);
  const finish = Date.parse(`${end ?? start}T23:59:59-04:00`);

  if (t >= begin && t <= finish) {
    return (
      <p className="inline-flex items-center gap-3 rounded-full border border-gold-night/40 bg-gold-night/10 px-4 py-2 font-semibold text-gold-night">
        <span className="live-dot" aria-hidden="true" /> Acontecendo agora
      </p>
    );
  }
  if (t > finish) return null;

  const diff = Math.max(0, Math.floor((begin - t) / 1000));
  const units = [
    { label: "dias", value: Math.floor(diff / 86400), pad: false },
    { label: "horas", value: Math.floor((diff % 86400) / 3600), pad: true },
    { label: "min", value: Math.floor((diff % 3600) / 60), pad: true },
    { label: "seg", value: diff % 60, pad: true },
  ];

  return (
    <div role="timer" aria-live="off" aria-label={`Faltam ${units[0].value} dias`}>
      <p className="text-sm text-on-night-soft">Faltam</p>
      <ol className="mt-2 grid grid-cols-4 gap-2" aria-hidden="true">
        {units.map((u) => {
          const text = u.pad ? pad(u.value) : String(u.value);
          return (
            <li key={u.label} className="countdown-cell rounded-[var(--radius-md)] border border-white/12 bg-white/[0.06] px-2 py-3 text-center backdrop-blur-sm">
              <span className="block overflow-hidden font-display text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)] leading-none tabular text-on-night">
                {text.split("").map((d, i) => (
                  <span key={`${i}-${d}`} className="tick inline-block">
                    {d}
                  </span>
                ))}
              </span>
              <span className="mt-1.5 block text-[0.72rem] font-medium uppercase tracking-[0.18em] text-gold-night">{u.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
