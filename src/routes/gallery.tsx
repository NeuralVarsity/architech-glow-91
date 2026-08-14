import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/gallery-3.jpg";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { CTABand } from "@/components/CTABand";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — HNR Infra Architecture & Interiors" },
      {
        name: "description",
        content:
          "A visual archive of HNR Infra facades, lobbies, interiors and amenity decks across our residential and commercial landmarks.",
      },
      { property: "og:title", content: "Gallery — HNR Infra Architecture & Interiors" },
      {
        property: "og:description",
        content: "Facades, lobbies, interiors and rooftop decks from the HNR Infra portfolio.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Details worth standing still for."
        intro="Facades, arrival lobbies, residences and amenity decks photographed across the HNR Infra portfolio."
        image={heroImg}
      />

      <Section>
        <SectionHeading
          eyebrow="Visual Archive"
          title={<>A closer look at the <span className="text-gold-gradient">craft</span>.</>}
          align="center"
        />
        <GalleryGrid />
      </Section>

      <CTABand />
    </>
  );
}