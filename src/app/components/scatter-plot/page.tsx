"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import ScatterPlot from "@/components/ScatterPlot";

const code = `"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

interface ScatterPlotProps {
  data?: DataPoint[];
  metric?: string;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

const defaultData: DataPoint[] = [
  { x: 15, y: 25, label: "A" }, { x: 25, y: 55, label: "B" }, { x: 35, y: 35, label: "C" },
  { x: 40, y: 70, label: "D" }, { x: 50, y: 45, label: "E" }, { x: 55, y: 80, label: "F" },
  { x: 65, y: 60, label: "G" }, { x: 70, y: 85, label: "H" }, { x: 75, y: 50, label: "I" },
  { x: 85, y: 75, label: "J" }, { x: 45, y: 30, label: "K" }, { x: 60, y: 65, label: "L" },
];

export function ScatterPlot({
  data = defaultData,
  metric = "Correlation Analysis",
  xLabel = "X Axis",
  yLabel = "Y Axis",
  className,
}: ScatterPlotProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);
  const minX = Math.min(...xValues), maxX = Math.max(...xValues);
  const minY = Math.min(...yValues), maxY = Math.max(...yValues);

  const normalizeX = (x: number) => ((x - minX) / (maxX - minX)) * 90 + 5;
  const normalizeY = (y: number) => 95 - ((y - minY) / (maxY - minY)) * 90;

  const avgX = xValues.reduce((a, b) => a + b, 0) / xValues.length;
  const avgY = yValues.reduce((a, b) => a + b, 0) / yValues.length;
  const covariance = data.reduce((sum, d) => sum + (d.x - avgX) * (d.y - avgY), 0) / data.length;
  const stdX = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.x - avgX, 2), 0) / data.length);
  const stdY = Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.y - avgY, 2), 0) / data.length);
  const correlation = (covariance / (stdX * stdY)).toFixed(2);

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
            <Sparkles size={20} className="text-chart-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{metric}</h3>
            <p className="text-sm text-muted-foreground">{data.length} data points</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold font-mono text-foreground">{correlation}</p>
          <p className="text-sm text-muted-foreground">Correlation</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground whitespace-nowrap origin-center">{yLabel}</div>

        <div className="ml-6">
          <div className="relative aspect-square max-h-80">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <g className="text-border">
                {[0, 25, 50, 75, 100].map((v) => (
                  <React.Fragment key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                    <line y1={v} x1="0" y2={v} x2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                  </React.Fragment>
                ))}
              </g>

              {data.map((point, index) => {
                const x = normalizeX(point.x);
                const y = normalizeY(point.y);
                const isHovered = hoveredPoint === index;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={isHovered ? "4" : "3"}
                    fill="hsl(280 65% 60%)"
                    stroke="hsl(var(--background))"
                    strokeWidth="1.5"
                    className="transition-all duration-200 cursor-pointer"
                    style={{ opacity: hoveredPoint !== null && !isHovered ? 0.4 : 1 }}
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                );
              })}
            </svg>

            {hoveredPoint !== null && (
              <div
                className="absolute bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-sm z-10 pointer-events-none"
                style={{ left: \`\${normalizeX(data[hoveredPoint].x)}%\`, top: \`\${normalizeY(data[hoveredPoint].y)}%\`, transform: "translate(-50%, -120%)" }}
              >
                {data[hoveredPoint].label && <p className="font-medium">{data[hoveredPoint].label}</p>}
                <p className="font-mono">{xLabel}: {data[hoveredPoint].x}</p>
                <p className="font-mono">{yLabel}: {data[hoveredPoint].y}</p>
              </div>
            )}
          </div>
          <div className="text-center text-xs text-muted-foreground mt-4">{xLabel}</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">{data.length}</p>
          <p className="text-xs text-muted-foreground">Points</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">{Math.round(avgX)}</p>
          <p className="text-xs text-muted-foreground">Avg X</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">{Math.round(avgY)}</p>
          <p className="text-xs text-muted-foreground">Avg Y</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">{correlation}</p>
          <p className="text-xs text-muted-foreground">R Value</p>
        </div>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "data",
    type: "DataPoint[]",
    description: "Array of data points with x, y coordinates and optional label.",
  },
  {
    name: "metric",
    type: "string",
    default: '"Correlation Analysis"',
    description: "Label for the metric being displayed.",
  },
  {
    name: "xLabel",
    type: "string",
    default: '"X Axis"',
    description: "Label for the x-axis.",
  },
  {
    name: "yLabel",
    type: "string",
    default: '"Y Axis"',
    description: "Label for the y-axis.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply.",
  },
];

export default function ScatterPlotPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Scatter Plot"
          description="Interactive scatter plots for correlation analysis and distribution patterns with automatic correlation calculation and interactive data points."
          code={code}
          category="Charts"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add scatter-plot"
          props={props}
        >
          <div className="w-full max-w-lg">
            <ScatterPlot />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
