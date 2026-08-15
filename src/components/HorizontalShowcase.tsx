import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

/** GSAP-driven horizontal scroll storytelling rail for the project portfolio. */
export function HorizontalShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrap.current || !track.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 96;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current!,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      }, wrap);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={wrap}
      className="luxe-surface relative isolate overflow-hidden border-y border-gold/15 py-20 lg:h-screen lg:py-0"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-25" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 spotlight animate-breathe" />
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="eyebrow">The Portfolio Rail</p>
          <h2 className="mt-4 max-w-2xl text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Scroll through the <span className="text-gold-gradient">collection</span>.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Six addresses, each with its own investment story — yields, scale and delivery dates, in full view.
          </p>
        </div>

        <div
          ref={track}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:gap-8 sm:px-8 lg:gap-10 lg:overflow-visible lg:pb-0"
        >
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="group relative flex h-[440px] w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-gold/15 bg-charcoal/60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-gold/45 hover:shadow-[0_28px_70px_-30px_oklch(0.79_0.129_87/0.45)] sm:h-[470px] sm:w-[calc((100%-2rem)/2)] lg:h-[500px] lg:w-[calc((min(100vw,80rem)-4rem-5rem)/3)]"
            >
              {/* Image — the focal point (~63% of card) */}
              <div className="relative h-[63%] shrink-0 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
                <span className="absolute top-4 left-5 font-display text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.highlight && (
                  <span className="luxe-glass absolute top-4 right-4 max-w-[70%] truncate rounded-sm px-2.5 py-1 text-[9px] tracking-[0.18em] text-gold uppercase">
                    {p.highlight}
                  </span>
                )}
              </div>

              {/* Compact editorial information panel */}
              <div className="flex min-h-0 flex-1 flex-col justify-between px-5 pt-4 pb-5">
                <div className="min-w-0">
                  <p className="text-[9px] tracking-[0.28em] text-gold/85 uppercase">
                    {p.category} · {p.status}
                  </p>
                  <h3 className="mt-1.5 truncate font-display text-xl leading-tight text-offwhite">
                    {p.name}
                  </h3>
                  <p className="mt-1 truncate text-[10px] tracking-[0.16em] text-muted-foreground/80 uppercase">
                    {p.location}
                  </p>
                  {p.metrics && (
                    <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] tracking-[0.12em] text-offwhite/70 uppercase">
                      {p.metrics.map((m, mi) => (
                        <span key={m.label} className="flex items-center gap-2">
                          {mi > 0 && <span className="text-gold/40">•</span>}
                          <span>
                            <span className="text-gold">{m.value}</span> {m.label}
                          </span>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-gold/15 pt-3">
                  <span className="font-display text-sm text-offwhite/85">{p.price}</span>
                  <Link
                    to="/projects"
                    className="link-underline inline-flex shrink-0 items-center gap-1.5 text-[10px] tracking-[0.2em] text-gold uppercase"
                  >
                    View <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}