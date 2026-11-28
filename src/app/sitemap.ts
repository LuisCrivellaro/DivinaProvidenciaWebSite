import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { camps, retreats } from "@/content/programs";
import { events } from "@/content/events";
import { galleries } from "@/lib/galleries";
import { inscricoes } from "@/content/inscricoes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/comunidade", "/agenda", "/acampamentos", "/retiros", "/grupos-de-oracao", "/vida-de-oracao", "/obras-e-projetos", "/casa-terapeutica", "/galeria", "/videos", "/loja", "/minhas-inscricoes", "/festival-divina-brasa", "/contato", "/privacidade"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...camps.map((c) => ({ url: `${base}/acampamentos/${c.slug}` })),
    ...retreats.map((r) => ({ url: `${base}/retiros/${r.slug}` })),
    ...events.map((e) => ({ url: `${base}/agenda/${e.slug}` })),
    ...inscricoes.map((i) => ({ url: `${base}/inscricoes/${i.slug}` })),
    ...galleries.filter((g) => !g.restricted).map((g) => ({ url: `${base}/galeria/${g.slug}`, lastModified: g.published })),
  ];
}
