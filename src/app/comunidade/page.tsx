import type { Metadata } from "next";
import { ButtonLink, Lede, PageHeader, Photo, Section, SectionTitle } from "@/components/ui";
import { Carisma } from "@/components/Carisma";
import { contacts, site, timeline, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Nossa comunidade",
  description: "História, carisma, missão e espiritualidade da Comunidade Divina Providência, associação privada de fiéis da Diocese de Rondonópolis-Guiratinga, fundada em 1998.",
  alternates: { canonical: "/comunidade" },
};

export default function Page() {
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Nossa comunidade" }]}
        lead="Quem somos"
        accent="e por que existimos."
        intro="A Comunidade Divina Providência é uma associação de fiéis leigos católicos da Diocese de Rondonópolis-Guiratinga, fundada em 1998. Nosso lema diz o que buscamos: sua família, nossa missão."
        photo="missaBispo"
      />

      <Section tone="sand" labelledBy="missao">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle id="missao" lead="Nossa missão" />
            <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
              <p>
                O Estatuto Canônico resume a vocação da comunidade em quatro verbos: instruir, aconselhar, consolar e confortar as famílias, das crianças aos casais. Para isso ela evangeliza e restaura famílias com acampamentos, retiros, grupos de oração, visitas e acompanhamento, em comunhão com a {site.diocese}.
              </p>
              <p>
                A missão também passa pela caridade: a Comunidade Terapêutica Divina Providência trabalha na prevenção e na reabilitação de dependentes químicos e no cuidado de suas famílias.
              </p>
            </div>
          </div>
          <div>
            <SectionTitle as="h2" lead="Associação de fiéis" />
            <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
              <p>
                Fundada em janeiro de 1998 e registrada como associação em janeiro de 2008, a Divina Providência teve o seu Estatuto Canônico aprovado por Dom Juventino Kestering em 23 de setembro de 2020. Desde então é uma associação privada de fiéis leigos católicos, segundo o Código de Direito Canônico.
              </p>
              <p>
                Os membros comprometidos assumem o carisma como opção de vida fraterna e de serviço à comunidade, à paróquia e à diocese; os participantes colaboram sem esse vínculo. Para ingressar é preciso ter 21 anos completos e fazer a formação inicial, de 12 encontros ao longo de um ano. Em missas como a do Compromisso, em 2024, e a dos seis anos de aliança, em 2026, os membros renovam esse compromisso.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Carisma id="carisma" />

      <Section labelledBy="historia" id="historia">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <SectionTitle id="historia" lead="Nossa" accent="história." />
            <Lede className="mt-6">Os marcos abaixo vêm do Estatuto Canônico da comunidade, de reportagens da imprensa local e dos canais oficiais da comunidade.</Lede>
          </div>
          <ol className="relative border-l border-gold/70 pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.45rem] top-2 h-3 w-3 rounded-full border-2 border-gold bg-paper" aria-hidden="true" />
                <p className="font-display text-[2.2rem] leading-none text-gold-deep tabular">{t.year}</p>
                <h3 className="mt-2 font-display text-[1.6rem] leading-tight">{t.title}</h3>
                <p className="mt-2 max-w-[60ch] text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="sand" labelledBy="espiritualidade">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Photo photo="cercoAltar" sizes="(min-width: 1024px) 45vw, 100vw" reveal className="arch aspect-[4/5]" />
          <div>
            <SectionTitle id="espiritualidade" lead="Espiritualidade" accent="e vida de oração." />
            <ul className="mt-8 divide-y divide-ink/12 border-y border-ink/12">
              <li className="py-5">
                <h3 className="font-display text-[1.5rem]">Adoração Perpétua</h3>
                <p className="mt-1 text-ink-soft">Adoração ao Santíssimo Sacramento, iniciada em 2025. A missa de um ano foi celebrada em 2026.</p>
              </li>
              <li className="py-5">
                <h3 className="font-display text-[1.5rem]">Cerco de Jericó</h3>
                <p className="mt-1 text-ink-soft">Sete dias de oração todo mês de agosto, transmitidos pelo YouTube.</p>
              </li>
              <li className="py-5">
                <h3 className="font-display text-[1.5rem]">Grupos de oração</h3>
                <p className="mt-1 text-ink-soft">Quatro grupos semanais na sede, entre eles um infantil, um de adolescentes e um de jovens.</p>
              </li>
              <li className="py-5">
                <h3 className="font-display text-[1.5rem]">Devoção a Nossa Senhora</h3>
                <p className="mt-1 text-ink-soft">Um dos grupos leva o nome de Mãe da Divina Providência.</p>
              </li>
            </ul>
            <ButtonLink href="/vida-de-oracao" className="mt-8">Vida de oração</ButtonLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="organizacao">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionTitle id="organizacao" lead="Como nos" accent="organizamos." />
            <Lede className="mt-6">
              Pelo Estatuto Canônico, a comunidade é dirigida por um Conselho Administrativo e presta contas à Assembleia Geral dos membros. Nenhum cargo é remunerado. Os nomes da coordenação serão publicados aqui depois de validados pela própria comunidade.
            </Lede>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2" data-reveal-stagger="">
            {[
              { t: "Conselho Administrativo", d: "Dirige a comunidade. Reúne o fundador, o coordenador geral, o diretor espiritual e os representantes dos núcleos, com mandato de dois anos." },
              { t: "Diretor espiritual", d: "Sacerdote indicado pelo bispo diocesano para um período de três anos, que pode ser renovado uma vez." },
              { t: "Núcleos", d: "Evangelização, Formação, Administração e Intercessão, ao lado da coordenação da Comunidade Terapêutica." },
              { t: "Diretoria e Conselho Fiscal", d: "O Núcleo de Administração é a diretoria da associação. O Conselho Fiscal, eleito em assembleia, acompanha as contas." },
            ].map((x) => (
              <li key={x.t} className="rounded-[var(--radius-lg)] border border-ink/10 p-6">
                <h3 className="font-display text-[1.4rem] leading-tight">{x.t}</h3>
                <p className="mt-2 text-ink-soft">{x.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-xl)] bg-night p-8 text-on-night md:p-12 on-night">
          <p className="max-w-[40ch] font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-tight">Quer conhecer a comunidade de perto?</p>
          <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, "Olá! Gostaria de conhecer a Comunidade Divina Providência.")} variant="light">
            Falar com a secretaria
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
