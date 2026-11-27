import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { photos, UPLOADS, type PhotoKey } from "@/content/site";

/* ------------------------------------------------------------------ */
/* Botões (estrutura de Uiverse adaptada; estilos em globals.css .btn) */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "ghost" | "light" | "ghost-light";
const variantClass: Record<ButtonVariant, string> = {
  primary: "btn",
  ghost: "btn btn-ghost",
  light: "btn btn-light",
  "ghost-light": "btn btn-ghost-light",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  icon = true,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href">) {
  const isExternal = external ?? /^https?:/.test(href);
  const Icon = isExternal ? ArrowUpRight : ArrowRight;
  const cls = `${variantClass[variant]} ${icon ? "" : "btn-plain"} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="btn-icon" aria-hidden="true">
          <Icon size={18} strokeWidth={2} />
        </span>
      )}
      {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

/** Link de texto com seta, para ações secundárias. */
export function TextLink({ href, children, className = "", tone = "gold" }: { href: string; children: ReactNode; className?: string; tone?: "gold" | "light" | "ink" }) {
  const isExternal = /^https?:/.test(href);
  const color = tone === "light" ? "text-gold-night" : tone === "ink" ? "text-ink" : "text-gold-deep";
  const cls = `group inline-flex items-center gap-1.5 font-medium ${color} min-h-11 ${className}`;
  const body = (
    <>
      <span className="link-draw">{children}</span>
      <ChevronRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </>
  );
  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Fotografia                                                          */
/* ------------------------------------------------------------------ */

export function Photo({
  photo,
  src,
  alt,
  sizes,
  priority,
  className = "",
  imgClassName = "",
  quality = 75,
  reveal,
}: {
  photo?: PhotoKey;
  src?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  quality?: 60 | 75 | 85;
  /** Revela a foto com uma cortina suave ao entrar na tela */
  reveal?: boolean;
}) {
  const p = photo ? photos[photo] : undefined;
  const path = p?.src ?? src ?? "";
  const url = path.startsWith("http") ? path : `${UPLOADS}${path}`;
  return (
    <div className={`relative overflow-hidden bg-linen ${className}`} data-reveal={reveal ? "image" : undefined}>
      <Image
        src={url}
        alt={alt ?? p?.alt ?? ""}
        fill
        sizes={sizes}
        preload={priority}
        loading={priority ? "eager" : undefined}
        quality={quality}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tipografia                                                          */
/* ------------------------------------------------------------------ */

/**
 * Título em dois tons (inspirado no Riwaq): primeira linha em tinta, segunda em itálico vermelho.
 * Sem eyebrow/kicker acima do título (regra do Impeccable).
 */
export function SectionTitle({
  as: Tag = "h2",
  lead,
  accent,
  tone = "light",
  className = "",
  id,
}: {
  as?: "h1" | "h2" | "h3";
  lead: string;
  accent?: string;
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  const leadColor = tone === "dark" ? "text-on-night" : "text-ink";
  const accentColor = tone === "dark" ? "text-gold-night" : "text-gold-deep";
  return (
    <Tag id={id} className={`text-[clamp(2rem,1.4rem+2.6vw,3.6rem)] ${leadColor} ${className}`} data-reveal={Tag === "h1" ? undefined : ""}>
      {lead}
      {accent && (
        <>
          {" "}
          <em className={`block font-normal italic ${accentColor}`}>{accent}</em>
        </>
      )}
    </Tag>
  );
}

export function Lede({ children, className = "", tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  return <p className={`max-w-[62ch] text-[1.12rem] leading-relaxed ${tone === "dark" ? "text-on-night-soft" : "text-ink-soft"} ${className}`}>{children}</p>;
}

/** Título do hero com entrada palavra a palavra (técnica do BlurText, React Bits, reescrita em CSS). */
export function BlurTitle({ text, accent, className = "" }: { text: string; accent?: string; className?: string }) {
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  return (
    <h1 className={className}>
      <span className="sr-only">
        {text} {accent}
      </span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={`w${i}`} className="blur-word" style={{ ["--i" as string]: i }}>
            {w}&nbsp;
          </span>
        ))}
        {accentWords.length > 0 && (
          <em className="block font-normal italic text-gold-night">
            {accentWords.map((w, i) => (
              <span key={`a${i}`} className="blur-word" style={{ ["--i" as string]: words.length + i }}>
                {w}&nbsp;
              </span>
            ))}
          </em>
        )}
      </span>
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/* Estrutura de página interna                                         */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-ink-soft">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li>
          <Link href="/" className="link-draw">
            Início
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} aria-hidden="true" className="text-ink-soft/70" />
            {it.href ? (
              <Link href={it.href} className="link-draw">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  crumbs,
  lead,
  accent,
  intro,
  photo,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  lead: string;
  accent?: string;
  intro?: ReactNode;
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  return (
    <header className="pt-[calc(var(--header-h)+2.5rem)] pb-14 md:pb-20">
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-8 grid gap-10 ${photo ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-end" : ""}`}>
          <div>
            <SectionTitle as="h1" lead={lead} accent={accent} className="fade-up text-[clamp(2.4rem,1.6rem+3.4vw,4.6rem)]" />
            {intro && <div className="fade-up mt-6" style={{ ["--d" as string]: "120ms" }}>{typeof intro === "string" ? <Lede>{intro}</Lede> : intro}</div>}
            {children && <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "200ms" }}>{children}</div>}
          </div>
          {photo && <Photo photo={photo} sizes="(min-width: 1024px) 45vw, 100vw" priority reveal className="aspect-[4/3] rounded-[var(--radius-lg)]" />}
        </div>
      </div>
    </header>
  );
}

export function Section({ children, className = "", id, tone = "paper", labelledBy }: { children: ReactNode; className?: string; id?: string; tone?: "paper" | "sand" | "night"; labelledBy?: string }) {
  const bg = tone === "sand" ? "bg-sand" : tone === "night" ? "bg-night text-on-night on-night" : "";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 md:py-28 ${bg} ${className}`}>
      <div className="wrap" data-reveal-stagger="">{children}</div>
    </section>
  );
}

/** Ficha de dados (Data, Público…) usada em acampamentos, retiros e eventos. */
export function FactList({ facts, tone = "light" }: { facts: { label: string; value: ReactNode }[]; tone?: "light" | "dark" }) {
  const border = tone === "dark" ? "border-white/15" : "border-ink/12";
  return (
    <dl className={`divide-y ${tone === "dark" ? "divide-white/15" : "divide-ink/12"} border-y ${border}`}>
      {facts.map((f) => (
        <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt className={`text-sm ${tone === "dark" ? "text-on-night-soft" : "text-ink-soft"}`}>{f.label}</dt>
          <dd className="font-medium">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`rounded-[var(--radius-md)] border border-gold/60 bg-gold/10 px-5 py-4 text-[0.98rem] text-ink ${className}`}>{children}</p>;
}
