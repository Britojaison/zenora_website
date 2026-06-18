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
      <section ref={heroRef} className="page-hero page-hero-about" style={{ display: 'flex', alignItems: 'center', minHeight: '40vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/images/villa.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.55)',
          zIndex: 1
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)' }}>
          <span className="hero-eyebrow eyebrow" style={{ color: 'var(--gold)' }}>Who We Are</span>
          <h1 className="hero-title" style={{ color: 'var(--white)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Our Legacy, <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Your Future</span>
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Built on over a half-century of industrial excellence, bringing precision and integrity to real estate development.
          </p>
        </div>
      </section>

      {/* 1. Group History */}
      <section ref={historyRef} style={{ backgroundColor: 'var(--white)', padding: '80px 0' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div className="history-text">
              <span className="eyebrow">A Rich Heritage</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '1.5rem' }}>
                Decades of Industrial <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Excellence</span>
              </h2>
              <div className="section-rule"></div>
              <p style={{ marginBottom: '1.2rem', color: 'var(--forest)' }}>
                ZenVistas stems from the long-standing tradition of leading industrialists in Coimbatore. With strong roots in textile, engineering, and manufacturing sectors, we have built a reputation on high standards, strict adherence to deadlines, and unparalleled client focus.
              </p>
              <p style={{ color: 'var(--forest)' }}>
                This legacy of building enterprise infrastructure translates seamlessly into the residential sector. We understand that a home is more than an asset; it is the physical space for generations of memory.
              </p>
            </div>
            <div className="history-card" style={{ backgroundColor: 'var(--cream)', padding: '2.5rem', borderRadius: '4px', borderLeft: '4px solid var(--gold)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.3rem', marginBottom: '1rem' }}>Our Milestones</h4>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <strong style={{ color: 'var(--gold)', minWidth: '60px' }}>1970s</strong>
                  <span style={{ fontSize: '0.95rem' }}>Pioneered state-of-the-art textile manufacturing facilities in South India.</span>
                </li>
                <li style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <strong style={{ color: 'var(--gold)', minWidth: '60px' }}>2000s</strong>
                  <span style={{ fontSize: '0.95rem' }}>Expanded into precision engineering and infrastructure development.</span>
                </li>
                <li style={{ display: 'flex', gap: '1rem' }}>
                  <strong style={{ color: 'var(--gold)', minWidth: '60px' }}>Present</strong>
                  <span style={{ fontSize: '0.95rem' }}>Delivering landmark residential spaces matching international design benchmarks.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section ref={visionRef} style={{ backgroundColor: 'var(--cream)', padding: '80px 0' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '3rem' }}>
            <div className="vision-box" style={{ backgroundColor: 'var(--white)', padding: '2.5rem', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <span className="eyebrow" style={{ fontSize: '0.75rem' }}>Our Vision</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '1rem' }}>Redefining Real Estate</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--forest)', lineHeight: '1.7' }}>
                To become South India’s most trusted developer of luxury communities, admired for precision engineering, innovative architecture, and an unwavering commitment to quality and transparency.
              </p>
            </div>
            <div className="vision-box" style={{ backgroundColor: 'var(--white)', padding: '2.5rem', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <span className="eyebrow" style={{ fontSize: '0.75rem' }}>Our Mission</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '1rem' }}>Crafting Perfection</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--forest)', lineHeight: '1.7' }}>
                To create living spaces that stand the test of time. We aim to deliver exceptional customer journeys through professional management, strict regulatory compliance, and a focus on community-centric living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership Team */}
      <section ref={leadershipRef} style={{ backgroundColor: 'var(--white)', padding: '80px 0' }}>
        <div className="container-custom">
          <div className="leadership-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">The Minds Behind</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Our Executive <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Leadership</span>
            </h2>
            <div className="section-rule" style={{ margin: '1.5rem auto 0' }}></div>
          </div>

          <div className="grid-3" style={{ gap: '3rem' }}>
            <div className="leadership-card" style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'var(--cream-2)', margin: '0 auto 1.5rem', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--forest)', fontWeight: 'bold', fontSize: '1.5rem' }}>M.R</div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.3rem', margin: '0 0 0.25rem' }}>M. Ramaswamy</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Chairman & Co-Founder</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--forest)' }}>
                A veteran industrialist with over 40 years of experience in the textile sector, driving the group's legacy forward.
              </p>
            </div>
            <div className="leadership-card" style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'var(--cream-2)', margin: '0 auto 1.5rem', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--forest)', fontWeight: 'bold', fontSize: '1.5rem' }}>S.K</div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.3rem', margin: '0 0 0.25rem' }}>S. Karthik</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Managing Director</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--forest)' }}>
                Pioneering innovation and strategic expansion, shaping the vision of modern luxury communities in South India.
              </p>
            </div>
            <div className="leadership-card" style={{ textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'var(--cream-2)', margin: '0 auto 1.5rem', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--forest)', fontWeight: 'bold', fontSize: '1.5rem' }}>R.N</div>
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.3rem', margin: '0 0 0.25rem' }}>R. Narayanan</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Director of Projects</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--forest)' }}>
                Overseeing end-to-end development, engineering compliance, and timely project delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Corporate Governance & 5. Brand Philosophy */}
      <section ref={governanceRef} style={{ backgroundColor: 'var(--cream-2)', padding: '80px 0' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '4rem' }}>
            <div className="gov-col">
              <span className="eyebrow">Governance</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '1.5rem' }}>Transparency & Compliance</h3>
              <p style={{ color: 'var(--forest)', marginBottom: '1rem' }}>
                We believe that good governance is the bedrock of lasting relationships. Every transaction, contract, and project layout is fully vetted, compliant, and open to audit.
              </p>
              <p style={{ color: 'var(--forest)' }}>
                RERA is integrated into our project schedules, giving you the complete peace of mind that timelines are strictly respected and backed by escrow and financial guarantees.
              </p>
            </div>
            <div className="gov-col">
              <span className="eyebrow">Our Philosophy</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '1.5rem' }}>Designed to Inspire</h3>
              <p style={{ color: 'var(--forest)', marginBottom: '1rem' }}>
                We do not build to maximum capacity; we design to maximum living quality. We create spacious homes with vast private areas and world-class landscaping to foster health, connection, and long-term peace of mind.
              </p>
              <p style={{ color: 'var(--forest)' }}>
                Our philosophy prioritizes sustainable materials, natural lighting, energy efficiency, and modern architectural elegance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
