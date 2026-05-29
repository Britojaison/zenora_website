import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoffeeWithZenora from "@/components/CoffeeWithZenora";
import SmoothScroll from "@/components/SmoothScroll";
import CoffeeContent from "./CoffeeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee with Zenora | Exclusive VIP Experience",
  description: "An intimate evening designed for families who are seriously considering Zenora.",
  alternates: {
    canonical: "https://www.zenoravillas.in/coffee-with-zenora",
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
