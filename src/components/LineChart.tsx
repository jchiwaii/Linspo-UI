"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import ComponentPage from "./ComponentPage";

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  metric?: string;
  currentValue?: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  showGrid?: boolean;
  showDots?: boolean;
  areaFill?: boolean;
}

const defaultData: DataPoint[] = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 78 },
  { label: "Mar", value: 90 },
  { label: "Apr", value: 81 },
  { label: "May", value: 95 },
  { label: "Jun", value: 88 },
  { label: "Jul", value: 102 },
  { label: "Aug", value: 94 },
];

export default function LineChart({
  data = defaultData,
  title = "Line Chart",
  subtitle = "Smooth animated line charts for time-series data visualization with clean, minimal styling.",
  metric = "Revenue Growth",
  currentValue,
  change = 12.5,
  changeType = "increase",
  showGrid = true,
  showDots = true,
  areaFill = true,
}: LineChartProps) {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

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
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const padding = range * 0.15;

  const getY = (value: number) => {
    return 100 - ((value - minValue + padding) / (range + padding * 2)) * 100;
  };

  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = getY(animatedValues[index] ?? minValue);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;
  const displayValue = currentValue ?? data[data.length - 1]?.value ?? 0;

  return (
    <ComponentPage title={title} subtitle={subtitle}>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        {/* Chart Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Activity size={20} className="text-chart-1" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{metric}</h3>
              <p className="text-sm text-muted-foreground">Last {data.length} months</p>
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

        {/* Chart */}
        <div className="relative h-64 mt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {showGrid && (
              <g className="text-border">
                {[0, 25, 50, 75, 100].map((y) => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                ))}
              </g>
            )}

            <defs>
              <linearGradient id="lineChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(221 83% 53%)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="hsl(221 83% 53%)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {areaFill && (
              <polygon fill="url(#lineChartGradient)" points={areaPoints} className="transition-all duration-700 ease-out" />
            )}

            <polyline fill="none" stroke="hsl(221 83% 53%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} className="transition-all duration-700 ease-out" />

            {showDots && data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = getY(animatedValues[index] ?? minValue);
              const isHovered = hoveredPoint === index;

              return (
                <g key={index}>
                  <rect x={x - 5} y={0} width={10} height={100} fill="transparent" onMouseEnter={() => setHoveredPoint(index)} onMouseLeave={() => setHoveredPoint(null)} className="cursor-pointer" />
                  {isHovered && <line x1={x} y1={0} x2={x} y2={100} stroke="hsl(221 83% 53%)" strokeWidth="0.5" strokeDasharray="2,2" />}
                  <circle cx={x} cy={y} r={isHovered ? "4" : "3"} fill="hsl(221 83% 53%)" stroke="hsl(var(--background))" strokeWidth="2" className="transition-all duration-200" />
                </g>
              );
            })}
          </svg>

          {hoveredPoint !== null && (
            <div className="absolute pointer-events-none bg-popover text-popover-foreground border border-border rounded-lg shadow-lg px-3 py-2 text-sm z-10" style={{ left: `${(hoveredPoint / (data.length - 1)) * 100}%`, top: `${getY(animatedValues[hoveredPoint] ?? minValue)}%`, transform: "translate(-50%, -120%)" }}>
              <p className="font-medium">{data[hoveredPoint].label}</p>
              <p className="data-value text-chart-1">{data[hoveredPoint].value}</p>
            </div>
          )}

          <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-xs text-muted-foreground">
            {data.map((point, index) => (
              <span key={index} className="text-center">{point.label}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{maxValue}</p>
            <p className="text-sm text-muted-foreground">Peak</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length)}</p>
            <p className="text-sm text-muted-foreground">Average</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold data-value text-foreground">{minValue}</p>
            <p className="text-sm text-muted-foreground">Minimum</p>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
}
