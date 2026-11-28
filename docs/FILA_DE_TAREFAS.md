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

Resultado das tarefas 4 e 5: `docs/MIGRACAO_DOMINIO.md` e `docs/AI_HANDOFF.md`.

## 7. [CONCLUÍDA em 28/11/2026] Página Comunidade conforme o Estatuto Canônico
O usuário enviou o Estatuto Canônico (PDF digitalizado, 8 páginas, aprovado por D. Juventino Kestering em 23/09/2020) e pediu para corrigir as informações da página `/comunidade` **sem mudar o front-end nem o responsivo** (só textos).
- Feito: fundação jan/1998, associação jan/2008, associação privada de fiéis (cân. 298 ss.), mística, membros comprometidos e participantes, ingresso aos 21 anos com 12 encontros em 1 ano, organização (Conselho Administrativo, diretor espiritual, núcleos, diretoria e Conselho Fiscal), linha do tempo. Layout intacto.
- **Pendente (perguntar ao usuário):** o carisma da faixa dourada segue a redação que o usuário passou; o Estatuto (art. 3º) diz "Ser um sinal da infinita bondade e misericórdia de Deus na vida e na história dos homens do nosso tempo".
- **Pendente (fora do escopo pedido):** a home ainda diz "começou suas atividades em 2005", calcula os anos de missão a partir de 2005 e fala em "Comunidade de Aliança reconhecida pela Igreja"; o rodapé também. O Estatuto diz 1998 e "associação privada de fiéis".
- **Atenção:** o Estatuto põe a sede no Sítio Divina Providência, BR-364 km 194, zona rural de Pedra Preta (MT). O site usa o endereço de Rondonópolis (Rua Padre Anchieta). Não alterado: confirmar com a comunidade qual endereço publicar.

## 8. [CONCLUÍDA em 28/11/2026] Foto principal (hero) da home
Trocar a foto do hero pela multidão do Cerco de Jericó 2022 ao pôr do sol (`2022/08/cerco-jerico-da-comunidade-divina-providencia-363`, 1920 px, já no acervo local). Enquadramento para desktop, tablet e celular; valorizar o céu dourado; contraste e legibilidade dos textos; imagem otimizada; preservar animações e funcionalidades; imagem salva no projeto (versionada), sem depender do site antigo. Não mexer em outras seções. Testar responsividade e validar visualmente.
- Feito: nova chave `photos.heroCerco` (a antiga `hero` continua no Acampamento Sênior); enquadramento `46% 30%` no celular/tablet e `50% 0%` no desktop; Ken Burns ancorado no alto; véu do alto quase aberto e luz dourada suave (soft-light) no céu; faixa extra só abaixo de `lg` atrás do título (contraste medido no pior ponto: título dourado ≥ 3,7:1 e branco ≥ 5,3:1; parágrafo ≥ 7:1). Peso: 54 KB (AVIF, celular) e 227 KB (AVIF, 1920 px). Foto versionada com `git add -f`. Animações (Ken Burns, deriva, brasas, entradas) preservadas.

Regras de execução dadas pelo usuário: trabalhar de forma contínua; ao terminar uma tarefa, iniciar a próxima da fila sem pedir autorização; commits e atualizações do AI_HANDOFF.md periódicas (o consumo de créditos não é consultável); push na branch atual, nunca na `main`.

## 6. [EM ANDAMENTO — 28/11/2026] Deploy na VPS (homologação primeiro)
Escolha do usuário entre as pendências. Branch `feat/deploy-vps`.
- **Feito:** revisão de `deploy/` contra o Next 16 (guia de self-hosting). Corrigido: `atualizar.sh` chamava `sudo` como o usuário `divina`, que não tem sudo (agora roda com sudo e executa git/npm como `divina`); o serviço systemd rodava `npm start` com `ProtectHome` (o npm grava logs na pasta pessoal) e passou a chamar o Next direto pelo Node; no Docker, o cache de imagens em `.next/cache` era do root e o usuário `node` não conseguia gravar; o Caddy ganhou `flush_interval -1` para o streaming; novo `deploy/Caddyfile.homologacao` com `X-Robots-Tag: noindex`. `DEPLOY.md` atualizado.
- **Falta (depende do usuário):** contratar a VPS (Ubuntu 22.04/24.04 ou Debian 12, 2 GB de RAM, 10 GB livres), passar IP e acesso SSH com sudo, escolher o subdomínio de homologação e criar só esse registro DNS. Não testado: os comandos Linux (systemd, Caddy) e o Docker, por falta de servidor Linux.
