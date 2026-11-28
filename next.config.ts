import type { NextConfig } from "next";
import { redirects } from "./src/lib/redirects";

/**
 * Fotos: migradas para public/media (scripts/migrate-media.mjs). Se o acervo for servido por um storage
 * próprio, NEXT_PUBLIC_MEDIA_BASE_URL (ex.: https://midia.exemplo.com.br) libera esse host para o next/image.
 * Nenhum recurso vem mais do WordPress antigo.
 */
const mediaHost = (() => {
  const base = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  if (!base || !/^https?:\/\//.test(base)) return [];
  return [new URL(`${base.replace(/\/+$/, "")}/**`)];
})();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    // Miniaturas do YouTube (canal oficial) e, se configurado, o storage próprio das fotos.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**"), ...mediaHost],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Endereços do WordPress antigo → páginas novas (301). Ver src/lib/redirects.ts e docs/MIGRACAO_DOMINIO.md.
  async redirects() {
    return redirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
