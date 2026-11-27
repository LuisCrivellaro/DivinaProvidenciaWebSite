import type { PhotoKey } from "./site";

/**
 * Programas recorrentes da comunidade. Os textos descrevem apenas o que as fontes confirmam.
 * Onde a informação não é pública (idade exata, valores, documentos), a página orienta a falar
 * com a secretaria em vez de supor.
 */

export type Program = {
  slug: string;
  name: string;
  short: string; // uma linha para cartões
  audience: string;
  intro: string[]; // parágrafos
  facts: { label: string; value: string }[];
  photo?: PhotoKey; // ausente em programas de crianças/adolescentes: usamos composição tipográfica
  brandMark?: string; // logotipo do grupo, quando existe
  gallerySlugs: string[]; // galerias relacionadas (galleries.json)
  nextEventSlug?: string; // events.ts
  registration?: { label: string; url: string; price?: string }[];
  minors?: boolean;
};

export const camps: Program[] = [
  {
    slug: "mirim",
    name: "Acampamento Mirim",
    short: "O acampamento das crianças.",
    audience: "Crianças",
    intro: [
      "O Mirim é o acampamento das crianças. Em 2026 a comunidade realizou a 18ª edição.",
      "Idade mínima e máxima, valores, documentos e autorização dos responsáveis são informados pela Secretaria de Evangelização quando as inscrições abrem.",
    ],
    facts: [
      { label: "Público", value: "Crianças" },
      { label: "Última edição", value: "18ª, em 2026" },
      { label: "Próxima", value: "29 de abril a 2 de maio de 2027" },
    ],
    gallerySlugs: ["18-acampamento-mirim", "17-acampamento-mirim", "16-acampamento-mirim-2024", "chegada-15-acampamento-mirim"],
    nextEventSlug: "acampamento-mirim-2027",
    minors: true,
  },
  {
    slug: "juvenil",
    name: "Acampamento Juvenil",
    short: "Para jovens de 18 a 24 anos, no começo do ano.",
    audience: "Jovens de 18 a 24 anos",
    intro: [
      "O Juvenil é para jovens de 18 a 24 anos, segundo o anúncio da edição de 2027 no Instagram da comunidade. Segundo a Diocese, a comunidade acompanha esses jovens depois do acampamento nos grupos semanais que se encontram na sede.",
      "A 17ª edição aconteceu em fevereiro de 2026, e a 18ª está marcada para 6 a 9 de fevereiro de 2027, com pré-inscrições de 30 de novembro a 7 de dezembro de 2026. Quem fez o Juvenil pode participar do Retiro Desperta.",
    ],
    facts: [
      { label: "Público", value: "Jovens de 18 a 24 anos" },
      { label: "Última edição", value: "17ª, em fevereiro de 2026" },
      { label: "Próxima", value: "18ª, de 6 a 9 de fevereiro de 2027" },
      { label: "Pré-inscrições", value: "30 de novembro a 7 de dezembro de 2026" },
    ],
    gallerySlugs: ["17-acampamento-juvenil", "16-acampamento-juvenil", "15-acampamento-juvenil-2024", "chegada-14-acampamento-juvenil", "chegada-13o-acampamento-juvenil-2022"],
    nextEventSlug: "acampamento-juvenil-2027",
    minors: true,
  },
  {
    slug: "fac",
    name: "Acampamento FAC",
    short: "Formação de Adolescentes Cristãos.",
    audience: "Adolescentes",
    intro: [
      "FAC quer dizer Formação de Adolescentes Cristãos. É também o nome de um dos grupos de oração da comunidade, que continua o caminho começado no acampamento.",
      "A 20ª edição aconteceu em setembro de 2026. Quem fez o FAC e tem a partir de 17 anos pode participar do Retiro Desperta.",
    ],
    facts: [
      { label: "Público", value: "Adolescentes" },
      { label: "Última edição", value: "20ª, em setembro de 2026" },
      { label: "Próxima", value: "4 a 7 de setembro de 2027" },
    ],
    brandMark: "/brand/grupo-fac.png",
    gallerySlugs: ["20-acampamento-fac", "18-acampamento-fac", "17-acampamento-fac-2024"],
    nextEventSlug: "acampamento-fac-2027",
    minors: true,
  },
  {
    slug: "senior",
    name: "Acampamento Sênior",
    short: "O acampamento com mais edições: 25 até 2026.",
    audience: "Jovens e adultos",
    intro: [
      "O Sênior chegou à 25ª edição em julho de 2026, o que faz dele o acampamento com mais edições na história da comunidade.",
      "Os dias são vividos em tribos, com equipes de trabalho formadas por servos. Quem fez o Sênior e tem até 30 anos pode participar do Retiro Desperta.",
    ],
    facts: [
      { label: "Público", value: "Jovens e adultos" },
      { label: "Última edição", value: "25ª, em julho de 2026" },
      { label: "Próxima", value: "21 a 25 de julho de 2027" },
    ],
    photo: "hero",
    gallerySlugs: ["25-acampamento-senior", "chegada-24-acampamento-senior", "23-acampamento-senior", "chegada-22-acampamento-senior", "chegada-21o-acampamento-senior", "tribos-21o-acampamento-senior", "equipes-de-trabalho-21o-acampamento-senior", "bota-fora-21o-senior"],
    nextEventSlug: "acampamento-senior-2027",
  },
  {
    slug: "casais",
    name: "Acampamento de Casais",
    short: "Um fim de semana para o casal.",
    audience: "Casais",
    intro: [
      "Está no calendário oficial de 2027, de 25 a 27 de junho. A Secretaria de Evangelização passa os detalhes de participação quando as inscrições abrirem.",
    ],
    facts: [
      { label: "Público", value: "Casais" },
      { label: "Próxima", value: "25 a 27 de junho de 2027" },
    ],
    photo: "cincoLinguagens",
    gallerySlugs: [],
    nextEventSlug: "acampamento-casais-2027",
  },
];

export const retreats: Program[] = [
  {
    slug: "desperta",
    name: "Retiro Desperta",
    short: "Para quem já viveu o FAC, o Juvenil ou o Sênior.",
    audience: "Jovens que já fizeram FAC (a partir de 17 anos), Juvenil ou Sênior (até 30 anos)",
    intro: [
      "O Desperta é um retiro para jovens que já passaram por um dos acampamentos da comunidade. A edição de 2026 é organizada com o grupo Jovens Diante do Altar e traz o tema “Voltei pra casa”, a partir de Lucas 15,20: “Quando ainda estava longe, o pai o avistou, e teve compaixão.”",
      "As inscrições são feitas pela loja do site oficial. Há duas formas de participar: como retirante, vivendo o retiro, ou como servo, ajudando a equipe que o organiza.",
    ],
    facts: [
      { label: "Data", value: "5 e 6 de dezembro de 2026" },
      { label: "Quem pode participar", value: "Quem já fez o FAC (a partir de 17 anos), o Juvenil ou o Sênior (até 30 anos)" },
      { label: "Realização", value: "Comunidade Divina Providência e Jovens Diante do Altar" },
      { label: "Horário e local", value: "Confirme com a Secretaria de Evangelização" },
    ],
    brandMark: "/brand/grupo-jda.png",
    gallerySlugs: [],
    photo: "jovensPregacao",
    nextEventSlug: "retiro-desperta-2026",
    registration: [
      { label: "Inscrição de retirante", url: "https://adivinaprovidencia.com.br/produto/retiro-desperta26-retirante/", price: "R$ 120,00" },
      { label: "Inscrição de servo", url: "https://adivinaprovidencia.com.br/produto/retiro-desperta-2026-servo/", price: "R$ 100,00" },
    ],
  },
  {
    slug: "homens-de-fe",
    name: "Retiro Homens de Fé",
    short: "Retiro para homens. A primeira edição foi em 2026.",
    audience: "Homens",
    intro: [
      "A primeira edição do Retiro Homens de Fé aconteceu em abril de 2026. O calendário de 2027 prevê um novo retiro de homens nos dias 20 e 21 de novembro.",
    ],
    facts: [
      { label: "Público", value: "Homens" },
      { label: "Primeira edição", value: "Abril de 2026" },
      { label: "Próximo", value: "20 e 21 de novembro de 2027" },
    ],
    photo: "homensDeFeAbraco",
    gallerySlugs: ["i-retiro-homens-de-fe"],
    nextEventSlug: "retiro-homens-2027",
  },
  {
    slug: "mulheres",
    name: "Retiro das Mulheres",
    short: "Retiro para mulheres, em março.",
    audience: "Mulheres",
    intro: [
      "O Retiro das Mulheres está no calendário oficial de 2027, nos dias 20 e 21 de março. Detalhes de participação com a Secretaria de Evangelização.",
    ],
    facts: [
      { label: "Público", value: "Mulheres" },
      { label: "Próximo", value: "20 e 21 de março de 2027" },
    ],
    gallerySlugs: [],
    nextEventSlug: "retiro-mulheres-2027",
  },
  {
    slug: "cinco-linguagens-do-amor",
    name: "Curso 5 Linguagens do Amor",
    short: "Um fim de semana sobre o amor no casamento e na família.",
    audience: "Casais e famílias",
    intro: [
      "O curso aconteceu em 2026 e volta no calendário de 2027, nos dias 15 e 16 de maio.",
    ],
    facts: [
      { label: "Última edição", value: "2026" },
      { label: "Próxima", value: "15 e 16 de maio de 2027" },
    ],
    photo: "cincoLinguagens",
    gallerySlugs: ["curso-5-linguagens-do-amor-2026"],
    nextEventSlug: "curso-5-linguagens-2027",
  },
];

export type PrayerGroup = {
  slug: string;
  name: string;
  fullName: string;
  audience: string;
  logo: string;
  logoW: number;
  logoH: number;
  note?: string;
};

export const prayerGroups: PrayerGroup[] = [
  { slug: "goi", name: "GOI", fullName: "Grupo de Oração Infantil Menino Jesus", audience: "Crianças", logo: "/brand/grupo-goi.png", logoW: 600, logoH: 252 },
  { slug: "fac", name: "FAC", fullName: "Grupo de Oração FAC — Formação de Adolescentes Cristãos", audience: "Adolescentes", logo: "/brand/grupo-fac.png", logoW: 600, logoH: 191 },
  { slug: "jda", name: "Jovens Diante do Altar", fullName: "Grupo de Oração Jovens Diante do Altar", audience: "Jovens", logo: "/brand/grupo-jda.png", logoW: 600, logoH: 430, note: "Organiza o Retiro Desperta com a comunidade." },
  { slug: "mae", name: "Mãe da Divina Providência", fullName: "Grupo de Oração Mãe da Divina Providência", audience: "Público a confirmar com a secretaria", logo: "/brand/grupo-mae-divina-providencia.png", logoW: 600, logoH: 689 },
];

/** Grandes eventos recorrentes. */
export type BigEvent = {
  slug: string;
  name: string;
  short: string;
  text: string[];
  photo: PhotoKey;
  galleryGroup?: string;
  gallerySlugs: string[];
  nextEventSlug?: string;
  link?: { label: string; href: string };
};

export const bigEvents: BigEvent[] = [
  {
    slug: "cerco-de-jerico",
    name: "Cerco de Jericó",
    short: "Uma semana inteira de oração, todo mês de agosto.",
    text: [
      "Durante sete dias a comunidade se reúne para rezar. O último dia é a Queda das Muralhas. Em 2026 foi de 10 a 16 de agosto, e cada dia ganhou vídeo no canal da comunidade no YouTube.",
    ],
    photo: "cercoAltar",
    gallerySlugs: ["cerco-de-jerico-2025-dia-1", "cerco-de-jerico-2024-7-dia", "cerco-de-jerico-2022"],
    nextEventSlug: "cerco-de-jerico-2027",
  },
  {
    slug: "divina-jovem",
    name: "Divina Jovem",
    short: "Festival católico com shows e pregações.",
    text: [
      "O festival reúne shows e pregações. Em outubro de 2025 o palco recebeu Colo de Deus, Flávio Vitor e Terra da Cruz, e os dois dias estão no canal da comunidade no YouTube. Antes dele acontece o Esquenta Divina Jovem.",
    ],
    photo: "divinaJovem",
    gallerySlugs: ["divina-jovem-2025-pregacoes", "divina-jovem-2025-colo-de-deus", "divina-jovem-2025", "divina-jovem-2024-festival-catolico"],
    nextEventSlug: "divina-jovem-2027",
  },
  {
    slug: "festa-das-nacoes",
    name: "Festa das Nações",
    short: "A festa beneficente mais tradicional da comunidade.",
    text: [
      "A Festa das Nações ajuda a manter as obras da comunidade. Em 2015, quando estava na 6ª edição, a imprensa local registrou entre quatro e cinco mil pessoas na festa e seiscentos voluntários trabalhando.",
    ],
    photo: "festaNacoes",
    gallerySlugs: ["festa-das-nacoes-2025", "festa-das-nacoes-2024", "festa-das-nacoes-2022"],
    nextEventSlug: "festa-das-nacoes-2027",
  },
  {
    slug: "divina-brasa",
    name: "Festival Divina Brasa",
    short: "Churrasco e shows para ampliar a sede.",
    text: [
      "A edição de 28 de março de 2026 teve 14 estações de churrasco e shows ao vivo. Toda a renda foi destinada à manutenção e à ampliação da sede da comunidade.",
    ],
    photo: "divinaBrasa",
    gallerySlugs: ["divina-brasa"],
    nextEventSlug: "divina-brasa-2027",
    link: { label: "Instagram do festival", href: "https://www.instagram.com/festivaldivinabrasa/" },
  },
];
