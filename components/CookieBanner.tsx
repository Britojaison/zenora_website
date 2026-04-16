"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function CookieBanner() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setShouldRender(true);
      // Small delay for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "accepted", { expires: 365 });
    setIsVisible(false);
    router.refresh();
    setTimeout(() => setShouldRender(false), 700); // Wait for transition
  };

  const handleReject = () => {
    Cookies.set("cookie_consent", "rejected", { expires: 365 });
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 700);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-[380px] bg-white border border-[#ab948a]/20 p-8 shadow-2xl z-[1000] transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <h3 className="font-display text-2xl text-[#28362b] italic mb-3">
        Your Privacy
      </h3>
      <p className="font-body text-[#594433] text-sm leading-[1.6] mb-8">
        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Please choose whether to accept or reject these cookies.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAccept}
          className="flex-1 bg-[#28362b] text-[#e1d5c9] hover:bg-[#e1b258] hover:text-[#28362b] font-body text-[10px] uppercase tracking-[2px] py-3.5 transition-colors text-center"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="flex-1 border border-[#ab948a]/30 text-[#594433] hover:border-[#28362b] font-body text-[10px] uppercase tracking-[2px] py-3.5 transition-colors text-center"
        >
          Reject All
        </button>
      </div>
    </div>
  );
}
