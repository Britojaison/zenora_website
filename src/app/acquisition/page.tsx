'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Acquisition() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    surveyNo: '',
    extent: '',
    ownership: 'Single Owner',
    zoning: 'Residential',
    roadWidth: '',
    message: '',
    type: 'land-acquisition'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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
      // Focus cards
      if (focusRef.current) {
        const title = focusRef.current.querySelector('h2');
        const cards = focusRef.current.querySelectorAll('.grid-3 > div');
        
        gsap.fromTo(title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: focusRef.current,
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
              trigger: focusRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Guarantee Banner
      if (guaranteeRef.current) {
        const content = guaranteeRef.current.querySelector('.container-custom');
        gsap.fromTo(content,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: guaranteeRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Form
      if (formRef.current) {
        const header = formRef.current.querySelector('div[style*="marginBottom"]');
        const formBox = formRef.current.querySelector('div[style*="border"]');
        
        gsap.fromTo(header,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
        
        gsap.fromTo(formBox,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formBox,
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
        message: `Location: ${formData.location} | Survey No: ${formData.surveyNo} | Extent: ${formData.extent} | Ownership: ${formData.ownership} | Zoning: ${formData.zoning} | Road Frontage Width: ${formData.roadWidth} ft | Additional Notes: ${formData.message}`
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Thank you. Your land details have been sent to our acquisition and development committee. We will verify zoning and contact you within 7 working days.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          location: '',
          surveyNo: '',
          extent: '',
          ownership: 'Single Owner',
          zoning: 'Residential',
          roadWidth: '',
          message: '',
          type: 'land-acquisition'
        });
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
          backgroundImage: "linear-gradient(to bottom, rgba(40,54,43,0.85) 0%, rgba(40,54,43,0.6) 100%), url('/images/villa.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}></div>
        <div className="container-custom page-hero-content" style={{ zIndex: 2, color: 'var(--white)' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Active Acquisition</span>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            We Are Actively <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Acquiring Land</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Zenvistas is seeking premium land parcels in Coimbatore and Chennai for luxury residential developments. We offer immediate, clean financial closings.
          </p>
        </div>
      </section>

      {/* Target Segments */}
      <section ref={focusRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Our Focus</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Target <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Developments</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div className="grid-3">
            <div style={{ backgroundColor: 'var(--cream)', padding: '40px 30px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Apartment Sites</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Looking for land parcels from 1.5 to 3.0 Acres inside city boundaries with direct road width of 40 feet or more. Preferred markets: Coimbatore city hubs, Chennai primary ring roads.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--cream)', padding: '40px 30px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Gated Villa Communities</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Seeking large, contiguous parcels from 3.0 to 10.0 Acres in high-growth sub-urban corridors. Access to groundwater, clean approach roads, and scenic surroundings are prioritized.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--cream)', padding: '40px 30px', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Mixed-Use Masterplans</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Parcels situated along commercial high-ways suitable for combined residential-retail execution. Immediate capital allocation available for plots with clear, undisputed documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Evaluation Process Banner */}
      <section ref={guaranteeRef} style={{ backgroundColor: 'var(--forest)', color: 'var(--white)', padding: '80px 0' }}>
        <div className="container-custom" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Speed & Efficiency</span>
          <h3 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>7-Day Evaluation Guarantee</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '0' }}>
            We understand that time is critical. Our in-house legal team and technical planners analyze survey records, layout restrictions, and title documents rapidly. Once details are submitted, we guarantee a clear feedback decision within 7 working days.
          </p>
        </div>
      </section>

      {/* Property Submission Form */}
      <section ref={formRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="eyebrow">Direct Submission</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Submit Land for <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Acquisition</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div style={{ border: '1px solid rgba(171,148,138,0.2)', padding: '40px', borderRadius: '4px' }}>
            <form onSubmit={handleSubmit}>
              {/* Contact Info */}
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Submitter Name (Owner/Broker) *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
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
                    placeholder="e.g. +91"
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
                    placeholder="name@domain.com"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="ownership">Ownership Status</label>
                  <select
                    id="ownership"
                    name="ownership"
                    value={formData.ownership}
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
                    <option value="Single Owner">Single Registered Owner</option>
                    <option value="Joint Ownership">Joint Family Ownership</option>
                    <option value="Power of Attorney">Power of Attorney (POA) Holder</option>
                    <option value="Authorized Broker">Authorized Sole Broker</option>
                  </select>
                </div>
              </div>

              {/* Land Info */}
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="location">Land Location (Village/Taluk/City) *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Kalapatti, Coimbatore"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="surveyNo">Survey Numbers (If known)</label>
                  <input
                    type="text"
                    id="surveyNo"
                    name="surveyNo"
                    value={formData.surveyNo}
                    onChange={handleChange}
                    placeholder="e.g. S.No 120/2, 120/3"
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="extent">Total Extent *</label>
                  <input
                    type="text"
                    id="extent"
                    name="extent"
                    value={formData.extent}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 4.2 Acres"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="zoning">Current Zoning Status</label>
                  <select
                    id="zoning"
                    name="zoning"
                    value={formData.zoning}
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
                    <option value="Residential">Residential Zone</option>
                    <option value="Commercial">Commercial Zone</option>
                    <option value="Agricultural">Agricultural Zone (requires conversion)</option>
                    <option value="Industrial">Industrial Zone</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="roadWidth">Road Frontage Width (in feet) *</label>
                <input
                  type="text"
                  id="roadWidth"
                  name="roadWidth"
                  value={formData.roadWidth}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 60 feet"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Property Description & Details (Zoning, topography, surrounding developments)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe access roads, layout, target price, etc..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="form-submit"
              >
                {status === 'loading' ? 'Submitting details...' : 'Submit Property details'}
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
