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
              <a href="https://www.zenvistas.co.in" className={styles.footerWebsite}>zenvistas.co.in</a>
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
