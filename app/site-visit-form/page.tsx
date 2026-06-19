"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./site-visit-form.module.css";

export default function SiteVisitForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    campaign: "",
    subSource: "",
    propertyTypes: [] as string[],
    preferredBhk: [] as string[],
    siteVisit: "",
    sales: "",
    phone: "",
    streetLocality: "",
    source: "",
    project: "",
    purpose: "",
    preferredPriceRange: "",
    city: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const current = prev[field as keyof typeof prev] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);

    // Taboola Lead event tracking
    if (typeof window !== "undefined" && (window as any)._tfa) {
      (window as any)._tfa.push({ notify: "event", name: "lead", id: 2046888 });
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Image
            src="/images/zenora_logo.svg"
            alt="Zenora Logo"
            width={180}
            height={48}
            priority
          />
        </div>
      </header>

      {/* Form Section */}
      <main className={styles.main}>
        <div>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>WALK IN LEAD ENTRY FORM</h1>
            <p className={styles.subtitle}>
              Glad to have you with us. Please fill in your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
              {/* Left Column */}
              <div>
                {/* Name */}
                <div className={styles.group}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Email */}
                <div className={styles.group}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                {/* Campaign */}
                <div className={styles.group}>
                  <label htmlFor="campaign" className={styles.label}>Campaign</label>
                  <select
                    id="campaign"
                    name="campaign"
                    value={formData.campaign}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="google-ads">Google Ads</option>
                    <option value="facebook-ads">Facebook Ads</option>
                    <option value="referral">Referral</option>
                    <option value="walk-in">Walk In</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Sub Source */}
                <div className={styles.group}>
                  <label htmlFor="subSource" className={styles.label}>Sub source</label>
                  <select
                    id="subSource"
                    name="subSource"
                    value={formData.subSource}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="direct">Direct</option>
                  </select>
                </div>

                {/* Property Types */}
                <div className={styles.group}>
                  <label className={styles.label}>Property Types</label>
                  <div className={styles.checkboxGroup}>
                    {["Villa", "Plot"].map((type) => (
                      <label key={type} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.propertyTypes.includes(type)}
                          onChange={() => handleCheckboxChange("propertyTypes", type)}
                          className={styles.checkbox}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred BHK */}
                <div className={styles.group}>
                  <label className={styles.label}>Preferred BHK</label>
                  <div className={styles.checkboxGroup}>
                    {["4 BHK", "5 BHK", "6 BHK", "7 BHK+"].map((bhk) => (
                      <label key={bhk} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.preferredBhk.includes(bhk)}
                          onChange={() => handleCheckboxChange("preferredBhk", bhk)}
                          className={styles.checkbox}
                        />
                        <span>{bhk}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Site Visit */}
                <div className={styles.group}>
                  <label htmlFor="siteVisit" className={styles.label}>Site visit</label>
                  <input
                    type="text"
                    id="siteVisit"
                    name="siteVisit"
                    value={formData.siteVisit}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                {/* Sales */}
                <div className={styles.group}>
                  <label htmlFor="sales" className={styles.label}>Sales</label>
                  <select
                    id="sales"
                    name="sales"
                    value={formData.sales}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="team-a">Team A</option>
                    <option value="team-b">Team B</option>
                    <option value="team-c">Team C</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Phone */}
                <div className={styles.group}>
                  <label htmlFor="phone" className={styles.label}>Phone</label>
                  <div className={styles.phoneWrapper}>
                    <span className={styles.phoneFlag}>🇮🇳 +91</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`${styles.input} ${styles.phoneInput}`}
                      required
                    />
                  </div>
                </div>

                {/* Street / Locality */}
                <div className={styles.group}>
                  <label htmlFor="streetLocality" className={styles.label}>Street / Locality</label>
                  <input
                    type="text"
                    id="streetLocality"
                    name="streetLocality"
                    value={formData.streetLocality}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                {/* Source */}
                <div className={styles.group}>
                  <label htmlFor="source" className={styles.label}>Source</label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="website">Website</option>
                    <option value="social-media">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="hoarding">Hoarding</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Project */}
                <div className={styles.group}>
                  <label htmlFor="project" className={styles.label}>Project</label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="zenora">Zenora</option>
                  </select>
                </div>

                {/* Purpose */}
                <div className={styles.group}>
                  <label className={styles.label}>Purpose</label>
                  <div className={styles.radioGroup}>
                    {["End use", "Investor"].map((p) => (
                      <label key={p} className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="purpose"
                          value={p}
                          checked={formData.purpose === p}
                          onChange={handleInputChange}
                          className={styles.radio}
                        />
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred Price Range */}
                <div className={styles.group}>
                  <label htmlFor="preferredPriceRange" className={styles.label}>Preferred Price Range</label>
                  <select
                    id="preferredPriceRange"
                    name="preferredPriceRange"
                    value={formData.preferredPriceRange}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select</option>
                    <option value="1-2cr">₹1 Cr - ₹2 Cr</option>
                    <option value="2-3cr">₹2 Cr - ₹3 Cr</option>
                    <option value="3-5cr">₹3 Cr - ₹5 Cr</option>
                    <option value="5cr+">₹5 Cr+</option>
                  </select>
                </div>

                {/* City */}
                <div className={styles.group}>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className={styles.actions}>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            {/* Left - Logo & Tagline */}
            <div className={styles.footerBrand}>
              <Image
                src="/images/zenora_logo.svg"
                alt="Zenora Logo"
                width={160}
                height={42}
              />
              <p className={styles.footerTagline}>
                A luxury villa community in Goldwins, Coimbatore. Elevation without compromise.
              </p>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.facebook.com/profile.php?id=61577722516155#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={styles.socialIcon}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-5 1.7-5 5v2z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/zenora_by_zenvistas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.socialIcon}
                >
                  <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919789003828"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={styles.socialIcon}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4.5 h-4.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://www.threads.net/@zenora_by_zenvistas?fbclid=IwY2xjawSGPB9leHRuA2FlbQIxMABicmlkETFobkVCS0RsV0JRNzVsWjZTc3J0YwZhcHBfaWQPNTE0NzcxNTY5MjI4MDYxAAEe6Rncs-s9DibBjSMu9ykb-jY-l1YE1lCKN181kkNH8S2MGE81L8ClQzDQf_k_aem_rBsIS2uErWjFPTf6IzCG7g"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                  className={styles.socialIcon}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle - Navigate */}
            <div className={styles.footerNav}>
              <h4 className={styles.footerHeading}>NAVIGATE</h4>
              <ul className={styles.footerLinks}>
                <li><a href="/#residences">Residences</a></li>
                <li><a href="/#amenities">Amenities</a></li>
                <li><a href="/#gallery">Gallery</a></li>
                <li><a href="/#location">Location</a></li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </div>

            {/* Right - Contact */}
            <div className={styles.footerContact}>
              <h4 className={styles.footerHeading}>CONTACT</h4>
              <a href="mailto:info@zenvistas.co.in" className={styles.footerEmail}>info@zenvistas.co.in</a>
              <a href="https://www.zenoravillas.in" className={styles.footerWebsite}>zenoravillas.in</a>
              <p className={styles.footerAddress}>
                Goldwins, Coimbatore<br />
                Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.footerBottomInner}>
            <span>© 2026 ZenVistas. All rights reserved.</span>
            <span>RERA Registered · TNRERA/1/BLG/0010/2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
