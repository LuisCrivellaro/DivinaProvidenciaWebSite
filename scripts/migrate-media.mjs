#!/usr/bin/env node
/**
 * Migra as imagens do WordPress antigo para o próprio projeto (public/media), em WebP otimizado.
 *
 *   node scripts/migrate-media.mjs            # baixa o que falta (pula o que já existe)
 *   node scripts/migrate-media.mjs --dry      # só lista o que seria baixado
 *
 * Fontes dos caminhos:
 *  - src/content/galleries.json: capas de todas as galerias e fotos das galerias PÚBLICAS.
 *    As 16 galerias restritas (crianças, adolescentes e acolhidos) não são copiadas para o site público.
 *  - Qualquer caminho "AAAA/MM/arquivo.ext" citado em src/**\/*.ts(x) (fotos de destaque, produtos, festivais).
 *
 * Saída: public/media/AAAA/MM/arquivo.webp (máx. 1920 px de largura, qualidade 80; PNG mantém transparência).
 * Falhas ficam em scripts/media-failures.json para nova tentativa.
 * Depois de desligado o site antigo este script não tem mais de onde baixar: rode-o antes.
 */
import { readFile, writeFile, mkdir, access, readdir } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SOURCE = "https://adivinaprovidencia.com.br/wp-content/uploads/";
const OUT = join(ROOT, "public", "media");
const CONCURRENCY = 6;
const DRY = process.argv.includes("--dry");
const PATH_RE = /\b(\d{4}\/\d{2}\/[A-Za-z0-9._~%-]+\.(?:jpe?g|png|gif|webp))\b/gi;

const toWebp = (p) => p.replace(/\.(jpe?g|png|gif|webp)$/i, ".webp");
const exists = (f) => access(f).then(() => true, () => false);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(f)));
    else if (/\.(tsx?|json)$/.test(e.name)) out.push(f);
  }
  return out;
}

async function collect() {
  const set = new Set();
  const galleries = JSON.parse(await readFile(join(ROOT, "src", "content", "galleries.json"), "utf8"));
  for (const g of galleries) {
    if (!g.restricted) {
      set.add(g.cover);
      for (const i of g.images) set.add(i);
    }
  }
  for (const f of await walk(join(ROOT, "src"))) {
    if (f.endsWith("galleries.json")) continue;
    const text = await readFile(f, "utf8");
    for (const m of text.matchAll(PATH_RE)) set.add(m[1]);
  }
  return [...set].sort();
}

async function migrate(path) {
  const dest = join(OUT, toWebp(path));
  if (await exists(dest)) return "skip";
  if (DRY) return "todo";
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(SOURCE + path, { headers: { "User-Agent": "divina-media-migration/1.0" }, signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const isPng = /\.png$/i.test(extname(path));
      const out = await sharp(buf, { failOn: "none" })
        .rotate()
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: isPng ? 90 : 80, alphaQuality: 100, effort: 4 })
        .toBuffer();
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, out);
      return "ok";
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw lastErr;
}

const paths = await collect();
console.log(`${paths.length} imagens referenciadas`);
let done = 0;
const stats = { ok: 0, skip: 0, todo: 0 };
const failures = [];
const queue = [...paths];
async function worker() {
  while (queue.length) {
    const p = queue.shift();
    try {
      stats[await migrate(p)]++;
    } catch (e) {
      failures.push({ path: p, error: String(e?.message ?? e) });
    }
    if (++done % 100 === 0) console.log(`${done}/${paths.length}  ok=${stats.ok} já existiam=${stats.skip} falhas=${failures.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await writeFile(join(ROOT, "scripts", "media-failures.json"), JSON.stringify(failures, null, 2));
console.log(`Concluído: baixadas=${stats.ok} já existiam=${stats.skip}${DRY ? ` a baixar=${stats.todo}` : ""} falhas=${failures.length}`);
