import r1 from "@/assets/prop-1.jpg";
import r2 from "@/assets/prop-2.jpg";
import r3 from "@/assets/prop-3.jpg";
import r4 from "@/assets/prop-4.jpg";
import p1 from "@/assets/project-1.jpg";
import p6 from "@/assets/project-6.jpg";

export type Property = {
  id: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  location: string;
  status: "Ready to Move" | "Under Construction" | "New Launch";
  type: "Apartment" | "Penthouse" | "Villa" | "Office";
  image: string;
};

export const properties: Property[] = [
  {
    id: "sky-3bhk",
    title: "Sky Residence 3BHK",
    price: "₹2.45 Cr",
    beds: 3,
    baths: 3,
    area: "2,450 sq.ft",
    location: "Gachibowli, Hyderabad",
    status: "Under Construction",
    type: "Apartment",
    image: r1,
  },
  {
    id: "imperial-penthouse",
    title: "Imperial Sky Penthouse",
    price: "₹8.90 Cr",
    beds: 5,
    baths: 6,
    area: "7,200 sq.ft",
    location: "Banjara Hills, Hyderabad",
    status: "New Launch",
    type: "Penthouse",
    image: r2,
  },
  {
    id: "golden-villa",
    title: "Golden Avenue Villa",
    price: "₹6.25 Cr",
    beds: 4,
    baths: 5,
    area: "5,400 sq.ft",
    location: "Jubilee Hills, Hyderabad",
    status: "Ready to Move",
    type: "Villa",
    image: r3,
  },
  {
    id: "elite-office",
    title: "Elite Corner Office Suite",
    price: "₹4.10 Cr",
    beds: 0,
    baths: 2,
    area: "3,800 sq.ft",
    location: "Hitec City, Hyderabad",
    status: "Ready to Move",
    type: "Office",
    image: r4,
  },
  {
    id: "urban-2bhk",
    title: "Urban Vista Garden 2BHK",
    price: "₹1.20 Cr",
    beds: 2,
    baths: 2,
    area: "1,450 sq.ft",
    location: "Kompally, Hyderabad",
    status: "Under Construction",
    type: "Apartment",
    image: p6,
  },
  {
    id: "grand-4bhk",
    title: "Grand Tower Signature 4BHK",
    price: "₹3.95 Cr",
    beds: 4,
    baths: 4,
    area: "3,950 sq.ft",
    location: "Financial District, Hyderabad",
    status: "Ready to Move",
    type: "Apartment",
    image: p1,
  },
];

export const propertyTypes = ["All", "Apartment", "Penthouse", "Villa", "Office"] as const;
export const propertyStatuses = ["All", "Ready to Move", "Under Construction", "New Launch"] as const;