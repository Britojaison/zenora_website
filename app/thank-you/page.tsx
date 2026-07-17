import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You | Zenora Villas · Luxury Villas in Coimbatore",
  description: "Thank you for expressing interest in Zenora. Our concierge team will connect with you shortly to assist with floor plans, pricing, and private site visits.",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
