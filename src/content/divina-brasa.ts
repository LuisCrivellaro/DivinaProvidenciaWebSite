/**
 * Festival Divina Brasa — migrado das landing pages do WordPress antigo
 * (/festival-divina-brasa/ e /festival-divina-brasa-3/, consultadas em 28/11/2026).
 * Só o que estava publicado lá; nada acrescentado. Imagens no acervo migrado (public/media).
 */

export const divinaBrasa = {
  logo: { src: "2026/01/logo-divina-brasa-bx.png", alt: "Logo do Festival Divina Brasa" },
  attractions: { src: "2026/02/atracoes-divina-brasa-copiar.png", alt: "Arte com os artistas que se apresentaram no Festival Divina Brasa 2026" },
  banner: { src: "2026/02/banner-site-divina-brasa-copiar.jpg", alt: "Banner do Festival Divina Brasa 2026" },
  instagram: "https://www.instagram.com/festivaldivinabrasa/",
  /** WhatsApp publicado na página antiga para quem quer patrocinar o festival */
  sponsorWhatsapp: "5566999559814",
  tagline: "O evento mais rústico da Comunidade Divina Providência.",
  pitch: "São 14 estações de churrasco, com carnes nobres para saborear à vontade, e shows ao vivo.",
  highlights: [
    { value: "14", label: "estações", text: "Uma imersão completa, com diferentes cortes e técnicas." },
    { value: "Carnes", label: "nobres", text: "Seleção rigorosa de carnes e acompanhamentos." },
    { value: "5", label: "horas de serviço", text: "Carne à vontade servida durante as 5 horas de evento." },
  ],
  purpose:
    "Toda a renda é revertida para a manutenção e a ampliação da sede da Comunidade Divina Providência, para que os projetos de evangelização e acolhimento cheguem a mais pessoas.",
  ageRules: ["Crianças de 0 a 8 anos não pagam.", "De 9 a 12 anos pagam meia-entrada."],
  payment: ["Dinheiro", "Pix", "Visa", "Mastercard", "Elo", "Diners", "American Express"],
  edition2026: {
    date: "2026-03-28",
    weekday: "Sábado",
    time: "18h",
    place: "Sede da Comunidade Divina Providência, Rondonópolis (MT)",
    lots: [
      { label: "1º lote", price: 150 },
      { label: "2º lote", price: 170 },
      { label: "3º lote", price: 190 },
    ],
    /** Venda feita pela Total Ingressos (plataforma externa, não pelo site antigo) */
    ticketsUrl: "https://totalingressos.com/evento/9440/28-03-2026-divina-brasa-rondonopolis/ingressos",
  },
  organizer: { src: "2026/02/logo-divina-1.png", alt: "Comunidade Divina Providência" },
  diamond: [
    { src: "2026/03/Climar-Logo-1.png", alt: "Climar Locações" },
    { src: "2026/03/logo-colorido-copiar.png", alt: "A Carne do Futuro é Animal" },
    { src: "2026/02/GrupoBag-Logotype.png", alt: "Grupo Bag" },
  ],
  sponsors: [
    { src: "2026/02/06.jpg", alt: "Agra Foods" },
    { src: "2026/02/05.jpg", alt: "Acrismat" },
    { src: "2026/02/04.jpg", alt: "Posto Fórum" },
    { src: "2026/02/03.jpg", alt: "Iguaçu Máquinas John Deere" },
    { src: "2026/02/02.jpg", alt: "Gravataí Agro" },
    { src: "2026/02/01-copiar.jpg", alt: "Fribon Transportes" },
    { src: "2026/02/08.jpg", alt: "Locks" },
    { src: "2026/02/09-1.jpg", alt: "Rodovita Transportes" },
  ],
  /** Página antiga da Festa Junina (2023): só o cartaz e um WhatsApp para ingressos. Guardado como registro. */
  festaJunina2023: { src: "2023/06/Atracoes-Whats-copiar.jpg", alt: "Cartaz das atrações da Festa Junina 2023 da Comunidade Divina Providência" },
} as const;
