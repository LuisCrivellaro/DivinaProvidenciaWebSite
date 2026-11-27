"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check, Eye, EyeOff } from "lucide-react";

type Errors = Partial<Record<"log" | "pwd", string>>;

/**
 * Login real, sem simulação: o formulário é enviado pelo navegador direto para o
 * wp-login.php do site oficial (WordPress + WooCommerce), que autentica e abre "Minha conta".
 * Este site não recebe, não lê e não guarda o usuário nem a senha.
 */
export function LoginForm({ action, redirectTo, lostPassword }: { action: string; redirectTo: string; lostPassword: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [showPwd, setShowPwd] = useState(false);
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const f = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(f.get("log") ?? "").trim()) next.log = "Escreva o seu e-mail ou nome de usuário.";
    if (!String(f.get("pwd") ?? "")) next.pwd = "Escreva a sua senha.";
    setErrors(next);
    if (Object.keys(next).length) {
      e.preventDefault();
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    // Sem preventDefault: o navegador envia o POST direto ao site oficial.
    setSending(true);
  }

  const field = "mt-2 block w-full rounded-[var(--radius-md)] border bg-white px-4 py-3.5 text-[1.15rem] text-ink transition-colors placeholder:text-ink-soft/80 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/40";
  const border = (k: keyof Errors) => (errors[k] ? "border-danger" : "border-ink/20");
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-erro`} className="mt-2 text-[1rem] font-medium text-danger">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} action={action} method="post" onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${id}-log`} className="text-[1.1rem] font-medium">E-mail ou nome de usuário</label>
        <input
          id={`${id}-log`}
          name="log"
          type="text"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="Ex.: maria@email.com"
          className={`${field} ${border("log")}`}
          aria-invalid={!!errors.log}
          aria-describedby={errors.log ? `${id}-log-erro` : undefined}
        />
        {err("log")}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={`${id}-pwd`} className="text-[1.1rem] font-medium">Senha</label>
          <a href={lostPassword} className="link-draw text-[1.02rem] font-medium text-gold-deep">Esqueci minha senha</a>
        </div>
        <div className="relative">
          <input
            id={`${id}-pwd`}
            name="pwd"
            type={showPwd ? "text" : "password"}
            autoComplete="current-password"
            className={`${field} ${border("pwd")} pr-14`}
            aria-invalid={!!errors.pwd}
            aria-describedby={errors.pwd ? `${id}-pwd-erro` : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            aria-pressed={showPwd}
            aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-1.5 top-1/2 mt-1 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/6 hover:text-ink"
          >
            {showPwd ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        </div>
        {err("pwd")}
      </div>

      {/* Mesmo checkbox animado do formulário de contato */}
      <label className="flex w-fit cursor-pointer items-center gap-3">
        <input type="checkbox" name="rememberme" value="forever" className="peer sr-only" />
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px] border-2 border-ink/40 bg-white text-ink transition-colors peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50 [&>svg]:scale-0 peer-checked:[&>svg]:scale-100" aria-hidden="true">
          <Check size={16} strokeWidth={3} className="transition-transform duration-200" />
        </span>
        <span className="text-[1.08rem]">Manter conectado neste aparelho</span>
      </label>

      <input type="hidden" name="redirect_to" value={redirectTo} />

      <button type="submit" className="btn w-full justify-between !min-h-14 !text-[1.08rem]" disabled={sending}>
        <span>{sending ? "Entrando…" : "Entrar na minha conta"}</span>
        <span className="btn-icon" aria-hidden="true">→</span>
      </button>
    </form>
  );
}
