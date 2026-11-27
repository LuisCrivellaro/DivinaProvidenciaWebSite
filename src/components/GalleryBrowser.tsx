"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { GalleryCardClient } from "./GalleryCardClient";
import type { Gallery } from "@/lib/galleries";

type Props = { galleries: Gallery[]; groups: { id: string; label: string }[]; years: number[] };

/** Filtros por tipo e por ano, refletidos na URL (?tipo=…&ano=…) para poder compartilhar. */
export function GalleryBrowser({ galleries, groups, years }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tipo = params.get("tipo") ?? "todos";
  const ano = params.get("ano") ?? "todos";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "todos") next.delete(key);
    else next.set(key, value);
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const filtered = useMemo(
    () => galleries.filter((g) => (tipo === "todos" || g.group === tipo) && (ano === "todos" || String(g.year) === ano)),
    [galleries, tipo, ano],
  );

  const chip = (active: boolean) =>
    `min-h-11 rounded-full border px-4 text-[0.95rem] font-medium transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-ink/20 bg-paper hover:border-ink/50"
    }`;

  return (
    <div>
      <div className="space-y-4">
        <fieldset>
          <legend className="mb-2 text-sm text-ink-soft">Tipo</legend>
          <div className="flex flex-wrap gap-2">
            {[{ id: "todos", label: "Todas" }, ...groups].map((g) => (
              <button key={g.id} type="button" aria-pressed={tipo === g.id} onClick={() => set("tipo", g.id)} className={chip(tipo === g.id)}>
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm text-ink-soft">Ano</legend>
          <div className="flex flex-wrap gap-2">
            {["todos", ...years.map(String)].map((y) => (
              <button key={y} type="button" aria-pressed={ano === y} onClick={() => set("ano", y)} className={`${chip(ano === y)} tabular`}>
                {y === "todos" ? "Todos" : y}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="mt-8 text-ink-soft" aria-live="polite">
        {filtered.length === 1 ? "1 galeria" : `${filtered.length} galerias`}
      </p>
      {filtered.length === 0 ? (
        <p className="mt-6 rounded-[var(--radius-lg)] bg-sand p-8 text-ink-soft">
          Nenhuma galeria com esses filtros.{" "}
          <button type="button" className="link-draw font-medium text-gold-deep" onClick={() => router.replace(pathname, { scroll: false })}>
            Limpar filtros
          </button>
        </p>
      ) : (
        <ul className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-reveal-stagger="">
          {filtered.map((g) => (
            <li key={g.slug}>
              <GalleryCardClient g={g} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
