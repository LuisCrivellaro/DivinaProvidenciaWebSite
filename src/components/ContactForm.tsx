"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

type Sector = { id: string; label: string; whatsapp: string };
type Errors = Partial<Record<"nome" | "setor" | "assunto" | "mensagem" | "aceite", string>>;

const subjects = ["Acampamentos", "Retiros e formação", "Grupos de oração", "Adoração Perpétua", "Inscrições e pagamentos", "Acolhimento na Casa Terapêutica", "Outro assunto"];

/**
 * Formulário de contato sem servidor: monta a mensagem e abre o WhatsApp da secretaria escolhida.
 * Nada é armazenado por este site. A confirmação só diz o que de fato aconteceu (o WhatsApp foi aberto).
 */
export function ContactForm({ sectors }: { sectors: Sector[] }) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening" | "opened" | "blocked">("idle");
  const [link, setLink] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") ?? "").trim();
    const setor = String(f.get("setor") ?? "");
    const assunto = String(f.get("assunto") ?? "");
    const mensagem = String(f.get("mensagem") ?? "").trim();
    const aceite = f.get("aceite") === "on";
    const next: Errors = {};
    if (nome.length < 2) next.nome = "Escreva o seu nome.";
    if (!setor) next.setor = "Escolha com qual secretaria você quer falar.";
    if (!assunto) next.assunto = "Escolha o assunto.";
    if (mensagem.length < 10) next.mensagem = "Conte um pouco mais: a mensagem precisa de pelo menos 10 caracteres.";
    if (!aceite) next.aceite = "Para continuar, confirme que a mensagem será enviada pelo WhatsApp.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const sector = sectors.find((s) => s.id === setor)!;
    const text = `Olá! Meu nome é ${nome}.\nAssunto: ${assunto}\n\n${mensagem}\n\n(enviado pelo site da Comunidade Divina Providência)`;
    const url = `https://wa.me/${sector.whatsapp}?text=${encodeURIComponent(text)}`;
    setLink(url);
    setStatus("opening");
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(w === null ? "blocked" : "opened");
  }

  const field = "mt-2 block w-full rounded-[var(--radius-md)] border bg-white px-4 py-3 text-[1.05rem] text-ink transition-colors placeholder:text-ink-soft/80 focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/25";
  const border = (k: keyof Errors) => (errors[k] ? "border-wine" : "border-ink/20");
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-erro`} className="mt-2 text-[0.92rem] font-medium text-wine">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-7" aria-describedby={`${id}-aviso`}>
      <div>
        <label htmlFor={`${id}-nome`} className="font-medium">Seu nome</label>
        <input id={`${id}-nome`} name="nome" type="text" autoComplete="name" placeholder="Ex.: Maria Aparecida…" className={`${field} ${border("nome")}`} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? `${id}-nome-erro` : undefined} />
        {err("nome")}
      </div>

      <fieldset aria-describedby={errors.setor ? `${id}-setor-erro` : undefined}>
        <legend className="font-medium">Com quem você quer falar?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {sectors.map((s) => (
            <label key={s.id} className="group flex min-h-14 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-ink/20 bg-white px-4 py-3 has-[:checked]:border-wine has-[:checked]:bg-wine/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-wine/40">
              <input type="radio" name="setor" value={s.id} className="peer sr-only" />
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink/40 peer-checked:border-wine" aria-hidden="true">
                <span className="h-2.5 w-2.5 scale-0 rounded-full bg-wine transition-transform group-has-[:checked]:scale-100" />
              </span>
              <span>{s.label}</span>
            </label>
          ))}
        </div>
        {err("setor")}
      </fieldset>

      <div>
        <label htmlFor={`${id}-assunto`} className="font-medium">Assunto</label>
        <div className="relative">
        <select id={`${id}-assunto`} name="assunto" defaultValue="" className={`${field} ${border("assunto")} appearance-none bg-white`} aria-invalid={!!errors.assunto} aria-describedby={errors.assunto ? `${id}-assunto-erro` : undefined}>
          <option value="" disabled>Escolha um assunto</option>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <ChevronDown size={20} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-ink-soft" />
        </div>
        {err("assunto")}
      </div>

      <div>
        <label htmlFor={`${id}-mensagem`} className="font-medium">Mensagem</label>
        <textarea id={`${id}-mensagem`} name="mensagem" rows={5} placeholder="Ex.: Gostaria de saber quando abrem as inscrições do Acampamento Juvenil…" className={`${field} ${border("mensagem")} resize-y`} aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? `${id}-mensagem-erro` : undefined} />
        {err("mensagem")}
      </div>

      <div>
        {/* Checkbox com marcação animada (inspirada em checkboxes do Uiverse, MIT), adaptada ao design system */}
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" name="aceite" className="peer sr-only" aria-invalid={!!errors.aceite} aria-describedby={errors.aceite ? `${id}-aceite-erro` : undefined} />
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[6px] border-2 border-ink/40 bg-white text-white transition-colors peer-checked:border-wine peer-checked:bg-wine peer-focus-visible:ring-2 peer-focus-visible:ring-wine/40 [&>svg]:scale-0 peer-checked:[&>svg]:scale-100" aria-hidden="true">
            <Check size={16} strokeWidth={3} className="transition-transform duration-200" />
          </span>
          <span className="text-[0.98rem] text-ink-soft">
            Entendo que meu nome e minha mensagem serão abertos no WhatsApp e enviados à secretaria somente quando eu tocar em enviar lá. Este site não guarda esses dados.
          </span>
        </label>
        {err("aceite")}
      </div>

      <p id={`${id}-aviso`} className="sr-only">Ao enviar, o WhatsApp abre em uma nova aba com a mensagem pronta.</p>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" disabled={status === "opening"}>
          <span>{status === "opening" ? "Abrindo o WhatsApp…" : "Continuar no WhatsApp"}</span>
          <span className="btn-icon" aria-hidden="true">→</span>
        </button>
      </div>

      <div aria-live="polite" role="status">
        {status === "opened" && (
          <p className="rounded-[var(--radius-md)] border border-gold/60 bg-gold/10 px-5 py-4">
            Abrimos o WhatsApp com a sua mensagem em outra aba. Para concluir, toque em <strong>Enviar</strong> no WhatsApp.
          </p>
        )}
        {status === "blocked" && (
          <p className="rounded-[var(--radius-md)] border border-wine/50 bg-wine/5 px-5 py-4">
            O navegador bloqueou a nova aba.{" "}
            <a href={link} target="_blank" rel="noopener noreferrer" className="link-draw font-medium text-wine">
              Toque aqui para abrir o WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
