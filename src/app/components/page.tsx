"use client";

import React from "react";
import {
  ArrowRight,
  BarChart3,
  Zap,
  Layout,
  MousePointer,
  Eye,
  Calendar,
} from "lucide-react";

// Component data structure
interface ComponentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  previewImage?: string;
  tags: string[];
  href: string;
}

const components: ComponentItem[] = [
  {
    id: "key-metrics",
    title: "Key Metrics",
    description:
      "Display important statistics and KPIs with animated counters and visual indicators.",
    category: "Dashboard Elements",
    icon: <BarChart3 size={20} />,
    tags: ["Dashboard", "Stats", "KPIs"],
    href: "/components/key-metrics",
  },
  {
    id: "line-chart",
    title: "Line Chart",
    description:
      "Responsive line charts for time-series data and trend visualization.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Time Series", "Trends"],
    href: "/components/line-chart",
  },
  {
    id: "bar-chart",
    title: "Bar Chart",
    description:
      "Vertical and horizontal bar charts for comparing categorical data.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Comparison", "Categories"],
    href: "/components/bar-chart",
  },
  {
    id: "column-chart",
    title: "Column Chart",
    description:
      "Vertical column charts ideal for comparing values across categories.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Comparison", "Data"],
    href: "/components/column-chart",
  },
  {
    id: "area-chart",
    title: "Area Chart",
    description:
      "Area charts for visualizing volume and cumulative trends over time.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Trends", "Volume"],
    href: "/components/area-chart",
  },
  {
    id: "pie-chart",
    title: "Pie Chart",
    description:
      "Circular charts showing proportional data and percentage breakdowns.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Proportions", "Percentages"],
    href: "/components/pie-chart",
  },
  {
    id: "donut-chart",
    title: "Donut Chart",
    description:
      "Ring-style charts for displaying hierarchical and proportional data.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Proportions", "Data"],
    href: "/components/donut-chart",
  },
  {
    id: "scatter-plot",
    title: "Scatter Plot",
    description:
      "Scatter plots for correlation analysis and distribution patterns.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Correlation", "Distribution"],
    href: "/components/scatter-plot",
  },
  {
    id: "heatmap",
    title: "Heatmap",
    description:
      "Color-coded matrix visualization for patterns and data density.",
    category: "Charts",
    icon: <BarChart3 size={20} />,
    tags: ["Charts", "Patterns", "Density"],
    href: "/components/heatmap",
  },
  {
    id: "gauge-chart",
    title: "Gauge Chart",
    description:
      "Progress and performance indicators with customizable ranges.",
    category: "Dashboard Elements",
    icon: <BarChart3 size={20} />,
    tags: ["Dashboard", "Progress", "Metrics"],
    href: "/components/gauge-chart",
  },
  {
    id: "data-visualization",
    title: "Data Tables",
    description:
      "Interactive data tables with sorting, filtering, and pagination.",
    category: "Tables",
    icon: <Eye size={20} />,
    tags: ["Tables", "Data", "Interactive"],
    href: "/components/data-visualization",
  },
  {
    id: "calendar-widget",
    title: "Calendar Widget",
    description: "Date-based data visualization and event timeline component.",
    category: "Dashboard Elements",
    icon: <Calendar size={20} />,
    tags: ["Calendar", "Timeline", "Events"],
    href: "/components/calendar-widget",
  },
];

const categories = [
  "All",
  "Charts",
  "Dashboard Elements",
  "Tables",
];

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredComponents =
    selectedCategory === "All"
      ? components
      : components.filter((comp) => comp.category === selectedCategory);

  return (
    <main className="bg-black text-white min-h-screen relative">
      {/* Subtle background grid from homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      {/* Content wrapper to sit on top of the background */}
      <div className="relative">
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                  Data Visualization
                </span>
                <br />
                <span className="bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent font-extralight">
                  Components
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Explore our collection of data visualization components. Charts, tables, and dashboard elements designed for data-driven applications.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-white text-black shadow-lg"
                      : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <a
                  key={component.id}
                  href={component.href}
                  className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5"
                >
                  {/* Category badge */}
                  <div className="absolute top-4 right-4 px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400">
                    {component.category}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700/50 rounded-xl mb-4 group-hover:bg-gray-600/50 transition-colors duration-300">
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {component.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300">
                    {component.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                    {component.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {component.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700/30 text-gray-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                      View Component
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                    />
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
