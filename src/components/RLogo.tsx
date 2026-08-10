interface RLogoProps {
    className?: string;
    variant?: "inline" | "stacked" | "badge" | "card";
    showSubtitle?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
}

export function RLogo({ className = "", variant = "stacked", showSubtitle = true, size = "md" }: RLogoProps) {
    const sizeClasses = {
        sm: "h-8 text-sm",
        md: "h-14 text-base",
        lg: "h-20 text-xl",
        xl: "h-28 text-2xl"
    };

    if (variant === "card" || variant === "badge") {
        return (
            <div className={`relative bg-black border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden group hover:border-white/50 transition-all ${className}`}>
                {/* Background ambient glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* R Registered Logo Vector */}
                <div className="relative flex items-start justify-center">
                    <svg
                        className="h-16 w-auto text-white filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.3)]"
                        viewBox="0 0 100 110"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Slanted Bold Cut R */}
                        {/* Left Stem Top */}
                        <polygon points="28,10 44,10 34,55 18,55" />
                        {/* Left Stem Bottom */}
                        <polygon points="16,62 32,62 24,105 8,105" />
                        {/* Right Loop & Leg */}
                        <path d="M 44,10 L 75,10 C 92,10 100,22 96,38 C 92,54 78,62 62,62 L 34,62 L 44,10 Z M 52,24 L 46,50 L 62,50 C 72,50 80,44 82,35 C 84,27 79,24 70,24 Z" />
                        <polygon points="56,62 72,62 96,105 76,105" />
                        {/* Registered Trademark Symbol (R) */}
                        <circle cx="94" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <text x="94" y="17.5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor">R</text>
                    </svg>
                </div>

                {/* Subtitle / Signature */}
                {showSubtitle && (
                    <div
                        className="text-lg sm:text-xl text-gray-200 mt-2 tracking-wide font-normal select-none"
                        style={{ fontFamily: "'Alex Brush', 'Caveat', 'Great Vibes', cursive" }}
                    >
                        by Cristian Wosniak
                    </div>
                )}
            </div>
        );
    }

    // Default stacked or inline logo
    return (
        <div className={`flex flex-col items-center justify-center text-center ${className}`}>
            <div className="relative inline-flex items-start">
                <svg
                    className={`${sizeClasses[size].split(' ')[0]} w-auto text-white filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]`}
                    viewBox="0 0 100 110"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Left Stem Top */}
                    <polygon points="28,10 44,10 34,55 18,55" />
                    {/* Left Stem Bottom */}
                    <polygon points="16,62 32,62 24,105 8,105" />
                    {/* Right Loop & Leg */}
                    <path d="M 44,10 L 75,10 C 92,10 100,22 96,38 C 92,54 78,62 62,62 L 34,62 L 44,10 Z M 52,24 L 46,50 L 62,50 C 72,50 80,44 82,35 C 84,27 79,24 70,24 Z" />
                    <polygon points="56,62 72,62 96,105 76,105" />
                    {/* Registered Trademark Symbol (R) */}
                    <circle cx="94" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <text x="94" y="17.5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="currentColor">R</text>
                </svg>
            </div>

            {showSubtitle && (
                <div
                    className="text-lg sm:text-xl text-gray-200 mt-1 tracking-wide font-normal select-none"
                    style={{ fontFamily: "'Alex Brush', 'Caveat', 'Great Vibes', cursive" }}
                >
                    by Cristian Wosniak
                </div>
            )}
        </div>
    );
}
