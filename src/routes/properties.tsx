import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import heroImg from "@/assets/prop-2.jpg";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { PropertyCard } from "@/components/PropertyCard";
import { CTABand } from "@/components/CTABand";
import { properties, propertyStatuses, propertyTypes } from "@/data/properties";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties for Sale — HNR Infra Luxury Listings" },
      {
        name: "description",
        content:
          "Browse HNR Infra luxury apartments, penthouses, villas and offices in Hyderabad with pricing, layouts and availability.",
      },
      { property: "og:title", content: "Properties for Sale — HNR Infra Luxury Listings" },
      {
        property: "og:description",
        content: "Apartments, penthouses, villas and offices across Hyderabad's most sought-after addresses.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [type, setType] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  const list = useMemo(
    () =>
      properties.filter(
        (p) => (type === "All" || p.type === type) && (status === "All" || p.status === status),
      ),
    [type, status],
  );

  const compared = properties.filter((p) => compare.includes(p.id));

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  return (
    <>
      <PageHero
        eyebrow="Property Listings"
        title="Homes and offices, ready for their next chapter."
        intro="Filter live inventory across our portfolio, shortlist your favourites and compare layouts side by side."
        image={heroImg}
      />

      <Section>
        <div className="glass-panel grid gap-6 rounded-sm p-6 sm:p-8 lg:grid-cols-2">
          <FilterRow label="Property Type" options={[...propertyTypes]} value={type} onChange={setType} />
          <FilterRow label="Availability" options={[...propertyStatuses]} value={status} onChange={setStatus} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs tracking-[0.18em] text-muted-foreground uppercase">
          <p>
            {list.length} {list.length === 1 ? "property" : "properties"}
          </p>
          <p>
            {favorites.length} saved · {compare.length} in comparison
          </p>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                favorite={favorites.includes(p.id)}
                compared={compare.includes(p.id)}
                onToggleFavorite={() => toggle(favorites, setFavorites, p.id)}
                onToggleCompare={() => toggle(compare, setCompare, p.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        {compared.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl">Comparison</h2>
            <div className="gold-rule my-5 max-w-[140px]" />
            <div className="overflow-x-auto rounded-sm border border-gold/15">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-burgundy/30 text-[10px] tracking-[0.22em] text-gold uppercase">
                  <tr>
                    {["Property", "Price", "Beds", "Baths", "Area", "Status"].map((h) => (
                      <th key={h} className="px-5 py-4 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compared.map((p) => (
                    <tr key={p.id} className="border-t border-border/60 text-offwhite/85">
                      <td className="px-5 py-4 font-medium text-offwhite">{p.title}</td>
                      <td className="px-5 py-4 text-gold">{p.price}</td>
                      <td className="px-5 py-4">{p.beds || "—"}</td>
                      <td className="px-5 py-4">{p.baths}</td>
                      <td className="px-5 py-4">{p.area}</td>
                      <td className="px-5 py-4">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Section>

      <CTABand />
    </>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.26em] text-gold uppercase">{label}</p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-sm border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors duration-400 ${
              value === o
                ? "border-gold bg-gold text-charcoal"
                : "border-gold/25 text-offwhite/70 hover:border-gold hover:text-gold"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}