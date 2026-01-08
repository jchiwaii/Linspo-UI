"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import Heatmap from "@/components/Heatmap";

const code = `"use client";

import React, { useState } from "react";
import { Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeatmapProps {
  data?: number[][];
  xLabels?: string[];
  yLabels?: string[];
  metric?: string;
  className?: string;
}

const defaultData = [
  [5, 12, 8, 15, 6, 10, 4],
  [8, 18, 12, 20, 10, 14, 7],
  [3, 8, 6, 12, 4, 8, 2],
  [10, 22, 15, 25, 12, 18, 9],
  [6, 14, 10, 18, 8, 12, 5],
];

const defaultXLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultYLabels = ["Morning", "Late AM", "Noon", "Afternoon", "Evening"];

export function Heatmap({
  data = defaultData,
  xLabels = defaultXLabels,
  yLabels = defaultYLabels,
  metric = "Activity Heatmap",
  className,
}: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const flatData = data.flat();
  const maxValue = Math.max(...flatData);
  const minValue = Math.min(...flatData);
  const total = flatData.reduce((sum, v) => sum + v, 0);
  const average = Math.round(total / flatData.length);

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    const hue = 221;
    const saturation = 83;
    const lightness = 90 - normalized * 50;
    return \`hsl(\${hue} \${saturation}% \${lightness}%)\`;
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <Grid3X3 size={20} className="text-chart-1" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{metric}</h3>
          <p className="text-sm text-muted-foreground">{yLabels.length} × {xLabels.length} grid</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex ml-20 mb-2">
            {xLabels.map((label, index) => (
              <div key={index} className="flex-1 text-center text-xs text-muted-foreground">{label}</div>
            ))}
          </div>

          <div className="space-y-1">
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2">
                <div className="w-16 text-right text-xs text-muted-foreground pr-2">{yLabels[rowIndex]}</div>
                <div className="flex flex-1 gap-1">
                  {row.map((value, colIndex) => {
                    const isHovered = hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;
                    return (
                      <div
                        key={colIndex}
                        className={cn(
                          "relative flex-1 aspect-square rounded-md cursor-pointer transition-all duration-200",
                          isHovered && "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-105"
                        )}
                        style={{ backgroundColor: getColor(value) }}
                        onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {isHovered && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-sm z-10 whitespace-nowrap">
                            <p className="font-medium">{xLabels[colIndex]}, {yLabels[rowIndex]}</p>
                            <p className="font-mono text-chart-1">{value}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs text-muted-foreground">{minValue}</span>
          <div className="h-3 w-40 rounded" style={{ background: \`linear-gradient(to right, \${getColor(minValue)}, \${getColor(maxValue)})\` }} />
          <span className="text-xs text-muted-foreground">{maxValue}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-xl font-semibold font-mono text-foreground">{maxValue}</p>
          <p className="text-sm text-muted-foreground">Maximum</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold font-mono text-foreground">{average}</p>
          <p className="text-sm text-muted-foreground">Average</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold font-mono text-foreground">{minValue}</p>
          <p className="text-sm text-muted-foreground">Minimum</p>
        </div>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "data",
    type: "number[][]",
    description: "2D array of numeric values for the heatmap cells.",
  },
  {
    name: "xLabels",
    type: "string[]",
    description: "Labels for the x-axis (columns).",
  },
  {
    name: "yLabels",
    type: "string[]",
    description: "Labels for the y-axis (rows).",
  },
  {
    name: "metric",
    type: "string",
    default: '"Activity Heatmap"',
    description: "Label for the metric being displayed.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply.",
  },
];

export default function HeatmapPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Heatmap"
          description="Color-coded matrix visualization for patterns and data density across two dimensions with interactive tooltips and gradient legend."
          code={code}
          category="Charts"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add heatmap"
          props={props}
        >
          <div className="w-full max-w-xl">
            <Heatmap />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
