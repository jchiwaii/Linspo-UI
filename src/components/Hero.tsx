"use client";

import React from "react";
import { ArrowRight, BarChart3 } from "lucide-react";

interface DataDashboardHeroProps {
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

export default function DataDashboardHero({
  subtitle = "Create stunning, interactive charts and dashboards with our modern React components. Built for data wizards who care about design too.",
  primaryCTA = {
    text: "Browse Components",
    href: "/components",
  },
  secondaryCTA = {
    text: "View Documentation",
    href: "#docs",
  },
  badgeText = "Linspo UI v1.0",
  className = "",
}: DataDashboardHeroProps) {
  // Centered hero over a subtle, dimmed rotating globe background

  return (
    <section
      className={`bg-black text-white min-h-screen relative ${className}`}
    >
      {/* Subtle background grid from components page */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      {/* Content wrapper to sit on top of the background */}
      <div className="relative">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
              {/* Badge */}
              {badgeText && (
                <div className="inline-flex items-center space-x-3 px-4 py-2 mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm font-medium">
                    {badgeText}
                  </span>
                </div>
              )}

              {/* Main heading */}
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
                <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  Beautiful Data Visualization
                </span>
                <br />
                <span className="bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent font-light">
                  Made Simple
                </span>
              </h1>

              {/* Subtitle */}
              <div className="w-full max-w-2xl mb-16">
                <p className="text-gray-400 text-lg leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={primaryCTA.href}
                  className="group inline-flex items-center space-x-3 px-6 py-3 bg-white text-black text-sm font-medium tracking-wide hover:bg-gray-100 transition-all duration-200 rounded-xl shadow-lg hover:shadow-xl"
                >
                  <BarChart3 size={16} />
                  <span>{primaryCTA.text}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>

                {secondaryCTA && (
                  <a
                    href={secondaryCTA.href}
                    className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700 text-sm font-medium tracking-wide transition-all duration-200 rounded-xl backdrop-blur-sm"
                  >
                    <span>{secondaryCTA.text}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
