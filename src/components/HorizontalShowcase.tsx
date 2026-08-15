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
          className="mt-10 flex gap-6 overflow-x-auto px-5 pb-4 sm:px-8 lg:overflow-visible lg:pb-0"
        >
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="group relative h-[460px] w-[78vw] shrink-0 overflow-hidden rounded-sm border border-gold/15 zoom-cinematic sm:w-[440px] lg:h-[520px] lg:w-[560px]"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/35 to-transparent" />
              <span className="absolute top-5 left-5 font-display text-sm text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.highlight && (
                <span className="luxe-glass absolute top-5 right-5 rounded-sm px-3 py-1.5 text-[10px] tracking-[0.2em] text-gold uppercase">
                  {p.highlight}
                </span>
              )}
              <div className="absolute inset-x-4 bottom-4">
                <div className="luxe-glass rounded-sm p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
                  <p className="text-[10px] tracking-[0.3em] text-gold uppercase">
                    {p.category} · {p.status}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-offwhite">{p.name}</h3>
                  <p className="mt-1 text-xs tracking-[0.14em] text-muted-foreground uppercase">{p.location}</p>
                  {p.metrics && (
                    <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-sm bg-gold/15">
                      {p.metrics.map((m) => (
                        <div key={m.label} className="bg-charcoal/70 px-2 py-3 text-center">
                          <dt className="sr-only">{m.label}</dt>
                          <dd className="font-display text-lg text-gold">{m.value}</dd>
                          <p className="mt-1 text-[9px] tracking-[0.18em] text-muted-foreground uppercase">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="font-display text-sm text-offwhite/85">{p.price}</span>
                    <Link
                      to="/projects"
                      className="link-underline inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-gold uppercase"
                    >
                      View project <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}