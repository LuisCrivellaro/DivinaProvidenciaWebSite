import Link from "next/link";
import Image from "next/image";
import { ButtonLink, FactList, Lede, Note, Photo, SectionTitle, Breadcrumbs } from "./ui";
import { GalleryCard } from "./GalleryCard";
import { BrandIcon } from "./BrandIcon";
import { contacts, whatsappLink } from "@/content/site";
import { events } from "@/content/events";
import type { Program } from "@/content/programs";
import { getGallery } from "@/lib/galleries";
import { dateRange } from "@/lib/dates";

export function ProgramDetail({ program, parent }: { program: Program; parent: { label: string; href: string } }) {
  const ev = events.find((e) => e.slug === program.nextEventSlug);
  const relGalleries = program.gallerySlugs.map(getGallery).filter((g) => g !== undefined);
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  const msg = `Olá! Gostaria de informações sobre o ${program.name}.`;
  return (
    <>
      <header className="pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pb-24">
        <div className="wrap">
          <Breadcrumbs items={[parent, { label: program.name }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionTitle as="h1" lead={program.name} className="fade-up text-[clamp(2.4rem,1.6rem+3.4vw,4.6rem)]" />
              <p className="fade-up mt-3 font-display text-[1.5rem] italic text-gold-deep" style={{ ["--d" as string]: "80ms" }}>{program.audience}</p>
              <div className="fade-up mt-8 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft" style={{ ["--d" as string]: "140ms" }}>
                {program.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="fade-up mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "200ms" }}>
                {program.registration?.map((r, i) => (
                  <ButtonLink key={r.url} href={r.url} variant={i === 0 ? "primary" : "ghost"}>
                    {r.label}
                    {r.price ? ` · ${r.price}` : ""}
                  </ButtonLink>
                ))}
                <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, msg)} variant={program.registration ? "ghost" : "primary"} icon={false}>
                  <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={17} height={17} /> Tirar dúvidas</span>
                </ButtonLink>
              </div>
            </div>
            <div className="fade-up" style={{ ["--d" as string]: "160ms" }}>
              {program.photo ? (
                <Photo photo={program.photo} sizes="(min-width: 1024px) 40vw, 100vw" priority className="aspect-[5/4] rounded-[var(--radius-lg)]" />
              ) : (
                <div className="flex aspect-[5/4] flex-col justify-between rounded-[var(--radius-lg)] bg-night p-8 text-on-night">
                  {program.brandMark ? (
                    <span className="inline-block w-fit rounded-[var(--radius-md)] bg-paper p-4">
                      <Image src={program.brandMark} alt="" width={600} height={300} className="h-20 w-auto object-contain" />
                    </span>
                  ) : (
                    <span className="h-px w-16 bg-gold" aria-hidden="true" />
                  )}
                  <p className="font-display text-[clamp(1.8rem,1.2rem+2vw,2.8rem)] italic leading-tight text-gold-night">{program.short}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="informacoes" className="bg-sand py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionTitle id="informacoes" lead="Para participar" />
            <Lede className="mt-5">
              {program.registration
                ? "A inscrição é feita aqui no site: você preenche a ficha do participante, ela segue pelo WhatsApp para a Secretaria de Evangelização, e a secretaria confirma a vaga e o pagamento."
                : "Quando as inscrições abrirem, a Secretaria de Evangelização divulga valores, documentos e orientações. Enquanto isso, você pode perguntar pelo WhatsApp."}
            </Lede>
          </div>
          <div>
            <FactList facts={program.facts} />
            {ev && (
              <p className="mt-6 text-ink-soft">
                Próxima data no calendário: <Link href={`/agenda/${ev.slug}`} className="link-draw font-medium text-gold-deep">{dateRange(ev.start, ev.end)}</Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {relGalleries.length > 0 && (
        <section aria-labelledby="galerias" className="py-20 md:py-28">
          <div className="wrap">
            <SectionTitle id="galerias" lead="Edições" accent="anteriores." />
            <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {relGalleries.slice(0, 8).map((g) => (
                <li key={g.slug}>
                  <GalleryCard g={g} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
