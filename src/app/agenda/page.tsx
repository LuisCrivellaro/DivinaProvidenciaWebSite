import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Lede, Note, PageHeader, Photo, Section, SectionTitle } from "@/components/ui";
import { EventList } from "@/components/EventList";
import { GalleryCard } from "@/components/GalleryCard";
import { events } from "@/content/events";
import { bigEvents } from "@/content/programs";
import { galleries } from "@/lib/galleries";
import { monthLong } from "@/lib/dates";
import { today } from "@/lib/today";

export const metadata: Metadata = {
  title: "Agenda",
  description: "Próximos eventos, calendário oficial de 2027 e grandes eventos da Comunidade Divina Providência.",
  alternates: { canonical: "/agenda" },
};

export default async function Page() {
  const now = await today();
  const upcoming = events.filter((e) => (e.end ?? e.start) >= now);
  const byMonth = new Map<string, typeof upcoming>();
  for (const e of upcoming) {
    const key = e.start.slice(0, 7);
    byMonth.set(key, [...(byMonth.get(key) ?? []), e]);
  }
  const past = galleries.filter((g) => !g.restricted && g.published < now).slice(0, 8);
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Agenda" }]}
        lead="Agenda"
        accent="da comunidade."
        intro="Os próximos eventos, mês a mês. As datas de 2027 vêm do calendário oficial publicado em 19 de novembro de 2026. Horários e locais não divulgados ainda são informados pela secretaria."
      >
        <Link href="#calendario" className="btn btn-plain">Ver o calendário</Link>
        <Link href="#grandes-eventos" className="btn btn-ghost btn-plain">Grandes eventos</Link>
      </PageHeader>

      <Section tone="sand" id="calendario" labelledBy="calendario-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <SectionTitle id="calendario-titulo" lead="Calendário" />
            <Note className="mt-6">A própria comunidade avisa: a programação de 2027 está sujeita a alterações.</Note>
            <figure className="mt-6 hidden lg:block">
              <a href="https://www.instagram.com/adivinaprovidencia/p/Df7VC--xkI7/" target="_blank" rel="noopener noreferrer" className="link-draw text-sm text-ink-soft">
                Ver a publicação original no Instagram
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </figure>
          </div>
          <div className="space-y-14">
            {[...byMonth.entries()].map(([key, items]) => (
              <section key={key} aria-labelledby={`m-${key}`}>
                <h3 id={`m-${key}`} className="font-display text-[1.9rem] capitalize text-gold-deep">
                  {monthLong(`${key}-15`)} <span className="text-ink-soft tabular">{key.slice(0, 4)}</span>
                </h3>
                <div className="mt-4">
                  <EventList items={items} headingLevel="h3" />
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <Section id="grandes-eventos" labelledBy="grandes-titulo">
        <SectionTitle id="grandes-titulo" lead="Grandes" accent="eventos." />
        <Lede className="mt-6">Eles se repetem todo ano e reúnem a cidade.</Lede>
        <ul className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-stagger="">
          {bigEvents.map((b) => {
            const next = events.find((e) => e.slug === b.nextEventSlug);
            return (
              <li key={b.slug} id={b.slug} className="scroll-mt-[calc(var(--header-h)+1rem)] overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-paper">
                <Photo photo={b.photo} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/10]" />
                <div className="p-7 md:p-9">
                  <h3 className="font-display text-[2rem] leading-none">{b.name}</h3>
                  <p className="mt-2 font-display text-[1.2rem] italic text-gold-deep">{b.short}</p>
                  {b.text.map((t, i) => (
                    <p key={i} className="mt-4 text-ink-soft">{t}</p>
                  ))}
                  <div className="mt-7 flex flex-wrap gap-3">
                    {next && <ButtonLink href={`/agenda/${next.slug}`} variant="ghost">Próxima edição</ButtonLink>}
                    {b.gallerySlugs[0] && <ButtonLink href={`/galeria/${b.gallerySlugs[0]}`} variant="ghost" icon={false}>Fotos</ButtonLink>}
                    {b.link && <ButtonLink href={b.link.href} variant="ghost">{b.link.label}</ButtonLink>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="sand" labelledBy="anteriores">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <SectionTitle id="anteriores" lead="Eventos" accent="anteriores." />
          <ButtonLink href="/galeria" variant="ghost">Todas as galerias</ButtonLink>
        </div>
        <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger="">
          {past.map((g) => (
            <li key={g.slug}>
              <GalleryCard g={g} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
