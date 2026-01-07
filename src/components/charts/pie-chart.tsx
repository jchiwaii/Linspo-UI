"use client";

import React, { useState } from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PieChartDataPoint {
  label: string;
  value: number;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  className?: string;
  title?: string;
  metric?: string;
  showLegend?: boolean;
  colors?: string[];
}

const defaultData: PieChartDataPoint[] = [
  { label: "Desktop", value: 45 },
  { label: "Mobile", value: 30 },
  { label: "Tablet", value: 15 },
  { label: "Other", value: 10 },
];

const defaultColors = [
  "hsl(221 83% 53%)",
  "hsl(160 60% 45%)",
  "hsl(30 80% 55%)",
  "hsl(280 65% 60%)",
  "hsl(340 75% 55%)",
];

export function PieChart({
  data = defaultData,
  className,
  title,
  metric = "Traffic Sources",
  showLegend = true,
  colors = defaultColors,
}: PieChartProps) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const getSlicePath = (
    startAngle: number,
    endAngle: number,
    outerRadius: number
  ) => {
    const startOuter = {
      x: 50 + outerRadius * Math.cos(startAngle - Math.PI / 2),
      y: 50 + outerRadius * Math.sin(startAngle - Math.PI / 2),
    };
    const endOuter = {
      x: 50 + outerRadius * Math.cos(endAngle - Math.PI / 2),
      y: 50 + outerRadius * Math.sin(endAngle - Math.PI / 2),
    };
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M 50 50 L ${startOuter.x} ${startOuter.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y} Z`;
  };

  let currentAngle = 0;
  const slices = data.map((point, index) => {
    const sliceAngle = (point.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    return {
      ...point,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
      percentage: ((point.value / total) * 100).toFixed(1),
    };
  });

  return (
    <div
      className={cn("bg-card border border-border rounded-xl p-6", className)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <PieChartIcon size={20} className="text-chart-1" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title || metric}</h3>
          <p className="text-sm text-muted-foreground">
            {data.length} segments
          </p>
        </div>
      </div>

      <div
        className={cn(
          "gap-8 items-center",
          showLegend ? "grid md:grid-cols-2" : "flex justify-center"
        )}
      >
        {/* Pie Chart */}
        <div className="relative aspect-square max-w-[280px] mx-auto">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            {slices.map((slice, index) => {
              const isHovered = hoveredSlice === index;
              const radius = isHovered ? 42 : 40;
              return (
                <path
                  key={index}
                  d={getSlicePath(slice.startAngle, slice.endAngle, radius)}
                  fill={slice.color}
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: hoveredSlice !== null && !isHovered ? 0.5 : 1,
                  }}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-semibold font-mono text-foreground">
                {hoveredSlice !== null
                  ? `${slices[hoveredSlice].percentage}%`
                  : total}
              </p>
              <p className="text-sm text-muted-foreground">
                {hoveredSlice !== null ? slices[hoveredSlice].label : "Total"}
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="space-y-3">
            {slices.map((slice, index) => {
              const isHovered = hoveredSlice === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer",
                    isHovered ? "bg-accent" : "hover:bg-accent/50"
                  )}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="font-medium text-foreground">
                      {slice.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-muted-foreground">
                      {slice.value}
                    </span>
                    <span className="font-mono font-semibold text-foreground w-12 text-right">
                      {slice.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PieChart;
