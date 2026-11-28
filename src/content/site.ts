/**
 * Dados institucionais da Comunidade Divina Providência.
 * Cada informação tem origem registrada em docs/CONTENT_SOURCES.md.
 * Não acrescente fatos, nomes ou horários sem fonte verificável.
 */

export const site = {
  name: "Comunidade Divina Providência",
  shortName: "Divina Providência",
  legalName: "Associação Divina Providência",
  city: "Rondonópolis",
  state: "MT",
  motto: "Sua família, nossa missão!",
  // Redação publicada na homepage do site oficial (consultada em 26/11/2026).
  // O Facebook usa uma variação mais longa; a redação do Estatuto Canônico ainda precisa ser confirmada.
  carisma: "Ser sinal da infinita bondade e da infinita misericórdia de Deus na vida das pessoas.",
  diocese: "Diocese de Rondonópolis-Guiratinga",
  url: "https://adivinaprovidencia.com.br",
  description:
    "Comunidade católica de aliança em Rondonópolis (MT). Acampamentos, retiros, grupos de oração, adoração perpétua e a Comunidade Terapêutica Divina Providência.",
} as const;

export const address = {
  street: "Rua Padre Anchieta, s/n",
  district: "Vila Goulart",
  city: "Rondonópolis",
  state: "MT",
  postalCode: "78745-400",
  mapsQuery: "Comunidade Divina Providência - Sede, Rondonópolis MT",
};

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.mapsQuery)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address.mapsQuery)}&t=m&z=15&output=embed&iwloc=near`;

export type Contact = {
  id: "evangelizacao" | "terapeutica" | "secretaria";
  label: string;
  description: string;
  whatsapp?: string; // formato internacional, só dígitos
  phone?: string;
  email?: string;
};

export const contacts: Contact[] = [
  {
    id: "evangelizacao",
    label: "Secretaria de Evangelização",
    description: "Acampamentos, retiros, grupos de oração, eventos e inscrições.",
    whatsapp: "5566999082128",
  },
  {
    id: "terapeutica",
    label: "Secretaria da Casa Terapêutica",
    description: "Comunidade Terapêutica Divina Providência: acolhimento e informações para famílias.",
    whatsapp: "5566996655565",
    email: "cterapeutica@adivinaprovidencia.com.br",
  },
  {
    id: "secretaria",
    label: "Secretaria geral",
    description: "Assuntos institucionais e da Associação.",
    phone: "6634217662",
    email: "secretaria@adivinaprovidencia.com.br",
  },
];

export const social = [
  { id: "instagram", label: "Instagram", handle: "@adivinaprovidencia", href: "https://www.instagram.com/adivinaprovidencia/" },
  { id: "youtube", label: "YouTube", handle: "Comunidade Divina Providência", href: "https://www.youtube.com/@ComunidadeDivinaProvid%C3%AAncia" },
  { id: "facebook", label: "Facebook", handle: "Divina Providência", href: "https://www.facebook.com/adivinaprovidencia" },
] as const;

export function whatsappLink(number: string, text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${number}${q}`;
}

export function formatPhone(digits: string) {
  const d = digits.replace(/\D/g, "").replace(/^55/, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digits;
}

/** Linha do tempo — somente marcos com fonte (ver docs/CONTENT_SOURCES.md). */
export const timeline = [
  // 1998, 2008 e 2020: Estatuto Canônico (art. 1º e data de aprovação, 23/09/2020).
  { year: "1998", title: "Fundação", text: "Em janeiro, a Comunidade Divina Providência começa a existir de fato, reunindo leigos católicos em torno do mesmo carisma." },
  { year: "2008", title: "Associação Divina Providência", text: "Em janeiro, a comunidade é registrada oficialmente como Associação Divina Providência." },
  { year: "2012", title: "Comunidade Terapêutica", text: "Por volta de 2012 é inaugurada a casa de acolhimento para homens em recuperação da dependência química, erguida com doações e eventos beneficentes." },
  { year: "2020", title: "Estatuto Canônico", text: "Em 23 de setembro, Dom Juventino Kestering aprova o Estatuto Canônico. A Divina Providência passa a ser uma associação privada de fiéis da Diocese de Rondonópolis-Guiratinga." },
  { year: "2025", title: "Adoração Perpétua", text: "Começa a adoração perpétua ao Santíssimo Sacramento, que completou um ano em 2026." },
  { year: "2026", title: "Casa da Saúde São Padre Pio", text: "A comunidade inaugura a Casa da Saúde São Padre Pio, em Rondonópolis." },
] as const;

/** Fotos oficiais escolhidas a dedo (adultos; nenhuma criança em destaque). Caminho do acervo migrado (src/lib/media.ts). */
export const photos = {
  // Hero da home (28/11/2026): 1920 px, nítida em telas grandes. "hero" continua na página do Acampamento Sênior.
  heroCerco: { src: "2022/08/cerco-jerico-da-comunidade-divina-providencia-363.jpg", alt: "Multidão reunida em oração ao ar livre no Cerco de Jericó 2022, ao pôr do sol, com o céu dourado atrás das árvores" },
  hero: { src: "2026/07/DLS0930.jpg", alt: "Participantes do 25º Acampamento Sênior, de camisetas brancas com o rosto de Cristo, diante do palco iluminado e dos estandartes" },
  missaCompromisso: { src: "2024/10/DLS5605.jpg", alt: "O bispo celebra a Missa do Compromisso no altar da sede, com o logotipo da Divina Providência ao fundo" },
  missaBispo: { src: "2024/10/DLS5565.jpg", alt: "Celebrante no altar durante a Missa do Compromisso de 2024" },
  cercoAltar: { src: "2024/08/cerco-jerico-divina-providencia-7dia-23.jpg", alt: "Missa no último dia do Cerco de Jericó 2024, com incenso e ministros ao redor do altar" },
  cercoPalco: { src: "2025/08/DLS0522.jpg", alt: "Pregação no palco do Cerco de Jericó 2025 diante de uma multidão" },
  capela: { src: "2026/09/DLS5211.jpg", alt: "Capela iluminada à noite, com a cruz no alto, na missa de um ano da Adoração Perpétua" },
  homensDeFe: { src: "2026/04/Retiro-Homens-de-Fe-47.jpg", alt: "Homem em oração com as mãos erguidas durante o I Retiro Homens de Fé" },
  homensDeFeAbraco: { src: "2026/04/Retiro-Homens-de-Fe-5.jpg", alt: "Dois participantes se abraçam sorrindo durante o I Retiro Homens de Fé" },
  retiroLouvor: { src: "2026/04/Retiro-Homens-de-Fe-14.jpg", alt: "Participantes do I Retiro Homens de Fé louvam de mãos erguidas no salão da sede" },
  adoracaoAltar: { src: "2026/09/DLS5301.jpg", alt: "Sacerdote no altar da capela, diante do crucifixo, na missa de um ano da Adoração Perpétua" },
  jovensPregacao: { src: "2025/10/DLS1887.jpg", alt: "Jovens sentados acompanham uma pregação durante o Divina Jovem 2025" },
  festaNacoes: { src: "2025/06/festa-nacoes-2025-51.jpg", alt: "Cruz branca e flores na entrada da Festa das Nações 2025" },
  festaNacoes24: { src: "2024/06/FestadasNacoes335.jpg", alt: "Participantes com a bandeira do Rio Grande do Sul na Festa das Nações 2024" },
  sede: { src: "2024/09/DLS7863.jpg", alt: "Salão com arco de balões na entrada, no fim da tarde, durante o 23º Acampamento Sênior" },
  louvor: { src: "2025/07/DLS8666.jpg", alt: "Participantes cantam de mãos dadas na chegada do 24º Acampamento Sênior" },
  chegadaSenior: { src: "2025/07/DLS8537.jpg", alt: "Grande grupo reunido na chegada do 24º Acampamento Sênior" },
  divinaJovem: { src: "2025/10/DLS1153.jpg", alt: "Multidão à noite diante do palco do Divina Jovem 2025" },
  divinaJovemShow: { src: "2025/10/DLS3110.jpg", alt: "Show no palco do Divina Jovem 2025 com o público de braços erguidos" },
  cincoLinguagens: { src: "2026/04/5-linguagens-2026-65.jpg", alt: "Casais em oração durante o Curso 5 Linguagens do Amor 2026" },
  divinaBrasa: { src: "2026/04/divina-brasa-rondonopolis-52-1.jpg", alt: "Equipe reunida no Festival Divina Brasa 2026" },
  mirimFesta: { src: "2026/05/18-Acampamento-Mirim-168.jpg", alt: "Crianças de camiseta branca comemoram de braços erguidos no 18º Acampamento Mirim" },
  juvenilBaloes: { src: "2026/02/DLS0689.jpg", alt: "Jovens de camiseta azul louvam de braços erguidos sob uma chuva de balões brancos no 17º Acampamento Juvenil" },
  facDanca: { src: "2026/09/20-fac-divina-providencia-27.jpg", alt: "Adolescentes de camiseta verde dançam à noite no 20º Acampamento FAC" },
  jovensOracao: { src: "2025/10/DLS2465.jpg", alt: "Jovem reza de mãos juntas e olhos fechados, entre outros jovens em oração, no Divina Jovem 2025" },
  acampamentoLouvor: { src: "2026/07/DLS0866.jpg", alt: "Acampantes do 25º Acampamento Sênior, de camisetas brancas, louvam de braços erguidos diante dos estandartes, à noite" },
  seniorRoda: { src: "2026/07/DLS0741.jpg", alt: "Acampantes do 25º Acampamento Sênior em roda, de mãos dadas" },
} as const;

export type PhotoKey = keyof typeof photos;
