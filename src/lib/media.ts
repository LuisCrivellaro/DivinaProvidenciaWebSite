/**
 * Endereço das imagens migradas do WordPress antigo (scripts/migrate-media.mjs gera public/media/AAAA/MM/arquivo.webp).
 *
 * Por padrão as fotos saem do próprio site (/media). Se o acervo completo for para um storage próprio
 * (Cloudflare R2, S3, Bunny…), defina NEXT_PUBLIC_MEDIA_BASE_URL com a URL pública da pasta
 * (ex.: https://midia.adivinaprovidencia.com.br) — o next.config.ts libera esse host automaticamente.
 * Nenhuma imagem depende do servidor antigo.
 */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "/media").replace(/\/+$/, "");

/** "2026/07/DLS0930.jpg" → "/media/2026/07/DLS0930.webp". Caminhos absolutos ("/brand/…", "https://…") passam direto. */
export function mediaUrl(path: string) {
  if (/^https?:\/\//.test(path) || path.startsWith("/")) return path;
  return `${MEDIA_BASE}/${path.replace(/\.(jpe?g|png|gif|webp)$/i, ".webp")}`;
}
