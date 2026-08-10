interface LogoProps {
    className?: string;
    variant?: "header" | "full" | "icon-only" | "stacked";
    showSubtitle?: boolean;
}

export function Logo({ className = "h-12 w-auto", variant = "header", showSubtitle = true }: LogoProps) {
    if (variant === "icon-only") {
        return (
            <svg
                className={`${className} transition-transform duration-300 hover:scale-105`}
                viewBox="0 0 100 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* CW LIFE Hexagon Icon */}
                <path d="M 46,8 L 16,26 L 16,74 L 46,92 L 46,78 L 30,68 L 30,32 L 46,22 Z" />
                <path d="M 54,8 L 84,26 L 84,74 L 54,92 L 54,78 L 70,68 L 70,32 L 54,22 Z" />
            </svg>
        );
    }

    if (variant === "stacked" || variant === "full") {
        return (
            <div className={`flex flex-col items-center justify-center text-center ${className}`}>
                {/* Hexagon Mark */}
                <svg
                    className="h-16 w-16 text-white mb-2 filter drop-shadow-[0_4px_12px_rgba(255,255,255,0.2)]"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M 46,8 L 16,26 L 16,74 L 46,92 L 46,78 L 30,68 L 30,32 L 46,22 Z" />
                    <path d="M 54,8 L 84,26 L 84,74 L 54,92 L 54,78 L 70,68 L 70,32 L 54,22 Z" />
                </svg>

                {/* CW LIFE text */}
                <div className="font-black text-3xl sm:text-4xl tracking-tighter text-white uppercase italic drop-shadow-md leading-none">
                    CW LIFE
                </div>

                {/* by Cristian Wosniak signature */}
                {showSubtitle && (
                    <div 
                        className="text-lg sm:text-xl text-gray-200 mt-1 select-none font-normal tracking-wide"
                        style={{ fontFamily: "'Alex Brush', 'Caveat', 'Great Vibes', cursive" }}
                    >
                        by Cristian Wosniak
                    </div>
                )}
            </div>
        );
    }

    // Default: Header version (Icon + CW LIFE text + signature)
    return (
        <div className={`inline-flex items-center gap-3.5 group ${className}`}>
            <svg
                className="h-9 sm:h-10 w-auto text-white transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)] flex-shrink-0"
                viewBox="0 0 100 100"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M 46,8 L 16,26 L 16,74 L 46,92 L 46,78 L 30,68 L 30,32 L 46,22 Z" />
                <path d="M 54,8 L 84,26 L 84,74 L 54,92 L 54,78 L 70,68 L 70,32 L 54,22 Z" />
            </svg>

            <div className="flex flex-col leading-none">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-white uppercase italic drop-shadow-sm">
                    CW LIFE
                </span>
                {showSubtitle && (
                    <span 
                        className="text-sm sm:text-base text-gray-300 font-normal tracking-normal -mt-0.5"
                        style={{ fontFamily: "'Alex Brush', 'Caveat', 'Great Vibes', cursive" }}
                    >
                        by Cristian Wosniak
                    </span>
                )}
            </div>
        </div>
    );
}
