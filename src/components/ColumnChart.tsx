"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import ComponentPage from "./ComponentPage";

interface DataPoint {
  label: string;
  value: number;
}

interface ColumnChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  currentValue?: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
}

const defaultData: DataPoint[] = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 62 },
  { label: "Wed", value: 78 },
  { label: "Thu", value: 55 },
  { label: "Fri", value: 89 },
  { label: "Sat", value: 72 },
  { label: "Sun", value: 58 },
];

export default function ColumnChart({
  data = defaultData,
  title = "Column Chart",
  subtitle = "Vertical column charts ideal for comparing values across categories with smooth hover effects.",
  metric = "Weekly Activity",
  currentValue,
  change = 12.4,
  changeType = "increase",
}: ColumnChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      data.forEach((_, index) => { newValues[index] = data[index].value; });
      setAnimatedValues(newValues);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  const maxValue = Math.max(...data.map((d) => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const average = Math.round(total / data.length);
  const displayValue = currentValue ?? total;

  return (
    <ComponentPage title={title} subtitle={subtitle}>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <BarChart3 size={20} className="text-chart-1" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{metric}</h3>
              <p className="text-sm text-muted-foreground">{data.length} days</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold data-value text-foreground">{displayValue}</p>
            {change !== undefined && (
              <div className={`flex items-center justify-end gap-1 text-sm font-medium ${changeType === "increase" ? "text-chart-2" : changeType === "decrease" ? "text-destructive" : "text-muted-foreground"}`}>
                {changeType === "increase" ? <TrendingUp size={14} /> : changeType === "decrease" ? <TrendingDown size={14} /> : null}
                <span>{change > 0 ? "+" : ""}{change}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative h-64 mt-8">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (<div key={i} className="border-t border-border border-dashed" style={{ opacity: 0.5 }} />))}
          </div>

          <div className="relative h-full flex items-end justify-between gap-3 px-2">
            {data.map((point, index) => {
              const height = ((animatedValues[index] || 0) / maxValue) * 100;
              const isHovered = hoveredBar === index;
              return (
                <div key={index} className="relative flex-1 flex flex-col items-center cursor-pointer" onMouseEnter={() => setHoveredBar(index)} onMouseLeave={() => setHoveredBar(null)}>
                  {isHovered && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-sm z-10 whitespace-nowrap">
                      <p className="font-medium">{point.label}</p>
                      <p className="data-value text-chart-1">{point.value}</p>
                    </div>
                  )}
                  <div className={`w-full rounded-t-md transition-all duration-500 ease-out ${isHovered ? "bg-chart-1" : "bg-chart-1/80"}`} style={{ height: `${height}%` }} />
                </div>
              );
            })}
          </div>

          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-2">
            {data.map((point, index) => (<span key={index} className="flex-1 text-center text-xs text-muted-foreground">{point.label}</span>))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{maxValue}</p>
            <p className="text-sm text-muted-foreground">Peak</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{average}</p>
            <p className="text-sm text-muted-foreground">Average</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}
