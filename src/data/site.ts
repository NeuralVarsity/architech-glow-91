export const site = {
  name: "HNR INFRA",
  tagline: "Building Tomorrow",
  phone: "+91 98765 43210",
  email: "info@hnrinfra.com",
  website: "www.hnrinfra.com",
  address: {
    line1: "HNR INFRA Headquarters",
    line2: "Financial District",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
  },
  hours: [
    { day: "Monday – Friday", time: "9:30 AM – 6:30 PM" },
    { day: "Saturday", time: "10:00 AM – 4:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Properties", to: "/properties" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
] as const;