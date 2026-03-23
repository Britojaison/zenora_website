"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Zenora Coordinates (Goldwins / Veeriampalayam, Coimbatore) ─── */
const ZENORA_LAT = 11.0653565;
const ZENORA_LNG = 77.0486669;
const DEFAULT_ZOOM = 15;
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/TkfFQf8inTppufUH8";

/* ─── Google Maps Tile URL (Best for India labels) ─── */
const TILE_URL = "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const leafletRef = useRef<any>(null);

  /* ─── Toggle theme ─── */
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;
      leafletRef.current = L;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: [ZENORA_LAT, ZENORA_LNG],
        zoom: DEFAULT_ZOOM,
        scrollWheelZoom: true,
        zoomControl: false,
        attributionControl: false,
        maxZoom: 22,
      });

      tileLayerRef.current = L.tileLayer(TILE_URL, {
        maxZoom: 22,
        maxNativeZoom: 20, // Google maps goes deep
        attribution: '&copy; Google Maps',
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      /* ── Custom gold marker ── */
      const goldIcon = L.divIcon({
        html: `
          <div style="position:relative;display:flex;align-items:center;justify-content:center;">
            <div style="
              width:42px;height:42px;
              background:radial-gradient(circle,#e1b258 0%,#c99a3e 100%);
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              box-shadow:0 4px 20px rgba(225,178,88,0.45);
              display:flex;align-items:center;justify-content:center;
            ">
              <span style="
                transform:rotate(45deg);
                color:#28362b;
                font-weight:700;
                font-size:16px;
                line-height:1;
              ">Z</span>
            </div>
            <div style="
              position:absolute;
              top:50%;left:50%;
              width:64px;height:64px;
              margin-left:-32px;margin-top:-32px;
              border-radius:50%;
              border:2px solid rgba(225,178,88,0.35);
              animation:mapPulse 2s ease-out infinite;
              pointer-events:none;
            "></div>
          </div>
        `,
        className: "zenora-marker",
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -42],
      });

      const marker = L.marker([ZENORA_LAT, ZENORA_LNG], {
        icon: goldIcon,
      }).addTo(map);

      marker.bindPopup(
        `<div style="
          font-family:'BW Diagrid',sans-serif;
          text-align:center;
          padding:6px 4px;
          min-width:180px;
        ">
          <p style="
            font-family:'Blacker Display',Georgia,serif;
            font-weight:300;
            font-style:italic;
            font-size:20px;
            color:#28362b;
            margin:0 0 4px;
          ">Zenora</p>
          <p style="
            font-size:11px;
            text-transform:uppercase;
            color:#594433;
            margin:0 0 4px;
            letter-spacing:1px;
          ">Goldwins, Coimbatore</p>
          <p style="
            font-size:10px;
            color:#ab948a;
            margin:0 0 8px;
          ">Tamil Nadu, India</p>
          <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" style="
            display:inline-flex;
            align-items:center;
            gap:5px;
            font-size:10px;
            text-transform:uppercase;
            color:#e1b258;
            text-decoration:none;
            border:1px solid rgba(225,178,88,0.4);
            padding:5px 12px;
            transition:all 0.3s;
          "
          onmouseover="this.style.background='#e1b258';this.style.color='#28362b'"
          onmouseout="this.style.background='transparent';this.style.color='#e1b258'"
          >Open in Google Maps ↗</a>
        </div>`,
        { className: "zenora-popup" }
      );


      mapInstanceRef.current = map;
      setIsLoaded(true);
      setTimeout(() => map.invalidateSize(), 200);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section id="map-section" className="relative pt-6 pb-20 overflow-hidden">
      {/* ─── Background texture ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #f5f1ed 0%, #ece6df 40%, #e8e0d7 100%)",
        }}
      />

      <div className="relative z-10 px-6 md:px-20 max-w-screen-xl mx-auto">
        {/* ─── Header ─── */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#28362b] mb-4">
            Find us in Coimbatore
          </h2>
          <p className="font-body text-[#594433] text-base leading-[1.9] max-w-2xl">
            Nestled in the serene locality of Goldwins, Zenora offers an
            unmatched address in Coimbatore, connected to the city, yet a world apart.
          </p>
        </div>

        {/* ─── Map Container ─── */}
        <div className="relative group">
          {/* Decorative border frame */}
          <div
            className="absolute -inset-[1px] pointer-events-none z-20"
            style={{ border: "1px solid rgba(225,178,88,0.25)" }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#e1b258]/50 z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#e1b258]/50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#e1b258]/50 z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#e1b258]/50 z-20 pointer-events-none" />

          {/* ─── Theme Toggle (top‑right) ─── */}
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 z-30 flex items-center gap-2 backdrop-blur-md px-3.5 py-2 transition-all duration-500 hover:scale-105"
            style={{
              background: isDark ? "rgba(40,54,43,0.85)" : "rgba(245,241,237,0.9)",
              border: "1px solid rgba(225,178,88,0.3)",
            }}
            title={isDark ? "Switch to light map" : "Switch to dark map"}
          >
            {isDark ? (
              <svg className="w-3.5 h-3.5 text-[#e1b258]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-[#594433]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
            <span
              className="font-body text-[9px] uppercase"
              style={{ color: isDark ? "#e1b258" : "#594433" }}
            >
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          {/* Map Wrapper (Handles theme classes so React doesn't wipe Leaflet nodes) */}
          <div
            className={`w-full relative z-10 cursor-pointer${isDark ? " map-dark" : ""}`}
            style={{
              height: "520px",
              background: isDark ? "#1a1a2e" : "#f5f1ed",
              transition: "background 0.5s ease",
            }}
          >
            <div ref={mapRef} style={{ width: "100%", height: "100%", background: "transparent" }} />
          </div>

          {/* Loading skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#1a1a2e]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-[#e1b258]/30 border-t-[#e1b258] rounded-full animate-spin" />
                <p className="font-body text-[#ab948a] text-xs uppercase">
                  Loading map...
                </p>
              </div>
            </div>
          )}

          {/* ─── Floating Info Card (bottom‑left) ─── */}
          <div
            className="absolute bottom-6 left-6 z-20 backdrop-blur-md px-6 py-5 max-w-xs"
            style={{
              background: "rgba(40,54,43,0.88)",
              border: "1px solid rgba(225,178,88,0.2)",
            }}
          >
            <p
              className="font-display text-xl text-white mb-1"
              style={{ fontWeight: 300, fontStyle: "italic" }}
            >
              Zenora
            </p>
            <p className="font-body text-[#e1d5c9] text-xs uppercase mb-3">
              Goldwins, Coimbatore
            </p>
            <div className="w-8 h-px bg-[#e1b258]/40 mb-3" />
            <p className="font-body text-[#ab948a] text-[11px] leading-relaxed mb-4">
              Premium villa community crafted for those who aspire to elevated
              living in the heart of Tamil Nadu.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-[10px] uppercase text-[#e1b258] hover:text-white transition-colors duration-300"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                View on Google Maps
              </a>

              <a
                href="https://zenvistas.spimproject.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-[10px] uppercase text-[#e1b258] hover:text-white transition-colors duration-300"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Explore in Webverse
              </a>
            </div>
          </div>
        </div>

        {/* ─── Bottom row: Removed ─── */}
      </div>

      {/* ─── Injected styles ─── */}
      <style jsx global>{`
        @keyframes mapPulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .zenora-marker {
          background: transparent !important;
          border: none !important;
        }
        .zenora-popup .leaflet-popup-content-wrapper {
          background: #f5f1ed;
          border-radius: 2px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(225, 178, 88, 0.2);
        }
        .zenora-popup .leaflet-popup-tip {
          background: #f5f1ed;
        }
        .leaflet-bar {
          border: 1px solid rgba(225, 178, 88, 0.3) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
        }
        .leaflet-bar a {
          background: rgba(40, 54, 43, 0.9) !important;
          color: #e1b258 !important;
          border-bottom: 1px solid rgba(225, 178, 88, 0.15) !important;
          backdrop-filter: blur(8px);
        }
        .leaflet-bar a:hover {
          background: rgba(40, 54, 43, 1) !important;
          color: #fff !important;
        }
        .leaflet-control-attribution {
          display: none !important;
        }
        /* ─── Dark mode: invert OSM tiles ─── */
        .map-dark .leaflet-tile-pane {
          filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
          transition: filter 0.5s ease;
        }
        /* Keep marker + popup un-inverted */
        .map-dark .leaflet-marker-pane,
        .map-dark .leaflet-popup-pane,
        .map-dark .leaflet-overlay-pane {
          filter: none !important;
        }
      `}</style>
    </section>
  );
}
