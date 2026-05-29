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
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://www.zenoravillas.in/#organization",
      "name": "Zenora Villas by ZenVistas",
      "url": "https://www.zenoravillas.in",
      "logo": "https://www.zenoravillas.in/images/zenora_logo.svg",
      "description":
        "Zenora Villas — An affordable luxury villa community of 60 exclusive villas in Goldwins, Coimbatore.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN",
      },
      "areaServed": {
        "@type": "City",
        "name": "Coimbatore",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.zenoravillas.in/#website",
      "url": "https://www.zenoravillas.in",
      "name": "Zenora Villas",
      "publisher": {
        "@id": "https://www.zenoravillas.in/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.zenoravillas.in/#webpage",
      "url": "https://www.zenoravillas.in",
      "name": "Zenora Villas · Luxury Villas in Coimbatore | Crafted for the Chosen",
      "isPartOf": {
        "@id": "https://www.zenoravillas.in/#website",
      },
      "about": {
        "@id": "https://www.zenoravillas.in/#organization",
      },
      "description":
        "An affordable luxury villa community in Goldwins, Coimbatore. 60 exclusive villas with Sky Garden, Aqua Lounge, Star Deck, Private Theatre & more.",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />
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

