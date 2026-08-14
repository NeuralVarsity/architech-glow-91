import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";
import heroImg from "@/assets/project-2.jpg";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { WhyChoose } from "@/components/WhyChoose";
import { TimelineSection } from "@/components/TimelineSection";
import { CTABand } from "@/components/CTABand";
import { stats } from "@/data/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HNR Infra — Fifteen Years of Building Tomorrow" },
      {
        name: "description",
        content:
          "HNR Infra is a Hyderabad-based developer of premium residential, commercial and mixed-use landmarks, with 25+ delivered projects and 2M+ sq.ft built.",
      },
      { property: "og:title", content: "About HNR Infra — Fifteen Years of Building Tomorrow" },
      {
        property: "og:description",
        content: "25+ projects, 15+ years and 2 million sq.ft of premium development across India.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About HNR Infra"
        title="A development house built on craft, not volume."
        intro="HNR Infra is a forward-thinking real estate development company committed to creating exceptional spaces that redefine modern living and business environments."
        image={heroImg}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal direction="left">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
              Buildings that earn their place on the <span className="text-gold-gradient">skyline</span>.
            </h2>
            <div className="gold-rule my-6 max-w-[140px]" />
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Since 2010 we have developed residential, commercial and mixed-use addresses across Hyderabad — each
                one drawn by leading design studios, engineered in-house, and delivered on the date we committed to.
              </p>
              <p>
                Our teams stay small and accountable. Land is acquired years before a corridor matures, materials are
                specified from the outset, and every project passes a 240-point quality audit before a single key is
                handed over.
              </p>
              <p>
                The result is a portfolio that holds its value — and residents and occupiers who come back to us for
                their second and third address.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" className="relative">
            <div className="absolute -inset-3 -z-10 border border-gold/25" />
            <img
              src={aboutImg}
              alt="HNR Infra architects reviewing project drawings"
              loading="lazy"
              width={1000}
              height={1200}
              className="w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-10 text-center">
              <p className="font-display text-4xl text-gold sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[11px] tracking-[0.24em] text-muted-foreground uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[oklch(0.14_0.004_60)]">
        <SectionHeading
          eyebrow="Why HNR Infra"
          title={<>Six reasons owners choose us — <span className="text-gold-gradient">twice</span>.</>}
          align="center"
        />
        <WhyChoose />
      </Section>

      <TimelineSection />
      <CTABand />
    </>
  );
}