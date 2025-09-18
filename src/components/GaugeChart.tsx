"use client";

import React, { useState, useEffect } from "react";
import { Gauge } from "lucide-react";

interface GaugeChartProps {
  value?: number;
  min?: number;
  max?: number;
  title?: string;
  subtitle?: string;
  label?: string;
  unit?: string;
  thresholds?: { value: number; color: string; label: string }[];
  className?: string;
}

const defaultThresholds = [
  { value: 30, color: "#ef4444", label: "Low" },
  { value: 70, color: "#f59e0b", label: "Medium" },
  { value: 100, color: "#10b981", label: "High" },
];

export default function GaugeChart({
  value = 75,
  min = 0,
  max = 100,
  title = "Gauge Chart Component",
  subtitle = "Circular gauge charts for KPIs and progress indicators",
  label = "Performance Score",
  unit = "%",
  thresholds = defaultThresholds,
  className = "",
}: GaugeChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = ((animatedValue - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180; // Half circle
  const radius = 80;
  const strokeWidth = 12;

  // Calculate needle position (variables used in SVG below)

  // Get current threshold color
  const getCurrentColor = () => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (animatedValue >= thresholds[i].value) {
        return thresholds[i].color;
      }
    }
    return thresholds[0].color;
  };

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
              <Gauge size={24} className="text-slate-700" />
              <h3 className="text-xl font-semibold text-slate-900">{label}</h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-slate-900">
                {animatedValue}
                {unit}
              </div>
              <div className="text-sm text-slate-600">Current Value</div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {/* Gauge SVG */}
            <div className="relative">
              <svg
                width="300"
                height="200"
                viewBox="0 0 200 120"
                className="overflow-visible"
              >
                {/* Background arc */}
                <path
                  d={`M 20 100 A 80 80 0 0 1 180 100`}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                />

                {/* Threshold segments */}
                {thresholds.map((threshold, index) => {
                  const prevThreshold =
                    index > 0 ? thresholds[index - 1].value : min;
                  const segmentStart =
                    ((prevThreshold - min) / (max - min)) * 180;
                  const segmentEnd =
                    ((threshold.value - min) / (max - min)) * 180;
                  const segmentAngle = segmentEnd - segmentStart;

                  const startAngle = segmentStart * (Math.PI / 180);
                  const endAngle = segmentEnd * (Math.PI / 180);

                  const x1 = 100 + Math.cos(startAngle - Math.PI / 2) * radius;
                  const y1 = 100 + Math.sin(startAngle - Math.PI / 2) * radius;
                  const x2 = 100 + Math.cos(endAngle - Math.PI / 2) * radius;
                  const y2 = 100 + Math.sin(endAngle - Math.PI / 2) * radius;

                  const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                  return (
                    <path
                      key={index}
                      d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                      fill="none"
                      stroke={threshold.color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      className="opacity-30"
                    />
                  );
                })}

                {/* Progress arc */}
                <path
                  d={`M 20 100 A 80 80 0 0 1 ${
                    100 + Math.cos(((angle - 90) * Math.PI) / 180) * radius
                  } ${100 + Math.sin(((angle - 90) * Math.PI) / 180) * radius}`}
                  fill="none"
                  stroke={getCurrentColor()}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  className="transition-all duration-2000 ease-out"
                  style={{
                    strokeDasharray: `${(percentage / 100) * 251.2} 251.2`,
                    strokeDashoffset: 0,
                  }}
                />

                {/* Needle */}
                <g
                  className="transition-all duration-2000 ease-out"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "100px 100px",
                  }}
                >
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="30"
                    stroke="#1e293b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="100" r="6" fill="#1e293b" />
                </g>

                {/* Scale markers */}
                {[0, 25, 50, 75, 100].map((mark) => {
                  const markAngle = (mark / 100) * 180 - 90;
                  const markRadians = markAngle * (Math.PI / 180);
                  const innerRadius = radius - strokeWidth - 5;
                  const outerRadius = radius - strokeWidth + 5;

                  const x1 = 100 + Math.cos(markRadians) * innerRadius;
                  const y1 = 100 + Math.sin(markRadians) * innerRadius;
                  const x2 = 100 + Math.cos(markRadians) * outerRadius;
                  const y2 = 100 + Math.sin(markRadians) * outerRadius;

                  return (
                    <g key={mark}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#64748b"
                        strokeWidth="2"
                      />
                      <text
                        x={100 + Math.cos(markRadians) * (innerRadius - 10)}
                        y={100 + Math.sin(markRadians) * (innerRadius - 10)}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-slate-600 text-xs font-medium"
                      >
                        {Math.round((mark / 100) * (max - min) + min)}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Center value display */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-3xl font-light text-slate-900">
                  {animatedValue}
                  {unit}
                </div>
                <div className="text-sm text-slate-600">{label}</div>
              </div>
            </div>

            {/* Threshold legend */}
            <div className="flex items-center justify-center space-x-6 mt-8">
              {thresholds.map((threshold, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: threshold.color }}
                  />
                  <span className="text-sm text-slate-600">
                    {threshold.label} (
                    {index > 0 ? thresholds[index - 1].value : min}-
                    {threshold.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">{min}</div>
              <div className="text-sm text-slate-600">Minimum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">{max}</div>
              <div className="text-sm text-slate-600">Maximum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-slate-900">
                {percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-600">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
