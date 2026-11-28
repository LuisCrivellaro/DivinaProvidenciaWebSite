"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { BrandIcon } from "./BrandIcon";

type Errors = Partial<Record<"nome" | "encontro" | "pedido", string>>;

const pedidos = [
  { id: "confirmar", label: "Confirmar se a inscrição foi recebida" },
  { id: "pagamento", label: "Saber como fazer o pagamento" },
  { id: "alterar", label: "Corrigir os dados da inscrição" },
  { id: "cancelar", label: "Cancelar a inscrição" },
];

/**
 * Acompanhamento de inscrição sem conta nem senha: monta a mensagem e abre o WhatsApp da
 * Secretaria de Evangelização, que tem o registro das fichas. Nada é guardado por este site.
 */
export function ConsultaInscricaoForm({ encontros, whatsapp }: { encontros: string[]; whatsapp: string }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opened" | "blocked">("idle");
  const [link, setLink] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") ?? "").trim();
    const encontro = String(f.get("encontro") ?? "");
    const pedido = pedidos.find((p) => p.id === f.get("pedido"));
    const obs = String(f.get("obs") ?? "").trim();
    const next: Errors = {};
    if (nome.length < 3) next.nome = "Escreva o nome do participante, como foi informado na ficha.";
    if (!encontro) next.encontro = "Escolha o encontro.";
    if (!pedido) next.pedido = "Escolha o que você precisa.";
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    const text = [
      `Olá! Sobre a inscrição de *${nome}* no encontro *${encontro}*:`,
      `${pedido!.label}.`,
      obs ? `\n${obs}` : "",
      "\n(enviado pelo site da Comunidade Divina Providência)",
    ].join("\n");
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    setLink(url);
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(w === null ? "blocked" : "opened");
  }

  const field =
    "mt-2 block w-full rounded-[var(--radius-md)] border bg-white px-4 py-3 text-[1.05rem] text-ink transition-colors placeholder:text-ink-soft/80 focus:border-gold-deep focus:outline-none focus:ring-2 focus:ring-gold/40";
  const border = (k: keyof Errors) => (errors[k] ? "border-danger" : "border-ink/20");
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-erro`} className="mt-2 text-[0.92rem] font-medium text-danger">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${id}-nome`} className="font-medium">Nome do participante</label>
        <input id={`${id}-nome`} name="nome" type="text" autoComplete="name" placeholder="Como foi escrito na ficha" className={`${field} ${border("nome")}`} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? `${id}-nome-erro` : undefined} />
        {err("nome")}
      </div>

      <div>
        <label htmlFor={`${id}-encontro`} className="font-medium">Encontro</label>
        <div className="relative">
          <select id={`${id}-encontro`} name="encontro" defaultValue="" className={`${field} ${border("encontro")} appearance-none`} aria-invalid={!!errors.encontro} aria-describedby={errors.encontro ? `${id}-encontro-erro` : undefined}>
            <option value="" disabled>Escolha o encontro</option>
            {encontros.map((e) => (
              <option key={e}>{e}</option>
            ))}
            <option>Outro encontro</option>
          </select>
          <ChevronDown size={20} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-ink-soft" />
        </div>
        {err("encontro")}
      </div>

      <fieldset aria-describedby={errors.pedido ? `${id}-pedido-erro` : undefined}>
        <legend className="font-medium">Do que você precisa?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {pedidos.map((p) => (
            <label key={p.id} className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-ink/20 bg-white px-4 py-3 has-[:checked]:border-gold-deep has-[:checked]:bg-gold/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold/50">
              <input type="radio" name="pedido" value={p.id} className="peer sr-only" />
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink/40 peer-checked:border-gold-deep" aria-hidden="true">
                <span className="h-2.5 w-2.5 scale-0 rounded-full bg-gold-deep transition-transform group-has-[:checked]:scale-100" />
              </span>
              <span>{p.label}</span>
            </label>
          ))}
        </div>
        {err("pedido")}
      </fieldset>

      <div>
        <label htmlFor={`${id}-obs`} className="font-medium">
          Observação <span className="font-normal text-ink-soft">(opcional)</span>
        </label>
        <textarea id={`${id}-obs`} name="obs" rows={3} placeholder="Ex.: o celular informado mudou para…" className={`${field} border-ink/20 resize-y`} />
      </div>

      <button type="submit" className="btn">
        <span className="inline-flex items-center gap-2">
          <BrandIcon name="whatsapp" width={18} height={18} /> Falar com a secretaria
        </span>
        <span className="btn-icon" aria-hidden="true">→</span>
      </button>

      <div aria-live="polite" role="status">
        {status === "opened" && (
          <p className="rounded-[var(--radius-md)] border border-gold/60 bg-gold/10 px-5 py-4">
            Abrimos o WhatsApp com a mensagem em outra aba. Toque em <strong>Enviar</strong> para a secretaria receber.
          </p>
        )}
        {status === "blocked" && (
          <p className="rounded-[var(--radius-md)] border border-gold/60 bg-gold/10 px-5 py-4">
            O navegador bloqueou a nova aba.{" "}
            <a href={link} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-gold-deep">
              Toque aqui para abrir o WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
