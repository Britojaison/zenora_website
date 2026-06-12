"use client";

import Image from "next/image";
import { useState } from "react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Basic client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormStatus("error");
      setFormMessage("Please enter a valid email address.");
      return;
    }

    setFormStatus("loading");
    setFormMessage("");

    // Simulate API request delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setFormStatus("success");
      setFormMessage("Success! You've been added to the VIP preview list.");
      setEmail("");
    } catch {
      setFormStatus("error");
      setFormMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="page-container">
      {/* Cinematic Background */}
      <div className="bg-container">
        <Image
          src="/images/villa_hero.png"
          alt="Luxury modernist villa by the ocean"
          fill
          priority
          sizes="100vw"
          className="bg-image"
        />
        <div className="bg-overlay" />
      </div>

      {/* Main Glassmorphic Card */}
      <section className="hero-card" aria-label="Subscription Info">
        <header className="logo-container">
          <Image
            src="/images/ZV.jpg"
            alt="Zen Vistas Logo"
            width={64}
            height={64}
            priority
            className="logo-img"
          />
          <span className="logo-text">Zen Vistas</span>
          <span className="status-badge">Under Construction</span>
        </header>

        <div className="content-container">
          <h1 className="main-title">
            Redefining <span className="highlight">Refined Living</span>
          </h1>
          <p className="tagline" style={{ marginTop: "1rem" }}>
            Our digital presentation is currently <span className="highlight">under construction</span>.<br></br> Zen Vistas website is launching soon.
          </p>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubscribe} className="subscribe-form" noValidate>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email for VIP access"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formStatus !== "idle") setFormStatus("idle");
              }}
              disabled={formStatus === "loading"}
              className="email-input"
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={formStatus === "loading" || !email}
              className="submit-btn"
            >
              {formStatus === "loading" ? "Registering..." : "Notify Me"}
            </button>
          </div>
          {formMessage && (
            <div
              className={`form-message ${formStatus === "success" ? "success" : "error"
                }`}
              role="alert"
            >
              {formMessage}
            </div>
          )}
        </form>

        {/* Footer info */}
        <footer>
          <p className="footer-text">Be the first to receive updates on private listings.</p>
          <div className="social-links" style={{ justifyContent: "center" }}>
            <a href="#" className="social-link" aria-label="Instagram">Instagram</a>
            <span style={{ color: "var(--text-secondary)", opacity: 0.3 }}>•</span>
            <a href="#" className="social-link" aria-label="LinkedIn">LinkedIn</a>
            <span style={{ color: "var(--text-secondary)", opacity: 0.3 }}>•</span>
            <a href="#" className="social-link" aria-label="Email Contact">Contact</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
