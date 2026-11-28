#!/usr/bin/env node
/**
 * Teste de independência do site antigo.
 * Navega por TODAS as páginas do sitemap (desktop e celular) com qualquer requisição a
 * adivinaprovidencia.com.br BLOQUEADA, como se o WordPress já tivesse sido desligado.
 *
 *   npm run build && npx next start -p 3002
 *   node scripts/test-independencia.mjs http://localhost:3002
 *
 * Falha (exit 1) se houver: requisição ao domínio antigo, página com status ≠ 200, erro de console
 * ou de página, imagem quebrada, requisição do próprio site com erro, link interno quebrado,
 * link visível para a infraestrutura antiga (wp-content, produto, carrinho, minha-conta…),
 * menu que não abre ou visualizador de fotos que não carrega.
 * Chromium: usa o do cache do Playwright (PLAYWRIGHT_CHROMIUM para outro caminho).
 */
import { chromium } from "playwright-core";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3002").replace(/\/$/, "");
const OLD = "adivinaprovidencia.com.br";
const OLD_INFRA = /adivinaprovidencia\.com\.br\/(wp-|produto|produtos|carrinho|minha-conta|finalizar-compra|categoria-produto|loja\/|\?)/i;

function chromiumPath() {
  if (process.env.PLAYWRIGHT_CHROMIUM) return process.env.PLAYWRIGHT_CHROMIUM;
  const root = join(process.env.LOCALAPPDATA ?? "", "ms-playwright");
  const dirs = existsSync(root) ? readdirSync(root).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse() : [];
  for (const d of dirs) {
    const exe = join(root, d, "chrome-win64", "chrome.exe");
    if (existsSync(exe)) return exe;
  }
  throw new Error("Chromium do Playwright não encontrado; defina PLAYWRIGHT_CHROMIUM");
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname))];
console.log(`${routes.length} rotas no sitemap`);

const problems = [];
const blocked = [];
const externalHosts = new Map();
const linkTargets = new Set();
const add = (p) => { problems.push(p); console.log("  ✗ " + p); };

const browser = await chromium.launch({ executablePath: chromiumPath() });

async function run(label, contextOptions) {
  const ctx = await browser.newContext(contextOptions);
  await ctx.route("**/*", (route) => {
    const url = route.request().url();
    const host = new URL(url).hostname;
    if (host.endsWith(OLD)) {
      blocked.push(`${label}: ${url}`);
      return route.abort("blockedbyclient");
    }
    if (!url.startsWith(base)) externalHosts.set(host, (externalHosts.get(host) ?? 0) + 1);
    return route.continue();
  });
  const page = await ctx.newPage();
  let current = "";
  page.on("console", (m) => m.type() === "error" && !/WebSocket|favicon/i.test(m.text()) && add(`[${label}] ${current}: console: ${m.text().slice(0, 180)}`));
  page.on("pageerror", (e) => add(`[${label}] ${current}: erro de página: ${String(e).slice(0, 180)}`));
  page.on("response", (r) => {
    if (r.url().startsWith(base) && r.status() >= 400) add(`[${label}] ${current}: HTTP ${r.status()} em ${r.url().replace(base, "")}`);
  });

  for (const r of routes) {
    current = r;
    const res = await page.goto(base + r, { waitUntil: "load", timeout: 60_000 }).catch((e) => (add(`[${label}] ${r}: não carregou (${e.message})`), null));
    if (!res) continue;
    if (res.status() !== 200) add(`[${label}] ${r}: status ${res.status()}`);
    // rola até o fim para carregar imagens preguiçosas e disparar as animações de entrada
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.round(innerHeight * 0.8)) {
        scrollTo(0, y);
        await new Promise((ok) => setTimeout(ok, 120));
      }
      scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForLoadState("networkidle", { timeout: 20_000 }).catch(() => {});
    const info = await page.evaluate((oldInfra) => {
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc);
      const anchors = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
      const oldLinks = anchors.filter((h) => new RegExp(oldInfra, "i").test(h));
      const h1 = document.querySelectorAll("h1").length;
      return { broken, anchors, oldLinks, h1 };
    }, OLD_INFRA.source);
    info.broken.forEach((b) => add(`[${label}] ${r}: imagem quebrada ${b.slice(0, 140)}`));
    info.oldLinks.forEach((h) => add(`[${label}] ${r}: link para a infraestrutura antiga ${h}`));
    if (info.h1 !== 1) add(`[${label}] ${r}: ${info.h1} <h1>`);
    info.anchors.filter((h) => h.startsWith("/") && !h.startsWith("//")).forEach((h) => linkTargets.add(h.split("#")[0] || "/"));
  }

  // Menus e visualizador
  current = "/ (menus)";
  await page.goto(base + "/", { waitUntil: "load" });
  if (contextOptions.viewport.width >= 1024) {
    await page.getByRole("button", { name: "Participe" }).click();
    const items = await page.locator("nav a[href='/acampamentos']").count();
    if (!items) add(`[${label}] menu "Participe" não mostrou os itens`);
  } else {
    await page.getByRole("button", { name: /abrir menu/i }).click();
    await page.waitForTimeout(400);
    const n = await page.locator("#menu-mobile a").count();
    if (n < 10) add(`[${label}] menu mobile com ${n} links`);
    await page.keyboard.press("Escape");
  }
  current = "/galeria/25-acampamento-senior (visualizador)";
  await page.goto(base + "/galeria/25-acampamento-senior", { waitUntil: "load" });
  await page.locator("main ul button").first().click();
  const viewerOk = await page
    .locator("dialog[open] img")
    .first()
    .evaluate((img) => new Promise((ok) => (img.complete ? ok(img.naturalWidth > 0) : (img.onload = () => ok(img.naturalWidth > 0), img.onerror = () => ok(false)))))
    .catch(() => false);
  if (!viewerOk) add(`[${label}] visualizador de fotos não carregou a imagem`);
  await ctx.close();
}

await run("desktop", { viewport: { width: 1440, height: 900 } });
await run("celular", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await browser.close();

// Links internos (seguindo redirecionamentos)
let checkedLinks = 0;
for (const href of linkTargets) {
  const res = await fetch(base + href, { redirect: "follow" }).catch(() => null);
  checkedLinks++;
  if (!res || res.status >= 400) add(`link interno quebrado: ${href} (${res?.status ?? "sem resposta"})`);
}

blocked.forEach((b) => add(`requisição ao site antigo: ${b}`));
const report = {
  base,
  rotas: routes.length,
  viewports: ["1440x900", "390x844"],
  linksInternosVerificados: checkedLinks,
  requisicoesAoSiteAntigo: blocked.length,
  hostsExternos: Object.fromEntries([...externalHosts].sort((a, b) => b[1] - a[1])),
  problemas: problems,
};
writeFileSync(new URL("./test-independencia-resultado.json", import.meta.url), JSON.stringify(report, null, 2));
console.log(`\nRotas: ${routes.length} × 2 viewports · links internos: ${checkedLinks} · requisições ao site antigo: ${blocked.length}`);
console.log("Hosts externos:", report.hostsExternos);
console.log(problems.length ? `\n${problems.length} problema(s).` : "\nNenhum problema: o site funciona sem o WordPress antigo.");
process.exit(problems.length ? 1 : 0);
