import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoffeeWithZenora from "@/components/CoffeeWithZenora";
import SmoothScroll from "@/components/SmoothScroll";
import CoffeeContent from "./CoffeeContent";

export const metadata = {
  title: "Coffee with Zenora | Exclusive VIP Experience",
  description: "An intimate evening designed for families who are seriously considering Zenora.",
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
