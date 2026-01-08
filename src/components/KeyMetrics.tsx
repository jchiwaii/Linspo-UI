"use client";

import React from "react";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string;
  change: number;
  icon: "revenue" | "users" | "orders" | "activity";
}

interface KeyMetricsProps {
  metrics?: Metric[];
  title?: string;
  className?: string;
}

const defaultMetrics: Metric[] = [
  { label: "Total Revenue", value: "$84,532", change: 12.5, icon: "revenue" },
  { label: "Active Users", value: "12,847", change: 8.3, icon: "users" },
  { label: "Orders", value: "2,341", change: -3.2, icon: "orders" },
  { label: "Conversion", value: "4.28%", change: 15.7, icon: "activity" },
];

const iconMap = {
  revenue: DollarSign,
  users: Users,
  orders: ShoppingCart,
  activity: Activity,
};

const colorMap = {
  revenue: "chart-1",
  users: "chart-2",
  orders: "chart-3",
  activity: "chart-4",
};

export default function KeyMetrics({
  metrics = defaultMetrics,
  title = "Key Metrics",
  className,
}: KeyMetricsProps) {
  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <Activity size={20} className="text-chart-1" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{metrics.length} metrics tracked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const Icon = iconMap[metric.icon];
          const color = colorMap[metric.icon];

          return (
            <div
              key={metric.label}
              className="p-4 rounded-lg bg-muted/50 border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    `bg-${color}/10`
                  )}
                  style={{ backgroundColor: `hsl(var(--${color}) / 0.1)` }}
                >
                  <Icon size={18} className={`text-${color}`} style={{ color: `hsl(var(--${color}))` }} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    metric.change >= 0
                      ? "bg-chart-3/10 text-chart-3"
                      : "bg-chart-2/10 text-chart-2"
                  )}
                >
                  {metric.change >= 0 ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <p className="text-2xl font-semibold font-mono text-foreground mb-1">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-3" />
            <span className="text-xs text-muted-foreground">
              {metrics.filter((m) => m.change > 0).length} improving
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-2" />
            <span className="text-xs text-muted-foreground">
              {metrics.filter((m) => m.change < 0).length} declining
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Updated just now</p>
      </div>
    </div>
  );
}
