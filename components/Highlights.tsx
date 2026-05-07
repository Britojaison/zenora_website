"use client";

const highlights = [
  { num: "60", label: "Exclusive Units" },
  { num: "3", label: "Villa Configurations" },
  { num: "4+", label: "Rooftop Experiences" },
  { num: "10", label: "Minutes   From Airport" },
];

const features = [
  "Aspirational homes for the next chapter",
  "Rooftop lifestyle : Sky Garden, Aqua Lounge, Star Deck",

  "Goldwins convenience, minus the noise",
  "Modern design with practical comfort",
  "Clubhouse, Wellness Arena, EV charging, CCTV",
];

export default function Highlights() {
  return (
    <section className="py-32 bg-[#28362b]">
      <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          {highlights.map((h) => (
            <div key={h.label} className="text-center">
              <p className="font-body text-[clamp(2.5rem,5vw,4rem)] text-[#e1b258] leading-none mb-2 font-light">
                {h.num}
              </p>
              <p className="font-body text-[#b9b4a8] text-[10px] uppercase">
                {h.label}
              </p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-0">
          <div>
            <p className="font-body text-[#e1b258] text-xs uppercase mb-6">
              Key Highlights
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] text-[#e1d5c9] mb-10">
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
          <div className="flex flex-col gap-0">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-5 border-b border-[#e1d5c9]/10"
              >
                <span className="w-1 h-1 rounded-full bg-[#e1b258] mt-2 shrink-0" />
                <p className="font-body text-[#b9b4a8] text-base leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
