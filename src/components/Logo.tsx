import { Link } from "@tanstack/react-router";
import logo from "@/assets/hnr-logo.png.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="HNR Infra home">
      <span
        role="img"
        aria-label="HNR Infra emblem"
        className="size-11 shrink-0 rounded-sm bg-charcoal ring-1 ring-gold/40 transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${logo.url})`,
          backgroundSize: "260% auto",
          backgroundPosition: "50% 24%",
        }}
      />
      {!compact && (
        <span className="hidden leading-none whitespace-nowrap sm:block xl:hidden 2xl:block">
          <span className="block font-display text-lg font-bold tracking-[0.18em] text-offwhite">HNR INFRA</span>
          <span className="mt-1 block text-[9px] tracking-[0.34em] text-gold/80">BUILDING TOMORROW</span>
        </span>
      )}
    </Link>
  );
}