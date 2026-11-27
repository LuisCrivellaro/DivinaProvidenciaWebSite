/** Esqueleto exibido enquanto uma página dinâmica ainda não renderizou (fronteira de Suspense). */
export function PageSkeleton() {
  return (
    <div className="pt-[calc(var(--header-h)+2.5rem)] pb-24" aria-busy="true" aria-live="polite">
      <div className="wrap animate-pulse">
        <span className="sr-only">Carregando…</span>
        <div className="h-4 w-48 rounded bg-linen" />
        <div className="mt-8 h-14 w-3/4 max-w-xl rounded bg-linen" />
        <div className="mt-4 h-14 w-1/2 max-w-md rounded bg-linen" />
        <div className="mt-10 h-5 w-full max-w-2xl rounded bg-linen" />
        <div className="mt-3 h-5 w-5/6 max-w-xl rounded bg-linen" />
      </div>
    </div>
  );
}
