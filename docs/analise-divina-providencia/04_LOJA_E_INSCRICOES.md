# 04 — Loja, inscrições, carrinho, login e checkout

> **Data da consulta:** 26/11/2026.
> **Limites respeitados:** nenhum produto foi adicionado ao carrinho, nenhum formulário foi enviado, nenhum login foi tentado, nenhum dado pessoal foi digitado. Por isso **as telas de checkout com itens, os campos de cobrança e as mensagens de confirmação NÃO foram observados** — o que segue sobre elas vem de evidências técnicas (scripts e plugins carregados) e está marcado como tal.

---

## 1. Tecnologia (evidências no HTML)

| Componente | Versão | Evidência |
|---|---|---|
| WordPress | 7.1.5 | `<meta name="generator">`, `/wp-json/` |
| **WooCommerce** | 11.0.1 | `<meta name="generator">`, classes `woocommerce-*`, Store API `/wp-json/wc/store/v1/` |
| **PPOM – Product Addons & Custom Fields** (`woocommerce-product-addon`) | 34.0.8 | campos `ppom[fields][...]` no formulário do produto |
| **WCPA – Woo Custom Product Addons** (`woo-custom-product-addons`) | 3.1.7 | CSS carregado (segundo plugin de campos — redundante) |
| **Mercado Pago for WooCommerce** (`woocommerce-mercadopago`) | 8.9.3 | Scripts `woo-mercado-pago-custom`, `woo-mercado-pago-pix`, `woo-mercado-pago-wallet-button`; `site_id: MLB`, `currency: BRL` — carregados em `/carrinho/` |
| Facebook for WooCommerce | — | Meta Pixel (2 IDs) com eventos de e-commerce |
| WooCommerce Google Analytics Integration | — | GA |
| OceanWP (tema) | — | quick view, mini-carrinho lateral |
| Elementor + Elementor Pro + Happy Addons (+Pro) | 4.2.4 | construtor das páginas |

## 2. Catálogo atual

| Produto | ID | Preço | Tipo | Estoque | Visível na loja? | URL |
|---|---|---|---|---|---|---|
| Retiro Desperta 2026 / **Retirante** | 17685 | **R$ 120,00** | simples | em estoque, sem limite exibido | ✅ sim | `/produto/retiro-desperta26-retirante/` |
| Retiro Desperta 2026 / **Servo** | 17689 | **R$ 100,00** | simples | em estoque | ❌ não aparece nas grades de `/loja/` e `/produtos/` (provável visibilidade "oculta"); aparece em "Produtos relacionados" e na Store API | `/produto/retiro-desperta-2026-servo/` |

- **Categorias:** só **Retiro** (id 58).
- **Variações (tamanhos etc.):** nenhuma no catálogo atual.
- **Camisetas:** ❓ nenhuma à venda hoje. **Evidência histórica** (meta description do Yoast que "congelou" um carrinho antigo nas páginas `/carrinho/` e `/finalizar-compra/`): "**Estacionamento VIP 20/04 — R$ 100,00**" e "**Camiseta Branca Divina Jovem – P — R$ 75,00**". Ou seja: a loja **já vendeu camisetas com tamanho (variação "P") e estacionamento VIP de evento**. O novo projeto precisa prever produtos variáveis (tamanho) e "produtos de serviço" (estacionamento, ingresso).
- **Ingressos de eventos grandes:** **fora do site** — Divina Brasa via TotalIngressos; Festa Junina 2023 via WhatsApp.

## 3. Fluxo de inscrição (como funciona hoje)

```
Home / Loja / Produtos
   └─► Página do produto (ex.: Desperta – Retirante)
         • Descrição: pré-requisitos (FAC 17+, Juvenil, Sênior até 30 anos), data, realização
         • Campos obrigatórios (PPOM):  Nome Participante* · Celular* (placeholder "Whatsapp") · CPF*
         • Resumo de preço (Preço produto × qtd / Total)
         • Quantidade (− 1 +)
         • [ADICIONAR AO CARRINHO]
   └─► Carrinho (/carrinho/)  — itens com os dados do participante como metadados do item
   └─► Finalizar compra (/finalizar-compra/)  — NÃO OBSERVADO (exigiria adicionar item)
         • Esperado (padrão WooCommerce): dados de cobrança do comprador, opção de criar conta,
           escolha de pagamento Mercado Pago (cartão transparente / Pix / conta Mercado Pago*)
   └─► Pagamento Mercado Pago → pedido criado no WooCommerce
   └─► E-mail de pedido do WooCommerce  — NÃO OBSERVADO
```
\* inferido pelos scripts carregados; **as formas realmente habilitadas precisam ser confirmadas no painel** (P20).

### 3.1 Campos solicitados (observados)

| Campo | `name` técnico | Tipo HTML | Obrigatório | Observações |
|---|---|---|---|---|
| Nome Participante | `ppom[fields][nome_participante]` | text | sim (validação no servidor; o HTML não tem `required`) | — |
| Celular | `ppom[fields][celular]` | text | sim | placeholder "Whatsapp"; sem máscara; sem `type="tel"`/`inputmode` → teclado alfabético no celular |
| CPF | `ppom[fields][cpf]` | text | sim | sem máscara nem validação de dígito no cliente |
| Quantidade | `quantity` | number | — | permite >1, mas **só há um conjunto de dados de participante** → inscrever 2 pessoas num item gera dados incompletos |

### 3.2 O que **não existe** no fluxo atual
- Termo de participação / regulamento do retiro.
- Consentimento LGPD (o CPF é dado pessoal; não há aviso de finalidade nem política de privacidade no site).
- Autorização de uso de imagem (relevante porque eventos são fotografados e publicados).
- Campos de saúde/alergias/contato de emergência (relevante para acampamentos; ❓ talvez coletados fora do site).
- Para menores: dados e autorização do responsável.
- Verificação do pré-requisito ("já fez FAC/Juvenil/Sênior") — é só texto.
- Limite de vagas visível / estoque.
- Confirmação pós-pagamento com instruções do retiro (não observado; pode existir por e-mail).

### 3.3 Retirantes × Servos
O mesmo evento tem **dois produtos** com preços diferentes (Retirante R$ 120 / Servo R$ 100). É a forma encontrada para diferenciar categorias de participação. No novo site isso deve virar **um evento com "tipos de inscrição"** (retirante, servo, eventualmente equipe, casal etc.).

## 4. Carrinho
- Página Elementor com o widget de carrinho do WooCommerce + grade "ADICIONAR PRODUTOS AO CARRINHO".
- Estado vazio: "Seu carrinho está vazio. / Retornar para a loja".
- Mini-carrinho lateral (OceanWP) em todas as páginas.
- Mercado Pago carrega seus scripts já no carrinho.

## 5. Checkout (`/finalizar-compra/`)
- Com carrinho vazio redireciona (302) para `/carrinho/`. Conteúdo com itens **não observado**.
- O `<title>` da página é "Carrinho" (erro de configuração/SEO).
- Pagamento: **Mercado Pago** (evidências: cartão "custom"/transparente, Pix, botão de carteira). A landing do Divina Brasa mostra ícones de dinheiro, Pix, Visa, Master, Elo, Diners, Amex — mas essa venda era na TotalIngressos, não no WooCommerce.

## 6. Conta do usuário (`/minha-conta/`)
- Login com "Nome de usuário ou e-mail" + "Senha", "Lembre-me", "Perdeu sua senha?" (`/minha-conta/lost-password/`).
- **Sem cadastro avulso** na página — contas provavelmente são criadas no checkout (❓ confirmar se é obrigatório criar conta para se inscrever).
- Área logada (pedidos, downloads, endereços, detalhes da conta — padrão WooCommerce) **não acessada**.
- O que o participante vê depois de inscrito: ❓ provavelmente apenas o pedido com os metadados (nome/celular/CPF).

## 7. Dependências de backend que NÃO podem ser perdidas

| Funcionalidade | Depende de | Risco no redesign |
|---|---|---|
| Venda de inscrições com dados do participante | WooCommerce + PPOM | Alto — se o front for reescrito fora do WordPress, os campos e metadados precisam ser recriados |
| Pagamento online (cartão/Pix) | Mercado Pago (credenciais da comunidade) | Alto — exige conta Mercado Pago da comunidade; não migrar sem o responsável financeiro |
| Pedidos históricos e contas de clientes | Banco WooCommerce | Alto — manter ou migrar com cuidado (dados pessoais com CPF) |
| E-mails transacionais | WooCommerce / servidor de e-mail | Médio |
| Relatórios de inscritos por evento | Painel WooCommerce (pedidos filtrados por produto) — ❓ confirmar como a secretaria exporta as listas | Alto para a operação dos retiros |
| Pixel/GA de conversão | Facebook for WooCommerce, GA | Baixo/Médio |

## 8. Problemas do fluxo atual (resumo — detalhes em 06)
1. Inscrição tratada como "produto" com linguagem de loja em inglês ("Select options", "Visualização rápida").
2. Quantidade >1 com dados de um único participante.
3. Coleta de CPF sem aviso/consentimento LGPD e sem política de privacidade.
4. Campos sem máscara/validação/teclado adequado no celular.
5. Produto "Servo" invisível na loja — servos dependem de link direto.
6. Dois caminhos de loja (`/produtos/` e `/loja/`).
7. Nenhuma informação prática do retiro (local, horário de chegada, o que levar, política de cancelamento/reembolso).
8. Eventos grandes vendidos fora (TotalIngressos, WhatsApp) — experiência fragmentada.

## 9. Recomendações (para a próxima fase, não implementadas)
- Manter **WooCommerce + Mercado Pago** como motor de pagamentos (é o que já funciona e tem histórico), mesmo que o front seja redesenhado — ou planejar migração só com a comunidade e o responsável financeiro.
- Modelar **Evento → Tipos de inscrição** (retirante, servo…), com campos por participante (repetir os campos conforme a quantidade, ou forçar quantidade 1).
- Acrescentar: aceite do regulamento, consentimento LGPD com finalidade, autorização de imagem (opcional e separada), dados do responsável para menores, contato de emergência.
- Máscaras de CPF/celular, `inputmode="numeric"`/`type="tel"`, validação de CPF.
- Página de confirmação e e-mail com instruções do evento.
- Unificar `/loja/` e `/produtos/`; separar visualmente **Inscrições** (eventos) de **Loja** (camisetas e produtos).
