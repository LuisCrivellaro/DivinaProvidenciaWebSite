# Auditoria dos 50 princípios

> Legenda: ✅ aplicado e verificado no site · ◐ parcial · ➖ não pertinente (com motivo) · ⏳ pendente.
> Verificações citadas: capturas em 1440/390 px (CDP), navegador integrado, `scripts/audit-links.mjs` (91 rotas), `scripts/perf.mjs`, ESLint/TypeScript/build.

## 01 — Direção criativa e identidade
| # | Princípio | Status | Como / onde |
|---|---|---|---|
| 1 | Originalidade | ✅ | Composição própria (bento com fotos variadas, linhas de agenda, painel vinho com acordeão, momento tipográfico do carisma). Nada copiado dos templates. |
| 2 | Identidade | ✅ | Logo oficial original, paleta oficial, lema e carisma em destaque, iconografia católica só onde cabe (cruz, capela, Santíssimo). |
| 3 | Referências | ✅ | Ver `FRAMER_REFERENCES.md`: soluções adaptadas, não layouts copiados; nenhum elemento islâmico do Riwaq. |
| 4 | Direção de arte | ✅ | Fotos escolhidas em folha de contato (108 candidatas), recorte e posição ajustados (ex.: arco da Missa do Compromisso). |
| 5 | Hero | ✅ | Foto real do 25º Sênior, título "Sua família, nossa missão." com entrada, card do próximo evento com inscrições abertas. |
| 6 | Storytelling | ✅ | Home: quem somos → vida em comunidade → agenda → acampamentos → carisma → obras → memória → oração → vídeo → contato. |
| 7 | Hierarquia | ✅ | Um H1 por página (verificado), títulos em dois tons, CTA principal único por bloco. |
| 8 | Autenticidade | ✅ | Só fatos com fonte; frases não comprovadas removidas na revisão (Humanizer). |
| 9 | Consistência | ✅ | Tokens únicos, um estilo de botão, um de cartão, uma escala de raios. |
| 10 | Propósito | ✅ | Cada seção leva a uma ação real (inscrição, WhatsApp, agenda, galeria). |

## 02 — Design visual e tipografia
| # | Princípio | Status | Como / onde |
|---|---|---|---|
| 11 | Legibilidade | ✅ | Switzer 17 px/1,6; medidas ≤ 62–70 ch. |
| 12 | Peso tipográfico | ✅ | Gambetta 500 nos títulos, Switzer 400–600; nada abaixo de 400 em texto. |
| 13 | Contraste | ✅ | Todos os pares documentados em `DESIGN_SYSTEM.md` ≥ 4,5:1 (texto) — vermelho e dourado restritos onde não passam. |
| 14 | Espaçamento | ✅ | Grupos apertados, seções com 80–128 px; mais espaço acima dos títulos. |
| 15 | Alinhamento | ✅ | `.wrap` com bordas iguais; grids alinhados. |
| 16 | Agrupamento | ✅ | Fichas `FactList`, contatos por setor, filtros agrupados em `fieldset`. |
| 17 | Border radius | ✅ | Escala 8/14/22/32; cartões internos menores que externos. |
| 18 | Cores com significado | ✅ | Vinho = ação/estrutura; vermelho escuro = "inscrições abertas"; dourado = detalhe; night = oração/memória. |
| 19 | Letter spacing | ✅ | Só −0,015 em em títulos; nenhum tracking em caixa-alta. |
| 20 | Minimalismo | ✅ | Pouco texto por bloco, sem esconder informações (horários a confirmar dizem isso). |

## 03 — UX e componentes funcionais
| # | Princípio | Status | Como / onde |
|---|---|---|---|
| 21 | CTAs claros | ✅ | "Inscrição de retirante · R$ 120,00", "Perguntar à secretaria", "Abrir no site oficial". |
| 22 | Linguagem humana | ✅ | Revisão Humanizer (ver `SKILLS_APLICADAS.md`). |
| 23 | Labels | ✅ | Labels visíveis em todos os campos; legend nos grupos de rádio. |
| 24 | Placeholders com exemplo | ✅ | "Ex.: Maria Aparecida…", "Ex.: Gostaria de saber quando abrem…". |
| 25 | Máscaras | ➖ | O formulário do site não pede telefone/CPF (o contato segue pelo WhatsApp). Máscaras de CPF/celular são recomendação para o formulário de inscrição quando migrar (ver `INTEGRATIONS.md`). |
| 26 | Validação junto ao campo | ✅ | Testado: 5 erros inline, `aria-invalid`, foco no primeiro erro. |
| 27 | Feedback | ✅ | Confirmação honesta ("Abrimos o WhatsApp… toque em Enviar"), aviso se o navegador bloquear a aba, contagem de galerias em `aria-live`, anel de carregamento no lightbox, esqueleto nas rotas dinâmicas. |
| 28 | Rádio/checkbox corretos | ✅ | Rádio para secretaria (escolha única), checkbox para o aceite. |
| 29 | Touch targets | ✅ | Botões ≥ 48 px, links ≥ 44 px, itens do menu mobile 56 px (medido). |
| 30 | Onboarding em etapas | ◐ | "Como funciona" da loja em 4 passos numerados. Inscrição multi-etapas fica para quando o checkout migrar. |

## 04 — Motion e storytelling
| # | Princípio | Status | Como / onde |
|---|---|---|---|
| 31 | Scroll animations | ✅ (uma) | Só o carisma revela na rolagem; nada de fade em toda seção. |
| 32 | Parallax | ➖ | Não melhora a narrativa; evitado (taste-skill proíbe parallax em texto). |
| 33 | Scroll storytelling | ◐ | Ordem narrativa da home + momento do carisma; sem cenas presas. |
| 34 | Sticky sections | ✅ | Títulos fixos à esquerda em "Próximos encontros", Agenda e História (desktop). |
| 35 | Transições | ✅ | Curvas expo/quart, 250–900 ms. |
| 36 | Microinterações | ✅ | Botão (seta, pressão), cartão (sobe 2 px), foto (1,03), sublinhado, acordeão (+ gira). |
| 37 | Animações 3D | ➖ | Sem propósito para a comunidade; evitado por direção visual e performance. |
| 38 | Sequenciamento | ✅ | Hero: palavras em 90 ms, parágrafo 450 ms, botões 560 ms, card 700 ms; menu mobile 35 ms por item. |
| 39 | Motion funcional | ✅ | Movimento indica interação (hover/pressão) e estado (menu, lightbox). |
| 40 | Performance e acessibilidade do motion | ✅ | Só `transform`/`opacity`/`filter`; `prefers-reduced-motion` desliga tudo e mostra o conteúdo. |

## 05 — Arquitetura, desenvolvimento e qualidade
| # | Princípio | Status | Como / onde |
|---|---|---|---|
| 41 | Responsividade | ✅ | Testado em 1440, 1024 (painel), 390 e 375 px; sem rolagem horizontal (scrollWidth = viewport). |
| 42 | Componentização | ✅ | 17 componentes reutilizáveis; conteúdo tipado em `src/content`. |
| 43 | Acessibilidade | ✅ | Skip link, landmarks, foco visível, `<dialog>` com foco preso, Esc, retorno do foco; 91 rotas sem saltos de título nem imagens sem alt. |
| 44 | Performance | ✅ | Mobile (4G lento + CPU 4×): LCP 1,26 s, CLS 0, 24 requisições, 153 KB de JS, 0 terceiros no carregamento. |
| 45 | SEO | ✅ | Metadata por página, canonical, Open Graph, JSON-LD (Organization, Event), sitemap e robots; galerias restritas com noindex. |

## 06 — Conversão e estratégia
| # | Princípio | Status | Como / onde |
|---|---|---|---|
| 46 | Conversão | ✅ | Inscrições abertas no hero, na agenda, na página do evento e na loja; WhatsApp por setor em todo o site. |
| 47 | Landing pages | ✅ | Cada acampamento, retiro e evento tem página com público, datas, como participar e CTA. |
| 48 | Valor, não só preço | ✅ | Páginas explicam público, tema (Lc 15,20) e formato antes do preço. |
| 49 | Negociação | ➖ | Não há política de descontos oficial; nada foi inventado. |
| 50 | Relacionamento | ✅ | Mensagens de WhatsApp pré-preenchidas e honestas; nenhuma automação não autorizada. |

## Problemas encontrados e corrigidos durante a auditoria
1. Estilos base fora de `@layer` sobrepunham utilitários (rótulos do rodapé na fonte errada) → movidos para `@layer base`.
2. Mosaico da galeria com célula vazia → 5 itens no grid 4×2.
3. Foto do "Quem somos" cortando o celebrante → `object-position` ajustado.
4. Filete dourado atravessando o texto do carisma → substituído por filetes laterais.
5. Rótulos "kicker" acima do H1 (proibidos pelo Impeccable) → movidos para baixo do título.
6. Cartão restrito do Teatro Vivo com motivo errado → mensagem própria para pessoas em tratamento.
7. Foto repetida na página Vida de oração → trocada.
8. `priority` (obsoleto no Next 16) → `preload` + `loading="eager"`.
9. Erro de Cache Components em rotas dinâmicas → `loading.tsx` (fronteira de Suspense).
10. Dois `setState` dentro de efeitos (lint) → padrão de ajuste durante a renderização / `requestAnimationFrame`.

## Pendências
- Máscaras e etapas no formulário de inscrição (depende da migração do checkout).
- Curadoria de fotos com crianças ao fundo em galerias abertas.
- Validar com a comunidade os textos institucionais (carisma oficial, endereço, horários).
