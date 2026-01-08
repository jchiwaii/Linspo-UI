"use client";

import React, { useState, useEffect } from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value?: number;
  min?: number;
  max?: number;
  metric?: string;
  unit?: string;
  thresholds?: { value: number; color: string; label: string }[];
  className?: string;
}

const defaultThresholds = [
  { value: 30, color: "hsl(0 84% 60%)", label: "Low" },
  { value: 70, color: "hsl(30 80% 55%)", label: "Medium" },
  { value: 100, color: "hsl(160 60% 45%)", label: "High" },
];

export default function GaugeChart({
  value = 72,
  min = 0,
  max = 100,
  metric = "Performance Score",
  unit = "%",
  thresholds = defaultThresholds,
  className,
}: GaugeChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = ((animatedValue - min) / (max - min)) * 100;
  const angle = (percentage / 100) * 180;

  const currentThreshold =
    thresholds.find((t, i) => {
      const prevValue = i === 0 ? 0 : thresholds[i - 1].value;
      return percentage > prevValue && percentage <= t.value;
    }) || thresholds[thresholds.length - 1];

  const arcPath = (startAngle: number, endAngle: number, radius: number) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const start = {
      x: 50 + radius * Math.cos(startRad),
      y: 50 + radius * Math.sin(startRad),
    };
    const end = {
      x: 50 + radius * Math.cos(endRad),
      y: 50 + radius * Math.sin(endRad),
    };
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <Gauge size={20} className="text-chart-1" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{metric}</h3>
          <p className="text-sm text-muted-foreground">Current reading</p>
        </div>
      </div>

      <div className="max-w-[320px] mx-auto">
        <div className="relative aspect-[2/1]">
          <svg viewBox="0 0 100 55" className="w-full">
            <path
              d={arcPath(0, 180, 40)}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d={arcPath(0, angle, 40)}
              fill="none"
              stroke={currentThreshold.color}
              strokeWidth="8"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {[0, 45, 90, 135, 180].map((deg) => {
              const rad = ((deg - 90) * Math.PI) / 180;
              const inner = {
                x: 50 + 32 * Math.cos(rad),
                y: 50 + 32 * Math.sin(rad),
              };
              const outer = {
                x: 50 + 36 * Math.cos(rad),
                y: 50 + 36 * Math.sin(rad),
              };
              return (
                <line
                  key={deg}
                  x1={inner.x}
                  y1={inner.y}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <p className="text-4xl font-semibold font-mono text-foreground">
              {animatedValue}
              <span className="text-xl text-muted-foreground">{unit}</span>
            </p>
            <p className="text-sm text-muted-foreground" style={{ color: currentThreshold.color }}>
              {currentThreshold.label}
            </p>
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-border">
        {thresholds.map((threshold, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: threshold.color }} />
            <span className="text-sm text-muted-foreground">{threshold.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
