'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger for client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const valuesData = [
  {
    num: "01",
    title: "Founders as\nbuyers",
    description: "The 13+ mill owners who founded ZenVistas are the same families considering living in its projects. There is no gap between promise and performance.",
    points: [
      "Generational Commitment",
      "Direct Accountability",
      "Owner-Occupied Design",
      "Strict Quality Control"
    ],
    image: "/images/seat.jpg"
  },
  {
    num: "02",
    title: "Industrial\ncapital",
    description: "ZenVistas operations are funded natively via equity from our industrialist founders and internal cash flow. By operating with zero external bank leverage, we cushion investments against market volatility and eliminate interest drag.",
    points: [
      "100% Equity Funded",
      "Zero Interest Drag",
      "Market Volatility Shield",
      "Uninterrupted Construction"
    ],
    image: "/images/living room.jpg"
  },
  {
    num: "03",
    title: "Scarcity by\ndesign",
    description: "We intentionally limit the number of homes we construct to ensure supply scarcity and maintain a highly cohesive community cohort.",
    points: [
      "Bespoke Gated Enclaves",
      "Curated Cohort Selection",
      "High Retained Asset Value",
      "Ultimate Privacy Guidelines"
    ],
    image: "/images/villa.jpg"
  },
  {
    num: "04",
    title: "Curated\nengineering",
    description: "Collaborating only with award-winning boutique architects, structural designers, and landscape consultants to build works of art.",
    points: [
      "Award-winning Planners",
      "Boutique Landscape Design",
      "International Material Spec",
      "Tailored Architectural Details"
    ],
    image: "/images/seat.jpg"
  }
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'home-enquiry'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const [activeIndex, setActiveIndex] = useState(0);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (idx: number) => {
    if (idx === activeIndex) return;

    if (detailsRef.current) {
      gsap.to(detailsRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          setActiveIndex(idx);
          gsap.to(detailsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    } else {
      setActiveIndex(idx);
    }
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const dualCtaRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Entrance Animations
    const heroCtx = gsap.context(() => {
      const container = heroRef.current;
      if (container) {
        const eyebrow = container.querySelector('.hero-eyebrow');
        const title = container.querySelector('.hero-title');
        const subtitle = container.querySelector('.hero-subtitle');
        const buttons = container.querySelector('.hero-buttons');

        gsap.fromTo(eyebrow,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
        );
        gsap.fromTo(title,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
        );
        gsap.fromTo(subtitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
        );
        gsap.fromTo(buttons,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
        );
      }
    });

    // 2. Scroll Trigger Animations for Other Sections
    const scrollCtx = gsap.context(() => {
      // Corporate Profile — creative scroll-driven animations
      if (profileRef.current) {
        // 1. Label fade in
        const label = profileRef.current.querySelector('.profile-label');
        gsap.fromTo(label,
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: profileRef.current, start: 'top 85%', toggleActions: 'play none none none' }
          }
        );

        // 2. Word-by-word scroll-driven color reveal
        const words = profileRef.current.querySelectorAll('.reveal-word');
        if (words.length > 0) {
          words.forEach((word, i) => {
            const isItalic = (word as HTMLElement).style.fontStyle === 'italic';
            gsap.to(word, {
              color: isItalic ? 'var(--gold)' : 'var(--forest)',
              ease: 'none',
              scrollTrigger: {
                trigger: profileRef.current,
                start: `top+=${60 + i * 28} 70%`,
                end: `top+=${90 + i * 28} 70%`,
                scrub: true,
              }
            });
          });
        }

        // 3. Gold line draw animation
        const line = profileRef.current.querySelector('.profile-line');
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

        // 4. Stat items staggered entrance
        const statItems = profileRef.current.querySelectorAll('.stat-item');
        gsap.to(statItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: profileRef.current.querySelector('.profile-stats-row'),
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onStart: () => {
            // 5. Animate counting numbers
            profileRef.current?.querySelectorAll('.stat-number').forEach((el) => {
              const target = parseInt((el as HTMLElement).dataset.target || '0', 10);
              const suffix = target === 13 ? '+' : '%';
              const obj = { val: 0 };
              gsap.to(obj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                onUpdate: () => {
                  (el as HTMLElement).textContent = Math.round(obj.val) + suffix;
                }
              });
            });

            // 6. TNRERA letter-by-letter typewriter
            const tnreraEl = profileRef.current?.querySelector('.stat-number-text') as HTMLElement;
            if (tnreraEl) {
              const text = 'TNRERA';
              tnreraEl.textContent = '';
              gsap.to(tnreraEl, { opacity: 1, duration: 0.1 });
              text.split('').forEach((char, i) => {
                gsap.delayedCall(0.3 + i * 0.12, () => {
                  tnreraEl.textContent = text.substring(0, i + 1);
                });
              });
            }
          }
        });

        // 7. Profile heritage right side container animation
        const heritage = profileRef.current.querySelector('.profile-heritage');
        if (heritage) {
          gsap.fromTo(heritage,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heritage,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }

      // Current Project
      if (projectRef.current) {
        const pImg = projectRef.current.querySelector('.project-image');
        const pText = projectRef.current.querySelector('.project-text');

        gsap.fromTo(pImg,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(pText,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Values Section Entrance
      if (valuesRef.current) {
        const title = valuesRef.current.querySelector('.eyebrow');
        const h2 = valuesRef.current.querySelector('h2');
        const headingItems = valuesRef.current.querySelectorAll('.value-heading-item');
        const details = valuesRef.current.querySelector('.values-details-col');
        const imageCol = valuesRef.current.querySelector('.values-image-col');
        const bottomBar = valuesRef.current.querySelector('.values-bottom-bar');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        tl.fromTo([title, h2],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );

        tl.fromTo(headingItems,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: (_idx, item) => item.classList.contains('active') ? 1 : 0.4,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'transform',
          },
          '-=0.3'
        );

        tl.fromTo(details,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );

        tl.fromTo(imageCol,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '<'
        );

        tl.fromTo(bottomBar,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // Dual CTA Cards
      if (dualCtaRef.current) {
        const ctaCards = dualCtaRef.current.querySelectorAll('.cta-card');
        gsap.fromTo(ctaCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: dualCtaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Media / Insights Stagger
      if (mediaRef.current) {
        const mediaCards = mediaRef.current.querySelectorAll('.media-card');
        gsap.fromTo(mediaCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mediaRef.current,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMsg('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Thank you! Our executive will get in touch with you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '', type: 'home-enquiry' });
      } else {
        setStatus('error');
        setResponseMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setResponseMsg('Failed to submit form. Please check your connection.');
    }
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section ref={heroRef} style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'var(--white)',
        padding: '120px 0 80px 0',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/images/7cents.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <span className="hero-eyebrow eyebrow" style={{ color: 'var(--gold)' }}>Welcome to Zenvistas</span>
          <h1 className="hero-title" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--white)',
            maxWidth: '900px',
            lineHeight: 1.1,
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)',
            fontWeight: 300
          }}>
            Creating Landmark <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Communities</span> Across South India
          </h1>

          <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn-gold">Explore Projects</Link>
            <Link href="/partnerships" className="btn-outline-white">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* 2. Corporate Profile & Founder Story */}
      <section ref={profileRef} style={{ padding: '130px 0', backgroundColor: 'var(--white)', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '38%',
          backgroundColor: 'var(--cream)',
          pointerEvents: 'none',
        }}></div>
        <div className="container-custom">
          <div className="grid-2-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.12fr) minmax(360px, 0.88fr)',
            gap: 'clamp(3rem, 7vw, 7rem)',
            alignItems: 'stretch',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* Left Side: Statement + Stats */}
            <div className="profile-text" style={{ padding: '20px 0' }}>
              <span className="profile-label eyebrow">About</span>

              {/* Word-by-word reveal heading */}
              <h2 className="profile-heading" style={{
                fontSize: 'clamp(2.35rem, 5vw, 4.6rem)',
                lineHeight: 1.05,
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                margin: 0,
                maxWidth: '900px',
              }}>
                {(() => {
                  const parts = [
                    { text: 'We build slowly, with founder capital, ', highlight: false },
                    { text: 'clear accountability,', highlight: true },
                    { text: ' and a bias for homes we would live in ourselves.', highlight: false },
                  ];
                  return parts.map((part, pIdx) => {
                    if (part.highlight) {
                      const words = part.text.split(' ');
                      return words.map((word, wIdx) => {
                        return (
                          <span key={`h-${pIdx}-${wIdx}`} className="reveal-word" style={{
                            display: 'inline-block',
                            color: 'rgba(171,148,138,0.25)',
                            fontStyle: 'italic',
                            transition: 'color 0.1s ease',
                            marginRight: '0.3em',
                          }}>
                            {word}
                          </span>
                        );
                      });
                    } else {
                      const words = part.text.split(' ').filter(w => w.length > 0);
                      return words.map((word, wIdx) => {
                        return (
                          <span key={`w-${pIdx}-${wIdx}`} className="reveal-word" style={{
                            display: 'inline-block',
                            color: 'rgba(40,54,43,0.12)',
                            transition: 'color 0.1s ease',
                            marginRight: '0.3em',
                          }}>
                            {word}
                          </span>
                        );
                      });
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
                Zenvistas is shaped by industrial families who understand long-cycle value. Our model is intentionally conservative: fewer projects, sharper oversight, no external debt pressure, and a constant focus on liveability.
              </p>

              {/* Stats Row */}
              <div className="profile-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, maxWidth: '820px', borderTop: '1px solid rgba(171,148,138,0.28)', borderBottom: '1px solid rgba(171,148,138,0.28)' }}>
                <div className="stat-item no-border-mobile" style={{ opacity: 0, transform: 'translateY(30px)', padding: '26px 26px 26px 0', borderRight: '1px solid rgba(171,148,138,0.22)' }}>
                  <div className="stat-number" data-target="13" style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 400,
                    color: 'var(--forest)',
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}>0+</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                    Industrial mill-owner families backing every project
                  </p>
                </div>
                <div className="stat-item no-border-mobile" style={{ opacity: 0, transform: 'translateY(30px)', padding: '26px', borderRight: '1px solid rgba(171,148,138,0.22)' }}>
                  <div className="stat-number" data-target="100" style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 400,
                    color: 'var(--forest)',
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}>0%</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                    Zero external debt — built entirely on partner capital reserves
                  </p>
                </div>
                <div className="stat-item" style={{ opacity: 0, transform: 'translateY(30px)', padding: '26px 0 26px 26px' }}>
                  <div className="stat-number-text" style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 400,
                    color: 'var(--forest)',
                    lineHeight: 1,
                    marginBottom: '12px',
                    opacity: 0,
                  }}>TNRERA</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                    Fully registered & compliant with all regulatory standards
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Coimbatore Location Card */}
            <div className="profile-heritage" style={{
              position: 'relative',
              width: '100%',
              opacity: 0,
              transform: 'translateY(40px)',
              minHeight: '100%',
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                minHeight: '520px',
                position: 'relative',
                overflow: 'hidden',
                background: '#28362b',
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
                  background: 'radial-gradient(circle at 82% 16%, rgba(224,177,76,0.18), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 42%)',
                }}></div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '18px' }}>Our operating lens</span>
                  <p style={{
                    margin: 0,
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 300,
                    fontSize: 'clamp(1.9rem, 3vw, 2.75rem)',
                    lineHeight: 1.12,
                    color: 'var(--white)',
                  }}>
                    Every project is filtered through ownership, restraint, and long-term community value.
                  </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, display: 'grid', gap: '24px', margin: '60px 0' }}>
                  {[
                    ['01', 'Founder proximity', 'Decision-makers stay close to design, construction, and buyer experience.'],
                    ['02', 'Capital discipline', 'Projects are planned around equity strength rather than pressure-led expansion.'],
                    ['03', 'Limited release', 'We prefer considered communities over high-volume residential inventory.'],
                  ].map(([num, title, copy]) => (
                    <div key={num} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: '18px', paddingTop: '22px', borderTop: '1px solid rgba(255,255,255,0.16)' }}>
                      <span style={{ fontFamily: 'var(--font-ui)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700 }}>{num}</span>
                      <div>
                        <h3 style={{ margin: '0 0 8px', color: 'var(--white)', fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: '1.35rem' }}>{title}</h3>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, fontSize: '0.92rem' }}>{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'flex-end', borderTop: '1px solid rgba(224,177,76,0.35)', paddingTop: '22px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, marginBottom: '8px' }}>Current focus</span>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>Coimbatore / Goldwins corridor</p>
                  </div>
                  <Link href="/about" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, borderBottom: '1px solid var(--gold)', paddingBottom: '4px' }}>
                    Our profile &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Current Projects Showcase */}
      <section ref={projectRef} id="portfolio" style={{ position: 'relative', backgroundColor: 'var(--forest)' }}>
        <div className="project-image" style={{
          position: 'relative',
          minHeight: 'clamp(620px, 86vh, 860px)',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <Image
            src="/images/View-47.jpg"
            alt="Zenora luxury villa community"
            fill
            priority={false}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(15, 28, 21, 0.86) 0%, rgba(15, 28, 21, 0.46) 42%, rgba(15, 28, 21, 0.08) 100%)',
          }}></div>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 28, 21, 0.05) 0%, rgba(15, 28, 21, 0.12) 52%, rgba(15, 28, 21, 0.72) 100%)',
          }}></div>

          <div className="container-custom project-text" style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            paddingTop: '120px',
            paddingBottom: 'clamp(70px, 9vw, 115px)',
          }}>
            <div style={{
              maxWidth: '680px',
              color: 'var(--white)',
            }}>
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Portfolio</span>
              <h2 style={{
                fontSize: 'clamp(3.4rem, 9vw, 7rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 300,
                lineHeight: 0.95,
                margin: '0 0 22px',
                color: 'var(--white)',
              }}>
                Zenora
              </h2>
              <p style={{
                margin: '0 0 34px',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.82)',
              }}>
                Goldwins, Avinashi Road, Coimbatore
              </p>
              <div style={{
                width: '72px',
                height: '1px',
                backgroundColor: 'var(--gold)',
                marginBottom: '34px',
              }}></div>
              <p style={{
                maxWidth: '520px',
                margin: '0 0 38px',
                color: 'rgba(255, 255, 255, 0.78)',
                fontSize: 'clamp(1rem, 1.5vw, 1.12rem)',
                lineHeight: 1.75,
              }}>
                A private villa address shaped around generous plots, quiet architecture, and a more considered way of living in Coimbatore.
              </p>
              <Link
                href="/projects"
                className="btn-gold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(224, 177, 76, 0.95)',
                  borderColor: 'rgba(224, 177, 76, 0.95)',
                }}
              >
                View Full Project ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Development Expertise (Interactive Values Section) */}
      <section ref={valuesRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--white)', overflow: 'hidden', padding: '80px 0', position: 'relative' }} id="expertise">
        <div className="values-image-col" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '38vw',
          minWidth: '460px',
          overflow: 'hidden',
        }}>
          {valuesData.map((val, idx) => (
            <div
              key={idx}
              className="values-image-wrapper"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: activeIndex === idx ? 1 : 0,
                transform: activeIndex === idx ? 'scale(1)' : 'scale(1.04)',
                transition: 'opacity 0.6s ease, transform 0.8s ease',
                zIndex: activeIndex === idx ? 2 : 1
              }}
            >
              <Image
                src={val.image}
                alt={val.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="34vw"
              />
            </div>
          ))}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.78) 20%, rgba(255,255,255,0.24) 48%, rgba(255,255,255,0) 72%)',
            pointerEvents: 'none',
          }}></div>
        </div>

        <div className="container-custom" style={{ position: 'relative', zIndex: 4 }}>
          <div style={{ marginBottom: '60px' }}>
            <span className="eyebrow">Development Expertise</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              What Sets Us <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Apart</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px 0 0 0' }}></div>
          </div>

          {/* Interactive Values Container */}
          <div className="values-interactive-container" style={{ display: 'flex', gap: '3rem', marginTop: '40px', maxWidth: 'calc(62vw - 4rem)' }}>

            {/* Left Column: Headings */}
            <div className="values-headings-col" style={{ flex: '1.3', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {valuesData.map((val, idx) => (
                  <div
                    key={idx}
                    className={`value-heading-item ${activeIndex === idx ? 'active' : ''}`}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onClick={() => handleMouseEnter(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      position: 'relative',
                      paddingLeft: '20px',
                      transition: 'opacity 0.3s ease',
                      opacity: activeIndex === idx ? 1 : 0.4
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        marginRight: '1.5rem',
                        marginTop: '0.4rem'
                      }}>{val.num}</span>
                      <h3 style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        lineHeight: 1,
                        textTransform: 'none',
                        margin: 0,
                        color: 'var(--forest)'
                      }}>
                        {val.title.split('\n').map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {line}
                            {lIdx === val.title.split('\n').length - 1 && activeIndex === idx && (
                              <span className="dot-marker" style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--forest)',
                                marginLeft: '15px',
                                verticalAlign: 'middle'
                              }}></span>
                            )}
                            {lIdx < val.title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
                    </div>

                    {/* Mobile Only inline details */}
                    <div
                      className="mobile-val-details"
                      style={{
                        display: 'none',
                        width: '100%'
                      }}
                    >
                      {activeIndex === idx && (
                        <div style={{ marginTop: '15px' }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-3)', lineHeight: '1.6', marginBottom: '15px' }}>
                            {val.description}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                            {val.points.map((pt, pIdx) => (
                              <div key={pIdx} style={{ fontSize: '0.85rem', color: 'var(--forest)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--gold)' }}>↳</span> {pt}
                              </div>
                            ))}
                          </div>
                          <div style={{ position: 'relative', height: '200px', width: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(171,148,138,0.15)' }}>
                            <Image
                              src={val.image}
                              alt={val.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="100vw"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Middle Column: Details & Points */}
            <div className="values-details-col" style={{ flex: '0 0 330px', maxWidth: '330px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div ref={detailsRef} style={{ opacity: 1 }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {valuesData[activeIndex].description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {valuesData[activeIndex].points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold)' }}>↳</span> {pt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Link Bar */}
          <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }} className="values-bottom-bar">
            <Link href="/about" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              our profile ↗
            </Link>
            <span style={{ fontSize: '0.9rem', color: 'var(--charcoal-3)' }}>
              More about our history and the background of our industrial mill owner founders.
            </span>
          </div>

        </div>
      </section>

      {/* 5. Dual CTA: Partnerships & Investors */}
      <section ref={dualCtaRef} style={{
        position: 'relative',
        padding: '120px 0',
        backgroundImage: "linear-gradient(to right, rgba(40,54,43,0.95) 0%, rgba(40,54,43,0.95) 100%), url('/images/living room.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)'
      }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>Opportunities</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--white)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Partner With <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Zenvistas</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0', backgroundColor: 'var(--gold)' }}></div>
          </div>

          <div className="grid-2" style={{ gap: '3rem' }}>
            <div className="cta-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Landowners</span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--white)', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Landowner Partnerships</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px', fontSize: '0.95rem' }}>
                Do you own land in Coimbatore or Chennai? Join hands with Zenvistas to unlock the maximum potential value of your property. We offer Joint Development, Revenue Sharing, and Outright Purchase models.
              </p>
              <Link href="/partnerships" className="btn-gold" style={{ width: '100%' }}>Explore Joint Development</Link>
            </div>
            <div className="cta-card" style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Investors</span>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--white)', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Investment Relations</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '30px', fontSize: '0.95rem' }}>
                We invite NRIs, HNIs, Family Offices, and institutional partners to invest in Zenvistas' premium residential developments. Benefit from our zero-debt growth model, regulatory compliance, and high quality yield.
              </p>
              <Link href="/investors" className="btn-outline-white" style={{ width: '100%' }}>Investment Opportunities</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Media & News Section */}
      <section ref={mediaRef} style={{ padding: '120px 0', backgroundColor: 'var(--white)', borderTop: '1px solid rgba(171,148,138,0.14)' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 'clamp(3rem, 7vw, 7rem)', alignItems: 'start', marginBottom: '70px' }} className="insights-header-grid">
            <div style={{ position: 'sticky', top: '120px' }}>
              <span className="eyebrow">Insights</span>
              <h2 style={{ fontSize: 'clamp(2.6rem, 5vw, 4.75rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 0.98, margin: '0 0 30px' }}>
                Notes from the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>market</span>
              </h2>
              <div className="section-rule" style={{ margin: 0 }}></div>
            </div>

            <div>
              <article className="media-card" style={{ borderTop: '1px solid rgba(40,54,43,0.22)', paddingTop: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '2rem', alignItems: 'start' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: 1.6 }}>June<br />10<br />2026</span>
                  <div>
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.05, margin: '0 0 24px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                      <Link href="/media#future" style={{ color: 'var(--forest)' }}>
                        Coimbatore is moving toward quieter, more curated residential formats.
                      </Link>
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--charcoal-3)', lineHeight: 1.8, maxWidth: '620px', margin: '0 0 30px' }}>
                      A read on why industrial families and business owners are choosing boutique, master-planned enclaves over denser residential products.
                    </p>
                    <Link href="/media#future" style={{ fontFamily: 'var(--font-ui)', color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.14em', borderBottom: '1px solid var(--gold)', paddingBottom: '4px' }}>Read the note &rarr;</Link>
                  </div>
                </div>
              </article>

              <div style={{ height: '1px', backgroundColor: 'rgba(171,148,138,0.22)', margin: '48px 0 0' }}></div>
              <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'space-between', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Research, market notes, and development perspectives from Zenvistas.</span>
                <Link href="/media" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold)', borderBottom: '1px solid var(--gold)', paddingBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>View all insights &rarr;</Link>
              </div>
            </div>

          </div>

          <article className="media-card insights-secondary" style={{
            marginLeft: 'min(24vw, 340px)',
            borderTop: '1px solid rgba(40,54,43,0.18)',
            paddingTop: '28px',
            display: 'grid',
            gridTemplateColumns: '120px 1fr auto',
            gap: '2rem',
            alignItems: 'start',
          }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>May 24, 2026</span>
            <div>
              <h4 style={{ fontSize: 'clamp(1.35rem, 2.2vw, 2rem)', lineHeight: 1.15, margin: '0 0 12px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                <Link href="/media#jv" style={{ color: 'var(--forest)' }}>Joint development is becoming the more disciplined landowner conversation.</Link>
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-3)', lineHeight: 1.7, margin: 0, maxWidth: '600px' }}>
                Why structured JDAs are gaining preference in primary southern markets.
              </p>
            </div>
            <Link href="/media#jv" style={{ fontFamily: 'var(--font-ui)', color: 'var(--gold)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', whiteSpace: 'nowrap', borderBottom: '1px solid var(--gold)', paddingBottom: '3px' }}>Read &rarr;</Link>
          </article>
        </div>
      </section>

      {/* 7. Enquiry CTA Form Section */}
      <section className="connect-section" style={{ padding: '120px 0', backgroundColor: '#34090D', color: 'var(--white)', position: 'relative', overflow: 'hidden' }} id="enquiry">
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 18% 20%, rgba(224,177,76,0.16), transparent 28%), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: 'auto, 76px 76px',
          pointerEvents: 'none',
        }}></div>
        <div className="container-custom connect-grid" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 'clamp(3rem, 7vw, 7rem)', alignItems: 'start' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>Connect</span>
            <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 0.95, margin: '0 0 28px', color: 'var(--white)' }}>
              Begin the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>conversation</span>
            </h2>
            <div className="section-rule" style={{ margin: '0 0 34px', backgroundColor: 'var(--gold)' }}></div>
            <p style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: '480px', margin: '0 0 48px' }}>
              Speak to the Zenvistas team about projects, land partnerships, investment interest, or a private site conversation.
            </p>
            <div style={{ display: 'grid', gap: '26px', maxWidth: '460px' }}>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '18px' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontWeight: 700 }}>Response window</span>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>An executive will get back with the right next step.</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: '18px' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', fontWeight: 700 }}>For landowners</span>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>Share location, land extent, and ownership context in the message.</p>
              </div>
            </div>
          </div>

          <div className="connect-form-panel" style={{ padding: 'clamp(28px, 4vw, 48px)', border: '1px solid rgba(255,255,255,0.16)', backgroundColor: 'rgba(255,255,255,0.075)', backdropFilter: 'blur(18px)', boxShadow: '0 28px 70px rgba(0,0,0,0.22)' }}>
            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="type">Nature of Enquiry</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--white)',
                      appearance: 'none',
                      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='%23e0b14c' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 15px center',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="home-enquiry">General Property Enquiry</option>
                    <option value="jv-proposal">Joint Development Proposal</option>
                    <option value="land-sale">Land Outright Purchase</option>
                    <option value="investor">Investment Query</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="form-submit"
              >
                {status === 'loading' ? 'Submitting...' : 'Send Enquiry'}
              </button>

              {status === 'success' && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'center' }}>
                  {responseMsg}
                </div>
              )}
              {status === 'error' && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fce8e6', color: '#c5221f', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'center' }}>
                  {responseMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
