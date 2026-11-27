import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, Section } from "@/components/ui";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { galleries, groupLabel, groupOrder, years } from "@/lib/galleries";

export const metadata: Metadata = {
  title: "Galeria de fotos",
  description: "Fotos de acampamentos, retiros, Cerco de Jericó, Divina Jovem e festas da Comunidade Divina Providência, organizadas por tipo e ano.",
  alternates: { canonical: "/galeria" },
};

export default function Page() {
  const total = galleries.reduce((n, g) => n + g.images.length, 0);
  const groups = groupOrder.filter((id) => galleries.some((g) => g.group === id)).map((id) => ({ id, label: groupLabel[id] }));
  // Para a lista leve no cliente, enviamos só o necessário (sem as URLs de todas as fotos).
  const light = galleries.map((g) => ({ ...g, images: Array(g.images.length).fill("") as string[] }));
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Galeria" }]}
        lead="Galeria"
        accent="de fotos."
        intro={`${galleries.length} galerias e ${total.toLocaleString("pt-BR")} fotos, de 2022 até hoje. Filtre por tipo de encontro ou por ano.`}
      />
      <Section tone="sand" className="!pt-14">
        <Suspense fallback={<p className="text-ink-soft">Carregando galerias…</p>}>
          <GalleryBrowser galleries={light} groups={groups} years={years} />
        </Suspense>
      </Section>
    </>
  );
}
