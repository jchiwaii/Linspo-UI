"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Calendar,
  Table2,
  Gauge,
  Grid3X3,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// Component data structure
interface ComponentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  href: string;
  preview?: React.ReactNode;
}

// Mini preview components for cards
const MiniLineChart = () => (
  <svg className="w-full h-12" viewBox="0 0 100 30" preserveAspectRatio="none">
    <path
      d="M 0 25 L 15 20 L 30 22 L 45 15 L 60 18 L 75 10 L 90 12 L 100 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-chart-1"
    />
  </svg>
);

const MiniBarChart = () => (
  <svg className="w-full h-12" viewBox="0 0 100 30">
    {[15, 25, 18, 28, 22, 30, 20].map((h, i) => (
      <rect
        key={i}
        x={i * 14 + 2}
        y={30 - h}
        width="10"
        height={h}
        rx="2"
        className="fill-chart-1 opacity-60"
      />
    ))}
  </svg>
);

const MiniPieChart = () => (
  <svg className="w-12 h-12 mx-auto" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="12" className="fill-chart-1 opacity-20" />
    <path
      d="M 16 4 A 12 12 0 0 1 26.4 22 L 16 16 Z"
      className="fill-chart-1"
    />
    <path
      d="M 26.4 22 A 12 12 0 0 1 5.6 22 L 16 16 Z"
      className="fill-chart-2"
    />
  </svg>
);

const MiniAreaChart = () => (
  <svg className="w-full h-12" viewBox="0 0 100 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="miniAreaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M 0 30 L 0 25 L 20 20 L 40 22 L 60 12 L 80 15 L 100 8 L 100 30 Z"
      fill="url(#miniAreaGrad)"
      className="text-chart-2"
    />
    <path
      d="M 0 25 L 20 20 L 40 22 L 60 12 L 80 15 L 100 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-chart-2"
    />
  </svg>
);

const MiniGauge = () => (
  <svg className="w-12 h-8 mx-auto" viewBox="0 0 40 24">
    <path
      d="M 4 20 A 16 16 0 0 1 36 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className="text-muted"
    />
    <path
      d="M 4 20 A 16 16 0 0 1 28 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      className="text-chart-1"
    />
  </svg>
);

const MiniHeatmap = () => (
  <div className="grid grid-cols-5 gap-0.5 w-full max-w-[60px] mx-auto">
    {[0.2, 0.8, 0.4, 0.6, 0.3, 0.9, 0.5, 0.7, 0.4, 0.8, 0.3, 0.6, 0.9, 0.5, 0.7].map((opacity, i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-sm bg-chart-1"
        style={{ opacity }}
      />
    ))}
  </div>
);

const MiniScatter = () => (
  <svg className="w-full h-12" viewBox="0 0 60 30">
    {[[10, 8], [18, 20], [25, 12], [32, 18], [40, 6], [48, 15], [55, 10]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3" className="fill-chart-4" />
    ))}
  </svg>
);

const MiniTable = () => (
  <div className="w-full space-y-1">
    <div className="h-2 bg-muted rounded" />
    <div className="h-1.5 bg-muted/50 rounded w-4/5" />
    <div className="h-1.5 bg-muted/50 rounded w-3/5" />
    <div className="h-1.5 bg-muted/50 rounded w-4/5" />
  </div>
);

const MiniCalendar = () => (
  <div className="grid grid-cols-7 gap-0.5 w-full max-w-[70px] mx-auto">
    {Array.from({ length: 21 }).map((_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-sm ${[2, 5, 8, 12, 15, 18].includes(i) ? "bg-chart-1" : "bg-muted"
          }`}
      />
    ))}
  </div>
);

const MiniMetrics = () => (
  <div className="flex gap-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex-1 h-8 bg-muted rounded flex items-center justify-center">
        <div className="w-4 h-1.5 bg-chart-1 rounded" />
      </div>
    ))}
  </div>
);

const components: ComponentItem[] = [
  {
    id: "key-metrics",
    title: "Key Metrics",
    description: "Display KPIs with animated counters and trend indicators.",
    category: "Dashboard",
    icon: <Activity size={20} />,
    tags: ["Dashboard", "Stats", "KPIs"],
    href: "/components/key-metrics",
    preview: <MiniMetrics />,
  },
  {
    id: "line-chart",
    title: "Line Chart",
    description: "Responsive line charts for time-series and trend visualization.",
    category: "Charts",
    icon: <TrendingUp size={20} />,
    tags: ["Charts", "Time Series"],
    href: "/components/line-chart",
    preview: <MiniLineChart />,
  },
  {
    id: "bar-chart",
    title: "Bar Chart",
    description: "Horizontal bar charts for comparing categorical data.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Comparison"],
    href: "/components/bar-chart",
    preview: <MiniBarChart />,
  },
  {
    id: "column-chart",
    title: "Column Chart",
    description: "Vertical column charts for category comparison.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Comparison"],
    href: "/components/column-chart",
    preview: <MiniBarChart />,
  },
  {
    id: "area-chart",
    title: "Area Chart",
    description: "Area charts for volume and cumulative trends.",
    category: "Charts",
    icon: <Activity size={20} />,
    tags: ["Charts", "Trends"],
    href: "/components/area-chart",
    preview: <MiniAreaChart />,
  },
  {
    id: "pie-chart",
    title: "Pie Chart",
    description: "Circular charts for proportions and percentages.",
    category: "Charts",
    icon: <PieChart size={20} />,
    tags: ["Charts", "Proportions"],
    href: "/components/pie-chart",
    preview: <MiniPieChart />,
  },
  {
    id: "donut-chart",
    title: "Donut Chart",
    description: "Ring-style charts for hierarchical data.",
    category: "Charts",
    icon: <PieChart size={20} />,
    tags: ["Charts", "Proportions"],
    href: "/components/donut-chart",
    preview: <MiniPieChart />,
  },
  {
    id: "scatter-plot",
    title: "Scatter Plot",
    description: "Scatter plots for correlation analysis.",
    category: "Charts",
    icon: <Sparkles size={20} />,
    tags: ["Charts", "Correlation"],
    href: "/components/scatter-plot",
    preview: <MiniScatter />,
  },
  {
    id: "heatmap",
    title: "Heatmap",
    description: "Color-coded matrix for patterns and density.",
    category: "Charts",
    icon: <Grid3X3 size={20} />,
    tags: ["Charts", "Patterns"],
    href: "/components/heatmap",
    preview: <MiniHeatmap />,
  },
  {
    id: "gauge-chart",
    title: "Gauge Chart",
    description: "Progress indicators with customizable ranges.",
    category: "Dashboard",
    icon: <Gauge size={20} />,
    tags: ["Dashboard", "Progress"],
    href: "/components/gauge-chart",
    preview: <MiniGauge />,
  },
  {
    id: "data-visualization",
    title: "Data Tables",
    description: "Interactive tables with sorting and filtering.",
    category: "Tables",
    icon: <Table2 size={20} />,
    tags: ["Tables", "Data"],
    href: "/components/data-visualization",
    preview: <MiniTable />,
  },
  {
    id: "calendar-widget",
    title: "Calendar Widget",
    description: "Date-based visualization and event timeline.",
    category: "Dashboard",
    icon: <Calendar size={20} />,
    tags: ["Calendar", "Timeline"],
    href: "/components/calendar-widget",
    preview: <MiniCalendar />,
  },
];

const categories = ["All", "Charts", "Dashboard", "Tables"];

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredComponents =
    selectedCategory === "All"
      ? components
      : components.filter((comp) => comp.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navbar currentPage="components" />

      {/* Header */}
      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl">
            <h1
              className={`text-4xl md:text-5xl font-semibold text-foreground mb-4 transition-all duration-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              Components
            </h1>
            <p
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-500 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
              Beautiful data visualization components. Copy the code and use in your React projects.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border sticky top-16 z-40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-70">
                    {components.filter((c) => c.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component, index) => (
              <Link
                key={component.id}
                href={component.href}
                className={`group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Preview Area */}
                <div className="p-6 pb-4 border-b border-border bg-muted/30">
                  <div className="h-16 flex items-center justify-center">
                    {component.preview}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                        {component.icon}
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {component.title}
                      </h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-2"
                    />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {component.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {component.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 size={20} />
              <span className="font-medium">Linspo UI</span>
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
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
