"use client";

import React from "react";
import { BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LinspoNavBarProps {
  brandName?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}
export default function LinspoNavBar({
  brandName = "Linspo UI",
  ctaText = "Star on GitHub",
  ctaHref = "https://github.com/<your-repo>",
  className = "",
}: LinspoNavBarProps) {
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 ${className}`}>
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16 bg-transparent">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 shadow-md">
              <BarChart3 size={16} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-white hidden sm:block">
              {brandName}
            </span>
          </Link>

          {/* CTA Button */}
          <div className="flex items-center">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white border border-gray-700 rounded-md bg-gray-800/60 hover:bg-gray-700/60 hover:shadow-sm transition-all"
            >
              <span>{ctaText}</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
