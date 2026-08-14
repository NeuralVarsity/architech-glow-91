import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/prop-4.jpg";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";
import { benefits, culture, openings } from "@/data/content";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at HNR Infra — Build Landmarks With Us" },
      {
        name: "description",
        content:
          "Open roles at HNR Infra for project managers, site engineers, architects, sales and marketing professionals in Hyderabad and Bengaluru.",
      },
      { property: "og:title", content: "Careers at HNR Infra — Build Landmarks With Us" },
      {
        property: "og:description",
        content: "Small teams, real authority and buildings judged by how they age. See our open positions.",
      },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build things that outlast the people who built them."
        intro="We hire small teams of people who care about detail, and give them the authority to see a building through from sketch to handover."
        image={heroImg}
      />

      <Section>
        <SectionHeading
          eyebrow="Why Join Us"
          title={<>A studio culture inside a <span className="text-gold-gradient">development</span> company.</>}
          intro="No layers between you and the decision. No projects too large to know by heart."
        />
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {culture.map((c) => (
            <StaggerItem key={c.title}>
              <article className="h-full rounded-sm border border-gold/15 bg-card p-8">
                <h3 className="text-lg font-medium text-offwhite">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-[oklch(0.14_0.004_60)]">
        <SectionHeading eyebrow="Open Positions" title="Roles we are hiring for right now." />
        <div className="mt-12 overflow-hidden rounded-sm border border-gold/15">
          {openings.map((o) => (
            <Reveal key={o.role}>
              <article className="group grid gap-4 border-b border-border/60 bg-card px-6 py-7 transition-colors duration-500 last:border-b-0 hover:bg-burgundy/25 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:px-8">
                <div className="min-w-0">
                  <h3 className="text-lg font-medium text-offwhite">{o.role}</h3>
                  <p className="mt-1 text-xs tracking-[0.18em] text-gold/80 uppercase">{o.dept}</p>
                </div>
                <p className="text-sm text-muted-foreground">{o.location}</p>
                <p className="text-sm text-muted-foreground">
                  {o.type} · {o.exp}
                </p>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-sm border border-gold/45 px-6 py-2.5 text-[11px] tracking-[0.2em] text-gold uppercase transition-colors duration-400 hover:bg-gold hover:text-charcoal"
                >
                  Apply <ArrowUpRight className="size-3.5" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Benefits" title="What we offer in return." align="center" />
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <article className="hover-lift h-full rounded-sm border border-gold/15 bg-card p-7">
                <h3 className="text-base font-medium text-offwhite">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CTABand />
    </>
  );
}