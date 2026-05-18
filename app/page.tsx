import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import MapSection from "@/components/MapSection";
import Residences from "@/components/Residences";
import FullBleedImage from "@/components/FullBleedImage";
import Amenities from "@/components/Amenities";
import Highlights from "@/components/Highlights";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import CoffeeWithZenora from "@/components/CoffeeWithZenora";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <Intro />
      <MapSection />
      <Residences />
      <FullBleedImage
        src="/img/7-cent-side.jpg"
        alt="Zenora architecture"
        quote="A home that reflects who you have become, and what you are building next."
      />
      <Amenities />
      <Highlights />
      <FullBleedImage
        src="/img/private-theatre.jpg"
        alt="Zenora lifestyle"
        quote="Rise to elevated living."
        author="Zenora"
      />
      <Gallery />
      <Location />
      {/* <CoffeeWithZenora /> */}
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
