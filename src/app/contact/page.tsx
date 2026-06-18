'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
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
      // Evaluation Banner
      if (bannerRef.current) {
        const content = bannerRef.current.querySelector('.container-custom');
        gsap.fromTo(content,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Details and Map
      if (detailsRef.current) {
        const textCol = detailsRef.current.querySelector('.grid-2 > div:first-child');
        const formBox = detailsRef.current.querySelector('.grid-2 > div:last-child');

        gsap.fromTo(textCol,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: detailsRef.current,
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
              trigger: detailsRef.current,
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
        setResponseMsg('Thank you. Your message has been received successfully. A Zenvistas executive will contact you shortly.');
        setFormData({ name: '', email: '', phone: '', message: '', type: 'general' });
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
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>Reach Out</span>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1 }}>
            Speak to the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Zenvistas Team</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', fontSize: '1.1rem', marginTop: '1rem', lineHeight: '1.7' }}>
            Whether you are exploring luxury properties, JV/JD opportunities, or seeking a business alliance, we respond directly. No automated call centers.
          </p>
        </div>
      </section>

      {/* Prominent 7-day Land Evaluation Banner */}
      <section ref={bannerRef} style={{ backgroundColor: 'var(--gold)', color: 'var(--forest)', padding: '40px 0', borderBottom: '1px solid rgba(40,54,43,0.1)' }}>
        <div className="container-custom flex-responsive" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '800px' }}>
            <h4 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 500, marginBottom: '8px', color: 'var(--forest)' }}>
              Own land suitable for residential development?
            </h4>
            <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--forest)', fontWeight: 400 }}>
              Our acquisition and development team commits to evaluating your property surveys and legal title documentation within <strong>7 working days</strong>.
            </p>
          </div>
          <a href="/acquisition" className="btn-gold" style={{ backgroundColor: 'var(--forest)', color: 'var(--white)', borderColor: 'var(--forest)', whiteSpace: 'nowrap' }}>
            Submit Property details
          </a>
        </div>
      </section>

      {/* Contact Details & Map */}
      <section ref={detailsRef} style={{ backgroundColor: 'var(--white)', padding: '100px 0' }}>
        <div className="container-custom">
          <div className="grid-2" style={{ gap: '5rem' }}>
            
            {/* Contact details list */}
            <div>
              <span className="eyebrow">Our Offices</span>
              <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: 'var(--font-serif)', fontWeight: 300 }}>
                Zenvistas <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Headquarters</span>
              </h2>
              <div className="section-rule"></div>
              
              <div style={{ marginBottom: '40px' }}>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '8px' }}>Office Address</h5>
                <p style={{ fontSize: '1rem', color: 'var(--charcoal-3)', lineHeight: '1.7' }}>
                  Goldwins, Avinashi Road,<br />
                  Coimbatore, Tamil Nadu - 641014
                </p>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '8px' }}>Direct Communication</h5>
                <p style={{ fontSize: '1rem', color: 'var(--charcoal-3)', margin: '0 0 10px 0' }}>
                  Phone Support: <a href="tel:+918870044213" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>+91 88700 44213</a>
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--charcoal-3)', margin: '0 0 10px 0' }}>
                  General Email: <a href="mailto:info@zenvistas.co.in" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>info@zenvistas.co.in</a>
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--charcoal-3)', margin: 0 }}>
                  WhatsApp Direct: <a href="https://wa.me/918870044213" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>Open WhatsApp us &rarr;</a>
                </p>
              </div>

              {/* Map Embed */}
              <div style={{ width: '100%', height: '300px', position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(171,148,138,0.2)' }}>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.9200%2C11.0000%2C77.0200%2C11.0500&layer=mapnik&marker=11.0268%2C76.9758"
                  style={{ width: '100%', height: '100%', border: 'none', filter: 'grayscale(0.5) contrast(1.1) brightness(0.95)' }}
                  loading="lazy"
                  title="Zenvistas Location Map"
                ></iframe>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div style={{ backgroundColor: 'var(--cream)', padding: '40px', borderRadius: '4px', border: '1px solid rgba(171,148,138,0.15)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>Send Message</h4>
              
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
                    placeholder="name@example.com"
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
                  <label htmlFor="type">Enquiry Classification</label>
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
                    <option value="general">General Office Enquiry</option>
                    <option value="joint-venture">Joint Venture (JV) Proposal</option>
                    <option value="joint-development">Joint Development (JD)</option>
                    <option value="outright-purchase">Outright Purchase Offer</option>
                    <option value="sales-enquiry">Property Sales Enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="form-submit"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
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
