"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

const indoorImages = [
  "/indoor/bedroom01.jpg",
  "/indoor/bathroom.jpg",
  "/indoor/Kitchen.jpg",
  "/indoor/Living.jpg",
  "/indoor/Dinning  (1).jpg",
  "/indoor/Master Bedroom View 1.jpg",
  "/indoor/View-10.jpg",
  "/indoor/View-11.png",
  "/indoor/View-42.png",
  "/indoor/View-48.png",
];

const outdoorImages = [
  "/outdoor/View-01.png",
  "/outdoor/View-03.png",
  "/outdoor/View-04.png",
  "/outdoor/View-05.png",
  "/outdoor/View-06.png",
  "/outdoor/View-08.png",
  "/outdoor/View-09.png",
  "/outdoor/View-12.png",
  "/outdoor/View-14.png",
  "/outdoor/View-34.png",
  "/outdoor/View-41.png",
  "/outdoor/View-46.png",
  "/outdoor/View-47.png",
];

const clubhouseImages = [
  "/clubhouse/View-06.png",
  "/clubhouse/View-12.png",
  "/clubhouse/clubgouseimg.png",
  "/clubhouse/clubhouseimg2.png",
  "/clubhouse/Gym.jpg",
  "/clubhouse/Spa & Saloon .jpg",
  "/clubhouse/Yoga.jpg",
];

const galleryVideos = [
  { src: "/videos/video1-web.mp4", title: "Zenora Walkthrough" },
];

const tabs = ["indoor", "outdoor", "clubhouse", "videos"] as const;
type Tab = (typeof tabs)[number];

const tabInfo: Record<Tab, { label: string; title: string; desc: string }> = {
  indoor: {
    label: "Indoor",
    title: "Indoor Spaces",
    desc: "Interiors defined by proportion and light. Spaces that feel calm, considered and quietly refined.",
  },
  outdoor: {
    label: "Outdoor",
    title: "Outdoor Spaces",
    desc: "Landscapes that shape the rhythm of life at Zenora. Gardens, pathways and open courts designed for movement, pause and quiet community.",
  },
  clubhouse: {
    label: "Clubhouse",
    title: "Clubhouse",
    desc: "A space designed for connection. Zenora\u2019s clubhouse brings together refined interiors with curated areas for conversation, relaxation, and community.",
  },
  videos: {
    label: "Videos",
    title: "Video Tour",
    desc: "Experience Zenora through a cinematic walkthrough. Every detail, every space\u2014brought to life.",
  },
};

const imageMap: Record<Exclude<Tab, 'videos'>, string[]> = {
  indoor: indoorImages,
  outdoor: outdoorImages,
  clubhouse: clubhouseImages,
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<Tab>("indoor");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isVideoTab = activeTab === "videos";
  const currentImages = isVideoTab ? [] : imageMap[activeTab];
  const displayImages = isVideoTab ? [] : [...currentImages, ...currentImages];

  const activeIndex = tabs.indexOf(activeTab);

  const checkScroll = useCallback(() => {
    if (isVideoTab) return;
    const el = scrollRef.current;
    if (!el) return;
    const children = el.children;
    if (children.length > currentImages.length) {
      const firstSetWidth = (children[currentImages.length] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;
      if (el.scrollLeft >= firstSetWidth) {
        el.scrollLeft -= firstSetWidth;
      }
    }
  }, [currentImages.length, isVideoTab]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;
  }, [activeTab]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  // Auto-scroll
  useEffect(() => {
    if (isVideoTab || isHovered || lightboxIndex !== null) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    autoScrollRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const children = el.children;
      if (children.length > currentImages.length) {
        const firstSetWidth = (children[currentImages.length] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;
        if (el.scrollLeft >= firstSetWidth) {
          el.scrollLeft -= firstSetWidth;
        }
      }

      el.scrollBy({ left: 1, behavior: "auto" });
    }, 20);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [isVideoTab, isHovered, lightboxIndex, activeTab, currentImages.length]);

  // Video controls
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!video.muted ? false : true);
  }, []);

  const handleVideoMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  }, [isPlaying]);

  // Reset video state on tab change
  useEffect(() => {
    if (!isVideoTab) {
      setIsPlaying(false);
      setIsMuted(true);
      setShowControls(true);
    }
  }, [isVideoTab]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const children = el.children;
    if (children.length > currentImages.length) {
      const firstSetWidth = (children[currentImages.length] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;
      if (direction === "left" && el.scrollLeft <= 0) {
        el.scrollLeft += firstSetWidth;
      } else if (direction === "right" && el.scrollLeft >= firstSetWidth) {
        el.scrollLeft -= firstSetWidth;
      }
    }

    el.scrollBy({
      left: direction === "left" ? -el.clientWidth * 0.7 : el.clientWidth * 0.7,
      behavior: "smooth",
    });
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index % currentImages.length);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    if (direction === "prev") {
      setLightboxIndex(lightboxIndex === 0 ? currentImages.length - 1 : lightboxIndex - 1);
    } else {
      setLightboxIndex(lightboxIndex === currentImages.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, currentImages.length]);

  // Compute underline position from tab button refs
  const getUnderlineStyle = () => {
    const btn = tabRefs.current[activeIndex];
    if (!btn) return { left: 0, width: 0 };
    return {
      left: btn.offsetLeft,
      width: btn.offsetWidth,
    };
  };

  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    // Recalculate after render
    const timeout = setTimeout(() => {
      setUnderlineStyle(getUnderlineStyle());
    }, 0);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Also recalculate on mount
  useEffect(() => {
    setUnderlineStyle(getUnderlineStyle());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="gallery" className="pt-32 pb-16 px-6 md:px-20 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <p className="font-body text-[#e1b258] text-xs uppercase mb-4">Gallery</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#28362b]">
          See it to believe it.
        </h2>
      </div>

      {/* Tab Switcher with sliding indicator */}
      <div className="mb-12">
        {/* Tabs */}
        <div className="relative inline-flex w-full md:w-auto overflow-x-auto hide-scrollbar border-b border-[#ab948a]/20 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => setActiveTab(tab)}
              className={`relative font-body text-[10px] md:text-xs uppercase tracking-wider px-4 md:px-6 py-3 transition-colors duration-400 whitespace-nowrap ${activeTab === tab ? "text-[#28362b]" : "text-[#ab948a] hover:text-[#594433]"
                }`}
            >
              {tabInfo[tab].label}
            </button>
          ))}
          {/* Sliding underline indicator */}
          <span
            className="absolute bottom-0 h-[2px] bg-[#e1b258] transition-all duration-500 ease-in-out"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
          />
        </div>

        {/* Description below tabs */}
        <div className="max-w-2xl">
          <h3 className="font-display text-[clamp(1.2rem,2.5vw,1.8rem)] text-[#28362b] mb-3">
            {tabInfo[activeTab].title}
          </h3>
          <p className="font-body text-[#594433] text-base leading-relaxed">
            {tabInfo[activeTab].desc}
          </p>
        </div>
      </div>

      {/* Video Section */}
      {isVideoTab ? (
        <div className="space-y-8">
          {galleryVideos.map((video, idx) => (
            <div
              key={idx}
              className="relative w-full overflow-hidden rounded-sm bg-[#1a1a1a] group/video"
              onMouseMove={handleVideoMouseMove}
              onMouseLeave={() => {
                if (isPlaying) {
                  if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
                  controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 1200);
                }
              }}
            >
              {/* Cinematic letterbox aspect ratio */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={video.src}
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  poster=""
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => { setIsPlaying(false); setShowControls(true); }}
                />

                {/* Gradient overlay for controls visibility */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: showControls
                      ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)'
                      : 'transparent',
                    opacity: showControls ? 1 : 0,
                  }}
                />

                {/* Center play button (shown when paused) */}
                <button
                  onClick={togglePlay}
                  className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${
                    !isPlaying || showControls ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isPlaying
                        ? 'bg-[#28362b]/60 backdrop-blur-md border border-[#e1d5c9]/20'
                        : 'bg-[#e1b258]/90 hover:bg-[#e1b258] shadow-2xl'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause size={28} className="text-[#e1d5c9]" />
                    ) : (
                      <Play size={32} className="text-[#28362b] ml-1" />
                    )}
                  </div>
                </button>

                {/* Bottom controls bar */}
                <div
                  className={`absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-20 transition-all duration-500 ${
                    showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-body text-[#e1d5c9] text-sm tracking-wide">
                      {video.title}
                    </span>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="w-10 h-10 rounded-full bg-[#28362b]/50 backdrop-blur-sm border border-[#e1d5c9]/10 flex items-center justify-center text-[#e1d5c9] hover:text-[#e1b258] hover:border-[#e1b258]/30 transition-all duration-300"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Horizontal Scrolling Gallery */
        <div
          className="relative group/gallery"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-[#28362b]/80 hover:bg-[#28362b] text-[#e1d5c9] rounded-full transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 -translate-x-1/2 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-[#28362b]/80 hover:bg-[#28362b] text-[#e1d5c9] rounded-full transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 translate-x-1/2 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar"
          >
            {displayImages.map((src, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="relative flex-shrink-0 w-[350px] md:w-[450px] aspect-[4/3] overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={src}
                  alt={`${activeTab} view ${(i % currentImages.length) + 1}`}
                  fill
                  sizes="(max-width: 768px) 350px, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && !isVideoTab && (
        <div
          className="fixed inset-0 z-50 bg-[#28362b]/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-[#e1d5c9] hover:text-[#e1b258] transition-colors z-50"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-[#28362b]/60 hover:bg-[#e1b258]/20 text-[#e1d5c9] hover:text-[#e1b258] rounded-full transition-all duration-300 border border-[#e1d5c9]/20 hover:border-[#e1b258]/40"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center bg-[#28362b]/60 hover:bg-[#e1b258]/20 text-[#e1d5c9] hover:text-[#e1b258] rounded-full transition-all duration-300 border border-[#e1d5c9]/20 hover:border-[#e1b258]/40"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          <div
            className="relative w-full max-w-5xl h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImages[lightboxIndex]}
              alt={`${activeTab} view ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="font-body text-[#ab948a] text-xs">
              {lightboxIndex + 1} / {currentImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
