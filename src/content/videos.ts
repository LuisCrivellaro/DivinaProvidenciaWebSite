/** Vídeos do canal oficial no YouTube (feed público consultado em 26/11/2026). */
export type Video = { id: string; title: string; date: string; topic: "oracao" | "missa" | "divina-jovem" | "obras" | "divinacast" };

export const youtubeChannel = "https://www.youtube.com/@ComunidadeDivinaProvid%C3%AAncia";

export const videos: Video[] = [
  { id: "x7lF2L7ShWY", title: "Homilia da missa de 1 ano da Adoração Perpétua", date: "2026-10-31", topic: "missa" },
  { id: "S7ie8VdYg6Y", title: "Missa de 6 anos como Comunidade de Aliança e renovação do compromisso", date: "2026-10-19", topic: "missa" },
  { id: "O93aayTHvLM", title: "Cerco de Jericó 2026 · domingo, 16/08", date: "2026-08-17", topic: "oracao" },
  { id: "SoKuZu8KOBE", title: "Cerco de Jericó 2026 · sábado, 15/08", date: "2026-08-16", topic: "oracao" },
  { id: "eqR9L1Y8WkQ", title: "Cerco de Jericó 2026 · sexta-feira, 14/08", date: "2026-08-15", topic: "oracao" },
  { id: "JE4K_25xZ3Y", title: "Cerco de Jericó 2026 · quinta-feira, 13/08", date: "2026-08-14", topic: "oracao" },
  { id: "QO4bEkJjMPM", title: "Cerco de Jericó 2026 · quarta-feira, 12/08", date: "2026-08-13", topic: "oracao" },
  { id: "lDfEqh4YMS8", title: "Cerco de Jericó 2026 · terça-feira, 11/08", date: "2026-08-12", topic: "oracao" },
  { id: "gf47uVql-h4", title: "Cerco de Jericó 2026 · segunda-feira, 10/08", date: "2026-08-11", topic: "oracao" },
  { id: "BIdZaTQ8AKI", title: "Inauguração da Casa da Saúde São Padre Pio", date: "2026-04-24", topic: "obras" },
  { id: "tImM_KU8DmI", title: "Divina Jovem 2025 · dia 2", date: "2025-10-05", topic: "divina-jovem" },
  { id: "xmwR75gbL9E", title: "Divina Jovem 2025 · dia 1", date: "2025-10-04", topic: "divina-jovem" },
  { id: "5OlDTCMfTSo", title: "Divinacast #05, com Rodrigão", date: "2025-10-01", topic: "divinacast" },
  { id: "y8p7SkCqwrQ", title: "Cerco de Jericó 2025 · Queda das Muralhas", date: "2025-08-18", topic: "oracao" },
];

export const topicLabel: Record<Video["topic"], string> = {
  oracao: "Cerco de Jericó",
  missa: "Missas e homilias",
  "divina-jovem": "Divina Jovem",
  obras: "Obras sociais",
  divinacast: "Divinacast",
};
