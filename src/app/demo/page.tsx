"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// Sample data
const lineChartData = [35, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 105];
const barChartData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 82 },
  { label: "Mar", value: 70 },
  { label: "Apr", value: 95 },
  { label: "May", value: 78 },
  { label: "Jun", value: 88 },
];

const pieData = [
  { label: "Desktop", value: 45, color: "hsl(221 83% 53%)" },
  { label: "Mobile", value: 35, color: "hsl(160 60% 45%)" },
  { label: "Tablet", value: 20, color: "hsl(30 80% 55%)" },
];

const recentTransactions = [
  { name: "Alice Johnson", amount: 1250, status: "completed" },
  { name: "Bob Smith", amount: 890, status: "completed" },
  { name: "Carol Davis", amount: 2100, status: "pending" },
  { name: "David Wilson", amount: 450, status: "completed" },
];

export default function DemoPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Calculate line chart path
  const maxLine = Math.max(...lineChartData);
  const minLine = Math.min(...lineChartData);
  const rangeLine = maxLine - minLine || 1;
  const linePoints = lineChartData
    .map(
      (v, i) =>
        `${(i / (lineChartData.length - 1)) * 100},${
          100 - ((v - minLine) / rangeLine) * 80 - 10
        }`
    )
    .join(" ");
  const areaPoints = `0,100 ${linePoints} 100,100`;

  // Calculate bar chart max
  const maxBar = Math.max(...barChartData.map((d) => d.value));

  // Pie chart calculations
  const pieTotal = pieData.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  const pieSlices = pieData.map((d) => {
    const sliceAngle = (d.value / pieTotal) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const startX = 50 + 35 * Math.cos(startAngle - Math.PI / 2);
    const startY = 50 + 35 * Math.sin(startAngle - Math.PI / 2);
    const endX = 50 + 35 * Math.cos(endAngle - Math.PI / 2);
    const endY = 50 + 35 * Math.sin(endAngle - Math.PI / 2);
    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    return {
      ...d,
      path: `M 50 50 L ${startX} ${startY} A 35 35 0 ${largeArc} 1 ${endX} ${endY} Z`,
      percentage: ((d.value / pieTotal) * 100).toFixed(0),
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage="demo" />

      {/* Content */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <h1
              className={`text-4xl font-semibold text-foreground mb-3 transition-all duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              Dashboard Demo
            </h1>
            <p
              className={`text-lg text-muted-foreground transition-all duration-500 delay-100 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              A showcase of all Linspo UI components working together in a
              cohesive dashboard.
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Revenue",
                value: "$847.2K",
                change: 23.5,
                type: "increase",
                icon: <DollarSign size={20} />,
              },
              {
                label: "Active Users",
                value: "24.7K",
                change: 15.3,
                type: "increase",
                icon: <Users size={20} />,
              },
              {
                label: "Conversion",
                value: "12.8%",
                change: -2.1,
                type: "decrease",
                icon: <Target size={20} />,
              },
              {
                label: "Uptime",
                value: "99.8%",
                change: 0.3,
                type: "increase",
                icon: <Activity size={20} />,
              },
            ].map((metric, index) => (
              <div
                key={index}
                className={`group bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {metric.icon}
                  </div>
                  <div
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      metric.type === "increase"
                        ? "text-chart-2"
                        : "text-destructive"
                    }`}
                  >
                    {metric.type === "increase" ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    <span>
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                  </div>
                </div>
                <p className="text-2xl font-semibold data-value text-foreground mb-1">
                  {metric.value}
                </p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Line Chart */}
            <div
              className={`lg:col-span-2 bg-card border border-border rounded-xl p-6 transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                    <TrendingUp size={20} className="text-chart-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Revenue Trend
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Last 12 months
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold data-value text-foreground">
                    $105K
                  </p>
                  <p className="text-sm text-chart-2 flex items-center gap-1 justify-end">
                    <TrendingUp size={14} />
                    +18.2%
                  </p>
                </div>
              </div>

              <div className="h-48 relative">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Grid */}
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
                      className="text-border"
                    />
                  ))}
                  {/* Gradient */}
                  <defs>
                    <linearGradient
                      id="demoAreaGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="hsl(221 83% 53%)"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(221 83% 53%)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <polygon fill="url(#demoAreaGrad)" points={areaPoints} />
                  <polyline
                    fill="none"
                    stroke="hsl(221 83% 53%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={linePoints}
                  />
                </svg>
              </div>
            </div>

            {/* Pie Chart */}
            <div
              className={`bg-card border border-border rounded-xl p-6 transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Activity size={20} className="text-chart-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Traffic Sources
                  </h3>
                  <p className="text-sm text-muted-foreground">By device</p>
                </div>
              </div>

              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {pieSlices.map((slice, i) => (
                    <path
                      key={i}
                      d={slice.path}
                      fill={slice.color}
                      stroke="hsl(var(--background))"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
              </div>

              <div className="space-y-2">
                {pieSlices.map((slice, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: slice.color }}
                      />
                      <span className="text-sm text-foreground">
                        {slice.label}
                      </span>
                    </div>
                    <span className="text-sm data-value text-muted-foreground">
                      {slice.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div
              className={`bg-card border border-border rounded-xl p-6 transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <BarChart3 size={20} className="text-chart-2" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Monthly Performance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    First half of year
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {barChartData.map((d, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">{d.label}</span>
                      <span className="data-value text-foreground">
                        {d.value}%
                      </span>
                    </div>
                    <div className="h-6 bg-muted rounded-md overflow-hidden">
                      <div
                        className="h-full bg-chart-2 rounded-md transition-all duration-500"
                        style={{ width: `${(d.value / maxBar) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div
              className={`bg-card border border-border rounded-xl p-6 transition-all duration-500 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <DollarSign size={20} className="text-chart-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Recent Transactions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Latest activity
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {recentTransactions.map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{tx.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {tx.status}
                      </p>
                    </div>
                    <span
                      className={`data-value font-semibold ${
                        tx.status === "completed"
                          ? "text-chart-2"
                          : "text-chart-3"
                      }`}
                    >
                      +${tx.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 size={20} />
              <span className="font-medium">Linspo UI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Toggle the theme using the button above to see dark mode in
              action.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
