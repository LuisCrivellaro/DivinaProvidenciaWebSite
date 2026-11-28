# Prompt de continuação — site da Comunidade Divina Providência

> Copie tudo a partir de "Você vai continuar…" e cole na outra IA. Atualizado em 28/11/2026.

---

Você vai continuar o desenvolvimento do novo site da **Comunidade Católica Divina Providência** (Rondonópolis, MT). O projeto já está avançado e testado; seu papel é **continuar, não recomeçar**.

## 1. Repositório e ponto de partida
- GitHub: `https://github.com/LuisCrivellaro/DivinaProvidenciaWebSite`
- A `main` tem todo o trabalho até agora (PRs #1 e #2 mesclados). A branch `feat/redesign-dourado` tem a mesma coisa mais este arquivo.
- **Não faça commit direto na `main`.** Crie uma branch a partir dela (ex.: `feat/<tarefa>`), faça commits pequenos e abra PR.

```bash
git clone https://github.com/LuisCrivellaro/DivinaProvidenciaWebSite.git && cd DivinaProvidenciaWebSite
```
```bash
git checkout -b feat/continuacao origin/main
```
```bash
npm install
```
```bash
npm run media:migrar
```
```bash
npm run dev
```

## 2. Leia antes de mexer em qualquer coisa (nesta ordem)
1. `AGENTS.md` — **Next.js 16 tem mudanças que contradizem o seu treinamento.** Leia o guia em `node_modules/next/dist/docs/` antes de escrever código. Já causaram erro: `cacheComponents` ligado (`"use cache"` + `cacheLife`; nada de `new Date()` fora de cache — use `src/lib/today.ts`), `params` é Promise, rotas `[slug]` precisam de `loading.tsx`, `priority` do `<Image>` virou `preload`, depois de criar/remover rotas rode `npx next typegen`.
2. `docs/AI_HANDOFF.md` — estado atual, arquitetura, decisões e pendências.
3. `docs/DESIGN_SYSTEM.md` — identidade visual (cores, tipografia, componentes, movimento).
4. `docs/MIGRACAO_DOMINIO.md` e `docs/DEPLOY.md` — independência do site antigo e publicação.
5. `docs/CONTENT_SOURCES.md` — de onde vem cada informação publicada.

## 3. Stack e estrutura
Next.js 16.4 (App Router, Cache Components) · React 19 · TypeScript · Tailwind 4 (tokens em `@theme` no `src/app/globals.css`) · `lucide-react`. Sem banco de dados e sem servidor de formulários.
- Conteúdo tipado em `src/content/` (`site.ts`, `programs.ts`, `events.ts`, `inscricoes.ts`, `divina-brasa.ts`, `videos.ts`, `galleries.json`).
- `src/lib/media.ts` (`mediaUrl()`), `src/lib/redirects.ts` (301 das URLs do site antigo), `dates.ts`, `today.ts`, `galleries.ts`.
- `scripts/migrate-media.mjs` (acervo de fotos), `scripts/test-independencia.mjs` (teste com Playwright), `deploy/` (systemd, Caddy, `atualizar.sh`), `Dockerfile`.

## 4. Fotos: atenção
O acervo (`public/media`, ~0,9 GB, 7.107 WebP) **não está no git**; só as 98 imagens essenciais e as capas estão versionadas. `npm run media:migrar` baixa o resto do WordPress antigo (`adivinaprovidencia.com.br/wp-content/uploads`) — **só funciona enquanto o site antigo estiver no ar**. Se ele já tiver sido desligado, peça ao usuário a cópia de backup do acervo. Nunca volte a carregar imagens direto do domínio antigo: tudo passa por `mediaUrl()`.

## 5. Identidade visual (não mudar sem pedido)
- Dourado principal **`#D9A441`** ("ouro vivo", próximo do ouro da logo), marfim `#FFF8F2`, café `#1F1A16`. Superfícies douradas com brilho (`--gold-sheen`); sobre dourado, texto café (contraste ≥ 4,5:1). `.keep-dark` devolve o café onde ele sombreia fotos.
- Títulos em Gambetta (serifada, segunda linha em itálico dourado), texto em Switzer.
- Movimento: `RevealObserver` (entradas ao rolar), `Decor.tsx` (brasas, faixas, `Marquee`), `Motion.tsx` (contadores, inclinação 3D). Tudo respeita `prefers-reduced-motion`.
- Logo: `public/brand/` (`logo-oficial.webp` no cabeçalho, `logo-rodape-ambar.png` no rodapé dourado, `logo-simbolo.png` só o símbolo). Não altere a logo.
- Referências: MyChurch, Riwaq, Fosters. Evite visual genérico de IA.

## 6. Regras de trabalho
- **Não invente** informações institucionais, horários, endereços, valores, nomes, dados bancários ou religiosos. Sem fonte → registre como pendência em `docs/AI_HANDOFF.md`.
- **Não publique, não altere DNS, não desligue o site antigo e não crie contas** (hospedagem, pagamento, storage) sem autorização explícita do usuário. Não use credenciais.
- **Não remova páginas, componentes ou funcionalidades existentes** sem pedido. Reaproveite os componentes de `src/components/ui.tsx`.
- Privacidade: formulários não guardam dados (abrem o WhatsApp da secretaria com a mensagem pronta). Fichas de inscrição levam CPF — nunca registre esses dados em logs ou arquivos.
- Escreva em português do Brasil, com linguagem natural e acolhedora.
- Windows: o Turbopack às vezes não percebe mudanças no `globals.css` (feitas por script ou depois de `next build`) nem nos redirecionamentos — reinicie o `npm run dev`. A porta 3000 da máquina do usuário costuma estar ocupada por outro projeto; o dev sobe na 3001.

## 7. Como testar antes de entregar
```bash
npx tsc --noEmit && npx eslint src && npx next build
```
```bash
npx next start -p 3002
```
Em outro terminal (precisa do Chromium do Playwright no cache; `playwright-core` já está nas devDependencies):
```bash
npm run test:independencia -- http://localhost:3002
```
O teste percorre todas as páginas do sitemap em desktop e celular com o domínio antigo bloqueado e falha se houver página com erro, imagem quebrada, link quebrado, erro de console ou qualquer requisição ao site antigo. Resultado esperado hoje: 111 páginas × 2, 0 problemas. Confira também visualmente em 1440 px e 390 px.

## 8. Pendências (por prioridade) — só avance no que depender de você
1. **Deploy em VPS (servidor com disco)** — escolhido pelo usuário. Tudo pronto em `deploy/` e `docs/DEPLOY.md`. Depende de o usuário contratar o servidor e dar acesso. Faça primeiro em homologação (ex.: `novo.adivinaprovidencia.com.br`) e rode o teste de independência contra ela.
2. **Pagamento online das inscrições** — hoje a ficha vai pelo WhatsApp e a secretaria orienta o pagamento. Integrar um provedor (Mercado Pago, PagBank, Stripe…) exige conta e autorização do usuário; não simule checkout.
3. **Antes de desligar o WordPress:** exportar pedidos/clientes do WooCommerce (têm CPF) e guardar o backup do acervo fora do computador do usuário.
4. **Validações com a comunidade** (lista em `docs/AI_HANDOFF.md` §9 e `docs/analise-divina-providencia/10_FONTES_E_PENDENCIAS.md`): carisma oficial do Estatuto, ano de fundação, endereço exato, horários dos grupos e da adoração, coordenação, política de privacidade oficial, direito de imagem das galerias de crianças (todas as galerias estão públicas por decisão do usuário).
5. Melhorias possíveis, só se o usuário pedir: CMS para agenda e galerias, lista de vídeos automática pelo RSS do YouTube, banner de consentimento se analytics forem ligados.

## 9. Ao encerrar a sessão (ou se os créditos estiverem acabando)
1. Rode os testes da seção 7.
2. Commit e push na sua branch (nunca `--force`, nunca direto na `main`, nunca `.env`/credenciais).
3. Atualize `docs/AI_HANDOFF.md` (o que fez, decisões, pendências, de onde continuar) e `docs/FILA_DE_TAREFAS.md` (tarefas pedidas pelo usuário, em ordem).
4. Abra ou atualize o PR para a `main` com um resumo e os resultados dos testes.

Comece lendo os arquivos da seção 2 e confirme com o usuário qual pendência ele quer atacar primeiro.
