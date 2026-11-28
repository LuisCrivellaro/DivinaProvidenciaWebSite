# Integrações

> Atualizado em 28/11/2026. O site não depende mais do WordPress/WooCommerce antigo (ver `MIGRACAO_DOMINIO.md`).

| Integração | Estado | Como funciona | Pendente |
|---|---|---|---|
| **Inscrições** | ✅ Próprias | `content/inscricoes.ts` (migrado dos produtos do WooCommerce: nome, valor, pré-requisitos). `/inscricoes/[slug]` tem a ficha (`InscricaoForm`): nome, celular, CPF com validação de dígitos e consentimento; abre o WhatsApp da Secretaria de Evangelização com a ficha pronta. Nada é guardado. Encerra sozinha quando o evento passa. | Pagamento online: escolher provedor e criar conta (exige autorização) |
| Acompanhamento de inscrição | ✅ | `/minhas-inscricoes` (`ConsultaInscricaoForm`): confirmar, pagar, corrigir ou cancelar via WhatsApp da secretaria | — |
| Loja | ✅ Local | `/loja` lista as inscrições abertas de `content/inscricoes.ts` | Produtos (camisetas etc.) entram no mesmo arquivo se a comunidade quiser |
| Login / conta / carrinho do WooCommerce | ⛔ Removidos | Dependiam do WordPress. URLs antigas redirecionam para `/minhas-inscricoes` e `/loja` | Exportar pedidos/clientes antes de desligar o WordPress |
| Contato | ✅ Sem servidor | `ContactForm` abre `wa.me/<secretaria>` com a mensagem | Formulário por e-mail exigiria serviço (Resend, Formspree) |
| WhatsApp por setor | ✅ | Evangelização +55 66 99908-2128 · Casa Terapêutica +55 66 99665-5565 · Patrocínio do Divina Brasa +55 66 99955-9814 | — |
| Fotos | ✅ Acervo próprio | `public/media` (7.107 WebP) via `mediaUrl()`; `NEXT_PUBLIC_MEDIA_BASE_URL` aponta para um storage, se usado | Publicar o acervo junto com o deploy ou num storage |
| Festival Divina Brasa | ✅ | `/festival-divina-brasa`; ingressos da edição 2026 eram vendidos pela Total Ingressos (link só aparece antes da data) | Dados da edição 2027 quando divulgados |
| YouTube | ✅ | Fachada com miniatura `i.ytimg.com`; player `youtube-nocookie.com` só após o clique | Automatizar a lista pelo RSS do canal |
| Google Maps | ✅ | `iframe` com `loading="lazy"` em Contato e Grupos | Coordenadas exatas da sede |
| Agenda / galerias | ✅ Estáticas | `content/events.ts`, `content/galleries.json` | CMS a definir |
| Analytics / pixels | ⛔ Desligados de propósito | — | Só com banner de consentimento |
| Deploy | ⏳ | `npm run build && npm start` (Node 20+) com `public/media`, ou Vercel + storage | **Nada publicado.** Requer autorização |
