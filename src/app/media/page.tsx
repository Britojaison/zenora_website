'use strict';
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const articles = [
  {
    id: 'future',
    category: 'Market Analysis',
    date: 'June 10, 2026',
    title: 'The Future of Coimbatore Real Estate',
    copy: 'A shift toward low-density, master-planned living is changing how local business families evaluate residential value, privacy, and long-term custody.',
  },
  {
    id: 'jv',
    category: 'Joint Development',
    date: 'May 24, 2026',
    title: 'Why Joint Development Models Are Growing',
    copy: 'RERA-led compliance, escrow clarity, and premium positioning are making structured development partnerships more attractive for landowners.',
  },
];

export default function Media() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');
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
        message: 'Subscribed to media newsletters and insights.',
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg('Thank you. You have been added to our private briefings list.');
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
    <div ref={pageRef} className="simple-page insights-simple">
      <section className="simple-hero">
        <div className="simple-hero-media" aria-hidden="true">
          <Image
            src="/images/seat.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="simple-hero-overlay" />
        <div className="container-custom simple-hero-content">
          <span className="eyebrow simple-reveal">Insights & Updates</span>
          <h1 className="simple-reveal">Media & <span>Insights</span></h1>
          <p className="simple-reveal">
            Short perspectives on luxury residential development, land partnerships, regulation, and Coimbatore&apos;s growth.
          </p>
        </div>
      </section>

      <section className="simple-section">
        <div className="container-custom">
          <div className="simple-section-heading simple-scroll">
            <span className="eyebrow">Latest Notes</span>
            <h2>Measured thinking for landowners, buyers, and partners.</h2>
          </div>

          <div className="insights-list">
            {articles.map((article) => (
              <article key={article.id} id={article.id} className="insights-row simple-scroll">
                <div>
                  <span className="eyebrow">{article.category}</span>
                  <small>{article.date}</small>
                </div>
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="simple-section simple-section-muted">
        <div className="container-custom simple-narrow">
          <div className="simple-panel simple-scroll">
            <span className="eyebrow">Stay Informed</span>
            <h2>Receive private briefings.</h2>
            <p>Project announcements and market notes, sent occasionally.</p>
            <form onSubmit={handleSubscribe} className="simple-inline-form">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={status === 'loading'} className="btn-gold">
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && <div className="form-status form-status-success">{msg}</div>}
            {status === 'error' && <div className="form-status form-status-error">{msg}</div>}
          </div>
        </div>
      </section>
    </div>
  );
}
