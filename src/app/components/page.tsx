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
    id: "navbar",
    title: "Navigation Bar",
    description:
      "Clean navbar with smooth animations, mobile menu, and modern design.",
    category: "Navigation",
    icon: <Layout size={20} />,
    tags: ["Navigation", "Glass", "Responsive", "Menu"],
    href: "/components/navbar",
  },
  {
    id: "key-metrics",
    title: "Key Metrics",
    description:
      "Display important statistics and KPIs with animated counters and visual indicators.",
    category: "Analytics",
    icon: <BarChart3 size={20} />,
    tags: ["Dashboard", "Stats", "Animation"],
    href: "/components/key-metrics",
  },
  {
    id: "logo-scrolling",
    title: "Logo Scrolling",
    description:
      "Infinite scrolling logo carousel perfect for showcasing partners or clients.",
    category: "Marketing",
    icon: <Zap size={20} />,
    tags: ["Carousel", "Infinite Scroll", "Branding"],
    href: "/components/logo-scrolling",
  },
  {
    id: "hero-section",
    title: "Hero Section",
    description:
      "Modern hero sections with gradients, animations, and call-to-action buttons.",
    category: "Layout",
    icon: <Layout size={20} />,
    tags: ["Hero", "Landing", "CTA"],
    href: "/components/hero-section",
  },
  {
    id: "interactive-cards",
    title: "Interactive Cards",
    description:
      "Hover effects, micro-animations, and engaging card components.",
    category: "UI Elements",
    icon: <MousePointer size={20} />,
    tags: ["Cards", "Hover", "Interactive"],
    href: "/components/interactive-cards",
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    description:
      "Charts, graphs, and data display components with smooth animations.",
    category: "Analytics",
    icon: <Eye size={20} />,
    tags: ["Charts", "Data", "Visualization"],
    href: "/components/data-visualization",
  },
  {
    id: "calendar-widget",
    title: "Calendar Widget",
    description: "Clean and minimal calendar component with event management.",
    category: "Widgets",
    icon: <Calendar size={20} />,
    tags: ["Calendar", "Events", "Widget"],
    href: "/components/calendar-widget",
  },
];

const categories = [
  "All",
  "Navigation",
  "Analytics",
  "Marketing",
  "Layout",
  "UI Elements",
  "Widgets",
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
                  Component
                </span>
                <br />
                <span className="bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent font-extralight">
                  Collection
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Explore our carefully crafted components. Each one is built for
                reusability, performance, and modern design standards.
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
