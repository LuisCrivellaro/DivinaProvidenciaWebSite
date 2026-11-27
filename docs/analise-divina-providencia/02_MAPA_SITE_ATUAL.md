# 02 — Mapa do site atual (adivinaprovidencia.com.br)

> **Data da consulta:** 26/11/2026. Método: sitemap XML do Yoast (`/sitemap_index.xml`), download de todas as URLs listadas (78, todas HTTP 200), API pública do WordPress/WooCommerce (somente leitura), navegação no navegador integrado (desktop e mobile 375 px) e capturas com Chrome headless.
> **Nenhum formulário foi enviado, nenhum item foi adicionado ao carrinho e nenhuma área privada foi acessada.**

## 1. Números gerais

| Métrica | Valor |
|---|---|
| URLs públicas no sitemap | **78** (todas analisadas) |
| Páginas WordPress (`page`) | 12 |
| Posts (todos são **galerias de fotos**) | 58 |
| Produtos WooCommerce | 2 (ambos do Retiro Desperta 2026) |
| Categorias de posts | 6 (ACAMPAMENTO 22, CERCO JERICO 8, DIVINA JOVEM 10, GALERIA 58, NOTICIA 0, Uncategorized 0) |
| Categorias de produto | 1 (Retiro) |
| Itens na biblioteca de mídia | ~7.719 (cabeçalho `X-WP-Total` da API de mídia) |
| Fotos vinculadas nas 58 galerias | 7.081 |
| Usuários/autores públicos | 1 ("startdesign") |
| URLs extras descobertas por links internos | `/minha-conta/lost-password/`, `/loja/?products-per-page=…`, `/category/galeria/page/2…6/`, `/?s=` (busca) |
| URLs institucionais testadas que **não existem** (404) | `/sobre`, `/historia`, `/quem-somos`, `/eventos`, `/agenda`, `/casa-terapeutica`, `/comunidade-terapeutica`, `/doacoes`, `/doe`, `/blog`, `/noticias`, `/politica-de-privacidade`, `/privacy-policy`, `/termos`, `/termos-de-uso`, `/shop` |

## 2. Navegação global

### 2.1 Cabeçalho (todas as páginas, exceto a landing `/festival-divina-brasa/`)
- Logotipo horizontal (link para início).
- Menu: **INICIO** · **CONTATO** · **LOJA** (→ `/produtos/`) · **CARRINHO** · **LOGIN** (→ `/minha-conta/`).
- Botão dourado com ícone de WhatsApp (sem texto) → `wa.me/5566999082128` (Secretaria de Evangelização).
- **Não há** no menu: A Comunidade, Galerias, Eventos, Grupos de Oração, Casa Terapêutica. A página `/comunidade/` existe mas está **vazia e fora do menu**. `/galerias/` só é alcançável pelo botão "VER TODAS GALERIAS" da home.
- Mobile: menu hambúrguer **quebrado** (ver 06_AUDITORIA_UX_UI.md, problema UX-01).

### 2.2 Rodapé (todas as páginas)
- Logotipo branco sobre fundo dourado.
- Botões "Secretaria de Evangelização" (WhatsApp 66 99908-2128) e "Secretaria da Casa Terapêutica" (WhatsApp 66 99665-5565).
- Ícones: Facebook (`facebook.com/adivinaprovidencia`), Instagram (`instagram.com/adivinaprovidencia`), YouTube (`youtube.com/c/ComunidadeDivinaProvidência`).
- "Todos os direitos reservados a Comunidade Divina Providência | Rondonópolis MT".
- Sem endereço, horários, e-mail, política de privacidade ou CNPJ.

### 2.3 Mini-carrinho lateral (OceanWP)
Painel off-canvas "Carrinho" presente em todas as páginas.

## 3. Árvore do site

```
/ (Início)
├── /contato/                         Telefone, bairro, botão WhatsApp, mapa Google embutido
├── /comunidade/                      "A COMUNIDADE" — página VAZIA, fora do menu
├── /galerias/                        Grade com as 58 galerias (todas numa página)
│   ├── /category/galeria/ (+ /page/2…6)
│   ├── /category/acampamento/
│   ├── /category/cerco-jerico/
│   ├── /category/divina-jovem/
│   ├── /category/noticia/            vazia (0 posts)
│   ├── /author/startdesign/          arquivo do autor (exposto)
│   └── /{slug-da-galeria}/ × 58      posts de galeria
├── /produtos/  (menu "LOJA")         página Elementor com grade de produtos
├── /loja/                            arquivo padrão WooCommerce (duplica /produtos/)
│   ├── /categoria-produto/retiro/
│   ├── /produto/retiro-desperta26-retirante/   R$ 120,00
│   └── /produto/retiro-desperta-2026-servo/    R$ 100,00 (não aparece na grade da loja)
├── /carrinho/
├── /finalizar-compra/                redireciona (302) para /carrinho/ quando vazio
├── /minha-conta/                     login WooCommerce
│   └── /minha-conta/lost-password/
├── /festival-divina-brasa/           landing page (template "canvas", sem header/rodapé) — evento 28/03/2026
├── /festival-divina-brasa-3/         versão anterior da mesma landing (com header) — duplicada
└── /festajunina/                     landing antiga (2023) — ingressos via WhatsApp
```

## 4. Páginas (análise individual)

Para cada página: objetivo · conteúdo · imagens · funcionalidades · links · problemas · importância para o novo site (Alta / Média / Baixa).

### 4.1 Início — `/`
- **Objetivo:** vitrine geral.
- **Conteúdo (ordem):** (1) slider hero com 2 slides "18 MIRIM — VER FOTOS" e "Retiro Homens de Fé — VER FOTOS" (imagem atual mostra a equipe no camarim do Divina Jovem); (2) **LOJA** — card do produto em destaque (Retiro Desperta 2026 / Retirante, R$ 120,00, botão "Select options") + "VER TODOS PRODUTOS"; (3) **GALERIAS** — 8 galerias mais recentes + "VER TODAS GALERIAS"; (4) **NOSSO CARISMA** — citação; (5) seção **EVENTOS** com o texto "28 de Março / Sede da Comunidade Divina Providência" — **oculta em todos os dispositivos** (classes `elementor-hidden-desktop/tablet/mobile`), resquício do Divina Brasa; (6) **YOUTUBE** — vídeo incorporado "Inauguração Casa da Saúde São Padre Pio" (youtube `BIdZaTQ8AKI`); (7) **GRUPOS DE ORAÇÃO** — "Toda Segunda-Feira às 19:30h" + 4 logotipos (GOI Menino Jesus, FAC, Jovens Diante do Altar, Mãe da Divina Providência), **sem links**; (8) rodapé.
- **Imagens:** 20 `<img>`, 16 sem `alt`. Miniaturas das galerias carregam a imagem original (650–860 KB cada).
- **Funcionalidades:** slider, quick view de produto, player YouTube, Meta Pixel ×2, GTM, Google Analytics.
- **Problemas:** sem H1; nenhuma apresentação da comunidade; "Select options" em inglês; grupos de oração sem informação útil; seção de eventos abandonada; título do vídeo/contexto ausentes.
- **Importância:** Alta.

### 4.2 Contato — `/contato/`
- **Conteúdo:** "CONTATOS: Telefone: (66) 99665-5565 · Vila Goulart, Rondonópolis – MT, 78745 · botão Whatsapp"; mapa Google embutido (busca "comunidade divina providencia - sede").
- **Problemas:** sem formulário, sem e-mail, sem endereço completo, sem horários de secretaria; o único telefone é o da Casa Terapêutica (não o da Evangelização); não diferencia setores.
- **Importância:** Alta.

### 4.3 A Comunidade — `/comunidade/`
- **Conteúdo:** **vazio** (só header e rodapé). Criada em 22/07/2022 e nunca preenchida. Não está no menu.
- **Importância:** Alta (é exatamente a lacuna institucional mais grave).

### 4.4 Galerias — `/galerias/`
- **Conteúdo:** título "GALERIAS" + 58 cards (imagem, título, "Ver Mais »") em ordem cronológica inversa, numa única página longa, sem filtros, busca, anos ou paginação.
- **Importância:** Alta (maior acervo do site).

### 4.5 Posts de galeria — 58 URLs `/{slug}/`
- **Estrutura comum:** título, "Autor do post: startdesign", data, "Categoria do post: GALERIA", imagem destacada, grade de fotos com lightbox (Elementor/Happy Addons), bloco "Você também pode gostar" (3 posts aleatórios).
- **Texto:** praticamente nenhum (só o título repetido); `alt` das fotos vazio.
- **Inventário completo** em [05_CONTEUDOS_E_ASSETS.md](05_CONTEUDOS_E_ASSETS.md).
- **Problemas:** ver 06 (UX-06 a UX-09).

### 4.6 Arquivos de categoria — `/category/{acampamento|cerco-jerico|divina-jovem|galeria|noticia}/`
- Layout de blog padrão do tema com resumo; paginação (`/page/n/`). "NOTICIA" está vazia. Importância: Baixa (substituir por filtros na nova galeria).

### 4.7 Arquivo de autor — `/author/startdesign/`
- Expõe o nome de usuário do administrador/autor. Importância: nenhuma (remover/bloquear).

### 4.8 Produtos / Loja — `/produtos/` e `/loja/`
- `/produtos/` (destino do menu "LOJA"): grade Elementor com 1 produto visível (Retirante).
- `/loja/`: arquivo WooCommerce com ordenação (popularidade, recentes, preço) e "Ver: 12 / 24 / Tudo".
- **Problema:** duas páginas para a mesma função; o produto "Servo" não aparece na grade (provavelmente com visibilidade de catálogo oculta — acessível só por link direto).
- Importância: Alta (funcionalidade crítica). Detalhes em 04.

### 4.9 Produto — `/produto/retiro-desperta26-retirante/` e `/produto/retiro-desperta-2026-servo/`
- Galeria de 2 imagens (arte "DE5PERTA – Inscrição Retirante/Servo" e flyer), preço, descrição, campos personalizados obrigatórios (Nome Participante, Celular, CPF), resumo "Preço produto × qtd / Total", seletor de quantidade, botão "Adicionar ao carrinho", categoria "Retiro", "Produtos relacionados".
- Importância: Alta.

### 4.10 Carrinho — `/carrinho/` · Finalizar compra — `/finalizar-compra/`
- Carrinho vazio: "Seu carrinho está vazio. Retornar para a loja" + bloco "ADICIONAR PRODUTOS AO CARRINHO" com a grade de produtos.
- `/finalizar-compra/` com carrinho vazio → **302 para /carrinho/** (comportamento padrão). O `<title>` da página de checkout é "Carrinho" (erro de SEO).
- A meta description gerada pelo Yoast para essas páginas **vazou um carrinho antigo**: "Estacionamento VIP 20/04 R$ 100,00 … Camiseta Branca Divina Jovem – P R$ 75,00 … Total R$ 250,00" — evidência de produtos que já foram vendidos (estacionamento VIP, camisetas).
- Scripts de **Mercado Pago** carregados no carrinho (cartão, Pix, botão carteira). Detalhes em 04 e 09.
- Importância: Alta.

### 4.11 Minha conta — `/minha-conta/` e `/minha-conta/lost-password/`
- Formulário "Entrar": "Nome de usuário ou e-mail", "Senha", "Lembre-me", "Acessar", link "Perdeu sua senha?". **Não há formulário de cadastro nesta página.**
- Importância: Alta (manter).

### 4.12 Festival Divina Brasa — `/festival-divina-brasa/` (landing ativa) e `/festival-divina-brasa-3/` (versão anterior)
- **Landing (template canvas):** "28 MARÇO — O evento mais rústico da Comunidade Divina Providência. Serão 14 estações de churrasco, carnes nobres para você saborear a vontade. Shows AO VIVO." · "Sábado, 28 de março de 2026 · Sede da Comunidade Divina Providência" · vídeo Vimeo · "14 estações / Carnes nobres / 5 horas de serviço" · "VALORES R$ 170,00" · ícones de pagamento (dinheiro, Pix, Visa, Master, Elo, Diners, Amex) · "Idade: de 0 a 8 anos não pagam / 9 a 12 anos pagam meia entrada" · "Toda renda será revertida para manutenção e ampliação da sede da Comunidade Divina Providência, permitindo que nossos projetos de evangelização e acolhimento cheguem a mais pessoas." · Realização / Patrocínio Diamante / Patrocínio (logos) · links "COMUNIDADE DIVINA PROVIDÊNCIA", "INSTAGRAM" (`@festivaldivinabrasa`), "SEJA UM PATROCINADOR".
- **Venda de ingressos externa:** TotalIngressos (`totalingressos.com/evento/9440/...`).
- **Versão -3:** lotes 1º R$ 150 / 2º R$ 170 / 3º R$ 190; "Início às 18h00".
- **Problemas:** evento passado (mar/2026) ainda publicado sem aviso; duas páginas duplicadas; erro de digitação ("complera"); "SERVICO" sem cedilha.
- **Importância:** Média — é um **ótimo modelo de landing de evento** para o novo site (estrutura, benefícios, valores, patrocinadores, CTA).

### 4.13 Festa Junina — `/festajunina/`
- Arte de atrações + 2 botões "COMPRAR INGRESSO" → WhatsApp `5566999585404` com mensagem pré-preenchida "Tenho interesse no ingresso para Festa Junina". Última modificação 22/06/2023. **Evento antigo publicado; número de WhatsApp diferente dos demais.** Importância: Baixa (arquivar).

## 5. Links externos encontrados

| Destino | Onde | Observação |
|---|---|---|
| `wa.me/5566999082128` | Header + rodapé (Secretaria de Evangelização) | Ativo |
| `wa.me/5566996655565` | Rodapé (Secretaria da Casa Terapêutica) + Contato | Ativo |
| `api.whatsapp.com/send?phone=5566999585404…` | `/festajunina/` | Número isolado, de 2023 — validar |
| `facebook.com/adivinaprovidencia` | Rodapé | Verificado: página oficial (18,9 mil seguidores) |
| `instagram.com/adivinaprovidencia` | Rodapé | Verificado: perfil oficial (33,4 mil seguidores) |
| `youtube.com/c/ComunidadeDivinaProvidência` (`@ComunidadeDivinaProvidência`) | Rodapé | Verificado: 6,07 mil inscritos, 93 vídeos |
| `youtube.com/watch?v=BIdZaTQ8AKI` | Home (embed) | Inauguração Casa da Saúde São Padre Pio |
| `youtu.be/x7lF2L7ShWY` | Galeria 1 Ano Adoração Perpétua | Homilia |
| `youtube.com/watch?v=iIKlx5ZjJ8w`, `AvKyeqSpGFA`, `8fgyU9h-OeE` | Galeria Divina Jovem 2024 | URLs **coladas sem separação** no texto ("…AvKyeqSpGFAhttps://…") — embeds provavelmente quebrados |
| `youtu.be/Ko1WajE9Ve4` | Resumo na categoria Acampamento | — |
| `vimeo.com/1164134694` | Landing Divina Brasa | Vídeo promocional |
| `totalingressos.com/evento/9440/...` | Landing Divina Brasa | Bilheteria externa |
| `instagram.com/festivaldivinabrasa/` | Landing Divina Brasa | Perfil do evento |
| Google Maps embed | `/contato/` | Busca textual, não coordenadas |

## 6. Inventário completo das 78 URLs

Colunas: tipo; URL relativa; título (`<title>`, sem o sufixo do site); data de publicação (meta `article:published_time`, só posts); última modificação segundo o sitemap; quantidade de fotos vinculadas (lightbox).

| # | Tipo | URL | Título | Publicado | Última modificação (sitemap) | Fotos vinculadas |
|---|---|---|---|---|---|---|
| 1 | Página | `/` | Comunidade Divina Providência / Rondonópolis MT | — | 2026-11-11 | — |
| 2 | Página | `/carrinho/` | Carrinho | — | 2024-03-19 | — |
| 3 | Página | `/comunidade/` | A COMUNIDADE | — | 2022-07-22 | — |
| 4 | Página | `/contato/` | CONTATO | — | 2022-07-22 | — |
| 5 | Página | `/festajunina/` | Festa Junina | — | 2023-06-22 | — |
| 6 | Página | `/festival-divina-brasa-3/` | Festival Divina Brasa | — | 2026-02-11 | — |
| 7 | Página | `/festival-divina-brasa/` | Festival Divina Brasa | — | 2026-03-25 | — |
| 8 | Página | `/finalizar-compra/` | Carrinho | — | 2024-03-19 | — |
| 9 | Página | `/galerias/` | GALERIAS | — | 2025-10-07 | — |
| 10 | Página | `/loja/` | Loja | — | 2026-11-11 | — |
| 11 | Página | `/minha-conta/` | Minha conta | — | 2024-03-01 | — |
| 12 | Página | `/produtos/` | PRODUTOS | — | 2024-04-02 | — |
| 13 | Produto | `/produto/retiro-desperta-2026-servo/` | Retiro Desperta 2026 / Servo | — | 2026-11-11 | 2 |
| 14 | Produto | `/produto/retiro-desperta26-retirante/` | Retiro Desperta 2026 / Retirante | — | 2026-11-11 | 2 |
| 15 | Categoria de produto | `/categoria-produto/retiro/` | Arquivo de Retiro | — | 2026-11-11 | — |
| 16 | Categoria de posts | `/category/acampamento/` | Arquivo de ACAMPAMENTO | — | 2026-09-17 | — |
| 17 | Categoria de posts | `/category/cerco-jerico/` | Arquivo de CERCO JERICO | — | 2025-08-12 | — |
| 18 | Categoria de posts | `/category/divina-jovem/` | Arquivo de DIVINA JOVEM | — | 2026-09-27 | — |
| 19 | Categoria de posts | `/category/galeria/` | Arquivo de GALERIA | — | 2026-09-27 | — |
| 20 | Arquivo de autor | `/author/startdesign/` | startdesign, Autor em Comunidade Divina Providência | — | 2024-10-08 | — |
| 21 | Post (galeria) | `/festa-das-nacoes-2022/` | Festa das Nações 2022 | 2022-07-22 | 2022-07-22 | 133 |
| 22 | Post (galeria) | `/bota-fora-21o-senior/` | Bota Fora / 21º Acampamento Sênior 2022 | 2022-08-03 | 2022-08-03 | 117 |
| 23 | Post (galeria) | `/chegada-21o-acampamento-senior/` | Chegada / 21º Acampamento Sênior | 2022-08-08 | 2022-08-09 | 123 |
| 24 | Post (galeria) | `/equipes-de-trabalho-21o-acampamento-senior/` | Equipes de Trabalho / 21º Acampamento Sênior | 2022-08-08 | 2022-08-08 | 18 |
| 25 | Post (galeria) | `/tribos-21o-acampamento-senior/` | Tribos / 21º Acampamento Sênior | 2022-08-08 | 2022-08-08 | 8 |
| 26 | Post (galeria) | `/cerco-de-jerico-2022/` | Cerco de Jericó 2022 | 2022-08-22 | 2022-08-22 | 423 |
| 27 | Post (galeria) | `/bota-fora-13o-acampamento-juvenil-2022/` | Bota Fora / 13º Acampamento Juvenil 2022 | 2022-09-07 | 2022-09-07 | 152 |
| 28 | Post (galeria) | `/equipes-de-trabalho-13o-acampamento-juvenil-2022/` | Equipes de Trabalho / 13º Acampamento Juvenil 2022 | 2022-09-08 | 2022-09-08 | 17 |
| 29 | Post (galeria) | `/tribos-13o-acampamento-juvenil-2022/` | Tribos / 13º Acampamento Juvenil 2022 | 2022-09-08 | 2022-09-08 | 8 |
| 30 | Post (galeria) | `/chegada-13o-acampamento-juvenil-2022/` | Chegada / 13º Acampamento Juvenil 2022 | 2022-09-09 | 2022-09-09 | 157 |
| 31 | Post (galeria) | `/chegada-14-acampamento-juvenil/` | Chegada / 14 Acampamento Juvenil | 2023-02-22 | 2023-02-22 | 149 |
| 32 | Post (galeria) | `/acao-de-pascoa-jda/` | Ação de Páscoa JDA | 2023-04-17 | 2023-04-17 | 38 |
| 33 | Post (galeria) | `/luau-deus-quer-voce/` | Luau Deus Quer Voce | 2023-05-03 | 2023-05-03 | 53 |
| 34 | Post (galeria) | `/chegada-15-acampamento-mirim/` | Chegada 15 Acampamento Mirim | 2023-05-08 | 2023-05-08 | 126 |
| 35 | Post (galeria) | `/chegada-22-acampamento-senior/` | Chegada / 22 Acampamento Senior | 2023-08-08 | 2024-03-01 | 119 |
| 36 | Post (galeria) | `/15-acampamento-juvenil-2024/` | 15 Acampamento Juvenil / 2024 | 2024-05-24 | 2025-05-21 | 149 |
| 37 | Post (galeria) | `/16-acampamento-mirim-2024/` | 16 Acampamento Mirim / 2024 | 2024-05-24 | 2024-05-24 | 104 |
| 38 | Post (galeria) | `/17-acampamento-fac-2024/` | 17 Acampamento FAC / 2024 | 2024-05-24 | 2024-05-24 | 314 |
| 39 | Post (galeria) | `/divina-jovem-2024-festival-catolico/` | Divina Jovem 2024 / Festival Católico | 2024-05-24 | 2024-05-24 | 71 |
| 40 | Post (galeria) | `/festa-das-nacoes-2024/` | Festa das Nações 2024 | 2024-06-10 | 2024-06-11 | 497 |
| 41 | Post (galeria) | `/cerco-de-jerico-2024-1-dia/` | Cerco de Jericó 2024 / 1 Dia | 2024-08-20 | 2024-08-23 | 89 |
| 42 | Post (galeria) | `/cerco-de-jerico-2024-2-dia/` | Cerco de Jericó 2024 / 2 Dia | 2024-08-23 | 2024-08-23 | 50 |
| 43 | Post (galeria) | `/cerco-de-jerico-2024-3-dia/` | Cerco de Jericó 2024 / 3 Dia | 2024-08-23 | 2024-08-28 | 58 |
| 44 | Post (galeria) | `/cerco-de-jerico-2024-4-dia/` | Cerco de Jericó 2024 / 4 Dia | 2024-08-23 | 2025-05-21 | 68 |
| 45 | Post (galeria) | `/cerco-de-jerico-2024-5-dia/` | Cerco de Jericó 2024 / 5 Dia | 2024-08-28 | 2024-08-28 | 132 |
| 46 | Post (galeria) | `/cerco-de-jerico-2024-6-dia/` | Cerco de Jericó 2024 / 6 Dia | 2024-08-28 | 2024-08-28 | 32 |
| 47 | Post (galeria) | `/cerco-de-jerico-2024-7-dia/` | Cerco de Jericó 2024 / 7 Dia | 2024-08-28 | 2024-08-28 | 125 |
| 48 | Post (galeria) | `/18-acampamento-fac/` | 18 Acampamento FAC | 2024-09-10 | 2024-09-16 | 215 |
| 49 | Post (galeria) | `/23-acampamento-senior/` | 23 Acampamento Senior | 2024-09-16 | 2025-05-13 | 342 |
| 50 | Post (galeria) | `/festa-julina-2024/` | Festa Julina 2024 | 2024-09-16 | 2024-09-16 | 20 |
| 51 | Post (galeria) | `/missa-do-compromisso-08-10-24/` | Missa do Compromisso 08/10/24 | 2024-10-08 | 2025-05-13 | 60 |
| 52 | Post (galeria) | `/16-acampamento-juvenil/` | 16 Acampamento Juvenil | 2025-03-24 | 2025-05-13 | 153 |
| 53 | Post (galeria) | `/17-acampamento-mirim/` | 17 Acampamento Mirim | 2025-05-07 | 2025-05-21 | 165 |
| 54 | Post (galeria) | `/festa-das-nacoes-2025/` | Festa das Nações 2025 | 2025-06-10 | 2025-06-10 | 313 |
| 55 | Post (galeria) | `/arraia-da-divina-2025/` | Arraia da Divina 2025 | 2025-07-07 | 2025-07-07 | 38 |
| 56 | Post (galeria) | `/chegada-24-acampamento-senior/` | Chegada 24 Acampamento Sênior da Comunidade Divina Providência​ | 2025-07-28 | 2025-07-28 | 186 |
| 57 | Post (galeria) | `/cerco-de-jerico-2025-dia-1/` | Cerco de Jericó 2025 / Dia 1 | 2025-08-12 | 2025-08-12 | 75 |
| 58 | Post (galeria) | `/divina-jovem-2025-camarim/` | Divina Jovem 2025 / Camarim | 2025-10-07 | 2025-10-07 | 200 |
| 59 | Post (galeria) | `/divina-jovem-2025-colo-de-deus/` | Divina Jovem 2025 / Show Colo de Deus | 2025-10-07 | 2026-04-21 | 46 |
| 60 | Post (galeria) | `/divina-jovem-2025-flavio-vitor/` | Divina Jovem 2025 / Show Flávio Vitor | 2025-10-07 | 2025-10-07 | 86 |
| 61 | Post (galeria) | `/divina-jovem-2025-pregacoes/` | Divina Jovem 2025 / Pregações | 2025-10-07 | 2025-10-07 | 94 |
| 62 | Post (galeria) | `/divina-jovem-2025-terra-da-cruz/` | Divina Jovem 2025 / Terra da Cruz | 2025-10-07 | 2026-04-21 | 23 |
| 63 | Post (galeria) | `/divina-jovem-2025/` | Divina Jovem 2025 | 2025-10-07 | 2025-10-07 | 49 |
| 64 | Post (galeria) | `/teatro-vivo-2025-comunidade-terapeutica/` | Teatro Vivo 2025 / Comunidade Terapêutica | 2025-12-17 | 2026-04-21 | 29 |
| 65 | Post (galeria) | `/17-acampamento-juvenil/` | 17 Acampamento Juvenil | 2026-02-18 | 2026-02-18 | 157 |
| 66 | Post (galeria) | `/divina-brasa/` | Divina Brasa | 2026-04-16 | 2026-04-27 | 233 |
| 67 | Post (galeria) | `/curso-5-linguagens-do-amor-2026/` | Curso 5 Linguagens do Amor / 2026 | 2026-04-21 | 2026-04-21 | 113 |
| 68 | Post (galeria) | `/i-retiro-homens-de-fe/` | I Retiro Homens de Fé | 2026-04-22 | 2026-04-23 | 91 |
| 69 | Post (galeria) | `/18-acampamento-mirim/` | 18 Acampamento Mirim | 2026-05-06 | 2026-05-06 | 197 |
| 70 | Post (galeria) | `/arraia-da-divina-2026/` | Arraia da Divina 2026 | 2026-07-11 | 2026-07-11 | 85 |
| 71 | Post (galeria) | `/25-acampamento-senior/` | 25º Acampamento Sênior | 2026-07-28 | 2026-07-28 | 254 |
| 72 | Post (galeria) | `/esquenta-divina-jovem/` | Esquenta Divina Jovem | 2026-08-31 | 2026-08-31 | 111 |
| 73 | Post (galeria) | `/missa-1ano-adoracao-perpetua/` | 1 Ano Adoração Perpétua / Missa | 2026-09-01 | 2026-09-01 | 47 |
| 74 | Post (galeria) | `/20-acampamento-fac/` | 20 Acampamento FAC | 2026-09-17 | 2026-09-17 | 164 |
| 75 | Post (galeria) | `/divina-jovem-camarin-flavio-vitor/` | Divina Jovem / Camarim Flavio Vitor | 2026-09-26 | 2026-09-27 | 77 |
| 76 | Post (galeria) | `/divina-jovem-camarim-daniel/` | Divina Jovem / Camarim Daniel | 2026-09-27 | 2026-09-27 | 34 |
| 77 | Post (galeria) | `/divina-jovem-camarim-fraternidade-sjp-ii/` | Divina Jovem / Camarim Fraternidade SJP II | 2026-09-27 | 2026-09-27 | 55 |
| 78 | Post (galeria) | `/divinajovem-camarim-petony/` | Divina Jovem / Camarim Pe. Tony | 2026-09-27 | 2026-09-27 | 39 |

> Observação: a data de publicação dos posts é a data de **upload da galeria**, não necessariamente a data do evento (ex.: 4 galerias de eventos de 2023–2024 foram publicadas juntas em 24/05/2024).
