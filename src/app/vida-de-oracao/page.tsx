import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink, Lede, PageHeader, Photo, Section, SectionTitle } from "@/components/ui";
import { VideoFacade } from "@/components/VideoFacade";
import { events } from "@/content/events";
import { contacts, whatsappLink } from "@/content/site";
import { videos } from "@/content/videos";
import { dateRange } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Vida de oração",
  description: "Adoração Perpétua, Cerco de Jericó, grupos de oração e missas na Comunidade Divina Providência.",
  alternates: { canonical: "/vida-de-oracao" },
};

export default function Page() {
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  const cerco = events.find((e) => e.slug === "cerco-de-jerico-2027")!;
  const missa2 = events.find((e) => e.slug === "missa-2-anos-adoracao-2027")!;
  const cercoVideo = videos.find((v) => v.id === "y8p7SkCqwrQ")!;
  const homilia = videos.find((v) => v.id === "x7lF2L7ShWY")!;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Vida de oração" }]}
        lead="Vida"
        accent="de oração."
        intro="Adoração perpétua, Cerco de Jericó, grupos de oração e missas. Aqui estão as práticas de oração da comunidade e as datas já confirmadas."
        photo="cercoAltar"
      />

      <section id="adoracao" aria-labelledby="adoracao-titulo" className="on-night bg-night py-24 text-on-night md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Photo photo="capela" sizes="(min-width: 1024px) 40vw, 100vw" className="arch aspect-[4/5]" />
          <div>
            <SectionTitle id="adoracao-titulo" tone="dark" lead="Adoração" accent="perpétua." />
            <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-on-night-soft">
              <p>Desde 2025 a comunidade mantém a adoração perpétua ao Santíssimo Sacramento. Em 2026 celebrou a missa de um ano, e a missa de dois anos está marcada para {dateRange(missa2.start)}.</p>
              <p>Para saber onde acontece a adoração, quais horários estão livres e como se tornar adorador, fale com a Secretaria de Evangelização.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, "Olá! Gostaria de participar da Adoração Perpétua.")} variant="light">
                Quero ser adorador
              </ButtonLink>
            </div>
            <VideoFacade id={homilia.id} title={homilia.title} className="mt-10" />
          </div>
        </div>
      </section>

      <Section id="cerco-de-jerico" labelledBy="cerco-titulo">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionTitle id="cerco-titulo" lead="Cerco" accent="de Jericó." />
            <Lede className="mt-6">
              Sete dias de oração, todo mês de agosto, que terminam com a Queda das Muralhas. Cada dia ganha vídeo no canal da comunidade no YouTube. Em 2027 o Cerco acontece de {dateRange(cerco.start, cerco.end)}.
            </Lede>
            <VideoFacade id={cercoVideo.id} title={cercoVideo.title} className="mt-10" />
          </div>
          <Photo photo="cercoPalco" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[var(--radius-lg)]" />
        </div>
      </Section>

      <Section tone="sand" labelledBy="programacao">
        <SectionTitle id="programacao" lead="Programação" accent="confirmada." />
        <ul className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
          {[
            { when: "Segunda-feira, 19h30", what: "Grupos de oração", where: "Sede", note: "Horário do site atual da comunidade. Confirme antes da primeira visita.", href: "/grupos-de-oracao" },
            { when: "Contínua", what: "Adoração Perpétua", where: "Informações com a secretaria", note: "Desde 2025.", href: "#adoracao" },
            { when: dateRange(cerco.start, cerco.end), what: "Cerco de Jericó", where: "A confirmar", note: "Calendário oficial de 2027.", href: `/agenda/${cerco.slug}` },
            { when: dateRange(missa2.start), what: "Missa de 2 anos da Adoração Perpétua", where: "A confirmar", note: "Calendário oficial de 2027.", href: `/agenda/${missa2.slug}` },
          ].map((r) => (
            <li key={r.what} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr_14rem] md:gap-8">
              <span className="font-display text-[1.35rem] leading-tight">{r.when}</span>
              <span>
                <Link href={r.href} className="link-draw font-medium">{r.what}</Link>
                <span className="mt-1 block text-ink-soft">{r.note}</span>
              </span>
              <span className="text-ink-soft">{r.where}</span>
            </li>
          ))}
        </ul>
        <Lede className="mt-8">Horários regulares de missa na sede não estão publicados. Quando a comunidade divulgar, eles entram aqui.</Lede>
      </Section>
    </>
  );
}
