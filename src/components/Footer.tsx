'use strict';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--forest)', color: 'var(--white)', padding: '80px 0 40px 0', borderTop: '1px solid rgba(225, 178, 88, 0.15)' }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '60px' }} className="footer-grid-responsive">
          {/* Brand Info */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--white)', marginBottom: '20px' }}>
              <Image
                src="/ZV.png"
                alt="Zenvistas Logo"
                width={38}
                height={38}
                style={{ objectFit: 'contain', borderRadius: '2px', filter: 'brightness(0) invert(1)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="navbar-logo-main">ZENVISTAS</span>
                <span className="navbar-logo-sub" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem' }}>Realty</span>
              </div>
            </Link>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.7', maxWidth: '360px', marginBottom: '24px' }}>
              A luxury real estate developer founded by Coimbatore&apos;s mill owners and industrialists — committed to building communities that match the standards of the families who created them.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a
                href="https://www.instagram.com/zenora_by_zenvistas/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--white)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                className="social-hover"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/zenvistas-realty-ventures-llp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--white)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                className="social-hover"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Navigation</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Home</Link></li>
              <li><Link href="/about" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">About Us</Link></li>
              <li><Link href="/projects" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Projects Portfolio</Link></li>
              <li><Link href="/partnerships" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Landowners</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'transparent', marginBottom: '24px' }}>-</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link href="/acquisition" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Land Acquisition</Link></li>
              <li><Link href="/media" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Media & Insights</Link></li>
              <li><Link href="/careers" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Careers</Link></li>
              <li><Link href="/contact" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }} className="foot-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '24px' }}>Contact</h5>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', lineHeight: '1.6' }}>
              Goldwins, Avinashi Road,<br />
              Coimbatore, Tamil Nadu - 641014
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              Phone: <a href="tel:+918870044213" style={{ color: 'var(--white)' }}>+91 88700 44213</a>
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              Email: <a href="mailto:info@zenvistas.co.in" style={{ color: 'var(--white)' }}>info@zenvistas.co.in</a>
            </p>
            <a
              href="https://wa.me/918870044213"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8rem',
                color: 'var(--gold)',
                fontWeight: 600,
                borderBottom: '1px solid rgba(225,178,88,0.3)',
                paddingBottom: '2px'
              }}
            >
              WhatsApp Us &rarr;
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
            &copy; {currentYear} ZenVistas Realty. All rights reserved.
          </span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '20px' }}>
            <span>Coimbatore, India</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
