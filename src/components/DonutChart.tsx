"use client";

import React, { useState } from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import ComponentPage from "./ComponentPage";

interface DataPoint {
  label: string;
  value: number;
}

interface DonutChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  centerLabel?: string;
  centerValue?: string | number;
}

const defaultData: DataPoint[] = [
  { label: "Completed", value: 65 },
  { label: "In Progress", value: 20 },
  { label: "Pending", value: 10 },
  { label: "Cancelled", value: 5 },
];

const colors = [
  "hsl(221 83% 53%)",
  "hsl(160 60% 45%)",
  "hsl(30 80% 55%)",
  "hsl(340 75% 55%)",
  "hsl(280 65% 60%)",
];

export default function DonutChart({
  data = defaultData,
  title = "Donut Chart",
  subtitle = "Ring-style charts for displaying hierarchical and proportional data with inner labels.",
  metric = "Task Status",
  centerLabel = "Completion",
  centerValue,
}: DonutChartProps) {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const displayCenterValue = centerValue ?? `${((data[0]?.value / total) * 100).toFixed(0)}%`;

  const getSlicePath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const startOuter = { x: 50 + outerRadius * Math.cos(startAngle - Math.PI / 2), y: 50 + outerRadius * Math.sin(startAngle - Math.PI / 2) };
    const endOuter = { x: 50 + outerRadius * Math.cos(endAngle - Math.PI / 2), y: 50 + outerRadius * Math.sin(endAngle - Math.PI / 2) };
    const startInner = { x: 50 + innerRadius * Math.cos(endAngle - Math.PI / 2), y: 50 + innerRadius * Math.sin(endAngle - Math.PI / 2) };
    const endInner = { x: 50 + innerRadius * Math.cos(startAngle - Math.PI / 2), y: 50 + innerRadius * Math.sin(startAngle - Math.PI / 2) };
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${startOuter.x} ${startOuter.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y} L ${startInner.x} ${startInner.y} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y} Z`;
  };

  let currentAngle = 0;
  const slices = data.map((point, index) => {
    const sliceAngle = (point.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    return { ...point, startAngle, endAngle, color: colors[index % colors.length], percentage: ((point.value / total) * 100).toFixed(1) };
  });

  return (
    <ComponentPage title={title} subtitle={subtitle}>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <PieChartIcon size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{metric}</h3>
            <p className="text-sm text-muted-foreground">{data.length} categories</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square max-w-[280px] mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {slices.map((slice, index) => {
                const isHovered = hoveredSlice === index;
                const outerRadius = isHovered ? 42 : 40;
                const innerRadius = isHovered ? 26 : 24;
                return (
                  <path
                    key={index}
                    d={getSlicePath(slice.startAngle, slice.endAngle, outerRadius, innerRadius)}
                    fill={slice.color}
                    stroke="hsl(var(--background))"
                    strokeWidth="1"
                    className="transition-all duration-200 cursor-pointer"
                    style={{ opacity: hoveredSlice !== null && !isHovered ? 0.5 : 1 }}
                    onMouseEnter={() => setHoveredSlice(index)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-semibold data-value text-foreground">
                  {hoveredSlice !== null ? `${slices[hoveredSlice].percentage}%` : displayCenterValue}
                </p>
                <p className="text-sm text-muted-foreground">
                  {hoveredSlice !== null ? slices[hoveredSlice].label : centerLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {slices.map((slice, index) => {
              const isHovered = hoveredSlice === index;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer ${isHovered ? "bg-accent" : "hover:bg-accent/50"}`}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slice.color }} />
                    <span className="font-medium text-foreground">{slice.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="data-value text-muted-foreground">{slice.value}</span>
                    <span className="data-value font-semibold text-foreground w-12 text-right">{slice.percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}
