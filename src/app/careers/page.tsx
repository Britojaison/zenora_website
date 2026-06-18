'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Project Management Executive',
    portfolioUrl: '',
    message: '',
    type: 'careers-application'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<HTMLDivElement>(null);
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
      // Culture cards stagger
      if (cultureRef.current) {
        const title = cultureRef.current.querySelector('h2');
        const cards = cultureRef.current.querySelectorAll('.grid-3 > div');

        gsap.fromTo(title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cultureRef.current,
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
              trigger: cultureRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Job positions
      if (positionsRef.current) {
        const title = positionsRef.current.querySelector('h2');
        const jobRows = positionsRef.current.querySelectorAll('.container-custom > div > div');

        gsap.fromTo(title,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: positionsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
        gsap.fromTo(jobRows,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: positionsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Application Form
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
        message: `Applied Position: ${formData.position} | Resume / Portfolio Link: ${formData.portfolioUrl} | Cover Notes: ${formData.message}`
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your application has been submitted successfully. Our HR team will reach out to schedule an interview if your profile matches.');
        setFormData({ name: '', email: '', phone: '', position: 'Project Management Executive', portfolioUrl: '', message: '', type: 'careers-application' });
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
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Join Our Team</span>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Careers at <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Zenvistas</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Build your professional path with an organization that values precision, accountability, and the pursue of design excellence.
          </p>
        </div>
      </section>

      {/* Our Culture */}
      <section ref={cultureRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Working Here</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              The Zenvistas <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Way</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div className="grid-3">
            <div style={{ padding: '30px', backgroundColor: 'var(--cream)', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>High Performance</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                We execute to the strict standards set by Coimbatore's top business owners. Every layout, document, and civil schedule is analyzed for maximum performance and accuracy.
              </p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--cream)', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Trust & Ethics</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                Our corporate governance dictates complete transparency. We respect all regulatory norms, RERA timelines, and agreements without negotiation.
              </p>
            </div>
            <div style={{ padding: '30px', backgroundColor: 'var(--cream)', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Bespoke Architecture</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-3)', margin: 0 }}>
                We do not build typical cookie-cutter units. We curate boutique residential designs, collaborating with award-winning interior designers and planners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section ref={positionsRef} style={{ backgroundColor: 'var(--cream)', padding: '100px 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Opportunities</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Current Open <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Positions</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Position 1 */}
            <div style={{ backgroundColor: 'var(--white)', padding: '30px 40px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Project Management Executive</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Coimbatore, IN &bull; Full-Time &bull; 5+ Yrs Exp
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-3)', marginTop: '12px', marginBottom: 0 }}>
                  Manage civil engineering teams, schedule subcontractors, inspect build quality, and ensure RERA timeline adherence.
                </p>
              </div>
              <a href="#apply" className="btn-gold" style={{ padding: '12px 24px', fontSize: '0.7rem' }}>Apply Now</a>
            </div>

            {/* Position 2 */}
            <div style={{ backgroundColor: 'var(--white)', padding: '30px 40px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Sales & Customer Relations Manager</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Coimbatore, IN &bull; Full-Time &bull; 3+ Yrs Exp
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-3)', marginTop: '12px', marginBottom: 0 }}>
                  Advise HNIs and family offices, conduct project briefings, manage leads, and oversee registration administration.
                </p>
              </div>
              <a href="#apply" className="btn-gold" style={{ padding: '12px 24px', fontSize: '0.7rem' }}>Apply Now</a>
            </div>

          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" ref={formRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="eyebrow">Apply Directly</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
              Submit Your <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Profile</span>
            </h2>
            <div className="section-rule" style={{ margin: '20px auto 0' }}></div>
          </div>

          <div style={{ border: '1px solid rgba(171,148,138,0.2)', padding: '40px', borderRadius: '4px' }}>
            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Applicant Name *</label>
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
                    placeholder="+91"
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
                  <label htmlFor="position">Target Position</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
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
                    <option value="Project Management Executive">Project Management Executive</option>
                    <option value="Sales & Customer Relations Manager">Sales & Customer Relations Manager</option>
                    <option value="Architectural Planner">Architectural Planner</option>
                    <option value="Other / General Application">General Application (Other)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="portfolioUrl">Resume / LinkedIn Profile / Portfolio Link *</label>
                <input
                  type="url"
                  id="portfolioUrl"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://linkedin.com/in/username or google drive url"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Cover Notes (Introduce yourself & summarize experience)</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us why you would like to work with Zenvistas..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="form-submit"
              >
                {status === 'loading' ? 'Submitting profile...' : 'Submit Job Profile'}
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
