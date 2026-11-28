# Mapa do novo site

> Atualizado em 28/11/2026: 111 páginas no `sitemap.xml` (todas as galerias são públicas).

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
/galeria/[slug]                Grade + lightbox (?foto=N); as 58 galerias são públicas
/videos                        Vídeos do canal oficial por tema
/loja                          Inscrições abertas (content/inscricoes.ts)
/inscricoes/[slug]             Ficha de inscrição → WhatsApp da secretaria (2: Desperta retirante e servo)
/minhas-inscricoes             Confirmar, pagar, corrigir ou cancelar inscrição
/festival-divina-brasa         Festival Divina Brasa (migrado da landing antiga)
/contato                       Secretarias · formulário → WhatsApp · endereço · mapa · redes
/privacidade                   Texto provisório sobre dados e imagens
/sitemap.xml  /robots.txt  /icon.png  /apple-icon.png
```

**Menu principal (desktop):** Participe ▾ (Acampamentos, Retiros e formação, Grupos de oração, Vida de oração) · Comunidade · Agenda · Obras · Galeria · Contato · ícones Loja e Minhas inscrições (→ `/minhas-inscricoes`) · botão "Fale conosco" (WhatsApp da Evangelização).
**Menu mobile:** tela cheia com 12 itens + WhatsApp + Minha conta + redes.
**Rodapé:** A comunidade · Participe · Acervo e serviços · Fale com a gente · endereço · redes.

## Redirecionamentos
Implementados em `src/lib/redirects.ts`. Tabela completa em `docs/MIGRACAO_DOMINIO.md` §6.
