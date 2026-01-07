"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function ComponentComingSoonPage() {
  return (
    <div className="min-h-screen bg-background relative pt-16">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-50"></div>

      {/* Content wrapper */}
      <div className="relative">
        {/* Main Content */}
        <main className="container mx-auto px-4 max-w-7xl py-20">
          <div className="flex flex-col items-center justify-center text-center space-y-8 pt-16">
            {/* Icon Container */}
            <div className="flex items-center justify-center w-20 h-20 bg-muted/50 backdrop-blur-sm border border-border rounded-2xl">
              <Construction size={32} className="text-muted-foreground" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Coming Soon
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-lg max-w-md">
              This component is currently under development. Check back soon!
            </p>

            {/* Back button */}
            <Link
              href="/components"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Browse Components
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
