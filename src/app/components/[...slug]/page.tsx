"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function ComponentComingSoonPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Subtle background grid from homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      {/* Content wrapper to sit on top of the background */}
      <div className="relative">
        {/* Header with transparent background to show page bg */}
        <header className="border-b border-gray-700/50 sticky top-0 z-40 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between h-16">
              {/* Creative "Back to components" link */}
              <Link
                href="/components"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-sans text-gray-400 border border-gray-700 bg-gray-800/50 hover:text-white hover:border-gray-600 transition-all duration-300"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                <span>Back to components</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 max-w-7xl py-20">
          <div className="flex flex-col items-center justify-center text-center space-y-8 pt-16">
            {/* Icon Container */}
            <div className="flex items-center justify-center w-20 h-20 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <Construction size={32} className="text-gray-400" />
            </div>

            {/* Title with default sans-serif font */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-sans">
              coming_soon
            </h1>

            {/* Cursor blink animation - explicitly mono */}
            <div className="flex items-center justify-center mb-8 font-mono">
              <span className="text-green-400 text-2xl animate-pulse">█</span>
            </div>

            {/* Description with terminal style - explicitly mono */}
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed font-mono">
              $ building something beautiful...
              <br />
              <span className="text-gray-600">{/* check back soon */}</span>
            </p>

            {/* Status with dots animation - explicitly mono */}
            <div className="flex items-center gap-2 text-gray-600 text-sm font-mono">
              <span>status:</span>
              <span className="text-yellow-400">building</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
                <div
                  className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
