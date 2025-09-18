import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  badgeText?: string;
  className?: string;
}

export default function Hero({
  title = "Elevated Excellence in Digital Innovation",
  subtitle = "Experience uncompromising quality through our meticulously crafted platform. Designed for discerning professionals who demand perfection.",
  primaryCTA = {
    text: "Begin Experience",
    href: "#",
  },
  secondaryCTA = {
    text: "Discover More",
    href: "#",
  },
  badgeText = "Premium Release",
  className = "",
}: HeroProps) {
  return (
    <section
      className={\`relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 \${className}\`}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      {/* Minimal Accent Elements */}
      <div className="absolute top-1/3 left-1/4 w-[1px] h-32 bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[1px] h-24 bg-gradient-to-t from-transparent via-zinc-600/20 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-32 md:py-40 flex flex-col items-center text-center min-h-screen justify-center">
        {/* Refined Badge */}
        {badgeText && (
          <div className="inline-flex items-center space-x-3 px-5 py-2 mb-12 border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm rounded-full">
            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></div>
            <span className="text-zinc-300 text-sm font-light tracking-wide uppercase">
              {badgeText}
            </span>
          </div>
        )}

        {/* Sophisticated Typography */}
        <h1 className="mb-10 text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[-0.02em] leading-[0.9]">
          <span className="block text-white">
            {title.split(" ").slice(0, 2).join(" ")}
          </span>
          <span className="block text-zinc-400 mt-2">
            {title.split(" ").slice(2).join(" ")}
          </span>
        </h1>

        {/* Refined Subtitle */}
        <p className="mb-16 text-lg text-zinc-500 max-w-2xl mx-auto leading-[1.7] font-light">
          {subtitle}
        </p>

        {/* Elegant CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={primaryCTA.href}
            className="group inline-flex items-center space-x-3 px-8 py-4 bg-white text-black text-sm font-medium tracking-wide hover:bg-zinc-100 transition-colors duration-200"
          >
            <span>{primaryCTA.text}</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>

          {secondaryCTA && (
            <a
              href={secondaryCTA.href}
              className="inline-flex items-center space-x-3 px-8 py-4 border border-zinc-700/50 text-zinc-300 text-sm font-medium tracking-wide hover:border-zinc-600 hover:text-zinc-200 transition-all duration-200"
            >
              <span>{secondaryCTA.text}</span>
            </a>
          )}
        </div>

        {/* Subtle Status Indicator */}
        <div className="mt-20 flex items-center space-x-8 text-xs text-zinc-600 uppercase tracking-widest">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
            <span>Available Worldwide</span>
          </div>
          <div className="w-[1px] h-3 bg-zinc-800"></div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
            <span>Enterprise Ready</span>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent"></div>
    </section>
  );
}`;

  return NextResponse.json({ code });
}
