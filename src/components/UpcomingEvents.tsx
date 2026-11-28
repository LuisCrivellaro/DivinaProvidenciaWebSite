import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { categoryLabel, type CommunityEvent, type EventCategory } from "@/content/events";
import type { PhotoKey } from "@/content/site";
import { dateRange, day, monthShort, weekday } from "@/lib/dates";
import { ButtonLink, Lede, Photo, SectionTitle } from "./ui";
import { Countdown } from "./Countdown";
import { Embers } from "./Decor";

/** Foto de reserva por tipo de evento, para quem ainda não tem foto própria. */
const categoryPhoto: Record<EventCategory, PhotoKey> = {
  acampamento: "louvor",
  retiro: "retiroLouvor",
  oracao: "capela",
  festival: "divinaJovem",
  festa: "festaNacoes",
  formacao: "jovensPregacao",
  diocese: "cercoPalco",
  comunidade: "sede",
};

const DAY = 86_400_000;
const noon = (iso: string) => Date.parse(`${iso}T12:00:00-04:00`);

function inDays(from: string, to: string) {
  const n = Math.round((noon(to) - noon(from)) / DAY);
  if (n <= 0) return "agora";
  if (n === 1) return "amanhã";
  if (n < 7) return `em ${n} dias`;
  if (n < 60) return `em ${Math.round(n / 7)} semanas`;
  return `em ${Math.round(n / 30)} meses`;
}

/** "5–6" para eventos no mesmo mês; senão só o primeiro dia. */
function dayRange(e: CommunityEvent) {
  if (!e.end || e.end === e.start || e.end.slice(0, 7) !== e.start.slice(0, 7)) return day(e.start);
  return `${day(e.start)}–${day(e.end)}`;
}

/**
 * "Caminho de fé": o próximo encontro vira um cartaz emoldurado com contagem regressiva,
 * e os seguintes ficam pendurados num fio dourado, como contas de um terço, que se desenha
 * conforme a rolagem (CSS scroll-driven; sem suporte, o fio já aparece inteiro).
 */
export function UpcomingEvents({ items, now }: { items: CommunityEvent[]; now: string }) {
  const [next, ...rest] = items;
  if (!next) return null;
  const nextPhoto = next.photo ?? categoryPhoto[next.category];
  const reg = next.registration?.[0];

  return (
    <section aria-labelledby="proximos" className="caminho on-night relative isolate overflow-hidden bg-night py-24 text-on-night md:py-32">
      <Embers count={14} seed={23} className="-z-10 opacity-70" />

      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end" data-reveal-stagger="">
          <SectionTitle id="proximos" tone="dark" lead="Próximos" accent="encontros." />
          <div className="md:max-w-[38ch]">
            <Lede tone="dark">Datas divulgadas pela comunidade e do calendário 2027, publicado em 19 de novembro de 2026. A programação pode mudar; horários e locais são confirmados pela secretaria.</Lede>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* CARTAZ DO PRÓXIMO ENCONTRO ------------------------------------------------ */}
          <article className="keep-dark lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start" data-reveal="">
            <div className="poster group relative isolate flex min-h-[38rem] flex-col overflow-hidden rounded-[var(--radius-xl)] p-7 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)] sm:p-9" data-tilt="4">
              <Photo photo={nextPhoto} sizes="(min-width: 1024px) 45vw, 100vw" className="poster-photo !absolute inset-0 -z-10" />
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_26_22/0.25)_0%,rgb(31_26_22/0.55)_40%,rgb(31_26_22/0.96)_78%)]" aria-hidden="true" />
              {/* moldura de santinho, com estrelas nos cantos */}
              <span className="poster-frame pointer-events-none absolute inset-3 rounded-[calc(var(--radius-xl)-8px)] border border-gold-night/45" aria-hidden="true">
                <i /><i /><i /><i />
              </span>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-gold px-3.5 py-1.5 text-[0.82rem] font-semibold text-ink">
                  <span className="live-dot" aria-hidden="true" /> Próximo encontro
                </span>
                <span className="rounded-full border border-white/25 px-3 py-1 text-[0.82rem] text-on-night backdrop-blur-sm">{categoryLabel[next.category]}</span>
              </div>

              <div className="mt-auto pt-16">
              <p className="poster-date flex items-end gap-3 font-display leading-[0.85]" aria-hidden="true">
                <span className="text-[clamp(5rem,3.6rem+6vw,8.5rem)] tracking-[-0.04em]">{dayRange(next)}</span>
                <span className="pb-2 text-[clamp(1.8rem,1.4rem+1.6vw,2.6rem)] italic text-gold-night">{monthShort(next.start)}</span>
              </p>

              <h3 className="mt-5 font-display text-[clamp(2rem,1.6rem+1.6vw,2.8rem)] leading-[1.02]">
                <Link href={`/agenda/${next.slug}`} className="after:absolute after:inset-0 after:z-0 hover:text-gold-night focus-visible:text-gold-night">
                  {next.title}
                </Link>
              </h3>
              <p className="mt-2 text-on-night-soft">
                {dateRange(next.start, next.end)}
                {next.place && (
                  <span className="ml-2 inline-flex items-center gap-1">
                    <MapPin size={15} aria-hidden="true" /> {next.place}
                  </span>
                )}
              </p>

              <div className="relative z-[2] mt-7">
                <Countdown start={next.start} end={next.end} serverNow={noon(now)} />
              </div>

              <div className="relative z-[2] mt-7 flex flex-wrap gap-3">
                {reg ? (
                  <ButtonLink href={reg.url} className="btn-pulse">
                    Garantir minha vaga
                  </ButtonLink>
                ) : null}
                <ButtonLink href={`/agenda/${next.slug}`} variant="ghost-light" icon={!reg}>
                  Ver detalhes
                </ButtonLink>
              </div>
              </div>
            </div>
          </article>

          {/* O CAMINHO (contas no fio dourado) -------------------------------------------- */}
          <div>
            <ol className="caminho-list relative" data-reveal-stagger="">
              {rest.map((e, i) => {
                const prev = i === 0 ? next : rest[i - 1];
                const newYear = e.start.slice(0, 4) !== prev.start.slice(0, 4);
                const photo = e.photo ?? categoryPhoto[e.category];
                return (
                  <li key={e.slug} className="caminho-item">
                    {newYear && <p className="caminho-year font-display leading-none">{e.start.slice(0, 4)}</p>}
                    <div className="relative">
                    <span className="caminho-bead" aria-hidden="true" />
                    <Link
                      href={`/agenda/${e.slug}`}
                      className="caminho-card group my-3 grid grid-cols-[3.75rem_1fr] items-center gap-4 rounded-[var(--radius-lg)] border border-on-night/15 bg-paper/15 p-4 sm:grid-cols-[4.5rem_1fr_6.5rem] sm:gap-5 sm:p-5 lg:grid-cols-[4.5rem_1fr] xl:grid-cols-[4.5rem_1fr_6.5rem]"
                    >
                      <span className="text-center leading-none">
                        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-on-night-soft">{weekday(e.start)}</span>
                        <span className="caminho-day mt-1 block font-display text-[2.6rem] tabular">{day(e.start)}</span>
                        <span className="block text-sm italic text-gold-night">{monthShort(e.start)}</span>
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 text-[0.78rem]">
                          <span className="rounded-full border border-gold-night/40 px-2.5 py-0.5 text-gold-night">{categoryLabel[e.category]}</span>
                          <span className="text-on-night-soft">{inDays(now, e.start)}</span>
                        </span>
                        <span className="mt-2 block font-display text-[1.45rem] leading-tight transition-colors duration-300 group-hover:text-gold-night sm:text-[1.65rem]">{e.title}</span>
                        <span className="mt-1 flex items-center gap-2 text-[0.92rem] text-on-night-soft">
                          {dateRange(e.start, e.end)}
                          <ArrowRight size={16} aria-hidden="true" className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                      </span>
                      <Photo photo={photo} sizes="120px" quality={60} className="caminho-thumb hidden aspect-[4/5] rounded-[var(--radius-md)] sm:block lg:hidden xl:block" />
                    </Link>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="caminho-item mt-10">
              <ButtonLink href="/agenda" variant="light">
                Ver a agenda completa
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
