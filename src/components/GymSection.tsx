import type { CSSProperties } from "react";

export function GymSection() {
  const gymImages = Object.values(
    import.meta.glob<string>("../assets/gym/*.{jpeg,jpg,png,webp}", {
      eager: true,
      import: "default",
      query: "?url",
    })
  );
  const gymTrack = [...gymImages, ...gymImages];

  if (gymImages.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nuestro <span className="text-yellow-500">Gimnasio</span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-yellow-500/10 bg-gradient-to-r from-black via-black to-black">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none" />

          <div
            className="flex gap-4"
            style={
              {
                width: "200%",
                animation: "gym-scroll 38s linear infinite",
              } as CSSProperties
            }
          >
            {gymTrack.map((src, idx) => (
              <div
                key={idx}
                className="w-60 h-72 flex-shrink-0 overflow-hidden rounded-2xl border border-yellow-500/15 bg-black/40 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={src}
                  alt={`Gimnasio ${idx + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
