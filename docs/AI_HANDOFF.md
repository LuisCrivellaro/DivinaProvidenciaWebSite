# AI_HANDOFF — novo site da Comunidade Divina Providência

> Leia primeiro. Atualizado em 28/11/2026. Fila de tarefas: `docs/FILA_DE_TAREFAS.md`. Migração de domínio e independência do site antigo: `docs/MIGRACAO_DOMINIO.md`. Pesquisa da fase 1: `docs/analise-divina-providencia/`.

## 1. Estado atual
- **O site é independente do WordPress/WooCommerce antigo.** Teste com o domínio antigo bloqueado (`scripts/test-independencia.mjs`): 111 páginas × desktop e celular, 0 requisições ao site antigo, 0 problemas. Build de produção, TypeScript e ESLint limpos.
- **Tarefas concluídas em 28/11/2026:** (4) independência completa do site antigo; (5) todas as galerias públicas, inclusive as 16 antes restritas. Não há tarefa na fila.
- **Nada publicado em produção, DNS intocado, site antigo no ar.** Deploy e troca de domínio dependem de autorização (passo a passo em `MIGRACAO_DOMINIO.md` §5).
- Branch de trabalho: **`feat/redesign-dourado`** (PR #1 aberto para `main`). Não mexer direto na `main`.

## 2. Como retomar
```bash
git fetch origin && git checkout feat/redesign-dourado
```
```bash
npm install
```
```bash
node scripts/migrate-media.mjs
```
```bash
npm run dev
```
- `migrate-media` recria o acervo de fotos (`public/media`, ~880 MB, fora do git) a partir do WordPress antigo — **só funciona enquanto ele estiver no ar**. Se ele já tiver sido desligado, use a cópia de backup do acervo (ver `MIGRACAO_DOMINIO.md` §4).
- Node 20+. Na máquina Windows do usuário a porta 3000 pode estar ocupada por outro projeto (LunaFinanceWeb); o dev sobe em 3001.
- **Turbopack no Windows:** às vezes não percebe mudanças no `globals.css` (feitas por script ou depois de um `next build`) nem nos redirecionamentos. Se algo não atualizar, reinicie o `npm run dev`.
- **Next 16 tem mudanças**: leia `node_modules/next/dist/docs/` antes de mexer em APIs (ver `AGENTS.md`). Já pegaram: `cacheComponents` ligado (`"use cache"` + `cacheLife`; nada de `new Date()` fora de cache), rotas `[slug]` precisam de `loading.tsx`, `priority` do `<Image>` virou `preload`, `params` é Promise, tipos de rota gerados (`npx next typegen` depois de criar/remover rotas).

## 3. Arquitetura
- Next.js 16.4 (App Router, Cache Components, Partial Prefetching) · React 19.3 · TypeScript · Tailwind 4 (tokens em `@theme` no `globals.css`) · `lucide-react`. Dev: `playwright-core` (teste de independência).
- Conteúdo em `src/content/`: `site.ts` (contatos, endereço, fotos escolhidas, linha do tempo), `programs.ts`, `events.ts`, `inscricoes.ts` (inscrições abertas — migradas dos produtos do WooCommerce), `divina-brasa.ts` (festival), `videos.ts`, `galleries.json` (58 galerias, 7.081 fotos, todas públicas).
- `src/lib/`: `media.ts` (`mediaUrl()` → `/media/…webp` ou `NEXT_PUBLIC_MEDIA_BASE_URL`), `redirects.ts` (301 das URLs antigas, usado no `next.config.ts`), `dates.ts`, `today.ts`, `galleries.ts`.
- `scripts/`: `migrate-media.mjs` (acervo), `test-independencia.mjs` (Playwright, domínio antigo bloqueado), `audit-links.mjs`, `perf.mjs`.

## 4. Identidade visual
Ver `docs/DESIGN_SYSTEM.md`. **"Ouro vivo" (28/11/2026):** dourado principal `#D9A441` (próximo do ouro da logo), superfícies douradas com brilho (`--gold-sheen`), texto café sobre o dourado; `.keep-dark` devolve o café onde ele sombreia fotos. Logo do rodapé em versão âmbar (`public/brand/logo-rodape-ambar.png`). Sistema de movimento: `RevealObserver`, `Decor.tsx`, `Motion.tsx`.

## 5. Páginas
Início · Comunidade · Agenda (+26 eventos) · Acampamentos (+5) · Retiros (+4) · Grupos de oração · Vida de oração · Obras e projetos · Casa Terapêutica · Galeria (+58) · Vídeos · **Loja e inscrições** · **Inscrições** (`/inscricoes/[slug]`, 2) · **Minhas inscrições** · **Festival Divina Brasa** · Contato · Privacidade · 404 · sitemap/robots/opengraph-image. Mapa em `docs/SITEMAP.md`.

## 6. Funcionalidades
Menus desktop/mobile · agenda com próximos/passados · contagem regressiva e linha do tempo dos próximos encontros · **inscrição com ficha validada (CPF, celular, consentimento) enviada pelo WhatsApp da secretaria** · acompanhamento de inscrição pelo WhatsApp · galeria com filtros, paginação e lightbox (`?foto=N`) · tira de fotos com visualizador · vídeos sob demanda · contato via WhatsApp por setor · mapa · SEO, JSON-LD, Open Graph · redirecionamentos 301 de todas as URLs antigas.

## 7. Testes (28/11/2026)
- `node scripts/test-independencia.mjs http://localhost:3002` contra `next start`: 111 rotas × 2 viewports, requisições ao site antigo bloqueadas → **0 requisições, 0 problemas** (resultado em `scripts/test-independencia-resultado.json`).
- Redirecionamentos: todas as URLs dos sitemaps antigos testadas com `curl -L` (destinos na tabela de `MIGRACAO_DOMINIO.md` §6).
- Fluxo de inscrição testado no navegador: validação, máscaras, CPF, mensagem do WhatsApp (sem enviar).
- `npx tsc --noEmit`, `npx eslint src`, `npx next build`: limpos.

## 8. Decisões
1. **Sem checkout próprio:** a inscrição é enviada pelo WhatsApp e a secretaria confirma e orienta o pagamento. Pagamento online exige provedor e credenciais — não criado nem simulado.
2. **Sem contas de usuário** (não há servidor/banco): `/minhas-inscricoes` faz o acompanhamento pela secretaria.
3. **Todas as galerias públicas** (pedido do usuário). Canal de remoção de fotos em `/privacidade`.
4. **Acervo fora do git:** só as 98 imagens essenciais e as capas versionadas; o acervo completo vai no deploy ou num storage.
5. Formulários sem servidor; nada é guardado pelo site. Analytics/pixels desligados até haver consentimento.
6. Skills externas citadas no prompt (impeccable, taste-skill, emilkowalski/skills) não foram instaladas: instalar exige baixar e executar código de terceiros e mudar a configuração do Claude; as regras foram aplicadas a partir das skills já instaladas (frontend-design, ui-ux-pro-max, web-design-guidelines, humanizer-pt-br, webapp-testing).

## 9. Pendências
Ver `MIGRACAO_DOMINIO.md` §7: pagamento online · hospedagem/storage do acervo e autorização de deploy/DNS · exportar pedidos do WooCommerce antes de desligar · confirmar direito de imagem das galerias de menores · validações de conteúdo antigas (carisma oficial, ano de fundação, endereço exato, horários dos grupos e da adoração, coordenação, política de privacidade oficial — lista em `docs/analise-divina-providencia/10_FONTES_E_PENDENCIAS.md`).

## 10. Próxima tarefa sugerida
1. Decidir hospedagem e storage; fazer o deploy de homologação e rodar o teste de independência contra ele.
2. Escolher o provedor de pagamento online e integrar às páginas `/inscricoes/[slug]`.
3. Reunião de validação de conteúdo com a comunidade.
