import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { ProgramIndex } from "@/components/ProgramIndex";
import { retreats } from "@/content/programs";

export const metadata: Metadata = {
  title: "Retiros e formação",
  description: "Retiro Desperta, Retiro Homens de Fé, Retiro das Mulheres e Curso 5 Linguagens do Amor na Comunidade Divina Providência.",
  alternates: { canonical: "/retiros" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Retiros e formação" }]}
        lead="Retiros"
        accent="e formação."
        intro="Retiros de fim de semana e cursos de formação. Cada um foi pensado para um público: jovens que já acamparam, homens, mulheres, casais."
        photo="homensDeFe"
      />
      <Section tone="sand">
        <ProgramIndex items={retreats} base="/retiros" />
      </Section>
    </>
  );
}
