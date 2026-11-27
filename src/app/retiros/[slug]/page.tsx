import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramDetail } from "@/components/ProgramDetail";
import { retreats } from "@/content/programs";

export function generateStaticParams() {
  return retreats.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/retiros/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = retreats.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: c.name, description: `${c.short} ${c.intro[0]}`, alternates: { canonical: `/retiros/${slug}` } };
}

export default async function Page({ params }: PageProps<"/retiros/[slug]">) {
  const { slug } = await params;
  const c = retreats.find((x) => x.slug === slug);
  if (!c) notFound();
  return <ProgramDetail program={c} parent={{ label: "Retiros e formação", href: "/retiros" }} />;
}
