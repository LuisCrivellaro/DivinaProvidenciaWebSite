# 09 — Funcionalidades, integrações e o que precisa ser preservado

> **Data da consulta:** 26/11/2026. Evidências: HTML público, cabeçalhos HTTP, `robots.txt`, sitemap, APIs públicas `/wp-json/wp/v2/*` e `/wp-json/wc/store/v1/*` (somente GET). Nenhum acesso administrativo.

## 1. Stack identificada

| Camada | Tecnologia | Evidência |
|---|---|---|
| CDN / proxy / WAF | **Cloudflare** (`server: cloudflare`, `cf-ray`, Cloudflare Insights; `robots.txt` gerenciado com "Content-Signal: search=yes, ai-train=no, use=reference") | Cabeçalhos |
| CMS | **WordPress 7.1.5** | meta generator, `/wp-json/` |
| E-commerce | **WooCommerce 11.0.1** | meta generator, Store API |
| Page builder | **Elementor 4.2.4** + **Elementor Pro** | meta generator, CSS `uploads/elementor/css/post-*.css` |
| Addons | **Happy Elementor Addons** + **Pro** | assets em `/plugins/happy-elementor-addons*` |
| Tema | **OceanWP** | `/themes/oceanwp`, classes do body |
| Campos personalizados no produto | **PPOM** (`woocommerce-product-addon` 34.0.8) — em uso; **WCPA** (`woo-custom-product-addons` 3.1.7) — carregado | `ppom[fields]` no form; CSS do WCPA |
| Pagamentos | **Mercado Pago for WooCommerce 8.9.3** (cartão transparente "custom", Pix, wallet button; `site_id MLB`) | scripts no carrinho |
| SEO | **Yoast SEO** (sitemaps, meta) | `robots.txt` "YOAST BLOCK", `sitemap_index.xml` |
| Analytics / Ads | **Google Tag Manager** (container `GTM-MJG694PX`), **Google Analytics** (WooCommerce GA Integration), **Meta Pixel** ×2 via **Facebook for WooCommerce** | scripts |
| Fontes | Roboto, Roboto Slab (Google Fonts hospedadas localmente pelo Elementor), Font Awesome 6.7.2 | CSS |
| Mapas | Google Maps embed (`maps.google.com/maps?q=...&output=embed`) | `/contato/` |
| Vídeo | YouTube embed (Elementor), Vimeo (landing) | — |
| Bilheteria externa | **TotalIngressos** (Divina Brasa 2026) | link |
| Mensageria | WhatsApp (`wa.me`, `api.whatsapp.com`) | links |

> Observação: o `robots.txt` (gerenciado pela Cloudflare) declara `ai-train=no` e bloqueia crawlers de treinamento. Esta pesquisa foi feita para **referência** a pedido do responsável pelo redesign, sem uso para treinamento, respeitando o sinal `use=reference`.

## 2. Funcionalidades existentes

| # | Funcionalidade | Onde | Backend | Preservar? |
|---|---|---|---|---|
| F1 | Inscrição paga em retiro com campos do participante (Nome, Celular, CPF) | Produtos | WooCommerce + PPOM | ✅ **obrigatório** (redesenhar UX) |
| F2 | Diferenciação Retirante × Servo por produto | Produtos | WooCommerce | ✅ (como "tipos de inscrição") |
| F3 | Carrinho + mini-carrinho | Global | WooCommerce/OceanWP | ✅ |
| F4 | Checkout com Mercado Pago (cartão, Pix, carteira — a confirmar) | `/finalizar-compra/` | Mercado Pago | ✅ **obrigatório** |
| F5 | Conta do cliente: login, recuperação de senha, pedidos | `/minha-conta/` | WooCommerce | ✅ |
| F6 | Catálogo com ordenação e paginação | `/loja/` | WooCommerce | 🔄 simplificar |
| F7 | Quick view de produto | Cards | OceanWP | ❌ dispensável |
| F8 | Galerias com lightbox | Posts | Elementor/Happy Addons + biblioteca de mídia | ✅ (reorganizar) |
| F9 | Listagem de galerias e categorias | `/galerias/`, `/category/*` | WordPress | 🔄 filtros |
| F10 | Slider hero | Home | Elementor Pro | 🔄 |
| F11 | Embeds de vídeo | Home, posts | YouTube/Vimeo | ✅ |
| F12 | Botões WhatsApp por setor | Header/rodapé | Links | ✅ |
| F13 | Mapa da sede | Contato | Google Maps | ✅ (com ponto exato) |
| F14 | Landing de evento com venda externa | `/festival-divina-brasa/` | Elementor canvas + TotalIngressos | ✅ como modelo |
| F15 | Pixels/Analytics de conversão | Global | GTM/GA/Meta | ✅ **somente com consentimento** |
| F16 | Busca do WordPress | `/?s=` | WordPress | 🔄 opcional |
| F17 | Sitemap XML / SEO | `/sitemap_index.xml` | Yoast | ✅ |
| F18 | E-mails transacionais de pedido | — | WooCommerce | ✅ (não observado; confirmar conteúdo) |

## 3. Fluxo técnico da inscrição (estado atual)

1. `POST` do formulário `form.cart` para a própria URL do produto com `add-to-cart=<id>`, `quantity` e `ppom[fields][nome_participante|celular|cpf]` (+ campos ocultos PPOM: `ppom[fields][id]`, `ppom_product_id`, `ppom[conditionally_hidden]`, `ppom[ppom_option_price]`, `ppom_cart_key`).
2. PPOM valida obrigatoriedade no servidor e grava os valores como **metadados do item do carrinho → item do pedido**.
3. Checkout WooCommerce (dados de cobrança do comprador) → Mercado Pago.
4. Pedido gerado; status atualizado pelo webhook do Mercado Pago (padrão do plugin — não verificado).
5. A secretaria provavelmente consulta inscritos pelos pedidos no painel (❓ P21).

**Implicação:** num redesign, os dados do participante ficam **dentro dos pedidos**. Qualquer migração precisa exportar pedidos + metadados PPOM, e qualquer novo front precisa enviar os mesmos campos (ou um novo esquema acordado).

## 4. Riscos de perda de funcionalidade no redesign

| Risco | Mitigação |
|---|---|
| Quebrar inscrições em período de evento (ex.: Desperta 05–06/12/2026 com inscrições abertas agora) | **Não migrar perto de eventos**; fazer o lançamento entre ciclos (o calendário 2027 começa em 25/01, Juvenil em 06–09/02/2027) |
| Perder credenciais/configuração Mercado Pago | Envolver o responsável financeiro; testar em sandbox |
| Perder histórico de pedidos/clientes | Backup completo antes; manter a mesma instalação WooCommerce se possível |
| Quebrar URLs indexadas e links compartilhados no Instagram (ex.: `/produto/...`, galerias) | Plano de redirecionamentos 301 a partir do inventário de 78 URLs (02) |
| Perder 7,7 mil arquivos de mídia | Migrar a biblioteca inteira; não depender de hotlink |
| Pixels/GA sem consentimento | Implementar gestão de consentimento antes de religar |
| Plugins redundantes/obsoletos | Consolidar (um único plugin de campos) |

## 5. Higiene e segurança observadas (sem testes invasivos)
- Endpoint público `/wp-json/wp/v2/users` lista o usuário **"startdesign"**; arquivo de autor público. → restringir.
- `/wp-admin/` bloqueado no robots (normal); não foi acessado.
- HTTPS ativo; Cloudflare na frente.
- Versões recentes de WordPress/WooCommerce/Elementor (bom).
- Sem política de privacidade nem gestão de consentimento.

## 6. Requisitos não funcionais para a próxima fase
- Mobile-first, Core Web Vitals bons em 4G.
- WCAG 2.1 AA (contraste, alt, foco, alvos de toque).
- LGPD: política, consentimento, minimização (CPF só se necessário, com finalidade), retenção, proteção de menores.
- Editável pela equipe da comunidade sem programador (eventos, galerias, textos).
- SEO local ("comunidade católica Rondonópolis", "acampamento católico Rondonópolis", "Cerco de Jericó Rondonópolis").
