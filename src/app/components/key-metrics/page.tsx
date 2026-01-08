"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import KeyMetrics from "@/components/KeyMetrics";

const code = `"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, Users, Target, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Metric {
  id: string;
  value: string | number;
  label: string;
  description?: string;
  icon: React.ReactNode;
  suffix?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
}

interface KeyMetricsProps {
  metrics?: Metric[];
  className?: string;
}

const defaultMetrics: Metric[] = [
  { id: "revenue", value: "847.2K", label: "Total Revenue", description: "Monthly recurring", icon: <DollarSign size={20} />, change: 23.5, changeType: "increase" },
  { id: "conversion", value: "12.8", label: "Conversion Rate", description: "Lead to customer", icon: <Target size={20} />, suffix: "%", change: -2.1, changeType: "decrease" },
  { id: "users", value: "24.7K", label: "Active Users", description: "Daily active", icon: <Users size={20} />, change: 15.3, changeType: "increase" },
  { id: "performance", value: "98.7", label: "Uptime", description: "Service availability", icon: <Activity size={20} />, suffix: "%", change: 0.3, changeType: "increase" },
];

export function KeyMetrics({ metrics = defaultMetrics, className }: KeyMetricsProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.id}
            className={cn(
              "group bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-border/80 transition-all duration-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: \`\${index * 100}ms\` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                {metric.icon}
              </div>
              {metric.change !== undefined && (
                <div className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  metric.changeType === "increase" && "text-chart-2",
                  metric.changeType === "decrease" && "text-destructive"
                )}>
                  {metric.changeType === "increase" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{metric.change > 0 ? "+" : ""}{metric.change}%</span>
                </div>
              )}
            </div>
            <div className="mb-1">
              <span className="text-2xl font-semibold font-mono text-foreground">{metric.value}</span>
              {metric.suffix && <span className="text-lg text-muted-foreground ml-0.5">{metric.suffix}</span>}
            </div>
            <p className="text-sm font-medium text-foreground">{metric.label}</p>
            {metric.description && <p className="text-xs text-muted-foreground mt-0.5">{metric.description}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold font-mono text-foreground">↗ 18.2%</p>
          <p className="text-xs text-muted-foreground">Overall Growth</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold font-mono text-foreground">4.7/5</p>
          <p className="text-xs text-muted-foreground">Performance Score</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-lg font-semibold font-mono text-foreground">99.8%</p>
          <p className="text-xs text-muted-foreground">Data Accuracy</p>
        </div>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "metrics",
    type: "Metric[]",
    description: "Array of metrics with id, value, label, icon, and optional change/suffix/description.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply.",
  },
];

export default function KeyMetricsPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Key Metrics"
          description="Display important statistics and KPIs with animated counters, visual indicators, and change percentages for dashboards and analytics."
          code={code}
          category="Widgets"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add key-metrics"
          props={props}
        >
          <div className="w-full max-w-2xl">
            <KeyMetrics />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
