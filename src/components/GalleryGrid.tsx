import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import r1 from "@/assets/prop-1.jpg";
import r3 from "@/assets/prop-3.jpg";

export const galleryImages = [
  { src: g1, caption: "Imperial Heights — Arrival Lobby" },
  { src: p2, caption: "Grand Towers — Sky Bridge" },
  { src: r1, caption: "Sky Residences — Living Room" },
  { src: g2, caption: "Facade Study — Gold Anodised Panels" },
  { src: p1, caption: "Sky Residences — Elevation at Dusk" },
  { src: g3, caption: "Grand Towers — Rooftop Infinity Deck" },
  { src: p3, caption: "Elite Business Park — Central Court" },
  { src: r3, caption: "Golden Avenue — Villa Collection" },
  { src: p4, caption: "Imperial Heights — Detailing" },
  { src: p5, caption: "Golden Avenue — Retail Promenade" },
];

export function GalleryGrid({ limit }: { limit?: number }) {
  const items = limit ? galleryImages.slice(0, limit) : galleryImages;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((img, i) => (
          <motion.button
            key={img.caption}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-sm border border-gold/15 text-left"
          >
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              className="w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-charcoal/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-sm tracking-[0.12em] text-offwhite uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {img.caption}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-charcoal/95 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute top-6 right-6 grid size-11 place-items-center rounded-sm border border-gold/40 text-gold"
              onClick={() => setActive(null)}
            >
              <X className="size-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[86vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={items[active]!.src}
                alt={items[active]!.caption}
                className="max-h-[76vh] w-full rounded-sm object-contain"
              />
              <figcaption className="mt-4 text-center text-xs tracking-[0.24em] text-gold uppercase">
                {items[active]!.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}