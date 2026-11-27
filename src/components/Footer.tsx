import Image from "next/image";
import Link from "next/link";
import { BrandIcon } from "./BrandIcon";
import { address, contacts, formatPhone, mapsLink, shop, site, social, whatsappLink } from "@/content/site";

const groups = [
  {
    title: "A comunidade",
    links: [
      { href: "/comunidade", label: "Quem somos" },
      { href: "/comunidade#historia", label: "Nossa história" },
      { href: "/comunidade#carisma", label: "Carisma" },
      { href: "/obras-e-projetos", label: "Obras e projetos" },
      { href: "/casa-terapeutica", label: "Casa Terapêutica" },
    ],
  },
  {
    title: "Participe",
    links: [
      { href: "/agenda", label: "Agenda" },
      { href: "/acampamentos", label: "Acampamentos" },
      { href: "/retiros", label: "Retiros e formação" },
      { href: "/grupos-de-oracao", label: "Grupos de oração" },
      { href: "/vida-de-oracao", label: "Vida de oração" },
    ],
  },
  {
    title: "Acervo e serviços",
    links: [
      { href: "/galeria", label: "Galeria de fotos" },
      { href: "/videos", label: "Vídeos" },
      { href: "/loja", label: "Loja e inscrições" },
      { href: shop.account, label: "Minha conta", external: true },
      { href: "/privacidade", label: "Privacidade" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-night bg-wine text-on-night">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <span className="inline-block rounded-[var(--radius-lg)] bg-paper px-5 py-3">
            <Image src="/brand/logo-oficial.webp" alt="Comunidade Divina Providência" width={2000} height={667} className="h-16 w-auto" />
          </span>
          <p className="mt-6 max-w-sm font-display text-[1.5rem] italic leading-snug text-gold-night">{site.motto}</p>
          <p className="mt-6 max-w-sm text-on-night-soft">
            Comunidade de Aliança da {site.diocese}.
          </p>
          <address className="mt-6 not-italic text-on-night-soft">
            {address.street} · {address.district}
            <br />
            {address.city} – {address.state}, {address.postalCode}
            <br />
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="link-draw mt-1 inline-flex min-h-11 items-center text-gold-night">
              Como chegar
              <span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </a>
          </address>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <h2 className="font-sans text-sm font-semibold text-gold-night">{g.title}</h2>
              <ul className="mt-4 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-10 items-center text-on-night-soft hover:text-on-night">
                        {l.label}
                        <span className="sr-only"> (site oficial, abre em nova aba)</span>
                      </a>
                    ) : (
                      <Link href={l.href} className="link-draw inline-flex min-h-10 items-center text-on-night-soft hover:text-on-night">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="font-sans text-sm font-semibold text-gold-night">Fale com a gente</h2>
            <ul className="mt-4 space-y-4 text-on-night-soft">
              {contacts.map((c) => (
                <li key={c.id}>
                  <span className="block text-on-night">{c.label}</span>
                  {c.whatsapp && (
                    <a href={whatsappLink(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-10 items-center gap-2 tabular">
                      <BrandIcon name="whatsapp" width={15} height={15} /> {formatPhone(c.whatsapp)}
                      <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
                    </a>
                  )}
                  {c.phone && !c.whatsapp && (
                    <a href={`tel:+55${c.phone}`} className="link-draw inline-flex min-h-10 items-center tabular">
                      {formatPhone(c.phone)}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex gap-2">
              {social.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 transition-colors hover:border-gold-light hover:bg-white/10 hover:text-gold-light"
                  >
                    <BrandIcon name={s.id} width={18} height={18} />
                    <span className="sr-only">{s.label} (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/35">
        <div className="wrap flex flex-col gap-2 py-6 text-sm text-on-night-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {site.legalName} · {site.city}/{site.state}
          </p>
          <p>Fotografias do acervo oficial da comunidade.</p>
        </div>
      </div>
    </footer>
  );
}
