# Design system — Comunidade Divina Providência

> Fonte da verdade no código: `src/app/globals.css` (bloco `@theme` do Tailwind 4) e `src/components/ui.tsx`.
> Última atualização: 27/11/2026 — **redesign dourado**: o vinho e o vermelho deram lugar ao dourado `#B99550` como cor de destaque, e entrou um sistema de animações de entrada.

## 1. Direção

**Conceito:** "casa da misericórdia" — acolhimento de família, sobriedade litúrgica e energia jovem. O dourado é a luz da marca (calor, esperança, acolhimento): botões, selos, filetes e uma faixa de destaque. O marfim é o fundo predominante e o café profundo (`night`) dá peso às seções escuras. Fotografias reais da comunidade são protagonistas.

**Referências** (detalhes em `FRAMER_REFERENCES.md`): MyChurch (hero fotográfico, cartões de evento, acolhimento), Riwaq (títulos serifados em dois tons, agenda em linhas, filtros em pílula, programação em tabela), Fosters (painel colorido com acordeão + foto, cartões de projeto alternados).

## 2. Logotipo

| Arquivo | Uso |
|---|---|
| `public/brand/original/logo-oficial-anexo.webp` | **Arquivo original enviado pela comunidade (27/11/2026). Não editar.** 2000×667, com transparência. |
| `public/brand/logo-oficial.webp` | Cópia idêntica usada no site (header e footer). |
| `public/brand/logo-horizontal.png`, `logo-vertical.png` | Versões publicadas no site atual (referência; não usadas no layout). |
| `public/brand/grupo-*.png` | Logotipos dos quatro grupos de oração. |
| `src/app/icon.png`, `apple-icon.png` | Ícone do site (avatar oficial do WordPress atual). |

Regras: a logo nunca é recolorida, distorcida ou recriada (o vermelho e o dourado dela continuam como estão). Sobre fundo escuro (footer) ela fica numa superfície marfim (`bg-paper`, cantos `--radius-lg`).

## 3. Cores (tokens)

Contrastes calculados pela fórmula WCAG 2.x.

| Token Tailwind | Hex | Papel | Contraste verificado |
|---|---|---|---|
| `paper` | `#FFF8F2` | Marfim — fundo principal | — |
| `sand` | `#F7F1E9` | Creme claro — seções alternadas, cards | — |
| `linen` | `#EFE3D6` | Bordas suaves, fundo de imagem carregando | — |
| `ink` | `#2A221D` | Carvão quente — texto | 14,8:1 marfim · 13,9:1 creme |
| `ink-soft` | `#675C53` | Texto secundário | 6,2:1 marfim · 5,8:1 creme |
| `gold` | `#B99550` | **Dourado principal**: botões, selos "Inscrições abertas", faixa do carisma, painéis de destaque, filetes, sublinhado do menu | carvão sobre ele **5,6:1** · 2,7:1 no marfim → **nunca texto dourado sobre claro**; branco sobre ele 2,8:1 → **nunca texto branco sobre dourado** |
| `gold-bright` | `#C9A660` | Hover dos botões dourados (fica mais luminoso, não mais escuro) | carvão 6,8:1 |
| `gold-deep` | `#846430` | Dourado profundo: segunda linha dos títulos, links, ícones, números de edição, mês na agenda, foco | 5,2:1 marfim · 4,9:1 creme |
| `gold-light` | `#E6C58C` | Texto dourado sobre fundos escuros (fotos, `.keep-dark`) | 10,5:1 no café |
| `gold-night` | `#3F2C0E` | Destaque (itálicos, selos, links) sobre a superfície `night` dourada. Em `.keep-dark` volta a `#E6C58C` | 4,7:1 no dourado |
| `gold-ink` | `#6F5322` | Reserva para texto pequeno dourado | 6,8:1 marfim |
| `danger` | `#9C3D2E` | **Só** mensagens e bordas de erro de formulário (não é cor de marca) | 6,4:1 marfim |
| `night` | `#B99550` | **Desde 27/11/2026 é o dourado principal** (antes café `#1F1A16`): rodapé, painel "Fé que vira cuidado", galeria e próximos encontros da home, adoração, cartões de destaque | — |
| `on-night` / `on-night-soft` | `#1F1A16` / `#3A2E25` | Texto sobre a superfície `night` dourada | 6,1:1 / 4,7:1 |

**`.keep-dark`** devolve os valores café (`night #1F1A16`, `on-night #FFF8F2`, `on-night-soft #EEE3D6`, `gold-night #E6C58C`) só dentro do elemento. Usado onde o escuro sombreia fotos: hero, cartões com foto da home, ladrilhos da galeria, cartaz do próximo encontro, capa de vídeo, painel do login e os visualizadores de foto.

Regra de ouro: **fundo dourado → texto carvão; fundo claro → dourado só em `gold-deep`; fundo escuro → `gold-light`.** Vinho e vermelho não existem mais como tokens.

**Onde cada cor aparece:** header marfim com sublinhado dourado e CTA dourado · hero com foto real e sobreposição café · títulos com segunda linha em itálico `gold-deep` · "Nosso carisma" numa faixa dourada com luz vinda do alto (`.carisma-band`) e texto carvão · cartão "Obras e caridade", cartão da Comunidade Terapêutica e primeira opção de inscrição em dourado com texto carvão · selos "Inscrições abertas" dourados · números de edição, mês da agenda e ícones em `gold-deep` · formulários brancos com foco e seleção dourados e erros em `danger` · footer café com filete dourado no topo e títulos em dourado claro.

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
- Sombras: hover de cartões (`.lift`: −4 px + sombra quente) e sombra dourada discreta sob o botão primário.

## 6. Componentes

| Componente | Arquivo | Notas |
|---|---|---|
| `ButtonLink` (`.btn`, `.btn-ghost`, `.btn-light`, `.btn-ghost-light`) | `ui.tsx`, `globals.css` | Pílula dourada com texto carvão; no hover sobe 1 px, clareia e um brilho atravessa o botão uma vez (luz sobre folha de ouro); círculo da seta desliza 4 px; escala 0,98 ao pressionar. Ghost ganha borda `gold-deep` no hover. Externos ganham ↗ e "(abre em nova aba)". Altura mínima 48 px. |
| `TextLink` | `ui.tsx` | Link com sublinhado que se desenha. |
| `Photo` | `ui.tsx` | `next/image` com `fill`, fotos do acervo oficial; `preload` para a primeira dobra; `reveal` liga a revelação em cortina. |
| `SectionTitle`, `Lede`, `PageHeader`, `Breadcrumbs`, `Section`, `FactList`, `Note` | `ui.tsx` | Estrutura das páginas internas. |
| `BlurTitle` | `ui.tsx` | Entrada palavra a palavra do H1 do hero (técnica do BlurText/React Bits em CSS). |
| `Header` | `Header.tsx` | Marfim fixo; links com filete dourado que nasce do centro (`.nav-link`); dropdown "Participe" que desce com fade e itens em cascata (`.dropdown-panel`); CTA dourado (só ícone entre 1024 e 1279 px); menu mobile em tela cheia com entrada escalonada, foco preso, Esc. |
| `Footer` | `Footer.tsx` | Dourado principal com texto café, logo sobre marfim, colunas que entram em cascata, contatos por setor, redes. |
| `EventList` | `EventList.tsx` | Linhas de agenda (dia da semana, dia, mês, título, categoria, data, selo). |
| `Carisma` | `Carisma.tsx` | Faixa dourada; as palavras ganham tinta na rolagem (CSS scroll-driven, sem JS). |
| `RevealObserver` | `RevealObserver.tsx`, `lib/reveal.ts` | Motor único das animações de entrada (ver §7). |
| `ProgramIndex`, `ProgramDetail` | — | Listagem alternada e página de acampamento/retiro. |
| `GalleryCard(Client)`, `GalleryBrowser`, `GalleryViewer` | — | Cartões, filtros com URL, grade + lightbox `<dialog>`. |
| `VideoFacade` | — | Miniatura do YouTube; player `youtube-nocookie` só após o clique. |
| `ContactForm` | — | Rádios e checkbox customizados (Uiverse), validação inline, abre o WhatsApp. |
| `BrandIcon` | — | Glifos oficiais de Instagram/YouTube/Facebook/WhatsApp (Simple Icons, CC0). Demais ícones: Lucide. |

## 7. Movimento

Princípios (revistos em 27/11/2026 para um site mais animado): entradas com presença, que sobem, desfocam e crescem; um pouco de **vida contínua** onde faz sentido (brasas, faixas que correm, luz que gira, botão principal que pulsa); nenhum layout shift (só `opacity`, `transform`, `filter`, `clip-path`); tudo para com `prefers-reduced-motion`.

**Entradas ao rolar** — um só motor, `RevealObserver` (IntersectionObserver), montado no layout:

| Marcação | Efeito |
|---|---|
| `data-reveal` | sobe 56 px, sai do desfoque (8 px) e cresce de 0,96 para 1 (0,9–1,2 s, `ease-out-expo`) |
| `data-reveal="fade"` | só aparece |
| `data-reveal="image"` (ou `<Photo reveal>`) | cortina inteira de baixo para cima + a foto assenta de 1,3 para 1 |
| `data-reveal="rule"` | filete que se desenha do centro |
| `data-reveal-stagger` no contêiner | filhos diretos em cascata (90 ms entre itens que entram **juntos**, máx. 540 ms) |

Já vêm ligados: `SectionTitle` (exceto o H1), o conteúdo de todo `Section`, `EventList`, `ProgramIndex`, grades da galeria, vídeos, loja, contato, obras, colunas do footer e as seções da home.

Como funciona (e por que não quebra): o script `lib/reveal.ts` põe `.js-reveal` no `<html>` antes da primeira pintura, só com JS e sem redução de movimento. O estado escondido é **só CSS**; o observer apenas acrescenta `.is-revealed` depois que o React hidratou o elemento (evita *hydration mismatch*) e, ao fim, `.reveal-done`, que devolve as transições normais de hover. Se o observer não montar em 3 s, o modo é desligado e tudo aparece.

**Outros movimentos:** hero com entrada palavra a palavra (BlurText em CSS) e parallax muito discreto da foto (4 %, scroll-driven, sem JS) · carisma scroll-driven · botões com brilho no hover · fotos aproximam 1,045 · linhas da agenda ganham fundo dourado translúcido e o dia fica dourado · dropdown com `@starting-style`.

**Movimento contínuo e interativo** (`Decor.tsx`, `Motion.tsx`, seção "Movimento contínuo" do `globals.css`):

| Peça | Onde | Efeito |
|---|---|---|
| `.scroll-progress` | layout | filete dourado no topo que acompanha a leitura (scroll-driven) |
| `.ken-burns` | hero | a foto aproxima e desloca devagar (24 s, vai e volta) |
| `<Embers>` | hero | brasas douradas subindo; posições determinísticas (mesmo HTML no servidor e no cliente) |
| `.gold-shimmer` | destaque do H1 da home | brilho de folha de ouro que atravessa a palavra em laço |
| `.btn-pulse` + `data-magnetic` | CTA do hero | anel que pulsa, brilho que passa sozinho e botão atraído pelo cursor |
| `.float`, `.live-dot` | cartão "Próximo na agenda" | cartão flutua; ponto pulsando ao lado de "Inscrições abertas" |
| `<Marquee>` | home: faixa dourada, tira de fotos da galeria, faixa do lema | conteúdo duplicado correndo em laço; pausa no hover |
| `<RotatingBadge>` | "Quem somos" | selo "Desde 2005" girando |
| `<CountUp>` | números da comunidade | conta de 0 até o valor ao entrar na tela; o HTML do servidor já traz o valor final |
| `.title-accent` | `SectionTitle` | sublinhado dourado que se desenha sob a linha em itálico |
| `.lift` / `data-tilt` (PointerFX) | todos os cartões | inclinação 3D na direção do cursor e foco de luz; cartões largos inclinam menos; só mouse |
| `.carisma-band::before` | faixa do carisma | raios de luz girando devagar (90 s) |
| `<UpcomingEvents>` + `<Countdown>` | "Próximos encontros" da home | **Caminho de fé**: o próximo evento vira um cartaz emoldurado (estrelas nos cantos, Ken Burns, data gigante) com contagem regressiva ao vivo; os seguintes ficam num fio dourado que se desenha com a rolagem, com contas que acendem e o ano em contorno. A contagem usa `useSyncExternalStore` com um relógio único e o horário do servidor na hidratação |
| `<PhotoStrip>` | tira de fotos da galeria na home | a tira corre e pausa no hover/foco; cada foto sobe com moldura dourada e abre em tela cheia (`<dialog>`) com ficha do álbum (categoria, contexto, nº de fotos, data), "Ver o álbum", "Compartilhar", setas, teclado, gesto e trilho de miniaturas. A cópia do laço fica fora do leitor de tela e da tabulação |

> Obs.: no Windows, o Turbopack às vezes não percebe mudanças no `globals.css` feitas por script ou depois de um `next build`. Se um estilo novo não aparecer no `next dev`, salve o arquivo pelo editor ou reinicie o servidor.

Com `prefers-reduced-motion`, os laços param, as brasas somem, as faixas viram linhas estáticas centralizadas e o PointerFX não liga.

Navegadores sem scroll-driven animations (Firefox) veem o hero estático e o carisma já pintado; o restante funciona em todos.

## 8. Superfícies do navegador

Seleção de texto em dourado claro, cursor de digitação `gold-deep`, anel de foco `gold-deep` (dourado claro sobre fundos escuros) com `outline-offset: 3px`, barra de rolagem no tom do carvão, `theme-color` marfim.

## 9. Acessibilidade (resumo)

WCAG 2.2 AA como referência: contrastes da tabela acima, alvos de toque ≥ 44 px, link "Pular para o conteúdo", um `<h1>` por página, hierarquia sem saltos (verificado em 91 rotas), `alt` em todas as imagens (decorativas com `alt=""`), estados de foco visíveis, formulários com labels visíveis, erros junto ao campo e foco no primeiro erro, `aria-live` para contagens e confirmações.
