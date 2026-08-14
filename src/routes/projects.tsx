import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/project-1.jpg";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { CTABand } from "@/components/CTABand";
import { projects } from "@/data/projects";

const filters = ["All", "Residential", "Commercial", "Mixed-Use"] as const;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — HNR Infra Landmark Developments" },
      {
        name: "description",
        content:
          "Explore HNR Infra's residential, commercial and mixed-use landmarks including Sky Residences, Grand Towers and Elite Business Park.",
      },
      { property: "og:title", content: "Projects — HNR Infra Landmark Developments" },
      {
        property: "og:description",
        content: "Six premium developments across Hyderabad, from sky residences to Grade-A business parks.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Featured Projects"
        title="Landmarks that define the skyline they join."
        intro="A portfolio of residential, commercial and mixed-use developments — each designed, engineered and delivered in-house."
        image={heroImg}
      />

      <Section>
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-sm border px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors duration-400 ${
                filter === f
                  ? "border-gold bg-gold text-charcoal"
                  : "border-gold/25 text-offwhite/70 hover:border-gold hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}