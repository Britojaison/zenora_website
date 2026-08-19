import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE SUB-COMPONENTS FOR BLOG TYPOGRAPHY
// ─────────────────────────────────────────────────────────────────────────────

export const AHero = ({ tag, title, excerpt, time, img }: any) => (
  <>
    <div className="pt-8 pb-16 px-6 md:px-12 max-w-screen-xl mx-auto text-left">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic text-[#28362b] leading-[1.1] mb-8">
        {title}
      </h1>
      <p className="font-body text-base md:text-lg text-[#594433] leading-relaxed max-w-2xl">
        {excerpt}
      </p>
      <div className="flex items-center justify-start gap-4 mt-8 font-body text-[10px] uppercase tracking-[2px] text-[#ab948a]">
        <span>August 2026</span>
        <span className="w-1 h-1 bg-[#ab948a]/40 rounded-full"></span>
        <span>{time} min read</span>
      </div>
    </div>
  </>
);

export const AH2 = ({ children }: any) => (
  <h2 className="font-display text-3xl font-light italic text-[#28362b] mt-16 mb-6 leading-snug">
    {children}
  </h2>
);

export const AP = ({ children }: any) => (
  <p className="font-body text-[15px] md:text-base text-[#594433] leading-[1.8] mb-6">
    {children}
  </p>
);

export const AUL = ({ children }: any) => (
  <ul className="mb-8 flex flex-col gap-4">
    {children}
  </ul>
);

export const ALI = ({ children }: any) => (
  <li className="font-body text-[15px] md:text-base text-[#594433] leading-[1.8] flex gap-4 border-b border-[#ab948a]/10 pb-4 last:border-0 last:pb-0">
    <span className="text-[#e1b258] shrink-0 mt-1">—</span>
    <div>{children}</div>
  </li>
);

export const ABlockquote = ({ children }: any) => (
  <blockquote className="border-l-[3px] border-[#e1b258] pl-6 md:pl-10 my-12 py-2 bg-[#e1b258]/5">
    <p className="font-display italic text-2xl md:text-3xl font-light text-[#28362b] leading-relaxed">
      "{children}"
    </p>
  </blockquote>
);

export const AHighlight = ({ children }: any) => (
  <div className="bg-[#e1b258]/10 border border-[#e1b258]/20 border-l-[3px] border-l-[#e1b258] p-6 md:p-8 my-10">
    <p className="font-body text-[15px] md:text-base text-[#28362b] leading-[1.8] m-0">
      {children}
    </p>
  </div>
);

export const ADivider = () => (
  <div className="w-12 h-px bg-[#e1b258]/40 my-16 mx-auto"></div>
);

export const AAINArticleCTA = () => (
  <section className="bg-white border-y border-[#ab948a]/20 py-20 px-6 mt-20">
    <div className="max-w-screen-md mx-auto md:flex items-center justify-between gap-12 text-center md:text-left">
      <div>
        <span className="font-body text-[9px] uppercase tracking-[2px] text-[#e1b258] block mb-3">
          Zenora by ZenVistas
        </span>
        <h3 className="font-display text-3xl font-light italic text-[#28362b] leading-snug mb-4">
          The only luxury gated villa<br />community in Goldwins.
        </h3>
        <p className="font-body text-[14px] text-[#594433] leading-relaxed">
          60 exclusive villas. RERA registered. Book a site visit and see it for yourself.
        </p>
      </div>
      <div className="mt-8 md:mt-0 shrink-0">
        <a href="/#contact" className="inline-block border border-[#e1b258]/60 text-[#e1b258] font-body text-[10px] uppercase tracking-[2px] px-8 py-4 hover:bg-[#e1b258] hover:text-white transition-all duration-300">
          Book a Site Visit
        </a>
      </div>
    </div>
  </section>
);
