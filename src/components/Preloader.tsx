import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/hnr-logo.png.asset.json";

const DURATION = 2200;

export function Preloader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 2.4))));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-charcoal"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="pointer-events-none absolute inset-0 blueprint opacity-30" />
          <div className="pointer-events-none absolute inset-0 aurora opacity-40" />

          {/* golden architectural lines drawing in */}
          {[18, 38, 62, 82].map((top, i) => (
            <motion.span
              key={top}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ top: `${top}%` }}
              className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent ${
                i % 2 ? "origin-right" : "origin-left"
              }`}
            />
          ))}

          <div className="relative text-center">
            <motion.span
              role="img"
              aria-label="HNR Infra emblem"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundImage: `url(${logo.url})`,
                backgroundSize: "260% auto",
                backgroundPosition: "50% 24%",
              }}
              className="mx-auto block size-20 rounded-sm bg-charcoal ring-1 ring-gold/40 sm:size-24"
            />
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.7em" }}
              animate={{ opacity: 1, letterSpacing: "0.34em" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-xl font-semibold text-offwhite sm:text-2xl"
            >
              HNR INFRA
            </motion.p>

            <div className="mx-auto mt-8 h-px w-64 overflow-hidden bg-border sm:w-80">
              <div
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 transition-[width] duration-150 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-4">
              <span className="text-[10px] tracking-[0.42em] text-gold/70 uppercase">Building Tomorrow</span>
              <span className="font-display text-sm tabular-nums text-gold">{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}