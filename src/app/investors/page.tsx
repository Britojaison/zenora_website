'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Investors() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    investorType: 'HNI / Private Investor',
    type: 'investor-query'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const serveRef = useRef<HTMLDivElement>(null);

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
      // Philosophy cards stagger
      if (philosophyRef.current) {
        const title = philosophyRef.current.querySelector('h2');
        const cards = philosophyRef.current.querySelectorAll('.grid-3 > div');

        gsap.fromTo(title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: philosophyRef.current,
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
              trigger: philosophyRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Who We Serve & Form
      if (serveRef.current) {
        const textCol = serveRef.current.querySelector('.grid-2 > div:first-child');
        const formBox = serveRef.current.querySelector('.grid-2 > div:last-child');

        gsap.fromTo(textCol,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serveRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(formBox,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: serveRef.current,
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
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        message: `Investor Type: ${formData.investorType} | Message: ${formData.message}`
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your investor query has been received securely. An executive director from our investment desk will contact you.');
        setFormData({ name: '', email: '', phone: '', message: '', investorType: 'HNI / Private Investor', type: 'investor-query' });
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
      {/* Page Hero */}
      <section ref={heroRef} className="page-hero" style={{ display: 'flex', alignItems: 'center', minHeight: '45vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "linear-gradient(to bottom, rgba(40,54,43,0.85) 0%, rgba(40,54,43,0.6) 100%), url('/images/living room.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Capital Partners</span>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Investor <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Relations</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Unlocking high-yield real estate investments in South India's premier markets. Guided by industrial governance, backed by asset safety.
          </p>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section ref={philosophyRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Our Strategy</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Investment <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Philosophy</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div className="grid-3">
            <div style={{ padding: '30px', backgroundColor: 'var(--cream)', borderRadius: '4px', borderTop: '3px solid var(--gold)' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Zero-Debt Model</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Zenvistas operations are funded natively via equity from our industrialist founders and internal cash flow. By operating with zero external bank leverage, we cushion investments against market volatility and eliminate interest drag.
              </p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--cream)', borderRadius: '4px', borderTop: '3px solid var(--gold)' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Capital Preservation</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Every project land parcel is acquired outright with clear, undisputed title records before development starts. Equity sits directly on real estate asset bases, securing partner capital effectively.
              </p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--cream)', borderRadius: '4px', borderTop: '3px solid var(--gold)' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Focus on Premium Yield</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                We address the underserved segment of ultra-luxury gated communities in Coimbatore. Our focus on quality and supply scarcity delivers premium pricing power and strong, risk-adjusted returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section ref={serveRef} style={{ backgroundColor: 'var(--cream)', padding: '100px 0' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="eyebrow">Who We Serve</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Tailored Capital <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Structures</span>
              </h2>
              <div className="section-rule"></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '5px' }}>NRIs & HNIs</h5>
                  <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                    We offer compliant, high-end residential opportunities for Non-Resident Indians and High-Net-Worth individuals looking to build wealth in India's fastest-growing industrial corridors.
                  </p>
                </div>
                <div>
                  <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '5px' }}>Family Offices</h5>
                  <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                    Partner with us in larger equity tranches. We structure transparent joint venture terms with clear milestones, regular financial audits, and strict escrow compliance.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid rgba(171,148,138,0.15)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>Investor Inquiry</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="investorType">Investor Classification</label>
                  <select
                    id="investorType"
                    name="investorType"
                    value={formData.investorType}
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
                    <option value="HNI / Private Investor">Individual HNI / Private Investor</option>
                    <option value="NRI Investor">NRI (Non-Resident Indian)</option>
                    <option value="Family Office">Family Office / Corporate Treasury</option>
                    <option value="Institutional Partner">Institutional Fund / Private Equity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message / Investment Preference</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Target ticket size, geographical interest..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="form-submit"
                >
                  {status === 'loading' ? 'Sending securely...' : 'Initiate Secure Contact'}
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
        </div>
      </section>
    </div>
  );
}
