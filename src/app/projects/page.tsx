'use strict';
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Hero Entrance
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

    // 2. Scroll Animations
    const scrollCtx = gsap.context(() => {
      // Details section
      if (detailsRef.current) {
        const textCol = detailsRef.current.querySelector('.details-text');
        const imgCol = detailsRef.current.querySelector('.details-image');

        gsap.fromTo(textCol,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(imgCol,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Amenities stagger
      if (amenitiesRef.current) {
        const cards = amenitiesRef.current.querySelectorAll('.amenity-card');
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: amenitiesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Rera section
      if (reraRef.current) {
        gsap.fromTo(reraRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: reraRef.current,
              start: 'top 85%',
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
      <section ref={heroRef} className="page-hero" style={{ display: 'flex', alignItems: 'center', minHeight: '45vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "linear-gradient(to bottom, rgba(40,54,43,0.8) 0%, rgba(40,54,43,0.6) 100%), url('/images/living room.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)' }}>
          <span className="hero-eyebrow eyebrow" style={{ color: 'var(--gold)' }}>Our Portfolio</span>
          <h1 className="hero-title" style={{ color: 'var(--white)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Curated Luxury <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Communities</span>
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Designing spaces that hold and grow their character over generations, offering absolute privacy, refined design, and structural perfection.
          </p>
        </div>
      </section>

      {/* Main Project: Zenora */}
      <section ref={detailsRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem', alignItems: 'center' }} className="grid-2-responsive">
            <div className="details-text">
              <span className="eyebrow">Featured Development</span>
              <h2 style={{ fontSize: '3rem', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Zenora <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Villas</span>
              </h2>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold)', fontWeight: 600, marginBottom: '24px' }}>
                Goldwins, Coimbatore, Tamil Nadu
              </div>
              <div className="section-rule"></div>
              
              <p style={{ fontSize: '1.05rem', color: 'var(--charcoal-3)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                Zenora is Zenvistas' flagship villa community. Located in Goldwins, right off Avinashi Road, Zenora brings together the finest components of architectural elegance, landscape design, and build quality.
              </p>
              <p style={{ color: 'var(--charcoal-3)', marginBottom: '30px' }}>
                Every villa is structured on a generous land plot (4,000 to 7,500 sq.ft.), providing maximum private space and ventilation. With a zero-compromise approach, Zenora features wide internal roads, advanced smart-home integrations, and premium amenities professionally managed long after possession.
              </p>

              {/* Project Specifications */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '40px' }} className="grid-2-spec">
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '15px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)' }}>Project Status</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--forest)' }}>Ongoing Development</strong>
                </div>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '15px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)' }}>Typology</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--forest)' }}>Luxury Gated Villas</strong>
                </div>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '15px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)' }}>Number of Units</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--forest)' }}>Exclusively Limited</strong>
                </div>
                <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '15px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)' }}>Compliance</div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--forest)' }}>RERA Registered</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-gold">Enquire Now</Link>
                <a href="#amenities" className="btn-outline">View Amenities</a>
              </div>
            </div>

            <div className="details-image">
              <div style={{ border: '1px solid var(--gold)', padding: '12px', borderRadius: '4px', backgroundColor: 'var(--cream)', marginBottom: '30px' }}>
                <Image
                  src="/images/villa.jpg"
                  alt="Zenora Villa Frontage"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
                />
              </div>
              <div style={{ border: '1px solid var(--gold)', padding: '12px', borderRadius: '4px', backgroundColor: 'var(--cream)' }}>
                <Image
                  src="/images/living room.jpg"
                  alt="Zenora Villa Living Area"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Amenities */}
      <section ref={amenitiesRef} id="amenities" style={{ backgroundColor: 'var(--cream)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">The Experience</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Curated Community <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Amenities</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div className="grid-3">
            <div className="amenity-card" style={{ backgroundColor: 'var(--white)', padding: '40px 30px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.1)' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Private Clubhouse</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                A multi-level club space featuring formal lounge areas, business center, and meeting suites designed exclusively for residents and guests.
              </p>
            </div>
            <div className="amenity-card" style={{ backgroundColor: 'var(--white)', padding: '40px 30px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.1)' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Botanical Gardens</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Lush, mature tree canopies, reflexology paths, and linear park lanes designed by award-winning landscape architects.
              </p>
            </div>
            <div className="amenity-card" style={{ backgroundColor: 'var(--white)', padding: '40px 30px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.1)' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Advanced Security</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                24/7 multi-tier perimeter surveillance, biometric access gates, and video-door communications integrated directly with mobile applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RERA Notice */}
      <section ref={reraRef} style={{ backgroundColor: 'var(--forest)', color: 'var(--white)', padding: '60px 0', textAlign: 'center' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>RERA Registered Development</span>
          <h3 style={{ color: 'var(--white)', fontSize: '1.75rem', marginBottom: '15px', fontFamily: 'var(--font-serif)' }}>Transparency in Every Step</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '24px' }}>
            We believe compliance is the first step to building trust. Zenora is fully registered under the Tamil Nadu Real Estate Regulatory Authority (TNRERA). Verify details using the official registry links.
          </p>
          <a
            href="https://tnrera.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Visit TNRERA Registry
          </a>
        </div>
      </section>
    </div>
  );
}
