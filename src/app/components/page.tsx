"use client";

import React, { useState } from "react";
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
  Search,
} from "lucide-react";

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
    <path d="M 16 4 A 12 12 0 0 1 26.4 22 L 16 16 Z" className="fill-chart-1" />
    <path d="M 26.4 22 A 12 12 0 0 1 5.6 22 L 16 16 Z" className="fill-chart-2" />
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
    {[0.2, 0.8, 0.4, 0.6, 0.3, 0.9, 0.5, 0.7, 0.4, 0.8, 0.3, 0.6, 0.9, 0.5, 0.7].map(
      (opacity, i) => (
        <div key={i} className="w-2 h-2 rounded-sm bg-chart-1" style={{ opacity }} />
      )
    )}
  </div>
);

const MiniScatter = () => (
  <svg className="w-full h-12" viewBox="0 0 60 30">
    {[
      [10, 8],
      [18, 20],
      [25, 12],
      [32, 18],
      [40, 6],
      [48, 15],
      [55, 10],
    ].map(([x, y], i) => (
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
        className={`w-2 h-2 rounded-sm ${
          [2, 5, 8, 12, 15, 18].includes(i) ? "bg-chart-1" : "bg-muted"
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
  // Charts
  {
    id: "bar-chart",
    title: "Bar Chart",
    description: "Horizontal bar charts for comparing categorical data with smooth animations.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Comparison"],
    href: "/components/bar-chart",
    preview: <MiniBarChart />,
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
    id: "area-chart",
    title: "Area Chart",
    description: "Area charts for volume and cumulative trends over time.",
    category: "Charts",
    icon: <Activity size={20} />,
    tags: ["Charts", "Trends"],
    href: "/components/area-chart",
    preview: <MiniAreaChart />,
  },
  {
    id: "pie-chart",
    title: "Pie Chart",
    description: "Circular charts for proportions and percentage breakdowns.",
    category: "Charts",
    icon: <PieChart size={20} />,
    tags: ["Charts", "Proportions"],
    href: "/components/pie-chart",
    preview: <MiniPieChart />,
  },
  {
    id: "donut-chart",
    title: "Donut Chart",
    description: "Ring-style charts with center content for hierarchical data.",
    category: "Charts",
    icon: <PieChart size={20} />,
    tags: ["Charts", "Proportions"],
    href: "/components/donut-chart",
    preview: <MiniPieChart />,
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
    id: "scatter-plot",
    title: "Scatter Plot",
    description: "Scatter plots for correlation and distribution analysis.",
    category: "Charts",
    icon: <Sparkles size={20} />,
    tags: ["Charts", "Correlation"],
    href: "/components/scatter-plot",
    preview: <MiniScatter />,
  },
  {
    id: "gauge-chart",
    title: "Gauge Chart",
    description: "Progress indicators with customizable ranges and thresholds.",
    category: "Charts",
    icon: <Gauge size={20} />,
    tags: ["Charts", "Progress"],
    href: "/components/gauge-chart",
    preview: <MiniGauge />,
  },
  {
    id: "heatmap",
    title: "Heatmap",
    description: "Color-coded matrix for patterns and density visualization.",
    category: "Charts",
    icon: <Grid3X3 size={20} />,
    tags: ["Charts", "Patterns"],
    href: "/components/heatmap",
    preview: <MiniHeatmap />,
  },
  // Widgets
  {
    id: "key-metrics",
    title: "Key Metrics",
    description: "Display KPIs with animated counters and trend indicators.",
    category: "Widgets",
    icon: <Activity size={20} />,
    tags: ["Dashboard", "Stats"],
    href: "/components/key-metrics",
    preview: <MiniMetrics />,
  },
  {
    id: "calendar-widget",
    title: "Calendar Widget",
    description: "Date-based visualization with event timeline.",
    category: "Widgets",
    icon: <Calendar size={20} />,
    tags: ["Calendar", "Timeline"],
    href: "/components/calendar-widget",
    preview: <MiniCalendar />,
  },
  {
    id: "data-visualization",
    title: "Data Tables",
    description: "Interactive tables with sorting and filtering capabilities.",
    category: "Widgets",
    icon: <Table2 size={20} />,
    tags: ["Tables", "Data"],
    href: "/components/data-visualization",
    preview: <MiniTable />,
  },
];

const categories = [
  { id: "All", label: "All Components", count: components.length },
  { id: "Charts", label: "Charts", count: components.filter((c) => c.category === "Charts").length },
  { id: "Widgets", label: "Widgets", count: components.filter((c) => c.category === "Widgets").length },
];

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = components.filter((comp) => {
    const matchesCategory = selectedCategory === "All" || comp.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Main Layout with Sidebar */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
            {/* Search */}
            <div className="relative mb-6">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-sm bg-muted border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            {/* Categories */}
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <span>{category.label}</span>
                  <span
                    className={`text-xs ${
                      selectedCategory === category.id
                        ? "text-accent-foreground/70"
                        : "text-muted-foreground/70"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                Resources
              </h4>
              <nav className="space-y-1">
                <a
                  href="https://github.com/jchiwaii/Linspo-UI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/50 transition-colors"
                >
                  GitHub
                  <ArrowRight size={12} />
                </a>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 z-30">
            <div className="px-6 lg:px-12 py-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Components</h1>
              <p className="text-muted-foreground">
                Beautiful, accessible data visualization components. Copy and paste into your
                projects.
              </p>
            </div>

            {/* Mobile Category Tabs */}
            <div className="lg:hidden px-6 pb-4 overflow-x-auto">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Components Grid */}
          <div className="px-6 lg:px-12 py-8">
            {filteredComponents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No components found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredComponents.map((component) => (
                  <Link
                    key={component.id}
                    href={component.href}
                    className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all duration-200"
                  >
                    {/* Preview Area */}
                    <div className="p-6 pb-4 border-b border-border bg-muted/30">
                      <div className="h-12 flex items-center justify-center">
                        {component.preview}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                            {component.icon}
                          </div>
                          <h3 className="font-semibold text-foreground">{component.title}</h3>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1.5"
                        />
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {component.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
