"use client";

import React, { useState, useEffect } from "react";
import { Activity } from "lucide-react";

interface DataPoint {
  x: number;
  y: number;
  label?: string;
  size?: number;
  color?: string;
}

interface ScatterPlotProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

const generateScatterData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100 + (Math.random() * 20 - 10),
      label: `Point ${i + 1}`,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
    });
  }
  return data;
};

export default function ScatterPlot({
  data = generateScatterData(),
  title = "Scatter Plot Component",
  subtitle = "Interactive scatter plots for correlation and distribution analysis",
  xLabel = "X Axis Variable",
  yLabel = "Y Axis Variable",
  className = "",
}: ScatterPlotProps) {
  const [animatedPoints, setAnimatedPoints] = useState<{
    [key: string]: boolean;
  }>({});
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      data.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedPoints((prev) => ({ ...prev, [index]: true }));
        }, index * 50);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  const minX = Math.min(...data.map((d) => d.x));
  const minY = Math.min(...data.map((d) => d.y));

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-5xl mx-auto px-4">
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
                Correlation Analysis
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {data.length}
              </div>
              <div className="text-sm text-slate-600">Data Points</div>
            </div>
          </div>

          <div className="relative">
            {/* Y-axis label */}
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-slate-600">
              {yLabel}
            </div>

            {/* Chart area */}
            <div className="relative h-96 ml-8 mb-8">
              <svg
                className="w-full h-full border border-slate-200 rounded-lg bg-slate-50/30"
                viewBox="0 0 400 300"
              >
                {/* Grid lines */}
                <defs>
                  <pattern
                    id="scatterGrid"
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
                <rect width="400" height="300" fill="url(#scatterGrid)" />

                {/* Data points */}
                {data.map((point, index) => {
                  const x = ((point.x - minX) / (maxX - minX)) * 360 + 20;
                  const y = 280 - ((point.y - minY) / (maxY - minY)) * 260;
                  const isHovered = hoveredPoint === index;
                  const isAnimated = animatedPoints[index];

                  return (
                    <g key={index}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isAnimated ? point.size || 6 : 0}
                        fill={point.color || "#3b82f6"}
                        stroke="white"
                        strokeWidth="2"
                        className={`transition-all duration-500 ease-out cursor-pointer ${
                          isHovered ? "scale-150" : ""
                        }`}
                        style={{
                          filter: isHovered
                            ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                            : "none",
                        }}
                        onMouseEnter={() => setHoveredPoint(index)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />

                      {/* Tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={x + 10}
                            y={y - 25}
                            width="80"
                            height="40"
                            fill="#1e293b"
                            rx="4"
                            className="drop-shadow-lg"
                          />
                          <text
                            x={x + 50}
                            y={y - 12}
                            textAnchor="middle"
                            className="fill-white text-xs font-medium"
                          >
                            {point.label ||
                              `(${point.x.toFixed(1)}, ${point.y.toFixed(1)})`}
                          </text>
                          <text
                            x={x + 50}
                            y={y - 2}
                            textAnchor="middle"
                            className="fill-slate-300 text-xs"
                          >
                            X: {point.x.toFixed(1)}, Y: {point.y.toFixed(1)}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Trend line (simple linear regression) */}
                {(() => {
                  const n = data.length;
                  const sumX = data.reduce((sum, d) => sum + d.x, 0);
                  const sumY = data.reduce((sum, d) => sum + d.y, 0);
                  const sumXY = data.reduce((sum, d) => sum + d.x * d.y, 0);
                  const sumXX = data.reduce((sum, d) => sum + d.x * d.x, 0);

                  const slope =
                    (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
                  const intercept = (sumY - slope * sumX) / n;

                  const x1 = 20;
                  const y1 =
                    280 -
                    ((slope * minX + intercept - minY) / (maxY - minY)) * 260;
                  const x2 = 380;
                  const y2 =
                    280 -
                    ((slope * maxX + intercept - minY) / (maxY - minY)) * 260;

                  return (
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-60"
                    />
                  );
                })()}
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

          <div className="mt-8 grid grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {data.length}
              </div>
              <div className="text-sm text-slate-600">Points</div>
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
              <div className="text-2xl font-light text-slate-900">0.73</div>
              <div className="text-sm text-slate-600">Correlation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
