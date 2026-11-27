import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, FactList, Lede, Note, PageHeader, Section, SectionTitle } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { prayerGroups } from "@/content/programs";
import { address, contacts, mapsEmbed, mapsLink, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Grupos de oração",
  description: "Os quatro grupos de oração da Comunidade Divina Providência: GOI Menino Jesus, FAC, Jovens Diante do Altar e Mãe da Divina Providência.",
  alternates: { canonical: "/grupos-de-oracao" },
};

export default function Page() {
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Grupos de oração" }]}
        lead="Grupos"
        accent="de oração."
        intro="Toda semana a comunidade se reúne em grupos de oração na sede. É a forma mais simples de começar a participar."
      >
        <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, "Olá! Quero participar de um grupo de oração. Qual é o melhor para mim?")}>
          Quero participar
        </ButtonLink>
      </PageHeader>

      <Section tone="sand" labelledBy="grupos">
        <h2 id="grupos" className="sr-only">Os grupos</h2>
        <ul className="grid gap-5 md:grid-cols-2">
          {prayerGroups.map((g) => (
            <li key={g.slug} className="flex flex-col rounded-[var(--radius-xl)] bg-paper p-8 md:p-10">
              <div className="flex h-36 items-center">
                <Image src={g.logo} alt={`Logotipo do ${g.fullName}`} width={g.logoW} height={g.logoH} className="max-h-36 w-auto max-w-[70%] object-contain" />
              </div>
              <h3 className="mt-8 font-display text-[1.9rem] leading-tight">{g.name}</h3>
              <p className="mt-1 text-ink-soft">{g.fullName}</p>
              <p className="mt-5 inline-flex w-fit rounded-full bg-sand px-3 py-1 text-sm font-medium">{g.audience}</p>
              {g.note && <p className="mt-4 text-ink-soft">{g.note}</p>}
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="quando">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle id="quando" lead="Quando" accent="e onde." />
            <FactList
              facts={[
                { label: "Dia e horário", value: "Segunda-feira, às 19h30" },
                { label: "Local", value: `Sede da comunidade · ${address.street}, ${address.district}` },
                { label: "Primeira vez", value: "A secretaria indica o grupo certo para a sua idade." },
              ]}
            />
            <Note className="mt-6">
              O horário de segunda-feira às 19h30 é o que aparece no site atual da comunidade. Antes da primeira visita, confirme com a Secretaria de Evangelização o dia de cada grupo.
            </Note>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, "Olá! Gostaria de confirmar o dia e o horário dos grupos de oração.")}>
                <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={17} height={17} /> Confirmar horário</span>
              </ButtonLink>
              <ButtonLink href={mapsLink} variant="ghost">Como chegar</ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-ink/10">
            <iframe title="Mapa da sede da Comunidade Divina Providência" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[22rem] w-full" />
          </div>
        </div>
      </Section>
      <Section tone="sand">
        <Lede>
          Adolescentes e jovens que passaram pelo FAC ou pelo Juvenil continuam a formação nesses grupos, como descreve a Diocese de Rondonópolis-Guiratinga.
        </Lede>
      </Section>
    </>
  );
}
