# 06 — Auditoria de UX/UI, acessibilidade, performance e SEO

> **Data da consulta:** 26/11/2026. Testado em desktop (1440 px, Chrome headless e navegador integrado) e mobile (375×812 emulado no navegador integrado; 390 px no headless).
> Gravidade: 🔴 **Crítica** (impede tarefa principal ou expõe risco) · 🟠 **Alta** · 🟡 **Média** · ⚪ **Baixa**.
> Capturas em [`screenshots/`](screenshots/).

## Resumo executivo

O site atual funciona como **vitrine de galerias + um ponto de venda de inscrições**, mas **não cumpre o papel institucional**: não diz quem é a comunidade, o que faz, quando acontecem as atividades, nem como participar. No mobile — onde está a maior parte do público vindo do Instagram — o **menu está quebrado**. A identidade (vermelho + dourado, peixe) é reconhecível, mas a execução é genérica (template de loja), com mistura de idiomas, contraste insuficiente e nenhuma hierarquia de conteúdo.

| # | Problema | Gravidade |
|---|---|---|
| UX-01 | Menu mobile quebrado | 🔴 |
| UX-02 | Ausência total de conteúdo institucional ("A Comunidade" vazia) | 🔴 |
| UX-03 | Coleta de CPF sem aviso de privacidade/consentimento; trackers sem consentimento | 🔴 |
| UX-04 | Sem agenda/calendário; informações de eventos desatualizadas | 🟠 |
| UX-05 | Grupos de oração sem informação útil | 🟠 |
| UX-06 | Galerias sem organização (58 cards numa página) | 🟠 |
| UX-07 | Miniaturas pesadas / performance | 🟠 |
| UX-08 | Fotos de menores e de acolhidos públicas sem curadoria | 🟠 |
| UX-09 | Fluxo de inscrição com linguagem de loja e campos frágeis | 🟠 |
| UX-10 | Contraste de cores insuficiente | 🟠 |
| UX-11 | Navegação principal pobre e duplicada | 🟠 |
| UX-12 | Página de contato incompleta | 🟡 |
| UX-13 | Acessibilidade estrutural (H1, alt, rótulos) | 🟡 |
| UX-14 | Mistura de idiomas e erros de texto | 🟡 |
| UX-15 | Páginas duplicadas/obsoletas e SEO técnico | 🟡 |
| UX-16 | Exposição do usuário administrador | 🟡 |
| UX-17 | Tipografia inconsistente | ⚪ |
| UX-18 | Posts de galeria com metadados irrelevantes | ⚪ |

---

## Problemas detalhados

### UX-01 🔴 Menu mobile quebrado
1. **Problema:** ao tocar no hambúrguer, o menu abre como uma faixa de **45 px de largura** com itens de 11 px; os rótulos aparecem cortados ("INICI…") e o resto do layout é empurrado para baixo.
2. **Onde:** todas as páginas, viewport ≤ 767 px. Evidência: `screenshots/20_mobile_menu_aberto_quebrado.jpg`; medição via DOM: cada link `45×40 px, font-size 11px`.
3. **Efeito:** no celular é praticamente impossível navegar para Contato, Loja, Carrinho ou Login.
4. **Gravidade:** Crítica.
5. **Correção:** menu mobile em tela cheia/off-canvas, itens ≥ 44 px de altura, fonte ≥ 16 px.
6. **Benefício:** navegação utilizável para o público majoritário (que chega pelo Instagram, no celular).

### UX-02 🔴 Nenhum conteúdo institucional
1. **Problema:** não existe "Quem somos", história, carisma explicado, missão, estrutura, nem página da Casa/Comunidade Terapêutica. `/comunidade/` existe, está **vazia** desde 2022 e fora do menu.
2. **Onde:** site inteiro; `screenshots/03_comunidade_desktop.jpg`.
3. **Efeito:** visitante novo (pais de acampantes, doadores, padres, imprensa) não entende quem é a comunidade nem sua ligação com a Igreja; perde-se credibilidade.
4. **Gravidade:** Crítica.
5. **Correção:** seção "Nossa Comunidade" (história, carisma, Comunidade de Aliança, diocese) com textos validados.
6. **Benefício:** confiança, SEO, base para todas as outras páginas.

### UX-03 🔴 Privacidade / LGPD
1. **Problema:** (a) inscrição coleta **CPF, nome e celular** sem aviso de finalidade, sem consentimento e sem política de privacidade (não existe nenhuma página de política); (b) **Meta Pixel ×2, GTM e Google Analytics** carregam e disparam `PageView` já na primeira visita, com `fbq('consent','grant')` por padrão, sem banner de consentimento; (c) galerias públicas de menores (ver UX-08).
2. **Onde:** produtos de inscrição, todas as páginas.
3. **Efeito:** risco legal e reputacional; desconfiança no momento de pagar.
4. **Gravidade:** Crítica.
5. **Correção:** política de privacidade, banner de consentimento (não carregar pixels antes do aceite), texto de finalidade no formulário, checkbox de aceite.
6. **Benefício:** conformidade e confiança.

### UX-04 🟠 Sem agenda; eventos desatualizados
1. **Problema:** não há calendário. O único "evento" na home ("28 de Março | Sede…") é de mar/2026 e está oculto em todos os breakpoints; as landings `/festival-divina-brasa/` (mar/2026) e `/festajunina/` (2023) seguem publicadas sem indicar que passaram. O calendário oficial 2027 só existe como imagem no Instagram.
2. **Onde:** home, landings.
3. **Efeito:** o público não sabe quando são os acampamentos, retiros, Cerco de Jericó etc.; depende de perguntar no WhatsApp/Instagram (os comentários do post do calendário confirmam a dúvida).
4. **Gravidade:** Alta.
5. **Correção:** agenda com eventos recorrentes e próximos, cada um com página própria e status (inscrições abertas/encerradas/realizado).
6. **Benefício:** menos atendimento manual, mais inscrições.

### UX-05 🟠 Grupos de oração sem informação
1. **Problema:** 4 logotipos sem link, sem descrição, público, local ou o que acontece; um único horário genérico ("Toda Segunda-Feira às 19:30h") cuja vigência e abrangência não são claras.
2. **Onde:** home.
3. **Efeito:** quem quer começar a participar não tem por onde.
4. **Gravidade:** Alta.
5. **Correção:** página "Grupos de Oração" com card por grupo (público, dia/horário, local, contato, "primeira vez? veja como é").
6. **Benefício:** porta de entrada para novos membros.

### UX-06 🟠 Galerias desorganizadas
1. **Problema:** 58 galerias em uma página única, sem filtros por tipo/ano, sem busca; títulos inconsistentes ("17 Acampamento FAC / 2024" × "18 Acampamento FAC" × "Festa Julina 2024" vs "Festa Junina 2024"); posts sem texto; miniaturas internas pequenas (~130 px) com muito espaço vazio.
2. **Onde:** `/galerias/`, posts. `screenshots/05_galerias_desktop.jpg`, `16_post_festa_nacoes_2022_desktop.jpg`.
3. **Efeito:** difícil achar "as fotos do meu acampamento"; acervo valioso subaproveitado.
4. **Gravidade:** Alta.
5. **Correção:** galeria por **evento → edição (ano)**, filtros (Acampamentos, Retiros, Oração, Festas, Divina Jovem), capa, data do evento, contagem de fotos, texto curto.
6. **Benefício:** memória da comunidade navegável; conteúdo para SEO.

### UX-07 🟠 Performance
1. **Problema:** home faz **122 requisições** (65 scripts); miniaturas dos cards de galeria carregam a imagem original (**650–860 KB cada**); dois plugins de campos personalizados e vários addons Elementor; scripts de terceiros (Facebook, GTM, GA, unpkg, YouTube) carregados antes da interação. TTFB ≈ 0,5 s (Cloudflare ajuda).
2. **Onde:** home e galerias.
3. **Efeito:** lentidão em 4G, consumo de dados do usuário.
4. **Gravidade:** Alta.
5. **Correção:** imagens responsivas (srcset, WebP/AVIF, tamanhos de miniatura), lazy-load, vídeo com "facade", remover plugins redundantes.
6. **Benefício:** carregamento rápido no celular.

### UX-08 🟠 Imagens sensíveis sem curadoria
1. **Problema:** ~2.227 fotos de acampamentos Mirim/Juvenil/FAC públicas; galeria "Teatro Vivo – Comunidade Terapêutica" possivelmente com acolhidos.
2. **Onde:** posts de galeria.
3. **Efeito:** exposição de menores e de pessoas em tratamento; risco LGPD (arts. 11 e 14).
4. **Gravidade:** Alta.
5. **Correção:** política de imagem, curadoria, opção de galeria restrita (login/senha por evento) para menores.
6. **Benefício:** proteção das pessoas e da comunidade.

### UX-09 🟠 Experiência de inscrição
1. **Problema:** inscrição apresentada como produto ("Select options", "Visualização rápida", "Adicionar ao carrinho", "Categoria: Retiro"); campos sem máscara e com teclado errado no celular; quantidade >1 com dados de um só participante; produto "Servo" escondido; sem regulamento, informações práticas ou política de cancelamento; preço em verde e botão vermelho fora da paleta.
2. **Onde:** `/produto/...`, `/produtos/`, `/loja/`. `screenshots/09_produto_retirante_desktop.jpg`, `10_produto_retirante_mobile.jpg`.
3. **Efeito:** insegurança, erros de cadastro, atendimento manual.
4. **Gravidade:** Alta.
5. **Correção:** página de evento com bloco "Inscreva-se" e tipos de inscrição; formulário por participante; termos; resumo e confirmação claros. Detalhes em 04.
6. **Benefício:** inscrições mais completas e menos suporte.

### UX-10 🟠 Contraste insuficiente (WCAG 2.1 AA exige 4,5:1 em texto normal)
| Combinação | Onde | Contraste |
|---|---|---|
| Branco sobre dourado `#B9934E` | Rodapé, faixa do carisma, botões | **2,86:1** ❌ |
| Dourado `#D29320` sobre branco | Links "VER MAIS »", item ativo do menu | **2,65:1** ❌ |
| Dourado `#B9934E` sobre branco | Títulos dos cards | **2,86:1** ❌ |
| Cinza `#7A7A7A` sobre branco | Texto padrão | **4,29:1** ❌ (limite) |
| Vermelho `#ED3237` sobre branco | — | 4,11:1 ❌ (ok só para texto grande) |
| Branco sobre vermelho `#DB1111` | Botão "Adicionar ao carrinho" | 5,12:1 ✅ |

Correção: escurecer o dourado para texto (ex.: tons ≈ `#8A6A2F` ou mais escuros) e usar o dourado claro só como acento/decoração; validar cada par.

### UX-11 🟠 Navegação principal
1. **Problema:** menu com só 5 itens, 3 deles de e-commerce (Loja, Carrinho, Login); itens essenciais ausentes (Comunidade, Agenda, Acampamentos, Grupos, Galerias, Casa Terapêutica); botão WhatsApp sem texto (só ícone); "LOJA" leva a `/produtos/` enquanto existe `/loja/`.
2. **Efeito:** o site parece uma loja, não uma comunidade católica.
3. **Gravidade:** Alta.
4. **Correção:** arquitetura proposta em 08; e-commerce em área secundária (ícone de carrinho/conta).

### UX-12 🟡 Contato incompleto
Sem formulário, sem e-mail, endereço parcial, telefone único (da Casa Terapêutica), sem horários; coluna direita vazia (sidebar sem conteúdo); mapa por busca textual. `screenshots/04_contato_desktop.jpg`. Correção: contatos por setor, endereço completo, horários da secretaria, mapa com ponto exato, links para redes.

### UX-13 🟡 Acessibilidade estrutural
- Home sem `<h1>`; títulos de seção em `<h2>`/`<h3>` sem hierarquia lógica.
- 16 de 20 imagens da home sem `alt`; todas as fotos das galerias com `alt=""`; logotipos dos grupos sem texto alternativo (o nome do grupo só existe dentro da imagem).
- Botão de WhatsApp do header sem nome acessível.
- Campos do formulário com `*` visual mas sem `required`/`aria-required`.
- Menu mobile com alvos de toque pequenos (UX-01).
- ✅ Pontos positivos: `lang="pt-BR"`, meta viewport correta, link "Ir para o conteúdo".

### UX-14 🟡 Idioma e texto
"Select options" (inglês) nos cards; "Open in Maps"; títulos com e sem "º" ("25º Acampamento Sênior" × "23 Acampamento Senior"); "Senior" sem acento; "Festa Julina" × "Festa Junina"; "Arraia" × "Arraiá"; "Camarin" × "Camarim" no slug; "complera", "SERVICO" na landing; "Provinencia" em nome de arquivo; título "Teatro Vivo 2025" × resumo "Teatro Vivo 2026".

### UX-15 🟡 Páginas duplicadas/obsoletas e SEO técnico
- Duplicadas: `/loja/` × `/produtos/`; `/festival-divina-brasa/` × `/festival-divina-brasa-3/`.
- Obsoletas: `/festajunina/` (2023), Divina Brasa (mar/2026); categoria "NOTICIA" vazia; `/comunidade/` vazia.
- `<title>` de `/finalizar-compra/` = "Carrinho"; meta description de carrinho/checkout congelada com um pedido antigo.
- Posts recentes sem meta description; títulos de página repetem o nome do site duas vezes na home.
- Sem dados estruturados de organização/evento (Yoast gera o básico).

### UX-16 🟡 Segurança/higiene
- `/wp-json/wp/v2/users` e `/author/startdesign/` expõem o **nome de usuário** do administrador/autor (facilita ataques de força bruta). Restringir o endpoint de usuários e o arquivo de autor; não exibir "Autor do post".
- Plugins com funções sobrepostas (PPOM + WCPA; Happy Addons + Pro) aumentam a superfície de ataque.

### UX-17 ⚪ Tipografia
Mistura Roboto (corpo/menu), **Times New Roman** (títulos de seção "LOJA", "GALERIAS", carisma), Roboto Slab (secundária, pouco usada) e o itálico serifado do logotipo. Sem escala tipográfica definida. Ver 07.

### UX-18 ⚪ Metadados irrelevantes
Posts exibem "Autor do post: startdesign", "Categoria do post: GALERIA" e "Você também pode gostar" aleatório — ruído que não ajuda o visitante.

---

## Pontos positivos a preservar
- Paleta **vermelho + dourado** do logotipo, reconhecível e com bom potencial litúrgico/sóbrio.
- Acervo fotográfico grande e de boa qualidade técnica.
- WhatsApp por setor (Evangelização × Casa Terapêutica) — bom conceito.
- Inscrição com pagamento online já funcionando (Mercado Pago).
- Landing do Divina Brasa: estrutura de evento clara (data, local, valores, faixas etárias, finalidade da renda, patrocinadores, CTA).
- Domínio próprio, HTTPS, Cloudflare, sitemap Yoast.

## Capturas de tela

| Arquivo | Conteúdo |
|---|---|
| `01_home_desktop.jpg` | Home completa, desktop |
| `02_home_mobile.jpg` | Home completa, 390 px (headless) |
| `03_comunidade_desktop.jpg` | Página "A Comunidade" vazia |
| `04_contato_desktop.jpg` | Contato |
| `05_galerias_desktop.jpg` | Índice de galerias |
| `06_galeria_individual_25senior_desktop.jpg` | Galeria individual |
| `07_galeria_individual_mobile.jpg` | Galeria individual, mobile |
| `08_loja_desktop.jpg` | `/loja/` |
| `09_produto_retirante_desktop.jpg` | Produto de inscrição |
| `10_produto_retirante_mobile.jpg` | Produto de inscrição, mobile |
| `11_carrinho_vazio_desktop.jpg` | Carrinho vazio |
| `12_minha_conta_login_desktop.jpg` | Login |
| `13_festival_divina_brasa_landing_desktop.jpg` | Landing Divina Brasa |
| `14_festival_divina_brasa_3_desktop.jpg` | Landing duplicada |
| `15_festajunina_desktop.jpg` | Landing Festa Junina 2023 |
| `16_post_festa_nacoes_2022_desktop.jpg` | Estrutura de post de galeria |
| `17_category_galeria_desktop.jpg` | Arquivo de categoria |
| `18_lost_password_desktop.jpg` | Recuperação de senha |
| `19_home_mobile_viewport.jpg` | Primeira dobra mobile (headless) |
| `20_mobile_menu_aberto_quebrado.jpg` | **Menu mobile quebrado** (navegador integrado, 375 px) |
| `21_mobile_home_primeira_dobra.jpg` | Primeira dobra mobile (navegador integrado) |
| `30_instagram_calendario_oficial_2027.jpg` | Calendário oficial 2027 (Instagram) |
