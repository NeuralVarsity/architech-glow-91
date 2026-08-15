import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import aboutImg from "@/assets/about.jpg";
import { Hero } from "@/components/Hero";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ProjectCard } from "@/components/ProjectCard";
import { WhyChoose } from "@/components/WhyChoose";
import { ServicesGrid } from "@/components/ServicesGrid";
import { GalleryGrid } from "@/components/GalleryGrid";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TimelineSection } from "@/components/TimelineSection";
import { CTABand } from "@/components/CTABand";
import { BuildingTomorrow } from "@/components/BuildingTomorrow";
import { LuxuryMetrics } from "@/components/LuxuryMetrics";
import { HorizontalShowcase } from "@/components/HorizontalShowcase";
import { SectionDivider } from "@/components/SectionDivider";
import { LazyScene } from "@/components/three/LazyScene";
import { projects } from "@/data/projects";
import { stats } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HNR Infra — Premium Real Estate Developer, Hyderabad" },
      {
        name: "description",
        content:
          "HNR Infra builds premium residential, commercial and mixed-use landmarks in Hyderabad. 25+ projects, 15+ years and 2 million sq.ft delivered.",
      },
      { property: "og:title", content: "HNR Infra — Building Tomorrow's Landmarks Today" },
      {
        property: "og:description",
        content:
          "Premium residential, commercial and mixed-use developments with world-class design and uncompromising quality.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />

      <LuxuryMetrics />

      <Section id="about">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About HNR Infra"
              title={<>Spaces that redefine modern <span className="text-gold-gradient">living</span>.</>}
              intro="HNR Infra is a forward-thinking real estate development company committed to creating exceptional spaces that redefine modern living and business environments."
            />
            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-gold/15 bg-gold/15 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-card px-4 py-7 text-center">
                    <p className="font-display text-3xl text-gold">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-[10px] leading-snug tracking-[0.18em] text-muted-foreground uppercase">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <Link
                to="/about"
                className="mt-9 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-gold uppercase transition-colors hover:text-gold-soft"
              >
                Our story <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <Reveal direction="right" className="relative">
            <div className="absolute -inset-3 -z-10 border border-gold/25" />
            <img
              src={aboutImg}
              alt="HNR Infra design team reviewing architectural drawings"
              loading="lazy"
              width={1000}
              height={1200}
              className="w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>
      </Section>

      <SectionDivider />

      <BuildingTomorrow />

      <HorizontalShowcase />

      <Section className="luxe-surface-alt relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 spotlight" />
        <SectionHeading
          eyebrow="Featured Projects"
          title={<>Six addresses. One uncompromising <span className="text-gold-gradient">standard</span>.</>}
          intro="Residential towers, business parks and mixed-use promenades — designed, engineered and delivered in-house."
        />
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </Section>

      <Section className="luxe-surface relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-arch opacity-25" />
        <SectionHeading
          eyebrow="Why Choose HNR Infra"
          title={<>The difference is in what you cannot see.</>}
          align="center"
        />
        <WhyChoose />
      </Section>

      <section className="luxe-surface-alt relative overflow-hidden border-y border-gold/15">
        <div className="grid-arch absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 aurora opacity-50" />
        <div className="pointer-events-none absolute inset-0 noise-overlay" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
          <Reveal direction="left">
            <p className="eyebrow">3D Architecture Showcase</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Explore the <span className="text-gold-gradient">massing</span> before the first stone.
            </h2>
            <div className="gold-rule my-6 max-w-[140px]" />
            <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
              Every HNR tower is modelled, daylight-tested and walked through in three dimensions long before
              construction begins. Drag the model to orbit the massing study.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-offwhite/80">
              {["Gold illuminated edge study", "Tiered setback massing", "Mouse-controlled camera"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-1 rounded-full bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <LazyScene name="tower" className="h-[380px] w-full sm:h-[520px]" />
        </div>
      </section>

      <Section className="luxe-surface relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-15" />
        <SectionHeading
          eyebrow="Our Services"
          title={<>End-to-end, from land to <span className="text-gold-gradient">handover</span>.</>}
        />
        <ServicesGrid />
      </Section>

      <Section className="luxe-surface-alt relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 aurora opacity-40" />
        <SectionHeading eyebrow="Gallery" title="A closer look at the craft." align="center" />
        <GalleryGrid limit={6} />
        <Reveal className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-gold uppercase hover:text-gold-soft"
          >
            View full gallery <ArrowUpRight className="size-4" />
          </Link>
        </Reveal>
      </Section>

      <Section className="luxe-surface relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 spotlight animate-breathe" />
        <SectionHeading
          eyebrow="Testimonials"
          title={<>Owners, investors and occupiers.</>}
          align="center"
        />
        <TestimonialCarousel />
      </Section>

      <TimelineSection />
      <CTABand />
    </>
  );
}
