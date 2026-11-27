# Auditoria final

> Data: 27/11/2026. Ambiente: macOS, Node 24.22.3 (instalado em `~/.local/node`), Next.js 16.4.6, React 19.3, Tailwind 4.3.3, Chrome headless via CDP e navegador integrado do Claude.

## Testes executados (com resultado)

| Teste | Ferramenta | Resultado |
|---|---|---|
| TypeScript | `npx tsc --noEmit` | ✅ sem erros |
| Lint | `npx eslint src` | ✅ sem erros nem avisos |
| Build de produção | `npx next build` | ✅ 117 rotas geradas (estáticas e PPR; home, agenda e loja revalidam a cada 1 h) |
| Rotas, títulos, alt, links e âncoras | `node scripts/audit-links.mjs` | ✅ 91 rotas HTTP 200, 1 `<h1>` cada, sem saltos de nível, todas as `<img>` com `alt`, 107 links internos e âncoras válidos |
| Console | CDP em 17 páginas | ✅ sem erros (após corrigir o aviso de Cache Components) |
| Performance (produção, `next start`) | `node scripts/perf.mjs` | Desktop: LCP 2,36 s (cache frio do otimizador), CLS 0, 36 req, 532 KB. Mobile (4G lento + CPU 4×): **LCP 1,26 s, FCP 0,75 s, CLS 0**, 24 req, 444 KB, JS 153 KB. Galeria Sênior mobile: LCP 1,40 s, CLS 0. Nenhum terceiro no carregamento. |
| Formulário de contato | Navegador integrado | ✅ 5 erros inline, `aria-invalid`, foco no 1º erro; envio válido monta `wa.me/5566999082128?text=…` (com `window.open` interceptado, nada foi enviado) e mostra confirmação honesta |
| Filtros da galeria | Navegador integrado | ✅ `?tipo=oracao&ano=2024` → 8 galerias; clicar "Todas" atualiza URL e lista (16) |
| Lightbox | Navegador integrado | ✅ abre com clique, `?foto=N` na URL, seta → avança, Esc fecha, foco volta à miniatura, URL limpa |
| Menu mobile (375 px) | Navegador integrado | ✅ abre em tela cheia, 12 links de 335×56 px, foco no 1º item, rolagem travada, Esc fecha e devolve o foco, sem rolagem horizontal |
| Dropdown "Participe" (desktop) | Navegador integrado | ✅ `aria-expanded`, 4 links, Esc fecha |
| Loja | HTML renderizado | ✅ produtos ao vivo da Store API: "Retiro Desperta 2026 · Retirante" R$ 120,00 e "· Servo" R$ 100,00 |
| Revisão visual | Capturas 1440×900 e 390×844 de 17 páginas | ✅ problemas corrigidos (lista em `UI_UX_50_PRINCIPIOS.md`) |

## Páginas testadas
Início · Comunidade · Agenda · evento (Retiro Desperta 2026) · Acampamentos · Acampamento Sênior · Acampamento Mirim · Retiro Desperta · Grupos de oração · Vida de oração · Obras e projetos · Casa Terapêutica · Galeria · Galeria Sênior · Galeria Mirim (restrita) · Vídeos · Loja · Contato · Privacidade · 404.

## Funcionalidades operacionais
Navegação desktop e mobile · agenda com separação automática de próximos/passados · páginas de evento com JSON-LD · inscrições levando ao produto oficial · produtos ao vivo do WooCommerce · galeria com filtros na URL, paginação de miniaturas e lightbox acessível · proteção de galerias de menores e acolhidos · vídeos com carregamento sob demanda · formulário de contato via WhatsApp · mapa · SEO (sitemap, robots, canonical, OG).

## Integrações pendentes
Checkout/conta continuam no WordPress (sem checkout fictício) · CMS para agenda e galerias · formulário com e-mail (se desejado) · analytics com consentimento · deploy e domínio (nada publicado). Ver `INTEGRATIONS.md`.

## Limitações conhecidas
- Fotos e logo dependem de autorização formal da comunidade; fotos são servidas do domínio oficial.
- Galerias abertas podem conter crianças ao fundo (curadoria manual pendente).
- Textos institucionais vêm de fontes públicas e precisam de validação (carisma do Estatuto, endereço, horário dos grupos, nomes da coordenação).
- Testes automatizados de interface (Playwright etc.) não foram adicionados para não instalar dependências; as verificações foram feitas pelos scripts em `scripts/` e no navegador.
- O indicador "N" no canto das capturas é do modo de desenvolvimento do Next e não aparece em produção.
- O consumo de créditos do Claude não é consultável neste ambiente.
