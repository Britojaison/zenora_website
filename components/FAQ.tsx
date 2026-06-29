"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Why choose ZenVistas Zenora in Goldwins?",
    a: "Zenora is designed for those who value space, privacy, and thoughtful living. With only 60 ultra luxury villas, the community stays quiet and exclusive while still being close to the city. Rooftop lifestyle spaces, wide internal roads, and carefully planned amenities create a home that feels calm, refined, and private.",
  },
  {
    q: "Why is Goldwins suitable for long term living?",
    a: "Goldwins has quietly grown into one of Coimbatore’s most well connected residential pockets. It offers easy access to Avinashi Road, the airport corridor, schools, hospitals, and workplaces, while still remaining a peaceful neighbourhood for everyday living.",
  },
  {
    q: "Is Zenora approved and RERA registered?",
    a: "Yes. Zenora is a fully approved project and registered under RERA. This ensures transparency in planning, construction timelines, and buyer protection, giving homeowners confidence and peace of mind.",
  },
  {
    q: "Why is Zenora a good long term investment?",
    a: "Zenora is a strong long-term investment due to its strategic location, planned infrastructure growth, and premium villa development. With increasing demand for high-quality living spaces and steady land appreciation in the area, it offers both lifestyle value and strong potential for capital appreciation.",
  },
  {
    q: "What is the starting price for Zenora villas?",
    a: "Zenora villas are positioned in the premium segment, with prices varying based on villa size, layout, and availability. Our team can guide you through the current pricing and help you explore the options that best suit your needs.",
  },
  {
    q: "Who are the people behind ZenVistas developments?",
    a: "ZenVistas is backed by a group of respected industrialists and business leaders who share a vision for building meaningful residential spaces. Their involvement brings experience, credibility, and a long term commitment to quality.",
  },
  {
    q: "Who typically chooses to buy a home at Zenora?",
    a: "Zenora attracts entrepreneurs, professionals, and business families who are looking to upgrade their lifestyle. Many buyers choose it for the privacy, space, and the quiet comfort of a well planned community.",
  },
  {
    q: "What makes Zenora different from other ultra luxury villa projects?",
    a: "Zenora focuses on thoughtful design rather than scale. With limited villas, rooftop lifestyle spaces, and a carefully curated environment, the project offers a quieter and more refined living experience.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="font-body text-[#e1b258] text-xs uppercase mb-4">
              Questions
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#28362b]">
              Frequently<br />asked.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-0">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-[#ab948a]/20">
                <button
                  className="w-full flex items-start justify-between gap-4 py-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-body text-[#28362b] text-sm leading-relaxed">{f.q}</span>
                  <span className="text-[#e1b258] shrink-0 mt-0.5">
                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {open === i && (
                  <p className="font-body text-[#594433] text-base leading-[1.9] pb-6">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
