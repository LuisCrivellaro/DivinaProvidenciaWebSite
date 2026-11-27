import { cacheLife, cacheTag } from "next/cache";
import { shop } from "@/content/site";

export type StoreProduct = {
  id: number;
  name: string;
  permalink: string;
  shortDescription: string;
  price: number; // em reais
  currency: string;
  inStock: boolean;
  purchasable: boolean;
  categories: string[];
  image?: { src: string; alt: string };
};

type RawProduct = {
  id: number;
  name: string;
  permalink: string;
  short_description: string;
  description: string;
  prices: { price: string; currency_code: string; currency_minor_unit: number };
  is_in_stock: boolean;
  is_purchasable: boolean;
  categories: { name: string }[];
  images: { src: string; alt: string }[];
};

const strip = (html: string) =>
  html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&#8211;/g, "–").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

/**
 * Lê os produtos públicos da Store API do WooCommerce oficial (somente leitura, sem dados pessoais).
 * Carrinho, checkout e conta continuam no site oficial.
 */
export async function getStoreProducts(): Promise<{ ok: true; products: StoreProduct[] } | { ok: false }> {
  "use cache";
  cacheLife("hours");
  cacheTag("woocommerce-products");
  try {
    const res = await fetch(shop.storeApi, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return { ok: false };
    const raw = (await res.json()) as RawProduct[];
    return {
      ok: true,
      products: raw.map((p) => ({
        id: p.id,
        name: strip(p.name),
        permalink: p.permalink,
        shortDescription: strip(p.short_description || p.description).slice(0, 320),
        price: Number(p.prices.price) / 10 ** p.prices.currency_minor_unit,
        currency: p.prices.currency_code,
        inStock: p.is_in_stock,
        purchasable: p.is_purchasable,
        categories: p.categories.map((c) => strip(c.name)),
        image: p.images[0] ? { src: p.images[0].src, alt: p.images[0].alt || strip(p.name) } : undefined,
      })),
    };
  } catch {
    return { ok: false };
  }
}
