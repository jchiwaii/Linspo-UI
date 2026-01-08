"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataVisualizationProps {
  title?: string;
  data?: { label: string; value: number; change: number }[];
  className?: string;
}

const defaultData = [
  { label: "Revenue", value: 84500, change: 12.5 },
  { label: "Users", value: 12847, change: 8.3 },
  { label: "Orders", value: 2341, change: -3.2 },
  { label: "Conversion", value: 4.28, change: 15.7 },
];

export default function DataVisualization({
  title = "Performance Overview",
  data = defaultData,
  className,
}: DataVisualizationProps) {
  const [selectedMetric, setSelectedMetric] = useState(0);
  const maxValue = Math.max(...data.map((d) => d.value));

  const formatValue = (value: number) => {
    if (value >= 10000) return `${(value / 1000).toFixed(1)}K`;
    if (value < 100) return value.toFixed(2);
    return value.toLocaleString();
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <BarChart3 size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{data.length} metrics tracked</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {data.map((item, index) => (
          <button
            key={item.label}
            onClick={() => setSelectedMetric(index)}
            className={cn(
              "p-4 rounded-lg text-left transition-all",
              selectedMetric === index
                ? "bg-primary/10 border-2 border-primary"
                : "bg-muted/50 border-2 border-transparent hover:bg-muted"
            )}
          >
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="text-xl font-semibold font-mono text-foreground">
              {formatValue(item.value)}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {item.change >= 0 ? (
                <TrendingUp size={14} className="text-chart-3" />
              ) : (
                <TrendingDown size={14} className="text-chart-2" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  item.change >= 0 ? "text-chart-3" : "text-chart-2"
                )}
              >
                {Math.abs(item.change)}%
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono font-medium text-foreground">
                {formatValue(item.value)}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  index === selectedMetric ? "bg-primary" : "bg-chart-1/60"
                )}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">
            {data.filter((d) => d.change > 0).length}
          </p>
          <p className="text-xs text-muted-foreground">Improving</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">
            {data.filter((d) => d.change < 0).length}
          </p>
          <p className="text-xs text-muted-foreground">Declining</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold font-mono text-foreground">
            {(data.reduce((sum, d) => sum + d.change, 0) / data.length).toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">Avg Change</p>
        </div>
      </div>
    </div>
  );
}
