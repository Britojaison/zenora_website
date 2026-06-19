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

const focusSegments = [
  {
    num: '01',
    title: 'Apartment Sites',
    range: '1.5-3.0 acres',
    copy: 'Inside city boundaries or established residential catchments with direct frontage, clean access, and approval-friendly surroundings.',
  },
  {
    num: '02',
    title: 'Gated Villa Communities',
    range: '3.0-10.0 acres',
    copy: 'Contiguous parcels in calm growth corridors where privacy, landscape depth, approach roads, and groundwater conditions support low-density living.',
  },
  {
    num: '03',
    title: 'Mixed-Use Masterplans',
    range: 'Highway and growth nodes',
    copy: 'Large parcels suitable for residential-led communities with selective retail or convenience frontage in strong commercial corridors.',
  },
];

const evaluationSteps = [
  ['Title', 'Ownership chain, encumbrance, POA, and documentation quality.'],
  ['Access', 'Road width, frontage, approach condition, and service access.'],
  ['Planning', 'Zoning, conversion requirement, FSI potential, and approval path.'],
  ['Commercials', 'Guideline value, expected market pricing, and acquisition structure.'],
];

const preferredMarkets = [
  ['Coimbatore', 'Goldwins, Avinashi Road, Kalapatti, Saravanampatti, Race Course.'],
  ['Chennai', 'OMR, ECR, GST Road, and employment-led residential corridors.'],
];

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
    type: 'land-acquisition',
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
          hero.querySelector('.acquisition-hero-media'),
          { scale: 1.13, opacity: 0.78 },
          { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out' }
        )
          .fromTo(
            hero.querySelector('.hero-eyebrow'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72 },
            '-=0.86'
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
            hero.querySelectorAll('.acquisition-hero-action, .acquisition-hero-chip'),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            '-=0.35'
          );

        gsap.to(hero.querySelector('.acquisition-hero-media'), {
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

      gsap.utils.toArray<HTMLElement>('.acquisition-reveal').forEach((el) => {
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
        '.acquisition-focus-card',
        { y: 56, opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.92,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.acquisition-focus-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.acquisition-evaluation-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.25,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.acquisition-evaluation-track',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.acquisition-evaluation-step',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.acquisition-evaluation-track',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.acquisition-form-shell',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.acquisition-contact-section',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const mm = gsap.matchMedia();
      mm.add('(min-width: 993px)', () => {
        gsap.to('.acquisition-focus-image', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.acquisition-focus-section',
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
        message: `Location: ${formData.location} | Survey No: ${formData.surveyNo} | Extent: ${formData.extent} | Ownership: ${formData.ownership} | Zoning: ${formData.zoning} | Road Frontage Width: ${formData.roadWidth} ft | Additional Notes: ${formData.message}`,
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
          type: 'land-acquisition',
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
    <div ref={pageRef} className="acquisition-redesign">
      <section ref={heroRef} className="acquisition-hero">
        <div className="acquisition-hero-media" aria-hidden="true">
          <Image
            src="/images/villa.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="acquisition-hero-overlay" />
        <div className="container-custom acquisition-hero-content">
          <span className="hero-eyebrow eyebrow">Active Acquisition</span>
          <h1 className="hero-title">
            <span>Premium Land</span>
            <span className="italic">Wanted</span>
          </h1>
          <p className="hero-subtitle">
            Zenvistas is acquiring clean, strategically located parcels in Coimbatore and Chennai for luxury residential communities, gated villa enclaves, and selective mixed-use masterplans.
          </p>
          <div className="acquisition-hero-actions">
            <a href="#submit-land" className="acquisition-hero-action btn-gold">Submit property details</a>
            <Link href="/partnerships" className="acquisition-hero-action btn-outline-white">Explore partnerships</Link>
          </div>
          <div className="acquisition-hero-chips" aria-label="Acquisition highlights">
            {['7-day review', 'Clean documentation', 'Founder-backed closings'].map((chip) => (
              <span key={chip} className="acquisition-hero-chip">{chip}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="acquisition-focus-section">
        <div className="container-custom acquisition-focus-layout">
          <div className="acquisition-focus-intro">
            <span className="eyebrow acquisition-reveal">Our Focus</span>
            <h2 className="acquisition-reveal">Land that can become scarce, composed residential value.</h2>
            <div className="acquisition-reveal acquisition-gold-rule" />
            <p className="acquisition-reveal">
              We prioritise parcels where access, frontage, title clarity, and residential context can support a disciplined premium development. Scale matters, but clean custody matters more.
            </p>
            <div className="acquisition-focus-image acquisition-reveal">
              <Image
                src="/images/View-47.jpg"
                alt="Premium residential community setting"
                fill
                sizes="(max-width: 992px) 100vw, 42vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="acquisition-focus-grid">
            {focusSegments.map((segment) => (
              <article key={segment.title} className="acquisition-focus-card">
                <span>{segment.num}</span>
                <h3>{segment.title}</h3>
                <strong>{segment.range}</strong>
                <p>{segment.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="acquisition-evaluation-section">
        <div className="container-custom">
          <div className="acquisition-evaluation-header acquisition-reveal">
            <span className="eyebrow">Speed & Discipline</span>
            <h2>7-day first-pass evaluation, with the right documents in hand.</h2>
            <p>
              Our land, legal, and planning teams review feasibility quickly so owners know whether Zenvistas can pursue outright purchase, acquisition discussions, or a structured partnership route.
            </p>
          </div>
          <div className="acquisition-evaluation-track">
            <div className="acquisition-evaluation-line" />
            {evaluationSteps.map(([title, copy]) => (
              <article key={title} className="acquisition-evaluation-step">
                <span>{title}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="submit-land" className="acquisition-contact-section">
        <div className="container-custom acquisition-contact-grid">
          <div className="acquisition-contact-copy acquisition-reveal">
            <span className="eyebrow">Direct Submission</span>
            <h2>Send the essentials. We will handle the first review.</h2>
            <p>
              Share ownership, location, extent, frontage, zoning, and survey information. For clean parcels, we can move rapidly into valuation and commercial discussion.
            </p>
            <div className="acquisition-market-list">
              {preferredMarkets.map(([market, copy]) => (
                <div key={market}>
                  <strong>{market}</strong>
                  <span>{copy}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="acquisition-form-shell">
            <form onSubmit={handleSubmit}>
              <div className="grid-2 acquisition-form-row">
                <div className="form-group">
                  <label htmlFor="name">Submitter Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Owner or authorised representative"
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
              </div>

              <div className="grid-2 acquisition-form-row">
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
                  <label htmlFor="ownership">Ownership Status</label>
                  <select id="ownership" name="ownership" value={formData.ownership} onChange={handleChange}>
                    <option value="Single Owner">Single Registered Owner</option>
                    <option value="Joint Ownership">Joint Family Ownership</option>
                    <option value="Power of Attorney">Power of Attorney Holder</option>
                    <option value="Authorized Broker">Authorized Sole Broker</option>
                  </select>
                </div>
              </div>

              <div className="grid-2 acquisition-form-row">
                <div className="form-group">
                  <label htmlFor="location">Land Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Village, taluk, city"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="surveyNo">Survey Numbers</label>
                  <input
                    type="text"
                    id="surveyNo"
                    name="surveyNo"
                    value={formData.surveyNo}
                    onChange={handleChange}
                    placeholder="e.g. S.No 120/2"
                  />
                </div>
              </div>

              <div className="grid-2 acquisition-form-row">
                <div className="form-group">
                  <label htmlFor="extent">Total Extent *</label>
                  <input
                    type="text"
                    id="extent"
                    name="extent"
                    value={formData.extent}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 4.2 acres"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zoning">Current Zoning</label>
                  <select id="zoning" name="zoning" value={formData.zoning} onChange={handleChange}>
                    <option value="Residential">Residential Zone</option>
                    <option value="Commercial">Commercial Zone</option>
                    <option value="Agricultural">Agricultural Zone</option>
                    <option value="Industrial">Industrial Zone</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="roadWidth">Road Frontage Width *</label>
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
                <label htmlFor="message">Property Notes</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe access, surroundings, title notes, zoning, target price, or constraints."
                />
              </div>

              <button type="submit" disabled={status === 'loading'} className="form-submit">
                {status === 'loading' ? 'Submitting details...' : 'Submit property details'}
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
