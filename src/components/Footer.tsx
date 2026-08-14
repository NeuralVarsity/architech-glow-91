import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { projects } from "@/data/projects";
import { services } from "@/data/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-[oklch(0.13_0.004_60)]">
      <div className="grid-arch pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A development house building residential, commercial and mixed-use landmarks with
              uncompromising craft.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-sm border border-gold/25 px-3 py-1.5 text-[10px] tracking-[0.2em] text-offwhite/70 uppercase transition-colors hover:border-gold hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <li key={s.title}>
                <Link to="/services" className="transition-colors hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </FooterCol>

          <div>
            <h3 className="text-xs tracking-[0.28em] text-gold uppercase">Projects</h3>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              {projects.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link to="/projects" className="transition-colors hover:text-gold">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs tracking-[0.28em] text-gold uppercase">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/70" />
                <span>
                  {site.address.line2}, {site.address.city}, {site.address.state}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold/70" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold/70" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-rule mt-14" />
        <div className="flex flex-col gap-3 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HNR Infra. All rights reserved.</p>
          <p className="tracking-[0.2em] text-gold/70 uppercase">{site.website}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs tracking-[0.28em] text-gold uppercase">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}