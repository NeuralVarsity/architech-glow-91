import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { stats } from "@/data/content";

export function LuxuryMetrics() {
  return (
    <section className="luxe-surface relative isolate overflow-hidden border-y border-gold/15 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-20 aurora opacity-55" />
      <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 spotlight animate-breathe" />
      <div className="pointer-events-none absolute inset-0 -z-10 noise-overlay" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow text-center"
        >
          By The Numbers
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-3xl text-balance text-center text-3xl leading-tight sm:text-4xl lg:text-5xl"
        >
          A record measured in <span className="text-gold-gradient">decades</span>, not launches.
        </motion.h2>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: [44, -6, 0] }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="luxe-glass group relative overflow-hidden rounded-sm px-6 py-14 text-center transition-shadow duration-700 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_35%,transparent),0_40px_90px_-45px_color-mix(in_oklab,var(--gold)_60%,transparent)]"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 gold-hairline transition-transform duration-700 group-hover:scale-x-100" />
              <span className="pointer-events-none absolute -inset-x-10 -bottom-24 h-40 opacity-0 spotlight rotate-180 transition-opacity duration-700 group-hover:opacity-100" />
              <p className="display-xl text-5xl text-gold-gradient sm:text-6xl lg:text-7xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-5 text-[10px] leading-snug tracking-[0.34em] text-offwhite/60 uppercase transition-colors duration-700 group-hover:text-gold/80">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}