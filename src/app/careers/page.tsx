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
  ['Store Keeper-Civil', 'Coimbatore', '2 - 6 Years • Full-time'],
  ['CRM-Executive', 'Coimbatore', '2 - 4 Years • Full-time'],
  ['Site Engineer', 'Coimbatore', '3 - 8 Years • Full-time'],
  ['Senior/ Junior-Graphic Designer', 'Coimbatore', '2 - 8 Years • Full-time'],
  ['Pre-Sales executive', 'Coimbatore', '1 - 5 Years • Full-time'],
  ['Front Desk Receptionist', 'Coimbatore', '2 - 5 Years • Full-time'],
];

export default function Careers() {
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
            {roles.map(([title, place, details]) => (
              <article key={title} className="careers-role simple-scroll">
                <div>
                  <h3>{title}</h3>
                  <span>{place} / {details}</span>
                </div>
                <a href="https://sribaby-property.greythr.com/hire/jobs/" target="_blank" rel="noopener noreferrer" className="btn-gold">Apply</a>
              </article>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
