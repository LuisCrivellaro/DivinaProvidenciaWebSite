import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, Photo, SectionTitle } from "@/components/ui";
import { ConsultaInscricaoForm } from "@/components/ConsultaInscricaoForm";
import { inscricoes } from "@/content/inscricoes";
import { events } from "@/content/events";
import { contacts, formatPhone } from "@/content/site";

export const metadata: Metadata = {
  title: "Minhas inscrições",
  description: "Confirme, pague, corrija ou cancele uma inscrição em retiros e encontros da Comunidade Divina Providência.",
  alternates: { canonical: "/minhas-inscricoes" },
};

export default function Page() {
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  const encontros = [...new Set(inscricoes.map((i) => events.find((e) => e.slug === i.eventSlug)?.title).filter(Boolean) as string[])];

  return (
    <div className="pt-[var(--header-h)]">
      <div className="wrap grid gap-10 py-10 md:py-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16 lg:py-10">
        <div className="flex flex-col">
          <Breadcrumbs items={[{ label: "Loja e inscrições", href: "/loja" }, { label: "Minhas inscrições" }]} />
          <SectionTitle as="h1" lead="Minhas" accent="inscrições." className="fade-up mt-8 text-[clamp(2.7rem,1.8rem+3.4vw,4.8rem)]" />
          <p className="fade-up mt-6 max-w-[48ch] text-[1.1rem] leading-relaxed text-ink-soft" style={{ ["--d" as string]: "100ms" }}>
            As inscrições ficam com a Secretaria de Evangelização, que acompanha cada ficha. Para confirmar, pagar, corrigir ou cancelar, mande uma mensagem por aqui. Não é preciso criar conta nem senha.
          </p>

          <div className="fade-up mt-9 max-w-[38rem] rounded-[var(--radius-xl)] border border-ink/10 bg-sand p-7 sm:p-10" style={{ ["--d" as string]: "150ms" }}>
            <ConsultaInscricaoForm encontros={encontros} whatsapp={evangelizacao.whatsapp!} />
          </div>

          <p className="fade-up mt-7 max-w-[38rem] text-[1.02rem] text-ink-soft" style={{ ["--d" as string]: "250ms" }}>
            Ainda não se inscreveu?{" "}
            <Link href="/loja" className="link-draw inline-flex items-center gap-1 font-medium text-gold-deep">
              Ver inscrições abertas <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <br />
            Secretaria de Evangelização: {formatPhone(evangelizacao.whatsapp!)} (WhatsApp).
          </p>
        </div>

        <aside aria-hidden="true" className="keep-dark relative hidden overflow-hidden rounded-[var(--radius-xl)] bg-night lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:block lg:h-[calc(100svh-var(--header-h)-5rem)] lg:min-h-[34rem]">
          <div className="absolute inset-0">
            <Photo photo="louvor" sizes="(min-width: 1024px) 50vw, 1px" priority className="h-full !bg-night" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(31_26_22/0.1)_0%,rgb(31_26_22/0.35)_50%,rgb(31_26_22/0.9)_100%)]" />
          <div className="on-night relative flex h-full flex-col justify-end p-10 text-on-night xl:p-12">
            <p className="max-w-[18ch] font-display text-[clamp(2.2rem,1.5rem+1.8vw,3.2rem)] leading-[1.05]">
              Cada ficha, <em className="font-normal italic text-gold-night">acompanhada de perto.</em>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
