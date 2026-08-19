"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { AHero, AAINArticleCTA } from "./BlogTypography";

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LAYOUT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface BlogLayoutProps {
  tag: string;
  title: string;
  excerpt: string;
  time: string;
  img?: string;
  children: React.ReactNode;
}

export default function BlogPageLayout({ tag, title, excerpt, time, img, children }: BlogLayoutProps) {
  const router = useRouter();

  return (
    <main className="bg-[#f5f1ed] min-h-screen text-[#28362b]">
      <Navbar />

      <div className="pt-20 bg-[#f5f1ed] min-h-screen text-[#28362b]">
        {/* Hero Section */}
        <AHero tag={tag} title={title} excerpt={excerpt} time={time} img={img} />

        {/* Content Section */}
        <div className="px-6 md:px-12 max-w-screen-xl mx-auto pb-12">
          {children}
        </div>
      </div>

      <Footer />
    </main>
  );
}
