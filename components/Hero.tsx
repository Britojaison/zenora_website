"use client";
import { useEffect, useRef, useState } from "react";
import LeadForm from "./LeadForm";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBrochureForm, setShowBrochureForm] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/zenora_hero_optimized.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img/street-view.jpg"
        />
        <div className="absolute inset-0 bg-[#0e0c0b]/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-body text-white text-sm uppercase mb-6">
            Goldwins, Coimbatore
          </p>
          <h1 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[1.05] text-white whitespace-normal md:whitespace-nowrap" style={{ fontWeight: 300, fontStyle: 'italic' }}>
            Crafted for the Chosen
          </h1>
          <div className="w-16 h-px bg-[#e1b258] opacity-60 my-8" />
          <p className="font-body text-white text-sm md:text-base max-w-md leading-relaxed mb-10">
            An exclusive community of 60 thoughtfully designed ultra-luxury villas, where luxury meets tranquility
          </p>
          <button
            onClick={() => setShowBrochureForm(true)}
            className="group inline-flex items-center gap-3 border-0 bg-[#0e0c0b]/40 backdrop-blur-sm hover:bg-[#e1b258] text-white hover:text-[#28362b] font-body text-xs uppercase tracking-[2px] px-10 py-4 transition-all duration-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Brochure
          </button>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-body text-[9px] uppercase text-white/80">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </section>

      <LeadForm
        open={showBrochureForm}
        onClose={() => setShowBrochureForm(false)}
        brochureUrl="/Zenora Brochure v2_compressed.pdf"
      />
    </>
  );
}
