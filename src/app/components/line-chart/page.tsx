"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import { LineChart } from "@/components/charts/line-chart";

const sampleData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 102 },
  { label: "Aug", value: 94 },
];

const code = `"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LineChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  className?: string;
  title?: string;
  metric?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  showGrid?: boolean;
  showDots?: boolean;
  areaFill?: boolean;
  animated?: boolean;
  color?: string;
}

export function LineChart({
  data,
  className,
  title,
  metric = "Revenue Growth",
  change,
  changeType = "increase",
  showGrid = true,
  showDots = true,
  areaFill = true,
  animated = true,
  color = "hsl(221 83% 53%)",
}: LineChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>(
    animated ? {} : Object.fromEntries(data.map((d, i) => [i, d.value]))
  );
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

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
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const padding = range * 0.15;

  const getY = (value: number) => {
    return 100 - ((value - minValue + padding) / (range + padding * 2)) * 100;
  };

  const points = data
    .map((_, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = getY(animatedValues[index] ?? minValue);
      return \`\${x},\${y}\`;
    })
    .join(" ");

  const areaPoints = \`0,100 \${points} 100,100\`;

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <Activity size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title || metric}</h3>
            <p className="text-sm text-muted-foreground">Last {data.length} periods</p>
          </div>
        </div>
      </div>

      {/* Chart SVG */}
      <div className="relative h-64 mt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {showGrid && (
            <g className="text-border">
              {[0, 25, 50, 75, 100].map((y) => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
              ))}
            </g>
          )}

          {areaFill && (
            <polygon fill="url(#lineChartGradient)" points={areaPoints} />
          )}

          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {showDots && data.map((_, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = getY(animatedValues[index] ?? minValue);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={hoveredPoint === index ? "4" : "3"}
                fill={color}
                stroke="hsl(var(--background))"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "data",
    type: "LineChartDataPoint[]",
    required: true,
    description: "Array of data points with label and value properties.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the container.",
  },
  {
    name: "title",
    type: "string",
    description: "Title displayed in the chart header.",
  },
  {
    name: "metric",
    type: "string",
    default: '"Revenue Growth"',
    description: "Label for the metric being displayed.",
  },
  {
    name: "showGrid",
    type: "boolean",
    default: "true",
    description: "Whether to show grid lines.",
  },
  {
    name: "showDots",
    type: "boolean",
    default: "true",
    description: "Whether to show data point dots.",
  },
  {
    name: "areaFill",
    type: "boolean",
    default: "true",
    description: "Whether to fill the area under the line.",
  },
  {
    name: "animated",
    type: "boolean",
    default: "true",
    description: "Whether to animate on mount.",
  },
  {
    name: "color",
    type: "string",
    default: '"hsl(221 83% 53%)"',
    description: "Color of the line and fill gradient.",
  },
];

export default function LineChartPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Line Chart"
          description="Smooth animated line charts for time-series data visualization with clean, minimal styling."
          code={code}
          category="Charts"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add line-chart"
          props={props}
        >
          <div className="w-full max-w-lg">
            <LineChart data={sampleData} change={12.5} />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
