"use client";
import { useState } from "react";
import Image from "next/image";
import LeadForm from "./LeadForm";

const units = [
  {
    number: "5.5",
    text: "Cent Villa",
    label: "5 Cent Villa",
    tag: "Intimate",
    desc: "A refined sanctuary designed for those who value privacy and precision. Every corner considered, every material chosen with intent.",
    img: "/img/master-bedroom-view-1.jpg",
  },
  {
    number: "7",
    text: "Cent Villa",
    label: "7 Cent Villa",
    tag: "Signature",
    desc: "The balance of grandeur and warmth. Generous spaces that breathe, with rooftop access to the Sky Garden and Aqua Lounge.",
    img: "/img/7-cent-side.jpg",
  },
  {
    number: "11",
    text: "Cent Villa",
    label: "11 Cent Villa",
    tag: "Estate",
    desc: "The pinnacle of Zenora living. Expansive, commanding, and designed for those who have arrived — and know it.",
    img: "/img/bedroom01.jpg",
  },
];

export default function Residences() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="residences" className="pt-8 pb-32 px-6 md:px-20 max-w-screen-xl mx-auto">
      <div className="mb-20">
        <p className="font-body text-[#e1b258] text-xs uppercase mb-4">Residences</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#28362b]">Choose your elevation.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {units.map((u) => (
          <div key={u.label} className="group relative overflow-hidden">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={u.img}
                alt={u.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-[#0e0c0b]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="font-body text-[#e1b258] text-[10px] uppercase block mb-2">{u.tag}</span>
              <h3 className="text-3xl text-white mb-3 flex items-baseline gap-1.5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontStyle: 'italic', lineHeight: 1 }}>
                <span style={{ fontVariantNumeric: "lining-nums", display: "inline-block", transform: "translateY(1px)" }}>{u.number}</span>
                <span>{u.text}</span>
              </h3>
              <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                <p className="font-body text-[#e1d5c9] text-sm leading-relaxed mb-4">{u.desc}</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 font-body text-[9px] uppercase text-[#e1b258] group-hover:gap-3 transition-all duration-500"
                >
                  Enquire <span className="w-6 h-px bg-[#e1b258] group-hover:w-8 transition-all duration-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex items-center gap-6">
        <div className="w-16 h-px bg-[#e1b258] opacity-40" />
        <p className="font-body text-[#594433] text-xs uppercase">60 exclusive units</p>
      </div>
      <LeadForm open={showForm} onClose={() => setShowForm(false)} brochureUrl="/Zenora Brochure v2_compressed.pdf" />
    </section>
  );
}
