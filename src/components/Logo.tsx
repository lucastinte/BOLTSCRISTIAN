import React from "react";

interface LogoProps {
    className?: string;
}

export function Logo({ className = "h-10 w-auto" }: LogoProps) {
    return (
        <svg
            className={`${className} transition-colors`}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4.5 17L11 20.5V14.5L7.5 12.5L11 10.5V4.5L4.5 8V17Z" />
            <path d="M19.5 17V8L13 4.5V10.5L16.5 12.5L13 14.5V20.5L19.5 17Z" />
        </svg>
    );
}
