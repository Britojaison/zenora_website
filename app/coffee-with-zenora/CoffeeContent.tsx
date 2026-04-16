"use client";

import { useEffect, useRef, useState } from "react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function CoffeeContent() {
  return (
    <div className="bg-[#f5f1ed] relative z-10 w-full overflow-hidden">
      {/* ─── The Experience Section ─── */}
      <section className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <span className="font-body text-[10px] uppercase tracking-[3px] text-[#e1b258] block mb-6">The Experience</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic text-[#28362b] leading-[1.2] mb-10">
              An evening unlike<br />any property event.
            </h2>
            <div className="flex flex-col gap-6 text-[#594433] font-body text-base md:text-lg leading-relaxed">
              <p>The Exclusive Dinner with Zenora is not a sales presentation. It is an invitation for families at the serious consideration stage to experience the project — the spaces, the lifestyle, the community — in a setting that reflects the standard Zenora itself sets.</p>
              <p>You will walk through the villa configurations with the ZenVistas team. You will see the amenity spaces. You will understand the rooftop. And you will do all of this over a fine dinner, with no pressure and no crowd — just your family and three others who share the same discernment you do.</p>
              <p>You will also have the opportunity to connect with key individuals behind some of the region's most successful and influential ventures.</p>
            </div>
          </div>
        </FadeIn>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 mt-24 border-t border-[#ab948a]/20 pt-20">
          <FadeIn delay={100}>
            <h4 className="font-display text-2xl font-light italic text-[#28362b] mb-4">Villa Walkthrough</h4>
            <p className="font-body text-[#594433] leading-relaxed">A personal tour of the villa configurations and community spaces with the ZenVistas team — at your pace, with every question answered.</p>
          </FadeIn>
          <FadeIn delay={200}>
            <h4 className="font-display text-2xl font-light italic text-[#28362b] mb-4">Fine Dining</h4>
            <p className="font-body text-[#594433] leading-relaxed">An upscale, relaxed dinner in a setting that reflects the Zenora standard. No ballrooms, no crowds — just an intimate evening for four families.</p>
          </FadeIn>
          <FadeIn delay={300}>
            <h4 className="font-display text-2xl font-light italic text-[#28362b] mb-4">Exclusive Network</h4>
            <p className="font-body text-[#594433] leading-relaxed">An opportunity to connect with key individuals behind some of the region's most successful and influential ventures — in a setting built for real conversation.</p>
          </FadeIn>
          <FadeIn delay={400}>
            <h4 className="font-display text-2xl font-light italic text-[#28362b] mb-4">No Obligation</h4>
            <p className="font-body text-[#594433] leading-relaxed">Attending the Exclusive Dinner does not obligate you to purchase. It is an invitation to experience Zenora properly before deciding.</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Stats Banner ─── */}
      <section className="bg-[#28362b] text-[#e1d5c9] py-20 px-6 mt-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <FadeIn delay={100}>
            <div className="font-display text-5xl md:text-6xl text-[#e1b258] mb-2">4</div>
            <div className="font-body text-[11px] uppercase tracking-[2px] opacity-80">Families Per Evening</div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="font-display text-2xl md:text-3xl text-[#e1b258] mb-4 leading-tight italic">Invite<br/>Only</div>
            <div className="font-body text-[11px] uppercase tracking-[2px] opacity-80">— By Application</div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="font-display text-5xl md:text-6xl text-[#e1b258] mb-2">60</div>
            <div className="font-body text-[11px] uppercase tracking-[2px] opacity-80">Exclusive Villas</div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="font-display text-3xl md:text-5xl text-[#e1b258] mb-4 mt-2">₹5.5Cr</div>
            <div className="font-body text-[11px] uppercase tracking-[2px] opacity-80">Starting Price</div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Who Is Invited ─── */}
      <section className="py-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <span className="font-body text-[10px] uppercase tracking-[3px] text-[#e1b258] block mb-4">Who Is Invited</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic text-[#28362b]">Crafted for the chosen.</h2>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto space-y-16">
          <FadeIn delay={100}>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 pb-16 border-b border-[#ab948a]/20 text-center md:text-left">
              <div className="font-body text-xl text-[#e1b258] w-12 shrink-0 md:text-left mx-auto md:mx-0">01</div>
              <div>
                <h3 className="font-display text-2xl font-light italic text-[#28362b] mb-4">Families at the serious stage</h3>
                <p className="font-body text-[#594433] leading-relaxed">The Exclusive Dinner is for families who have done their research and are genuinely evaluating Zenora as their next home — not for first-time browsers.</p>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 pb-16 border-b border-[#ab948a]/20 text-center md:text-left">
              <div className="font-body text-xl text-[#e1b258] w-12 shrink-0 md:text-left mx-auto md:mx-0">02</div>
              <div>
                <h3 className="font-display text-2xl font-light italic text-[#28362b] mb-4">Established Coimbatore families</h3>
                <p className="font-body text-[#594433] leading-relaxed">Textile families, trading businesses, professionals — those who have built their success and are now looking for a home that reflects it.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-left">
              <div className="font-body text-xl text-[#e1b258] w-12 shrink-0 md:text-left mx-auto md:mx-0">03</div>
              <div>
                <h3 className="font-display text-2xl font-light italic text-[#28362b] mb-4">Those who value experience</h3>
                <p className="font-body text-[#594433] leading-relaxed">If you prefer to experience something properly before deciding — rather than committing on the basis of a brochure — the Exclusive Dinner is designed for you.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Quote Block ─── */}
      <section className="bg-white py-32 px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-px bg-[#e1b258] mx-auto mb-8" />
            <h4 className="font-body text-[10px] uppercase tracking-[3px] text-[#e1b258] mb-8">Coffee with Zenora</h4>
            <p className="font-editorial text-3xl md:text-4xl lg:text-5xl text-[#594433] leading-snug italic mb-10">
              "An intimate, invite-only evening designed for those who appreciate luxury living."
            </p>
            <span className="font-body text-sm text-[#ab948a] uppercase tracking-[2px]">— Zenora by ZenVistas</span>
          </div>
        </FadeIn>
      </section>

      {/* ─── Bottom CTA Cards ─── */}
      <section className="bg-[#f5f1ed] pt-24 pb-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={100}>
            <div className="bg-white p-10 border border-[#ab948a]/10 hover:border-[#e1b258]/30 transition-colors h-full">
              <h4 className="font-display text-4xl font-light italic text-[#28362b] mb-2">60</h4>
              <div className="font-body text-[10px] uppercase tracking-[2px] text-[#e1b258] mb-6">Exclusive Villas</div>
              <p className="font-body text-sm text-[#594433] leading-relaxed">No second phase. No additional units. When 60 families have their homes, Zenora is complete.</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="bg-white p-10 border border-[#ab948a]/10 hover:border-[#e1b258]/30 transition-colors h-full">
              <h4 className="font-display text-4xl font-light italic text-[#28362b] mb-2">RERA</h4>
              <div className="font-body text-[10px] uppercase tracking-[2px] text-[#e1b258] mb-6">Registered & Active</div>
              <p className="font-body text-sm text-[#594433] leading-relaxed">TNRERA/11/BLG/0013/2026. Every commitment is a regulated obligation. Verify at tnrera.in.</p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="bg-white p-10 border border-[#ab948a]/10 hover:border-[#e1b258]/30 transition-colors h-full">
              <h4 className="font-display text-4xl font-light italic text-[#28362b] mb-2">₹5.5Cr</h4>
              <div className="font-body text-[10px] uppercase tracking-[2px] text-[#e1b258] mb-6">Starting Price</div>
              <p className="font-body text-sm text-[#594433] leading-relaxed">Indicative. Covers freehold plot, villa construction, and lifetime access to all community amenities.</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
            <a href="/zenora" className="border border-[#e1b258]/60 text-[#e1b258] font-body text-[10px] uppercase tracking-[2px] px-8 py-4 hover:bg-[#e1b258] hover:text-white transition-all duration-300">
              Explore Zenora → 
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
