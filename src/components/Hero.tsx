"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  ArrowRight,
  Sparkles,
  TrendingUp,
  PieChart,
  Activity,
  Github,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface DataDashboardHeroProps {
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

// Mini chart data for the animated preview
const miniChartData = [35, 55, 45, 70, 60, 85, 75, 90, 80, 95];

export default function DataDashboardHero({
  subtitle = "Copy and paste beautiful data visualization components into your React apps. Works with any styling solution. Open source and free.",
  primaryCTA = {
    text: "Browse Components",
    href: "/components",
  },
  secondaryCTA = {
    text: "GitHub",
    href: "https://github.com/jchiwaii/Linspo-UI",
  },
  badgeText = "v0.1 — Now Available",
  className = "",
}: DataDashboardHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText("npx linspo-ui init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-background pt-16 ${className}`}>
      {/* Hero Section */}
      <section className="pt-16 pb-20 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            {badgeText && (
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-muted border border-border rounded-full transition-all duration-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <Sparkles size={14} className="text-chart-1" />
                <span className="text-sm font-medium text-muted-foreground">
                  {badgeText}
                </span>
              </div>
            )}

            {/* Main heading */}
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 transition-all duration-700 delay-100 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-foreground">Data Visualization</span>
              <br />
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-4 bg-clip-text text-transparent">
                Components
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {subtitle}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <BarChart3 size={18} />
                <span>{primaryCTA.text}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground border border-border text-sm font-medium rounded-lg hover:bg-accent transition-all duration-200"
                >
                  <Github size={18} />
                  <span>{secondaryCTA.text}</span>
                  <ExternalLink size={14} className="text-muted-foreground" />
                </a>
              )}
            </div>

            {/* Install Command */}
            <div
              className={`flex justify-center mb-16 transition-all duration-700 delay-350 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <button
                onClick={copyInstallCommand}
                className="group flex items-center gap-3 px-4 py-2.5 bg-muted border border-border rounded-lg font-mono text-sm hover:bg-accent transition-colors"
              >
                <span className="text-muted-foreground">$</span>
                <code>npx linspo-ui init</code>
                {copied ? (
                  <Check size={14} className="text-chart-2" />
                ) : (
                  <Copy
                    size={14}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                )}
              </button>
            </div>

            {/* Mini Chart Preview */}
            <div
              className={`max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative bg-card border border-border rounded-xl p-6 shadow-lg">
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                      <TrendingUp size={20} className="text-chart-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Revenue Overview
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Last 10 months
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold data-value text-foreground">
                      $847.2K
                    </p>
                    <p className="text-sm text-chart-2 flex items-center gap-1 justify-end">
                      <TrendingUp size={14} />
                      <span>+23.5%</span>
                    </p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="relative h-40">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                  >
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="400"
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                        className="text-border"
                      />
                    ))}

                    {/* Area fill */}
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(221 83% 53%)"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(221 83% 53%)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0 ${100 - miniChartData[0]} ${miniChartData
                        .map(
                          (value, index) =>
                            `L ${(index / (miniChartData.length - 1)) * 400} ${
                              100 - value
                            }`
                        )
                        .join(" ")} L 400 100 L 0 100 Z`}
                      fill="url(#areaGradient)"
                      className={`transition-all duration-1000 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Line */}
                    <path
                      d={`M ${miniChartData
                        .map(
                          (value, index) =>
                            `${(index / (miniChartData.length - 1)) * 400} ${
                              100 - value
                            }`
                        )
                        .join(" L ")}`}
                      fill="none"
                      stroke="hsl(221 83% 53%)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-all duration-1000 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Data points */}
                    {miniChartData.map((value, index) => (
                      <circle
                        key={index}
                        cx={(index / (miniChartData.length - 1)) * 400}
                        cy={100 - value}
                        r="4"
                        fill="hsl(221 83% 53%)"
                        stroke="white"
                        strokeWidth="2"
                        className={`transition-all duration-500 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      />
                    ))}
                  </svg>
                </div>

                {/* Preview Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-lg font-semibold data-value text-foreground">
                      95
                    </p>
                    <p className="text-xs text-muted-foreground">Peak Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold data-value text-foreground">
                      69
                    </p>
                    <p className="text-xs text-muted-foreground">Average</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold data-value text-foreground">
                      35
                    </p>
                    <p className="text-xs text-muted-foreground">Minimum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Beautiful by Default
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Production-ready components that look polished out of the box. No
              styling required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PieChart size={24} />,
                title: "Polished Design",
                description:
                  "Every component is crafted with attention to detail. Muted colors, subtle shadows, and refined typography.",
              },
              {
                icon: <Activity size={24} />,
                title: "Smooth Animations",
                description:
                  "Quick, purposeful animations that feel natural. Data transitions that help users understand changes.",
              },
              {
                icon: <BarChart3 size={24} />,
                title: "Dark Mode Ready",
                description:
                  "Beautiful in both light and dark modes. Smooth transitions when switching themes.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card border border-border rounded-xl hover:border-border/80 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Types Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Charts, tables, metrics, and dashboard components for data-driven
              applications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Line Charts", count: 1, icon: <TrendingUp size={20} /> },
              { name: "Bar Charts", count: 2, icon: <BarChart3 size={20} /> },
              { name: "Pie & Donut", count: 2, icon: <PieChart size={20} /> },
              { name: "Area Charts", count: 1, icon: <Activity size={20} /> },
              { name: "Scatter Plots", count: 1, icon: <Sparkles size={20} /> },
              { name: "Heatmaps", count: 1, icon: <BarChart3 size={20} /> },
              { name: "Gauges", count: 1, icon: <Activity size={20} /> },
              { name: "Data Tables", count: 1, icon: <BarChart3 size={20} /> },
            ].map((category, index) => (
              <Link
                key={index}
                href="/components"
                className="group flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
              >
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  {category.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{category.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.count} component{category.count > 1 ? "s" : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Start Building Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our components and copy the code directly into your project.
          </p>
          <Link
            href="/components"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-base font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Browse All Components</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 size={20} />
              <span className="font-medium">Linspo UI</span>
              <span className="text-sm">— Open Source Data Visualization</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/jchiwaii/Linspo-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <Link
                href="/components"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Components
              </Link>
              <Link
                href="/demo"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Demo
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
