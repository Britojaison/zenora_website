'use strict';
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const partnershipModels = [
  {
    num: '01',
    title: 'Area Sharing',
    copy: 'Landowners receive a predetermined share of constructed villas or residences while Zenvistas manages design, approvals, construction, sales, and handover.',
  },
  {
    num: '02',
    title: 'Revenue Sharing',
    copy: 'Project revenue is distributed through a mutually agreed structure with transparent milestones, clear booking records, and escrow-led discipline.',
  },
  {
    num: '03',
    title: 'Outright Purchase',
    copy: 'For owners who prefer a clean exit, founder-backed capital enables swift closure once title, zoning, frontage, and planning viability are verified.',
  },
  {
    num: '04',
    title: 'Development Management',
    copy: 'For institutions or family owners retaining land ownership, Zenvistas can lead planning, RERA registration, construction oversight, and sales custody.',
  },
];

const criteria = [
  ['Villa communities', '3.0 acres and above in calm, well-connected growth corridors.'],
  ['Premium residences', '1.5 acres and above with strong frontage and urban access.'],
  ['Coimbatore focus', 'Goldwins, Avinashi Road, Race Course, Kalapatti, and Saravanampatti.'],
  ['Chennai focus', 'OMR, ECR, GST Road, and established micro-markets near employment corridors.'],
];

const benefits = [
  ['Debt-light execution', 'Founder equity and internal capital reduce project-stalling pressure.'],
  ['Clean documentation', 'Title diligence, approval planning, and RERA clarity are handled before launch.'],
  ['Premium positioning', 'Boutique, limited-release communities protect pricing power and brand value.'],
];

const process = [
  ['Submit', 'Share location, extent, ownership notes, and frontage details.'],
  ['Verify', 'Our legal and planning teams review title, zoning, access, and development fit.'],
  ['Structure', 'We recommend JDA, revenue share, purchase, or management terms.'],
  ['Commit', 'Commercial terms, approvals, and project custody move into formal documentation.'],
];

export default function Partnerships() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    location: '',
    extent: '',
    type: 'joint-development',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;

      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          hero.querySelector('.partnership-hero-media'),
          { scale: 1.12, opacity: 0.78 },
          { scale: 1, opacity: 1, duration: 1.45, ease: 'power4.out' }
        )
          .fromTo(
            hero.querySelector('.hero-eyebrow'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72 },
            '-=0.85'
          )
          .fromTo(
            hero.querySelectorAll('.hero-title span'),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power4.out' },
            '-=0.42'
          )
          .fromTo(
            hero.querySelector('.hero-subtitle'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.82 },
            '-=0.55'
          )
          .fromTo(
            hero.querySelectorAll('.partnership-hero-action, .partnership-hero-chip'),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            '-=0.35'
          );

        gsap.to(hero.querySelector('.partnership-hero-media'), {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('.partnership-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.fromTo(
        '.partnership-model-card',
        { y: 54, opacity: 0, clipPath: 'inset(12% 0% 0% 0%)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.92,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partnership-model-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.partnership-criteria-item',
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partnership-criteria-grid',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.partnership-process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.25,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.partnership-process-track',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.partnership-process-step',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partnership-process-track',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.partnership-form-shell',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partnership-form-section',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const mm = gsap.matchMedia();
      mm.add('(min-width: 993px)', () => {
        gsap.to('.partnership-criteria-image', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.partnership-criteria-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    }, pageRef);

    return () => ctx.revert();
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
        message: `Land Location: ${formData.location} | Extent: ${formData.extent} | Notes: ${formData.message}`,
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
    <div ref={pageRef} className="partnership-redesign">
      <section ref={heroRef} className="partnership-hero">
        <div className="partnership-hero-media" aria-hidden="true">
          <Image
            src="/images/home/3d-rendering-luxury-modern-living-room-with-leather-sofa-lamp.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="partnership-hero-overlay" />
        <div className="container-custom partnership-hero-content">
          <span className="hero-eyebrow eyebrow">Joint Development</span>
          <h1 className="hero-title">
            <span>Land Into</span>
            <span className="italic">Legacy</span>
          </h1>
          <p className="hero-subtitle">
            Partner with a founder-backed developer that treats land as long-term capital, not inventory. We structure JDAs, revenue share, outright purchase, and development management with clarity.
          </p>
          <div className="partnership-hero-actions">
            <a href="#land-form" className="partnership-hero-action btn-gold">Submit land details</a>
            <Link href="/projects" className="partnership-hero-action btn-outline-white">View project standard</Link>
          </div>
          <div className="partnership-hero-chips" aria-label="Partnership highlights">
            {['7-day evaluation', 'Founder-backed capital', 'RERA-led process'].map((chip) => (
              <span key={chip} className="partnership-hero-chip">{chip}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="partnership-model-section">
        <div className="container-custom">
          <div className="partnership-section-heading partnership-reveal">
            <span className="eyebrow">Collaboration Models</span>
            <h2>Four routes to unlock land value without carrying development risk.</h2>
          </div>
          <div className="partnership-model-grid">
            {partnershipModels.map((model) => (
              <article key={model.title} className="partnership-model-card">
                <span>{model.num}</span>
                <h3>{model.title}</h3>
                <p>{model.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partnership-criteria-section">
        <div className="container-custom partnership-criteria-grid">
          <div>
            <div className="partnership-reveal">
              <span className="eyebrow">What We Evaluate</span>
              <h2>We look for land where privacy, access, and compliance can coexist.</h2>
              <div className="partnership-gold-rule" />
            </div>
            <div className="partnership-list">
              {criteria.map(([title, copy]) => (
                <div key={title} className="partnership-criteria-item">
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="partnership-criteria-image">
            <Image
              src="/images/villa.jpg"
              alt="Luxury villa community suitable for land partnerships"
              fill
              sizes="(max-width: 992px) 100vw, 42vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="partnership-benefits-section">
        <div className="container-custom partnership-benefits-grid">
          <div className="partnership-benefits-intro partnership-reveal">
            <span className="eyebrow">Why Zenvistas</span>
            <h2>Commercial clarity, patient capital, and premium execution.</h2>
          </div>
          <div className="partnership-benefit-list">
            {benefits.map(([title, copy]) => (
              <article key={title} className="partnership-reveal partnership-benefit-row">
                <span>{title}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partnership-process-section">
        <div className="container-custom">
          <div className="partnership-section-heading partnership-reveal">
            <span className="eyebrow">How It Moves</span>
            <h2>A measured path from first submission to commercial structure.</h2>
          </div>
          <div className="partnership-process-track">
            <div className="partnership-process-line" />
            {process.map(([title, copy]) => (
              <article key={title} className="partnership-process-step">
                <span>{title}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="land-form" className="partnership-form-section">
        <div className="container-custom partnership-form-grid">
          <div className="partnership-form-copy partnership-reveal">
            <span className="eyebrow">Connect With Land Team</span>
            <h2>Submit your land details for a private review.</h2>
            <p>
              Share location, extent, and notes on zoning or frontage. Our land team will run a first-pass review and come back with a suitable partnership path.
            </p>
          </div>

          <div className="partnership-form-shell">
            <form onSubmit={handleSubmit}>
              <div className="grid-2 partnership-form-row">
                <div className="form-group">
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
                <div className="form-group">
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

              <div className="grid-2 partnership-form-row">
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
                  <label htmlFor="type">Preferred Model</label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange}>
                    <option value="joint-development">Joint Development</option>
                    <option value="revenue-share">Revenue Share</option>
                    <option value="management">Development Management</option>
                  </select>
                </div>
              </div>

              <div className="grid-2 partnership-form-row">
                <div className="form-group">
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
                <div className="form-group">
                  <label htmlFor="extent">Land Extent *</label>
                  <input
                    type="text"
                    id="extent"
                    name="extent"
                    value={formData.extent}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2.5 acres"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Zoning & Frontage Notes</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share road frontage, zoning, ownership, or target terms."
                />
              </div>

              <button type="submit" disabled={status === 'loading'} className="form-submit">
                {status === 'loading' ? 'Submitting details...' : 'Submit partnership proposal'}
              </button>

              {status === 'success' && (
                <div className="form-status form-status-success">{responseMsg}</div>
              )}
              {status === 'error' && (
                <div className="form-status form-status-error">{responseMsg}</div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
