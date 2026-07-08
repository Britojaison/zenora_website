"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const neighbourhoodData = {
  Travel: [
    { place: "Coimbatore International Airport", dist: "5.2 km (13 mins)" },
    { place: "Peelamedu Railway Station", dist: "10.8 km (24 mins)" },
    { place: "Coimbatore Central Railway Station", dist: "14.4 km (23 mins)" },
    { place: "Kaniyur Toll Gate", dist: "11.4 km (21 mins)" },
    { place: "Singanallur Bus Stand", dist: "10.4 km (24 mins)" },
    { place: "Gandhipuram Bus Stand", dist: "13.8 km (26 mins)" },
  ],
  Education: [
    { place: "KMCH Medical College", dist: "5.1 km (13 mins)" },
    { place: "Coimbatore Institute of Technology", dist: "6.0 km (13 mins)" },
    { place: "Dr.G.R.Damodaran College of Science", dist: "6.1 km (14 mins)" },
    { place: "Pallikoodam Rak", dist: "7.8 km (17 mins)" },
    { place: "GRD Public School", dist: "6.2 km (14 mins)" },
    { place: "PSG College of Arts and Science", dist: "6.3 km (13 mins)" },
    { place: "NGP Institution of Arts and Science", dist: "2.0 km (6 mins)" },
    { place: "Chandrakanti Public School", dist: "4.3 km (12 mins)" },
    { place: "Suguna PIP School", dist: "3.3 km (9 mins)" },
    { place: "Sri Vivekananda Matric", dist: "2.4 km (6 mins)" },
    { place: "CBSE School (Reeds)", dist: "1.3 km (3 mins)" },
  ],
  Hospitals: [
    { place: "KMCH Medical", dist: "3.7 km (9 mins)" },
    { place: "Lotus Eye Care", dist: "5.4 km (14 mins)" },
    { place: "Yazhini Hospital", dist: "5.2 km (12 mins)" },
    { place: "Aravind Eye Hospital", dist: "6.8 km (15 mins)" },
    { place: "Venkateshwara Hospital", dist: "5.6 km (11 mins)" },
    { place: "Royal Care Super Speciality Hospital", dist: "12.6 km (31 mins)" },
  ],
  Work: [
    { place: "Tidel Park", dist: "9.4 km (22 mins)" },
    { place: "Cognizant", dist: "12.4 km (31 mins)" },
    { place: "Bosch Global Software", dist: "12.2 km (31 mins)" },
    { place: "KGISL Campus", dist: "8.9 km (23 mins)" },
  ],
  Shopping: [
    { place: "Funmall", dist: "8.2 km (17 mins)" },
    { place: "Prozone Mall", dist: "9.7 km (24 mins)" },
    { place: "Broadway Cinemas", dist: "3.8 km (9 mins)" },
    { place: "DMart Singanallur", dist: "9.0 km (21 mins)" },
    { place: "DMart Chinniyampalayam", dist: "4.8 km (9 mins)" },
    { place: "The Grocer Central", dist: "3.5 km (7 mins)" },
  ],
};

type Category = keyof typeof neighbourhoodData;
const categories = Object.keys(neighbourhoodData) as Category[];

export default function Location() {
  const [activeCategory, setActiveCategory] = useState<Category>("Travel");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const idx = categories.indexOf(activeCategory);
    const btn = tabRefs.current[idx];
    if (btn) {
      setUnderline({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [activeCategory]);

  return (
    <section id="location" className="pt-16 pb-32">
      <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-body text-[#e1b258] text-xs uppercase mb-4">Location</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#28362b] mb-8">Know your<br />neighbourhood</h2>
            <p className="font-body text-[#594433] text-base leading-[1.9] mb-10">
              Goldwins offers calm neighbourhood living with direct access to essentials.
              Steady development, strong residential demand, and the quiet confidence of
              a location that has already arrived.
            </p>

            {/* Tabs */}
            <div className="relative flex w-full border-b border-[#ab948a]/20 mb-8">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex-1 font-body text-[10px] sm:text-xs uppercase py-3 transition-colors duration-400 text-center whitespace-nowrap ${activeCategory === cat ? "text-[#28362b]" : "text-[#ab948a] hover:text-[#594433]"
                    }`}
                  style={{ fontFamily: "'BW Diagrid', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
              {/* Sliding underline indicator */}
              <span
                className="absolute bottom-0 h-[2px] bg-[#e1b258] transition-all duration-500 ease-in-out"
                style={{
                  left: `${underline.left}px`,
                  width: `${underline.width}px`,
                }}
              />
            </div>

            <div className="flex flex-col gap-0 max-h-[360px] overflow-y-auto sm:pr-4">
              {neighbourhoodData[activeCategory].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-[#ab948a]/20">
                  <span className="font-body text-[#594433] text-base" style={{ fontFamily: "'BW Diagrid', sans-serif" }}>{p.place}</span>
                  <span className="font-body text-[#e1b258] text-xs text-right ml-4 shrink-0" style={{ fontFamily: "'BW Diagrid', sans-serif" }}>{p.dist}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/img/street-view.jpg"
              alt="Goldwins, Coimbatore"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#28362b]/60 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="font-display text-2xl text-white">Goldwins</p>
              <p className="font-body text-[#e1d5c9] text-xs uppercase mt-1">Coimbatore, Tamil Nadu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
