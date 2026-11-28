import type { PhotoKey } from "./site";

/**
 * Agenda. Fontes:
 *  - Retiro Desperta 2026: produtos de inscrição do site oficial (consulta 26/11/2026).
 *  - Itens de 2027: "Calendário Oficial 2027" publicado no Instagram @adivinaprovidencia em 19/11/2026
 *    ("Programação sujeita a alterações"). O calendário não traz horários nem locais, exceto
 *    "Noite Católica – Sede". Nenhum horário ou local foi acrescentado aqui.
 */

export type EventCategory = "acampamento" | "retiro" | "oracao" | "festival" | "festa" | "formacao" | "diocese" | "comunidade";

export const categoryLabel: Record<EventCategory, string> = {
  acampamento: "Acampamento",
  retiro: "Retiro",
  oracao: "Oração",
  festival: "Festival",
  festa: "Festa beneficente",
  formacao: "Formação",
  diocese: "Diocese",
  comunidade: "Comunidade",
};

export type CommunityEvent = {
  slug: string;
  title: string;
  category: EventCategory;
  start: string; // AAAA-MM-DD
  end?: string;
  place?: string;
  time?: string;
  summary: string;
  programHref?: string; // página do programa recorrente
  photo?: PhotoKey;
  registration?: { label: string; url: string; price?: string }[];
  source: "site" | "calendario-2027";
};

export const events: CommunityEvent[] = [
  {
    slug: "retiro-desperta-2026",
    title: "Retiro Desperta 2026",
    category: "retiro",
    start: "2026-12-05",
    end: "2026-12-06",
    summary: "Retiro para jovens que já fizeram o FAC (a partir de 17 anos), o Juvenil ou o Sênior (até 30 anos). Tema: “Voltei pra casa”.",
    programHref: "/retiros/desperta",
    registration: [
      { label: "Inscrição de retirante", url: "/inscricoes/retiro-desperta26-retirante", price: "R$ 120,00" },
      { label: "Inscrição de servo", url: "/inscricoes/retiro-desperta-2026-servo", price: "R$ 100,00" },
    ],
    source: "site",
  },
  { slug: "retorno-das-atividades-2027", title: "Retorno das atividades", category: "comunidade", start: "2027-01-25", summary: "A comunidade retoma a programação do ano.", source: "calendario-2027" },
  { slug: "acampamento-juvenil-2027", title: "Acampamento Juvenil", category: "acampamento", start: "2027-02-06", end: "2027-02-09", summary: "18ª edição, para jovens de 18 a 24 anos. Pré-inscrições de 30 de novembro a 7 de dezembro de 2026.", programHref: "/acampamentos/juvenil", source: "calendario-2027" },
  { slug: "forma-divina-2027", title: "Forma Divina", category: "formacao", start: "2027-02-22", end: "2027-02-28", summary: "Semana do Forma Divina no calendário da comunidade.", source: "calendario-2027" },
  { slug: "romaria-dos-martires-2027", title: "Romaria dos Mártires", category: "diocese", start: "2027-03-07", summary: "Romaria que consta no calendário da comunidade.", source: "calendario-2027" },
  { slug: "retiro-mulheres-2027", title: "Retiro das Mulheres", category: "retiro", start: "2027-03-20", end: "2027-03-21", summary: "Retiro para mulheres.", programHref: "/retiros/mulheres", source: "calendario-2027" },
  { slug: "via-sacra-2027", title: "Via Sacra encenada", category: "oracao", start: "2027-03-22", summary: "Encenação da Via Sacra.", source: "calendario-2027" },
  { slug: "acampamento-rs-2027", title: "Acampamento RS", category: "acampamento", start: "2027-04-07", end: "2027-04-11", summary: "Acampamento previsto no calendário oficial. A secretaria informa o público e as inscrições.", source: "calendario-2027" },
  { slug: "acampamento-mirim-2027", title: "Acampamento Mirim", category: "acampamento", start: "2027-04-29", end: "2027-05-02", summary: "O acampamento das crianças.", programHref: "/acampamentos/mirim", source: "calendario-2027" },
  { slug: "curso-5-linguagens-2027", title: "Curso 5 Linguagens do Amor", category: "formacao", start: "2027-05-15", end: "2027-05-16", summary: "Curso sobre o amor no casamento e na família.", programHref: "/retiros/cinco-linguagens-do-amor", photo: "cincoLinguagens", source: "calendario-2027" },
  { slug: "festa-das-nacoes-2027", title: "Festa das Nações", category: "festa", start: "2027-06-04", end: "2027-06-05", summary: "A festa beneficente mais tradicional da comunidade.", photo: "festaNacoes", source: "calendario-2027" },
  { slug: "acampamento-casais-2027", title: "Acampamento de Casais", category: "acampamento", start: "2027-06-25", end: "2027-06-27", summary: "Um fim de semana para o casal.", programHref: "/acampamentos/casais", source: "calendario-2027" },
  { slug: "luau-2027", title: "Luau", category: "comunidade", start: "2027-07-03", summary: "Noite de música e encontro.", source: "calendario-2027" },
  { slug: "acampamento-senior-2027", title: "Acampamento Sênior", category: "acampamento", start: "2027-07-21", end: "2027-07-25", summary: "O acampamento com mais edições na história da comunidade.", programHref: "/acampamentos/senior", photo: "chegadaSenior", source: "calendario-2027" },
  { slug: "festa-do-seminario-2027", title: "Festa do Seminário", category: "diocese", start: "2027-08-01", summary: "Festa que consta no calendário da comunidade.", source: "calendario-2027" },
  { slug: "noite-catolica-2027", title: "Noite Católica", category: "comunidade", start: "2027-08-02", place: "Sede da comunidade", summary: "Noite Católica na sede.", source: "calendario-2027" },
  { slug: "cerco-de-jerico-2027", title: "Cerco de Jericó", category: "oracao", start: "2027-08-09", end: "2027-08-15", summary: "Sete dias de oração, terminando com a Queda das Muralhas.", programHref: "/vida-de-oracao#cerco-de-jerico", photo: "cercoAltar", source: "calendario-2027" },
  { slug: "missa-2-anos-adoracao-2027", title: "Missa de 2 anos da Adoração Perpétua", category: "oracao", start: "2027-08-31", summary: "Missa em ação de graças pelos dois anos de adoração perpétua.", programHref: "/vida-de-oracao#adoracao", photo: "capela", source: "calendario-2027" },
  { slug: "acampamento-fac-2027", title: "Acampamento FAC", category: "acampamento", start: "2027-09-04", end: "2027-09-07", summary: "Formação de Adolescentes Cristãos.", programHref: "/acampamentos/fac", source: "calendario-2027" },
  { slug: "divina-brasa-2027", title: "Festival Divina Brasa", category: "festa", start: "2027-09-18", summary: "Churrasco e shows em benefício da sede da comunidade.", photo: "divinaBrasa", source: "calendario-2027" },
  { slug: "acampamento-ii-2027", title: "Acampamento II", category: "acampamento", start: "2027-09-30", end: "2027-10-03", summary: "Acampamento previsto no calendário oficial. A secretaria informa o público e as inscrições.", source: "calendario-2027" },
  { slug: "divina-jovem-2027", title: "Divina Jovem", category: "festival", start: "2027-10-22", end: "2027-10-24", summary: "Festival católico com shows e pregações.", programHref: "/agenda#divina-jovem", photo: "divinaJovem", source: "calendario-2027" },
  { slug: "assembleia-diocesana-2027", title: "Assembleia Diocesana de Pastoral", category: "diocese", start: "2027-11-19", end: "2027-11-21", summary: "Assembleia da Diocese de Rondonópolis-Guiratinga.", source: "calendario-2027" },
  { slug: "retiro-homens-2027", title: "Retiro de Homens", category: "retiro", start: "2027-11-20", end: "2027-11-21", summary: "Retiro para homens.", programHref: "/retiros/homens-de-fe", photo: "homensDeFe", source: "calendario-2027" },
  { slug: "desperta-2027", title: "Desperta", category: "retiro", start: "2027-12-04", end: "2027-12-05", summary: "Retiro para jovens que já viveram um dos acampamentos.", programHref: "/retiros/desperta", source: "calendario-2027" },
  { slug: "encerramento-2027", title: "Encerramento das atividades", category: "comunidade", start: "2027-12-06", summary: "Encerramento da programação do ano.", source: "calendario-2027" },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
