"use client";
import { useState, useEffect } from "react";
import LeadForm from "./LeadForm";

export default function AutoLeadForm() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show the popup automatically after 5 seconds every time the home page loads
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return <LeadForm open={open} onClose={handleClose} brochureUrl="/Zenora Brochure v2_compressed.pdf" />;
}
