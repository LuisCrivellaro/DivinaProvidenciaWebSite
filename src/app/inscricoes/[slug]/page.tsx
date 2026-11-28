import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Users, HandHeart } from "lucide-react";
import { Breadcrumbs, Note, Photo, SectionTitle } from "@/components/ui";
import { InscricaoForm } from "@/components/InscricaoForm";
import { getInscricao, inscricaoHref, inscricoes } from "@/content/inscricoes";
import { getEvent } from "@/content/events";
import { formatPhone, site } from "@/content/site";
import { currency, dateRange } from "@/lib/dates";
import { mediaUrl } from "@/lib/media";
import { today } from "@/lib/today";

export function generateStaticParams() {
  return inscricoes.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/inscricoes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const i = getInscricao(slug);
  if (!i) return {};
  const ev = getEvent(i.eventSlug);
  return {
    title: `Inscrição · ${i.name}`,
    description: `Inscrição de ${i.role.toLowerCase()} no ${ev?.title ?? i.name}${ev ? `, ${dateRange(ev.start, ev.end)}` : ""}. ${currency.format(i.price)}.`,
    alternates: { canonical: inscricaoHref(slug) },
    openGraph: { images: [mediaUrl(i.image.src)] },
  };
}

export default async function Page({ params }: PageProps<"/inscricoes/[slug]">) {
  const { slug } = await params;
  const i = getInscricao(slug);
  if (!i) notFound();
  const ev = getEvent(i.eventSlug);
  const now = await today();
  const closed = ev ? (ev.end ?? ev.start) < now : false;
  const others = inscricoes.filter((o) => o.eventSlug === i.eventSlug && o.slug !== i.slug);
  const price = currency.format(i.price);
  const [intro, ...camps] = i.requirements;

  const jsonLd = ev && {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    startDate: ev.start,
    endDate: ev.end ?? ev.start,
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    offers: { "@type": "Offer", name: i.name, price: i.price.toFixed(2), priceCurrency: "BRL", availability: closed ? "https://schema.org/SoldOut" : "https://schema.org/InStock", url: `${site.url}${inscricaoHref(i.slug)}` },
  };

  return (
    <article className="pt-[calc(var(--header-h)+2.5rem)] pb-24">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Loja e inscrições", href: "/loja" }, { label: i.name }]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SectionTitle as="h1" lead={ev?.title ?? i.name} accent={`Inscrição de ${i.role.toLowerCase()}.`} className="fade-up text-[clamp(2.4rem,1.6rem+3.2vw,4.4rem)]" />
            <p className="fade-up mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1" style={{ ["--d" as string]: "100ms" }}>
              <span className="font-display text-[2.6rem] leading-none text-gold-deep tabular">{price}</span>
              <span className="text-ink-soft">{i.roleDescription}</span>
            </p>

            <dl className="fade-up mt-10 grid gap-6 border-y border-ink/12 py-7 sm:grid-cols-2" style={{ ["--d" as string]: "160ms" }}>
              {ev && (
                <div className="flex gap-3">
                  <CalendarDays size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-ink-soft">Data</dt>
                    <dd className="font-medium">{dateRange(ev.start, ev.end)}</dd>
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <HandHeart size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-soft">Realização</dt>
                  <dd className="font-medium">{i.organizers}</dd>
                </div>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <Users size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div>
                  <dt className="text-sm text-ink-soft">Quem pode participar</dt>
                  <dd className="font-medium">
                    {intro}
                    <ul className="mt-2 space-y-1 font-normal text-ink-soft">
                      {camps.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </div>
            </dl>

            {closed ? (
              <Note className="mt-10">As inscrições para este encontro foram encerradas. Acompanhe a <Link href="/agenda" className="link-draw font-medium text-gold-deep">agenda</Link> para os próximos.</Note>
            ) : (
              <section aria-labelledby="ficha" className="mt-12 rounded-[var(--radius-xl)] border border-ink/10 bg-sand p-6 sm:p-9" data-reveal="">
                <h2 id="ficha" className="font-display text-[clamp(1.7rem,1.4rem+1vw,2.2rem)]">Ficha de inscrição</h2>
                <ol className="mt-4 grid gap-3 text-[0.98rem] text-ink-soft sm:grid-cols-3">
                  {["Preencha os dados do participante.", "O WhatsApp abre com a ficha pronta para a Secretaria de Evangelização.", "A secretaria confirma a vaga e explica como pagar."].map((t, n) => (
                    <li key={t} className="flex gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-sm font-semibold text-ink tabular" aria-hidden="true">{n + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
                <div className="mt-8">
                  <InscricaoForm inscricao={i.name} price={price} whatsapp={i.whatsapp} />
                </div>
                <p className="mt-6 text-sm text-ink-soft">
                  As inscrições são recebidas pelo WhatsApp da Secretaria de Evangelização, {formatPhone(i.whatsapp)}. Uma ficha por participante.
                </p>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <Photo src={i.image.src} alt={i.image.alt} sizes="(min-width: 1024px) 36vw, 100vw" priority reveal className="aspect-square rounded-[var(--radius-xl)]" />
            {others.length > 0 && (
              <div className="mt-6 rounded-[var(--radius-lg)] border border-ink/10 p-5">
                <p className="text-sm text-ink-soft">Outra forma de participar</p>
                <ul className="mt-2 space-y-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={inscricaoHref(o.slug)} className="group flex items-center justify-between gap-4 font-display text-[1.35rem]">
                        <span className="link-draw">Inscrição de {o.role.toLowerCase()}</span>
                        <span className="font-sans text-base font-semibold text-gold-deep tabular">{currency.format(o.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem]">
              {ev && <Link href={`/agenda/${ev.slug}`} className="link-draw text-gold-deep">Ver na agenda</Link>}
              {i.programHref && <Link href={i.programHref} className="link-draw text-gold-deep">Sobre o retiro</Link>}
            </div>
          </aside>
        </div>
      </div>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </article>
  );
}
