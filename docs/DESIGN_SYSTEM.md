# Design system — Comunidade Divina Providência

> Fonte da verdade no código: `src/app/globals.css` (bloco `@theme` do Tailwind 4) e `src/components/ui.tsx`.
> Última atualização: 27/11/2026 (paleta oficial vinho/vermelho/dourado/marfim definida pela comunidade).

## 1. Direção

**Conceito:** "casa da misericórdia" — acolhimento de família, sobriedade litúrgica e energia jovem. O vinho dá estrutura, o vermelho dá energia em pontos pequenos, o dourado aparece só em detalhes e o marfim é o fundo predominante. Fotografias reais da comunidade são protagonistas.

**Referências** (detalhes em `FRAMER_REFERENCES.md`): MyChurch (hero fotográfico, cartões de evento, acolhimento), Riwaq (títulos serifados em dois tons, agenda em linhas, filtros em pílula, programação em tabela), Fosters (painel colorido com acordeão + foto, cartões de projeto alternados).

## 2. Logotipo

| Arquivo | Uso |
|---|---|
| `public/brand/original/logo-oficial-anexo.webp` | **Arquivo original enviado pela comunidade (27/11/2026). Não editar.** 2000×667, com transparência. |
| `public/brand/logo-oficial.webp` | Cópia idêntica usada no site (header e footer). |
| `public/brand/logo-horizontal.png`, `logo-vertical.png` | Versões publicadas no site atual (referência; não usadas no layout). |
| `public/brand/grupo-*.png` | Logotipos dos quatro grupos de oração. |
| `src/app/icon.png`, `apple-icon.png` | Ícone do site (avatar oficial do WordPress atual). |

Regras: a logo nunca é recolorida, distorcida ou recriada. Sobre o vinho (footer) ela fica numa superfície marfim (`bg-paper`, cantos `--radius-lg`).

## 3. Cores (tokens)

| Token Tailwind | Hex | Papel | Contraste verificado |
|---|---|---|---|
| `paper` | `#FFF8F2` | Marfim — fundo principal | — |
| `sand` | `#F7F1E9` | Creme claro — seções alternadas, cards | — |
| `linen` | `#EFE3D6` | Bordas suaves, fundo de imagem carregando | — |
| `ink` | `#2B2024` | Carvão — texto | 14,95:1 no marfim |
| `ink-soft` | `#66585D` | Texto secundário | 6,4:1 marfim · 6,0:1 creme |
| `wine` | `#7B2733` | **Cor principal**: botões, títulos de destaque (segunda linha em itálico), carisma, footer, painéis | 9,16:1 no marfim · branco sobre ele 9,63:1 |
| `wine-hover` | `#65202A` | Hover/pressionado | branco 11,7:1 |
| `red` | `#DA4540` | Vermelho institucional: ícones, sublinhado do menu ativo, números grandes de edição | 4,07:1 no marfim → **só ícones e texto ≥ 24 px** |
| `red-dark` | `#A52C34` | Texto pequeno vermelho e selos com texto branco ("Inscrições abertas") | 6,63:1 no marfim · branco 6,98:1 |
| `gold` | `#CCAF76` | Dourado: filetes, bordas, divisórias, ornamentos | 2,0:1 no marfim → **nunca texto sobre claro** |
| `gold-light` / `gold-night` | `#E6C58C` | Texto dourado sobre vinho/escuro | 5,84:1 no vinho · 10,47:1 no night |
| `gold-ink` | `#7A5E2A` | Dourado para texto sobre claro (reserva) | 5,41:1 no creme |
| `night` | `#2E1218` | Vinho quase preto: galeria da home, adoração, lightbox, blocos restritos | — |
| `on-night` | `#FFF8F2` | Texto sobre vinho/night | 9,16:1 vinho · 16,4:1 night |
| `on-night-soft` | `#F2E3DC` | Texto secundário sobre vinho/night | 7,7:1 vinho · 12,6:1 night |

Branco `#FFFFFF` é usado sobre `wine`, `wine-hover` e `red-dark`. Verde não é usado.

**Onde cada cor aparece:** header marfim com logo original e CTA vinho · hero com foto real + sobreposição vinho (gradiente lateral) e itálico dourado claro · "Quem somos" marfim com segunda linha do título em vinho · "Nosso carisma" em fundo vinho com filetes dourados · acampamentos com números de edição em vermelho · eventos em linhas claras com mês em vermelho escuro e selo vermelho escuro · formulários em branco com foco vinho · footer vinho com logo sobre marfim e títulos em dourado claro.

## 4. Tipografia

| Família | Origem / licença | Uso |
|---|---|---|
| **Gambetta** (variável, com itálico) | Fontshare — ITF Free Font License (auto-hospedagem permitida; texto em `src/app/fonts/LICENSE-FONTSHARE-ITF-FFL.txt`) | Títulos (`font-display`), números de data, citações. O itálico ecoa o "DivinaProvidência" do logotipo. |
| **Switzer** (variável) | Fontshare — mesma licença | Texto, interface, botões (`font-sans`). |

Escala (fluida com `clamp`): H1 de página 2,4 → 4,6 rem · H1 do hero 3,1 → 7,2 rem · H2 2 → 3,6 rem · corpo 17 px (1,0625 rem), linha 1,6 · legendas 14 px. Títulos com `text-wrap: balance`, parágrafos `pretty`, `letter-spacing` −0,015 em nos títulos (nunca abaixo de −0,025 em). Números de datas com `tabular-nums`.

**Título em dois tons** (`SectionTitle`): primeira linha em carvão, segunda em itálico vinho (ou dourado claro sobre escuro). Não há "eyebrow/kicker" acima de títulos (regra do Impeccable).

## 5. Espaço, grid e forma

- Container `.wrap`: `min(1240px, 100% − 2,5rem)` (− 4 rem a partir de 768 px). Bordas esquerda/direita iguais em todas as seções.
- Seções: `py-20 md:py-28` (homepage 24/32). Mais espaço acima de títulos do que abaixo.
- Raios: `sm 8` · `md 14` · `lg 22` · `xl 32` px. Botões em pílula. Janela em arco (`.arch`) só para fotos de oração/liturgia.
- Sombras: só no hover de cartões (`.lift`: −2 px + sombra suave com deslocamento).

## 6. Componentes

| Componente | Arquivo | Notas |
|---|---|---|
| `ButtonLink` (`.btn`, `.btn-ghost`, `.btn-light`, `.btn-ghost-light`) | `ui.tsx`, `globals.css` | Pílula com círculo de seta que desliza no hover e escala 0,97 ao pressionar (adaptado de Uiverse). Externos ganham ↗ e "(abre em nova aba)" para leitores de tela. Altura mínima 48 px. |
| `TextLink` | `ui.tsx` | Link com sublinhado que se desenha. |
| `Photo` | `ui.tsx` | `next/image` com `fill`, fotos do acervo oficial; `preload` para a primeira dobra. |
| `SectionTitle`, `Lede`, `PageHeader`, `Breadcrumbs`, `Section`, `FactList`, `Note` | `ui.tsx` | Estrutura das páginas internas. |
| `BlurTitle` | `ui.tsx` | Entrada palavra a palavra do H1 do hero (técnica do BlurText/React Bits em CSS). |
| `Header` | `Header.tsx` | Marfim fixo, dropdown "Participe" acessível, menu mobile em tela cheia com entrada escalonada, foco preso, Esc. |
| `Footer` | `Footer.tsx` | Vinho, logo sobre marfim, colunas de links, contatos por setor, redes. |
| `EventList` | `EventList.tsx` | Linhas de agenda (dia da semana, dia, mês, título, categoria, data, selo). |
| `Carisma` | `Carisma.tsx` | Momento tipográfico com palavras que "acendem" na rolagem (CSS scroll-driven, sem JS). |
| `ProgramIndex`, `ProgramDetail` | — | Listagem alternada e página de acampamento/retiro. |
| `GalleryCard(Client)`, `GalleryBrowser`, `GalleryViewer` | — | Cartões, filtros com URL, grade + lightbox `<dialog>`. |
| `VideoFacade` | — | Miniatura do YouTube; player `youtube-nocookie` só após o clique. |
| `ContactForm` | — | Rádios e checkbox customizados (Uiverse), validação inline, abre o WhatsApp. |
| `BrandIcon` | — | Glifos oficiais de Instagram/YouTube/Facebook/WhatsApp (Simple Icons, CC0). Demais ícones: Lucide. |

## 7. Movimento

- Hero: entrada única com desfoque → nitidez por palavra (90 ms de escalonamento) e `fade-up` no restante.
- Um momento por página longa: carisma em scroll-driven (Chrome/Edge/Safari recentes; demais veem o texto pronto).
- Micro-interações: cartão sobe 2 px, foto aproxima 1,03, seta do botão desliza 4 px, sublinhado se desenha.
- Sem parallax, 3D, carrossel automático ou animação contínua. `prefers-reduced-motion` desliga tudo e mostra o conteúdo final.

## 8. Superfícies do navegador

Seleção de texto em dourado claro, cursor de digitação vinho, anel de foco vinho (dourado claro sobre fundos escuros) com `outline-offset: 3px`, barra de rolagem no tom do carvão, `theme-color` marfim.

## 9. Acessibilidade (resumo)

WCAG 2.2 AA como referência: contrastes da tabela acima, alvos de toque ≥ 44 px, link "Pular para o conteúdo", um `<h1>` por página, hierarquia sem saltos (verificado em 91 rotas), `alt` em todas as imagens (decorativas com `alt=""`), estados de foco visíveis, formulários com labels visíveis, erros junto ao campo e foco no primeiro erro, `aria-live` para contagens e confirmações.
