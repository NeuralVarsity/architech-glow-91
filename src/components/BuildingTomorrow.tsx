import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aerial from "@/assets/story-aerial.jpg";
import penthouse from "@/assets/story-penthouse.jpg";
import villa from "@/assets/story-villa.jpg";
import detail from "@/assets/story-detail.jpg";
import { MaskReveal } from "./Reveal";

const chapters = [
  {
    no: "01",
    image: penthouse,
    title: "Interiors",
    line: "Rooms measured in light, not square feet.",
    text: "Every residence is planned around a view, a sightline and the hour the sun enters it. Stone, walnut and brass are specified once and detailed to the millimetre.",
  },
  {
    no: "02",
    image: villa,
    title: "Villas",
    line: "Private worlds behind a single gate.",
    text: "Limited-edition villas with pool courts, wellness pavilions and landscaping drawn by the same studio that shapes the architecture.",
  },
  {
    no: "03",
    image: detail,
    title: "Craft",
    line: "The detail is the difference.",
    text: "Brushed brass fins, unitised glass and a 240-point audit before a single key changes hands. Craft is the part you feel long after the launch.",
  },
];

/** Signature full-screen scroll-storytelling section. */
export function BuildingTomorrow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      {/* Full-screen cinematic opener */}
      <div className="relative flex min-h-[100svh] items-center overflow-hidden">
        <motion.img
          src={aerial}
          alt="Aerial view of a luxury city skyline at golden hour"
          loading="lazy"
          width={1920}
          height={1088}
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 -z-30 size-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,oklch(0.13_0.006_45/0.88),oklch(0.15_0.02_25/0.62)_45%,oklch(0.13_0.006_45/0.94))]" />
        <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[55%] spotlight animate-breathe" />
        <div className="pointer-events-none absolute inset-0 -z-10 vignette" />

        <motion.div style={{ y: titleY }} className="mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
          <p className="eyebrow">The Signature Chapter</p>
          <h2 className="mt-6 display-xl text-[clamp(2.6rem,10vw,9rem)] text-offwhite">
            <span className="block">
              <MaskReveal text="Building" />
            </span>
            <span className="block text-gold">
              <MaskReveal text="Tomorrow" delay={0.2} />
            </span>
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_auto] md:items-end">
            <p className="max-w-xl text-pretty text-base leading-relaxed text-offwhite/75 sm:text-lg">
              A skyline is a promise kept in public. For fifteen years HNR Infra has drawn, engineered and
              delivered the addresses that define how this city lives, works and invests.
            </p>
            <Link
              to="/projects"
              className="link-underline inline-flex items-center gap-3 text-[11px] tracking-[0.28em] text-gold uppercase"
            >
              Enter the portfolio
            </Link>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px gold-hairline" />
      </div>

      {/* Chapters */}
      <div className="luxe-surface-alt relative">
        <div className="pointer-events-none absolute inset-0 blueprint opacity-15" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          {chapters.map((c, i) => (
            <Chapter key={c.no} chapter={c} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  flip,
}: {
  chapter: (typeof chapters)[number];
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20 ${
        flip ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-sm border border-gold/15">
        <motion.img
          src={chapter.image}
          alt={chapter.title}
          loading="lazy"
          width={1600}
          height={1104}
          style={{ y }}
          className="h-[320px] w-full scale-110 object-cover sm:h-[460px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,oklch(0.13_0.006_45/0.75))]" />
        <span className="absolute top-5 left-5 font-display text-sm text-gold/80">{chapter.no}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{chapter.title}</p>
        <h3 className="mt-5 text-balance font-display text-3xl leading-tight text-offwhite sm:text-4xl lg:text-5xl">
          {chapter.line}
        </h3>
        <div className="gold-rule mt-7 max-w-[160px]" />
        <p className="mt-7 max-w-lg text-pretty leading-relaxed text-muted-foreground">{chapter.text}</p>
      </motion.div>
    </div>
  );
}
