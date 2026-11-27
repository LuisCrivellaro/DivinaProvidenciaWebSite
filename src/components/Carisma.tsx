import { site } from "@/content/site";

/**
 * Momento tipográfico do site, numa faixa dourada com luz vinda do alto.
 * As palavras do carisma ganham tinta conforme a frase atravessa a tela (CSS scroll-driven).
 */
export function Carisma({ id = "carisma" }: { id?: string }) {
  const words = site.carisma.split(" ");
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="carisma-band relative isolate overflow-hidden py-28 text-ink md:py-40">
      <div className="wrap relative">
        <h2 id={`${id}-titulo`} className="flex items-center justify-center gap-4 font-sans text-base font-medium text-ink">
          <span className="h-px w-10 bg-ink/35" aria-hidden="true" />
          Nosso carisma
          <span className="h-px w-10 bg-ink/35" aria-hidden="true" />
        </h2>
        <blockquote className="mx-auto mt-8 max-w-[19ch] text-center font-display text-[clamp(2.3rem,1.2rem+4.6vw,5.4rem)] leading-[1.04] tracking-[-0.02em]">
          <p>
            {words.map((w, i) => (
              <span key={i} className="carisma-word">
                {w}{" "}
              </span>
            ))}
          </p>
        </blockquote>
        <p className="mx-auto mt-10 max-w-[52ch] text-center text-ink">
          Essa frase orienta o que a comunidade faz, dos acampamentos à Comunidade Terapêutica.
        </p>
      </div>
    </section>
  );
}
