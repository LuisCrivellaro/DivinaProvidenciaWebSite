import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Baby, CalendarDays, Clock, MapPin, Ticket } from "lucide-react";
import { Breadcrumbs, ButtonLink, Lede, Note, SectionTitle } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { Embers } from "@/components/Decor";
import { divinaBrasa as d } from "@/content/divina-brasa";
import { events } from "@/content/events";
import { whatsappLink } from "@/content/site";
import { currency, dateRange, fullDate } from "@/lib/dates";
import { mediaUrl } from "@/lib/media";
import { today } from "@/lib/today";

export const metadata: Metadata = {
  title: "Festival Divina Brasa",
  description: "Churrasco com 14 estações, carnes nobres e shows ao vivo na sede da Comunidade Divina Providência. Toda a renda vai para a manutenção e a ampliação da sede.",
  alternates: { canonical: "/festival-divina-brasa" },
  openGraph: { images: [mediaUrl(d.attractions.src)] },
};

export default async function Page() {
  const now = await today();
  const ed = d.edition2026;
  const editionPast = ed.date < now;
  const next = events.find((e) => e.slug === "divina-brasa-2027");
  const sponsorMsg = "Olá! Vim pelo site e gostaria de saber como patrocinar o Festival Divina Brasa.";

  return (
    <>
      {/* ABERTURA ------------------------------------------------------------ */}
      <header className="keep-dark on-night relative isolate overflow-hidden bg-night pb-20 pt-[calc(var(--header-h)+2.5rem)] text-on-night md:pb-28">
        <Embers count={26} seed={41} className="-z-10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_100%,rgb(201_120_40/0.35),transparent_70%)]" aria-hidden="true" />
        <div className="wrap">
          <Breadcrumbs tone="dark" items={[{ label: "Agenda", href: "/agenda" }, { label: "Festival Divina Brasa" }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1 className="fade-up text-[clamp(2.8rem,1.8rem+4.4vw,5.6rem)] leading-[0.98]">
                Festival <em className="font-normal italic text-gold-night">Divina Brasa</em>
              </h1>
              <p className="fade-up mt-6 max-w-[40ch] font-display text-[1.5rem] italic leading-snug text-on-night-soft" style={{ ["--d" as string]: "100ms" }}>{d.tagline}</p>
              <p className="fade-up mt-4 max-w-[52ch] text-[1.12rem] text-on-night-soft" style={{ ["--d" as string]: "160ms" }}>{d.pitch}</p>
              <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "240ms" }}>
                <ButtonLink href={whatsappLink(d.sponsorWhatsapp, sponsorMsg)} className="btn-pulse" icon={false}>
                  <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={18} height={18} /> Seja um patrocinador</span>
                </ButtonLink>
                <ButtonLink href={d.instagram} variant="ghost-light">Instagram do festival</ButtonLink>
              </div>
            </div>
            <div className="fade-up mx-auto w-full max-w-[22rem]" style={{ ["--d" as string]: "200ms" }}>
              <Image src={mediaUrl(d.logo.src)} alt={d.logo.alt} width={1080} height={1080} sizes="22rem" preload loading="eager" className="float h-auto w-full drop-shadow-[0_30px_60px_rgb(0_0_0/0.6)]" />
            </div>
          </div>
        </div>
      </header>

      {/* COMO É O FESTIVAL ---------------------------------------------------- */}
      <section aria-labelledby="como-e" className="py-20 md:py-28">
        <div className="wrap">
          <SectionTitle id="como-e" lead="Como é" accent="o festival." />
          <ul className="mt-12 grid gap-5 md:grid-cols-3" data-reveal-stagger="">
            {d.highlights.map((h) => (
              <li key={h.label} className="rounded-[var(--radius-xl)] border border-ink/10 bg-sand p-8">
                <p className="font-display leading-none">
                  <span className="block text-[clamp(3rem,2.4rem+2vw,4.2rem)] text-gold-deep">{h.value}</span>
                  <span className="mt-1 block text-[1.5rem] italic">{h.label}</span>
                </p>
                <p className="mt-5 text-ink-soft">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EDIÇÃO 2026 ------------------------------------------------------------ */}
      <section aria-labelledby="edicao" className="bg-sand py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div data-reveal-stagger="">
            <SectionTitle id="edicao" lead="Edição" accent="de 2026." />
            {editionPast && <Note className="mt-6">Esta edição aconteceu em {fullDate(ed.date)}. As informações ficam aqui como registro.</Note>}
            <dl className="mt-8 grid gap-5 border-y border-ink/12 py-7 sm:grid-cols-2">
              <div className="flex gap-3">
                <CalendarDays size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div><dt className="text-sm text-ink-soft">Data</dt><dd className="font-medium">{ed.weekday}, {fullDate(ed.date)}</dd></div>
              </div>
              <div className="flex gap-3">
                <Clock size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div><dt className="text-sm text-ink-soft">Início</dt><dd className="font-medium">{ed.time}</dd></div>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <MapPin size={22} className="mt-0.5 shrink-0 text-gold-deep" aria-hidden="true" />
                <div><dt className="text-sm text-ink-soft">Local</dt><dd className="font-medium">{ed.place}</dd></div>
              </div>
            </dl>

            <h3 className="mt-10 flex items-center gap-2 font-display text-[1.6rem]"><Ticket size={22} className="text-gold-deep" aria-hidden="true" /> Ingressos</h3>
            <ul className="mt-4 grid grid-cols-3 gap-3">
              {ed.lots.map((l) => (
                <li key={l.label} className="rounded-[var(--radius-md)] border border-ink/12 bg-paper px-4 py-3 text-center">
                  <span className="block text-sm text-ink-soft">{l.label}</span>
                  <span className="block font-display text-[1.5rem] tabular">{currency.format(l.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-ink-soft">Venda pela plataforma Total Ingressos.{!editionPast && <> <a href={ed.ticketsUrl} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-gold-deep">Comprar ingresso</a></>}</p>

            <h3 className="mt-8 flex items-center gap-2 font-display text-[1.6rem]"><Baby size={22} className="text-gold-deep" aria-hidden="true" /> Crianças</h3>
            <ul className="mt-3 space-y-1 text-ink-soft">
              {d.ageRules.map((r) => <li key={r}>{r}</li>)}
            </ul>

            <h3 className="mt-8 font-display text-[1.6rem]">Formas de pagamento</h3>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Formas de pagamento aceitas">
              {d.payment.map((p) => (
                <li key={p} className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-[0.92rem]">{p}</li>
              ))}
            </ul>
          </div>

          <figure className="self-start lg:sticky lg:top-[calc(var(--header-h)+2rem)]" data-reveal="image">
            <Image src={mediaUrl(d.attractions.src)} alt={d.attractions.alt} width={1097} height={793} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full rounded-[var(--radius-xl)] bg-night" />
            <figcaption className="mt-3 text-sm text-ink-soft">Atrações da edição de 2026.</figcaption>
          </figure>
        </div>
      </section>

      {/* PARA ONDE VAI A RENDA ------------------------------------------------- */}
      <section aria-labelledby="renda" className="carisma-band relative isolate overflow-hidden py-20 text-ink md:py-28">
        <div className="wrap max-w-[52rem] text-center" data-reveal-stagger="">
          <h2 id="renda" className="font-sans text-base font-medium">Para onde vai a renda</h2>
          <p className="mt-6 font-display text-[clamp(1.8rem,1.3rem+2vw,2.8rem)] leading-[1.15]">{d.purpose}</p>
          {next && (
            <p className="mt-8">
              <Link href={`/agenda/${next.slug}`} className="link-draw font-medium">Próxima edição no calendário: {dateRange(next.start, next.end)}</Link>
            </p>
          )}
        </div>
      </section>

      {/* PATROCINADORES --------------------------------------------------------- */}
      <section aria-labelledby="patrocinio" className="py-20 md:py-28">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <SectionTitle id="patrocinio" lead="Quem fez" accent="o festival acontecer." />
            <ButtonLink href={whatsappLink(d.sponsorWhatsapp, sponsorMsg)} variant="ghost" icon={false}>
              <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={17} height={17} /> Quero patrocinar</span>
            </ButtonLink>
          </div>
          <Lede className="mt-6">Patrocinadores da edição de 2026, como apareciam na página oficial do festival.</Lede>

          <h3 className="mt-12 font-sans text-sm font-medium uppercase tracking-[0.16em] text-ink-soft">Realização</h3>
          <div className="mt-4 inline-flex rounded-[var(--radius-lg)] border border-ink/10 bg-white p-5">
            <Image src={mediaUrl(d.organizer.src)} alt={d.organizer.alt} width={1080} height={655} sizes="200px" className="h-20 w-auto" />
          </div>

          <h3 className="mt-12 font-sans text-sm font-medium uppercase tracking-[0.16em] text-ink-soft">Patrocínio Diamante</h3>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3" data-reveal-stagger="">
            {d.diamond.map((s) => (
              <li key={s.src} className="grid h-36 place-items-center rounded-[var(--radius-lg)] border border-gold/50 bg-white p-6 shadow-[0_18px_40px_-30px_rgb(170_105_15/0.6)]">
                <Image src={mediaUrl(s.src)} alt={s.alt} width={400} height={300} sizes="240px" className="max-h-24 w-auto object-contain" />
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-sans text-sm font-medium uppercase tracking-[0.16em] text-ink-soft">Patrocínio</h3>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4" data-reveal-stagger="">
            {d.sponsors.map((s) => (
              <li key={s.src} className="grid aspect-square place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-ink/10 bg-white">
                <Image src={mediaUrl(s.src)} alt={s.alt} width={400} height={400} sizes="(min-width: 640px) 22vw, 45vw" className="h-full w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
