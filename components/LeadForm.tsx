"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const LEAD_SRD_MAPPINGS = [
  { source: "Google", medium: "Branded_Search", campaign: "Zenora_Search_Branded", srd: "69b90eb8735dafb5321577e7" },
  { source: "Google", medium: "Generic_Search", campaign: "Zenora_Search_Generic", srd: "69b90eef2f31c6356115c183" },
  { source: "Google", medium: "YouTube", campaign: "Zenora_YouTube", srd: "69b90f29a3d855a21507c57c" },
  { source: "Google", medium: "Display", campaign: "Zenora_Display", srd: "69b90f51a3d8558dd41af2b6" },
  { source: "Google", medium: "DemandGen", campaign: "Zenora_DemandGen", srd: "69b90f932f31c6cb3d3a4b94" },
  { source: "Google", medium: "PMax", campaign: "Zenora_PMax", srd: "69b90fe19403685816f40d24" },
  { source: "Taboola", medium: "General", campaign: "Zenora_Taboola", srd: "69b9100b2f31c686cd170812" },
];

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export default function LeadForm({ open, onClose, redirectUrl }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [srd, setSrd] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    const matched = LEAD_SRD_MAPPINGS.find(m =>
      m.source === utmSource &&
      m.medium === utmMedium &&
      m.campaign === utmCampaign
    );

    if (matched) {
      setSrd(matched.srd);
      sessionStorage.setItem("lead_srd", matched.srd);
    } else {
      const storedSrd = sessionStorage.getItem("lead_srd");
      if (storedSrd) setSrd(storedSrd);
    }
  }, []);
  const [error, setError] = useState("");

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

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...(srd && { srd }) }),
      });

      if (!res.ok) {
        console.error("API Error:", await res.text());
        if (!redirectUrl) throw new Error("Submission failed");
      }
      
      if (redirectUrl) {
        // Redirect to the provided URL after form submission
        setSubmitted(true);
        setTimeout(() => {
          window.open(redirectUrl, "_blank", "noopener,noreferrer");
        }, 1200);
      } else {
        // Default: trigger PDF download
        const link = document.createElement("a");
        link.href = "/brochure/zenora-brochure.pdf";
        link.download = "Zenora-Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    className="bg-transparent border-b border-[#ab948a]/30 py-3 font-body text-base text-[#28362b] placeholder:text-[#ab948a]/50 focus:border-[#e1b258] focus:outline-none transition-colors"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-[#28362b] text-[#e1d5c9] font-body text-xs uppercase py-4 hover:bg-[#e1b258] hover:text-[#28362b] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : redirectUrl ? "Continue to Webverse" : "Download Brochure"}
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
