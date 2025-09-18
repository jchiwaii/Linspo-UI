import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React from "react";

interface Logo {
  id: string;
  name: string;
  icon: string;
}

interface LogoScrollingProps {
  logos?: Logo[];
  title?: string;
  subtitle?: string;
  speed?: number;
  className?: string;
}

const defaultLogos: Logo[] = [
  { id: "react", name: "React", icon: "⚛️" },
  { id: "nextjs", name: "Next.js", icon: "▲" },
  { id: "typescript", name: "TypeScript", icon: "TS" },
  { id: "tailwind", name: "Tailwind", icon: "🎨" },
  { id: "nodejs", name: "Node.js", icon: "🟢" },
  { id: "mongodb", name: "MongoDB", icon: "🍃" },
  { id: "postgresql", name: "PostgreSQL", icon: "🐘" },
  { id: "docker", name: "Docker", icon: "🐳" },
  { id: "aws", name: "AWS", icon: "☁️" },
  { id: "vercel", name: "Vercel", icon: "🔺" },
  { id: "github", name: "GitHub", icon: "🐙" },
  { id: "figma", name: "Figma", icon: "🎯" },
];

export default function LogoScrolling({
  logos = defaultLogos,
  title = "Trusted by Industry Leaders",
  subtitle = "Powering innovation across the technology stack",
  speed = 40,
  className = "",
}: LogoScrollingProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section
      className={\`relative bg-gradient-to-br from-white via-gray-50/80 to-white py-24 overflow-hidden \${className}\`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative group">
          <div className="flex gap-8 animate-scroll group-hover:animate-pause">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={\`\${logo.id}-\${index}\`}
                className="flex-shrink-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 min-w-[140px] h-32 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-lg hover:scale-105 transition-all duration-300 group-hover:animate-none"
              >
                <span className="text-3xl mb-3 transition-transform duration-300 hover:scale-110">
                  {logo.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-gray-50/80 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-gray-50/80 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"></div>
        </div>
      </div>

      <style jsx>{\`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll \${speed}s linear infinite;
        }

        .group:hover .animate-scroll {
          animation-play-state: paused;
        }

        .group:hover .group-hover\\\\:animate-none {
          animation: none !important;
        }
      \`}</style>
    </section>
  );
}`;

  return NextResponse.json({ code });
}
