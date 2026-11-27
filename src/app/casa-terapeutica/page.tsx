import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink, FactList, Lede, Note, PageHeader, Section, SectionTitle } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { contacts, formatPhone, whatsappLink } from "@/content/site";
import { bigEvents } from "@/content/programs";

export const metadata: Metadata = {
  title: "Casa Terapêutica",
  description: "Comunidade Terapêutica Divina Providência: acolhimento de homens adultos em recuperação da dependência química, em Rondonópolis (MT).",
  alternates: { canonical: "/casa-terapeutica" },
};

export default function Page() {
  const t = contacts.find((c) => c.id === "terapeutica")!;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Obras e projetos", href: "/obras-e-projetos" }, { label: "Casa Terapêutica" }]}
        lead="Comunidade"
        accent="Terapêutica."
        intro="A Comunidade Terapêutica Divina Providência acolhe homens adultos que buscam se recuperar da dependência de álcool e outras drogas. Se você procura ajuda para alguém da sua família, comece por uma conversa com a secretaria."
      >
        <ButtonLink href={whatsappLink(t.whatsapp!, "Olá! Gostaria de informações sobre o acolhimento na Comunidade Terapêutica.")}>
          <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={17} height={17} /> Falar com a secretaria</span>
        </ButtonLink>
        {t.email && <ButtonLink href={`mailto:${t.email}`} variant="ghost" icon={false}>Enviar e-mail</ButtonLink>}
      </PageHeader>

      <Section tone="sand" labelledBy="historia-ct">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle id="historia-ct" lead="Como" accent="ela nasceu." />
            <div className="mt-6 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
              <p>
                Em 2015, um dos líderes fundadores contou ao jornal A Tribuna que, com o crescimento dos acampamentos, a comunidade sentiu que precisava viver o Evangelho também na caridade. Dessa decisão nasceu a Comunidade Terapêutica.
              </p>
              <p>
                A construção foi possível com doações, inclusive a do terreno, e com o trabalho de toda a comunidade para levantar recursos em eventos beneficentes. A casa foi inaugurada por volta de 2012.
              </p>
            </div>
          </div>
          <div>
            <SectionTitle as="h2" lead="O que se sabe" accent="publicamente." />
            <FactList
              facts={[
                { label: "Quem é acolhido", value: "Homens maiores de 18 anos com dependência de álcool ou outras drogas (dados de 2015)." },
                { label: "Vagas", value: "30 vagas masculinas (dados de 2020)." },
                { label: "Atividades", value: "Atividades socioeducativas, culturais e esportivas, com cuidado também da vida espiritual (dados de 2015)." },
                { label: "Depois do tratamento", value: "Grupos de apoio para ajudar na manutenção da recuperação (dados de 2015)." },
              ]}
            />
            <Note className="mt-6">
              Critérios de acolhimento, equipe e documentos necessários são informados diretamente pela secretaria. Esta página não substitui orientação profissional de saúde.
            </Note>
          </div>
        </div>
      </Section>

      <Section labelledBy="apoiar">
        <SectionTitle id="apoiar" lead="Como" accent="apoiar." />
        <Lede className="mt-6">A casa não tem fins lucrativos. Os eventos beneficentes da comunidade ajudam a mantê-la.</Lede>
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {bigEvents.filter((b) => b.slug === "festa-das-nacoes" || b.slug === "divina-brasa").map((b) => (
            <li key={b.slug} className="rounded-[var(--radius-lg)] border border-ink/10 p-6">
              <h3 className="font-display text-[1.5rem] leading-tight">{b.name}</h3>
              <p className="mt-2 text-ink-soft">{b.short}</p>
              <Link href={`/agenda#${b.slug}`} className="link-draw mt-4 inline-flex min-h-11 items-center font-medium text-wine">Ver na agenda</Link>
            </li>
          ))}
          <li className="rounded-[var(--radius-lg)] bg-night p-6 text-on-night lg:col-span-2 on-night">
            <h3 className="font-display text-[1.5rem] leading-tight">Fale com a secretaria</h3>
            <p className="mt-2 text-on-night-soft">Para saber como ajudar a casa, fale com a Secretaria da Casa Terapêutica.</p>
            <p className="mt-4 font-medium tabular">{formatPhone(t.whatsapp!)}{t.email ? ` · ${t.email}` : ""}</p>
          </li>
        </ul>
        <Note className="mt-10">
          Para proteger quem está em tratamento, não publicamos fotos nem histórias de acolhidos sem autorização expressa.
        </Note>
      </Section>
    </>
  );
}
