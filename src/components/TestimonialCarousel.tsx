import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/data/content";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[index]!;

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative mt-14">
      <div className="luxe-glass relative overflow-hidden rounded-sm px-6 py-12 shadow-[0_50px_100px_-40px_oklch(0.13_0.004_60/0.95)] sm:px-14">
        <div className="pointer-events-none absolute inset-0 blueprint opacity-20" />
        <div className="pointer-events-none absolute -top-24 right-0 h-56 w-1/2 spotlight animate-breathe" />
        <Quote className="absolute top-6 right-8 size-16 text-gold/10" />
        <AnimatePresence mode="wait" custom={dir}>
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-9 md:grid-cols-[auto_1fr] md:items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-40 shrink-0 justify-self-start overflow-hidden rounded-sm border border-gold/25 sm:w-48"
            >
              <img
                src={t.portrait}
                alt={t.name}
                loading="lazy"
                width={640}
                height={640}
                className="aspect-square w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,oklch(0.13_0.006_45/0.75))]" />
            </motion.div>

            <div>
            <p className="max-w-3xl text-pretty font-display text-xl leading-relaxed text-offwhite sm:text-2xl">
              “{t.quote}”
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-burgundy font-display text-xs text-gold">
                {t.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-offwhite">{t.name}</span>
                <span className="block truncate text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  {t.role}
                </span>
                <span className="mt-1 block truncate text-[10px] tracking-[0.22em] text-gold/80 uppercase">
                  {t.property}
                </span>
              </span>
            </footer>
            </div>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-px w-10 transition-colors ${i === index ? "bg-gold" : "bg-border"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <CarouselBtn label="Previous testimonial" onClick={() => go(-1)}>
            <ChevronLeft className="size-4" />
          </CarouselBtn>
          <CarouselBtn label="Next testimonial" onClick={() => go(1)}>
            <ChevronRight className="size-4" />
          </CarouselBtn>
        </div>
      </div>
    </div>
  );
}

function CarouselBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-sm border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-charcoal"
    >
      {children}
    </button>
  );
}