'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Partnerships() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    location: '',
    extent: '',
    type: 'joint-development'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);
  const criteriaRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

    // 2. Scroll Trigger
    const scrollCtx = gsap.context(() => {
      // Models stagger
      if (modelsRef.current) {
        const title = modelsRef.current.querySelector('.models-title');
        const cards = modelsRef.current.querySelectorAll('.model-card');
        
        gsap.fromTo(title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: modelsRef.current,
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
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: modelsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Criteria section
      if (criteriaRef.current) {
        const cols = criteriaRef.current.querySelectorAll('.criteria-col');
        gsap.fromTo(cols,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: criteriaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Form
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
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
        message: `Land Location: ${formData.location} | Extent: ${formData.extent} | Notes: ${formData.message}`
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your partnership proposal has been submitted. Our land team will contact you within 48 hours.');
        setFormData({ name: '', email: '', phone: '', message: '', location: '', extent: '', type: 'joint-development' });
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
          backgroundImage: "linear-gradient(to bottom, rgba(40,54,43,0.85) 0%, rgba(40,54,43,0.6) 100%), url('/images/seat.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)' }}>
          <span className="hero-eyebrow eyebrow" style={{ color: 'var(--gold)' }}>Joint Development</span>
          <h1 className="hero-title" style={{ color: 'var(--white)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Own Land? <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Let's Create Value Together</span>
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Partner with Coimbatore's most trusted development group. Capitalize on our financial muscle and execution excellence to yield premium returns.
          </p>
        </div>
      </section>

      {/* Joint Development Models */}
      <section ref={modelsRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div className="models-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Collaboration Models</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              How We <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Partner</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div className="grid-2" style={{ gap: '3rem' }}>
            <div className="model-card" style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Area Sharing Model</h4>
              <p style={{ color: 'var(--charcoal-3)', fontSize: '0.95rem' }}>
                Under this structured setup, landowners receive a predetermined percentage of the constructed area (villas or apartment units) corresponding to their land value. We undertake the complete cost of design, engineering, approvals, and construction.
              </p>
            </div>
            <div className="model-card" style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Revenue Sharing Model</h4>
              <p style={{ color: 'var(--charcoal-3)', fontSize: '0.95rem' }}>
                Ideal for premium sites where cash flow is prioritized. The revenue generated from project bookings is shared in a mutually agreed ratio directly via escrow accounts, ensuring absolute commercial clarity and compliance.
              </p>
            </div>
            <div className="model-card" style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Outright Purchase</h4>
              <p style={{ color: 'var(--charcoal-3)', fontSize: '0.95rem' }}>
                If you prefer an immediate exit strategy, Zenvistas acquires prime land outright. Backed by the strong capital reserves of our founding partners, we finalize transactions swiftly with clean documentation and immediate payouts.
              </p>
            </div>
            <div className="model-card" style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Development Management</h4>
              <p style={{ color: 'var(--charcoal-3)', fontSize: '0.95rem' }}>
                For institutional owners or family offices who wish to retain full ownership, Zenvistas functions as the end-to-end development partner. We charge a management fee to design, register under RERA, construct, and sell the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines and Criteria */}
      <section ref={criteriaRef} style={{ backgroundColor: 'var(--cream)', padding: '100px 0' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '4rem' }}>
            <div className="criteria-col">
              <span className="eyebrow">Our Criteria</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Land Acquisition <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Requirements</span>
              </h2>
              <div className="section-rule"></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>•</div>
                  <div>
                    <strong>For Gated Villa Communities:</strong> Minimum land extent of 3.0 Acres and above in preferred growth zones.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>•</div>
                  <div>
                    <strong>For Premium Residences:</strong> Minimum land extent of 1.5 Acres and above with high road frontage.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>•</div>
                  <div>
                    <strong>Preferred Locations (Coimbatore):</strong> Avinashi Road, Goldwins, Race Course, Kalapatti, Saravanampatti.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>•</div>
                  <div>
                    <strong>Preferred Locations (Chennai):</strong> OMR (upto Navalur), ECR, GST Road (near IT parks).
                  </div>
                </div>
              </div>
            </div>

            <div className="criteria-col">
              <span className="eyebrow">The Benefits</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Why Partner with <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Zenvistas?</span>
              </h2>
              <div className="section-rule"></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>✓</div>
                  <div>
                    <strong>No Debt Risk:</strong> Built entirely using partner capital reserves. Zero external bank debt means projects are never stalled.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>✓</div>
                  <div>
                    <strong>Clean Compliance:</strong> Comprehensive title searches, prompt approval filings, and standard RERA registrations.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 'bold' }}>✓</div>
                  <div>
                    <strong>Premium Pricing Power:</strong> Our brand's luxury positioning guarantees premium sale values for your area share.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Enquiry Form */}
      <section ref={formRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="eyebrow">Connect with Land Team</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Submit Your Land <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Details</span>
            </h2>
            <p style={{ color: 'var(--charcoal-3)', marginTop: '10px' }}>
              Our land acquisition team will review your property survey details and execute a baseline analysis within 7 working days.
            </p>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div style={{ border: '1px solid rgba(171,148,138,0.2)', padding: '40px', borderRadius: '4px' }}>
            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Landowner Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter owner name"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="phone">Contact Phone *</label>
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
                    placeholder="name@example.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="type">Preferred JV Model</label>
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
                    <option value="joint-development">Joint Development (JDA)</option>
                    <option value="revenue-share">Revenue Share Model</option>
                    <option value="outright-sale">Outright Sale Proposal</option>
                    <option value="management">Development Management</option>
                  </select>
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="location">Land Location / Address *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Goldwins, Coimbatore"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="extent">Land Extent (in Acres/Cents) *</label>
                  <input
                    type="text"
                    id="extent"
                    name="extent"
                    value={formData.extent}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2.5 Acres"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Zoning & Frontage Notes (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. Residential zoning, 80 ft road frontage..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="form-submit"
              >
                {status === 'loading' ? 'Submitting Details...' : 'Submit Partnership Proposal'}
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
