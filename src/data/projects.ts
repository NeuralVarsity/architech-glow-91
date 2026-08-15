import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export type Project = {
  id: string;
  name: string;
  location: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  price: string;
  area: string;
  category: "Residential" | "Commercial" | "Mixed-Use";
  image: string;
  blurb: string;
  /** Investment highlight shown on the luxury catalogue rail. */
  highlight?: string;
  metrics?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: "sky-residences",
    name: "HNR Sky Residences",
    location: "Gachibowli, Hyderabad",
    status: "Ongoing",
    price: "₹2.4 Cr",
    area: "2,450 – 4,100 sq.ft",
    category: "Residential",
    image: p1,
    blurb: "Forty-two storeys of sky-framed living with private lift lobbies and a cantilevered sky deck.",
    highlight: "Projected 8.4% rental yield",
    metrics: [
      { label: "Storeys", value: "42" },
      { label: "Units", value: "168" },
      { label: "Possession", value: "2027" },
    ],
  },
  {
    id: "grand-towers",
    name: "HNR Grand Towers",
    location: "Financial District, Hyderabad",
    status: "Completed",
    price: "₹3.1 Cr",
    area: "3,200 – 5,600 sq.ft",
    category: "Mixed-Use",
    image: p2,
    blurb: "Twin landmark towers joined by a glass sky bridge, anchoring the city's new financial skyline.",
    highlight: "100% sold at launch",
    metrics: [
      { label: "Towers", value: "2" },
      { label: "Sq.ft", value: "1.1M" },
      { label: "Delivered", value: "2023" },
    ],
  },
  {
    id: "elite-business-park",
    name: "HNR Elite Business Park",
    location: "Hitec City, Hyderabad",
    status: "Completed",
    price: "₹9,800 / sq.ft",
    area: "480,000 sq.ft leasable",
    category: "Commercial",
    image: p3,
    blurb: "A LEED Gold campus designed for global occupiers, with landscaped courts and column-free floors.",
    highlight: "LEED Gold · 96% leased",
    metrics: [
      { label: "Leasable", value: "480K" },
      { label: "Occupiers", value: "14" },
      { label: "Parking", value: "1,800" },
    ],
  },
  {
    id: "imperial-heights",
    name: "HNR Imperial Heights",
    location: "Banjara Hills, Hyderabad",
    status: "Ongoing",
    price: "₹5.6 Cr",
    area: "4,800 – 7,200 sq.ft",
    category: "Residential",
    image: p4,
    blurb: "Limited-edition sky mansions with hand-finished stonework and a private concierge floor.",
    highlight: "Only 24 residences",
    metrics: [
      { label: "Residences", value: "24" },
      { label: "Per floor", value: "1" },
      { label: "Possession", value: "2028" },
    ],
  },
  {
    id: "golden-avenue",
    name: "HNR Golden Avenue",
    location: "Jubilee Hills, Hyderabad",
    status: "Upcoming",
    price: "₹1.9 Cr",
    area: "1,800 – 3,000 sq.ft",
    category: "Mixed-Use",
    image: p5,
    blurb: "A boulevard of luxury retail, curated dining and residences above — the city's promenade address.",
    highlight: "Pre-launch pricing open",
    metrics: [
      { label: "Retail", value: "120K" },
      { label: "Residences", value: "96" },
      { label: "Launch", value: "2026" },
    ],
  },
  {
    id: "urban-vista",
    name: "HNR Urban Vista",
    location: "Kompally, Hyderabad",
    status: "Ongoing",
    price: "₹1.2 Cr",
    area: "1,450 – 2,300 sq.ft",
    category: "Residential",
    image: p6,
    blurb: "Terraced residences wrapped in vertical gardens, with a two-acre central green at its heart.",
    highlight: "Two-acre central green",
    metrics: [
      { label: "Acres", value: "6.2" },
      { label: "Units", value: "310" },
      { label: "Possession", value: "2027" },
    ],
  },
];