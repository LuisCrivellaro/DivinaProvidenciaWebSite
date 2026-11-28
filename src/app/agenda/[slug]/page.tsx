import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Breadcrumbs, ButtonLink, Note, Photo, SectionTitle } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { categoryLabel, events, getEvent } from "@/content/events";
import { contacts, site, whatsappLink } from "@/content/site";
import { dateRange } from "@/lib/dates";
import { today } from "@/lib/today";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/agenda/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return { title: `${e.title} · ${dateRange(e.start, e.end)}`, description: e.summary, alternates: { canonical: `/agenda/${slug}` } };
}

export default async function Page({ params }: PageProps<"/agenda/[slug]">) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  const now = await today();
  const isPast = (e.end ?? e.start) < now;
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.start,
    endDate: e.end ?? e.start,
    eventStatus: "https://schema.org/EventScheduled",
    description: e.summary,
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    ...(e.place ? { location: { "@type": "Place", name: e.place, address: "Rua Padre Anchieta, s/n, Vila Goulart, Rondonópolis - MT" } } : {}),
  };
  return (
    <article className="pt-[calc(var(--header-h)+2.5rem)] pb-24">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Agenda", href: "/agenda" }, { label: e.title }]} />
        <div className={`mt-8 grid gap-12 ${e.photo ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[1.2fr_0.8fr]"}`}>
          <div>
            <SectionTitle as="h1" lead={e.title} className="text-[clamp(2.4rem,1.6rem+3.4vw,4.4rem)]" />
            <p className="mt-3 inline-flex rounded-full bg-sand px-3 py-1 text-sm font-medium text-gold-deep">{categoryLabel[e.category]}</p>
            <p className="mt-6 max-w-[55ch] text-[1.15rem] leading-relaxed text-ink-soft">{e.summary}</p>
            <dl className="mt-10 grid gap-5 border-y border-ink/12 py-7 sm:grid-cols-3">
              <div className="flex gap-3">
                <CalendarDays size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-soft">Data</dt>
                  <dd className="font-medium">{dateRange(e.start, e.end)}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-soft">Horário</dt>
                  <dd className="font-medium">{e.time ?? "A confirmar com a secretaria"}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-soft">Local</dt>
                  <dd className="font-medium">{e.place ?? "A confirmar com a secretaria"}</dd>
                </div>
              </div>
            </dl>
            {isPast ? (
              <Note className="mt-8">Este evento já aconteceu.</Note>
            ) : e.registration ? (
              <div className="mt-10">
                <h2 className="font-display text-[1.8rem]">Inscrições</h2>
                <p className="mt-2 max-w-[55ch] text-ink-soft">
                  Escolha a forma de participar e preencha a ficha com nome, celular e CPF do participante. A Secretaria de Evangelização confirma a vaga e orienta o pagamento.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2" data-reveal-stagger="">
                  {e.registration.map((r, i) => (
                    <li key={r.url}>
                      <Link href={r.url} className={`lift flex h-full flex-col rounded-[var(--radius-lg)] p-6 ${i === 0 ? "gold-surface bg-gold text-ink" : "border border-ink/15"}`}>
                        <span className="font-display text-[1.5rem] leading-tight">{r.label}</span>
                        {r.price && <span className={`mt-2 text-[1.3rem] font-semibold tabular ${i === 0 ? "" : "text-gold-deep"}`}>{r.price}</span>}
                        <span className={`mt-4 text-sm font-medium ${i === 0 ? "text-ink" : "text-gold-deep"}`}>Preencher a ficha →</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Note className="mt-8">
                Data do calendário oficial de 2027, sujeita a alterações. As inscrições, quando houver, serão divulgadas pela comunidade.
              </Note>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, `Olá! Gostaria de informações sobre: ${e.title} (${dateRange(e.start, e.end)}).`)} variant={e.registration ? "ghost" : "primary"} icon={false}>
                <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={17} height={17} /> Perguntar à secretaria</span>
              </ButtonLink>
              {e.programHref && (
                <ButtonLink href={e.programHref} variant="ghost">Sobre este encontro</ButtonLink>
              )}
            </div>
          </div>
          {e.photo ? (
            <Photo photo={e.photo} sizes="(min-width: 1024px) 40vw, 100vw" priority reveal className="aspect-[4/5] rounded-[var(--radius-lg)]" />
          ) : (
            <div className="flex aspect-[4/5] max-h-[34rem] flex-col justify-between rounded-[var(--radius-lg)] bg-night p-8 text-on-night">
              <span className="h-px w-16 bg-gold" aria-hidden="true" />
              <p className="font-display leading-none">
                <span className="block text-[5.5rem] tabular text-on-night">{Number(e.start.slice(8))}</span>
                <span className="block text-[2rem] italic text-gold-night">{dateRange(e.start, e.end).replace(/^[\d]+ (e|a) [\d]+ de |^[\d]+ de /, "")}</span>
              </p>
            </div>
          )}
        </div>
        <p className="mt-16">
          <Link href="/agenda" className="link-draw text-ink-soft">← Voltar para a agenda</Link>
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
