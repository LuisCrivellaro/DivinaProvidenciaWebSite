import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="pt-[calc(var(--header-h)+5rem)] pb-28">
      <div className="wrap max-w-3xl">
        <p className="font-display text-[6rem] leading-none text-wine tabular">404</p>
        <h1 className="mt-4 text-[clamp(2.2rem,1.6rem+2.6vw,3.6rem)]">Esta página não existe.</h1>
        <p className="mt-5 max-w-[50ch] text-[1.1rem] text-ink-soft">O endereço pode ter mudado com o novo site. Comece pela página inicial ou veja a agenda.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Página inicial</ButtonLink>
          <ButtonLink href="/agenda" variant="ghost">Agenda</ButtonLink>
        </div>
      </div>
    </section>
  );
}
