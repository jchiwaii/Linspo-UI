"use client";

import React, { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

interface ComponentCard {
  id: string;
  title: string;
  description: string;
  category: string;
  complexity: "Basic" | "Intermediate" | "Advanced";
  dataTypes: string[];
  features: string[];
  stats?: {
    usage: number;
    performance: number;
    customization: number;
  };
}

interface InteractiveCardsProps {
  cards?: ComponentCard[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultCards: ComponentCard[] = [
  {
    id: "line-charts",
    title: "Line & Area Charts",
    description:
      "Time series visualization with smooth animations, multiple data series, and interactive tooltips for trend analysis.",
    category: "Time Series",
    complexity: "Basic",
    dataTypes: ["Time Series", "Continuous Data", "Trends"],
    features: [
      "Real-time Updates",
      "Zoom & Pan",
      "Multiple Series",
      "Annotations",
    ],
    stats: { usage: 94, performance: 98, customization: 87 },
  },
  {
    id: "bar-charts",
    title: "Bar & Column Charts",
    description:
      "Categorical data comparison with horizontal and vertical orientations, stacking, and grouping capabilities.",
    category: "Categorical",
    complexity: "Basic",
    dataTypes: ["Categorical", "Discrete Values", "Comparisons"],
    features: [
      "Stacked Bars",
      "Grouped Bars",
      "Horizontal Layout",
      "Data Labels",
    ],
    stats: { usage: 89, performance: 95, customization: 92 },
  },
  {
    id: "heatmaps",
    title: "Heatmaps & Matrix",
    description:
      "Matrix data visualization with color-coded intensity mapping, perfect for correlation analysis and pattern detection.",
    category: "Matrix Data",
    complexity: "Intermediate",
    dataTypes: ["Matrix Data", "Correlations", "Density Maps"],
    features: [
      "Color Scales",
      "Interactive Cells",
      "Clustering",
      "Dendrograms",
    ],
    stats: { usage: 76, performance: 88, customization: 94 },
  },
  {
    id: "advanced-charts",
    title: "Advanced Analytics",
    description:
      "Complex visualizations including scatter plots, bubble charts, radar charts, and custom D3.js implementations.",
    category: "Advanced",
    complexity: "Advanced",
    dataTypes: ["Multi-dimensional", "Statistical", "Custom Metrics"],
    features: [
      "D3.js Integration",
      "Custom Interactions",
      "Statistical Analysis",
      "Export Options",
    ],
    stats: { usage: 68, performance: 91, customization: 98 },
  },
];

export default function InteractiveCards({
  cards = defaultCards,
  title = "Data Visualization Components",
  subtitle = "Professional chart components for modern analytics dashboards",
  className = "",
}: InteractiveCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favoriteCards, setFavoriteCards] = useState<Set<string>>(new Set());

  const handleFavorite = (cardId: string) => {
    setFavoriteCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Basic":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const categories = Array.from(new Set(cards.map((card) => card.category)));

  const filteredCards = selectedCategory
    ? cards.filter((card) => card.category === selectedCategory)
    : cards;

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      {/* Data visualization background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-slate-900">
            {title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-slate-900 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              All Components
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCards.map((card, index) => (
            <div
              key={card.id}
              className={`group relative bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl overflow-hidden hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500 ${
                hoveredCard === card.id ? "scale-[1.02]" : ""
              }`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Header with badges */}
              <div className="flex items-center justify-between p-6 pb-0">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-slate-900/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {card.category}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${getComplexityColor(
                      card.complexity
                    )}`}
                  >
                    {card.complexity}
                  </span>
                </div>
                <button
                  onClick={() => handleFavorite(card.id)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    favoriteCards.has(card.id)
                      ? "text-red-600 bg-red-50"
                      : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    size={16}
                    className={`transition-all duration-300 ${
                      favoriteCards.has(card.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-black transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 text-sm">
                    {card.description}
                  </p>
                </div>

                {/* Data Types */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                    Data Types
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {card.dataTypes.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                    {card.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Stats */}
                {card.stats && (
                  <div className="pt-4 border-t border-slate-200/60">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-light text-slate-900">
                          {card.stats.usage}%
                        </div>
                        <div className="text-xs text-slate-600">Usage</div>
                      </div>
                      <div>
                        <div className="text-lg font-light text-slate-900">
                          {card.stats.performance}%
                        </div>
                        <div className="text-xs text-slate-600">
                          Performance
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-light text-slate-900">
                          {card.stats.customization}%
                        </div>
                        <div className="text-xs text-slate-600">
                          Customizable
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 group-hover:shadow-lg">
                    <span className="text-sm font-medium">View Component</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
