"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Clock, Users, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";

/* ─── Compute upcoming Wednesday & Saturday dates ─── */
function getNextDate(dayOfWeek: number): string {
  const today = new Date();
  const diff = (dayOfWeek - today.getDay() + 7) % 7 || 7;
  const next = new Date(today);
  next.setDate(today.getDate() + diff);
  return next.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


export default function CoffeeWithZenora() {
  const [showSlots, setShowSlots] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [srd, setSrd] = useState("69b90e4058f1e7692bde687e"); // Default SRD
  const [formDataState, setFormDataState] = useState({ fullName: "", phone: "", email: "", requests: "" });

  const wednesdayDate = getNextDate(3);
  const saturdayDate = getNextDate(6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Extract dynamic SRD from UTM parameters
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    let resolvedSrd = null;
    if (utmSource === "Google" && utmMedium === "Search" && utmCampaign === "Coffee_With_Zenora_Search") {
      resolvedSrd = "69c2478b9403689446b6b864";
    } else if (utmSource === "Google" && utmMedium === "Pmax" && utmCampaign === "Coffee_With_Zenora_Pmax") {
      resolvedSrd = "69c141382f31c6ef6540e41e";
    } else if (utmSource === "Google" && utmMedium === "DemandGen" && utmCampaign === "Coffee_With_Zenora_DemandGen") {
      resolvedSrd = "69c2481da3d8554ec4571bba";
    } else if (utmSource === "Google" && utmMedium === "Display" && utmCampaign === "Coffee_With_Zenora_Display") {
      resolvedSrd = "69c248cb0d185159b7dae152";
    } else if (utmSource === "Google" && utmMedium === "Youtube" && utmCampaign === "Coffee_With_Zenora_Youtube") {
      resolvedSrd = "69c24a7a58f1e788e307696d";
    } else if (utmSource === "Website" && utmMedium === "WATI" && utmCampaign === "Zenora_Brochure_WATI") {
      resolvedSrd = "69c50198735daf0afb3b7ec6";
    } else if (utmSource === "Google" && utmMedium === "Branded_Search" && utmCampaign === "Zenora_Search_Branded") {
      resolvedSrd = "698309f658f1e7c46b1b85db";
    } else if (utmSource === "Google" && utmMedium === "Generic_Search" && utmCampaign === "Zenora_Search_Generic") {
      resolvedSrd = "698309f658f1e7c46b1b85db";
    } else if (utmSource === "Google" && (utmMedium === "YouTube" || utmMedium === "Youtube") && utmCampaign === "Zenora_YouTube") {
      resolvedSrd = "698309cd0d1851f862bb4caf";
    } else if (utmSource === "Google" && utmMedium === "Display" && utmCampaign === "Zenora_Display") {
      resolvedSrd = "69830a1c5d8def9f8ae95753";
    } else if (utmSource === "Google" && utmMedium === "DemandGen" && utmCampaign === "Zenora_DemandGen") {
      resolvedSrd = "69830a61e11487c872a310f9";
    } else if (utmSource === "Google" && utmMedium === "PMax" && utmCampaign === "Zenora_PMax") {
      resolvedSrd = "69830a42e1148719002c7ef0";
    }

    try {
      if (resolvedSrd) {
        setSrd(resolvedSrd);
        sessionStorage.setItem("cwz_srd", resolvedSrd);
      } else {
        const storedSrd = sessionStorage.getItem("cwz_srd");
        if (storedSrd) setSrd(storedSrd);
      }
    } catch (e) {
      console.warn("sessionStorage is not accessible:", e);
    }

    setFormDataState({
      fullName: Cookies.get("user_name") || "",
      phone: Cookies.get("user_phone") || "",
      email: Cookies.get("user_email") || "",
      requests: ""
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const payload = { ...data, srd };

      Cookies.set("user_name", data.fullName as string, { expires: 365 });
      Cookies.set("user_phone", data.phone as string, { expires: 365 });
      Cookies.set("user_email", data.email as string, { expires: 365 });

      const res = await fetch("/api/dinner-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Taboola Lead event tracking
        if (typeof window !== "undefined" && (window as any)._tfa) {
          (window as any)._tfa.push({ notify: "event", name: "lead", id: 2046888 });
        }
        setSubmitted(true);
      } else {
        const errData = await res.json();
        console.error("Submission failed:", errData.error);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="coffee-with-zenora"
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        {/* ─── Full Bleed Background Image ─── */}
        <Image
          src="/images/coffee_with_Zenora.jpg"
          alt="Coffee with Zenora – Exclusive Dinner Experience"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* ─── Dark Overlay ─── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,8,6,0.35) 0%, rgba(10,8,6,0.7) 50%, rgba(10,8,6,0.88) 100%)",
          }}
        />

        {/* ─── Decorative Elements ─── */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e1b258]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e1b258]/30 to-transparent" />

        {/* ─── Content ─── */}
        <div
          className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-20 py-24"
        >
          {/* Gold accent line */}
          <div
            className={`w-12 h-px bg-[#e1b258] mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
          />

          {/* Label Removed */}

          {/* Subtitle */}
          <p
            className={`font-body text-[#e1b258] text-sm uppercase mb-10 transition-all duration-700 delay-300 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
          >
            A VIP Experience
          </p>

          {/* Heading */}
          <h2
            className={`font-display text-[clamp(2rem,5vw,4rem)] text-[#e1d5c9] text-center leading-[1.15] mb-8 transition-all duration-700 delay-400 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
          >
            Exclusive Dinner with Zenora
          </h2>

          {/* Description */}
          <div
            className={`max-w-2xl text-center mb-12 transition-all duration-700 delay-500 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
          >
            <p className="font-body text-[#e1d5c9] text-base md:text-lg leading-[1.9] tracking-wide">
              An intimate evening designed for families who are seriously considering Zenora. A personal walkthrough of the villas, combined with fine dining in an upscale, relaxed setting.
            </p>
          </div>

          {/* ─── Slots Button ─── */}
          <button
            onClick={() => setShowSlots(true)}
            className={`group relative inline-flex items-center gap-3 px-10 py-4 border border-[#e1b258]/50 bg-transparent hover:bg-[#e1b258] text-[#e1b258] hover:text-[#28362b] transition-all duration-500 mb-8 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
              }`}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
          >
            <Calendar size={16} className="transition-colors duration-500" />
            <span className="font-body text-xs uppercase">
              View Available Slots
            </span>
            <ChevronRight
              size={14}
              className="transition-all duration-500 group-hover:translate-x-1"
            />
          </button>

          {/* ─── Limited seats note ─── */}
          <p
            className={`font-body text-[#ab948a] text-[11px] uppercase transition-all duration-700 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
              }`}
            style={{ transitionDelay: isVisible ? "700ms" : "0ms" }}
          >
            <Users size={12} className="inline-block mr-2 -mt-0.5" />
            Limited to just 4 families per evening
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* ─── SLOTS MODAL ─── */}
      {/* ═══════════════════════════════════════════════════ */}
      {showSlots && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={() => setShowSlots(false)}
        >
          <div className="absolute inset-0 bg-[#0e0c0b]/85 backdrop-blur-sm" />
          <div
            className="relative bg-[#1c1c1c] w-full max-w-lg p-0 shadow-2xl overflow-hidden"
            style={{ border: "1px solid rgba(225,178,88,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="px-8 pt-8 pb-6"
              style={{
                background:
                  "linear-gradient(180deg, rgba(40,54,43,0.6) 0%, transparent 100%)",
              }}
            >
              <button
                onClick={() => setShowSlots(false)}
                className="absolute top-4 right-4 text-[#ab948a] hover:text-[#e1b258] transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <p className="font-body text-[#e1b258] text-xs uppercase mb-3">
                Exclusive Dinner
              </p>
              <h3 className="font-display text-2xl text-[#e1d5c9] mb-1">
                Available Slots This Week
              </h3>
              <div className="w-10 h-px bg-[#e1b258]/40 mt-4" />
            </div>

            {/* Slot cards */}
            <div className="px-8 pb-4 flex flex-col gap-4">
              {/* Wednesday */}
              <div
                className="flex items-center justify-between p-5"
                style={{
                  background: "rgba(225,178,88,0.04)",
                  border: "1px solid rgba(225,178,88,0.12)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 border border-[#e1b258]/30">
                    <Calendar size={16} className="text-[#e1b258]" />
                  </div>
                  <div>
                    <p className="font-body text-[#e1d5c9] text-sm">
                      Wednesday, {wednesdayDate}
                    </p>
                    <p className="font-body text-[#ab948a] text-xs flex items-center gap-1.5 mt-1">
                      <Clock size={11} /> 7:00 PM
                    </p>
                  </div>
                </div>
                <span className="font-body text-[10px] uppercase text-emerald-400 border border-emerald-400/30 px-3 py-1">
                  Available
                </span>
              </div>

              {/* Saturday */}
              <div
                className="flex items-center justify-between p-5"
                style={{
                  background: "rgba(225,178,88,0.04)",
                  border: "1px solid rgba(225,178,88,0.12)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 border border-[#e1b258]/30">
                    <Calendar size={16} className="text-[#e1b258]" />
                  </div>
                  <div>
                    <p className="font-body text-[#e1d5c9] text-sm">
                      Saturday, {saturdayDate}
                    </p>
                    <p className="font-body text-[#ab948a] text-xs flex items-center gap-1.5 mt-1">
                      <Clock size={11} /> 7:00 PM
                    </p>
                  </div>
                </div>
                <span className="font-body text-[10px] uppercase text-emerald-400 border border-emerald-400/30 px-3 py-1">
                  Available
                </span>
              </div>
            </div>

            {/* Seats note */}
            <div className="px-8 py-3">
              <p className="font-body text-[#ab948a] text-[11px] flex items-center gap-2">
                <Users size={12} className="text-[#e1b258]" />
                Limited to just 4 families per evening
              </p>
            </div>

            {/* Divider */}
            <div className="mx-8 h-px bg-[#e1b258]/10" />

            {/* How it works */}
            <div className="px-8 py-6">
              <p className="font-body text-[#e1b258] text-[11px] uppercase mb-4">
                How It Works
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    step: "01",
                    title: "Submit Your Details",
                    desc: "Fill out the form to express your interest.",
                  },
                  {
                    step: "02",
                    title: "Confirmation Call",
                    desc: "Our team will personally confirm your reservation and provide details.",
                  },
                  {
                    step: "03",
                    title: "Slot Confirmed",
                    desc: "Your slot is confirmed post call.",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <span className="font-body text-[#e1b258]/40 text-xs mt-0.5 shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-body text-[#e1d5c9] text-sm">
                        {s.title}
                      </p>
                      <p className="font-body text-[#ab948a] text-xs mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <button
                onClick={() => {
                  setShowSlots(false);
                  setShowForm(true);
                }}
                className="w-full py-4 bg-[#e1b258] hover:bg-[#c99a3e] text-[#28362b] font-body text-xs uppercase transition-all duration-300"
              >
                Reserve Your Spot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* ─── RESERVATION FORM MODAL ─── */}
      {/* ═══════════════════════════════════════════════════ */}
      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={() => {
            setShowForm(false);
            setSubmitted(false);
          }}
        >
          <div className="absolute inset-0 bg-[#0e0c0b]/85 backdrop-blur-sm" />
          <div
            className="relative bg-[#f5f1ed] w-full max-w-md shadow-2xl overflow-hidden"
            style={{ border: "1px solid rgba(225,178,88,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowForm(false);
                setSubmitted(false);
              }}
              className="absolute top-4 right-4 text-[#594433] hover:text-[#28362b] transition-colors z-10"
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="px-10 py-16 text-center">
                <div className="w-12 h-px bg-[#e1b258] mx-auto mb-6" />
                <h3 className="font-display text-2xl text-[#28362b] mb-4">
                  Thank You
                </h3>
                <p className="font-body text-[#594433] text-base leading-relaxed mb-2">
                  We&apos;ve received your reservation request.
                </p>
                <p className="font-body text-[#ab948a] text-sm leading-relaxed">
                  Our team will personally call you to confirm your slot and
                  share the details for the evening.
                </p>
              </div>
            ) : (
              <div className="px-10 py-10">
                {/* Header */}
                <div className="mb-8">
                  <p className="font-body text-[#e1b258] text-xs uppercase mb-3">
                    Exclusive Dinner
                  </p>
                  <h3 className="font-display text-3xl text-[#28362b] mb-2">
                    Reserve Your Spot
                  </h3>
                  <div className="w-10 h-px bg-[#e1b258] opacity-60" />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="cwz-name"
                      className="font-body text-xs uppercase text-[#594433]/70"
                    >
                      Full Name <span className="text-[#e1b258]">*</span>
                    </label>
                    <input
                      id="cwz-name"
                      name="fullName"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formDataState.fullName}
                      onChange={(e) => setFormDataState({ ...formDataState, fullName: e.target.value })}
                      className="bg-transparent border-b border-[#ab948a]/30 py-3 font-body text-base text-[#28362b] placeholder:text-[#ab948a]/50 focus:border-[#e1b258] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="cwz-phone"
                      className="font-body text-xs uppercase text-[#594433]/70"
                    >
                      Contact Number <span className="text-[#e1b258]">*</span>
                    </label>
                    <input
                      id="cwz-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91"
                      required
                      value={formDataState.phone}
                      onChange={(e) => setFormDataState({ ...formDataState, phone: e.target.value })}
                      className="bg-transparent border-b border-[#ab948a]/30 py-3 font-body text-base text-[#28362b] placeholder:text-[#ab948a]/50 focus:border-[#e1b258] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="cwz-email"
                      className="font-body text-xs uppercase text-[#594433]/70"
                    >
                      Email Address <span className="text-[#e1b258]">*</span>
                    </label>
                    <input
                      id="cwz-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={formDataState.email}
                      onChange={(e) => setFormDataState({ ...formDataState, email: e.target.value })}
                      className="bg-transparent border-b border-[#ab948a]/30 py-3 font-body text-base text-[#28362b] placeholder:text-[#ab948a]/50 focus:border-[#e1b258] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="cwz-requests"
                      className="font-body text-xs uppercase text-[#594433]/70"
                    >
                      Special Requests / Preferences{" "}
                      <span className="text-[#ab948a] text-[10px] normal-case">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="cwz-requests"
                      name="requests"
                      placeholder="Dietary restrictions, preferences for the dinner..."
                      rows={3}
                      value={formDataState.requests}
                      onChange={(e) => setFormDataState({ ...formDataState, requests: e.target.value })}
                      className="bg-transparent border-b border-[#ab948a]/30 py-3 font-body text-base text-[#28362b] placeholder:text-[#ab948a]/50 focus:border-[#e1b258] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-[#28362b] text-[#e1d5c9] font-body text-xs uppercase py-4 hover:bg-[#e1b258] hover:text-[#28362b] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting..." : "Reserve Your Spot"}
                  </button>

                  <p className="font-body text-[#ab948a] text-[10px] text-center mt-1">
                    Slot is confirmed post call. By submitting, you agree to
                    receive communication from ZenVistas.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
