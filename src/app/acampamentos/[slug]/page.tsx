import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramDetail } from "@/components/ProgramDetail";
import { camps } from "@/content/programs";

export function generateStaticParams() {
  return camps.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/acampamentos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = camps.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: c.name, description: `${c.short} ${c.intro[0]}`, alternates: { canonical: `/acampamentos/${slug}` } };
}

export default async function Page({ params }: PageProps<"/acampamentos/[slug]">) {
  const { slug } = await params;
  const c = camps.find((x) => x.slug === slug);
  if (!c) notFound();
  return <ProgramDetail program={c} parent={{ label: "Acampamentos", href: "/acampamentos" }} />;
}
