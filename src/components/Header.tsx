'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Partnerships', href: '/partnerships' },
  { label: 'Acquisition', href: '/acquisition' },
  { label: 'Insights', href: '/media' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // GSAP entrance animation on mount
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(headerRef.current, { y: -80, opacity: 0 });
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      if (navRef.current) gsap.set(navRef.current.children, { y: -15, opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0.9, opacity: 0 });

      // Animate header down
      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      });

      // Animate logo entrance
      gsap.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)',
        delay: 0.3
      });

      // Stagger animate links
      if (navRef.current) {
        gsap.to(navRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0.4
        });
      }

      // Animate CTA
      gsap.to(ctaRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      });
    });

    return () => ctx.revert();
  }, []);

  const isOverlayHeader = !scrolled;

  return (
    <header
      ref={headerRef}
      className={`navbar-header ${
        scrolled ? 'scrolled' : ''
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease, border-bottom 0.3s ease, backdrop-filter 0.3s ease',
        backgroundColor: isOverlayHeader ? 'transparent' : 'rgba(245, 241, 237, 0.98)',
        borderBottom: isOverlayHeader ? 'none' : '1px solid rgba(171, 148, 138, 0.15)',
        backdropFilter: isOverlayHeader ? 'none' : 'blur(10px)',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div ref={logoRef}>
          <Link href="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', height: '100%', textDecoration: 'none' }}>
            <Image
              src="/ZV.png"
              alt="Zenvistas Logo"
              width={140}
              height={46}
              style={{ objectFit: 'contain', height: '46px', width: 'auto' }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav ref={navRef} className="navbar-links" style={{ gap: '1.75rem', alignItems: 'center' }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: '400',
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '6px 0',
                  color: isOverlayHeader ? 'var(--white)' : 'var(--forest)',
                  borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                  transition: 'color 0.3s ease, border-color 0.3s ease',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            href="/contact"
            className="btn-enquire"
            style={{
              padding: '10px 24px',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: '700',
              borderRadius: '2px',
              border: `1px solid ${isOverlayHeader ? 'var(--white)' : 'var(--gold)'}`,
              color: isOverlayHeader ? 'var(--white)' : 'var(--forest)',
              backgroundColor: 'transparent',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
            }}
          >
            Enquire
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '15px',
              padding: '8px',
              outline: 'none',
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle Menu"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isOverlayHeader ? 'var(--white)' : 'var(--forest)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isOverlayHeader ? 'var(--white)' : 'var(--forest)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(245, 241, 237, 0.98)',
            borderBottom: '1px solid rgba(171, 148, 138, 0.15)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            gap: '1.25rem',
            zIndex: 99,
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '400',
                color: 'var(--forest)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              padding: '12px',
              textAlign: 'center',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '700',
              border: '1px solid var(--gold)',
              backgroundColor: 'var(--gold)',
              color: 'var(--forest)',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  );
}
