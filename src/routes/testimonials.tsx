import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/gallery-1.jpg";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";
import { CTABand } from "@/components/CTABand";
import { testimonials } from "@/data/content";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials — HNR Infra" },
      {
        name: "description",
        content:
          "Homeowners, investors and corporate occupiers on what it is like to buy, lease and partner with HNR Infra.",
      },
      { property: "og:title", content: "Client Testimonials — HNR Infra" },
      {
        property: "og:description",
        content: "Reviews from homeowners, private investors and corporate buyers across our portfolio.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="The people who live and work in what we build."
        intro="Homeowners, private investors and corporate occupiers on the experience of partnering with HNR Infra."
        image={heroImg}
      />

      <Section>
        <SectionHeading
          eyebrow="In Their Words"
          title={<>Trusted across <span className="text-gold-gradient">5,000+</span> families and firms.</>}
          align="center"
        />
        <TestimonialCarousel />

        <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <article className="hover-lift h-full rounded-sm border border-gold/15 bg-card p-7">
                <p className="text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
                <div className="gold-rule my-6" />
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 bg-burgundy font-display text-xs text-gold">
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-offwhite">{t.name}</p>
                    <p className="truncate text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{t.role}</p>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CTABand />
    </>
  );
}