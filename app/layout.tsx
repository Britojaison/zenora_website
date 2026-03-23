import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenora · Crafted for the Chosen",
  description:
    "An affordable luxury villa community in Goldwins, Coimbatore. Sky Garden, Aqua Lounge, Star Deck — elevation without compromise.",
  openGraph: {
    title: "Zenora by ZenVistas",
    description: "This is not escape. This is elevation.",
    siteName: "Zenora",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
      <body>{children}</body>
    </html>
  );
}
