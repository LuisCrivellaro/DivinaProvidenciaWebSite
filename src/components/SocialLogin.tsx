import { BrandIcon } from "./BrandIcon";
import { socialLogin } from "@/content/site";

/** "G" oficial do Google em quatro cores (diretrizes de marca do Google Sign-In). */
function GoogleG(props: { size?: number }) {
  const s = props.size ?? 20;
  return (
    <svg viewBox="0 0 48 48" width={s} height={s} aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

const icons = {
  google: <GoogleG />,
  facebook: <BrandIcon name="facebook" width={20} height={20} className="text-[#0866FF]" />,
} as const;

/**
 * Botões "Continuar com Google/Facebook". Levam ao login social do WordPress oficial
 * (plugin Nextend Social Login). Enquanto o plugin não estiver ativo, ficam desativados com "em breve".
 */
export function SocialLogin() {
  const { enabled, providers, href } = socialLogin;
  const base = "flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-ink/20 bg-white px-5 text-[1.05rem] font-medium text-ink";
  return (
    <div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {providers.map((p) => (
          <li key={p.id}>
            {enabled ? (
              <a href={href(p.id)} className={`${base} transition-colors hover:border-ink/40 hover:bg-paper`}>
                {icons[p.id]} {p.label}
                <span className="sr-only"> (entrar com {p.label})</span>
              </a>
            ) : (
              <span role="link" aria-disabled="true" className={`${base} cursor-not-allowed opacity-60`} title="Disponível em breve">
                {icons[p.id]} {p.label}
                <span className="rounded-full bg-ink/8 px-2 py-0.5 text-[0.75rem] font-medium text-ink-soft">em breve</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="my-7 flex items-center gap-4 text-[0.98rem] text-ink-soft" aria-hidden="true">
        <span className="h-px flex-1 bg-ink/15" />
        ou com e-mail
        <span className="h-px flex-1 bg-ink/15" />
      </div>
    </div>
  );
}
