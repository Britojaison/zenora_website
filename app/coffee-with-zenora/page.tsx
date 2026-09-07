import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoffeeWithZenora from "@/components/CoffeeWithZenora";
import SmoothScroll from "@/components/SmoothScroll";
import CoffeeContent from "./CoffeeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee with Zenora | Exclusive Luxury Villa Experience",
  description:
    "Discover Coffee with Zenora, an exclusive luxury villa experience in Coimbatore with private villa walkthroughs, fine dining and curated hospitality.",
  alternates: {
    canonical: "https://www.zenoravillas.in/coffee-with-zenora",
  },
  openGraph: {
    title: "Coffee with Zenora | Exclusive Luxury Villa Experience",
    description:
      "Discover Coffee with Zenora, an exclusive luxury villa experience in Coimbatore with private villa walkthroughs, fine dining and curated hospitality.",
    url: "https://www.zenoravillas.in/coffee-with-zenora",
  },
  twitter: {
    title: "Coffee with Zenora | Exclusive Luxury Villa Experience",
    description:
      "Discover Coffee with Zenora, an exclusive luxury villa experience in Coimbatore with private villa walkthroughs, fine dining and curated hospitality.",
  },
};

export default function CoffeePage() {
  return (
    <main className="bg-[#f5f1ed] min-h-screen text-[#28362b]">
      <SmoothScroll />
      <Navbar />
      <CoffeeWithZenora />
      <CoffeeContent />
      <Footer />
    </main>
  );
}
