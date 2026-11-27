# Integrações

| Integração | Estado | Como funciona | Pendente |
|---|---|---|---|
| **Loja / inscrições (WooCommerce oficial)** | ✅ Leitura ao vivo | `src/lib/woocommerce.ts` lê `GET /wp-json/wc/store/v1/products` (pública, sem dados pessoais) com `use cache` + `cacheLife("hours")` e tag `woocommerce-products`. O botão "Inscrever-se" leva à página oficial do produto, onde o participante informa nome, celular e CPF (campos PPOM). Se a API falhar, a página mostra aviso e link para a loja oficial. | Decidir a migração do checkout. Enquanto isso **não há checkout no novo site** (proibido simular). |
| Carrinho, checkout, Minha conta, recuperação de senha | ✅ Links para o WordPress oficial | `shop.cart`, `shop.account`, `shop.lostPassword` em `content/site.ts` | Mantidos no domínio atual até a migração; ver redirecionamentos em `SITEMAP.md` |
| Pagamento (Mercado Pago) | ✅ Inalterado | Acontece no WooCommerce oficial | Confirmar métodos habilitados no painel |
| Contato | ✅ Sem servidor | `ContactForm` monta a mensagem e abre `wa.me/<secretaria>`; a confirmação diz apenas que o WhatsApp foi aberto. Nada é gravado. | Se a comunidade quiser formulário com e-mail, integrar um serviço (Resend, Formspree, endpoint no WordPress) com consentimento LGPD |
| WhatsApp por setor | ✅ | Evangelização +55 66 99908-2128 · Casa Terapêutica +55 66 99665-5565 | — |
| Fotos | ✅ | `next/image` otimiza as fotos de `adivinaprovidencia.com.br/wp-content/uploads/**` (`remotePatterns`), AVIF/WebP, cache 30 dias | Se o WordPress for desligado, migrar a biblioteca de mídia (~7,7 mil arquivos) para um storage próprio |
| YouTube | ✅ | Fachada com miniatura `i.ytimg.com`; player `youtube-nocookie.com` só após o clique | Automatizar a lista pelo feed RSS do canal (hoje é curada em `content/videos.ts`) |
| Google Maps | ✅ | `iframe` com `loading="lazy"` em Contato e Grupos | Usar coordenadas exatas da sede quando confirmadas |
| Agenda | ✅ Estática | `content/events.ts`; "hoje" calculado em `lib/today.ts` (`use cache`, revalida a cada hora) separa próximos/passados | Conectar a um CMS (sugestão: eventos no próprio WordPress via REST, ou um CMS headless) |
| Galerias | ✅ Estáticas | `content/galleries.json` gerado da pesquisa (58 galerias, 7.081 fotos) | Script de sincronização com a API do WordPress (`/wp-json/wp/v2/posts`) |
| Analytics / pixels | ⛔ Desligados de propósito | O site atual dispara Meta Pixel e GA sem consentimento | Reativar só com banner de consentimento |
| CMS | ⏳ | Conteúdo em `src/content/*` (tipado), pronto para trocar por CMS | Escolher CMS com a comunidade |
| Deploy | ⏳ | `npm run build && npm start` (Node 20+) ou Vercel | **Nada publicado.** Requer autorização e decisão de domínio |
