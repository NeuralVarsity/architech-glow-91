import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { TextReveal } from "./Reveal";
import { LazyScene } from "./three/LazyScene";
import heroFallback from "@/assets/hero-skyline.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroFallback}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 -z-30 size-full object-cover opacity-50"
      />
      <LazyScene name="city" className="absolute inset-0 -z-20 opacity-85" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,transparent,oklch(0.13_0.004_60/0.85))]" />

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="eyebrow"
        >
          HNR Infra · Building Tomorrow
        </motion.p>

        <h1 className="mt-6 max-w-5xl text-balance text-4xl font-medium leading-[1.04] sm:text-6xl lg:text-7xl">
          <TextReveal text="Building Tomorrow's Landmarks" />
          <span className="block text-gold-gradient">
            <TextReveal text="Today" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Crafting premium residential, commercial and mixed-use developments with world-class design and
          uncompromising quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-11 flex flex-wrap gap-4"
        >
          <Link
            to="/projects"
            className="rounded-sm bg-gold px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-charcoal uppercase transition-transform duration-400 hover:scale-105"
          >
            Explore Projects
          </Link>
          <Link
            to="/contact"
            className="rounded-sm border border-gold/50 px-8 py-4 text-[11px] font-semibold tracking-[0.22em] text-gold uppercase transition-colors duration-400 hover:bg-gold hover:text-charcoal"
          >
            Schedule Consultation
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-gold/70"
      >
        <span className="text-[10px] tracking-[0.32em] uppercase">Scroll</span>
        <ChevronDown className="size-4 animate-bounce" />
      </motion.div>
    </section>
  );
}