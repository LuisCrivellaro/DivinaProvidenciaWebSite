import data from "@/content/galleries.json";
import { mediaUrl } from "@/lib/media";

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

/** Imagem migrada (ver src/lib/media.ts). */
export const uploadUrl = mediaUrl;

export const years = Array.from(new Set(galleries.map((g) => g.year))).sort((a, b) => b - a);
