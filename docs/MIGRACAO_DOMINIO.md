# Migração do domínio e independência do site antigo

> Atualizado em 28/11/2026. O novo site **não depende mais** do WordPress/WooCommerce de `adivinaprovidencia.com.br`: o teste automatizado com o domínio antigo bloqueado passou em 111 páginas × 2 tamanhos de tela, com **0 requisições** ao site antigo (`scripts/test-independencia.mjs`).
> **Nada foi publicado, nenhum DNS foi alterado e o site antigo não foi desligado.** Os passos da seção 5 dependem de autorização.

## 1. Inventário do site antigo (sitemaps do Yoast, 28/11/2026)

| Tipo | Qtd. | Situação no novo site |
|---|---|---|
| Páginas | 12 | `/`, `/comunidade`, `/contato`, `/galerias`, `/loja`, `/produtos` → equivalentes já existiam. `/festival-divina-brasa` e `/festival-divina-brasa-3` → **página nova** `/festival-divina-brasa`. `/festajunina` (2023, só cartaz + WhatsApp) → `/agenda#grandes-eventos`, cartaz migrado para o acervo. `/carrinho`, `/finalizar-compra`, `/minha-conta` → substituídos (seção 3). |
| Produtos | 2 | `retiro-desperta26-retirante`, `retiro-desperta-2026-servo` → **páginas novas** `/inscricoes/{slug}` com ficha |
| Categoria de produto | 1 | `/categoria-produto/retiro` → `/loja` |
| Categorias do blog | 4 | → `/galeria` com filtro (`?tipo=`) |
| Autor | 1 | `/author/startdesign` → `/` |
| Posts (galerias) | 58 | Mesmos slugs em `/galeria/{slug}`; as 58 aparecem (inclusive as 16 antes restritas) |

O conteúdo textual das páginas antigas "Comunidade" e "Contato" era mínimo (a de comunidade estava vazia); o novo site já tinha versões mais completas.

## 2. Dependências encontradas e como foram resolvidas

| Dependência | Onde estava | Solução |
|---|---|---|
| **Todas as fotos** (`/wp-content/uploads/…`) via `next/image` | `site.ts`, `galleries.ts`, `ui.tsx`, `GalleryViewer`, `GalleryCardClient`, `PhotoStrip`, `next.config.ts` | 7.107 imagens migradas para `public/media/AAAA/MM/*.webp` (máx. 1920 px) por `scripts/migrate-media.mjs`; tudo passa por `mediaUrl()` em `src/lib/media.ts`. `remotePatterns` do domínio antigo removido. |
| Loja ao vivo (Store API do WooCommerce) | `lib/woocommerce.ts`, `/loja` | Conteúdo local em `content/inscricoes.ts` (mesmos nomes, valores, pré-requisitos e campos dos produtos). `woocommerce.ts` removido. |
| Botões de inscrição → `/produto/…` | `events.ts`, `programs.ts`, home, agenda | `/inscricoes/{slug}`: ficha com nome, celular e CPF (validação de dígitos), consentimento LGPD, envio pelo WhatsApp da Secretaria de Evangelização. |
| Login (`wp-login.php`), Minha conta, carrinho, senha | `/login`, `LoginForm`, `SocialLogin`, `site.ts` | `/minhas-inscricoes`: confirmar, pagar, corrigir ou cancelar uma inscrição falando com a secretaria. Componentes de login removidos. `/login`, `/minha-conta/*`, `/wp-login.php` redirecionam para lá. |
| Galerias restritas → "Abrir no site oficial" | `galeria/[slug]` | Por decisão do usuário (28/11/2026) todas as galerias são públicas. Se alguma voltar a ser restrita (`restricted: true`), a página oferece "Pedir as fotos" à secretaria — nunca o site antigo. |
| Imagem de compartilhamento (Open Graph) | `layout.tsx` | `src/app/opengraph-image.jpg` (1200×630) gerada da foto do hero. |
| Logo no JSON-LD (`/wp-content/uploads/…`) | `layout.tsx` | `/brand/logo-horizontal.png` |
| Textos "site oficial" | loja, privacidade, agenda, programas, home | Reescritos para o fluxo novo. |

**Dependências externas legítimas mantidas:** WhatsApp (`wa.me`), Instagram, Facebook, YouTube (miniaturas `i.ytimg.com` via `next/image`, player `youtube-nocookie.com` só no clique), Google Maps (mapa do Contato e dos Grupos), Total Ingressos (venda do Divina Brasa 2026, plataforma de terceiros), e-mails `@adivinaprovidencia.com.br` (dependem do provedor de e-mail, não do WordPress).

## 3. Funcionalidades que dependiam do WordPress

| Funcionalidade antiga | Agora | Limite / decisão pendente |
|---|---|---|
| Checkout com pagamento online (Mercado Pago no WooCommerce) | Ficha → WhatsApp da secretaria → secretaria confirma e orienta o pagamento | **Pagamento online exige conta e credenciais de um provedor** (Mercado Pago, PagBank, Stripe…). Não foi criado nem simulado. Para ativar: escolher o provedor, gerar links de pagamento ou checkout e acrescentar em `content/inscricoes.ts`. |
| Conta do cliente e histórico de pedidos | `/minhas-inscricoes` (via secretaria) | Sem servidor/banco, não há contas. **Antes de desligar o WordPress, exporte os pedidos e clientes do WooCommerce** (contêm CPF e celular — guardar com segurança, LGPD). |
| Login social | — | Nunca esteve ativo no WordPress. |

## 4. Acervo de fotos (`public/media`)

- **Gerado por:** `node scripts/migrate-media.mjs` (pula o que já existe; falhas em `scripts/media-failures.json`). Pega as capas e fotos de todas as galerias de `content/galleries.json` e qualquer caminho `AAAA/MM/arquivo.ext` citado em `src/`. **Só funciona enquanto o WordPress antigo estiver no ar** — rode de novo se acrescentar fotos antigas ao conteúdo.
- **Tamanho:** ~880 MB (7.107 arquivos WebP). Resultado em 28/11/2026: 7.107 baixadas, 0 falhas.
- **No git:** só as 98 imagens usadas pelas páginas e as capas das galerias (`git add -f`). O acervo completo fica fora do git (`.gitignore`), por ser grande demais para o repositório.
- **Decisão (28/11/2026): servidor com disco** — o acervo vai para o próprio servidor. Passo a passo em `docs/DEPLOY.md`.
- Opções avaliadas:
  1. **Hospedagem com disco** (VPS, Render, Railway, servidor próprio com Node 20+): copie `public/media/` junto com o projeto. Nada mais a configurar.
  2. **Storage de objetos** (Cloudflare R2, Amazon S3, Bunny Storage…): envie o conteúdo de `public/media/` mantendo a estrutura `AAAA/MM/arquivo.webp`, torne a pasta pública e defina `NEXT_PUBLIC_MEDIA_BASE_URL=https://seu-storage/caminho` no ambiente de build. O `next.config.ts` libera esse host automaticamente.
  3. Vercel: use a opção 2 (o acervo é grande demais para ir no deploy).
- **Backup:** guarde uma cópia de `public/media/` fora deste computador (HD externo, Google Drive da comunidade) **antes** de desligar o WordPress. Recomenda-se também exportar a biblioteca de mídia original pelo painel do WordPress.

## 5. Troca de domínio — passo a passo (executar só com autorização)

1. **Backup do site antigo:** exportar banco e `wp-content` (plugin de backup ou painel da hospedagem) e os pedidos/clientes do WooCommerce. Copiar `public/media/` para fora deste computador.
2. **Deploy do novo site** em um endereço de homologação (ex.: `novo.adivinaprovidencia.com.br` ou o domínio temporário da hospedagem), com o acervo publicado (seção 4).
3. **Testar a homologação:** `node scripts/test-independencia.mjs https://endereco-de-homologacao` (precisa do Chromium do Playwright; ver o cabeçalho do script) e uma navegação manual pelo celular.
4. **Reduzir o TTL** dos registros DNS do domínio para 300 s um dia antes.
5. **Apontar o domínio:** trocar apenas os registros `A`/`AAAA` (ou `CNAME`) de `adivinaprovidencia.com.br` e `www` para a nova hospedagem. **Não mexer nos registros `MX`, `SPF` (TXT), `DKIM` e `DMARC`**: são eles que mantêm os e-mails `secretaria@` e `cterapeutica@` funcionando.
6. **HTTPS:** emitir o certificado na nova hospedagem (normalmente automático) e escolher uma versão canônica (sem `www`, como em `site.url`), redirecionando `www` → raiz.
7. **Redirecionamentos 301** já estão no código (`src/lib/redirects.ts`, via `next.config.ts`) e passam a valer sozinhos quando o domínio apontar para o novo site. Mapa na seção 6.
8. **Google Search Console:** verificar a propriedade, enviar `https://adivinaprovidencia.com.br/sitemap.xml` e acompanhar "Páginas" e erros 404 nas semanas seguintes.
9. **Depois de estabilizar** (2 a 4 semanas): desligar o WordPress antigo. Se quiser mantê-lo como arquivo, mova-o para um subdomínio protegido por senha e com `noindex`.

## 6. Mapa de URLs antigas → novas (301/308)

Fonte: `src/lib/redirects.ts`. O Next.js primeiro remove a barra final (`/contato/` → `/contato`) e depois aplica a regra; o teste com `curl -L` confirmou o destino de cada uma.

| URL antiga | Nova |
|---|---|
| `/comunidade/`, `/contato/`, `/loja/` | mesma página (sem a barra final) |
| `/galerias/`, `/category/galeria/` | `/galeria` |
| `/category/acampamento/` | `/galeria?tipo=acampamentos` |
| `/category/cerco-jerico/` | `/galeria?tipo=oracao` |
| `/category/divina-jovem/` | `/galeria?tipo=divina-jovem` |
| outras `/category/*` | `/galeria` |
| `/{slug-da-galeria}/` (58) | `/galeria/{slug}` |
| `/festival-divina-brasa/` | `/festival-divina-brasa` (página própria) |
| `/festival-divina-brasa-3/` (e outras numeradas) | `/festival-divina-brasa` |
| `/divina-brasa/` (era um post de galeria) | `/galeria/divina-brasa` |
| `/festajunina/` | `/agenda#grandes-eventos` |
| `/produtos/`, `/carrinho/`, `/finalizar-compra/*`, `/categoria-produto/*` | `/loja` |
| `/produto/{slug}/` | `/inscricoes/{slug}` |
| `/minha-conta/*`, `/login`, `/wp-login.php` | `/minhas-inscricoes` |
| `/author/*`, `/feed` | `/` |
| `/wp-content/uploads/AAAA/MM/arquivo.jpg` (png, gif…) | `/media/AAAA/MM/arquivo.webp` |

## 7. Pendências que dependem da comunidade

1. **Pagamento online:** escolher provedor e criar a conta (precisa de CNPJ/dados bancários da Associação — não fazer sem autorização).
2. **Hospedagem e storage do acervo** (seção 4) e autorização para o deploy e a troca de DNS (seção 5).
3. **Exportar pedidos/clientes do WooCommerce** antes de desligar o WordPress.
4. **Direito de imagem:** todas as galerias agora são públicas, inclusive acampamentos de crianças e adolescentes (decisão do usuário em 28/11/2026). Confirmar com a coordenação e manter o canal de remoção descrito em `/privacidade`.
5. Itens da lista de validação de conteúdo em `docs/AI_HANDOFF.md` (horários, endereço exato etc.).
