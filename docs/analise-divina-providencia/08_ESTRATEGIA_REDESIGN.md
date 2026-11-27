# 08 — Estratégia de redesign (arquitetura, objetivos, direção criativa preliminar)

> **Status:** proposta para validação com a comunidade. **Nada aqui está autorizado para desenvolvimento.** Itens marcados "🔒 condicional" dependem de confirmação de que a iniciativa existe oficialmente.

## 1. Objetivos do novo site

1. **Apresentar a comunidade** com clareza e credibilidade eclesial (quem somos, carisma, Comunidade de Aliança, diocese).
2. **Levar pessoas à experiência**: acampamentos, retiros, grupos de oração, adoração, eventos — com datas, público e "como participar".
3. **Inscrever e vender sem fricção** — preservando WooCommerce + Mercado Pago (ou equivalente aprovado).
4. **Organizar a memória** (galerias) com respeito à privacidade.
5. **Dar visibilidade às obras de caridade** (Comunidade Terapêutica, Casa da Saúde São Padre Pio) com sobriedade.
6. **Reduzir atendimento manual** no WhatsApp (informação clara + contato direto por setor).

## 2. Públicos (personas)

| Público | Precisa | Entrada típica |
|---|---|---|
| Jovem que viu um post (16–30) | Data, valor, como se inscrever no Desperta/Divina Jovem/Sênior | Instagram → celular |
| Pai/mãe de criança ou adolescente | Confiança, faixa etária, segurança, o que levar, autorização, contato | Indicação/WhatsApp |
| Membro/servo da comunidade | Agenda, inscrição de servo, fotos | Direto |
| Família de pessoa com dependência química | Como pedir ajuda, contato discreto | Busca Google |
| Doador/patrocinador/empresa | Credibilidade, projetos, como apoiar | Divina Brasa/Festa das Nações |
| Clero, diocese, imprensa | Identidade, história, contatos institucionais | Busca |

## 3. Arquitetura proposta (validação das hipóteses do briefing)

| Hipótese do briefing | Decisão | Justificativa |
|---|---|---|
| Início | ✅ Manter | — |
| Nossa Comunidade | ✅ Seção | Lacuna crítica (UX-02) |
| História | ✅ Página dentro de "Nossa Comunidade" | Há material (2005/2007/2012/2020) — falta só validar |
| Carisma e Espiritualidade | ✅ Página dentro de "Nossa Comunidade" | Carisma + Comunidade de Aliança + vida de oração |
| Projetos e Missões | 🔄 Renomear para **"Obras e Projetos"** | Agrupa Comunidade Terapêutica, Casa da Saúde São Padre Pio e projetos sociais confirmados |
| Grupos de Oração | ✅ Página própria | 4 grupos, porta de entrada semanal |
| Acampamentos | ✅ Página-índice + página por tipo | Mirim, Juvenil, FAC, Sênior, Casais (+ "Acampamento II"/"RS" após esclarecer) |
| Retiros | ✅ Página-índice + página por retiro | Desperta, Homens de Fé, Mulheres, Curso 5 Linguagens |
| Eventos | ✅ como **Agenda** (calendário) | Unifica eventos pontuais e recorrentes; Divina Jovem, Cerco, Festa das Nações e Divina Brasa ganham página "evento recorrente" com edições |
| Galeria de Fotos | ✅ | Reorganizar por evento/edição |
| Vídeos | 🔄 Integrar a "Galeria" ou "Mídia" | 93 vídeos no YouTube — bastam playlists/embeds; não precisa página isolada com pouco conteúdo |
| Casa Terapêutica | ✅ dentro de "Obras e Projetos", com URL própria | Público e tom específicos |
| Loja | ✅ secundária | Camisetas/produtos quando houver |
| Inscrições | ✅ mas **não como menu separado** | Inscrição vive na página de cada evento; a Agenda filtra "inscrições abertas" |
| Minha Conta | ✅ ícone no header | Pedidos/inscrições |
| Contato | ✅ | Contatos por setor |
| Doações | 🔒 condicional | Só se houver iniciativa oficial (Pix, campanha). Hoje só há evidência de eventos de arrecadação e "Seja um patrocinador" (Divina Brasa) |

### 3.1 Mapa do site proposto (v0)

```
Início
├── Nossa Comunidade
│   ├── Quem somos (resumo, Comunidade de Aliança, diocese)
│   ├── Nossa história (linha do tempo validada)
│   ├── Carisma e espiritualidade (carisma oficial, lema, devoções, adoração perpétua)
│   └── Como fazer parte (caminho/membros — se a comunidade quiser publicar)
├── Participe
│   ├── Agenda (calendário anual + próximos eventos + "inscrições abertas")
│   ├── Acampamentos ─ Mirim · Juvenil · FAC · Sênior · Casais · (II/RS)
│   ├── Retiros e formações ─ Desperta · Homens de Fé · Mulheres · 5 Linguagens do Amor · Forma Divina
│   ├── Grupos de oração ─ GOI Menino Jesus · FAC · Jovens Diante do Altar · Mãe da Divina Providência
│   ├── Adoração Perpétua (como participar — se publicável)
│   └── Grandes eventos ─ Divina Jovem · Cerco de Jericó · Festa das Nações · Divina Brasa · Arraiá
├── Obras e Projetos
│   ├── Comunidade Terapêutica Divina Providência
│   ├── Casa da Saúde São Padre Pio
│   └── Outros projetos (apenas os confirmados como ativos)
├── Galeria (fotos por evento/edição + vídeos do YouTube)
├── Loja (produtos) ── Carrinho · Finalizar compra
├── Minha Conta
├── Contato
└── Rodapé: Política de privacidade · Termos de inscrição · Política de imagem · CNPJ/endereço
```

**Menu principal sugerido (5–6 itens):** Comunidade · Participe · Obras · Galeria · Agenda · Contato — com ícones de **Conta** e **Carrinho** e botão **"Inscrições abertas"** (dinâmico) ou **WhatsApp**.

## 4. Objetivo de cada página-chave

| Página | Objetivo | Conteúdo mínimo | CTA |
|---|---|---|---|
| Início | Em 10 s: quem somos + o que vem aí | Hero com foto real + lema; próximo(s) evento(s) com inscrição aberta; "Quem somos" curto; 4 portas (Acampamentos, Grupos, Adoração, Obras); carisma; galeria recente; vídeo; contatos | Inscrever-se / Conhecer |
| Quem somos | Credibilidade | Texto validado, diocese, estatuto, fotos de comunidade | Como participar |
| Agenda | Planejamento | Lista/calendário filtrável; status do evento | Ver evento / Inscrever |
| Página de acampamento (tipo) | Tirar dúvidas de pais/jovens | Público e idade, o que é, como funciona, próxima edição, documentos, o que levar, valores, FAQ, galeria de edições anteriores (curada) | Inscrever / falar com a secretaria |
| Página de evento (edição) | Converter | Data, local, horário, público, pré-requisitos, tipos de inscrição e valores, política de cancelamento, contato | Inscrever |
| Grupos de oração | Primeira visita | Card por grupo (dia/hora/local/público), "como é um encontro" | Ver no mapa / WhatsApp |
| Comunidade Terapêutica | Acolher famílias, informar apoiadores | Missão, público atendido, como pedir ajuda, como apoiar, contato discreto | Falar com a secretaria |
| Galeria | Memória | Filtros por tipo e ano; capa + nº de fotos | Ver fotos |
| Contato | Resolver rápido | Setores (Evangelização, Casa Terapêutica, Secretaria), endereço, mapa, horários, redes | WhatsApp por setor |

## 5. Oportunidades identificadas (para estudo — não autorizadas)

| Oportunidade | Base na pesquisa | Prioridade sugerida |
|---|---|---|
| **Calendário de eventos** | Calendário 2027 oficial existe só como imagem; dúvidas recorrentes nos comentários | Alta |
| **Inscrições simplificadas** | Fluxo atual de "produto" (04) | Alta |
| **Galerias organizadas** | 58 galerias / 7.081 fotos | Alta |
| **Informações para novos participantes** | Grupos sem informação; dúvidas sobre "Acampamento II" | Alta |
| **WhatsApp direto por setor** | Já existe; manter e explicar | Alta |
| **Integração com YouTube** | Cerco de Jericó com até ~10 mil views/dia; Divinacast | Média |
| **Apresentação dos projetos sociais** | Comunidade Terapêutica, Casa da Saúde São Padre Pio | Média |
| **Conteúdos de evangelização** (Divinacast, homilias) | Canal ativo | Média/Baixa |
| **Informações de oração** (adoração perpétua, Cerco) | Confirmados | Média — depende de dados |
| **Patrocínio de eventos** | "Seja um patrocinador" no Divina Brasa | Média |
| **Doações** | Sem iniciativa oficial confirmada | 🔒 condicional |
| **Área restrita para galerias de menores** | LGPD | Média (decisão da comunidade) |

## 6. Direção criativa preliminar

**Palavras-guia:** acolhimento · misericórdia · família · fé viva · sobriedade · alegria jovem.

- **Tom visual:** católico, caloroso, elegante; muito respiro; fotos reais em destaque; detalhes dourados finos; fundos marfim; vermelho reservado para ação e ênfase.
- **Fotografia:** priorizar adoração, missa, oração em grupo, famílias, servos trabalhando, jovens em louvor; rostos de menores apenas com autorização e preferencialmente não em hero.
- **Tipografia:** serifa clássica (títulos, citações bíblicas e carisma) + sans legível (UI/texto).
- **Componentes de marca:** cartão de evento com faixa de status ("Inscrições abertas", "Esgotado", "Realizado"); citação/versículo com referência; selo "Comunidade de Aliança — Diocese de Rondonópolis-Guiratinga" (se aprovado); cartões de grupo com o logotipo de cada grupo.
- **Não fazer:** parecer startup/tech, landing de vendas agressiva, loja genérica; misturar simbologia de outras tradições; usar banco de imagens genérico no lugar de fotos reais.
- **Mobile-first:** a maior parte do público chega do Instagram.

## 7. Decisões tomadas nesta etapa
1. Nenhum código foi desenvolvido.
2. A arquitetura acima é **v0** e deve ser validada com a comunidade.
3. Inscrições e loja devem preservar o backend existente até haver decisão explícita de migração (ver 09).
4. Nada de calendário, horário ou nome de pessoa vai para o site sem validação (ver 10).

## 8. Próximos passos sugeridos
1. Reunião de validação com a coordenação (lista de perguntas em 10_FONTES_E_PENDENCIAS.md).
2. Coletar: textos oficiais (carisma, história), logotipo vetorial, fotos autorizadas, dados de cada acampamento/grupo, acesso ao painel WordPress/WooCommerce (para mapear checkout, e-mails e pedidos).
3. Decidir stack (manter WordPress/WooCommerce com novo tema × front novo + WooCommerce headless × outra plataforma).
4. Referências visuais (Framer) e skills de UI/UX → wireframes → protótipo.
