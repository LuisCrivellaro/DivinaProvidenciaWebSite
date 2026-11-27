# Componentes e recursos externos

> Licenças verificadas em 27/11/2026. Nenhuma biblioteca de componentes foi instalada: os componentes foram **reescritos** a partir da técnica de origem, para não carregar dependências inteiras por um efeito pequeno.

| Componente | Origem | URL original | Licença | Onde é usado | Adaptações | Dependências | Impacto em performance |
|---|---|---|---|---|---|---|---|
| Entrada do título palavra a palavra (`BlurTitle`, `.blur-word`) | React Bits — BlurText | https://reactbits.dev/text-animations/blur-text · código em `DavidHDev/react-bits` `src/ts-tailwind/TextAnimations/BlurText` | MIT + Commons Clause (uso em sites permitido; proibido revender os componentes) | H1 do hero da home | Só o efeito "blur" vindo de baixo, por palavra, executado uma vez no carregamento; reescrito em CSS (sem `motion/react`); texto completo exposto a leitores de tela; desligado com `prefers-reduced-motion` | nenhuma | ~0 KB de JS |
| Menu mobile com entrada escalonada | React Bits — StaggeredMenu (conceito) | https://reactbits.dev/components/staggered-menu | MIT + Commons Clause | `Header.tsx` (menu em tela cheia) | Apenas o escalonamento dos itens (35 ms) via CSS `fade-up`; sem GSAP; com foco preso, Esc e trava de rolagem | nenhuma | ~0 KB |
| Revelação do carisma na rolagem | React Bits — ScrollReveal (conceito) | https://reactbits.dev/text-animations/scroll-reveal | MIT + Commons Clause | `Carisma.tsx` (home e Comunidade) | Implementado com CSS `animation-timeline: view()` em vez de GSAP; sem suporte = texto já visível | nenhuma | 0 KB de JS |
| Botão pílula com seta que desliza | Uiverse — `alexmaracinaru/perfect-panda-77` | https://uiverse.io/alexmaracinaru/perfect-panda-77 | MIT | `.btn` em todo o site | Cores e fonte do design system, círculo da seta translúcido, `:active` scale 0,97, foco visível | nenhuma | CSS mínimo |
| Ícone que acompanha o botão | Uiverse — `adamgiebl/new-bird-34` | https://uiverse.io/adamgiebl/new-bird-34 | MIT | `.btn .btn-icon` | Só o conceito do ícone em cápsula; sem expansão total (prejudicava a leitura) | nenhuma | — |
| Checkbox e rádios customizados | Inspirados nos checkboxes do Uiverse (categoria https://uiverse.io/checkboxes) | — | MIT | `ContactForm.tsx` | Input nativo mantido (acessível), marcação animada com `peer-checked`, foco visível | nenhuma | — |
| Anel de carregamento | Inspirado nos loaders do Uiverse (https://uiverse.io/loaders) | — | MIT | Lightbox (`GalleryViewer.tsx`) | Anel dourado girando atrás da foto; some quando a imagem cobre | nenhuma | — |
| Ícones de marca | Simple Icons | https://simpleicons.org | CC0 1.0 | `BrandIcon.tsx` (Instagram, YouTube, Facebook, WhatsApp) | Só os 4 caminhos SVG | nenhuma | ~4 KB |
| Ícones de interface | Lucide | https://lucide.dev | ISC | Todo o site | — | `lucide-react` (tree-shaken) | só os ícones usados |
| Fontes Gambetta e Switzer | Fontshare (Indian Type Foundry) | https://www.fontshare.com/fonts/gambetta · /switzer | ITF Free Font License (auto-hospedagem permitida) | Todo o site | Variáveis, auto-hospedadas com `next/font/local` | nenhuma | 116 KB (3 arquivos woff2) |

**Avaliados e descartados:** React Bits `SplitText`/`ScrollFloat` (exigem GSAP), `CircularGallery`/`DomeGallery` (WebGL, pesados, sem ganho para galerias de evento), `TiltedCard`/`SpotlightCard` (efeito "tech", fora da identidade), contadores `CountUp` (números sem fonte viram métrica vazia). Uiverse: botões com glow/neon e loaders chamativos (contra a direção visual).
