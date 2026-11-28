"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { BrandIcon } from "./BrandIcon";

type Errors = Partial<Record<"nome" | "celular" | "cpf" | "aceite", string>>;

const digits = (v: string) => v.replace(/\D/g, "");

/** Valida os dígitos verificadores do CPF (evita erro de digitação; não consulta nenhum cadastro). */
export function isValidCpf(value: string) {
  const d = digits(value);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const check = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return check(9) === Number(d[9]) && check(10) === Number(d[10]);
}

const maskCpf = (v: string) =>
  digits(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");

const maskPhone = (v: string) => {
  const d = digits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

/**
 * Inscrição sem servidor: valida os mesmos campos que a loja antiga exigia (nome do participante,
 * celular e CPF) e abre o WhatsApp da secretaria com a ficha pronta. Nada é guardado por este site;
 * a vaga só é confirmada quando a secretaria responde.
 */
export function InscricaoForm({ inscricao, price, whatsapp }: { inscricao: string; price: string; whatsapp: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [celular, setCelular] = useState("");
  const [cpf, setCpf] = useState("");
  const [status, setStatus] = useState<"idle" | "opened" | "blocked">("idle");
  const [link, setLink] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") ?? "").trim().replace(/\s+/g, " ");
    const aceite = f.get("aceite") === "on";
    const next: Errors = {};
    if (nome.split(" ").length < 2 || nome.length < 5) next.nome = "Escreva o nome completo do participante.";
    if (digits(celular).length < 10) next.celular = "Informe o celular com DDD, por exemplo (66) 99999-9999.";
    if (!isValidCpf(cpf)) next.cpf = "Confira o CPF: os números não formam um CPF válido.";
    if (!aceite) next.aceite = "Para continuar, confirme que os dados serão enviados à secretaria pelo WhatsApp.";
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    const text = [
      `Olá! Quero fazer a inscrição: *${inscricao}* (${price}).`,
      "",
      `Participante: ${nome}`,
      `Celular: ${maskPhone(celular)}`,
      `CPF: ${maskCpf(cpf)}`,
      "",
      "Aguardo a confirmação da vaga e as orientações de pagamento.",
      "(enviado pelo site da Comunidade Divina Providência)",
    ].join("\n");
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    setLink(url);
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(w === null ? "blocked" : "opened");
  }

  const field =
    "mt-2 block w-full rounded-[var(--radius-md)] border bg-white px-4 py-3 text-[1.05rem] text-ink transition-colors placeholder:text-ink-soft/80 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/40";
  const border = (k: keyof Errors) => (errors[k] ? "border-danger" : "border-ink/20");
  const described = (k: keyof Errors, hint?: string) => [errors[k] ? `${id}-${k}-erro` : "", hint ?? ""].filter(Boolean).join(" ") || undefined;
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-erro`} className="mt-2 text-[0.92rem] font-medium text-danger">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${id}-nome`} className="font-medium">
          Nome do participante <span aria-hidden="true" className="text-danger">*</span>
        </label>
        <input id={`${id}-nome`} name="nome" type="text" autoComplete="name" required placeholder="Nome e sobrenome" className={`${field} ${border("nome")}`} aria-invalid={!!errors.nome} aria-describedby={described("nome")} />
        {err("nome")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-celular`} className="font-medium">
            Celular (WhatsApp) <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id={`${id}-celular`}
            name="celular"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            placeholder="(66) 99999-9999"
            value={celular}
            onChange={(e) => setCelular(maskPhone(e.target.value))}
            className={`${field} ${border("celular")} tabular`}
            aria-invalid={!!errors.celular}
            aria-describedby={described("celular")}
          />
          {err("celular")}
        </div>
        <div>
          <label htmlFor={`${id}-cpf`} className="font-medium">
            CPF do participante <span aria-hidden="true" className="text-danger">*</span>
          </label>
          <input
            id={`${id}-cpf`}
            name="cpf"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            required
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(maskCpf(e.target.value))}
            className={`${field} ${border("cpf")} tabular`}
            aria-invalid={!!errors.cpf}
            aria-describedby={described("cpf")}
          />
          {err("cpf")}
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="aceite" className="peer sr-only" aria-invalid={!!errors.aceite} aria-describedby={errors.aceite ? `${id}-aceite-erro` : undefined} />
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[6px] border-2 border-ink/40 bg-white text-ink transition-colors peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50 [&>svg]:scale-0 peer-checked:[&>svg]:scale-100" aria-hidden="true">
            <Check size={16} strokeWidth={3} className="transition-transform duration-200" />
          </span>
          <span className="text-[0.98rem] text-ink-soft">
            Autorizo o envio destes dados à Secretaria de Evangelização pelo WhatsApp, somente para a inscrição neste encontro. Este site não guarda nome, celular nem CPF.
          </span>
        </label>
        {err("aceite")}
      </div>

      <button type="submit" className="btn">
        <span className="inline-flex items-center gap-2">
          <BrandIcon name="whatsapp" width={18} height={18} /> Enviar inscrição pelo WhatsApp
        </span>
        <span className="btn-icon" aria-hidden="true">→</span>
      </button>

      <div aria-live="polite" role="status">
        {status === "opened" && (
          <div className="rounded-[var(--radius-md)] border border-gold/60 bg-gold/10 px-5 py-4">
            <p className="font-medium">Abrimos o WhatsApp com a sua ficha em outra aba.</p>
            <p className="mt-1 text-ink-soft">
              Toque em <strong className="text-ink">Enviar</strong> no WhatsApp. A vaga fica garantida quando a secretaria responder com a confirmação e as orientações de pagamento.
            </p>
          </div>
        )}
        {status === "blocked" && (
          <p className="rounded-[var(--radius-md)] border border-gold/60 bg-gold/10 px-5 py-4">
            O navegador bloqueou a nova aba.{" "}
            <a href={link} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-gold-deep">
              Toque aqui para abrir o WhatsApp com a ficha
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
