"use client";

import React, { useState, useEffect } from "react";
import { Activity } from "lucide-react";

interface BubbleDataPoint {
  x: number;
  y: number;
  size: number;
  label: string;
  color?: string;
  category?: string;
}

interface BubbleChartProps {
  data?: BubbleDataPoint[];
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  sizeLabel?: string;
  className?: string;
}

const generateBubbleData = (): BubbleDataPoint[] => {
  const categories = ["Tech", "Finance", "Healthcare", "Retail", "Energy"];
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

  return Array.from({ length: 20 }, (_, i) => {
    const categoryIndex = i % categories.length;
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 10,
      label: `${categories[categoryIndex]} ${
        Math.floor(i / categories.length) + 1
      }`,
      color: colors[categoryIndex],
      category: categories[categoryIndex],
    };
  });
};

export default function BubbleChart({
  data = generateBubbleData(),
  title = "Bubble Chart Component",
  subtitle = "Multi-dimensional bubble charts with size and color encoding",
  xLabel = "Revenue (M)",
  yLabel = "Growth Rate (%)",
  sizeLabel = "Market Cap",
  className = "",
}: BubbleChartProps) {
  const [animatedBubbles, setAnimatedBubbles] = useState<{
    [key: string]: boolean;
  }>({});
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);

  useEffect(() => {
    data.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedBubbles((prev) => ({ ...prev, [index]: true }));
      }, index * 100);
    });
  }, [data]);

  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const maxSize = Math.max(...data.map((d) => d.size));
  const minX = Math.min(...data.map((d) => d.x));
  const minY = Math.min(...data.map((d) => d.y));

  const categories = Array.from(new Set(data.map((d) => d.category)));

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-slate-900">
            {title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Activity size={24} className="text-slate-700" />
              <h3 className="text-xl font-semibold text-slate-900">
                Multi-Dimensional Analysis
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {data.length}
              </div>
              <div className="text-sm text-slate-600">Data Points</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chart Area */}
            <div className="lg:col-span-3">
              <div className="relative">
                {/* Y-axis label */}
                <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-slate-600">
                  {yLabel}
                </div>

                {/* Chart */}
                <div className="relative h-96 ml-8 mb-8">
                  <svg
                    className="w-full h-full border border-slate-200 rounded-lg bg-slate-50/30"
                    viewBox="0 0 400 300"
                  >
                    {/* Grid */}
                    <defs>
                      <pattern
                        id="bubbleGrid"
                        width="40"
                        height="30"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 30"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="400" height="300" fill="url(#bubbleGrid)" />

                    {/* Bubbles */}
                    {data.map((bubble, index) => {
                      const x = ((bubble.x - minX) / (maxX - minX)) * 360 + 20;
                      const y = 280 - ((bubble.y - minY) / (maxY - minY)) * 260;
                      const radius = (bubble.size / maxSize) * 25 + 5;
                      const isHovered = hoveredBubble === index;
                      const isAnimated = animatedBubbles[index];

                      return (
                        <g key={index}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isAnimated ? radius : 0}
                            fill={bubble.color || "#3b82f6"}
                            fillOpacity={isHovered ? 0.8 : 0.6}
                            stroke={bubble.color || "#3b82f6"}
                            strokeWidth="2"
                            className={`transition-all duration-700 ease-out cursor-pointer ${
                              isHovered ? "scale-110" : ""
                            }`}
                            style={{
                              filter: isHovered
                                ? "drop-shadow(0 4px 12px rgba(0,0,0,0.3))"
                                : "none",
                            }}
                            onMouseEnter={() => setHoveredBubble(index)}
                            onMouseLeave={() => setHoveredBubble(null)}
                          />

                          {/* Tooltip */}
                          {isHovered && (
                            <g>
                              <rect
                                x={x + radius + 5}
                                y={y - 30}
                                width="120"
                                height="50"
                                fill="#1e293b"
                                rx="6"
                                className="drop-shadow-lg"
                              />
                              <text
                                x={x + radius + 65}
                                y={y - 15}
                                textAnchor="middle"
                                className="fill-white text-xs font-medium"
                              >
                                {bubble.label}
                              </text>
                              <text
                                x={x + radius + 65}
                                y={y - 5}
                                textAnchor="middle"
                                className="fill-slate-300 text-xs"
                              >
                                X: {bubble.x.toFixed(1)}, Y:{" "}
                                {bubble.y.toFixed(1)}
                              </text>
                              <text
                                x={x + radius + 65}
                                y={y + 5}
                                textAnchor="middle"
                                className="fill-slate-300 text-xs"
                              >
                                Size: {bubble.size.toFixed(1)}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Axis labels */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-500">
                    <span>{minX.toFixed(0)}</span>
                    <span>{((maxX + minX) / 2).toFixed(0)}</span>
                    <span>{maxX.toFixed(0)}</span>
                  </div>

                  <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500">
                    <span>{maxY.toFixed(0)}</span>
                    <span>{((maxY + minY) / 2).toFixed(0)}</span>
                    <span>{minY.toFixed(0)}</span>
                  </div>
                </div>

                {/* X-axis label */}
                <div className="text-center text-sm font-medium text-slate-600 ml-8">
                  {xLabel}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                Categories
              </h4>
              {categories.map((category) => {
                const categoryData = data.filter(
                  (d) => d.category === category
                );
                const color = categoryData[0]?.color || "#3b82f6";

                return (
                  <div
                    key={category}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">
                        {category}
                      </div>
                      <div className="text-xs text-slate-500">
                        {categoryData.length} items
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Size Legend */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">
                  {sizeLabel}
                </h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span className="text-xs text-slate-500">Small</span>
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                  <span className="text-xs text-slate-500">Large</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {categories.length}
              </div>
              <div className="text-sm text-slate-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {maxX.toFixed(1)}
              </div>
              <div className="text-sm text-slate-600">Max X</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {maxY.toFixed(1)}
              </div>
              <div className="text-sm text-slate-600">Max Y</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {maxSize.toFixed(1)}
              </div>
              <div className="text-sm text-slate-600">Max Size</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
