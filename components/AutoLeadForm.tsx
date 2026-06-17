"use client";
import { useState, useEffect } from "react";
import LeadForm from "./LeadForm";
import Cookies from "js-cookie";

export default function AutoLeadForm() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const cookieUserName = Cookies.get("user_name");
      const sessionSubmitted = typeof window !== "undefined" && window.sessionStorage ? sessionStorage.getItem("lead_submitted") : null;
      const sessionClosed = typeof window !== "undefined" && window.sessionStorage ? sessionStorage.getItem("lead_form_closed") : null;

      console.log("[AutoLeadForm] Initial check:", {
        cookieUserName,
        sessionSubmitted,
        sessionClosed
      });

      const hasSubmitted = !!(cookieUserName || sessionSubmitted);
      const hasClosed = !!sessionClosed;

      if (hasSubmitted || hasClosed) {
        console.log("[AutoLeadForm] Popup suppressed:", {
          hasSubmitted,
          hasClosed
        });
        return;
      }

      console.log("[AutoLeadForm] Scheduling popup to trigger in 5000ms...");
      const timer = setTimeout(() => {
        console.log("[AutoLeadForm] Triggering popup open.");
        setOpen(true);
      }, 5000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error("[AutoLeadForm] Failed to evaluate storage/cookies, defaulting to scheduler:", error);
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.setItem("lead_form_closed", "true");
      }
    } catch (error) {
      console.warn("[AutoLeadForm] Failed to set session storage:", error);
    }
  };

  return <LeadForm open={open} onClose={handleClose} />;
}
