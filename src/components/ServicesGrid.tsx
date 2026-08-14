import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import { StaggerGroup, StaggerItem } from "./Reveal";

export function ServicesGrid() {
  return (
    <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <StaggerItem key={s.title}>
          <article className="group relative h-full overflow-hidden rounded-sm border border-gold/15 bg-card p-8 transition-all duration-600 hover:-translate-y-1.5 hover:border-gold/45">
            <span
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-600 group-hover:scale-x-100"
              style={{ background: "var(--gradient-gold)" }}
            />
            <p className="font-display text-3xl text-gold/30 transition-colors duration-500 group-hover:text-gold/70">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-xl font-medium text-offwhite">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            <ul className="mt-6 space-y-2 text-sm text-offwhite/75">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="size-1 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <ArrowUpRight className="mt-8 size-5 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}