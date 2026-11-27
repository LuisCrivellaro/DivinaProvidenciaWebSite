# Origem dos conteúdos

> Regra: nada no site sem fonte. Fontes completas e pendências da fase de pesquisa: `docs/analise-divina-providencia/10_FONTES_E_PENDENCIAS.md`. Dados no código: `src/content/*`.

| Conteúdo no site | Onde está no código | Fonte | Status |
|---|---|---|---|
| Nome, lema "Sua família, nossa missão!" | `content/site.ts` | Site oficial (meta), Instagram | Confirmado |
| Carisma ("…na vida das pessoas.") | `site.carisma` | Homepage do site oficial | Confirmado; o Facebook usa redação mais longa → **validar texto do Estatuto** |
| Comunidade de Aliança, Estatuto Canônico aprovado por Dom Juventino Kestering (2020), revisões pelo bispo e pela CNBB, membros vivem com famílias e profissões | `app/comunidade`, home | A Tribuna MT, 25/09/2020 | Fonte única de imprensa |
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
| Projetos Divina Saúde, Ler é Crescer, Missões Populares, Divina Horta | obras | A Tribuna MT 2015/2020 | Apresentados como "citados na imprensa"; status atual **a confirmar** |
| Contatos (WhatsApp das secretarias, fixo, e-mails), endereço | `content/site.ts` | Site oficial, Facebook, Diocese | Endereço "Rua Padre Anchieta" (Diocese) × "Rua Anchieta" (Facebook) → **validar** |
| Vídeos | `content/videos.ts` | Feed RSS do canal oficial (26/11/2026) | Confirmado |
| Fotos (17 escolhidas a dedo + 58 galerias) | `photos` em `site.ts`, `content/galleries.json` | Acervo do WordPress oficial (servidas do próprio domínio) | **Autorização de uso e autoria a confirmar** |
| Produtos/preços da loja | gerado em tempo real | Store API pública do WooCommerce | Ao vivo (cache de 1 h) |

## Decisões de privacidade
- 16 galerias (2.256 fotos) com crianças/adolescentes (Mirim, Juvenil, FAC) ou acolhidos (Teatro Vivo) **não são republicadas**: mostram aviso e link para o site oficial, ficam fora do sitemap e com `noindex`.
- Fotos de destaque escolhidas sem crianças em primeiro plano. Galerias abertas (festas, Divina Jovem) podem conter crianças ao fundo — pendência de curadoria.
- Nenhum nome de pessoa da coordenação é publicado até validação.
