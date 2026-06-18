'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Media() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Entrance
    const heroCtx = gsap.context(() => {
      const container = heroRef.current;
      if (container) {
        const eyebrow = container.querySelector('.eyebrow');
        const title = container.querySelector('h1');
        const subtitle = container.querySelector('p');

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

    // ScrollTriggers
    const scrollCtx = gsap.context(() => {
      // Articles stagger
      if (articlesRef.current) {
        const articles = articlesRef.current.querySelectorAll('article');
        
        gsap.fromTo(articles,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: articlesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Newsletter
      if (newsletterRef.current) {
        gsap.fromTo(newsletterRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: newsletterRef.current,
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setMsg('');

    try {
      const payload = {
        name: 'Newsletter Subscriber',
        email,
        phone: '0000000000',
        type: 'newsletter-signup',
        message: 'Subscribed to media newsletters and insights.'
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg("Thank you! You've been subscribed to our private briefings list.");
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMsg('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div>
      {/* Page Hero */}
      <section className="page-hero" style={{ display: 'flex', alignItems: 'center', minHeight: '45vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "linear-gradient(to bottom, rgba(40,54,43,0.85) 0%, rgba(40,54,43,0.6) 100%), url('/images/seat.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Insights & Updates</span>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Media & <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Insights</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Analysis and perspectives on luxury real estate, regulatory shifts, joint development models, and the growth of Coimbatore.
          </p>
        </div>
      </section>

      {/* Main Articles Listing */}
      <section ref={articlesRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            
            {/* Article 1 */}
            <article id="future" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }} className="grid-2-responsive">
              <div style={{ borderRight: '1px solid rgba(171,148,138,0.2)', paddingRight: '2rem' }} className="no-border-mobile">
                <span className="eyebrow">Market Analysis</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'block', marginBottom: '10px' }}>June 10, 2026</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 600 }}>By Karthik S.</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.85rem', marginBottom: '16px', fontFamily: 'var(--font-serif)', lineHeight: '1.3' }}>
                  The Future of Coimbatore Real Estate: A Shift Towards Curated Living
                </h3>
                <p style={{ color: 'var(--charcoal-3)', fontSize: '1rem', marginBottom: '20px' }}>
                  Coimbatore's real estate market is witnessing a distinct transition. As industrial hubs expand and Avinashi Road matures, high-density residential high-rises are facing competition from low-density, master-planned developments. Discerning buyers are willing to invest in spacious layouts (villas with land plot extents of 4,000 sq.ft. or more) that offer long-term privacy, community safety, and dedicated green corridors.
                </p>
                <p style={{ color: 'var(--charcoal-3)', fontSize: '1rem', marginBottom: '20px' }}>
                  This shift is powered by local business owners and professionals who have traveled globally. They seek communities that incorporate professional post-possession management and build quality matching international benchmarks, without the common shortcuts that are typical in high-volume, generic housing.
                </p>
              </div>
            </article>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(171,148,138,0.15)' }} />

            {/* Article 2 */}
            <article id="jv" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem' }} className="grid-2-responsive">
              <div style={{ borderRight: '1px solid rgba(171,148,138,0.2)', paddingRight: '2rem' }} className="no-border-mobile">
                <span className="eyebrow">Joint Development</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'block', marginBottom: '10px' }}>May 24, 2026</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--forest)', fontWeight: 600 }}>By Zenvistas Land Team</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.85rem', marginBottom: '16px', fontFamily: 'var(--font-serif)', lineHeight: '1.3' }}>
                  Why Joint Development Models Are Growing In Southern Markets
                </h3>
                <p style={{ color: 'var(--charcoal-3)', fontSize: '1rem', marginBottom: '20px' }}>
                  Joint Development Agreements (JDAs) are becoming the preferred structural model for urban landowners. By partnering with developers who have strong brand equity and capital reserves, landowners can unlock the full commercial potential of their properties without taking on development risk.
                </p>
                <p style={{ color: 'var(--charcoal-3)', fontSize: '1rem', marginBottom: '20px' }}>
                  Key factors driving JDA success in 2026 include RERA-driven compliance, escrow accounts that segregate project revenue, and clear, transparent contracts. In secondary and primary hubs like Coimbatore and Chennai, partnering with a developer that prioritizes boutique quality over volume ensures a premium, highly sought-after community that commands higher margins.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section ref={newsletterRef} style={{ backgroundColor: 'var(--cream)', padding: '80px 0', borderTop: '1px solid rgba(171,148,138,0.15)' }}>
        <div className="container-custom" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <span className="eyebrow">Stay Informed</span>
          <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '15px' }}>Receive Private Briefings</h3>
          <p style={{ color: 'var(--charcoal-3)', fontSize: '0.95rem', marginBottom: '30px' }}>
            Subscribe to receive our curated newsletters, upcoming project announcements, and insights directly in your inbox.
          </p>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: '1 0 280px',
                padding: '14px 18px',
                backgroundColor: 'var(--white)',
                border: '1px solid rgba(171,148,138,0.3)',
                borderRadius: '2px',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold"
              style={{ padding: '14px 28px' }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {status === 'success' && (
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '4px', fontSize: '0.85rem' }}>
              {msg}
            </div>
          )}
          {status === 'error' && (
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#fce8e6', color: '#c5221f', borderRadius: '4px', fontSize: '0.85rem' }}>
              {msg}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
