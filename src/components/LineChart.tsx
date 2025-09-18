"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Activity } from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  className?: string;
}

const defaultData: DataPoint[] = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 102 },
  { label: "Aug", value: 94 },
];

export default function LineChart({
  data = defaultData,
  title = "Line Chart Component",
  subtitle = "Smooth animated line charts for time series data visualization",
  metric = "Revenue Growth",
  change = 12.5,
  changeType = "increase",
  className = "",
}: LineChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
  }>({});

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
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const normalizedValue =
        range > 0
          ? ((animatedValues[index] || minValue) - minValue) / range
          : 0.5;
      const y = 100 - (normalizedValue * 70 + 15); // 15% padding top/bottom
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-4xl mx-auto px-4">
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
              <Activity size={24} className="text-slate-700" />
              <h3 className="text-xl font-semibold text-slate-900">{metric}</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {data[data.length - 1]?.value}
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
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="0.5"
                  />
                </pattern>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Area fill */}
              <polygon
                fill="url(#gradient)"
                points={areaPoints}
                className="transition-all duration-1500 ease-out"
              />

              {/* Line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                points={points}
                className="transition-all duration-1500 ease-out"
              />

              {/* Points */}
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const normalizedValue =
                  range > 0
                    ? ((animatedValues[index] || minValue) - minValue) / range
                    : 0.5;
                const y = 100 - (normalizedValue * 70 + 15);
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-1500 ease-out hover:r-6 cursor-pointer"
                    />
                    {/* Tooltip on hover */}
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      className="fill-slate-700 text-xs font-medium opacity-0 hover:opacity-100 transition-opacity duration-300"
                    >
                      {point.value}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-sm text-slate-500">
              {data.map((point, index) => (
                <span key={index} className="text-center">
                  {point.label}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {maxValue}
              </div>
              <div className="text-sm text-slate-600">Peak</div>
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
                {minValue}
              </div>
              <div className="text-sm text-slate-600">Minimum</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
