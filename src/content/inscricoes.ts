/**
 * Inscrições abertas pela comunidade. Migradas dos produtos do WooCommerce antigo
 * (adivinaprovidencia.com.br/produto/…, consultados em 28/11/2026): mesmo slug, nome, valor,
 * pré-requisitos e campos obrigatórios (nome do participante, celular e CPF).
 *
 * Como o novo site não tem checkout próprio (ver docs/MIGRACAO_DOMINIO.md, "Pagamento online"),
 * a inscrição é enviada pelo WhatsApp à Secretaria de Evangelização, que confirma a vaga e
 * passa as orientações de pagamento. Nada é guardado por este site.
 *
 * Para abrir uma nova inscrição, acrescente um item aqui e aponte o `registration` do evento
 * (content/events.ts) e do programa (content/programs.ts) para `/inscricoes/{slug}`.
 */

export type Inscricao = {
  /** Mesmo slug do produto antigo: /produto/{slug}/ redireciona para /inscricoes/{slug} */
  slug: string;
  /** Nome completo, como aparecia na loja */
  name: string;
  /** Modalidade (retirante, servo…) */
  role: string;
  roleDescription: string;
  eventSlug: string;
  programHref?: string;
  price: number;
  /** Arte de divulgação (caminho do acervo migrado) */
  image: { src: string; alt: string };
  requirements: string[];
  organizers: string;
  /** Telefone que recebe as inscrições (Secretaria de Evangelização) */
  whatsapp: string;
};

const evangelizacao = "5566999082128";

const despertaRequirements = [
  "Retiro exclusivo para jovens que já fizeram um destes acampamentos:",
  "Acampamento FAC (a partir de 17 anos)",
  "Acampamento Juvenil",
  "Acampamento Sênior (até 30 anos de idade)",
];

export const inscricoes: Inscricao[] = [
  {
    slug: "retiro-desperta26-retirante",
    name: "Retiro Desperta 2026 | Retirante",
    role: "Retirante",
    roleDescription: "Para quem vai viver o retiro.",
    eventSlug: "retiro-desperta-2026",
    programHref: "/retiros/desperta",
    price: 120,
    image: { src: "2026/11/IMG_3902-copiar.jpg", alt: "Arte do Retiro Desperta 2026, inscrição de retirante" },
    requirements: despertaRequirements,
    organizers: "Comunidade Divina Providência e Jovens Diante do Altar",
    whatsapp: evangelizacao,
  },
  {
    slug: "retiro-desperta-2026-servo",
    name: "Retiro Desperta 2026 | Servo",
    role: "Servo",
    roleDescription: "Para quem vai servir na equipe que organiza o retiro.",
    eventSlug: "retiro-desperta-2026",
    programHref: "/retiros/desperta",
    price: 100,
    image: { src: "2026/11/IMG_3901-copiar.jpg", alt: "Arte do Retiro Desperta 2026, inscrição de servo" },
    requirements: despertaRequirements,
    organizers: "Comunidade Divina Providência e Jovens Diante do Altar",
    whatsapp: evangelizacao,
  },
];

export const getInscricao = (slug: string) => inscricoes.find((i) => i.slug === slug);
export const inscricaoHref = (slug: string) => `/inscricoes/${slug}`;
