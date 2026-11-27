import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categoryLabel, type CommunityEvent } from "@/content/events";
import { dateRange, day, monthShort, weekday } from "@/lib/dates";

/** Lista de eventos em linhas (inspirada na programação do Riwaq). */
export function EventList({ items, headingLevel = "h3" }: { items: CommunityEvent[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="divide-y divide-ink/12 border-y border-ink/12">
      {items.map((e) => (
        <li key={e.slug}>
          <Link href={`/agenda/${e.slug}`} className="group grid grid-cols-[4.25rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-8">
            <span className="text-center leading-none">
              <span className="block text-xs font-semibold uppercase text-ink-soft">{weekday(e.start)}</span>
              <span className="mt-1 block font-display text-[2.4rem] tabular text-ink sm:text-[2.8rem]">{day(e.start)}</span>
              <span className="block text-sm font-medium text-red-dark">{monthShort(e.start)}</span>
            </span>
            <span className="min-w-0">
              <H className="font-display text-[1.45rem] leading-tight transition-colors group-hover:text-wine sm:text-[1.7rem]">{e.title}</H>
              <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] text-ink-soft">
                <span>{categoryLabel[e.category]}</span>
                <span aria-hidden="true">·</span>
                <span>{dateRange(e.start, e.end)}</span>
                {e.registration && (
                  <span className="rounded-full bg-red-dark px-2.5 py-0.5 text-[0.8rem] font-semibold text-white">Inscrições abertas</span>
                )}
              </span>
            </span>
            <ChevronRight aria-hidden="true" className="text-ink-soft transition-transform duration-300 group-hover:translate-x-1 group-hover:text-wine" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
