import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { Breadcrumbs, ButtonLink, SectionTitle } from "@/components/ui";
import { GalleryViewer } from "@/components/GalleryViewer";
import { GalleryCard } from "@/components/GalleryCard";
import { galleries, getGallery, groupLabel, uploadUrl } from "@/lib/galleries";

export function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/galeria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGallery(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: `${g.images.length} fotos de ${g.title}, da Comunidade Divina Providência.`,
    alternates: { canonical: `/galeria/${slug}` },
    openGraph: g.restricted ? undefined : { images: [uploadUrl(g.cover)] },
    robots: g.restricted ? { index: false } : undefined,
  };
}

export default async function Page({ params }: PageProps<"/galeria/[slug]">) {
  const { slug } = await params;
  const g = getGallery(slug);
  if (!g) notFound();
  const related = galleries.filter((x) => x.group === g.group && x.slug !== g.slug && !x.restricted).slice(0, 4);
  return (
    <div className="pt-[calc(var(--header-h)+2.5rem)] pb-24">
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Galeria", href: "/galeria" }, { label: g.title }]} />
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <SectionTitle as="h1" lead={g.title} className="text-[clamp(2.2rem,1.5rem+3vw,4rem)]" />
            <p className="mt-3 text-ink-soft tabular">{groupLabel[g.group] ?? "Galeria"} · {g.year} · {g.images.length} fotos</p>
          </div>
        </div>

        <div className="mt-12">
          {g.restricted ? (
            <div className="grid gap-8 rounded-[var(--radius-xl)] bg-night p-8 text-on-night md:grid-cols-[auto_1fr] md:p-12 on-night">
              <Lock size={36} className="text-gold-night" aria-hidden="true" />
              <div>
                <h2 className="font-display text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)] leading-tight">Estas fotos ficam no acervo oficial.</h2>
                <p className="mt-4 max-w-[60ch] text-on-night-soft">
                  {g.slug.includes("teatro")
                    ? "A galeria mostra uma atividade da Comunidade Terapêutica. Para proteger quem está em tratamento, não republicamos essas fotos aqui."
                    : "Esta galeria tem fotos de crianças e adolescentes. Até a comunidade validar a política de uso de imagem, elas continuam apenas no site oficial."}
                </p>
                <ButtonLink href={g.source} variant="light" className="mt-8">Abrir no site oficial</ButtonLink>
              </div>
            </div>
          ) : (
            <GalleryViewer images={g.images} title={g.title} />
          )}
        </div>

        {related.length > 0 && (
          <section aria-labelledby="relacionadas" className="mt-24">
            <h2 id="relacionadas" className="font-display text-[2rem]">Mais galerias de {(groupLabel[g.group] ?? "").toLowerCase()}</h2>
            <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger="">
              {related.map((r) => (
                <li key={r.slug}>
                  <GalleryCard g={r} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <p className="mt-16">
          <Link href="/galeria" className="link-draw text-ink-soft">← Todas as galerias</Link>
        </p>
      </div>
    </div>
  );
}
