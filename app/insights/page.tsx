import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InsightsClient from "./InsightsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Research, guides, and market perspective on luxury villas and real estate in Coimbatore.",
  alternates: {
    canonical: "https://www.zenoravillas.in/insights",
  },
};

export default function InsightsPage() {
  return (
    <main className="bg-[#f5f1ed] min-h-screen">
      <Navbar />
      <InsightsClient />
      <Footer />
    </main>
  );
}
