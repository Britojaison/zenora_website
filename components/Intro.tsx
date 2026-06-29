"use client";
import { useState } from "react";
import Image from "next/image";
import LeadForm from "./LeadForm";

export default function Intro() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="py-20 px-6 md:px-20 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-[2fr_3fr] gap-16 items-center">
        <div>
          <p className="font-body text-[#e1b258] text-xs uppercase mb-6">
            A New Standard
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] text-[#28362b] mb-8">
            More than a home<br />A way of being.
          </h2>
          <hr className="rule-gold mb-8 w-16" />
          <p className="font-body text-[#594433] text-base leading-[1.9] mb-6">
            Zenora is for those who want more from life more comfort, more intention, and more elegance in everyday living. Designed as an ultra luxury community in the quiet corner of Goldwins, Zenora combines premium architecture with curated lifestyle spaces.
          </p>
          <p className="font-body text-[#594433] text-base leading-[1.9]">
            The Horizon Garden, Serenity Pool, and Business Lounge,
            offering an elevated living experience with all the modern comforts
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-3 mt-10 font-body text-[10px] uppercase text-[#e1b258] hover:gap-5 transition-all duration-500 group"
          >
            Join The Experience
            <span className="w-8 h-px bg-[#e1b258] group-hover:w-12 transition-all duration-500" />
          </button>
        </div>
        <div>
          <img
            src="/img/aerial-view-club-hosue.jpg"
            alt="Zenora architecture"
            className="w-full h-auto"
          />
        </div>
      </div>
      <LeadForm open={showForm} onClose={() => setShowForm(false)} brochureUrl="/Zenora Brochure v2_compressed.pdf" />
    </section>
  );
}
