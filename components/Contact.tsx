"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const storedSrd = typeof window !== "undefined" ? sessionStorage.getItem("lead_srd") : null;
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          note: form.message || "Enquiry from Contact section",
          ...(storedSrd ? { srd: storedSrd } : {}),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      
      // Taboola Lead event tracking
      if (typeof window !== "undefined" && (window as any)._tfa) {
        (window as any)._tfa.push({ notify: "event", name: "lead", id: 2046888 });
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#33090d]">
      <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="font-body text-[#e1b258] text-xs uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#e1d5c9] mb-8">
              Begin your<br />Zenora journey.
            </h2>
            <p className="font-body text-[#e1d5c9]/70 text-base leading-[1.9] mb-10">
              Our team is ready to walk you through every detail — from floor plans to
              financing. Reach out and let us show you what elevation truly feels like.
            </p>
            <div className="flex flex-col gap-4">
              <p className="font-body text-[#e1d5c9]/60 text-xs uppercase">
                Goldwins, Coimbatore, Tamil Nadu
              </p>
              <a
                href="tel:+919999999999"
                className="font-body text-[#e1b258] text-base hover:underline"
              >
                +91 88700 44213
              </a>
              <a
                href="mailto:hello@zenvistas.co.in"
                className="font-body text-[#e1b258] text-base hover:underline"
              >
                info@zenvistas.co.in
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <div className="w-12 h-px bg-[#e1b258]" />
                <p className="font-display text-2xl text-[#e1d5c9]">Thank you.</p>
                <p className="font-body text-[#e1d5c9]/70 text-sm">
                  We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                  { id: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={field.id}
                      className="font-body text-[9px] uppercase text-[#e1d5c9]/60"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      className="bg-transparent border-b border-[#e1d5c9]/30 focus:border-[#e1b258] outline-none py-3 font-body text-[#e1d5c9] text-sm placeholder:text-[#e1d5c9]/30 transition-colors duration-300"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-body text-[9px] uppercase text-[#e1d5c9]/60"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Tell us what you're looking for..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-transparent border-b border-[#e1d5c9]/30 focus:border-[#e1b258] outline-none py-3 font-body text-[#e1d5c9] text-sm placeholder:text-[#e1d5c9]/30 transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 border border-[#e1d5c9]/40 text-[#e1d5c9] font-body text-[10px] uppercase py-4 hover:bg-[#e1d5c9] hover:text-[#561a28] transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Send Enquiry"}
                </button>

                {error && (
                  <p className="font-body text-red-300 text-xs text-center mt-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
