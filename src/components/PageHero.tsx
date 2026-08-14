import { motion } from "framer-motion";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
}) {
  return (
    <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden pt-28 pb-14">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 size-full object-cover opacity-45"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-veil)" }}
      />
      <div className="grid-arch absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl text-balance text-4xl font-medium leading-[1.06] sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground"
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}