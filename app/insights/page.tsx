import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import InsightsClient from "./InsightsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Read Zenora Villas insights on luxury villas in Coimbatore, real estate investment, home design, lifestyle trends and premium villa living.",
  alternates: {
    canonical: "https://www.zenoravillas.in/insights",
  },
  openGraph: {
    title: "Insights | Zenora Villas",
    description:
      "Read Zenora Villas insights on luxury villas in Coimbatore, real estate investment, home design, lifestyle trends and premium villa living.",
    url: "https://www.zenoravillas.in/insights",
  },
  twitter: {
    title: "Insights | Zenora Villas",
    description:
      "Read Zenora Villas insights on luxury villas in Coimbatore, real estate investment, home design, lifestyle trends and premium villa living.",
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
