# 10 — Fontes consultadas, confirmações, limitações e pendências

> **Data da consulta de todas as fontes:** 26/11/2026, noite (horário de Brasília; o servidor do site registrou 27/11/2026 02:29 UTC).

## 1. Fontes

| Ref. | Fonte | URL | Data do conteúdo | Como foi acessada | Confiabilidade |
|---|---|---|---|---|---|
| F1 | Site oficial (78 URLs) | https://adivinaprovidencia.com.br/ | 2022–2026 | `curl` + navegador integrado + Chrome headless | Oficial |
| F2 | API REST do WordPress (páginas, posts, categorias, usuários, mídia) | https://adivinaprovidencia.com.br/wp-json/wp/v2/ | — | GET público | Oficial/técnica |
| F3 | Store API do WooCommerce (produtos, categorias) | https://adivinaprovidencia.com.br/wp-json/wc/store/v1/ | — | GET público | Oficial/técnica |
| F4 | Sitemaps Yoast + robots.txt | https://adivinaprovidencia.com.br/sitemap_index.xml | — | GET | Oficial/técnica |
| F5 | Diocese de Rondonópolis-Guiratinga — "Associação Divina Providência" | https://dioceseroogga.org.br/associacao-divina-providencia/ | 23/07/2024 | navegador integrado | Alta (institucional) |
| F6 | A Tribuna MT — "Reconhecimento: Divina Providência passa a ser uma Comunidade de Aliança" | https://www.atribunamt.com.br/rondonopolis/2020/09/reconhecimento-divina-providencia-passa-a-ser-uma-comunidade-de-alianca/ | 25/09/2020 | navegador integrado | Média-alta (imprensa local, com falas do cofundador) |
| F7 | A Tribuna MT — "Trabalho social é uma marca forte da Comunidade" (2ª parte da série sobre 10 anos) | https://www.atribunamt.com.br/geral/2015/11/trabalho-social-e-uma-marca-forte-da-comunidade/ | 29/11/2015 | navegador integrado | Média-alta |
| F8 | Assembleia Legislativa de MT — Projeto de Resolução 166/2015 (título de cidadão ao presidente da Comunidade Terapêutica) | https://www.al.mt.gov.br/storage/webdisco/cp/20150902143937564000.pdf | 02/09/2015 | download PDF | Alta (documento oficial) |
| F9 | Econodata — cadastro "Associação Divina Providência" CNPJ 08.667.221/0001-20 | https://www.econodata.com.br/consulta-empresa/08667221000120-associacao-divina-providencia | — | **apenas resultado de busca, não aberto** | Baixa (não verificado) |
| F10 | Instagram oficial `@adivinaprovidencia` (perfil público sem login) | https://www.instagram.com/adivinaprovidencia/ | nov/2026 | navegador integrado (sem login) | Oficial |
| F10b | Post "CALENDÁRIO OFICIAL 2027" | https://www.instagram.com/adivinaprovidencia/p/Df7VC--xkI7/ | 19/11/2026 | navegador integrado | Oficial |
| F11 | Facebook oficial `adivinaprovidencia` | https://www.facebook.com/adivinaprovidencia | nov/2026 | navegador integrado (sem login) | Oficial |
| F12 | YouTube oficial `@ComunidadeDivinaProvidência` (canal, feed RSS, páginas de vídeo) | https://www.youtube.com/@ComunidadeDivinaProvid%C3%AAncia | 2025–2026 | `curl` | Oficial |
| F13 | Agrolink (fonte original: Olhar Direto) — "Festival Braseiro" | https://www.agrolink.com.br/noticias/tecnicas-de-cortes-e-defumacao-de-carne-serao-apresentadas-no--festival-braseiro--em-mato-grosso_363252.html | 10/10/2016 | `curl` | Média |

**Verificação de autenticidade dos perfis sociais:** Instagram, Facebook e YouTube são os linkados no rodapé do site oficial, usam o mesmo nome/logotipo e publicam os mesmos eventos (Desperta, Divina Brasa, Cerco de Jericó, Adoração Perpétua). ✅

**Homônimos descartados (não confundir):**
- Congregação das Irmãs da Divina Providência (fundada em 1842 na Alemanha; rede de escolas/hospitais no Sul do Brasil) — **sem relação**.
- Associação Comunidade Obra Nova da Divina Providência (Várzea Grande/MT) — **outra entidade**.
- Hospital Divina Providência (Porto Alegre/RS) — **sem relação**.

## 2. O que foi efetivamente inspecionado

- ✅ Todas as 78 URLs do sitemap (HTML completo) + `/minha-conta/lost-password/`, paginação de categorias, 16 URLs institucionais testadas (404).
- ✅ Visual em desktop (19 capturas headless) e mobile (navegador integrado 375 px), incluindo menu mobile.
- ✅ Página de produto, campos do formulário (via DOM, sem preencher).
- ✅ CSS global (cores, fontes), logotipos (cores medidas nos pixels).
- ✅ Performance básica da home (Navigation/Resource Timing).
- ✅ Instagram (perfil, destaques, legendas de 12 posts recentes, calendário 2027) — sem login.
- ✅ Facebook (intro, contato, último post) — sem login.
- ✅ YouTube (canal, 15 vídeos mais recentes via RSS, descrições).

## 3. O que NÃO foi inspecionado (e por quê)

| Item | Motivo |
|---|---|
| Checkout com itens, campos de cobrança, formas de pagamento habilitadas, e-mails de confirmação | Exigiria adicionar item ao carrinho (envio de formulário) — proibido pelas regras do briefing |
| Área logada "Minha conta" | Exigiria login |
| Painel WordPress/WooCommerce, pedidos, relatórios | Área privada |
| Conteúdo completo do Instagram (feed antigo, destaques "Orientações", "Formações", "Localização", "🏥🙏❤️") | Requer login |
| Posts antigos do Facebook | Requer login/rolagem extensa |
| Página TotalIngressos e Instagram `@festivaldivinabrasa` | Fora do escopo principal (evento já realizado) |
| 1ª parte da série de 2015 do A Tribuna | Não localizada na busca |
| Documento do Estatuto Canônico | Não público |

## 4. Informações confirmadas (resumo)
- Nome, CNPJ, diocese, bairro, lema, carisma (com variação de redação), reconhecimento como Comunidade de Aliança (2020), Associação desde fev/2007, atividades desde 2005 (diocese).
- Acampamentos Mirim, Juvenil, FAC, Sênior (edições registradas), Casais (calendário).
- Retiro Desperta 2026 (05–06/12, Retirante R$ 120 / Servo R$ 100).
- 4 grupos de oração (nomes).
- Adoração Perpétua (1 ano em 2026).
- Cerco de Jericó anual em agosto; Divina Jovem anual; Festa das Nações anual; Divina Brasa (2026; previsto 2027).
- Comunidade Terapêutica (masculina, adultos — dados de 2015/2020).
- Casa da Saúde São Padre Pio (inaugurada em 2026).
- Calendário oficial 2027.
- Stack: WordPress + WooCommerce + Elementor + OceanWP + PPOM + Mercado Pago.

## 5. Divergências registradas

| # | Tema | Versão A | Versão B |
|---|---|---|---|
| D1 | Início das atividades | 2005 (diocese 2024; "10 anos" em 2015) | ≈1998 ("22 anos atrás", 2020) |
| D2 | Redação do carisma | "…na vida das pessoas." (site) | "…na vida e na história dos homens do nosso tempo." (Facebook) |
| D3 | Endereço | "Rua Padre Anchieta s/n" (diocese) | "Rua Anchieta" (Facebook); site só "Vila Goulart … 78745" |
| D4 | Teatro Vivo | "Teatro Vivo 2025" (título/slug) | "Teatro Vivo 2026" (resumo) |
| D5 | Grafias | "Sênior/Senior", "Arraiá/Arraia", "Junina/Julina", "Lual/Luau", "Camarim/Camarin" | — |
| D6 | Cores do logotipo | `#ED3237`/`#D2AE6D` (horizontal) | `#DE2625`/`#CCA765` (vertical) |

## 6. Pendências — perguntas para a comunidade

### Identidade e história
- **P01** Texto oficial do carisma (Estatuto). Há também missão, visão e valores oficiais?
- **P02** Etapas de pertença (ex.: "Caminho", "Membros Comprometidos") — podem ser publicadas?
- **P03** Há padroeiro(s) oficial(is)? (Nossa Senhora? São Padre Pio?)
- **P04** Ano oficial de fundação (2005? 1998?) e marco a ser comemorado.
- **P05** Quem são os fundadores (lista oficial) e se desejam ser citados.
- **P06** Coordenação atual (coordenador geral, presidente da Associação, coordenação de pastoral) e quem pode aparecer no site.
- **P07** Relação jurídica entre Associação Divina Providência, Comunidade Terapêutica e Casa da Saúde São Padre Pio (mesmo CNPJ?).
- **P08** Status atual dos projetos Divina Saúde, Ler é Crescer, Missões Populares, Divina Horta, Bazar Beneficente.
- **P09** Significado e origem do nome "Divina Providência" para a comunidade (texto oficial).

### Atividades
- **P10** Local dos acampamentos (Sítio Divina Providência?) — pode ser divulgado?
- **P11** Como funcionam hoje as inscrições dos acampamentos (onde, valores, documentos, autorização de responsáveis, ficha de saúde)?
- **P12** Grupos de oração: dia, horário, local e público de cada um; o horário "segunda 19h30" vale para todos?
- **P13** Adoração Perpétua: local, horários de visitação, como se tornar adorador, se pode ser divulgada.
- **P14** Casa da Saúde São Padre Pio: serviços, público, endereço, contato, se deve estar no site.
- **P15** O que são "Acampamento II" e "Acampamento RS" (calendário 2027)?
- **P16** Faixa etária e pré-requisitos de cada acampamento (Mirim, Juvenil, FAC, Sênior, Casais).
- **P17** Divina Jovem: local, se é pago, se terá inscrição/ingresso pelo site.
- **P18** Teatro Vivo — ano correto e se a galeria pode continuar pública.
- **P19** O número 66 99958-5404 (Festa Junina 2023) ainda é da comunidade?
- **P28** Arraiá/Festa Junina acontecerá em 2027 (não está no calendário)?

### Loja e inscrições
- **P20** Formas de pagamento habilitadas no Mercado Pago (cartão, parcelamento, Pix, boleto?).
- **P21** Como a secretaria obtém a lista de inscritos (exporta pedidos? planilha?).
- **P22** É obrigatório criar conta para se inscrever?
- **P23** Conteúdo dos e-mails de confirmação; há instruções enviadas depois?
- **P24** Política de cancelamento/reembolso/transferência de inscrição.
- **P25** Quais dados de menores são coletados e onde (site ou papel)?
- **P29** Endereço oficial completo para o site e para documentos.
- **P36** Haverá venda de camisetas/produtos em 2027 (já houve "Camiseta Branca Divina Jovem" e "Estacionamento VIP")?
- **P37** Ingressos de grandes eventos continuarão em plataforma externa (TotalIngressos) ou devem ir para o site?

### Imagem, marca e privacidade
- **P26** Existe termo de autorização de uso de imagem nos acampamentos/retiros? Cobre publicação no site?
- **P27** Há iniciativa oficial de **doações** (Pix, campanha) que possa ser divulgada?
- **P30** Arquivos vetoriais do logotipo e nome da fonte do logotipo.
- **P31** Quem é o fotógrafo/equipe de fotos e quais os termos de uso.
- **P32** Significado oficial do símbolo (peixe + elipses).
- **P33** Existe manual de marca?
- **P34** Autorização para uso das artes dos grupos (GOI, FAC, JDA, Mãe da Divina Providência) e campanhas.
- **P35** Quem produz as artes das redes (agência/voluntários) — para alinhar o visual do site.
- **P38** O repositório GitHub deste projeto é público? Se sim, revisar capturas de tela com pessoas.

## 7. Questões que exigem validação antes de publicar qualquer coisa
Qualquer data, horário, valor, nome de pessoa, dado da Comunidade Terapêutica, foto de menor, foto de acolhido e texto institucional.
