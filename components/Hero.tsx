"use client";
import { useEffect, useRef, useState } from "react";
import LeadForm from "./LeadForm";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (showForm) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [showForm]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/zenora_compressed.mp4"
        muted
        loop
        playsInline
        preload="auto"
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
        <p className="font-body text-white text-sm md:text-base max-w-md leading-relaxed">
          An exclusive community of 60 thoughtfully designed villas, where luxury meets tranquility
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-12 bg-white text-[#28362b] text-xs uppercase px-10 py-5 hover:bg-[#e1b258] hover:text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          Discover Zenora
        </button>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-body text-[9px] uppercase text-white/80">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent" />
      </div>

      <LeadForm open={showForm} onClose={() => setShowForm(false)} />
    </section>
  );
}
