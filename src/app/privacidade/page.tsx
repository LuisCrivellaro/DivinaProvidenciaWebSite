import type { Metadata } from "next";
import { Note, PageHeader, Section } from "@/components/ui";
import { contacts, shop } from "@/content/site";

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
            <p className="mt-3">Este site não tem cadastro, não grava formulários e não usa cookies de publicidade. O formulário de contato apenas monta uma mensagem e abre o WhatsApp; nada é enviado até você tocar em enviar no próprio WhatsApp. Na tela Entrar, o e-mail e a senha vão direto do seu navegador para o site oficial, sem passar por este site.</p>
          </section>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">Inscrições e compras</h2>
            <p className="mt-3">
              Inscrições, carrinho, pagamentos e a sua conta ficam no site oficial da comunidade (<a href={shop.store} className="link-draw text-gold-deep">adivinaprovidencia.com.br</a>), que pede nome, celular e CPF do participante e processa o pagamento. Esses dados seguem as regras daquele site.
            </p>
          </section>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">Conteúdo de terceiros</h2>
            <p className="mt-3">Fotos vêm do acervo oficial da comunidade. Vídeos do YouTube só carregam quando você aperta o play. O mapa usa o Google Maps.</p>
          </section>
          <section>
            <h2 className="font-display text-[1.8rem] text-ink">Fotos de crianças, adolescentes e acolhidos</h2>
            <p className="mt-3">Galerias com crianças e adolescentes, e as da Comunidade Terapêutica, não são republicadas aqui. Se você aparece em alguma foto e quer que ela seja retirada, escreva para {sec.email}.</p>
          </section>
        </div>
      </Section>
    </>
  );
}
