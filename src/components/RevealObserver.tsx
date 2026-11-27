"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Intervalo entre itens que entram juntos na tela, e o atraso máximo acumulado. */
const STEP = 90;
const MAX = 540;
/** Depois disso revela mesmo que a hidratação ainda não tenha chegado ao elemento. */
const HYDRATION_WAIT = 4000;

const TARGETS = "[data-reveal]:not(.is-revealed), [data-reveal-stagger] > :not(.is-revealed)";

/**
 * O elemento já foi hidratado pelo React? Mexer em classes/estilos antes disso gera
 * "hydration mismatch" (o segmento da página hidrata depois do layout).
 */
function isHydrated(el: Element) {
  for (const key in el) if (key.startsWith("__reactFiber$")) return true;
  return false;
}

/**
 * Motor único das animações de entrada ao rolar.
 *  - [data-reveal]          → o elemento aparece ao entrar na tela (variações em globals.css)
 *  - [data-reveal-stagger]  → os filhos diretos aparecem em cascata (a variação vem do valor do atributo)
 * O estado escondido vem só do CSS; este componente apenas acrescenta .is-revealed (e o atraso)
 * quando o elemento entra na tela, depois de hidratado.
 * A cascata é calculada por lote: só os itens que entram juntos esperam uns pelos outros,
 * em ordem de leitura. Revela uma vez só. Sem JS ou com prefers-reduced-motion a classe
 * .js-reveal nem é aplicada (ver src/lib/reveal.ts), e tudo fica visível desde o início.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.revealReady = "1";
    if (!root.classList.contains("js-reveal")) return;

    const started = performance.now();
    const pending = new Set<HTMLElement>();
    let retry = 0;

    const flush = () => {
      retry = 0;
      const force = performance.now() - started > HYDRATION_WAIT;
      const ready = [...pending]
        .filter((el) => force || isHydrated(el))
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left);
      let k = 0;
      for (const { el } of ready) {
        pending.delete(el);
        let delay = parseInt(el.style.getPropertyValue("--reveal-delay")) || 0;
        if (el.parentElement?.hasAttribute("data-reveal-stagger")) {
          delay = Math.min(k++ * STEP, MAX);
          el.style.setProperty("--reveal-delay", `${delay}ms`);
        }
        el.classList.add("is-revealed");
        // Terminada a entrada, devolve as transições normais (hover dos cartões, zoom das fotos)
        window.setTimeout(() => el.classList.add("reveal-done"), delay + 1700);
      }
      if (pending.size) retry = window.setTimeout(flush, 100);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          pending.add(e.target as HTMLElement);
        }
        if (!retry) flush();
      },
      // threshold 0: blocos muito altos (grade da galeria) também precisam revelar
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const prepare = () => document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => io.observe(el));
    prepare();

    // Conteúdo que chega depois (Suspense, filtros da galeria, paginação), no máximo uma vez por quadro
    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        prepare();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(retry);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
