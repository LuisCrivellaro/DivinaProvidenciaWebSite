import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { ProgramIndex } from "@/components/ProgramIndex";
import { camps } from "@/content/programs";

export const metadata: Metadata = {
  title: "Acampamentos",
  description: "Acampamentos Mirim, Juvenil, FAC, Sênior e de Casais da Comunidade Divina Providência, em Rondonópolis (MT).",
  alternates: { canonical: "/acampamentos" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Acampamentos" }]}
        lead="Acampamentos"
        accent="para cada idade."
        intro="Os acampamentos estão no centro da evangelização da comunidade. Há acampamentos para crianças, adolescentes, jovens, adultos e casais, e quem acampa pode continuar o caminho nos grupos de oração."
        photo="seniorRoda"
      />
      <Section tone="sand">
        <ProgramIndex items={camps} base="/acampamentos" />
      </Section>
    </>
  );
}
