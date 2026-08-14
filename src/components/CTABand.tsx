import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function CTABand() {
  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-[image:var(--gradient-maroon)] px-5 py-20 sm:px-8">
      <div className="grid-arch absolute inset-0 opacity-25" />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow">Private Consultation</p>
        <h2 className="mt-4 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Let's discuss your next <span className="text-gold-gradient">address</span>.
        </h2>
        <p className="mt-5 text-pretty text-muted-foreground">
          Our advisory team walks you through inventory, payment structures and construction timelines — with no
          obligation.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-sm bg-gold px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-charcoal uppercase transition-transform duration-400 hover:scale-105"
          >
            Schedule Consultation
          </Link>
          <Link
            to="/projects"
            className="rounded-sm border border-gold/50 px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-gold uppercase transition-colors duration-400 hover:bg-gold hover:text-charcoal"
          >
            View Projects
          </Link>
        </div>
      </Reveal>
    </section>
  );
}