import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Clarity from "../components/Clarity";
import MetaPixel from "../components/MetaPixel";
import WhatsAppButton from "../components/WhatsAppButton";
import CallButton from "../components/CallButton";
import CookieBanner from "../components/CookieBanner";
import { GoogleTagManager } from '@next/third-parties/google';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zenoravillas.in"),
  title: {
    default: "Zenora Villas · Luxury Villas in Coimbatore | Crafted for the Chosen",
    template: "%s | Zenora Villas",
  },
  description:
    "Zenora Villas — An affordable luxury villa community in Goldwins, Coimbatore. 60 exclusive villas with Sky Garden, Aqua Lounge, Star Deck, Private Theatre & more. Starting from 5.5 cents.",
  keywords: [
    "Zenora Villas",
    "Zenora",
    "luxury villas Coimbatore",
    "villas in Goldwins Coimbatore",
    "affordable luxury villas",
    "ZenVistas",
    "premium villas Coimbatore",
    "gated community Coimbatore",
    "villa projects in Coimbatore",
    "Goldwins villas",
  ],
  alternates: {
    canonical: "https://www.zenoravillas.in",
  },
  openGraph: {
    title: "Zenora Villas — Luxury Villa Community in Coimbatore",
    description:
      "An exclusive community of 60 luxury villas in Goldwins, Coimbatore. Sky Garden, Aqua Lounge, Star Deck — elevation without compromise.",
    url: "https://www.zenoravillas.in",
    siteName: "Zenora Villas",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/img/aerial-view-club-hosue.jpg",
        width: 1200,
        height: 630,
        alt: "Zenora Villas — Luxury Villa Community in Goldwins, Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenora Villas · Luxury Villas in Coimbatore",
    description:
      "An affordable luxury villa community in Goldwins, Coimbatore. Sky Garden, Aqua Lounge, Star Deck — elevation without compromise.",
    images: ["/img/aerial-view-club-hosue.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "T6IyrQzCmAV1Qkz2kVz5gkhIPsObZw6tE_MOLVAeD3s",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const consent = cookieStore.get("cookie_consent")?.value;
  const isAccepted = consent === "accepted";

  return (
    <html lang="en">
      {isAccepted && <GoogleTagManager gtmId="GTM-5FNDNF5D" />}
      <head>
        <meta name="google-site-verification" content="O8T6ZrpCr0t3UMgXa6EqKRKKS4tzh3RBagwngU3UN7s" />
        {isAccepted && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=AW-17832990826"
              strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive" dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-17832990826');
              `
            }} />
          </>
        )}
        <link
          rel="preload"
          href="https://qgulurniv017kjjt.public.blob.vercel-storage.com/zenora_main_video.mp4"
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/fonts/blacker-display-webfont/Blacker-Display-Light-Italic-trial.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/blacker-display-webfont/Blacker-Display-Regular-trial.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/bw-diagrid/BwDiagrid-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        {isAccepted && (
          <>
            <Clarity />
            <MetaPixel />
          </>
        )}
        <Script 
          src="//forms.cdn.sell.do/t/665d85d70d1851dc7c28dd6a.js" 
          strategy="beforeInteractive" 
        />
        {children}
        <WhatsAppButton />
        <CallButton />
        <CookieBanner />
      </body>
    </html>
  );
}

