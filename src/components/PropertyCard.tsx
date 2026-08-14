import { Bath, BedDouble, Heart, Maximize, MapPin, Scale } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/data/properties";

export function PropertyCard({
  property,
  favorite,
  compared,
  onToggleFavorite,
  onToggleCompare,
}: {
  property: Property;
  favorite: boolean;
  compared: boolean;
  onToggleFavorite: () => void;
  onToggleCompare: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group hover-lift overflow-hidden rounded-sm border border-gold/15 bg-card"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          width={1000}
          height={750}
          className="size-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
        <span className="absolute top-4 left-4 rounded-sm border border-gold/40 bg-charcoal/70 px-3 py-1 text-[10px] tracking-[0.22em] text-gold uppercase backdrop-blur-sm">
          {property.status}
        </span>
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={favorite}
          aria-label={`Save ${property.title}`}
          className="absolute top-3.5 right-3.5 grid size-9 place-items-center rounded-full border border-gold/30 bg-charcoal/70 text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-charcoal"
        >
          <Heart className={`size-4 ${favorite ? "fill-current" : ""}`} />
        </button>
        <p className="absolute bottom-4 left-4 font-display text-2xl text-gold">{property.price}</p>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-medium text-offwhite">{property.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-gold/70" />
          <span className="truncate">{property.location}</span>
        </p>
        <div className="gold-rule my-5" />
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-offwhite/80">
          {property.beds > 0 && (
            <li className="flex items-center gap-2">
              <BedDouble className="size-4 text-gold/70" /> {property.beds} Beds
            </li>
          )}
          <li className="flex items-center gap-2">
            <Bath className="size-4 text-gold/70" /> {property.baths} Baths
          </li>
          <li className="flex items-center gap-2">
            <Maximize className="size-4 text-gold/70" /> {property.area}
          </li>
        </ul>
        <button
          type="button"
          onClick={onToggleCompare}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${
            compared
              ? "border-gold bg-gold text-charcoal"
              : "border-gold/40 text-gold hover:bg-gold hover:text-charcoal"
          }`}
        >
          <Scale className="size-3.5" />
          {compared ? "Added to compare" : "Compare"}
        </button>
      </div>
    </motion.article>
  );
}