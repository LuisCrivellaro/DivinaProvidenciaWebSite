import type { Metadata } from "next";
import { ButtonLink, PageHeader, Section } from "@/components/ui";
import { VideoFacade } from "@/components/VideoFacade";
import { topicLabel, videos, youtubeChannel, type Video } from "@/content/videos";
import { fullDate } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Vídeos",
  description: "Missas, Cerco de Jericó, Divina Jovem e Divinacast no canal da Comunidade Divina Providência no YouTube.",
  alternates: { canonical: "/videos" },
};

const order: Video["topic"][] = ["missa", "oracao", "divina-jovem", "obras", "divinacast"];

export default function Page() {
  const [featured] = videos;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Vídeos" }]}
        lead="Vídeos"
        accent="da comunidade."
        intro="Seleção do canal oficial no YouTube. Os vídeos só carregam quando você aperta o play."
      >
        <ButtonLink href={youtubeChannel}>Abrir o canal no YouTube</ButtonLink>
      </PageHeader>
      <Section tone="sand" className="!pt-14">
        <VideoFacade id={featured.id} title={featured.title} priority />
        {order.map((topic) => {
          const list = videos.filter((v) => v.topic === topic && v.id !== featured.id);
          if (!list.length) return null;
          return (
            <section key={topic} aria-labelledby={`t-${topic}`} className="mt-20">
              <h2 id={`t-${topic}`} className="font-display text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]">{topicLabel[topic]}</h2>
              <ul className="mt-8 grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3" data-reveal-stagger="">
                {list.map((v) => (
                  <li key={v.id}>
                    <VideoFacade id={v.id} title={v.title} />
                    <p className="mt-3 text-sm text-ink-soft">Publicado em {fullDate(v.date)}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Section>
    </>
  );
}
