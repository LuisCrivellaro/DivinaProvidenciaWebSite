import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Lede, PageHeader, Photo, Section, SectionTitle } from "@/components/ui";
import { VideoFacade } from "@/components/VideoFacade";
import { bigEvents } from "@/content/programs";

export const metadata: Metadata = {
  title: "Obras e projetos",
  description: "Comunidade Terapêutica, Casa da Saúde São Padre Pio e os eventos beneficentes da Comunidade Divina Providência.",
  alternates: { canonical: "/obras-e-projetos" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Obras e projetos" }]}
        lead="Obras"
        accent="e projetos."
        intro="Além de evangelizar, a comunidade mantém obras de caridade em Rondonópolis. Elas são sustentadas por doações e por eventos que reúnem centenas de voluntários."
        photo="festaNacoes24"
      />

      <Section tone="sand" labelledBy="obras-lista">
        <h2 id="obras-lista" className="sr-only">Obras</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Link href="/casa-terapeutica" className="group lift flex flex-col justify-between rounded-[var(--radius-xl)] bg-gold p-8 text-ink md:p-12">
            <div>
              <h3 className="font-display text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none">Comunidade Terapêutica</h3>
              <p className="mt-5 max-w-[46ch] text-ink">
                Acolhe homens adultos em recuperação da dependência química. Foi construída com doações e com a renda de eventos beneficentes, e em 2020 contava com 30 vagas.
              </p>
            </div>
            <span className="mt-10 inline-flex items-center gap-2 font-medium">
              Conhecer a Casa Terapêutica <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <div className="flex flex-col rounded-[var(--radius-xl)] bg-paper p-8 md:p-12">
            <h3 className="font-display text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none">Casa da Saúde São Padre Pio</h3>
            <p className="mt-5 max-w-[46ch] text-ink-soft">Fundada pela comunidade e inaugurada em abril de 2026, em Rondonópolis. O vídeo da inauguração está no canal da comunidade.</p>
            <VideoFacade id="BIdZaTQ8AKI" title="Inauguração da Casa da Saúde São Padre Pio" className="mt-8" />
          </div>
        </div>
      </Section>

      <Section labelledBy="beneficentes">
        <SectionTitle id="beneficentes" lead="Eventos que" accent="sustentam as obras." />
        <Lede className="mt-6">
          Em 2015, a imprensa local contou que a comunidade começou com “carneiradas” e doações para juntar o dinheiro da obra. Hoje as grandes festas fazem esse papel.
        </Lede>
        <ul className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-stagger="">
          {bigEvents.filter((b) => b.slug === "festa-das-nacoes" || b.slug === "divina-brasa").map((b, i) => (
            <li key={b.slug} className="grid overflow-hidden rounded-[var(--radius-xl)] border border-ink/10">
              <Photo photo={b.photo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10]" />
              <div className="p-7 md:p-9">
                <h3 className="font-display text-[2rem] leading-none">{b.name}</h3>
                {b.text.map((t, k) => (
                  <p key={k} className="mt-4 text-ink-soft">{t}</p>
                ))}
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`/agenda#${b.slug}`} variant={i === 0 ? "primary" : "ghost"}>Próxima edição</ButtonLink>
                  {b.link && <ButtonLink href={b.link.href} variant="ghost" icon={false}>{b.link.label}</ButtonLink>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand" labelledBy="historico">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionTitle id="historico" lead="Outros projetos" accent="na história." />
          <div>
            <Lede>Reportagens de 2015 e 2020 citam outras iniciativas sociais da comunidade. Divina Saúde e Ler é Crescer seguiam ativos em novembro de 2026, segundo o Instagram da comunidade. A situação das demais ainda será confirmada.</Lede>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal-stagger="">
              {[
                { t: "Divina Saúde", d: "Citado em 2015 como “o ônibus que salva vidas”. Em novembro de 2026 levou médicos, fisioterapeutas, nutricionistas e voluntários para atender na sede, aos sábados." },
                { t: "Ler é Crescer", d: "Citado em 2020 e ainda ativo: em novembro de 2026 os encontros falaram da parábola do grão de mostarda." },
                { t: "Missões Populares", d: "Projeto citado em 2020." },
                { t: "Divina Horta", d: "Projeto citado em 2020." },
              ].map((x) => (
                <li key={x.t} className="rounded-[var(--radius-lg)] bg-paper p-6">
                  <h3 className="font-display text-[1.4rem]">{x.t}</h3>
                  <p className="mt-1 text-ink-soft">{x.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
