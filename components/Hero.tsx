"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
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
        <p className="font-body text-white text-sm md:text-base max-w-md leading-relaxed">
          An exclusive community of 60 thoughtfully designed villas, where luxury meets tranquility
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-body text-[9px] uppercase text-white/80">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/80 to-transparent" />
      </div>
    </section>
  );
}
