"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BarChartDataPoint {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  className?: string;
  title?: string;
  showLabels?: boolean;
  showStats?: boolean;
  metric?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  animated?: boolean;
}

const defaultData: BarChartDataPoint[] = [
  { label: "Mobile", value: 65 },
  { label: "Desktop", value: 85 },
  { label: "Tablet", value: 45 },
  { label: "Web App", value: 92 },
  { label: "API", value: 78 },
  { label: "Other", value: 56 },
];

export function BarChart({
  data = defaultData,
  className,
  title,
  showLabels = true,
  showStats = true,
  metric = "User Engagement",
  change,
  changeType = "increase",
  animated = true,
}: BarChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>(
    animated ? {} : Object.fromEntries(data.map((d, i) => [i, d.value]))
  );
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    if (!animated) return;
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      data.forEach((_, index) => {
        newValues[index] = data[index].value;
      });
      setAnimatedValues(newValues);
    }, 100);
    return () => clearTimeout(timer);
  }, [data, animated]);

  const maxValue = Math.max(...data.map((d) => d.value));
  const average = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length);

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <BarChart3 size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title || metric}</h3>
            <p className="text-sm text-muted-foreground">{data.length} categories</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-foreground font-mono">{average}%</p>
          {change !== undefined && (
            <div
              className={cn(
                "flex items-center justify-end gap-1 text-sm font-medium",
                changeType === "increase" && "text-chart-2",
                changeType === "decrease" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {changeType === "increase" ? (
                <TrendingUp size={14} />
              ) : changeType === "decrease" ? (
                <TrendingDown size={14} />
              ) : null}
              <span>
                {change > 0 ? "+" : ""}
                {change}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {data.map((point, index) => {
          const width = ((animatedValues[index] || 0) / maxValue) * 100;
          const isHovered = hoveredBar === index;

          return (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {showLabels && (
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isHovered ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {point.label}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-mono transition-all duration-200",
                      isHovered ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                  >
                    {point.value}%
                  </span>
                </div>
              )}
              <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ease-out",
                    isHovered ? "bg-chart-1" : "bg-chart-1/80"
                  )}
                  style={{ width: `${width}%` }}
                />
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-semibold font-mono text-foreground">{maxValue}%</p>
            <p className="text-sm text-muted-foreground">Highest</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold font-mono text-foreground">{data.length}</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold font-mono text-foreground">{average}%</p>
            <p className="text-sm text-muted-foreground">Average</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarChart;
