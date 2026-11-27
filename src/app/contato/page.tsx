import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink, Lede, PageHeader, Section, SectionTitle } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { ContactForm } from "@/components/ContactForm";
import { address, contacts, formatPhone, mapsEmbed, mapsLink, social, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Endereço, mapa, WhatsApp das secretarias e redes sociais da Comunidade Divina Providência, em Rondonópolis (MT).",
  alternates: { canonical: "/contato" },
};

export default function Page() {
  const sectors = contacts.filter((c) => c.whatsapp).map((c) => ({ id: c.id, label: c.label, whatsapp: c.whatsapp! }));
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contato" }]}
        lead="Fale"
        accent="com a gente."
        intro="Cada secretaria cuida de um assunto. Escolha a certa e a sua mensagem chega mais rápido."
      />

      <Section tone="sand" className="!pt-14" labelledBy="secretarias">
        <h2 id="secretarias" className="sr-only">Secretarias</h2>
        <ul className="grid gap-5 md:grid-cols-3" data-reveal-stagger="">
          {contacts.map((c) => (
            <li key={c.id} className="flex flex-col rounded-[var(--radius-xl)] bg-paper p-7">
              <h3 className="font-display text-[1.6rem] leading-tight">{c.label}</h3>
              <p className="mt-2 text-ink-soft">{c.description}</p>
              <ul className="mt-6 space-y-1">
                {c.whatsapp && (
                  <li>
                    <a href={whatsappLink(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-2 font-medium tabular">
                      <BrandIcon name="whatsapp" width={18} height={18} className="text-gold-deep" /> {formatPhone(c.whatsapp)}
                      <span className="sr-only"> no WhatsApp (abre em nova aba)</span>
                    </a>
                  </li>
                )}
                {c.phone && (
                  <li>
                    <a href={`tel:+55${c.phone}`} className="link-draw inline-flex min-h-11 items-center gap-2 font-medium tabular">
                      <Phone size={18} className="text-gold-deep" aria-hidden="true" /> {formatPhone(c.phone)}
                    </a>
                  </li>
                )}
                {c.email && (
                  <li>
                    <a href={`mailto:${c.email}`} className="link-draw inline-flex min-h-11 items-center gap-2 break-all font-medium">
                      <Mail size={18} className="shrink-0 text-gold-deep" aria-hidden="true" /> {c.email}
                    </a>
                  </li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="mensagem">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionTitle id="mensagem" lead="Envie" accent="uma mensagem." />
            <Lede className="mt-6">
              Escreva aqui e continue no WhatsApp: a mensagem já vai pronta para a secretaria que você escolher.
            </Lede>
          </div>
          <ContactForm sectors={sectors} />
        </div>
      </Section>

      <Section tone="sand" labelledBy="endereco">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionTitle id="endereco" lead="Onde" accent="estamos." />
            <address className="mt-6 flex gap-3 not-italic text-[1.1rem]">
              <MapPin size={22} className="mt-1 shrink-0 text-gold-deep" aria-hidden="true" />
              <span>
                {address.street}
                <br />
                {address.district} · {address.city} – {address.state}
                <br />
                CEP {address.postalCode}
              </span>
            </address>
            <ButtonLink href={mapsLink} className="mt-8">Abrir no Google Maps</ButtonLink>
            <ul className="mt-10 space-y-1">
              {social.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw inline-flex min-h-11 items-center gap-3">
                    <BrandIcon name={s.id} className="text-gold-deep" /> {s.label} · {s.handle}
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-ink/10">
            <iframe title="Mapa da sede da Comunidade Divina Providência" src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[24rem] w-full" />
          </div>
        </div>
      </Section>
    </>
  );
}
