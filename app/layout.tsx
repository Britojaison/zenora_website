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
  metadataBase: new URL("https://www.zenvistas.co.in"),
  title: "Zenora · Crafted for the Chosen",
  description:
    "An affordable luxury villa community in Goldwins, Coimbatore. Sky Garden, Aqua Lounge, Star Deck — elevation without compromise.",
  openGraph: {
    title: "Zenora by ZenVistas",
    description: "Rise to elevated living.",
    url: "https://www.zenvistas.co.in",
    siteName: "Zenora",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenora · Crafted for the Chosen",
    description:
      "An affordable luxury villa community in Goldwins, Coimbatore. Sky Garden, Aqua Lounge, Star Deck — elevation without compromise.",
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

