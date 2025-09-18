"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp } from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ColumnChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  className?: string;
}

const defaultData: DataPoint[] = [
  { label: "Q1", value: 85, color: "#1e293b" },
  { label: "Q2", value: 92, color: "#334155" },
  { label: "Q3", value: 78, color: "#475569" },
  { label: "Q4", value: 96, color: "#64748b" },
  { label: "Q1", value: 88, color: "#94a3b8" },
  { label: "Q2", value: 94, color: "#cbd5e1" },
];

export default function ColumnChart({
  data = defaultData,
  title = "Column Chart Component",
  subtitle = "Vertical column charts with grouping and stacking capabilities",
  metric = "Quarterly Performance",
  change = 11.2,
  changeType = "increase",
  className = "",
}: ColumnChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
  }>({});
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

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

  const maxValue = Math.max(...data.map((d) => d.value));

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
              <BarChart3 size={24} className="text-slate-700" />
              <h3 className="text-xl font-semibold text-slate-900">{metric}</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {Math.round(
                  data.reduce((sum, d) => sum + d.value, 0) / data.length
                )}
              </div>
              {change !== undefined && (
                <div
                  className={`text-sm font-medium flex items-center justify-end space-x-1 ${
                    changeType === "increase"
                      ? "text-emerald-600"
                      : changeType === "decrease"
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  <TrendingUp
                    size={16}
                    className={changeType === "decrease" ? "rotate-180" : ""}
                  />
                  <span>
                    {change > 0 ? "+" : ""}
                    {change}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative h-80">
            <div className="flex items-end justify-between h-full space-x-4 px-4">
              {data.map((point, index) => {
                const height = ((animatedValues[index] || 0) / maxValue) * 100;
                const isHovered = hoveredColumn === index;

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                    onMouseEnter={() => setHoveredColumn(index)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="relative w-full max-w-16">
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-10">
                          {point.label}: {point.value}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                        </div>
                      )}

                      {/* Column */}
                      <div
                        className={`w-full rounded-t-lg transition-all duration-1500 ease-out cursor-pointer ${
                          isHovered ? "shadow-lg scale-105" : ""
                        }`}
                        style={{
                          height: `${height}%`,
                          backgroundColor: point.color || "#64748b",
                          background: isHovered
                            ? `linear-gradient(180deg, ${
                                point.color || "#64748b"
                              }, ${point.color || "#64748b"}dd)`
                            : point.color || "#64748b",
                        }}
                      />

                      {/* Value label */}
                      <div
                        className={`text-center mt-2 text-sm font-semibold transition-all duration-300 ${
                          isHovered
                            ? "text-slate-900 scale-110"
                            : "text-slate-600"
                        }`}
                      >
                        {point.value}
                      </div>
                    </div>

                    {/* X-axis label */}
                    <div className="text-center mt-2 text-sm text-slate-500">
                      {point.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Y-axis grid lines */}
            <div className="absolute inset-0 pointer-events-none">
              {[0, 25, 50, 75, 100].map((percentage) => (
                <div
                  key={percentage}
                  className="absolute left-0 right-0 border-t border-slate-200"
                  style={{ bottom: `${percentage}%` }}
                >
                  <span className="absolute -left-12 -top-2 text-xs text-slate-500">
                    {Math.round((percentage / 100) * maxValue)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {maxValue}
              </div>
              <div className="text-sm text-slate-600">Highest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {data.length}
              </div>
              <div className="text-sm text-slate-600">Columns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {Math.round(
                  data.reduce((sum, d) => sum + d.value, 0) / data.length
                )}
              </div>
              <div className="text-sm text-slate-600">Average</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
