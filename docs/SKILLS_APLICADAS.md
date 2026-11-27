# Skills aplicadas

> As cinco skills foram baixadas dos repositórios oficiais em 26–27/11/2026, inspecionadas (licença, arquivos, scripts) e instaladas em `.claude/skills/` do projeto. A pasta está no `.gitignore` (são de terceiros); para reinstalar, veja o fim deste arquivo.

| Skill | Repositório | Commit | Licença | Instalada em |
|---|---|---|---|---|
| Impeccable 4.11.1 | github.com/pbakaus/impeccable | `2fc5e14` | Apache-2.0 | `.claude/skills/impeccable` |
| Humanizer 4.0.0 | github.com/blader/humanizer | `a32f244` | MIT | `.claude/skills/humanizer` |
| Taste Skill 2.5.1 | github.com/leonxlnx/taste-skill | `952435f` | MIT | `.claude/skills/taste-skill` |
| Web Design Guidelines 1.1.0 | github.com/vercel-labs/agent-skills (`skills/web-design-guidelines`) | `5a37a63` | (repositório sem arquivo LICENSE na raiz) | `.claude/skills/web-design-guidelines` |
| UI UX Pro Max | github.com/nextlevelbuilder/ui-ux-pro-max-skill (`.claude/skills/ui-ux-pro-max`) | `9086b92` | MIT | `.claude/skills/ui-ux-pro-max` |

## Como cada uma foi usada (e o que não foi)

### Impeccable
- **Lido:** `SKILL.md`, `reference/craft-floor.md` (piso de qualidade e proibições), modos (o site é "Persuade" na home e "Read/Operate" nas internas).
- **Não executado:** o lançador `scripts/impeccable` baixa um binário na primeira execução. Por segurança não rodei binários baixados; segui o caminho previsto pela própria skill quando o lançador não roda ("ler o contexto diretamente").
- **Aplicado:** proibição de eyebrow/kicker acima de títulos (removi os rótulos de categoria acima do H1 em eventos e galerias); sem gradient text, sem glass decorativo, sem barra lateral em cartões, sem emoji como ícone; superfícies do navegador tematizadas (seleção, cursor, foco, barra de rolagem); verificação de contraste ≥ 4,5:1; um momento de movimento autoral por página longa; estados de hover/foco/erro/vazio/carregando; medidas de texto ≤ 75 ch.

### Taste Skill
- **Lido:** `SKILL.md` inteiro (regras da casa, checklist, "Never").
- **Não executado:** os scripts de gate/consistência (`gate.mjs`, `consistency.mjs` etc.) foram pensados para páginas HTML estáticas do kit próprio da skill e registram um hook de parada; não foram executados para não interferir na sessão. A skill também não foi "invocada" pelo sistema de skills, para não ativar esse hook.
- **Aplicado:** fotografias reais em todas as seções principais; uma seção por ideia; bordas esquerda/direita iguais (`.wrap`); entrada única do hero; micro-interações (cartão sobe 2 px, foto 1,03, seta desliza, sublinhado desenha); nada de fade em toda seção, parallax em texto, carrossel ou tilt; nenhum violeta; sem legendas explicativas sob fotos; nenhum depoimento/número inventado.
- **Conflitos resolvidos a favor do briefing:** a regra 9 da skill (sem endereço completo, sem telefone real) vale para sites fictícios; aqui o cliente é real e o briefing pede endereço, telefone e WhatsApp.

### Web Design Guidelines (Vercel)
- **Lido:** `references/command.md` (regras completas).
- **Aplicado como auditoria do código** (resultado em `AUDITORIA_FINAL.md`): sem `transition: all`; `outline` só removido com substituto; `<Link>` para navegação interna; `aria-label` em botões de ícone; `aria-live` em contagens e confirmações; `autocomplete`, `name`, labels clicáveis, placeholders terminados em "…"; erros junto ao campo com foco no primeiro; `prefers-reduced-motion`; `touch-action: manipulation`; `overscroll-behavior` no menu e no lightbox; `Intl.DateTimeFormat`/`NumberFormat` para datas e moeda; `text-wrap: balance`; `tabular-nums`; estado de filtros e da foto aberta refletido na URL; listas longas de fotos paginadas (48 por vez) com `content-visibility`.

### UI UX Pro Max
- **Executado:** `scripts/search.py` (Python puro, sem rede — inspecionado antes) com `--design-system`, `--domain color`, `--domain typography` e `--stack nextjs`.
- **Usado:** estilo "Accessible & Ethical" (foco visível 3–4 px, alvos de 44 px, links de pular, movimento reduzido) e as diretrizes de Next.js (`next/image`, Metadata API, `generateMetadata`, Open Graph).
- **Descartado com justificativa:** a paleta sugerida para "igreja" (violeta + dourado) não corresponde à marca e foi substituída pela paleta oficial; as fontes sugeridas (Playfair/Inter) foram trocadas por Fontshare, como pedia o briefing.

### Humanizer
- **Lido:** `SKILL.md` (26 padrões de texto de IA).
- **Aplicado:** todo o texto foi escrito em português direto, sem "não é X, é Y", sem trios forçados, sem travessões como conector, sem palavras infladas ("jornada", "transformador", "incrível"…), sem frases de efeito de fechamento. Varredura final por travessões e palavras típicas em `src/` (sem ocorrências no texto visível). Também removi afirmações que eu não conseguia sustentar com fonte (ex.: "qualquer pessoa pode ir sem inscrição", "turnos combinados com a secretaria", "o mais antigo dos acampamentos").

## Reinstalar
```bash
git clone --depth 1 https://github.com/pbakaus/impeccable /tmp/sk-imp && cp -R /tmp/sk-imp/.claude/skills/impeccable .claude/skills/
git clone --depth 1 https://github.com/blader/humanizer /tmp/sk-hum && mkdir -p .claude/skills/humanizer && cp /tmp/sk-hum/SKILL.md /tmp/sk-hum/LICENSE .claude/skills/humanizer/
git clone --depth 1 https://github.com/leonxlnx/taste-skill /tmp/sk-taste && cp -R /tmp/sk-taste/skills/taste-skill .claude/skills/
git clone --depth 1 https://github.com/vercel-labs/agent-skills /tmp/sk-vercel && cp -R /tmp/sk-vercel/skills/web-design-guidelines .claude/skills/
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill /tmp/sk-ux && cp -R /tmp/sk-ux/.claude/skills/ui-ux-pro-max .claude/skills/
```
