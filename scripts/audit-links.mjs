// Auditoria estática das páginas renderizadas: status HTTP, um <h1>, saltos de nível de título,
// imagens sem alt, links internos quebrados e âncoras inexistentes.
// Uso: node scripts/audit-links.mjs [baseURL]   (padrão: http://localhost:3210)
const base = process.argv[2] ?? "http://localhost:3210";
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const prod = "https://adivinaprovidencia.com.br";
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(prod, "")).map((p) => p || "/");
const pages = new Map();
const problems = [];
for (const r of routes) {
  const res = await fetch(base + r);
  const html = await res.text();
  pages.set(r, html);
  if (res.status !== 200) problems.push(`${r}: HTTP ${res.status}`);
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "");
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${r}: ${h1} <h1>`);
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  for (let i = 1; i < levels.length; i++) if (levels[i] - levels[i - 1] > 1) { problems.push(`${r}: salto h${levels[i - 1]}→h${levels[i]}`); break; }
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\balt=/.test(t));
  if (noAlt.length) problems.push(`${r}: ${noAlt.length} <img> sem atributo alt`);
}
// links internos e âncoras
const checked = new Map();
for (const [r, html] of pages) {
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith("/_next") && !/\.(png|webp|jpg|ico|css|js|xml|txt)$/.test(h.split("?")[0]));
  for (const h of new Set(hrefs)) {
    const [path, hash] = h.split("#");
    const p = path.split("?")[0] || r;
    if (!checked.has(p)) {
      const res = await fetch(base + p);
      checked.set(p, { status: res.status, html: res.status === 200 ? await res.text() : "" });
    }
    const c = checked.get(p);
    if (c.status !== 200) problems.push(`${r}: link quebrado ${h} (${c.status})`);
    else if (hash && !c.html.includes(`id="${hash}"`)) problems.push(`${r}: âncora inexistente ${h}`);
  }
}
console.log(`Rotas auditadas: ${routes.length} · links internos distintos verificados: ${checked.size}`);
console.log(problems.length ? problems.join("\n") : "Nenhum problema encontrado.");
process.exit(problems.length ? 1 : 0);
