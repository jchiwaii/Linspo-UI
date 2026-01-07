"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import { AreaChart } from "@/components/charts/area-chart";

const sampleData = [
  { label: "Jan", value: 2400 },
  { label: "Feb", value: 1398 },
  { label: "Mar", value: 9800 },
  { label: "Apr", value: 3908 },
  { label: "May", value: 4800 },
  { label: "Jun", value: 3800 },
  { label: "Jul", value: 4300 },
  { label: "Aug", value: 5200 },
];

const code = `"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AreaChartDataPoint {
  label: string;
  value: number;
}

export interface AreaChartProps {
  data: AreaChartDataPoint[];
  className?: string;
  title?: string;
  metric?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  showStats?: boolean;
  animated?: boolean;
  color?: string;
}

export function AreaChart({
  data,
  className,
  title,
  metric = "Total Volume",
  change,
  changeType = "increase",
  showStats = true,
  animated = true,
  color = "hsl(160 60% 45%)",
}: AreaChartProps) {
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

  const getY = (value: number) => {
    const padding = range * 0.1;
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
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
            <Activity size={20} className="text-chart-2" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title || metric}</h3>
            <p className="text-sm text-muted-foreground">Last {data.length} periods</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold font-mono text-foreground">
            {total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="relative h-64 mt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          <polygon fill="url(#areaGradient)" points={areaPoints} />
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "data",
    type: "AreaChartDataPoint[]",
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
    default: '"Total Volume"',
    description: "Label for the metric being displayed.",
  },
  {
    name: "showStats",
    type: "boolean",
    default: "true",
    description: "Whether to show the stats footer.",
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
    default: '"hsl(160 60% 45%)"',
    description: "Color of the area fill and line.",
  },
];

export default function AreaChartPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Area Chart"
          description="Area charts for visualizing volume and cumulative trends over time with smooth gradient fills."
          code={code}
          category="Charts"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add area-chart"
          props={props}
        >
          <div className="w-full max-w-lg">
            <AreaChart data={sampleData} change={15.3} />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
