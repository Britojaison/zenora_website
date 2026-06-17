"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Cookies from "js-cookie";

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export default function LeadForm({ open, onClose, redirectUrl }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [srd, setSrd] = useState<string | null>(null); // Dynamic SRD from UTM

  const [formDataState, setFormDataState] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    // Extract dynamic SRD from UTM parameters
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    let resolvedSrd = null;
    if (utmSource === "Website" && utmMedium === "WATI" && utmCampaign === "Zenora_Brochure_WATI") {
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
    } else if (utmSource === "Taboola" && utmMedium === "General" && utmCampaign === "Zenora_Taboola") {
      resolvedSrd = "69b9100b2f31c686cd170812";
    }

    if (resolvedSrd) {
      setSrd(resolvedSrd);
      sessionStorage.setItem("lead_srd", resolvedSrd);
    } else {
      const storedSrd = sessionStorage.getItem("lead_srd");
      if (storedSrd) setSrd(storedSrd);
    }
  }, []);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    };

    Cookies.set("user_name", data.name, { expires: 365 });
    Cookies.set("user_phone", data.phone, { expires: 365 });
    Cookies.set("user_email", data.email, { expires: 365 });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...(srd ? { srd } : {}) }),
      });

      if (!res.ok) {
        console.error("API Error:", await res.text());
        if (!redirectUrl) throw new Error("Submission failed");
      }

      // Taboola Lead event tracking
      if (typeof window !== "undefined" && (window as any)._tfa) {
        (window as any)._tfa.push({ notify: "event", name: "lead", id: 2046888 });
      }

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("lead_submitted", "true");
        } catch (e) {
          console.warn("Failed to save submission state to sessionStorage:", e);
        }
      }

      if (redirectUrl) {
        // Redirect to the provided URL after form submission
        setSubmitted(true);
        setTimeout(() => {
          window.open(redirectUrl, "_blank", "noopener,noreferrer");
        }, 1200);
      } else {
        // Just show thank you message
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      if (redirectUrl) {
        // Still allow the redirect even if the API throws a network error
        setSubmitted(true);
        setTimeout(() => {
          window.open(redirectUrl, "_blank", "noopener,noreferrer");
        }, 1200);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0e0c0b]/80" />

      {/* Modal */}
      <div
        className="relative bg-[#f5f1ed] w-full max-w-md p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#594433] hover:text-[#28362b] transition-colors"
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-px bg-[#e1b258] mx-auto mb-6" />
            <h3 className="font-display text-2xl text-[#28362b] mb-4">Thank you</h3>
            <p className="font-body text-[#594433] text-base leading-relaxed">
              {redirectUrl
                ? "Redirecting you to the Webverse experience..."
                : "We'll be in touch shortly to help you discover Zenora."}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <p className="font-body text-[#e1b258] text-sm uppercase mb-3">
                Exclusive Access
              </p>
              <h3 className="font-display text-3xl text-[#28362b] mb-2">
                Discover Zenora
              </h3>
              <div className="w-10 h-px bg-[#e1b258] opacity-60" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { id: "phone", label: "Contact Number", type: "tel", placeholder: "+91" },
                { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={field.id}
                    className="font-body text-xs uppercase text-[#594433]/70"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={formDataState[field.id as keyof typeof formDataState]}
                    onChange={(e) => setFormDataState({ ...formDataState, [field.id]: e.target.value })}
                    className="bg-transparent border-b border-[#ab948a]/30 py-3 font-body text-base text-[#28362b] placeholder:text-[#ab948a]/50 focus:border-[#e1b258] focus:outline-none transition-colors"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-[#28362b] text-[#e1d5c9] font-body text-xs uppercase py-4 hover:bg-[#e1b258] hover:text-[#28362b] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : redirectUrl ? "Continue to Webverse" : "Submit"}
              </button>

              {error && (
                <p className="font-body text-red-500 text-xs text-center">{error}</p>
              )}

              <p className="font-body text-[#ab948a] text-[10px] text-center mt-1">
                By submitting, you agree to receive communication from ZenVistas.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
