import data from "@/content/galleries.json";
import { UPLOADS } from "@/content/site";

export type Gallery = {
  slug: string;
  title: string;
  group: string;
  year: number;
  published: string;
  restricted: boolean;
  cover: string;
  images: string[];
  source: string;
};

export const galleries = data as Gallery[];

export const groupLabel: Record<string, string> = {
  acampamentos: "Acampamentos",
  oracao: "Oração e missas",
  "divina-jovem": "Divina Jovem",
  festas: "Festas beneficentes",
  retiros: "Retiros e formação",
  jovens: "Juventude",
  obras: "Obras sociais",
};

export const groupOrder = ["acampamentos", "oracao", "retiros", "divina-jovem", "festas", "jovens", "obras"];

export function getGallery(slug: string) {
  return galleries.find((g) => g.slug === slug);
}

export const uploadUrl = (path: string) => (path.startsWith("http") ? path : `${UPLOADS}${path}`);

export const years = Array.from(new Set(galleries.map((g) => g.year))).sort((a, b) => b - a);
