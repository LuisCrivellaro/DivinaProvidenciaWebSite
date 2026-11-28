# Fila de tarefas (continuidade)

> Registro das instruções enfileiradas pelo usuário. Executar na ordem, sem abandonar a tarefa em andamento.

## 1. [CONCLUÍDA em 27/11/2026] Desenvolvimento do novo site (Prompt Master V2)
Next.js 16 + Tailwind 4 na raiz do repositório. Estado e retomada: `docs/AI_HANDOFF.md`.

## 2. [CONCLUÍDA em 27/11/2026] Logo oficial + nova paleta
Aplicada após o término das páginas; tokens em `src/app/globals.css`, documentação em `docs/DESIGN_SYSTEM.md`.
- Logo oficial anexada pelo usuário preservada sem alterações em `public/brand/original/logo-oficial-anexo.webp`.
- Usar a versão com fundo transparente no site (`public/brand/logo-horizontal.png`, mesmo desenho, baixada do site oficial).
- Nova paleta (tokens globais):
  - Vinho profundo `#7B2733` (principal: botões, seções de destaque, títulos estratégicos, overlays, fundos escuros)
  - Vermelho institucional `#DA4540` (destaques, eventos/acampamentos, ícones, indicadores — não para texto pequeno sem checar contraste)
  - Dourado `#CCAF76` (detalhes, divisórias, bordas, ornamentos)
  - Marfim `#FFF8F2` (fundo principal), Carvão `#2B2024` (texto)
  - Complementares: Branco `#FFFFFF`, Vinho hover `#65202A`, Vermelho escuro `#A52C34`, Dourado claro `#E6C58C`, Creme claro `#F7F1E9`, Texto secundário `#66585D`
- Aplicação: header marfim/branco com logo original e botões vinho; hero com overlay vinho; carisma em fundo vinho; footer vinho com logo original sobre superfície clara se precisar; eventos em cards claros; formulários com foco vinho.
- Verificar WCAG 2.2 AA em todos os pares; testar desktop, tablet, mobile; atualizar DESIGN_SYSTEM.md, AI_HANDOFF.md, AUDITORIA_FINAL.md.

## 3. Regras de parada e GitHub
- Parar só quando tudo estiver concluído e testado, ou ao atingir 90% dos créditos.
- O consumo de créditos **não é consultável** neste ambiente; não estimar. Registrar a limitação.
- Ao parar: atualizar AI_HANDOFF.md, commit na branch de trabalho (`docs/analise-divina-providencia` → renomear/usar branch de feature), `git pull --rebase` só se seguro, `git push` sem `--force`, nunca na `main`, sem `.env`/credenciais.

## 4. [CONCLUÍDA em 28/11/2026] Independência completa do site antigo
Prompt "MISSÃO — INDEPENDÊNCIA COMPLETA E FINALIZAÇÃO DO SITE DA DIVINA PROVIDÊNCIA": varrer dependências de adivinaprovidencia.com.br (WordPress/WooCommerce), implementar as páginas que ainda levavam ao site antigo, migrar imagens e documentos, preparar SEO e redirecionamentos 301 (sempre do antigo para o novo), testar o site com o domínio antigo bloqueado (Playwright), documentar a migração de domínio e entregar relatório final. Não desativar o site antigo nem mexer em DNS sem autorização. Não inventar dados institucionais, horários, valores ou dados bancários.

## 5. [CONCLUÍDA em 28/11/2026] Mostrar todas as fotos das galerias restritas
O usuário pediu (print da galeria "20º Acampamento FAC" com o cartão "Fotos com crianças e adolescentes ficam no acervo oficial"): "É para aparecer todas as fotos!". As 16 galerias marcadas como restritas (Mirim, Juvenil, FAC, Teatro Vivo — 2.256 fotos) devem ser migradas e exibidas como as demais (capa, grade, lightbox, sitemap). Decisão de privacidade tomada pelo usuário.

Resultado das tarefas 4 e 5: `docs/MIGRACAO_DOMINIO.md` e `docs/AI_HANDOFF.md`. Fila vazia.
