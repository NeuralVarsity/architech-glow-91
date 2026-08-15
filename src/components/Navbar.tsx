import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled || open
          ? "luxe-glass border-b border-gold/20 shadow-[0_20px_50px_-30px_oklch(0.05_0_0)] backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold/40 via-gold to-gold-soft"
      />
      <nav className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8">
        <div className="min-w-0 overflow-hidden">
          <Logo />
        </div>

        <div className="hidden items-center gap-7 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative text-[13px] font-medium tracking-[0.14em] text-offwhite/70 uppercase transition-colors hover:text-gold data-[status=active]:text-gold"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-400 group-hover:origin-left group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-sm border border-gold/60 px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase transition-all duration-400 hover:bg-gold hover:text-charcoal"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid size-10 shrink-0 place-items-center rounded-sm border border-gold/30 text-gold xl:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gold/10 bg-charcoal/95 xl:hidden"
          >
            <ul className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="block border-b border-border/40 py-3.5 text-sm tracking-[0.18em] text-offwhite/80 uppercase data-[status=active]:text-gold"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}