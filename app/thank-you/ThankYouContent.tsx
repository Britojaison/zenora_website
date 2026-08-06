"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";

export default function ThankYouContent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-18329908920/voemCKaemdIcELjtsKRE",
        });
      } else {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
          (window as any).dataLayer.push(args);
        }
        gtag("event", "conversion", {
          send_to: "AW-18329908920/voemCKaemdIcELjtsKRE",
        });
      }
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#33090d] text-[#e1d5c9] overflow-hidden">
      {/* Event snippet for Zenora Web Enquiry conversion page */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `gtag('event', 'conversion', {'send_to': 'AW-18329908920/voemCKaemdIcELjtsKRE'});`,
        }}
      />

      {/* Left side: content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-20 min-h-[50vh] md:min-h-screen relative z-10"
      >
        {/* Header/Logo */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-0">
          <Link href="/" className="inline-block">
            <img
              src="/images/zenora_logo.svg"
              alt="Zenora Logo"
              className="h-10 w-auto hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
        </motion.div>

        {/* Main Content Card */}
        <div className="flex flex-col justify-center flex-grow py-8 md:py-0">
          <motion.p
            variants={itemVariants}
            className="font-body text-[#e1b258] text-xs uppercase tracking-[3px] mb-4"
          >
            Enquiry Received
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] text-[#e1d5c9] mb-6"
            style={{ fontWeight: 300, fontStyle: "italic" }}
          >
            Your journey<br />begins here.
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-[#e1b258] opacity-60 mb-8"
          />

          <motion.p
            variants={itemVariants}
            className="font-body text-[#e1d5c9]/80 text-base md:text-lg leading-[1.8] max-w-md mb-12"
          >
            Thank you for expressing interest in Zenora. Our concierge team has been notified and will connect with you shortly to assist with floor plans, pricing, and private site visits.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <a
              href="/Zenora Brochure v2_compressed.pdf"
              download
              className="inline-flex items-center gap-3 bg-[#e1b258] text-[#28362b] font-body text-xs uppercase tracking-[2px] px-8 py-4 hover:bg-[#e1d5c9] transition-all duration-300 font-semibold shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Brochure
            </a>

            <Link
              href="/"
              className="group inline-flex items-center gap-3 border border-[#e1d5c9]/40 text-[#e1d5c9] font-body text-xs uppercase tracking-[2px] px-8 py-4 hover:bg-[#e1d5c9] hover:text-[#561a28] hover:border-transparent transition-all duration-500 w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform duration-300"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>

        {/* Footer info */}
        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] uppercase text-[#e1d5c9]/40 font-body tracking-wider"
        >
          <span>© {new Date().getFullYear()} ZenVistas. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#e1b258] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#e1b258] transition-colors">Terms</Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side: image */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative overflow-hidden">
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/img/human-view-club-house.jpg"
            alt="Zenora Clubhouse View"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#33090d]/20 mix-blend-multiply md:hidden" />
        </motion.div>
      </div>
    </div>
  );
}
