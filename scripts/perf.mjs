// Mede peso e métricas de carregamento via Chrome DevTools Protocol (Chrome instalado localmente).
// Uso: node scripts/perf.mjs <url> [mobile]
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const [url, mobile] = process.argv.slice(2);
const CH = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9600 + Math.floor(Math.random() * 300);
const chrome = spawn(CH, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "perf-"))}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {} await sleep(200); }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map(); const reqs = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id); }
  if (d.method === "Network.responseReceived") reqs.set(d.params.requestId, { url: d.params.response.url, type: d.params.type, size: 0 });
  if (d.method === "Network.loadingFinished" && reqs.has(d.params.requestId)) reqs.get(d.params.requestId).size = d.params.encodedDataLength; };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Network.enable"); await send("Page.enable");
if (mobile) {
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });
} else await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.addScriptToEvaluateOnNewDocument", { source: `window.__lcp=0;window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__cls+=e.value}).observe({type:'layout-shift',buffered:true});` });
await send("Page.navigate", { url }); await sleep(mobile ? 12000 : 6000);
const r = (await send("Runtime.evaluate", { expression: "JSON.stringify({lcp:Math.round(window.__lcp),cls:+window.__cls.toFixed(3),fcp:Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime||0),dcl:Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd)})", returnByValue: true })).result.result.value;
const all = [...reqs.values()];
const kb = (arr) => Math.round(arr.reduce((n, x) => n + x.size, 0) / 1024);
console.log(JSON.stringify({ url, mobile: !!mobile, ...JSON.parse(r), requests: all.length, totalKB: kb(all), jsKB: kb(all.filter((x) => x.type === "Script")), cssKB: kb(all.filter((x) => x.type === "Stylesheet")), imgKB: kb(all.filter((x) => x.type === "Image")), fontKB: kb(all.filter((x) => x.type === "Font")), thirdParty: [...new Set(all.map((x) => new URL(x.url).host))].filter((h) => !h.startsWith("localhost")) }));
ws.close(); chrome.kill();
