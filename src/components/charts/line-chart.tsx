"use client";

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

const defaultData: LineChartDataPoint[] = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 102 },
  { label: "Aug", value: 94 },
];

export function LineChart({
  data = defaultData,
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
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
  }>(animated ? {} : Object.fromEntries(data.map((d, i) => [i, d.value])));
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
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;
  const displayValue = data[data.length - 1]?.value ?? 0;

  return (
    <div
      className={cn("bg-card border border-border rounded-xl p-6", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <Activity size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title || metric}</h3>
            <p className="text-sm text-muted-foreground">
              Last {data.length} periods
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold font-mono text-foreground">
            {displayValue}
          </p>
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

      {/* Chart */}
      <div className="relative h-64 mt-4">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {showGrid && (
            <g className="text-border">
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                />
              ))}
            </g>
          )}

          <defs>
            <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {areaFill && (
            <polygon
              fill="url(#lineChartGradient)"
              points={areaPoints}
              className="transition-all duration-700 ease-out"
            />
          )}

          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            className="transition-all duration-700 ease-out"
          />

          {showDots &&
            data.map((_, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = getY(animatedValues[index] ?? minValue);
              const isHovered = hoveredPoint === index;

              return (
                <g key={index}>
                  <rect
                    x={x - 5}
                    y={0}
                    width={10}
                    height={100}
                    fill="transparent"
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                  />
                  {isHovered && (
                    <line
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={100}
                      stroke={color}
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                    />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? "4" : "3"}
                    fill={color}
                    stroke="hsl(var(--background))"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
        </svg>

        {hoveredPoint !== null && (
          <div
            className="absolute pointer-events-none bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-sm z-10"
            style={{
              left: `${(hoveredPoint / (data.length - 1)) * 100}%`,
              top: `${getY(animatedValues[hoveredPoint] ?? minValue)}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <p className="font-medium">{data[hoveredPoint].label}</p>
            <p className="font-mono text-chart-1">{data[hoveredPoint].value}</p>
          </div>
        )}

        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          {data.map((point, index) => (
            <span key={index}>{point.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LineChart;
