import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { ButtonLink, Lede, Note, PageHeader, Photo, Section, SectionTitle } from "@/components/ui";
import { BrandIcon } from "@/components/BrandIcon";
import { inscricaoHref, inscricoes } from "@/content/inscricoes";
import { events } from "@/content/events";
import { contacts, whatsappLink } from "@/content/site";
import { currency, dateRange } from "@/lib/dates";
import { today } from "@/lib/today";

export const metadata: Metadata = {
  title: "Loja e inscrições",
  description: "Inscrições abertas em retiros e encontros da Comunidade Divina Providência. A ficha é enviada pelo WhatsApp e a secretaria confirma a vaga.",
  alternates: { canonical: "/loja" },
};

export default async function Page() {
  const now = await today();
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;
  const list = inscricoes.map((i) => {
    const ev = events.find((e) => e.slug === i.eventSlug);
    return { ...i, ev, open: ev ? (ev.end ?? ev.start) >= now : true };
  });
  const open = list.filter((i) => i.open);

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Loja e inscrições" }]}
        lead="Loja"
        accent="e inscrições."
        intro="Aqui ficam as inscrições abertas em retiros e encontros. Você preenche a ficha, ela chega pelo WhatsApp à Secretaria de Evangelização e a secretaria confirma a vaga e o pagamento."
      >
        <ButtonLink href="/minhas-inscricoes" variant="ghost" icon={false}>
          <span className="inline-flex items-center gap-2"><ClipboardList size={18} aria-hidden="true" /> Minhas inscrições</span>
        </ButtonLink>
      </PageHeader>

      <Section tone="sand" labelledBy="disponiveis" className="!pt-14">
        <SectionTitle id="disponiveis" lead="Inscrições abertas" className="!text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]" />
        <div className="mt-8">
          {open.length === 0 ? (
            <Note>
              Não há inscrições abertas no momento. Acompanhe a <Link href="/agenda" className="link-draw font-medium text-gold-deep">agenda</Link> para saber quando abrem.
            </Note>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2" data-reveal-stagger="">
              {open.map((i) => (
                <li key={i.slug}>
                  <Link href={inscricaoHref(i.slug)} className="group lift grid h-full overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-paper sm:grid-cols-[13rem_1fr]">
                    <Photo src={i.image.src} alt={i.image.alt} sizes="(min-width: 640px) 13rem, 100vw" className="zoom-frame aspect-square" />
                    <span className="flex flex-col p-6">
                      <span className="text-sm font-medium text-gold-deep">{i.ev?.title}</span>
                      <span className="mt-1 font-display text-[1.6rem] leading-tight">Inscrição de {i.role.toLowerCase()}</span>
                      <span className="mt-2 text-[1.4rem] font-semibold tabular">{currency.format(i.price)}</span>
                      {i.ev && <span className="mt-2 text-[0.95rem] text-ink-soft">{dateRange(i.ev.start, i.ev.end)}</span>}
                      <span className="mt-1 text-[0.95rem] text-ink-soft">{i.roleDescription}</span>
                      <span className="mt-auto pt-6 font-medium text-gold-deep">
                        <span className="link-draw">Preencher a ficha</span> →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section labelledBy="como-funciona">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle id="como-funciona" lead="Como" accent="funciona." />
            <Lede className="mt-6">
              A inscrição é feita por participante. O site não guarda os dados: a ficha vai direto para o WhatsApp da secretaria, que responde com a confirmação e as orientações de pagamento.
            </Lede>
            <ButtonLink href={whatsappLink(evangelizacao.whatsapp!, "Olá! Tenho uma dúvida sobre inscrições.")} variant="ghost" icon={false} className="mt-8">
              <span className="inline-flex items-center gap-2"><BrandIcon name="whatsapp" width={17} height={17} /> Tirar dúvidas com a secretaria</span>
            </ButtonLink>
          </div>
          <ol className="space-y-6">
            {[
              ["Escolha a inscrição", "Retirante ou servo, por exemplo. Cada tipo tem um valor."],
              ["Preencha a ficha", "Nome, celular (WhatsApp) e CPF do participante."],
              ["Envie pelo WhatsApp", "A ficha abre pronta para a Secretaria de Evangelização. É só tocar em enviar."],
              ["Aguarde a confirmação", "A secretaria confirma a vaga e explica como fazer o pagamento."],
            ].map(([t, d], n) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold font-display text-[1.4rem] text-ink tabular" aria-hidden="true">{n + 1}</span>
                <span>
                  <span className="block font-display text-[1.4rem] leading-tight">{t}</span>
                  <span className="mt-1 block text-ink-soft">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
