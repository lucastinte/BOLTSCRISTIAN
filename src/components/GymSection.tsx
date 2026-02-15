import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import btLogo from "../assets/bt-logo.png";

interface GymSectionProps {
  showLogo?: boolean;
}

export function GymSection({ showLogo = false }: GymSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const gymImagesGlob = import.meta.glob<string>("../assets/gym/*.{jpeg,jpg,png,webp}", {
    eager: true,
    import: "default",
    query: "?url",
  });

  const featuredNames = ["1.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", "17.jpeg", "18.jpeg"];

  const sortedImages = Object.entries(gymImagesGlob)
    .sort(([pathA], [pathB]) => {
      const nameA = pathA.split('/').pop() || "";
      const nameB = pathB.split('/').pop() || "";

      const indexA = featuredNames.indexOf(nameA);
      const indexB = featuredNames.indexOf(nameB);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return nameA.localeCompare(nameB);
    })
    .map(([_, url]) => url);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1));
  }, [sortedImages.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  if (sortedImages.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {showLogo && (
          <div className="flex justify-center mb-10 animate-fade-in">
            <img
              src={btLogo}
              alt="Black Training Logo"
              className="w-40 md:w-56 h-auto drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            />
          </div>
        )}

        <div className="text-center mb-10">
          <Link to="/black-training" className="inline-block group cursor-pointer">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 transition-transform duration-300 group-hover:scale-105">
              Este es nuestro <span className="text-yellow-500 text-glow-yellow">Gimnasio</span>
            </h2>
            <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-medium">Equipamiento Premium & Resultados Reales</p>
          </Link>
        </div>

        <div
          className="relative group h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 box-glow-yellow"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sortedImages.map((src, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={src}
                  alt={`Gimnasio slide ${idx + 1}`}
                  className="w-full h-full object-cover brightness-[0.6] contrast-[1.15] transition-all duration-700"
                  draggable={false}
                />
                {/* Subtle Overlay to make it feel premium */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                {/* Image Label for the first few (featured) */}
                {idx < featuredNames.length && (
                  <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold text-yellow-500 uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Vista Reciente
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {sortedImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx
                  ? "w-8 bg-yellow-500"
                  : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Second Level Images (Thumbnails) */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {sortedImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-32 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentIndex === idx
                ? "border-yellow-500 scale-105"
                : "border-transparent opacity-30 hover:opacity-100"
                }`}
            >
              <img src={src} className="w-full h-full object-cover brightness-[0.6] hover:brightness-100 transition-all duration-300" alt={`Thumb ${idx}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
