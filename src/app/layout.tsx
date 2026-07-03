import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenvistas | Curated Luxury Real Estate",
  description: "Creating landmark residential communities across Coimbatore and South India. Deep industrial roots, transparent dealings, and premium execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <GoogleTagManager gtmId="GTM-PLWW569J" />
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PLWW569J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main style={{ flex: '1 0 auto' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
