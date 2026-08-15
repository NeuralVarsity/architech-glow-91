import { motion } from "framer-motion";

/** Cinematic separator: architectural line draw + drifting gold particles. */
export function SectionDivider({ label }: { label?: string }) {
  const dots = [8, 22, 37, 51, 64, 78, 91];

  return (
    <div className="relative isolate overflow-hidden py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--charcoal),transparent_18%,transparent_82%,var(--charcoal))]" />

      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-gold/60"
        />
        <motion.span
          initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
          whileInView={{ opacity: 1, rotate: 45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="size-2.5 border border-gold/70"
        />
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-[10px] tracking-[0.42em] text-gold/70 uppercase"
          >
            {label}
          </motion.span>
        )}
        <motion.span
          initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
          whileInView={{ opacity: 1, rotate: 45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="size-2.5 border border-gold/70"
        />
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-gold/60"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        {dots.map((left, i) => (
          <span
            key={left}
            className="absolute bottom-2 size-[3px] rounded-full bg-gold/70"
            style={{
              left: `${left}%`,
              animation: `hnr-drift ${7 + (i % 4) * 2.4}s linear ${i * 0.9}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}