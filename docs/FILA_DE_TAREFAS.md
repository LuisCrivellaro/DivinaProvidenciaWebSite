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
