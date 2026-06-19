'use strict';
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const culture = [
  ['Precision', 'We work with the discipline expected by founder-backed residential development.'],
  ['Accountability', 'Approvals, site schedules, buyer communication, and handover details matter here.'],
  ['Design Respect', 'We value people who can protect quality without adding noise to the process.'],
];

const roles = [
  ['Project Management Executive', 'Coimbatore, IN', 'Full-time', 'Manage site coordination, vendor schedules, quality checks, and RERA timeline discipline.'],
  ['Sales & Customer Relations Manager', 'Coimbatore, IN', 'Full-time', 'Guide qualified buyers, manage enquiries, conduct briefings, and coordinate documentation.'],
];

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Project Management Executive',
    portfolioUrl: '',
    message: '',
    type: 'careers-application',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.simple-hero-media',
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.simple-hero .simple-reveal',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      );

      gsap.utils.toArray<HTMLElement>('.simple-scroll').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
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
        message: `Applied Position: ${formData.position} | Resume / Portfolio Link: ${formData.portfolioUrl} | Cover Notes: ${formData.message}`,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMsg('Your application has been submitted successfully. Our HR team will reach out if your profile matches.');
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
    <div ref={pageRef} className="simple-page careers-simple">
      <section className="simple-hero">
        <div className="simple-hero-media" aria-hidden="true">
          <Image
            src="/images/living room.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="simple-hero-overlay" />
        <div className="container-custom simple-hero-content">
          <span className="eyebrow simple-reveal">Careers</span>
          <h1 className="simple-reveal">Work With <span>Zenvistas</span></h1>
          <p className="simple-reveal">
            Join a focused real estate team built around quality, clear ownership, and careful execution.
          </p>
        </div>
      </section>

      <section className="simple-section">
        <div className="container-custom">
          <div className="simple-section-heading simple-scroll">
            <span className="eyebrow">Working Here</span>
            <h2>Small teams. High standards. Visible responsibility.</h2>
          </div>
          <div className="simple-card-grid">
            {culture.map(([title, copy]) => (
              <article key={title} className="simple-card simple-scroll">
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="simple-section simple-section-muted">
        <div className="container-custom">
          <div className="simple-section-heading simple-scroll">
            <span className="eyebrow">Open Roles</span>
            <h2>Current positions.</h2>
          </div>
          <div className="careers-role-list">
            {roles.map(([title, place, type, copy]) => (
              <article key={title} className="careers-role simple-scroll">
                <div>
                  <h3>{title}</h3>
                  <span>{place} / {type}</span>
                  <p>{copy}</p>
                </div>
                <a href="#apply" className="btn-gold">Apply</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="simple-section">
        <div className="container-custom careers-apply-grid">
          <div className="careers-apply-copy simple-scroll">
            <span className="eyebrow">Apply Directly</span>
            <h2>Send your profile.</h2>
            <p>Share your resume, LinkedIn, or portfolio link with a short note about the role you are interested in.</p>
          </div>
          <div className="simple-panel simple-scroll">
            <form onSubmit={handleSubmit}>
              <div className="grid-2 simple-form-row">
                <div className="form-group">
                  <label htmlFor="name">Applicant Name *</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+91" />
                </div>
              </div>

              <div className="grid-2 simple-form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Target Position</label>
                  <select id="position" name="position" value={formData.position} onChange={handleChange}>
                    <option value="Project Management Executive">Project Management Executive</option>
                    <option value="Sales & Customer Relations Manager">Sales & Customer Relations Manager</option>
                    <option value="Architectural Planner">Architectural Planner</option>
                    <option value="Other / General Application">General Application</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="portfolioUrl">Resume / LinkedIn / Portfolio Link *</label>
                <input id="portfolioUrl" name="portfolioUrl" type="url" value={formData.portfolioUrl} onChange={handleChange} required placeholder="https://..." />
              </div>

              <div className="form-group">
                <label htmlFor="message">Cover Notes</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="A short note about your experience." />
              </div>

              <button type="submit" disabled={status === 'loading'} className="form-submit">
                {status === 'loading' ? 'Submitting profile...' : 'Submit profile'}
              </button>

              {status === 'success' && <div className="form-status form-status-success">{responseMsg}</div>}
              {status === 'error' && <div className="form-status form-status-error">{responseMsg}</div>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
