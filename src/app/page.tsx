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
    title: "Zero-debt\noperations",
    description: "Outright purchase of land parcels with clear title records before construction starts protects Zenvistas and partners from leverage risk.",
    points: [
      "Outright Land Purchase",
      "Clean Title Verification",
      "Comprehensive Legal Audit",
      "Zero Mortgage Liability"
    ],
    image: "/images/villa_hero.jpg"
  },
  {
    num: "05",
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
      // Corporate Profile
      if (profileRef.current) {
        const textCol = profileRef.current.querySelector('.profile-text');
        const imgCol = profileRef.current.querySelector('.profile-image');

        gsap.fromTo(textCol,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: profileRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(imgCol,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: profileRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
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
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', clearProps: 'opacity,transform' },
          '-=0.3'
        );

        tl.fromTo([details, imageCol],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
          '-=0.4'
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
          backgroundImage: "linear-gradient(to bottom, rgba(40,54,43,0.85) 0%, rgba(40,54,43,0.6) 50%, rgba(40,54,43,0.9) 100%), url('/images/villa_hero.jpg')",
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
          <p className="hero-subtitle" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: '640px', color: 'var(--linen)', marginBottom: '40px', fontWeight: 300, lineHeight: 1.7 }}>
            Born from Coimbatore's rich industrial heritage, we design and build luxury residential spaces committed to precision engineering, absolute transparency, and architectural perfection.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn-gold">Explore Projects</Link>
            <Link href="/partnerships" className="btn-outline-white">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* 2. Corporate Profile & Founder Story */}
      <section ref={profileRef} style={{ padding: '100px 0', backgroundColor: 'var(--white)' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '5rem', alignItems: 'center' }}>
            <div className="profile-text">
              <span className="eyebrow">Corporate Profile</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '24px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Founded by Coimbatore's <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>industrial families.</span>
              </h2>
              <div className="section-rule"></div>
              <p style={{ color: 'var(--charcoal-3)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                The textile and manufacturing families behind ZenVistas have been building businesses in Coimbatore for generations. They understand what it means to make a long-term commitment to quality — and to be accountable for the outcome.
              </p>
              <p style={{ color: 'var(--charcoal-3)', marginBottom: '20px' }}>
                When this group of 13+ mill owners and investing partners came together, the conversation was not about quick returns. It was about what kind of residential community Coimbatore's established families deserved, and what it would take to build it without compromise.
              </p>
              <Link href="/about" className="btn-outline" style={{ marginTop: '10px' }}>Read Our Story</Link>
            </div>
            <div className="profile-image" style={{ position: 'relative' }}>
              <div style={{ border: '1px solid var(--gold)', padding: '12px', borderRadius: '4px', backgroundColor: 'var(--cream)' }}>
                <Image
                  src="/images/seat.jpg"
                  alt="Zenvistas Executive Space"
                  width={600}
                  height={450}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                right: '25px',
                backgroundColor: 'var(--forest)',
                color: 'var(--white)',
                padding: '20px 30px',
                borderRadius: '2px',
                borderLeft: '4px solid var(--gold)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }} className="hide-mobile">
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1 }}>13+</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px' }}>Industrial Founders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Current Projects Showcase */}
      <section ref={projectRef} style={{ padding: '100px 0', backgroundColor: 'var(--cream)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Portfolio</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Current <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Projects</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', backgroundColor: 'var(--white)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.15)' }} className="grid-2-responsive">
            <div className="project-image">
              <Image
                src="/images/villa.jpg"
                alt="Zenora Villa Community"
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
              />
            </div>
            <div className="project-text">
              <span className="eyebrow" style={{ color: 'var(--taupe)' }}>Ongoing Development</span>
              <h3 style={{ fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Zenora</h3>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold)', fontWeight: 600, marginBottom: '20px' }}>
                Goldwins, Avinashi Road, Coimbatore
              </p>
              <p style={{ color: 'var(--charcoal-3)', marginBottom: '24px' }}>
                A highly curated luxury villa community featuring vast private plots, bespoke architecture, and state-of-the-art infrastructure. Designed for Coimbatore's most discerning families, Zenora brings international design standards to Coimbatore's premier residential hub.
              </p>
              <div style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--gold)' }}>✓</strong>
                  <span>Plot Extents: 4,000 to 7,500 sq.ft.</span>
                </div>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--gold)' }}>✓</strong>
                  <span>Professional post-possession maintenance.</span>
                </div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
                  <strong style={{ color: 'var(--gold)' }}>✓</strong>
                  <span>TNRERA Registered Development.</span>
                </div>
              </div>
              <Link href="/projects" className="btn-gold">Explore Zenora</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Development Expertise (Interactive Values Section) */}
      <section ref={valuesRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--white)', overflow: 'hidden', padding: '80px 0' }} id="expertise">
        <div className="container-custom">
          <div style={{ marginBottom: '60px' }}>
            <span className="eyebrow">Development Expertise</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              What Sets Us <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Apart</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px 0 0 0' }}></div>
          </div>

          {/* Interactive Values Container */}
          <div className="values-interactive-container" style={{ display: 'flex', gap: '3rem', marginTop: '40px' }}>
            
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
            <div className="values-details-col" style={{ flex: '0.9', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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

            {/* Right Column: Image Container */}
            <div className="values-image-col" style={{ flex: '1', position: 'relative', height: '320px', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.15)', padding: '8px', backgroundColor: 'var(--cream)' }}>
              {valuesData.map((val, idx) => (
                <div 
                  key={idx}
                  className="values-image-wrapper"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    right: '8px',
                    bottom: '8px',
                    opacity: activeIndex === idx ? 1 : 0,
                    transform: activeIndex === idx ? 'scale(1)' : 'scale(1.05)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    zIndex: activeIndex === idx ? 2 : 1
                  }}
                >
                  <Image
                    src={val.image}
                    alt={val.title}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '2px' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
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
      <section ref={mediaRef} style={{ padding: '100px 0', backgroundColor: 'var(--white)' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="eyebrow">Insights</span>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Recent <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Media</span>
              </h2>
            </div>
            <Link href="/media" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold)', borderBottom: '1px solid var(--gold)', paddingBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>View All Insights &rarr;</Link>
          </div>

          <div className="grid-2" style={{ gap: '3rem' }}>
            <div className="media-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ backgroundColor: 'var(--cream)', padding: '30px', borderRadius: '4px', borderLeft: '3px solid var(--gold)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>June 10, 2026</span>
                <h4 style={{ fontSize: '1.35rem', marginBottom: '10px', fontFamily: 'var(--font-serif)' }}>
                  <Link href="/media#future" style={{ color: 'var(--forest)' }}>The Future of Coimbatore Real Estate: A Shift Towards Curated Living</Link>
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-3)', marginBottom: '15px' }}>
                  Explore how Coimbatore's top business leaders are pivoting towards boutique, master-planned residential enclaves over dense multi-storey developments.
                </p>
                <Link href="/media#future" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem', marginTop: 'auto' }}>Read Article &rarr;</Link>
              </div>
            </div>
            <div className="media-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ backgroundColor: 'var(--cream)', padding: '30px', borderRadius: '4px', borderLeft: '3px solid var(--gold)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>May 24, 2026</span>
                <h4 style={{ fontSize: '1.35rem', marginBottom: '10px', fontFamily: 'var(--font-serif)' }}>
                  <Link href="/media#jv" style={{ color: 'var(--forest)' }}>Why Joint Development Models Are Growing In Southern Markets</Link>
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-3)', marginBottom: '15px' }}>
                  For landowners in primary urban hubs, Joint Development Agreements (JDAs) offer high revenue potential and structured transparency when partnering with established names.
                </p>
                <Link href="/media#jv" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.85rem', marginTop: 'auto' }}>Read Article &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Enquiry CTA Form Section */}
      <section style={{ padding: '100px 0', backgroundColor: 'var(--cream)', borderTop: '1px solid rgba(171,148,138,0.15)' }} id="enquiry">
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="eyebrow">Connect</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Speak with the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Zenvistas Team</span>
            </h2>
            <p style={{ color: 'var(--charcoal-3)', marginTop: '10px', fontSize: '1rem' }}>
              Have questions about projects, partnerships, or land sales? Submit your details below, and an executive will contact you directly.
            </p>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
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
                      backgroundColor: 'var(--white)',
                      border: '1px solid rgba(171, 148, 138, 0.3)',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem',
                      color: 'var(--forest)',
                      appearance: 'none',
                      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='%2328362b' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\")",
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
