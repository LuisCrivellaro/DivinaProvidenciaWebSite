"use client";

import { useEffect, useRef } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Número que conta de 0 até o valor quando entra na tela.
 * O HTML do servidor já traz o valor final (sem JS ou com redução de movimento, é o que fica);
 * a contagem mexe só no texto do nó, depois da hidratação.
 */
export function CountUp({ value, prefix = "", suffix = "", duration = 1800, className = "" }: { value: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !("IntersectionObserver" in window)) return;
    const fmt = (n: number) => `${prefix}${Math.round(n).toLocaleString("pt-BR")}${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4); // ease-out-quart
          el.textContent = fmt(value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    // Zera e espera entrar na tela; se já estiver visível, a contagem começa no próximo quadro
    el.textContent = fmt(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {value.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

/**
 * Efeitos que seguem o ponteiro, por delegação (um único listener para o site todo):
 *  - [data-tilt], .lift → o cartão inclina em 3D na direção do cursor e ganha um foco de luz dourada
 *  - [data-magnetic]  → o botão é atraído alguns pixels na direção do cursor
 * Só em mouse/trackpad (pointer: fine) e sem prefers-reduced-motion.
 */
export function PointerFX() {
  useEffect(() => {
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    let active: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const reset = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
      el.style.removeProperty("--tx");
      el.style.removeProperty("--ty");
      el.removeAttribute("data-pointer");
    };

    const apply = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const tilt = target?.closest<HTMLElement>("[data-tilt], .lift") ?? null;
      if (tilt !== active) {
        reset(active);
        active = tilt;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        // Cartões grandes inclinam menos
        const max = (Number(tilt.dataset.tilt) || 6) * Math.min(1, 480 / r.width);
        tilt.dataset.pointer = "on";
        tilt.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        tilt.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        tilt.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`);
      }

      const mag = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (mag !== magnet) {
        reset(magnet);
        magnet = mag;
      }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mag.dataset.pointer = "on";
        mag.style.setProperty("--tx", `${(dx * 0.22).toFixed(1)}px`);
        mag.style.setProperty("--ty", `${(dy * 0.3).toFixed(1)}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      reset(active);
      reset(magnet);
      active = magnet = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, []);

  return null;
}
