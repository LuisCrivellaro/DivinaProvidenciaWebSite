import type { Metadata } from "next";
import { Note, PageHeader, Section } from "@/components/ui";
import { contacts } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como este site da Comunidade Divina Providência trata dados pessoais e imagens.",
  alternates: { canonical: "/privacidade" },
};

export default function Page() {
  const sec = contacts.find((c) => c.id === "secretaria")!;
  return (
    <>
      <PageHeader crumbs={[{ label: "Privacidade" }]} lead="Privacidade" accent="e uso de imagens." />
      <Section tone="sand" className="!pt-14">
        <div className="max-w-[70ch] space-y-10 text-[1.05rem] leading-relaxed text-ink-soft">
          <Note>Texto provisório, que descreve o funcionamento técnico deste site. A política oficial da comunidade ainda precisa ser aprovada por ela.</Note>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">O que este site coleta</h2>
            <p className="mt-3">Este site não tem cadastro, não grava formulários e não usa cookies de publicidade. Os formulários de contato e de inscrição apenas montam uma mensagem e abrem o WhatsApp da secretaria; nada é enviado até você tocar em enviar no próprio WhatsApp.</p>
          </section>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">Inscrições e compras</h2>
            <p className="mt-3">
              Na ficha de inscrição você informa nome, celular e CPF do participante. Esses dados não ficam neste site: seguem pelo WhatsApp para a Secretaria de Evangelização, que os usa somente para confirmar a vaga e orientar o pagamento. Para corrigir ou apagar uma inscrição, use a página Minhas inscrições.
            </p>
          </section>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">Conteúdo de terceiros</h2>
            <p className="mt-3">As fotos fazem parte do acervo da comunidade e são servidas por este próprio site. Vídeos do YouTube só carregam quando você aperta o play. O mapa usa o Google Maps.</p>
          </section>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">Fotos e direito de imagem</h2>
            <p className="mt-3">As galerias registram os encontros da comunidade, inclusive acampamentos de crianças e adolescentes. Se você, ou alguém por quem você é responsável, aparece em uma foto e quer que ela seja retirada, escreva para {sec.email} com o nome da galeria; a foto é removida.</p>
          </section>
        </div>
      </Section>
    </>
  );
}
