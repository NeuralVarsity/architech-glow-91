import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/project-3.jpg";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WhyChoose } from "@/components/WhyChoose";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Development, Investment & Consulting | HNR Infra" },
      {
        name: "description",
        content:
          "Residential and commercial development, property investment advisory, construction management, land development and consulting from HNR Infra.",
      },
      { property: "og:title", content: "Services — Development, Investment & Consulting | HNR Infra" },
      {
        property: "og:description",
        content: "Six practice areas covering the full lifecycle of a real estate asset.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Six practices. One accountable team."
        intro="From land assembly to leasing, we hold every stage of the development lifecycle in-house — so nothing is lost between hand-offs."
        image={heroImg}
      />

      <Section>
        <SectionHeading
          eyebrow="What We Do"
          title={<>Full-lifecycle real estate <span className="text-gold-gradient">expertise</span>.</>}
        />
        <ServicesGrid />
      </Section>

      <Section className="bg-[oklch(0.14_0.004_60)]">
        <SectionHeading
          eyebrow="Why HNR Infra"
          title={<>The standards behind every engagement.</>}
          align="center"
        />
        <WhyChoose />
      </Section>

      <CTABand />
    </>
  );
}