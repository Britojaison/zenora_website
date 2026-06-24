'use strict';
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Animations
    const heroCtx = gsap.context(() => {
      const container = heroRef.current;
      if (container) {
        const eyebrow = container.querySelector('.hero-eyebrow');
        const title = container.querySelector('.hero-title');
        const subtitle = container.querySelector('.hero-subtitle');

        gsap.fromTo(eyebrow, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
        gsap.fromTo(title, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
        );
        gsap.fromTo(subtitle, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
        );
      }
    });

    // 2. Scroll Trigger Animations
    const scrollCtx = gsap.context(() => {
      // History section
      if (historyRef.current) {
        const text = historyRef.current.querySelector('.history-text');
        const card = historyRef.current.querySelector('.history-card');

        gsap.fromTo(text,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: historyRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(card,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: historyRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Word-by-word reveal
        const words = historyRef.current.querySelectorAll('.reveal-word');
        if (words.length > 0) {
          words.forEach((word, i) => {
            const isItalic = (word as HTMLElement).style.fontStyle === 'italic';
            gsap.to(word, {
              color: isItalic ? 'var(--gold)' : 'var(--forest)',
              ease: 'none',
              scrollTrigger: {
                trigger: historyRef.current,
                start: `top+=${40 + i * 25} 75%`,
                end: `top+=${70 + i * 25} 75%`,
                scrub: true,
              }
            });
          });
        }

        // Gold line draw
        const line = historyRef.current.querySelector('.profile-line');
        gsap.to(line, {
          width: '100%',
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Vision boxes
      if (visionRef.current) {
        const boxes = visionRef.current.querySelectorAll('.vision-box');
        gsap.fromTo(boxes,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Leadership cards
      if (leadershipRef.current) {
        const title = leadershipRef.current.querySelector('.leadership-title');
        const cards = leadershipRef.current.querySelectorAll('.leadership-card');

        gsap.fromTo(title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leadershipRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leadershipRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Governance
      if (governanceRef.current) {
        const cols = governanceRef.current.querySelectorAll('.gov-col');
        gsap.fromTo(cols,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: governanceRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => {
      heroCtx.revert();
      scrollCtx.revert();
    };
  }, []);

  return (
    <div>
      {/* Page Hero */}
      <section ref={heroRef} className="page-hero page-hero-about" style={{ minHeight: '78vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '120px 0 80px 0' }}>
        <Image
          src="/images/home/from-rooftop-garden-sky-lounge-versatile-interior-design-ideas-highrise-buildings.jpg"
          alt="Zenvistas residential community"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(15, 28, 21, 0.88) 0%, rgba(15, 28, 21, 0.46) 48%, rgba(15, 28, 21, 0.1) 100%)',
          zIndex: 1,
        }}></div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15, 28, 21, 0.12) 0%, rgba(15, 28, 21, 0.34) 55%, rgba(15, 28, 21, 0.86) 100%)',
          zIndex: 1,
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)', paddingBottom: 'clamp(70px, 10vw, 120px)' }}>
          <span className="hero-eyebrow eyebrow" style={{ color: 'var(--gold)' }}>Who We Are</span>
          <h1 className="hero-title" style={{ color: 'var(--white)', fontSize: 'clamp(3.2rem, 8vw, 7rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 0.96, maxWidth: '980px', margin: '0 0 28px' }}>
            Founder-backed communities, built with <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>restraint.</span>
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.82)', maxWidth: '660px', fontSize: '1.08rem', lineHeight: '1.8', margin: 0 }}>
            Zenvistas brings industrial discipline, patient capital, and personal accountability into residential development.
          </p>
        </div>
      </section>

      {/* 1. Group History */}
      <section ref={historyRef} style={{ backgroundColor: 'var(--white)', padding: '130px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '38%', backgroundColor: 'var(--cream)', pointerEvents: 'none' }}></div>
        <div className="container-custom">
          <div className="grid-2-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.12fr) minmax(360px, 0.88fr)',
            gap: 'clamp(3rem, 7vw, 7rem)',
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 2,
          }}>
            <div className="history-text" style={{ padding: '20px 0' }}>
              <span className="eyebrow">A Rich Heritage</span>
              <h2 className="profile-heading" style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
                lineHeight: 1.05,
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                margin: '0 0 32px',
                maxWidth: '900px',
              }}>
                {(() => {
                  const parts = [
                    { text: 'Capital with ', highlight: false },
                    { text: 'memory.', highlight: true },
                    { text: ' Development with ', highlight: false },
                    { text: 'patience.', highlight: true },
                  ];
                  return parts.map((part, pIdx) => {
                    if (part.highlight) {
                      const words = part.text.split(' ');
                      return words.map((word, wIdx) => (
                        <span key={`h-${pIdx}-${wIdx}`} className="reveal-word" style={{
                          display: 'inline-block',
                          color: 'rgba(171,148,138,0.25)',
                          fontStyle: 'italic',
                          transition: 'color 0.1s ease',
                          marginRight: '0.3em',
                        }}>
                          {word}
                        </span>
                      ));
                    } else {
                      const words = part.text.split(' ').filter(w => w.length > 0);
                      return words.map((word, wIdx) => (
                        <span key={`w-${pIdx}-${wIdx}`} className="reveal-word" style={{
                          display: 'inline-block',
                          color: 'rgba(40,54,43,0.12)',
                          transition: 'color 0.1s ease',
                          marginRight: '0.3em',
                        }}>
                          {word}
                        </span>
                      ));
                    }
                  });
                })()}
              </h2>
              {/* Animated Horizontal Line */}
              <div className="profile-line" style={{
                width: '0%',
                height: '1px',
                backgroundColor: 'var(--gold)',
                margin: '48px 0 28px',
                maxWidth: '760px',
              }}></div>
              <p style={{
                maxWidth: '700px',
                margin: '0 0 54px',
                color: 'var(--charcoal-3)',
                fontSize: '1.05rem',
                lineHeight: 1.85,
              }}>
                ZenVistas stems from Coimbatore industrial families with roots in textile, engineering, and manufacturing enterprise. The same operating discipline that built long-standing businesses now guides how we select land, assemble teams, and deliver homes.
              </p>
            </div>
            <div className="history-card" style={{
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--forest)',
              color: 'var(--white)',
              border: '1px solid rgba(224, 177, 76, 0.28)',
              borderRadius: '4px',
              boxShadow: '0 22px 60px rgba(40, 54, 43, 0.14)',
              padding: 'clamp(34px, 5vw, 54px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 82% 16%, rgba(224,177,76,0.15), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)',
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 2, display: 'grid', gap: '24px' }}>
                {[
                  ['Industrial origin', 'Experience in capital-intensive businesses where timelines, quality control, and governance matter.'],
                  ['Founder proximity', 'The ownership group remains close to every project, from land evaluation to customer experience.'],
                  ['Residential focus', 'Limited, high-consideration communities rather than volume-led development.'],
                ].map(([title, copy], idx) => (
                  <div key={title} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: '18px', paddingTop: idx === 0 ? 0 : '22px', borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.16)' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700 }}>{String(idx + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 style={{ margin: '0 0 8px', color: 'var(--white)', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: '1.35rem' }}>{title}</h3>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, fontSize: '0.92rem' }}>{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Operating Model (Vision & Mission) */}
      <section ref={visionRef} style={{ backgroundColor: '#28362b', padding: '130px 0', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 86% 18%, rgba(224,177,76,0.18), transparent 30%), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: 'auto, 80px 80px',
          pointerEvents: 'none',
        }}></div>
        <div className="container-custom">
          <div style={{ position: 'relative', zIndex: 2, marginBottom: '70px', maxWidth: '820px' }}>
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>Operating Model</span>
            <h2 style={{ color: 'var(--white)', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1, margin: 0 }}>
              Fewer projects. Better oversight. Longer-term value.
            </h2>
          </div>

          <div className="grid-3" style={{ gap: '24px', position: 'relative', zIndex: 2 }}>
            {[
              ['01 / Capital', 'Equity-first growth', 'We avoid debt-led pressure so project decisions can stay aligned with quality, timing, and buyer confidence.'],
              ['02 / Design', 'Liveability over density', 'Our planning preference is spacious, lower-density residential environments with lasting privacy and comfort.'],
              ['03 / Trust', 'Compliance as default', 'Clear documentation, regulatory discipline, and professional custody sit inside the operating process.'],
            ].map(([num, title, copy]) => (
              <div key={title} className="vision-box" style={{
                padding: '40px 32px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.background = 'rgba(255, 255, 255, 0.06)';
                target.style.borderColor = 'rgba(225, 178, 88, 0.35)';
                target.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.background = 'rgba(255, 255, 255, 0.03)';
                target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                target.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'radial-gradient(circle at 100% 0%, rgba(225, 178, 88, 0.06), transparent 50%)',
                }}></div>
                <span className="eyebrow" style={{ fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '16px' }}>{num}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, color: 'var(--white)', marginBottom: '14px', fontSize: '1.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.75', margin: 0 }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Leadership Team */}
      <section ref={leadershipRef} style={{ backgroundColor: 'var(--white)', padding: '120px 0' }}>
        <div className="container-custom">
          <div className="leadership-title" style={{ marginBottom: '70px', maxWidth: '760px' }}>
            <span className="eyebrow">Leadership</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.4rem, 5vw, 4.6rem)', lineHeight: 1, margin: 0 }}>
              Built by people who understand ownership risk.
            </h2>
            <div className="section-rule" style={{ margin: '30px 0 0' }}></div>
          </div>

          <div style={{ borderTop: '1px solid rgba(40,54,43,0.22)' }}>
            {[
              ['Founding families', 'Industrial mill-owner capital and governance experience backing every development decision.'],
              ['Development leadership', 'Project, design, finance, and approval workflows managed through professional specialists.'],
              ['Partner network', 'Boutique architects, structural consultants, landscape experts, and site teams selected for fit, not volume.'],
            ].map(([title, copy], idx) => (
              <div key={title} className="leadership-card" style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr minmax(220px, 0.55fr)',
                gap: '2.5rem',
                padding: '38px 16px',
                borderBottom: '1px solid rgba(171,148,138,0.22)',
                alignItems: 'baseline',
                transition: 'all 0.3s ease',
                margin: '0 -16px',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.backgroundColor = 'var(--cream)';
                target.style.borderLeft = '3px solid var(--gold)';
                target.style.paddingLeft = '13px';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.backgroundColor = 'transparent';
                target.style.borderLeft = '3px solid transparent';
                target.style.paddingLeft = '16px';
              }}
              >
                <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.12em' }}>{String(idx + 1).padStart(2, '0')}</span>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.05 }}>{title}</h3>
                <p style={{ margin: 0, color: 'var(--charcoal-3)', lineHeight: 1.7 }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Corporate Governance & 5. Brand Philosophy */}
      <section ref={governanceRef} style={{ backgroundColor: 'var(--cream)', padding: '120px 0' }}>
        <div className="container-custom">
          <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(3rem, 7vw, 7rem)', alignItems: 'start' }}>
            <div className="gov-col" style={{ position: 'sticky', top: '120px' }}>
              <span className="eyebrow">Governance</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1, margin: 0 }}>Trust is designed into the process.</h2>
            </div>
            <div className="gov-col" style={{
              backgroundColor: 'var(--white)',
              border: '1px solid rgba(171,148,138,0.18)',
              borderRadius: '4px',
              boxShadow: '0 12px 36px rgba(40, 54, 43, 0.04)',
            }}>
              {[
                ['Compliance', 'Every transaction, contract, and project layout is vetted for regulatory clarity and buyer confidence.'],
                ['Custody', 'Project schedules, approvals, vendor coordination, and handover commitments are managed through defined professional processes.'],
                ['Philosophy', 'We do not build to maximum capacity; we design for privacy, light, movement, and long-term living quality.'],
              ].map(([title, copy], idx) => (
                <div key={title} style={{
                  padding: '38px',
                  borderBottom: idx === 2 ? 'none' : '1px solid rgba(171,148,138,0.18)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--cream)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                >
                  <span className="eyebrow" style={{ marginBottom: '12px' }}>{title}</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 300, marginBottom: '10px', color: 'var(--forest)' }}>{title}</h4>
                  <p style={{ color: 'var(--charcoal-3)', margin: 0, lineHeight: 1.8, fontSize: '0.96rem' }}>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
