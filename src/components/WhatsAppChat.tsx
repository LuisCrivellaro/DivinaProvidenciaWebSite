import type { CSSProperties } from "react";
import { BrandIcon } from "./BrandIcon";

/**
 * Botão "Fale Conosco" no WhatsApp — recriação nativa do componente WhatsAppChat do Framer
 * (framer.com/m/WhatsAppChat-fyWs.js). O original depende do runtime do Framer e abre o
 * WhatsApp com window.open; aqui é um link comum (funciona sem JS e no leitor de tela),
 * com o mesmo visual: verde do WhatsApp, texto branco seminegrito, cantos de 8 px, sombra leve,
 * hover com opacidade 0,9 e leve subida.
 */

const sizes = {
  small: { padding: "8px 16px", icon: 16, gap: "6px", font: "14px", iconOnlyPadding: "8px" },
  medium: { padding: "12px 20px", icon: 20, gap: "8px", font: "16px", iconOnlyPadding: "12px" },
  large: { padding: "16px 24px", icon: 24, gap: "10px", font: "18px", iconOnlyPadding: "16px" },
} as const;

export function WhatsAppChat({
  phoneNumber,
  message,
  buttonText = "Fale Conosco",
  srLabel,
  size = "medium",
  backgroundColor = "#25D366",
  textColor = "#FFFFFF",
  borderRadius = 8,
  iconOnly = false,
  labelClassName = "",
  className = "",
}: {
  /** Número com DDI, só dígitos ou com +, espaços e traços (são removidos) */
  phoneNumber: string;
  /** Mensagem que já vem escrita no WhatsApp */
  message?: string;
  buttonText?: string;
  /** Complemento lido só pelo leitor de tela */
  srLabel?: string;
  size?: keyof typeof sizes;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  iconOnly?: boolean;
  /** Classes do texto: permite escondê-lo em larguras apertadas (vira só ícone) */
  labelClassName?: string;
  className?: string;
}) {
  const s = sizes[size];
  const phone = phoneNumber.replace(/[^\d]/g, "");
  const href = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  const style = {
    "--wa-bg": backgroundColor,
    "--wa-fg": textColor,
    "--wa-radius": `${borderRadius}px`,
    "--wa-pad": iconOnly ? s.iconOnlyPadding : s.padding,
    "--wa-pad-icon": s.iconOnlyPadding,
    "--wa-gap": iconOnly ? "0px" : s.gap,
    "--wa-font": s.font,
  } as CSSProperties;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`wa-chat ${className}`} style={style}>
      <BrandIcon name="whatsapp" width={s.icon} height={s.icon} className="shrink-0" />
      {iconOnly ? <span className="sr-only">{buttonText}</span> : <span className={labelClassName}>{buttonText}</span>}
      <span className="sr-only">{srLabel ?? ""} (WhatsApp, abre em nova aba)</span>
    </a>
  );
}
