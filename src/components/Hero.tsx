import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { MaskReveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { LazyScene } from "./three/LazyScene";
import heroFallback from "@/assets/hero-skyline.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <LazyScene name="city" className="absolute inset-0 -z-20 opacity-90" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,transparent,oklch(0.13_0.004_60/0.88))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 noise-overlay" />
      <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-[0.18]" />

      <motion.div style={{ y, opacity, scale }} className="mx-auto w-full max-w-7xl px-5 pt-28 pb-24 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="eyebrow flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gold/60" />
          HNR Infra · Building Tomorrow
        </motion.p>

        <h1 className="display-xl mt-7 max-w-5xl text-balance text-[2.6rem] tracking-[0.01em] sm:text-6xl lg:text-[5.4rem]">
          <span className="block">
            <MaskReveal text="Building Tomorrow's" />
          </span>
          <span className="mt-1 block">
            <MaskReveal text="Landmarks" delay={0.34} />{" "}
            <span className="text-gold italic">
              <MaskReveal text="Today" delay={0.48} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="mt-9 max-w-xl text-pretty text-base leading-[1.9] tracking-wide text-muted-foreground sm:text-[1.05rem]"
        >
          Crafting premium residential, commercial and mixed-use developments with world-class design and
          uncompromising quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <MagneticButton to="/projects">Explore Projects</MagneticButton>
          <MagneticButton to="/contact" variant="ghost">
            Schedule Consultation
          </MagneticButton>
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