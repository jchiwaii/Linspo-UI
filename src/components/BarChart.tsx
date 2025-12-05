"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import ComponentPage from "./ComponentPage";

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  currentValue?: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  showLabels?: boolean;
}

const defaultData: DataPoint[] = [
  { label: "Mobile", value: 65 },
  { label: "Desktop", value: 85 },
  { label: "Tablet", value: 45 },
  { label: "Web App", value: 92 },
  { label: "API", value: 78 },
  { label: "Other", value: 56 },
];

export default function BarChart({
  data = defaultData,
  title = "Bar Chart",
  subtitle = "Interactive bar charts with smooth animations and hover effects for comparing categorical data.",
  metric = "User Engagement",
  currentValue,
  change = 8.2,
  changeType = "increase",
  showLabels = true,
}: BarChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      data.forEach((_, index) => {
        newValues[index] = data[index].value;
      });
      setAnimatedValues(newValues);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map((d) => d.value));
  const average = Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length);
  const displayValue = currentValue ?? `${average}%`;

  return (
    <ComponentPage title={title} subtitle={subtitle}>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <BarChart3 size={20} className="text-chart-1" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{metric}</h3>
              <p className="text-sm text-muted-foreground">{data.length} categories</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold data-value text-foreground">{displayValue}</p>
            {change !== undefined && (
              <div className={`flex items-center justify-end gap-1 text-sm font-medium ${changeType === "increase" ? "text-chart-2" : changeType === "decrease" ? "text-destructive" : "text-muted-foreground"
                }`}>
                {changeType === "increase" ? <TrendingUp size={14} /> : changeType === "decrease" ? <TrendingDown size={14} /> : null}
                <span>{change > 0 ? "+" : ""}{change}%</span>
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
              <div key={index} className="group cursor-pointer" onMouseEnter={() => setHoveredBar(index)} onMouseLeave={() => setHoveredBar(null)}>
                {showLabels && (
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-sm font-medium transition-colors duration-200 ${isHovered ? "text-foreground" : "text-muted-foreground"}`}>{point.label}</span>
                    <span className={`text-sm data-value transition-all duration-200 ${isHovered ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{point.value}%</span>
                  </div>
                )}
                <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                  <div className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ease-out ${isHovered ? "bg-chart-1" : "bg-chart-1/80"}`} style={{ width: `${width}%` }} />
                  {isHovered && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{maxValue}%</p>
            <p className="text-sm text-muted-foreground">Highest</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{data.length}</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{average}%</p>
            <p className="text-sm text-muted-foreground">Average</p>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}
