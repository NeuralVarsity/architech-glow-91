import { Clock, Compass, Gem, Leaf, MapPin, ShieldCheck } from "lucide-react";
import { whyChoose } from "@/data/content";
import { StaggerGroup, StaggerItem } from "./Reveal";

const icons = {
  compass: Compass,
  pin: MapPin,
  shield: ShieldCheck,
  leaf: Leaf,
  clock: Clock,
  diamond: Gem,
} as const;

export function WhyChoose() {
  return (
    <StaggerGroup className="mt-14 grid gap-px overflow-hidden rounded-sm border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-3">
      {whyChoose.map((f) => {
        const Icon = icons[f.icon as keyof typeof icons];
        return (
          <StaggerItem key={f.title} className="group relative bg-card p-8 transition-colors duration-500 hover:bg-burgundy/25">
            <span className="grid size-12 place-items-center rounded-sm border border-gold/30 text-gold transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-6 text-lg font-medium text-offwhite">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}