import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { BlurTitle, ButtonLink, Lede, Photo, SectionTitle, TextLink } from "@/components/ui";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Carisma } from "@/components/Carisma";
import { VideoFacade } from "@/components/VideoFacade";
import { BrandIcon } from "@/components/BrandIcon";
import { Embers, Marquee } from "@/components/Decor";
import { CountUp } from "@/components/Motion";
import { PhotoStrip } from "@/components/PhotoStrip";
import { events } from "@/content/events";
import { camps, prayerGroups, retreats } from "@/content/programs";
import { contacts, mapsLink, photos, site, whatsappLink } from "@/content/site";
import { videos } from "@/content/videos";
import { galleries, groupLabel, uploadUrl } from "@/lib/galleries";
import { dateRange } from "@/lib/dates";
import { today } from "@/lib/today";

export default async function Home() {
  const now = await today();
  const upcoming = events.filter((e) => (e.end ?? e.start) >= now).slice(0, 5);
  const next = upcoming[0];
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  const terapeutica = contacts.find((c) => c.id === "terapeutica")!;
  const highlightGalleries = ["25-acampamento-senior", "missa-1ano-adoracao-perpetua", "cerco-de-jerico-2024-7-dia", "divina-jovem-2025-pregacoes", "festa-das-nacoes-2025"]
    .map((s) => galleries.find((g) => g.slug === s)!)
    .filter(Boolean);
  const totalPhotos = galleries.reduce((n, g) => n + g.images.length, 0);
  const yearsOfMission = Number(now.slice(0, 4)) - 2005;
  const stripCovers = galleries.filter((g) => !highlightGalleries.includes(g)).slice(0, 10);

  return (
    <>
      {/* HERO ------------------------------------------------------------ */}
      <section aria-labelledby="hero-title" className="hero-drift keep-dark on-night relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night text-on-night">
        <div className="ken-burns absolute inset-0 -z-10">
          <Image src={uploadUrl(photos.hero.src)} alt={photos.hero.alt} fill preload loading="eager" sizes="100vw" quality={85} className="object-cover object-[50%_35%]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_26_22/0.35)_0%,rgb(31_26_22/0.1)_30%,rgb(31_26_22/0.78)_72%,rgb(31_26_22/0.94)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(31_26_22/0.6)_0%,rgb(31_26_22/0)_62%)]" aria-hidden="true" />
        {/* No celular o texto ocupa a largura toda: um véu extra garante a leitura sobre a foto */}
        <div className="absolute inset-0 -z-10 bg-night/35 md:hidden" aria-hidden="true" />
        <Embers className="-z-10" />
        <div className="wrap grid gap-10 pb-12 pt-[calc(var(--header-h)+3rem)] md:pb-16 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <div id="hero-title">
              <BlurTitle text="Sua família," accent="nossa missão." className="text-[clamp(3.1rem,1.6rem+6.4vw,7.2rem)] leading-[0.98] tracking-[-0.025em] text-on-night" />
            </div>
            <p className="fade-up mt-7 max-w-[46ch] text-[1.15rem] leading-relaxed text-on-night-soft" style={{ ["--d" as string]: "450ms" }}>
              Somos a Comunidade Divina Providência, uma comunidade católica de aliança em Rondonópolis (MT). Evangelizamos famílias com acampamentos, retiros e grupos de oração, e acolhemos homens em recuperação na nossa Comunidade Terapêutica.
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "560ms" }}>
              <ButtonLink href="/comunidade" className="btn-pulse" data-magnetic="">Conheça a comunidade</ButtonLink>
              <ButtonLink href="/agenda" variant="ghost-light" icon={false} data-magnetic="">
                Ver a agenda
              </ButtonLink>
            </div>
          </div>

          {next && (
            <div className="float">
            <Link
              href={`/agenda/${next.slug}`}
              className="fade-up group block rounded-[var(--radius-lg)] border border-white/15 bg-night/55 p-6 backdrop-blur-md transition-colors hover:border-gold-night/60"
              style={{ ["--d" as string]: "700ms" }}
            >
              <span className="text-sm text-on-night-soft">Próximo na agenda</span>
              <span className="mt-2 block font-display text-[1.9rem] leading-tight">{next.title}</span>
              <span className="mt-2 block text-on-night-soft">{dateRange(next.start, next.end)}</span>
              <span className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[0.95rem]">
                <span className={next.registration ? "inline-flex items-center gap-2.5 font-semibold text-gold-night" : "text-on-night-soft"}>
                  {next.registration && <span className="live-dot" aria-hidden="true" />}
                  {next.registration ? "Inscrições abertas" : "Detalhes do evento"}
                </span>
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            </div>
          )}
        </div>
        <a href="#quem-somos" className="scroll-cue fade-up absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-on-night-soft transition-colors hover:text-gold-night xl:grid" style={{ ["--d" as string]: "1200ms" }}>
          <span className="mouse" aria-hidden="true" />
          Role
        </a>
      </section>

      {/* FAIXA QUE CORRE ------------------------------------------------------ */}
      <div className="gold-surface border-y border-ink/10 bg-gold py-5 text-ink md:py-7">
        <Marquee
          className="font-display text-[clamp(1.6rem,1.1rem+2vw,2.8rem)] italic leading-none"
          items={["Acampamentos", "Retiros", "Adoração perpétua", "Grupos de oração", "Cerco de Jericó", "Comunidade Terapêutica", "Festa das Nações", "Divina Jovem"]}
        />
      </div>

      {/* QUEM SOMOS --------------------------------------------------------- */}
      <section aria-labelledby="quem-somos" className="py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div data-reveal="image">
              <Photo photo="missaCompromisso" sizes="(min-width: 1024px) 40vw, 100vw" className="arch aspect-[4/5]" imgClassName="object-[78%_45%]" />
            </div>
            <Image
              src="/brand/logo-simbolo.png"
              alt=""
              width={589}
              height={488}
              sizes="176px"
              className="float absolute -bottom-12 right-0 w-32 drop-shadow-[0_10px_18px_rgb(255_248_242/0.95)] sm:w-40 lg:-right-16 lg:w-44"
            />
          </div>
          <div className="lg:pt-10" data-reveal-stagger="">
            <SectionTitle id="quem-somos" lead="Uma comunidade de aliança" accent="nascida na Igreja local." />
            <div className="mt-8 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
              <p>
                A Divina Providência começou suas atividades em 2005, em Rondonópolis. Em 2020 o bispo da {site.diocese} aprovou o seu Estatuto Canônico, e a comunidade passou a ser reconhecida pela Igreja como Comunidade de Aliança.
              </p>
              <p>
                Os membros vivem com suas famílias e seguem em suas profissões. O que os une é o mesmo carisma e a mesma missão: evangelizar as famílias e restaurar vidas.
              </p>
            </div>
            <dl className="mt-10 grid gap-6 border-t border-ink/12 pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-ink-soft">Onde estamos</dt>
                <dd className="mt-1 font-display text-[1.35rem] leading-tight">Vila Goulart, Rondonópolis</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Diocese</dt>
                <dd className="mt-1 font-display text-[1.35rem] leading-tight">Rondonópolis-Guiratinga</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Lema</dt>
                <dd className="mt-1 font-display text-[1.35rem] italic leading-tight">{site.motto}</dd>
              </div>
            </dl>
            <TextLink href="/comunidade" className="mt-8">Nossa história e o nosso carisma</TextLink>
          </div>
        </div>
        <dl className="wrap mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink/12 pt-12 lg:grid-cols-4" data-reveal-stagger="">
          {[
            { value: yearsOfMission, label: "anos de missão em Rondonópolis" },
            { value: 25, label: "edições do Acampamento Sênior" },
            { value: galleries.length, label: "galerias de fotos publicadas" },
            { value: totalPhotos, label: "fotos de encontros e celebrações" },
          ].map((st) => (
            <div key={st.label} className="flex flex-col-reverse justify-end gap-3">
              <dt className="max-w-[22ch] text-ink-soft">{st.label}</dt>
              <dd className="stat-number font-display text-[clamp(2.8rem,2rem+3vw,4.6rem)] leading-none">
                <CountUp value={st.value} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* VIDA EM COMUNIDADE -------------------------------------------------- */}
      <section aria-labelledby="vida" className="bg-sand py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end" data-reveal-stagger="">
            <SectionTitle id="vida" lead="Há um lugar para você" accent="em cada fase da vida." />
            <Lede className="md:max-w-[34ch]">Das crianças do Mirim aos casais, a comunidade caminha junto com quem chega.</Lede>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]" data-reveal-stagger="">
            <Link href="/acampamentos" className="group lift keep-dark relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] p-7 text-on-night md:col-span-4 md:row-span-2 md:min-h-[38rem]">
              <Photo photo="louvor" sizes="(min-width: 768px) 66vw, 100vw" className="zoom-frame !absolute inset-0 -z-10" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/35 to-transparent" aria-hidden="true" />
              <h3 className="font-display text-[clamp(2rem,1.5rem+2vw,3rem)] leading-none">Acampamentos</h3>
              <p className="mt-3 max-w-[40ch] text-on-night-soft">Mirim, Juvenil, FAC, Sênior e Casais. O Sênior já passou de 25 edições.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium text-gold-night">
                Conhecer os acampamentos <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link href="/retiros" className="group lift keep-dark relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] p-6 text-on-night md:col-span-2">
              <Photo photo="retiroLouvor" sizes="(min-width: 768px) 33vw, 100vw" className="zoom-frame !absolute inset-0 -z-10" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/30 to-transparent" aria-hidden="true" />
              <h3 className="font-display text-[1.9rem] leading-none">Retiros</h3>
              <p className="mt-2 text-on-night-soft">Desperta, Homens de Fé, Mulheres e o Curso 5 Linguagens do Amor.</p>
            </Link>

            <Link href="/vida-de-oracao#adoracao" className="group lift keep-dark relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] p-6 text-on-night md:col-span-2">
              <Photo photo="adoracaoAltar" sizes="(min-width: 768px) 33vw, 100vw" className="zoom-frame !absolute inset-0 -z-10" />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 via-night/30 to-transparent" aria-hidden="true" />
              <h3 className="font-display text-[1.9rem] leading-none">Adoração</h3>
              <p className="mt-2 text-on-night-soft">Adoração perpétua ao Santíssimo, desde 2025.</p>
            </Link>

            <Link href="/grupos-de-oracao" className="group lift flex flex-col justify-between rounded-[var(--radius-lg)] border border-ink/10 bg-paper p-6 md:col-span-3">
              <div>
                <h3 className="font-display text-[1.9rem] leading-none">Grupos de oração</h3>
                <p className="mt-2 text-ink-soft">Quatro grupos semanais, entre eles um infantil, um de adolescentes e um de jovens.</p>
              </div>
              <ul className="mt-7 grid grid-cols-2 items-center gap-x-6 gap-y-5" aria-label="Grupos">
                {prayerGroups.map((g) => (
                  <li key={g.slug} className="flex items-center justify-center">
                    <Image src={g.logo} alt={g.fullName} width={g.logoW} height={g.logoH} className="h-16 w-full object-contain transition-transform duration-500 group-hover:scale-105 sm:h-20" />
                  </li>
                ))}
              </ul>
            </Link>

            <Link href="/obras-e-projetos" className="gold-surface group lift flex flex-col justify-between rounded-[var(--radius-lg)] bg-gold p-6 text-ink md:col-span-3">
              <h3 className="font-display text-[1.9rem] leading-none">Obras e caridade</h3>
              <p className="mt-2 max-w-[44ch] text-ink">A Comunidade Terapêutica acolhe homens em recuperação da dependência química. Em 2026 abrimos a Casa da Saúde São Padre Pio.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium">
                Ver as obras <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS ----------------------------------------------------- */}
      <UpcomingEvents items={upcoming} now={now} />

      {/* ACAMPAMENTOS E RETIROS -------------------------------------------------- */}
      <section aria-labelledby="acampamentos" className="bg-sand py-24 md:py-32">
        <div className="wrap">
          <SectionTitle id="acampamentos" lead="Acampamentos" accent="e retiros." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger="">
            {camps.slice(0, 4).map((c) => {
              const ev = events.find((e) => e.slug === c.nextEventSlug);
              return (
                <li key={c.slug}>
                  <Link href={`/acampamentos/${c.slug}`} className="group lift flex h-full flex-col rounded-[var(--radius-lg)] border border-ink/10 bg-paper p-6">
                    <span className="font-display text-[2.6rem] leading-none text-gold-deep">{c.facts.find((f) => f.label === "Última edição")?.value.split(",")[0]}</span>
                    <span className="mt-1 text-sm text-ink-soft">edição em 2026</span>
                    <h3 className="mt-8 font-display text-[1.7rem] leading-tight">{c.name}</h3>
                    <p className="mt-2 text-ink-soft">{c.short}</p>
                    {ev && <p className="mt-auto pt-6 text-[0.95rem]"><span className="text-ink-soft">Próximo: </span>{dateRange(ev.start, ev.end)}</p>}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="mt-5 grid gap-5 md:grid-cols-2" data-reveal-stagger="">
            {retreats.slice(0, 2).map((r) => (
              <li key={r.slug}>
                <Link href={`/retiros/${r.slug}`} className="group lift grid h-full grid-cols-[auto_1fr] items-center gap-6 rounded-[var(--radius-lg)] bg-paper p-6">
                  {r.photo ? (
                    <Photo photo={r.photo} sizes="160px" className="zoom-frame aspect-square w-28 rounded-[var(--radius-md)] sm:w-36" />
                  ) : (
                    <span className="grid aspect-square w-28 place-items-center rounded-[var(--radius-md)] bg-night sm:w-36">
                      <span className="font-display text-[1.6rem] italic text-gold-night">Desperta</span>
                    </span>
                  )}
                  <span>
                    <h3 className="font-display text-[1.6rem] leading-tight">{r.name}</h3>
                    <span className="mt-1 block text-ink-soft">{r.short}</span>
                    {r.registration && <span className="mt-3 inline-block rounded-full bg-gold px-3 py-1 text-[0.82rem] font-semibold text-ink">Inscrições abertas</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CARISMA -------------------------------------------------------------- */}
      <Carisma />

      {/* OBRAS E PROJETOS (Fosters) ------------------------------------------- */}
      <section aria-labelledby="obras" className="py-24 md:py-32">
        <div className="wrap grid gap-5 lg:grid-cols-2" data-reveal-stagger="">
          <div className="on-night flex flex-col rounded-[var(--radius-xl)] bg-night p-8 text-on-night md:p-12">
            <h2 id="obras" className="text-[clamp(2rem,1.4rem+2.6vw,3.4rem)]">
              Fé que vira <em className="font-normal italic text-gold-night">cuidado.</em>
            </h2>
            <p className="mt-5 max-w-[46ch] text-on-night-soft">
              Os acampamentos cresceram e a comunidade quis viver o Evangelho também na caridade. Assim nasceram as obras.
            </p>
            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              <details className="group" open>
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.45rem]">
                  Comunidade Terapêutica
                  <span className="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-6 text-on-night-soft">
                  Casa de acolhimento para homens adultos em recuperação da dependência química. Foi construída com doações, a do terreno inclusive, e com a renda de eventos beneficentes.
                </p>
              </details>
              <details className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.45rem]">
                  Casa da Saúde São Padre Pio
                  <span className="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-6 text-on-night-soft">Fundada pela comunidade e inaugurada em abril de 2026, em Rondonópolis.</p>
              </details>
              <details className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.45rem]">
                  Festas que sustentam as obras
                  <span className="text-2xl transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="pb-6 text-on-night-soft">
                  A Festa das Nações e o Festival Divina Brasa reúnem voluntários e a cidade. A renda ajuda a manter as obras e a sede da comunidade.
                </p>
              </details>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/obras-e-projetos" variant="light">Conhecer as obras</ButtonLink>
              <ButtonLink href={whatsappLink(terapeutica.whatsapp!)} variant="ghost-light" icon={false}>
                Falar com a Casa Terapêutica
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[1.3fr_1fr]">
            <Photo photo="festaNacoes" sizes="(min-width: 1024px) 50vw, 100vw" reveal className="min-h-[18rem] rounded-[var(--radius-xl)]" />
            <div className="flex flex-col justify-between rounded-[var(--radius-xl)] bg-sand p-8">
              <p className="font-display text-[1.6rem] leading-snug">
                “Apesar do sucesso dos acampamentos, sentíamos que Deus nos cobrava mais coisas.”
              </p>
              <p className="mt-6 text-sm text-ink-soft">Um dos líderes fundadores, em reportagem do jornal A Tribuna (Rondonópolis), em 2015.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA ---------------------------------------------------------------- */}
      <section aria-labelledby="galeria" className="bg-night py-24 text-on-night md:py-32 on-night">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end" data-reveal-stagger="">
            <SectionTitle id="galeria" tone="dark" lead="Momentos" accent="que ficaram." />
            <TextLink href="/galeria" tone="light">Ver as {galleries.length} galerias ({totalPhotos.toLocaleString("pt-BR")} fotos)</TextLink>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2" data-reveal-stagger="">
            {highlightGalleries.map((g, i) => (
              <li key={g.slug} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <Link href={`/galeria/${g.slug}`} className="group keep-dark relative block h-full min-h-[11rem] overflow-hidden rounded-[var(--radius-md)]">
                  <Photo src={g.cover} alt="" sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="zoom-frame !absolute inset-0" />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-0 left-0 p-4 font-display text-[1.15rem] leading-tight sm:text-[1.3rem]">{g.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="sr-only">Mais fotos da comunidade</h3>
          <PhotoStrip
            photos={stripCovers.map((g) => ({
              slug: g.slug,
              title: g.title,
              cover: g.cover,
              group: g.group,
              groupLabel: groupLabel[g.group] ?? "Galeria",
              published: g.published,
              count: g.images.length,
            }))}
          />
        </div>
      </section>

      {/* PROGRAMAÇÃO DE ORAÇÃO ------------------------------------------------------ */}
      <section aria-labelledby="oracao" className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div data-reveal-stagger="">
            <SectionTitle id="oracao" lead="Quando rezamos" accent="juntos." />
            <Lede className="mt-6">Só publicamos aqui horários confirmados. Para visitar a adoração ou um grupo pela primeira vez, vale falar antes com a Secretaria de Evangelização.</Lede>
            <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, "Olá! Gostaria de participar de um grupo de oração da Divina Providência.")} className="mt-8">
              Perguntar à secretaria
            </ButtonLink>
          </div>
          <ul className="divide-y divide-ink/12 border-y border-ink/12" data-reveal-stagger="">
            <li className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <span className="font-display text-[1.5rem] leading-tight">Segunda, 19h30</span>
              <span>
                <Link href="/grupos-de-oracao" className="link-draw font-medium">Grupos de oração</Link>
                <span className="mt-1 block text-ink-soft">Horário publicado no site atual da comunidade. Encontros na sede.</span>
              </span>
            </li>
            <li className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <span className="font-display text-[1.5rem] leading-tight">Dia e noite</span>
              <span>
                <Link href="/vida-de-oracao#adoracao" className="link-draw font-medium">Adoração Perpétua</Link>
                <span className="mt-1 block text-ink-soft">Adoração perpétua ao Santíssimo Sacramento, iniciada em 2025. Para saber como participar, fale com a secretaria.</span>
              </span>
            </li>
            <li className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <span className="font-display text-[1.5rem] leading-tight">Agosto</span>
              <span>
                <Link href="/vida-de-oracao#cerco-de-jerico" className="link-draw font-medium">Cerco de Jericó</Link>
                <span className="mt-1 block text-ink-soft">Sete dias de oração. Em 2027, de 9 a 15 de agosto.</span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* VÍDEOS -------------------------------------------------------------------- */}
      <section aria-labelledby="videos" className="bg-sand py-24 md:py-32">
        <div className="wrap grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end" data-reveal-stagger="">
          <VideoFacade id={videos[9].id} title={videos[9].title} />
          <div>
            <SectionTitle id="videos" lead="Assista" accent="no nosso canal." />
            <Lede className="mt-6">Missas, as noites do Cerco de Jericó, o Divina Jovem e o Divinacast estão no YouTube da comunidade.</Lede>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/videos">Ver os vídeos</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DO LEMA ------------------------------------------------------------ */}
      <div className="on-night bg-night py-8 text-on-night md:py-10" aria-hidden="true">
        <Marquee reverse speed={45} className="font-display text-[clamp(2.4rem,1.6rem+3.4vw,4.6rem)] italic leading-none text-gold-night" items={[site.motto, "Venha nos conhecer", site.motto, "Venha nos conhecer"]} />
      </div>

      {/* PARTICIPE / CONTATO ------------------------------------------------------- */}
      <section aria-labelledby="participe" className="py-24 md:py-32">
        <div className="wrap">
          <SectionTitle id="participe" lead="Venha" accent="nos conhecer." />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4" data-reveal-stagger="">
            <li>
              <a href={whatsappLink(evangelizacao.whatsapp!)} target="_blank" rel="noopener noreferrer" className="group lift flex h-full flex-col rounded-[var(--radius-lg)] border border-ink/10 p-6 transition-colors hover:border-gold/70 hover:bg-gold/5">
                <BrandIcon name="whatsapp" width={26} height={26} className="text-gold-deep" />
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight">Secretaria de Evangelização</h3>
                <p className="mt-2 text-ink-soft">Acampamentos, retiros, grupos e inscrições.</p>
                <span className="sr-only">(WhatsApp, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={whatsappLink(terapeutica.whatsapp!)} target="_blank" rel="noopener noreferrer" className="group lift flex h-full flex-col rounded-[var(--radius-lg)] border border-ink/10 p-6 transition-colors hover:border-gold/70 hover:bg-gold/5">
                <BrandIcon name="whatsapp" width={26} height={26} className="text-gold-deep" />
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight">Casa Terapêutica</h3>
                <p className="mt-2 text-ink-soft">Para famílias que procuram acolhimento.</p>
                <span className="sr-only">(WhatsApp, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="group lift flex h-full flex-col rounded-[var(--radius-lg)] border border-ink/10 p-6 transition-colors hover:border-gold/70 hover:bg-gold/5">
                <MapPin size={26} className="text-gold-deep" aria-hidden="true" />
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight">Visite a sede</h3>
                <p className="mt-2 text-ink-soft">Rua Padre Anchieta, Vila Goulart.</p>
                <span className="sr-only">(Google Maps, abre em nova aba)</span>
              </a>
            </li>
            <li>
              <Link href="/loja" className="group lift flex h-full flex-col rounded-[var(--radius-lg)] bg-night p-6 text-on-night">
                <ArrowRight size={26} className="text-gold-night" aria-hidden="true" />
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight">Inscrições</h3>
                <p className="mt-2 text-on-night-soft">Retiros e produtos com pagamento online.</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
