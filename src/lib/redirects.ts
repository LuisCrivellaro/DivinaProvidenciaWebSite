/**
 * Redirecionamentos permanentes (301/308) dos endereços do WordPress antigo para as páginas novas.
 * Valem quando o domínio adivinaprovidencia.com.br passar a apontar para este site:
 * links antigos, favoritos e resultados de busca continuam funcionando.
 * Sempre do endereço antigo para o novo — nunca do novo para o antigo.
 * Mapa completo e justificativas: docs/MIGRACAO_DOMINIO.md.
 *
 * Importado pelo next.config.ts: use só caminhos relativos (sem o alias "@/").
 */
import galleries from "../content/galleries.json";

type Redirect = { source: string; destination: string; permanent: true };
const r = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

/** Os 58 posts de galeria do WordPress tinham o endereço /{slug}/; aqui viram /galeria/{slug}. */
const galleryPosts = (galleries as { slug: string }[]).map((g) => r(`/${g.slug}`, `/galeria/${g.slug}`));

export const redirects: Redirect[] = [
  // Páginas
  r("/galerias", "/galeria"),
  // /festival-divina-brasa continua sendo o endereço do festival (agora página própria); as cópias numeradas vêm para ela.
  // Atenção: /divina-brasa era um POST de galeria no WordPress e por isso vai para /galeria/divina-brasa.
  r("/festival-divina-brasa-:n(\\d+)", "/festival-divina-brasa"),
  r("/festajunina", "/agenda#grandes-eventos"),

  // Loja (WooCommerce) → inscrições do novo site
  r("/produtos", "/loja"),
  r("/produto/:slug", "/inscricoes/:slug"),
  r("/categoria-produto/:slug*", "/loja"),
  r("/carrinho", "/loja"),
  r("/finalizar-compra/:path*", "/loja"),
  r("/minha-conta/:path*", "/minhas-inscricoes"),
  r("/login", "/minhas-inscricoes"),
  r("/wp-login.php", "/minhas-inscricoes"),

  // Categorias e autor do blog
  r("/category/galeria", "/galeria"),
  r("/category/acampamento", "/galeria?tipo=acampamentos"),
  r("/category/cerco-jerico", "/galeria?tipo=oracao"),
  r("/category/divina-jovem", "/galeria?tipo=divina-jovem"),
  r("/category/:slug*", "/galeria"),
  r("/author/:slug*", "/"),
  r("/feed", "/"),

  // Imagens antigas (links externos, buscadores): mesmo arquivo, agora em WebP no acervo migrado
  r("/wp-content/uploads/:y(\\d{4})/:m(\\d{2})/:name([^/]+)\\.:ext(jpe?g|JPE?G|png|PNG|gif|webp)", "/media/:y/:m/:name.webp"),

  // Galerias
  ...galleryPosts,
];
