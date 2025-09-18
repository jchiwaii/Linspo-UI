"use client";

import React, { useState, useEffect } from "react";
import { PieChart as PieChartIcon } from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

const defaultData: DataPoint[] = [
  { label: "Desktop", value: 45.2, color: "#1e293b" },
  { label: "Mobile", value: 32.8, color: "#334155" },
  { label: "Tablet", value: 15.6, color: "#475569" },
  { label: "Other", value: 6.4, color: "#64748b" },
];

export default function DonutChart({
  data = defaultData,
  title = "Donut Chart Component",
  subtitle = "Donut charts with center labels and hover animations",
  metric = "Traffic Sources",
  centerLabel = "Total Users",
  centerValue = "2.4M",
  className = "",
}: DonutChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
  }>({});
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      data.forEach((point, index) => {
        newValues[index] = point.value;
      });
      setAnimatedValues(newValues);
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const total = data.reduce((sum, point) => sum + point.value, 0);
  let cumulativePercentage = 0;

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-4xl mx-auto px-4">
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
              <PieChartIcon size={24} className="text-slate-700" />
              <h3 className="text-xl font-semibold text-slate-900">{metric}</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {data[0]?.value}%
              </div>
              <div className="text-sm text-slate-600">Leading Source</div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-12">
            {/* Donut Chart */}
            <div className="relative">
              <svg
                className="w-64 h-64 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                {data.map((point, index) => {
                  const percentage = (point.value / total) * 100;
                  const strokeDasharray = `${percentage} ${100 - percentage}`;
                  const strokeDashoffset = -cumulativePercentage;
                  cumulativePercentage += percentage;

                  const isHovered = hoveredSegment === index;

                  return (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r={isHovered ? "37" : "35"}
                      fill="transparent"
                      stroke={point.color || `hsl(${index * 60}, 70%, 50%)`}
                      strokeWidth={isHovered ? "16" : "14"}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out cursor-pointer"
                      style={{
                        strokeDasharray: `${
                          ((animatedValues[index] || 0) / total) * 100
                        } ${
                          100 - ((animatedValues[index] || 0) / total) * 100
                        }`,
                        filter: isHovered
                          ? "drop-shadow(0 4px 8px rgba(0,0,0,0.2))"
                          : "none",
                      }}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                  );
                })}
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-light text-slate-900 mb-1">
                    {centerValue}
                  </div>
                  <div className="text-sm text-slate-600">{centerLabel}</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {data.map((point, index) => {
                const isHovered = hoveredSegment === index;
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      isHovered ? "bg-slate-50 scale-105" : "hover:bg-slate-50"
                    }`}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        isHovered ? "scale-125 shadow-lg" : ""
                      }`}
                      style={{
                        backgroundColor:
                          point.color || `hsl(${index * 60}, 70%, 50%)`,
                      }}
                    />
                    <div className="flex-1">
                      <div
                        className={`text-sm font-medium transition-all duration-300 ${
                          isHovered ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {point.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {((point.value / total) * 100).toFixed(1)}% of total
                      </div>
                    </div>
                    <div
                      className={`text-sm font-semibold transition-all duration-300 ${
                        isHovered
                          ? "text-slate-900 scale-110"
                          : "text-slate-600"
                      }`}
                    >
                      {point.value}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {data.length}
              </div>
              <div className="text-sm text-slate-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {Math.max(...data.map((d) => d.value)).toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600">Largest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {total.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600">Total</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
