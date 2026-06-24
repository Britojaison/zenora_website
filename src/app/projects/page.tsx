'use strict';
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projectStats = [
  ['Status', 'Ongoing'],
  ['Typology', 'Gated Villas'],
  ['Plot Scale', '4,000-7,500 sq.ft.'],
  ['Location', 'Goldwins'],
];

const gallery = [
  {
    title: 'Architectural Frontage',
    eyebrow: 'Arrival',
    src: '/images/zenora/Architectural Frontage_compressed.jpg',
    alt: 'Zenora villa architectural frontage',
  },
  {
    title: 'Private Living Volumes',
    eyebrow: 'Interiors',
    src: '/images/zenora/Private Living Volumes_compressed.jpg',
    alt: 'Zenora villa living room',
  },
  {
    title: 'Landscape-Led Quiet',
    eyebrow: 'Setting',
    src: '/images/zenora/Landscape-Led Quiet.jpg',
    alt: 'Zenora landscaped seating court',
  },
];

const amenities = [
  ['01', 'Private Clubhouse', 'Formal lounge areas, business-ready meeting suites, and resident-first hospitality spaces.'],
  ['02', 'Botanical Spine', 'Tree canopies, garden courts, reflexology walks, and shaded movement corridors.'],
  ['03', 'Layered Security', 'Controlled access, monitored perimeters, and smart-home ready communication infrastructure.'],
  ['04', 'Long-Term Custody', 'Professional post-possession management designed to preserve the community experience.'],
];

const process = [
  ['Land', 'Scarce, well-connected parcels selected before density is discussed.'],
  ['Design', 'Boutique architects and landscape consultants shape the living experience.'],
  ['Build', 'Founder-backed oversight keeps specifications, vendors, and timelines disciplined.'],
  ['Govern', 'RERA documentation and handover processes remain clear from the start.'],
];

export default function Projects() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current;

      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          hero.querySelector('.project-hero-media'),
          { scale: 1.14, opacity: 0.78 },
          { scale: 1, opacity: 1, duration: 1.55, ease: 'power4.out' }
        )
          .fromTo(
            hero.querySelector('.hero-eyebrow'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            '-=0.9'
          )
          .fromTo(
            hero.querySelectorAll('.hero-title span'),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.08, ease: 'power4.out' },
            '-=0.45'
          )
          .fromTo(
            hero.querySelector('.hero-subtitle'),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85 },
            '-=0.55'
          )
          .fromTo(
            hero.querySelectorAll('.project-hero-action, .project-hero-chip'),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            '-=0.35'
          );

        gsap.to(hero.querySelector('.project-hero-media'), {
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

      gsap.utils.toArray<HTMLElement>('.project-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 42, opacity: 0 },
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
        '.project-stat',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-stats-panel',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.project-gallery-card',
        { y: 70, opacity: 0, clipPath: 'inset(18% 0% 0% 0%)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-gallery-grid',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.project-gallery-card img').forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.project-gallery-card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        '.project-amenity-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-amenities-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.project-process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.25,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.project-process',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.project-process-step',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.project-process',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const mm = gsap.matchMedia();
      mm.add('(min-width: 993px)', () => {
        gsap.to('.project-feature-media', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.project-feature',
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

  return (
    <div ref={pageRef} className="projects-redesign">
      <section ref={heroRef} className="project-hero">
        <div className="project-hero-media" aria-hidden="true">
          <Image
            src="/images/zenora-opt.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        <div className="project-hero-overlay" />
        <div className="container-custom project-hero-content">
          <span className="hero-eyebrow eyebrow">Projects</span>
          <h1 className="hero-title">
            <span>Zenora</span>
            <span className="italic">Villas</span>
          </h1>
          <p className="hero-subtitle">
            A low-density villa community in Goldwins, shaped for privacy, architectural restraint, and long-term residential value.
          </p>
          <div className="project-hero-actions">
            <a href="https://www.zenoravillas.in/" target="_blank" rel="noopener noreferrer" className="project-hero-action btn-outline-white">Explore project</a>
          </div>
          <div className="project-hero-chips" aria-label="Project highlights">
            {['Founder-backed', 'RERA registered', 'Limited release'].map((chip) => (
              <span key={chip} className="project-hero-chip">{chip}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="project-story" className="project-feature">
        <div className="container-custom project-feature-grid">
          <div className="project-feature-copy">
            <span className="eyebrow project-reveal">Featured Development</span>
            <h2 className="project-reveal">
              Built with the patience of owners who expect to live with the outcome.
            </h2>
            <div className="project-reveal project-gold-rule" />
            <p className="project-reveal">
              Zenora is Zenvistas&apos; flagship villa community. Located in Goldwins, right off Avinashi Road, it brings together architectural elegance, landscape planning, and disciplined build quality.
            </p>
            <p className="project-reveal">
              Every villa is structured around generous landholding, quieter movement, and practical privacy. The community is planned for families who value space, documentation, and a residential environment that matures well.
            </p>
            <div className="project-reveal project-feature-actions">
              <Link href="/contact" className="btn-gold">Enquire now</Link>
              <a href="#amenities" className="btn-outline">View amenities</a>
            </div>
          </div>

          <div className="project-feature-media">
            <div className="project-feature-image">
              <Image
                src="/images/villa.jpg"
                alt="Zenora villa frontage"
                fill
                sizes="(max-width: 992px) 100vw, 42vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="project-stats-panel">
              {projectStats.map(([label, value]) => (
                <div key={label} className="project-stat">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="project-gallery-section">
        <div className="container-custom">
          <div className="project-section-kicker project-reveal">
            <span className="eyebrow">Design Language</span>
            <h2>Quiet spaces, measured proportions, and a residential pace.</h2>
          </div>
          <div className="project-gallery-grid">
            {gallery.map((item) => (
              <article key={item.title} className="project-gallery-card">
                <div className="project-gallery-image">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="project-gallery-caption">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="amenities" className="project-amenities-section">
        <div className="container-custom">
          <div className="project-section-kicker project-reveal">
            <span className="eyebrow">The Experience</span>
            <h2>Amenity planning that serves daily life, not brochure excess.</h2>
          </div>
          <div className="project-amenities-grid">
            {amenities.map(([num, title, copy]) => (
              <article key={title} className="project-amenity-card">
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-process">
        <div className="container-custom">
          <div className="project-process-header project-reveal">
            <span className="eyebrow">Development Discipline</span>
            <h2>From land selection to handover, the process is intentionally narrow.</h2>
          </div>
          <div className="project-process-track">
            <div className="project-process-line" />
            {process.map(([title, copy]) => (
              <article key={title} className="project-process-step">
                <span>{title}</span>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-rera">
        <div className="container-custom project-rera-inner">
          <div className="project-reveal">
            <span className="eyebrow">RERA Registered Development</span>
            <h2>Transparency is part of the specification.</h2>
          </div>
          <p className="project-reveal">
            Zenora is registered under the Tamil Nadu Real Estate Regulatory Authority. Project documentation, timelines, and statutory details can be verified through the official registry.
          </p>
          <a
            href="https://tnrera.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold project-reveal"
          >
            Visit TNRERA registry
          </a>
        </div>
      </section>
    </div>
  );
}
