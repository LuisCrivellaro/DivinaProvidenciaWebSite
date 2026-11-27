import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { ShoppingBag, UserRound } from "lucide-react";
import { ButtonLink, Lede, Note, PageHeader, Section, SectionTitle } from "@/components/ui";
import { getStoreProducts } from "@/lib/woocommerce";
import { currency } from "@/lib/dates";
import { shop } from "@/content/site";

export const metadata: Metadata = {
  title: "Loja e inscrições",
  description: "Inscrições em retiros e produtos da Comunidade Divina Providência, com pagamento online no site oficial.",
  alternates: { canonical: "/loja" },
};

async function Products() {
  const res = await getStoreProducts();
  if (!res.ok) {
    return (
      <Note>
        Não conseguimos carregar os produtos agora. Você pode ver a loja diretamente no{" "}
        <a href={shop.store} className="link-draw font-medium text-wine" target="_blank" rel="noopener noreferrer">site oficial</a>.
      </Note>
    );
  }
  if (res.products.length === 0) {
    return <Note>Não há inscrições ou produtos à venda no momento. Acompanhe a agenda para saber quando abrem.</Note>;
  }
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {res.products.map((p) => (
        <li key={p.id} className="grid overflow-hidden rounded-[var(--radius-xl)] border border-ink/10 bg-paper sm:grid-cols-[13rem_1fr]">
          <div className="relative aspect-square bg-linen">
            {p.image && <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 640px) 13rem, 100vw" className="object-cover" />}
          </div>
          <div className="flex flex-col p-6">
            {p.categories[0] && <p className="text-sm font-medium text-wine">{p.categories[0]}</p>}
            <h3 className="mt-1 font-display text-[1.6rem] leading-tight">{p.name}</h3>
            <p className="mt-2 text-[1.4rem] font-semibold tabular">{currency.format(p.price)}</p>
            <p className="mt-3 line-clamp-4 text-[0.95rem] text-ink-soft">{p.shortDescription}</p>
            <div className="mt-auto pt-6">
              {p.purchasable && p.inStock ? (
                <ButtonLink href={p.permalink}>Inscrever-se</ButtonLink>
              ) : (
                <span className="text-ink-soft">Indisponível no momento</span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Loja e inscrições" }]}
        lead="Loja"
        accent="e inscrições."
        intro="As inscrições em retiros e os produtos são vendidos pela loja do site oficial, com pagamento online. Esta página mostra o que está disponível agora."
      >
        <ButtonLink href={shop.cart} variant="ghost" icon={false}>
          <span className="inline-flex items-center gap-2"><ShoppingBag size={18} aria-hidden="true" /> Meu carrinho</span>
        </ButtonLink>
        <ButtonLink href={shop.account} variant="ghost" icon={false}>
          <span className="inline-flex items-center gap-2"><UserRound size={18} aria-hidden="true" /> Minha conta</span>
        </ButtonLink>
      </PageHeader>

      <Section tone="sand" labelledBy="disponiveis" className="!pt-14">
        <SectionTitle id="disponiveis" lead="Disponível agora" className="!text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]" />
        <div className="mt-8">
          <Suspense fallback={<p className="text-ink-soft" aria-live="polite">Carregando produtos…</p>}>
            <Products />
          </Suspense>
        </div>
      </Section>

      <Section labelledBy="como-funciona">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle id="como-funciona" lead="Como" accent="funciona." />
            <Lede className="mt-6">
              Ao clicar em “Inscrever-se”, você vai para a página do produto no site oficial. Lá informa os dados do participante, adiciona ao carrinho e paga online. O seu pedido fica guardado em “Minha conta”.
            </Lede>
          </div>
          <ol className="space-y-6">
            {[
              ["Escolha a inscrição", "Retirante ou servo, por exemplo. Cada tipo tem um valor."],
              ["Preencha os dados do participante", "Nome, celular (WhatsApp) e CPF são obrigatórios."],
              ["Finalize no carrinho", "O pagamento é processado pelo site oficial."],
              ["Acompanhe em Minha conta", "Entre com seu e-mail e senha para ver os pedidos."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-wine font-display text-[1.4rem] text-white tabular" aria-hidden="true">{i + 1}</span>
                <span>
                  <span className="block font-display text-[1.4rem] leading-tight">{t}</span>
                  <span className="mt-1 block text-ink-soft">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <Note className="mt-12">
          Para recuperar a senha da conta, use a página <a href={shop.lostPassword} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-wine">Perdeu sua senha?</a> do site oficial.
        </Note>
      </Section>
    </>
  );
}
