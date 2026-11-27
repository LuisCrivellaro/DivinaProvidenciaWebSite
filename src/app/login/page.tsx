import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs, Photo, SectionTitle } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";
import { SocialLogin } from "@/components/SocialLogin";
import { shop } from "@/content/site";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre na sua conta da Comunidade Divina Providência para acompanhar inscrições e pedidos.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div className="pt-[var(--header-h)]">
      <div className="wrap grid gap-10 py-10 md:py-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16 lg:py-10">
        {/* Coluna do formulário */}
        <div className="flex flex-col">
          <Breadcrumbs items={[{ label: "Entrar" }]} />
          <SectionTitle as="h1" lead="Entrar" accent="na sua conta." className="fade-up mt-8 text-[clamp(2.7rem,1.8rem+3.4vw,4.8rem)]" />

          <div className="fade-up mt-9 max-w-[35rem] rounded-[var(--radius-xl)] border border-ink/10 bg-sand p-7 sm:p-10" style={{ ["--d" as string]: "150ms" }}>
            <SocialLogin />
            <LoginForm action={shop.login} redirectTo={shop.account} lostPassword={shop.lostPassword} />
          </div>

          <p className="fade-up mt-7 max-w-[35rem] text-[1.08rem] text-ink-soft" style={{ ["--d" as string]: "250ms" }}>
            Ainda não tem conta?{" "}
            <Link href="/loja" className="link-draw inline-flex items-center gap-1 font-medium text-gold-deep">
              Ver inscrições abertas <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>

        {/* Painel fotográfico */}
        <aside aria-hidden="true" className="relative hidden overflow-hidden rounded-[var(--radius-xl)] bg-night lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:block lg:h-[calc(100svh-var(--header-h)-5rem)] lg:min-h-[34rem]">
          <div className="absolute inset-0">
            <Photo photo="louvor" sizes="(min-width: 1024px) 50vw, 1px" priority className="h-full !bg-night" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(31_26_22/0.1)_0%,rgb(31_26_22/0.35)_50%,rgb(31_26_22/0.9)_100%)]" />
          <div className="on-night relative flex h-full flex-col justify-end p-10 text-on-night xl:p-12">
            <p className="max-w-[18ch] font-display text-[clamp(2.2rem,1.5rem+1.8vw,3.2rem)] leading-[1.05]">
              Tudo da sua inscrição <em className="font-normal italic text-gold-night">em um só lugar.</em>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
