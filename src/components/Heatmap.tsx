"use client";

import React, { useState, useEffect } from "react";
import { Grid3X3 } from "lucide-react";

interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
  label?: string;
}

interface HeatmapProps {
  data?: HeatmapDataPoint[];
  title?: string;
  subtitle?: string;
  xLabels?: string[];
  yLabels?: string[];
  metric?: string;
  className?: string;
}

const generateHeatmapData = (): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 5; y++) {
      data.push({
        x,
        y,
        value: Math.floor(Math.random() * 100),
        label: `${x},${y}`,
      });
    }
  }
  return data;
};

const defaultXLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultYLabels = [
  "Morning",
  "Afternoon",
  "Evening",
  "Night",
  "Late Night",
];

export default function Heatmap({
  data = generateHeatmapData(),
  title = "Heatmap Component",
  subtitle = "Interactive heatmaps for correlation analysis and pattern detection",
  xLabels = defaultXLabels,
  yLabels = defaultYLabels,
  metric = "Activity Intensity",
  className = "",
}: HeatmapProps) {
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
  }>({});
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      data.forEach((point) => {
        const key = `${point.x}-${point.y}`;
        newValues[key] = point.value;
      });
      setAnimatedValues(newValues);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));

  const getIntensityColor = (value: number) => {
    const intensity = (value - minValue) / (maxValue - minValue);
    if (intensity > 0.8) return "#1e293b";
    if (intensity > 0.6) return "#334155";
    if (intensity > 0.4) return "#475569";
    if (intensity > 0.2) return "#64748b";
    if (intensity > 0) return "#94a3b8";
    return "#e2e8f0";
  };

  const getTextColor = (value: number) => {
    const intensity = (value - minValue) / (maxValue - minValue);
    return intensity > 0.5 ? "#ffffff" : "#1e293b";
  };

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-slate-900">
            {title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Chart Container */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-8 hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Grid3X3 size={24} className="text-slate-700" />
              <h3 className="text-xl font-semibold text-slate-900">{metric}</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {maxValue}
              </div>
              <div className="text-sm text-slate-600">Peak Value</div>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* X-axis labels */}
              <div className="flex mb-2">
                <div className="w-24"></div> {/* Space for Y-axis labels */}
                {xLabels.map((label, index) => (
                  <div
                    key={index}
                    className="w-16 text-center text-sm font-medium text-slate-600"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Heatmap rows */}
              {yLabels.map((yLabel, yIndex) => (
                <div key={yIndex} className="flex items-center mb-2">
                  {/* Y-axis label */}
                  <div className="w-24 text-right pr-4 text-sm font-medium text-slate-600">
                    {yLabel}
                  </div>

                  {/* Heatmap cells */}
                  {xLabels.map((_, xIndex) => {
                    const dataPoint = data.find(
                      (d) => d.x === xIndex && d.y === yIndex
                    );
                    const value = dataPoint?.value || 0;
                    const animatedValue =
                      animatedValues[`${xIndex}-${yIndex}`] || 0;
                    const isHovered =
                      hoveredCell?.x === xIndex && hoveredCell?.y === yIndex;

                    return (
                      <div
                        key={xIndex}
                        className={`w-16 h-12 mx-0.5 rounded-lg flex items-center justify-center text-xs font-semibold cursor-pointer transition-all duration-500 ${
                          isHovered ? "scale-110 shadow-lg z-10 relative" : ""
                        }`}
                        style={{
                          backgroundColor: getIntensityColor(animatedValue),
                          color: getTextColor(animatedValue),
                        }}
                        onMouseEnter={() =>
                          setHoveredCell({ x: xIndex, y: yIndex })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {Math.round(animatedValue)}

                        {/* Tooltip */}
                        {isHovered && (
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-20">
                            {yLabel}, {xLabels[xIndex]}: {value}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-slate-200 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-300 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-500 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-600 rounded-sm"></div>
                <div className="w-4 h-4 bg-slate-800 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>

            <div className="text-sm text-slate-600">
              Range: {minValue} - {maxValue}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {maxValue}
              </div>
              <div className="text-sm text-slate-600">Maximum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {Math.round(
                  data.reduce((sum, d) => sum + d.value, 0) / data.length
                )}
              </div>
              <div className="text-sm text-slate-600">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {data.length}
              </div>
              <div className="text-sm text-slate-600">Data Points</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
