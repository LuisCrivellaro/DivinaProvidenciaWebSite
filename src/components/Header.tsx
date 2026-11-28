"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { BrandIcon } from "./BrandIcon";
import { WhatsAppChat } from "./WhatsAppChat";
import { contacts, social, whatsappLink } from "@/content/site";

const participe = [
  { href: "/acampamentos", label: "Acampamentos", hint: "Mirim, Juvenil, FAC, Sênior e Casais" },
  { href: "/retiros", label: "Retiros e formação", hint: "Desperta, Homens de Fé, Mulheres" },
  { href: "/grupos-de-oracao", label: "Grupos de oração", hint: "Encontros semanais na sede" },
  { href: "/vida-de-oracao", label: "Vida de oração", hint: "Adoração perpétua e Cerco de Jericó" },
];

const primary = [
  { href: "/comunidade", label: "Comunidade" },
  { href: "/agenda", label: "Agenda" },
  { href: "/obras-e-projetos", label: "Obras" },
  { href: "/galeria", label: "Galeria" },
  { href: "/contato", label: "Contato" },
];

const mobileLinks = [
  { href: "/comunidade", label: "Nossa comunidade" },
  { href: "/agenda", label: "Agenda" },
  ...participe.map(({ href, label }) => ({ href, label })),
  { href: "/obras-e-projetos", label: "Obras e projetos" },
  { href: "/casa-terapeutica", label: "Casa Terapêutica" },
  { href: "/galeria", label: "Galeria" },
  { href: "/videos", label: "Vídeos" },
  { href: "/loja", label: "Loja e inscrições" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropId = useId();
  const dropRef = useRef<HTMLLIElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha menus ao trocar de página (ajuste de estado durante a renderização, sem efeito)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setDropOpen(false);
  }

  // Dropdown: fecha com Esc e clique fora
  useEffect(() => {
    if (!dropOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropOpen(false);
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [dropOpen]);

  // Menu mobile: trava a rolagem, prende o foco e fecha com Esc
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const participeActive = participe.some((p) => isActive(p.href));
  const evangelizacao = contacts.find((c) => c.id === "evangelizacao")!;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        scrolled ? "bg-paper/95 text-ink shadow-[0_1px_0_rgb(43_32_36/0.08),0_10px_30px_-20px_rgb(43_32_36/0.35)] backdrop-blur-md" : "bg-paper text-ink"
      }`}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="Comunidade Divina Providência, página inicial">
          <Image src="/brand/logo-oficial.webp" alt="" width={2000} height={667} preload loading="eager" className="h-14 w-auto md:h-16" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.95rem] font-medium">
            <li ref={dropRef} className="relative">
              <button
                type="button"
                aria-expanded={dropOpen}
                aria-controls={dropId}
                onClick={() => setDropOpen((v) => !v)}
                data-active={participeActive || dropOpen}
                className="nav-link flex min-h-11 items-center gap-1 rounded-full px-4 transition-colors duration-300 hover:bg-gold/10"
              >
                Participe
                <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                id={dropId}
                hidden={!dropOpen}
                className="dropdown-panel absolute left-0 top-[calc(100%+10px)] w-[22rem] rounded-[var(--radius-lg)] border border-ink/10 bg-paper p-2 text-ink shadow-[0_28px_56px_-28px_rgb(84_62_24/0.45)]"
              >
                <ul>
                  {participe.map((p, i) => (
                    <li key={p.href} style={{ ["--i" as string]: i }}>
                      <Link
                        href={p.href}
                        className="group/item block rounded-[var(--radius-md)] px-4 py-3 transition-colors duration-300 hover:bg-gold/10"
                        aria-current={isActive(p.href) ? "page" : undefined}
                      >
                        <span className="block font-display text-[1.2rem] leading-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/item:translate-x-1">{p.label}</span>
                        <span className="mt-0.5 block text-sm font-normal text-ink-soft">{p.hint}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="nav-link flex min-h-11 items-center rounded-full px-4 transition-colors duration-300 hover:bg-gold/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-1.5">
          <Link
            href="/loja"
            className={`hidden min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-[0.95rem] font-medium sm:flex transition-colors duration-300 hover:bg-gold/10`}
          >
            <ShoppingBag size={19} aria-hidden="true" />
            <span className="hidden xl:inline">Loja</span>
            <span className="sr-only xl:hidden">Loja e inscrições</span>
          </Link>
          <Link
            href="/login"
            aria-current={isActive("/login") ? "page" : undefined}
            className={`hidden min-h-11 min-w-11 items-center justify-center rounded-full sm:flex transition-colors duration-300 hover:bg-gold/10 ${isActive("/login") ? "bg-gold/15" : ""}`}
          >
            <UserRound size={19} aria-hidden="true" />
            <span className="sr-only">Entrar na minha conta</span>
          </Link>
          {/* Componente WhatsAppChat (recriado do Framer), em português */}
          <WhatsAppChat
            phoneNumber={evangelizacao.whatsapp!}
            message="Olá! Vim pelo site da Comunidade Divina Providência e gostaria de falar com a secretaria."
            buttonText="Fale Conosco"
            srLabel="com a Secretaria de Evangelização"
            size="small"
            className="wa-chat--collapse ml-1"
            labelClassName="max-sm:sr-only lg:sr-only xl:not-sr-only"
          />
          <button
            ref={menuBtnRef}
            type="button"
            className={`flex min-h-11 min-w-11 items-center justify-center rounded-full lg:hidden transition-colors duration-300 hover:bg-gold/10`}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile em tela cheia — entrada escalonada inspirada no StaggeredMenu (React Bits), em CSS */}
      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto overscroll-contain bg-paper px-5 pb-10 pt-4 text-ink lg:hidden"
      >
        <nav aria-label="Menu">
          <ul className="divide-y divide-ink/10 border-b border-ink/10">
            {mobileLinks.map((l, i) => (
              <li key={l.href} className="fade-up" style={{ ["--d" as string]: `${i * 35}ms` }}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between font-display text-[1.6rem] leading-none"
                >
                  {l.label}
                  {isActive(l.href) && <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3">
          <a href={whatsappLink(evangelizacao.whatsapp!)} target="_blank" rel="noopener noreferrer" className="btn justify-between">
            <span className="flex items-center gap-2">
              <BrandIcon name="whatsapp" width={18} height={18} /> Fale com a Secretaria
            </span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <Link href="/login" className="btn btn-ghost btn-plain justify-start gap-2">
            <UserRound size={18} aria-hidden="true" /> Minha conta
          </Link>
        </div>
        <ul className="mt-8 flex gap-2">
          {social.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15">
                <BrandIcon name={s.id} />
                <span className="sr-only">{s.label} (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
