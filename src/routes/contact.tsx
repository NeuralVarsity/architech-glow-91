import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import heroImg from "@/assets/project-5.jpg";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact HNR Infra — Hyderabad Corporate Office" },
      {
        name: "description",
        content:
          "Reach HNR Infra at our Financial District, Hyderabad headquarters. Call +91 98765 43210 or book a private consultation.",
      },
      { property: "og:title", content: "Contact HNR Infra — Hyderabad Corporate Office" },
      {
        property: "og:description",
        content: "Speak with our advisory team about inventory, pricing and construction timelines.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a conversation with our advisory team."
        intro="Visit the corporate office, call us, or send a note — we typically respond within one business day."
        image={heroImg}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal direction="left" className="space-y-8">
            <div>
              <p className="eyebrow">Corporate Office</p>
              <h2 className="mt-4 text-2xl sm:text-3xl">{site.address.line1}</h2>
              <div className="gold-rule my-6 max-w-[140px]" />
              <ul className="space-y-5 text-sm">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                  <span className="text-muted-foreground">
                    {site.address.line2}
                    <br />
                    {site.address.city}, {site.address.state}
                    <br />
                    {site.address.country}
                  </span>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-gold">
                    {site.phone}
                  </a>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                  <a href={`mailto:${site.email}`} className="text-muted-foreground hover:text-gold">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="glass-panel rounded-sm p-6">
              <p className="flex items-center gap-3 text-xs tracking-[0.24em] text-gold uppercase">
                <Clock className="size-4" /> Business Hours
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 text-muted-foreground">
                    <span>{h.day}</span>
                    <span className="text-offwhite/85">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.24em] text-gold uppercase">Follow</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-sm border border-gold/25 px-4 py-2 text-[10px] tracking-[0.2em] text-offwhite/70 uppercase transition-colors hover:border-gold hover:text-gold"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <form onSubmit={onSubmit} className="glass-panel rounded-sm p-7 sm:p-9">
              <h2 className="text-2xl">Schedule a consultation</h2>
              <div className="gold-rule my-6 max-w-[140px]" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Your name" />
                <Field label="Phone" name="phone" type="tel" placeholder="+91 00000 00000" />
                <div className="sm:col-span-2">
                  <Field label="Email" name="email" type="email" placeholder="you@company.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] tracking-[0.24em] text-gold uppercase" htmlFor="interest">
                    Interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="mt-3 w-full rounded-sm border border-input bg-charcoal/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Investment advisory</option>
                    <option>Careers</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] tracking-[0.24em] text-gold uppercase" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us what you are looking for"
                    className="mt-3 w-full resize-none rounded-sm border border-input bg-charcoal/60 px-4 py-3 text-sm text-offwhite placeholder:text-muted-foreground/70 outline-none focus:border-gold"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-sm bg-gold px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-charcoal uppercase transition-transform duration-400 hover:scale-[1.02]"
              >
                {sent ? "Request noted — we'll be in touch" : "Request Consultation"}
              </button>
              <p className="mt-4 text-center text-[11px] text-muted-foreground">
                Demonstration form — submissions are not stored or sent.
              </p>
            </form>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="grid-arch relative grid h-72 place-items-center overflow-hidden rounded-sm border border-gold/20 bg-card sm:h-96">
            <div className="text-center">
              <MapPin className="mx-auto size-8 text-gold" />
              <p className="mt-4 font-display text-xl text-offwhite">Financial District, Hyderabad</p>
              <p className="mt-2 text-xs tracking-[0.24em] text-muted-foreground uppercase">Office map placeholder</p>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.24em] text-gold uppercase" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full rounded-sm border border-input bg-charcoal/60 px-4 py-3 text-sm text-offwhite placeholder:text-muted-foreground/70 outline-none focus:border-gold"
      />
    </div>
  );
}