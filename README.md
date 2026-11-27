# Comunidade Divina Providência — novo site

Nova versão do site da Comunidade Católica Divina Providência (Rondonópolis, MT), feita em Next.js. O site atual (WordPress + WooCommerce) continua no ar e responsável por inscrições, carrinho, pagamento e conta do cliente.

## Rodar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
```

```bash
npm run dev
```

Abra http://localhost:3000. Para a versão de produção:

```bash
npm run build && npm start
```

## Verificações

```bash
npx tsc --noEmit
```

```bash
npm run lint
```

```bash
node scripts/audit-links.mjs http://localhost:3000
```

`scripts/perf.mjs <url> [mobile]` mede LCP/CLS/peso (precisa do Google Chrome instalado).

## Estrutura

```
src/app/            páginas (App Router) — home, comunidade, agenda, acampamentos, retiros,
                    grupos-de-oracao, vida-de-oracao, obras-e-projetos, casa-terapeutica,
                    galeria, videos, loja, contato, privacidade
src/components/     componentes reutilizáveis (Header, Footer, ui, EventList, GalleryViewer…)
src/content/        conteúdo tipado com fonte de cada dado (site, programas, eventos, vídeos, galerias)
src/lib/            datas (Intl), "hoje" em cache, galerias, integração WooCommerce (Store API)
public/brand/       logo oficial (original preservado em public/brand/original/) e logos dos grupos
docs/               pesquisa, design system, auditorias e handoff
scripts/            auditoria de rotas/links e medição de performance
```

## Documentação
- `docs/AI_HANDOFF.md` — estado do projeto e como continuar (comece por aqui)
- `docs/DESIGN_SYSTEM.md` · `docs/SITEMAP.md` · `docs/INTEGRATIONS.md` · `docs/CONTENT_SOURCES.md`
- `docs/AUDITORIA_FINAL.md` · `docs/UI_UX_50_PRINCIPIOS.md` · `docs/SKILLS_APLICADAS.md`
- `docs/COMPONENTES_EXTERNOS.md` · `docs/FRAMER_REFERENCES.md`
- `docs/analise-divina-providencia/` — pesquisa completa do site atual (fase 1)

## Regras do projeto
Nenhum fato, horário, nome ou depoimento sem fonte. Nada de checkout ou login simulados. Fotos de crianças, adolescentes e acolhidos não são republicadas. Nada é publicado em produção sem autorização da comunidade.
