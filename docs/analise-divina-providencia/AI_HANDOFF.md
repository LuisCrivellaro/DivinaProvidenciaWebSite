# AI_HANDOFF — Redesign do site da Comunidade Divina Providência

> Leia este arquivo primeiro. Ele resume a fase de **pesquisa** (concluída em 26/11/2026) para que uma nova sessão continue sem refazer o trabalho. Os detalhes e as fontes estão nos arquivos `01`–`10` desta pasta.

## 0. Estado do projeto
- **Repositório:** `LuisCrivellaro/DivinaProvidenciaWebSite` — até agora só tem README e esta pasta de documentação. **Nenhum código do novo site foi escrito** (era proibido nesta fase).
- **Fase concluída:** pesquisa e análise do site atual `https://adivinaprovidencia.com.br/` e das redes sociais.
- **Próxima fase (definida pelo usuário):** usar referências visuais, templates do Framer e skills de UI/UX para desenvolver o novo site.
- **Regras que continuam valendo:** não inventar fatos/datas/horários/nomes; não fazer inscrições, compras ou envios de formulário no site real; não acessar áreas privadas; não reutilizar fotos sem autorização; tratar dados da Comunidade Terapêutica e de menores com cuidado especial.

## 1. Quem é a comunidade (resumo confiável)
- **Comunidade Divina Providência**, católica, em **Rondonópolis/MT**, sede na **Vila Goulart** (Rua (Padre) Anchieta, s/n, CEP 78745-400 — validar).
- Pessoa jurídica: **Associação Divina Providência**, CNPJ 08.667.221/0001-20 (desde fev/2007). Atividades desde **2005** segundo a diocese (uma reportagem de 2020 sugere ≈1998 — divergência).
- **Comunidade de Aliança** reconhecida em **set/2020** com **Estatuto Canônico** aprovado por Dom Juventino Kestering, **Diocese de Rondonópolis-Guiratinga**. Membros vivem com suas famílias e profissões. Renovação anual do compromisso em outubro.
- **Lema:** "Sua família, nossa missão!"
- **Carisma:** "Ser sinal da infinita bondade e misericórdia de Deus na vida das pessoas." (site) / "…na vida e na história dos homens do nosso tempo." (Facebook) → **pedir redação oficial**.
- **Missão (diocese):** evangelizar as famílias (acampamentos, grupos de oração, retiros) e restaurar vidas pela Comunidade Terapêutica.
- Pessoas citadas publicamente (validar antes de usar): João Paulo Lopes Neto e Edir Braga Júnior (fundadores/cofundador), Marco Túlio Duarte Soares (presidente da CT em 2015–16), Jean Carlos Barbosa (presidente da Associação, 2024), Gisely Bueno Mota Miranda (secretária, 2024), Luciana Crivellaro (coordenação de pastoral, 2024).

## 2. Atividades (detalhes em 03)
- **Acampamentos:** Mirim (crianças; 18ª ed. 2026), Juvenil (17ª ed. 2026), FAC — Formação de Adolescentes Cristãos (20ª ed. 2026), Sênior (25ª ed. 2026), Casais; "Acampamento II" e "Acampamento RS" no calendário 2027 (não identificados). Estrutura: Chegada, Tribos, Equipes de Trabalho, Bota Fora; participantes e **servos**.
- **Retiros/formação:** Desperta (jovens que já fizeram FAC 17+/Juvenil/Sênior até 30; 05–06/12/2026; com o grupo JDA), I Retiro Homens de Fé (2026), Retiro das Mulheres, Curso 5 Linguagens do Amor, Forma Divina, Divinacast.
- **Grupos de oração (4):** GOI Menino Jesus (infantil), FAC, Jovens Diante do Altar (JDA), Mãe da Divina Providência. Site diz "Toda segunda-feira às 19:30h" (vigência/abrangência a confirmar).
- **Oração:** Adoração Perpétua (desde ≈ago/2025), Cerco de Jericó anual em agosto (transmitido no YouTube, até ~10 mil views/dia), missas especiais, Via Sacra encenada.
- **Eventos:** Divina Jovem (festival católico, set/out), Esquenta Divina Jovem, Luau, Noite Católica.
- **Arrecadação:** Festa das Nações (junho, desde ≈2010), Festival Divina Brasa (mar/2026; set/2027), Arraiá da Divina.
- **Obras:** Comunidade Terapêutica Divina Providência (homens adultos com dependência química; ~30 vagas em 2020; desde ≈2012), **Casa da Saúde São Padre Pio** (inaugurada abr/2026). Projetos citados em 2020 (status desconhecido): Divina Saúde, Ler é Crescer, Missões Populares, Divina Horta.
- **Calendário Oficial 2027** transcrito em 03 §0 (fonte: Instagram, 19/11/2026; "sujeito a alterações").

## 3. Site atual (detalhes em 02, 04, 06, 09)
- **78 URLs** públicas: 12 páginas, **58 posts que são todos galerias** (7.081 fotos, 2022–2026), 2 produtos, categorias, autor.
- **Stack:** WordPress 7.1.5 · WooCommerce 11.0.1 · Elementor 4.2.4 + Pro · Happy Addons · OceanWP · PPOM (campos do participante) · WCPA (redundante) · **Mercado Pago 8.9.3** (cartão, Pix, carteira — confirmar) · Yoast · GTM/GA · Meta Pixel ×2 · Cloudflare.
- **Menu:** Início · Contato · Loja · Carrinho · Login + botão WhatsApp. **Sem** páginas institucionais (a `/comunidade/` está vazia).
- **Inscrições:** cada tipo de inscrição é um **produto** (Desperta Retirante R$ 120 / Servo R$ 100) com campos obrigatórios Nome Participante, Celular, CPF → carrinho → checkout Mercado Pago. Checkout/e-mails não observados (exigiria enviar formulário).
- **Histórico:** já venderam "Camiseta Branca Divina Jovem – P (R$ 75)" e "Estacionamento VIP 20/04 (R$ 100)". Ingressos de grandes eventos vão para fora (TotalIngressos; WhatsApp).
- **Contatos:** WhatsApp Evangelização +55 66 99908-2128; WhatsApp/telefone Casa Terapêutica +55 66 99665-5565; fixo (66) 3421-7662; secretaria@ / cterapeutica@ / presidencia@adivinaprovidencia.com.br.
- **Redes:** Instagram @adivinaprovidencia (33,4 mil; posts quase diários); Facebook (18,9 mil; 98% recomendam); YouTube @ComunidadeDivinaProvidência (6,07 mil inscritos; 93 vídeos).

## 4. Principais problemas (detalhes em 06)
1. 🔴 Menu mobile quebrado (itens com 45 px de largura).
2. 🔴 Nenhum conteúdo institucional.
3. 🔴 LGPD: CPF coletado sem aviso; pixels sem consentimento; sem política de privacidade; ~2.227 fotos de menores públicas; galeria da Comunidade Terapêutica.
4. 🟠 Sem agenda; eventos passados publicados como ativos.
5. 🟠 Grupos de oração sem informação; galerias sem organização; miniaturas de 650–860 KB; inscrição com linguagem de loja em inglês; contraste dourado/branco 2,86:1.
6. 🟡 Páginas duplicadas (`/loja` × `/produtos`, duas landings Divina Brasa), usuário admin exposto (`/wp-json/wp/v2/users` → "startdesign"), títulos/SEO inconsistentes.

## 5. Identidade visual (detalhes em 07)
- Logo: **peixe (Ichthys) vermelho + duas elipses douradas**, texto "Divina" (vermelho) "Providência" (dourado) em serifa itálica. Cores medidas: `#ED3237` + `#D2AE6D` (horizontal) / `#DE2625` + `#CCA765` (vertical).
- Site atual: primary `#ED3237`, secondary `#B9934E`, accent `#D29320`, text `#7A7A7A`; Roboto + Times New Roman.
- Sub-marcas: GOI, FAC, JDA, Mãe da Divina Providência, Desperta, Divina Jovem, Divina Brasa.
- Referência mais "católica" e madura: arte do **calendário 2027** (azul-petróleo + dourado + pintura clássica de Nossa Senhora).
- Direção preliminar: "casa da misericórdia" — marfim `#FBF7EF`, vermelho `#B8232A`/`#A51E24`, dourado de texto `#7A5A22`, dourado decorativo `#D2AE6D`, texto `#3B2A1A`; serifa clássica + sans legível; fotos reais; nada de estética tech/loja.

## 6. Decisões e recomendações
- Arquitetura v0 (08): **Comunidade · Participe (Agenda, Acampamentos, Retiros, Grupos, Adoração, Grandes eventos) · Obras e Projetos · Galeria · Loja · Conta · Contato**; inscrição dentro da página de cada evento; e-commerce secundário.
- **Preservar** WooCommerce + Mercado Pago + histórico de pedidos (09); modelar evento → tipos de inscrição; um formulário por participante; aceite de termos e LGPD.
- **Não lançar** perto de eventos com inscrições abertas (Desperta 05–06/12/2026; Juvenil 06–09/02/2027).
- Plano de redirecionamentos 301 a partir do inventário de URLs (02 §6).
- Doações só com iniciativa oficial confirmada.

## 7. Materiais coletados (onde estão)
- `docs/analise-divina-providencia/screenshots/` — 21 capturas do site (desktop/mobile) + calendário 2027 (Instagram). Algumas mostram rostos de pessoas: revisar antes de tornar o repo público.
- Logotipos e fotos **não** foram copiados para o repositório (apenas inspecionados). URLs dos arquivos estão em 05 §2.
- Inventário de 78 URLs (02 §6) e de 58 galerias (05 §3.2).

## 8. Pendências principais (lista completa P01–P38 em 10)
Carisma oficial · ano de fundação · fundadores/coordenação atual · padroeiros · horários e locais dos grupos · adoração perpétua (local/horários) · faixas etárias e inscrições dos acampamentos · "Acampamento II/RS" · Casa da Saúde São Padre Pio · formas de pagamento habilitadas · como a secretaria exporta inscritos · política de reembolso · autorização de imagem (menores) · logotipo vetorial · autoria das fotos · doações oficiais · acesso ao painel WordPress.

## 9. Próximos passos
1. Validar com a comunidade as pendências críticas (P01, P04, P06, P11–P13, P16, P20–P21, P26).
2. Obter acesso (de leitura) ao painel WordPress/WooCommerce para mapear checkout, e-mails, pedidos e configurações do Mercado Pago.
3. Decidir a stack do novo site (manter WP/WooCommerce com novo tema × front novo + WooCommerce headless × outra).
4. Coletar referências visuais (Framer) e montar moodboard a partir da direção de 07 §8.
5. Wireframes mobile-first da Home, Agenda, página de Acampamento, página de Evento com inscrição, Grupos de Oração, Comunidade Terapêutica, Galeria.
