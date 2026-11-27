# AI_HANDOFF — novo site da Comunidade Divina Providência

> Leia primeiro. Atualizado em 27/11/2026. A pesquisa da fase 1 está em `docs/analise-divina-providencia/AI_HANDOFF.md`.

## 1. Estado atual
- **Fase 2 (desenvolvimento) concluída e testada localmente.** Site Next.js completo na raiz do repositório, com 117 rotas, build de produção limpo, lint e TypeScript sem erros.
- **Última tarefa executada:** aplicação da logo oficial enviada pela comunidade e da nova paleta (vinho `#7B2733`, vermelho `#DA4540`, dourado `#CCAF76`, marfim `#FFF8F2`, carvão `#2B2024`), seguida das auditorias visual, técnica e de texto.
- **Nada publicado em produção.** O site atual (WordPress) não foi alterado.
- Branch de trabalho: `feat/novo-site` (criada a partir de `docs/analise-divina-providencia`). Não mexer direto na `main`.

## 2. Como retomar (em qualquer computador)
```bash
git fetch origin && git checkout feat/novo-site
```
```bash
npm install
```
```bash
npm run dev
```
- Node 20+ obrigatório. Na máquina original, o Node 24 foi instalado sem Homebrew em `~/.local/node` (binário oficial de nodejs.org com checksum verificado): use `export PATH=$HOME/.local/node/bin:$PATH`.
- `.claude/launch.json` (ignorado no git) roda `npm run dev -- --port 3210` para o painel de pré-visualização do Claude. Recrie se precisar.
- As 5 skills ficam em `.claude/skills/` (ignorado no git). Comandos de reinstalação em `docs/SKILLS_APLICADAS.md`.
- **Next 16 tem mudanças**: leia `node_modules/next/dist/docs/` antes de mexer em APIs (ver `AGENTS.md`). Pontos que já pegaram: `cacheComponents` ligado (use `"use cache"` + `cacheLife`; nada de `new Date()` fora de cache), rotas `[slug]` precisam de `loading.tsx`, `priority` do `<Image>` virou `preload`, `params` é Promise.

## 3. Arquitetura
- Next.js 16.4 (App Router, Cache Components, Partial Prefetching) · React 19.3 · TypeScript · Tailwind 4 (tokens em `@theme` no `globals.css`) · `lucide-react` (única dependência extra).
- Conteúdo em `src/content/` (tipado, com fonte de cada dado): `site.ts` (contatos, endereço, fotos escolhidas, linha do tempo), `programs.ts` (acampamentos, retiros, grupos, grandes eventos), `events.ts` (agenda), `videos.ts`, `galleries.json` (58 galerias, 7.081 fotos).
- `src/lib/`: `dates.ts` (Intl, fuso America/Cuiaba), `today.ts` (data em cache por 1 h), `galleries.ts`, `woocommerce.ts` (Store API pública, cache 1 h).
- Fotos servidas do WordPress oficial via `next/image` (`remotePatterns` em `next.config.ts`).

## 4. Identidade visual implementada
Ver `docs/DESIGN_SYSTEM.md`. Resumo: header marfim com a logo oficial original (`public/brand/logo-oficial.webp`, cópia do arquivo enviado, original intocado em `public/brand/original/`), hero com foto real e sobreposição vinho, títulos Gambetta em dois tons (carvão + itálico vinho), texto Switzer, carisma em fundo vinho, footer vinho com a logo sobre superfície marfim. Vermelho só em ícones/números grandes; `#A52C34` para texto pequeno e selos; dourado só decorativo (texto dourado apenas sobre vinho/escuro).

## 5. Páginas concluídas
Início · Comunidade · Agenda (+ 26 páginas de evento) · Acampamentos (+5) · Retiros (+4) · Grupos de oração · Vida de oração · Obras e projetos · Casa Terapêutica · Galeria (+58) · Vídeos · Loja e inscrições · Contato · Privacidade (provisória) · 404 · sitemap/robots. Mapa em `docs/SITEMAP.md`.

## 6. Componentes
`Header`, `Footer`, `ui.tsx` (ButtonLink, TextLink, Photo, SectionTitle, Lede, BlurTitle, Breadcrumbs, PageHeader, Section, FactList, Note), `EventList`, `Carisma`, `ProgramIndex`, `ProgramDetail`, `GalleryCard`, `GalleryCardClient`, `GalleryBrowser`, `GalleryViewer`, `VideoFacade`, `ContactForm`, `BrandIcon`, `PageSkeleton`. Externos adaptados (React Bits, Uiverse, Simple Icons): `docs/COMPONENTES_EXTERNOS.md`.

## 7. Funcionalidades operacionais
Menu desktop com dropdown e menu mobile acessível · agenda com próximos/passados automáticos · inscrições (link para o produto oficial) · loja com produtos ao vivo · galeria com filtros na URL, paginação e lightbox (`?foto=N`) · galerias de menores/acolhidos protegidas · vídeos sob demanda · contato via WhatsApp por setor · mapa · SEO e JSON-LD.

## 8. Testes realizados
Ver `docs/AUDITORIA_FINAL.md` (tsc, eslint, build, auditoria de 91 rotas, console, performance, testes manuais de formulário, filtros, lightbox, menus, loja, revisão visual em 1440/390 px).

## 9. Decisões
1. Manter WooCommerce + Mercado Pago no WordPress; o novo site não tem checkout nem login próprios (proibido simular).
2. Formulário de contato sem servidor: abre o WhatsApp com a mensagem pronta; nada é guardado.
3. Galerias de Mirim, Juvenil, FAC e Teatro Vivo (16 galerias, 2.256 fotos) não são republicadas: aviso + link para o site oficial + `noindex`.
4. Nenhum nome da coordenação publicado até validação.
5. Analytics/pixels desligados até haver consentimento.
6. Taste-skill e o lançador binário do Impeccable não foram executados (motivos em `SKILLS_APLICADAS.md`); as regras foram aplicadas manualmente.

## 10. Pendências (para a comunidade validar)
Carisma oficial do Estatuto · ano de fundação (2005 × ≈1998) · endereço exato ("Rua Padre Anchieta" × "Rua Anchieta") · horários de cada grupo de oração · local/horários da adoração perpétua · faixas etárias e regras de cada acampamento · o que são "Acampamento RS" e "Acampamento II" · nomes da coordenação · autorização de uso das fotos e da logo · autoria das fotos · situação dos projetos Divina Saúde, Ler é Crescer, Missões Populares, Divina Horta · política de privacidade oficial · domínio e hospedagem. Lista completa: `docs/analise-divina-providencia/10_FONTES_E_PENDENCIAS.md`.

## 11. Problemas conhecidos
- Galerias abertas podem conter crianças ao fundo (curadoria manual pendente).
- Primeira visita a uma foto ainda não otimizada é mais lenta (otimizador busca o original de ~1920 px); depois fica em cache.
- `Acampamento de Casais`, `Retiro das Mulheres` e itens de 2027 não têm fotos próprias (não existem galerias).

## 12. Próxima tarefa prioritária
1. Reunião de validação com a comunidade usando a lista do item 10 e corrigir `src/content/*`.
2. Decidir hospedagem/domínio e CMS (sugestão: manter o WordPress como CMS headless para eventos e galerias).
3. Planejar a migração do checkout (formulário de inscrição com máscaras de CPF/celular, um participante por inscrição, aceite LGPD) — ver `docs/analise-divina-providencia/04_LOJA_E_INSCRICOES.md`.
4. Deploy de pré-visualização (com autorização) e testes com usuários reais da comunidade.
