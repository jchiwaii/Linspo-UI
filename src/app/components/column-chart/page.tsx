"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import ColumnChart from "@/components/ColumnChart";

const code = `"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPoint {
  label: string;
  value: number;
}

interface ColumnChartProps {
  data?: DataPoint[];
  metric?: string;
  currentValue?: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  className?: string;
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

export function ColumnChart({
  data = defaultData,
  metric = "Weekly Activity",
  currentValue,
  change = 12.4,
  changeType = "increase",
  className,
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
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
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
          <p className="text-2xl font-semibold font-mono text-foreground">{displayValue}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center justify-end gap-1 text-sm font-medium",
              changeType === "increase" && "text-chart-2",
              changeType === "decrease" && "text-destructive"
            )}>
              {changeType === "increase" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{change > 0 ? "+" : ""}{change}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative h-64 mt-8">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-t border-border border-dashed opacity-50" />
          ))}
        </div>

        <div className="relative h-full flex items-end justify-between gap-3 px-2">
          {data.map((point, index) => {
            const height = ((animatedValues[index] || 0) / maxValue) * 100;
            const isHovered = hoveredBar === index;
            return (
              <div
                key={index}
                className="relative flex-1 flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-sm z-10 whitespace-nowrap">
                    <p className="font-medium">{point.label}</p>
                    <p className="font-mono text-chart-1">{point.value}</p>
                  </div>
                )}
                <div
                  className={cn(
                    "w-full rounded-t-md transition-all duration-500 ease-out",
                    isHovered ? "bg-chart-1" : "bg-chart-1/80"
                  )}
                  style={{ height: \`\${height}%\` }}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-2">
          {data.map((point, index) => (
            <span key={index} className="flex-1 text-center text-xs text-muted-foreground">
              {point.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xl font-semibold font-mono text-foreground">{maxValue}</p>
          <p className="text-sm text-muted-foreground">Peak</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold font-mono text-foreground">{average}</p>
          <p className="text-sm text-muted-foreground">Average</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold font-mono text-foreground">{total}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "data",
    type: "DataPoint[]",
    description: "Array of data points with label and value properties.",
  },
  {
    name: "metric",
    type: "string",
    default: '"Weekly Activity"',
    description: "Label for the metric being displayed.",
  },
  {
    name: "currentValue",
    type: "string | number",
    description: "Override value displayed in the header (defaults to total).",
  },
  {
    name: "change",
    type: "number",
    default: "12.4",
    description: "Percentage change to display.",
  },
  {
    name: "changeType",
    type: '"increase" | "decrease" | "neutral"',
    default: '"increase"',
    description: "Type of change, affects indicator color.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply.",
  },
];

export default function ColumnChartPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Column Chart"
          description="Vertical column charts ideal for comparing values across categories with smooth hover effects and animations."
          code={code}
          category="Charts"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add column-chart"
          props={props}
        >
          <div className="w-full max-w-lg">
            <ColumnChart />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
