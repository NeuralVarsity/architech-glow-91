import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1650);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-charcoal"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.28em" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl font-bold text-offwhite sm:text-3xl"
            >
              HNR INFRA
            </motion.p>
            <div className="mx-auto mt-6 h-px w-56 overflow-hidden bg-border">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-gold"
              />
            </div>
            <p className="mt-5 text-[10px] tracking-[0.42em] text-gold/70 uppercase">Building Tomorrow</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}