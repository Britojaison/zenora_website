"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Phone, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuration Toggle: Set this to true to use the educational options from lakshyacommerce.com
const USE_EDUCATIONAL_FIELDS = false; 

export default function StickyEnquiryBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    option1: "", // Villa Type or Course
    option2: "", // Timeline or Work Experience
  });

  const phoneNumber = "+918870044213";
  const whatsappNumber = "919789003828";
  const whatsappMsg = "Hello, can you tell me more about Zenora?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  // Track viewport size to toggle layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Use 768px (Tablet md) as the breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Prefill form from cookies
    setForm((prev) => ({
      ...prev,
      name: Cookies.get("user_name") || "",
      phone: Cookies.get("user_phone") || "",
      email: Cookies.get("user_email") || "",
    }));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.name || !form.phone || !form.email || !form.option1 || !form.option2) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Format the note for CRM/Sell.do
    const note = USE_EDUCATIONAL_FIELDS
      ? `Sticky Bottom Enquiry Form\nCourse: ${form.option1}\nWork Experience: ${form.option2}`
      : `Sticky Bottom Enquiry Form\nVilla Preference: ${form.option1}\nTimeline: ${form.option2}`;

    // Store basic details in cookies
    Cookies.set("user_name", form.name, { expires: 365 });
    Cookies.set("user_phone", form.phone, { expires: 365 });
    Cookies.set("user_email", form.email, { expires: 365 });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          note: note,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsDrawerOpen(false);
        setForm((prev) => ({ ...prev, option1: "", option2: "" }));
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Options configuration
  const optLabel1 = USE_EDUCATIONAL_FIELDS ? "Select Course" : "Villa Type";
  const optLabel2 = USE_EDUCATIONAL_FIELDS ? "Select Work Experience" : "Timeline";

  const dropdown1Options = USE_EDUCATIONAL_FIELDS
    ? ["MBA+ACCA", "CA", "ACCA", "CMA USA", "Integrated ACCA Course", "Integrated CMA USA Course", "CMA India", "CS", "CPA", "DipIFR"]
    : ["3 BHK Villa", "4 BHK Villa", "5 BHK Villa"];

  const dropdown2Options = USE_EDUCATIONAL_FIELDS
    ? ["Class 11 Student", "Class 12 Student", "Pursuing Graduation", "Pursuing Post-Graduation", "Graduate and Above - No Experience", "0-1 Yr", "2-5 Yrs", "5+ Yrs"]
    : ["Immediate Purchase", "1-3 Months", "3-6 Months", "Just Exploring"];

  return (
    <>
      {/* Inject custom body padding to ensure footer content is not cut off */}
      <style dangerouslySetInnerHTML={{ __html: `
        body {
          padding-bottom: 82px !important;
        }
        @media (max-width: 767px) {
          body {
            padding-bottom: 72px !important;
          }
        }
      `}} />

      {/* TABLET & DESKTOP STICKY BAR */}
      {!isMobile && (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-[#28362b] text-[#f5f1ed] border-t border-[#e1b258]/30 shadow-2xl z-40 py-4 px-5 font-body">
          <div className="max-w-full xl:max-w-[1550px] mx-auto flex items-center justify-between gap-4">
            
            {/* Left section: Logo & Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <img 
                src="/images/zenora_logo.svg" 
                alt="Zenora Logo" 
                className="h-10 w-auto"
              />
              <div>
                <span className="font-display text-base tracking-wider text-[#e1b258] block not-italic font-light leading-tight">
                  DISCOVER ZENORA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#ab948a] block">
                  Exclusive Enquiry
                </span>
              </div>
            </div>

            {/* Form Section */}
            {submitted ? (
              <div className="flex-1 flex items-center justify-center text-[#e1b258] font-display italic text-base py-1">
                <Check className="mr-2" size={18} /> Thank you. We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex items-center justify-between gap-3 xl:gap-4">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-5 gap-2.5 xl:gap-3.5 flex-1">
                  
                  {/* Name */}
                  <div>
                    <input
                      required
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Your Name *"
                      className="w-full bg-transparent border-b border-[#ab948a]/30 focus:border-[#e1b258] outline-none text-xs xl:text-sm py-2 text-[#f5f1ed] placeholder:text-[#ab948a]/50 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="Contact Number *"
                      className="w-full bg-transparent border-b border-[#ab948a]/30 focus:border-[#e1b258] outline-none text-xs xl:text-sm py-2 text-[#f5f1ed] placeholder:text-[#ab948a]/50 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="Email Address *"
                      className="w-full bg-transparent border-b border-[#ab948a]/30 focus:border-[#e1b258] outline-none text-xs xl:text-sm py-2 text-[#f5f1ed] placeholder:text-[#ab948a]/50 transition-colors"
                    />
                  </div>

                  {/* Dropdown 1 */}
                  <div>
                    <select
                      required
                      name="option1"
                      value={form.option1}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#ab948a]/30 focus:border-[#e1b258] outline-none text-xs xl:text-sm py-2.5 text-[#f5f1ed] transition-colors cursor-pointer appearance-none"
                    >
                      <option value="" disabled className="bg-[#28362b] text-[#ab948a]/50">{optLabel1} *</option>
                      {dropdown1Options.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#28362b] text-[#f5f1ed]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 2 */}
                  <div>
                    <select
                      required
                      name="option2"
                      value={form.option2}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#ab948a]/30 focus:border-[#e1b258] outline-none text-xs xl:text-sm py-2.5 text-[#f5f1ed] transition-colors cursor-pointer appearance-none"
                    >
                      <option value="" disabled className="bg-[#28362b] text-[#ab948a]/50">{optLabel2} *</option>
                      {dropdown2Options.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#28362b] text-[#f5f1ed]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#e1b258] text-[#28362b] font-body text-[9px] xl:text-[10px] uppercase font-bold tracking-widest px-4 xl:px-6 py-3 hover:bg-[#f5f1ed] transition-colors disabled:opacity-50 flex-shrink-0 cursor-pointer"
                >
                  {loading ? "Submitting..." : "Request Callback"}
                </button>

              </form>
            )}

            {/* Right section: Call & WhatsApp Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Call Button */}
              <a
                href={`tel:${phoneNumber}`}
                className="w-11 h-11 bg-[#e1b258] rounded-full flex items-center justify-center text-[#28362b] hover:scale-105 hover:bg-[#f5f1ed] transition-all cursor-pointer shadow-md"
                aria-label="Call Us"
              >
                <Phone size={18} />
              </a>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer shadow-md"
                aria-label="WhatsApp Us"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {error && (
              <div className="absolute left-1/2 bottom-[-16px] transform -translate-x-1/2 text-red-400 text-[10px] tracking-wide">
                {error}
              </div>
            )}

          </div>
        </div>
      )}

      {/* MOBILE STICKY BAR */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#28362b] border-t border-[#e1b258]/30 shadow-2xl z-40 p-3 grid grid-cols-3 gap-3 font-body">
          {/* Call Button */}
          <a
            href={`tel:${phoneNumber}`}
            className="h-12 bg-white/10 hover:bg-white/15 active:bg-white/20 rounded-lg flex items-center justify-center text-[#e1b258] active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
            aria-label="Call us"
          >
            <Phone size={22} />
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 bg-white/10 hover:bg-white/15 active:bg-white/20 rounded-lg flex items-center justify-center text-[#e1b258] active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
            aria-label="WhatsApp Us"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* Enquiry Form Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="h-12 bg-white/10 hover:bg-white/15 active:bg-white/20 rounded-lg flex items-center justify-center text-[#e1b258] active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
            aria-label="Open Enquiry Form"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile/Tablet Sheet (Bottom Drawer) */}
      <AnimatePresence>
        {isDrawerOpen && isMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-[#0e0c0b] z-50"
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 w-full max-h-[90vh] overflow-y-auto bg-[#28362b] text-[#f5f1ed] border-t border-[#e1b258]/30 rounded-t-3xl shadow-2xl z-50 p-8 font-body"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ab948a]/10">
                <div>
                  <h3 className="font-display text-2xl tracking-wider text-[#e1b258] not-italic font-light">
                    DISCOVER ZENORA
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#ab948a] mt-0.5">
                    Exclusive Access
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="bg-[#ab948a]/10 text-[#ab948a] hover:text-[#e1b258] p-2 rounded-full transition-colors"
                  aria-label="Close Enquiry Form"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-px bg-[#e1b258] mx-auto mb-6" />
                  <p className="font-display text-xl text-[#e1b258] italic mb-3">Thank you</p>
                  <p className="text-sm text-[#ab948a] leading-relaxed">
                    We'll be in touch shortly to help you discover Zenora.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#ab948a]">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-transparent border-b border-[#ab948a]/20 focus:border-[#e1b258] outline-none text-base py-2.5 text-[#f5f1ed] placeholder:text-[#ab948a]/30 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#ab948a]">
                      Contact Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="+91"
                      className="bg-transparent border-b border-[#ab948a]/20 focus:border-[#e1b258] outline-none text-base py-2.5 text-[#f5f1ed] placeholder:text-[#ab948a]/30 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#ab948a]">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="bg-transparent border-b border-[#ab948a]/20 focus:border-[#e1b258] outline-none text-base py-2.5 text-[#f5f1ed] placeholder:text-[#ab948a]/30 transition-colors"
                    />
                  </div>

                  {/* Option 1 Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#ab948a]">
                      {optLabel1} *
                    </label>
                    <select
                      required
                      name="option1"
                      value={form.option1}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-[#ab948a]/20 focus:border-[#e1b258] outline-none text-base py-2.5 text-[#f5f1ed] transition-colors cursor-pointer appearance-none"
                    >
                      <option value="" disabled className="bg-[#28362b] text-[#ab948a]/50">Select preference</option>
                      {dropdown1Options.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#28362b] text-[#f5f1ed]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Option 2 Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#ab948a]">
                      {optLabel2} *
                    </label>
                    <select
                      required
                      name="option2"
                      value={form.option2}
                      onChange={handleInputChange}
                      className="bg-transparent border-b border-[#ab948a]/20 focus:border-[#e1b258] outline-none text-base py-2.5 text-[#f5f1ed] transition-colors cursor-pointer appearance-none"
                    >
                      <option value="" disabled className="bg-[#28362b] text-[#ab948a]/50">Select option</option>
                      {dropdown2Options.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#28362b] text-[#f5f1ed]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Error display */}
                  {error && (
                    <p className="text-red-400 text-xs text-center mt-2">{error}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-[#e1b258] text-[#28362b] font-body text-xs font-bold uppercase tracking-widest py-4 hover:bg-[#f5f1ed] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Submitting..." : "Submit Enquiry"}
                  </button>

                  <p className="text-[10px] text-[#ab948a]/60 text-center mt-2 leading-relaxed">
                    By submitting, you agree to receive communication from ZenVistas.
                  </p>

                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
