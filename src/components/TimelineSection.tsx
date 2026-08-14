import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/data/content";
import { Section, SectionHeading } from "./Section";

export function TimelineSection() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hnr-timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: { trigger: ".hnr-timeline", start: "top 70%", end: "bottom 75%", scrub: 0.5 },
        },
      );
      gsap.utils.toArray<HTMLElement>(".hnr-milestone").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <Section className="relative">
        <SectionHeading
          eyebrow="Our Journey"
          title={<>Fifteen years, one <span className="text-gold-gradient">standard</span>.</>}
          intro="From a single studio in Hyderabad to a national development platform — the milestones that shaped HNR Infra."
          align="center"
        />

        <div className="hnr-timeline relative mt-16 pl-8 sm:pl-0">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-border sm:left-1/2 sm:-translate-x-1/2">
            <div className="hnr-timeline-line h-full w-full bg-gold" />
          </div>

          <ol className="space-y-12">
            {timeline.map((m, i) => (
              <li
                key={m.year}
                className={`hnr-milestone relative sm:grid sm:grid-cols-2 sm:gap-14 ${
                  i % 2 === 0 ? "" : "sm:[&>div:first-child]:col-start-2"
                }`}
              >
                <div className={i % 2 === 0 ? "sm:text-right" : ""}>
                  <div className="glass-panel rounded-sm p-6">
                    <p className="font-display text-3xl text-gold">{m.year}</p>
                    <h3 className="mt-2 text-lg font-medium text-offwhite">{m.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                  </div>
                </div>
                <span className="absolute top-8 -left-8 size-3.5 rounded-full border border-gold bg-charcoal sm:left-1/2 sm:-translate-x-1/2" />
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}