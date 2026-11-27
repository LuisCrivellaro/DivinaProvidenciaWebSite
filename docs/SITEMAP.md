# Mapa do novo site

> 117 rotas geradas no build (91 páginas no `sitemap.xml`; galerias restritas ficam fora do sitemap e com `noindex`).

```
/                              Início
/comunidade                    Quem somos · missão · Comunidade de Aliança · carisma · história (#historia) · espiritualidade · organização
/agenda                        Calendário mês a mês (#calendario) · grandes eventos (#grandes-eventos, #cerco-de-jerico, #divina-jovem, #festa-das-nacoes, #divina-brasa) · eventos anteriores
/agenda/[slug]                 26 eventos (Retiro Desperta 2026 + calendário oficial 2027), com JSON-LD Event
/acampamentos                  Listagem
/acampamentos/[slug]           mirim · juvenil · fac · senior · casais
/retiros                       Listagem
/retiros/[slug]                desperta · homens-de-fe · mulheres · cinco-linguagens-do-amor
/grupos-de-oracao              4 grupos · quando e onde · mapa
/vida-de-oracao                Adoração perpétua (#adoracao) · Cerco de Jericó (#cerco-de-jerico) · programação confirmada
/obras-e-projetos              Comunidade Terapêutica · Casa da Saúde São Padre Pio · eventos beneficentes · projetos citados na imprensa
/casa-terapeutica              Apresentação · história · o que se sabe publicamente · como apoiar · contato
/galeria                       58 galerias com filtros ?tipo= e ?ano=
/galeria/[slug]                Grade + lightbox (?foto=N); 16 galerias restritas (2.256 fotos) mostram aviso + link para o site oficial
/videos                        Vídeos do canal oficial por tema
/loja                          Produtos vivos da Store API do WooCommerce + links para carrinho/conta oficiais
/contato                       Secretarias · formulário → WhatsApp · endereço · mapa · redes
/privacidade                   Texto provisório sobre dados e imagens
/sitemap.xml  /robots.txt  /icon.png  /apple-icon.png
```

**Menu principal (desktop):** Participe ▾ (Acampamentos, Retiros e formação, Grupos de oração, Vida de oração) · Comunidade · Agenda · Obras · Galeria · Contato · ícones Loja e Minha conta · botão "Fale conosco" (WhatsApp da Evangelização).
**Menu mobile:** tela cheia com 12 itens + WhatsApp + Minha conta + redes.
**Rodapé:** A comunidade · Participe · Acervo e serviços · Fale com a gente · endereço · redes.

## Redirecionamentos sugeridos (site atual → novo)
| Atual | Novo |
|---|---|
| `/comunidade/` | `/comunidade` |
| `/contato/` | `/contato` |
| `/galerias/`, `/category/galeria/` | `/galeria` |
| `/category/acampamento/` | `/galeria?tipo=acampamentos` |
| `/category/cerco-jerico/` | `/galeria?tipo=oracao` |
| `/category/divina-jovem/` | `/galeria?tipo=divina-jovem` |
| `/{slug-da-galeria}/` (58) | `/galeria/{slug}` (mesmos slugs) |
| `/produtos/`, `/loja/` | `/loja` (enquanto o WooCommerce estiver no domínio, manter `/produto/*`, `/carrinho/`, `/finalizar-compra/`, `/minha-conta/` no WordPress) |
| `/festival-divina-brasa/`, `/festival-divina-brasa-3/` | `/agenda#divina-brasa` |
| `/festajunina/` | `/agenda` |
