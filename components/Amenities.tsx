"use client";

const amenities = [
  {
    name: "Meditation Centre",
    desc: "A quiet sanctuary within Zenora. Designed for reflection, stillness, and moments away from the rhythm of the day.",
    img: "/img/amenities/meditation-centre.jpg",
  },
  {
    name: "Business Lounge",
    desc: "A sophisticated space for residents balancing work and leisure. Quiet, private, and equipped for professional needs.",
    img: "/img/amenities/business-lounge.jpg",
  },
  {
    name: "Gala Room",
    desc: "A grand setting for special occasions and events. Perfectly designed for celebrations, gatherings, and memorable moments.  ",
    img: "/img/amenities/gala-room.jpg",
  },
  {
    name: "Clubhouse",
    desc: "A shared address within Zenora. A place where conversations, quiet gatherings, and community moments naturally unfold.",
    img: "/img/amenities/clubhouse.jpg",
  },
  {
    name: "Swimming Pool",
    desc: "A calm water retreat within the landscape. Meant for slow laps, quiet afternoons, and a refreshing pause.",
    img: "/img/amenities/swimming-pool.jpg",
  },
  {
    name: "Multi Sport Court",
    desc: "A versatile court where recreation finds its place. From quick games to longer evenings of sport.",
    img: "/img/amenities/multi-sport-court.jpg",
  },
  {
    name: "Children's Play Garden",
    desc: "A lively corner of the community. Designed for exploration, imagination, and carefree play.",
    img: "/img/amenities/childrens-play-garden.jpg",
  },
  {
    name: "Community Lounge",
    desc: "An informal setting for conversation and connection. A place where neighbours meet beyond the everyday.",
    img: "/img/amenities/Community Lounge.jpg",
  },
  {
    name: "Cricket Turf",
    desc: "For the familiar rhythm of the game. Evenings often gather here around friendly matches and spirited play.",
    img: "/img/amenities/cricket.jpg",
  },
  {
    name: "Private Theatre",
    desc: "Cinema-grade entertainment in the comfort of your community. Because evenings should be extraordinary.",
    img: "/img/amenities/private-theatre.jpg",
  },
  {
    name: "Walking Paths",
    desc: "Pathways that move gently through Zenora. Designed for morning walks, evening conversations, and unhurried movement.",
    img: "/img/amenities/walking-paths.jpg",
  }
  ,{
    name: "Garden Cafe",
    desc: "A serene cafe nestled within lush gardens, offering a perfect spot to enjoy freshly brewed coffee or light bites amidst nature's tranquility.",
    img: "/img/amenities/garden-cafe.jpg",
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-32 bg-white">
      <div className="px-6 md:px-20 max-w-screen-xl mx-auto">
        <div className="mb-20">
          <p className="font-body text-[#e1b258] text-xs uppercase mb-4">Lifestyle</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-[#28362b] max-w-lg">Spaces that shape how you live.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#ab948a]/10">
          {amenities.map((a) => (
            <div key={a.name} className="group relative overflow-hidden bg-[#f5f1ed]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-xl text-[#28362b] mb-3">{a.name}</h3>
                <p className="font-body text-[#594433] text-sm leading-relaxed">{a.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-[#e1b258] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
