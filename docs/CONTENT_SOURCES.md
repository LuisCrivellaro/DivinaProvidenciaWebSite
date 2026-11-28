# Origem dos conteúdos

> Regra: nada no site sem fonte. Fontes completas e pendências da fase de pesquisa: `docs/analise-divina-providencia/10_FONTES_E_PENDENCIAS.md`. Dados no código: `src/content/*`.

| Conteúdo no site | Onde está no código | Fonte | Status |
|---|---|---|---|
| Nome, lema "Sua família, nossa missão!" | `content/site.ts` | Site oficial (meta), Instagram | Confirmado |
| Carisma ("Ser sinal da infinita bondade e da infinita misericórdia de Deus na vida das pessoas.") | `site.carisma` | Redação passada pelo usuário em 28/11/2026 | Confirmado pelo usuário. **O Estatuto (art. 3º) diz: "Ser um sinal da infinita bondade e misericórdia de Deus na vida e na história dos homens do nosso tempo"** → perguntar ao usuário qual usar |
| Fundação de fato em jan/1998, associação de direito em jan/2008, associação privada de fiéis leigos (cân. 298 ss.), mística (instruir, aconselhar, consolar e confortar as famílias), finalidades, membros comprometidos e participantes, ingresso aos 21 anos com formação inicial de 12 encontros em 1 ano, Conselho Administrativo (2 anos), diretor espiritual indicado pelo bispo (3 anos, renovável uma vez), núcleos, diretoria, Conselho Fiscal, cargos não remunerados, aprovação por D. Juventino Kestering em 23/09/2020 | `app/comunidade`, `timeline` | **Estatuto Canônico** (PDF enviado pelo usuário em 28/11/2026) | Confirmado. Na home ainda aparecem "2005" e "comunidade de aliança" (fora do escopo pedido: só a página Comunidade) |
| Revisões do estatuto pelo bispo e pela CNBB; missas do Compromisso e de "seis anos de aliança" | `app/comunidade` | A Tribuna MT, 25/09/2020; YouTube oficial | Imprensa / canal oficial |
| Início em 2005; associação em fev/2007; missão (evangelizar famílias por acampamentos, grupos, retiros; restaurar vidas pela CT); grupos semanais na sede; formação de adolescentes pelo FAC e Juvenil | `timeline`, comunidade, grupos | Diocese de Rondonópolis-Guiratinga (página publicada 23/07/2024) | Institucional |
| Comunidade Terapêutica: homens 18+, dependência de álcool e drogas, atividades socioeducativas/culturais/esportivas, grupos pós-tratamento | `app/casa-terapeutica` | ALMT, Projeto de Resolução 166/2015 | Dados de 2015 (rotulados) |
| CT: 30 vagas masculinas | idem | A Tribuna MT, 2020 | Dados de 2020 (rotulado) |
| CT construída com doações (inclusive terreno) e eventos; inaugurada "há três anos e meio" em nov/2015 (≈2012); citação "Apesar do sucesso dos acampamentos, sentíamos que Deus nos cobrava mais coisas." | home, CT, timeline | A Tribuna MT, 29/11/2015 | "≈2012" é **dedução**; o texto diz "por volta de 2012" |
| Festa das Nações: 6ª edição em 2015, 4–5 mil pessoas, 600 voluntários | `bigEvents` | A Tribuna MT, 2015 | Confirmado (2015) |
| Divina Brasa 2026: 28/03, 14 estações, shows, renda para a sede | `bigEvents` | Landing do site oficial | Confirmado |
| Casa da Saúde São Padre Pio, inaugurada abr/2026, "fundada pela comunidade" | home, obras | Vídeo do YouTube oficial (24/04/2026) | Confirmado |
| Adoração Perpétua desde ≈ago/2025; missa de 1 ano (2026); missa de 2 anos 31/08/2027 | vida de oração, timeline | Galeria (01/09/2026), YouTube, calendário 2027 | Confirmado; **local e horários não publicados** |
| Grupos de oração: nomes e logotipos; "segunda-feira, 19h30" | grupos | Homepage do site oficial | Horário **marcado como "do site atual, confirme"** |
| Acampamentos (edições, meses) | `content/programs.ts` | Galerias do site oficial; calendário 2027 | Edições contadas pelas galerias |
| Pré-requisitos do Desperta, datas, valores, realização com JDA, tema e Lc 15,20 | retiros/desperta, agenda | Produtos do WooCommerce e arte oficial | Confirmado |
| Calendário 2027 (25 itens) | `content/events.ts` | Post "CALENDÁRIO OFICIAL 2027", Instagram, 19/11/2026 | "Sujeito a alterações" (avisado no site). Sem horários/locais, exceto "Noite Católica – Sede". "Lual" grafado como "Luau". "Acampamento RS" e "Acampamento II" sem explicação pública |
| Acampamento Juvenil 2027: 18ª edição, 18 a 24 anos, pré-inscrições 30/11 a 07/12/2026 | `content/programs.ts`, `content/events.ts` | Post "SAVE THE DATE", Instagram, 21/11/2026 | Confirmado. A faixa etária pode ter mudado em relação às edições antigas (o programa ainda tem `minors: true` para proteger galerias passadas) |
| Divina Saúde ativo (atendimentos na sede aos sábados, nov/2026) | `obras-e-projetos` | Posts do Instagram de 16/11 e 23/11/2026 | Confirmado que existe hoje; frequência não publicada |
| Ler é Crescer ativo (nov/2026) | `obras-e-projetos` | Reel do Instagram de 21/11/2026 | Confirmado que existe hoje; público e horário não publicados. Não usar fotos (provável público infantil) |
| Grupo de oração às segundas | `grupos-de-oracao` | Site atual (19h30); post do Instagram de 24/11/2026 diz "a partir das 19h"; reel de 23/11/2026 diz 19h30 | **Divergente**: mantido 19h30 com aviso para confirmar |
| Inscrição do 5º Desperta (5–6/12/2026) | `content/events.ts` | Site oficial (produtos WooCommerce) × post do Instagram de 12/11/2026 (link de Microsoft Forms) | **Divergente**: confirmar qual canal vale |
| Projetos Divina Saúde, Ler é Crescer, Missões Populares, Divina Horta | obras | A Tribuna MT 2015/2020 | Apresentados como "citados na imprensa"; status atual **a confirmar** |
| Contatos (WhatsApp das secretarias, fixo, e-mails), endereço | `content/site.ts` | Site oficial, Facebook, Diocese | Endereço "Rua Padre Anchieta" (Diocese) × "Rua Anchieta" (Facebook) → **validar** |
| Vídeos | `content/videos.ts` | Feed RSS do canal oficial (26/11/2026) | Confirmado |
| Fotos (17 escolhidas a dedo + 58 galerias) | `photos` em `site.ts`, `content/galleries.json` | Acervo do WordPress oficial (servidas do próprio domínio) | **Autorização de uso e autoria a confirmar** |
| Inscrições e valores da loja | `content/inscricoes.ts` | Produtos do WooCommerce, copiados em 28/11/2026 (a Store API foi desligada do site) | Estático: atualizar à mão quando houver nova inscrição |

## Decisões de privacidade
- **28/11/2026 — todas as galerias públicas**, por decisão do usuário: as 16 galerias antes restritas (Mirim, Juvenil, FAC e Teatro Vivo, 2.256 fotos) aparecem como as demais e entram no sitemap. Confirmar com a coordenação o direito de imagem; o canal de remoção está em `/privacidade`.
- O campo `restricted` continua em `galleries.json`: se uma galeria voltar a ser restrita, a página mostra "Pedir as fotos" à secretaria (nunca o site antigo).
- Fichas de inscrição (nome, celular, CPF) não ficam no site: seguem pelo WhatsApp para a secretaria.
- Nenhum nome de pessoa da coordenação é publicado até validação.

## Conteúdo migrado do site antigo em 28/11/2026
| Conteúdo | Onde está no código | Fonte |
|---|---|---|
| Inscrições do Retiro Desperta 2026 (retirante R$ 120, servo R$ 100, pré-requisitos, campos) | `content/inscricoes.ts` | Produtos do WooCommerce `/produto/retiro-desperta26-retirante/` e `/produto/retiro-desperta-2026-servo/` |
| Festival Divina Brasa 2026 (14 estações, 5 horas, 18h, lotes R$ 150/170/190, regras de idade, formas de pagamento, destino da renda, atrações, patrocinadores, WhatsApp de patrocínio, Instagram) | `content/divina-brasa.ts` | Landings `/festival-divina-brasa/` e `/festival-divina-brasa-3/` |
| Cartaz da Festa Junina 2023 | `content/divina-brasa.ts` (`festaJunina2023`, só arquivado) | `/festajunina/` |
| 7.107 imagens | `public/media` | `/wp-content/uploads/` |
