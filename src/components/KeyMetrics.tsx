"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface Metric {
  id: string;
  value: string | number;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  target?: number;
  format?: "currency" | "percentage" | "number";
}

interface KeyMetricsProps {
  metrics?: Metric[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultMetrics: Metric[] = [
  {
    id: "revenue",
    value: "847.2K",
    label: "Total Revenue",
    description: "Monthly recurring revenue with 23% growth",
    icon: <DollarSign size={20} />,
    change: 23.5,
    changeType: "increase",
    format: "currency",
  },
  {
    id: "conversion",
    value: "12.8",
    label: "Conversion Rate",
    description: "Lead to customer conversion optimization",
    icon: <Target size={20} />,
    suffix: "%",
    change: -2.1,
    changeType: "decrease",
    format: "percentage",
  },
  {
    id: "users",
    value: "24.7K",
    label: "Active Users",
    description: "Daily active users across all platforms",
    icon: <Users size={20} />,
    change: 15.3,
    changeType: "increase",
    format: "number",
  },
  {
    id: "performance",
    value: "98.7",
    label: "System Uptime",
    description: "Service availability and performance metrics",
    icon: <Activity size={20} />,
    suffix: "%",
    change: 0.3,
    changeType: "increase",
    format: "percentage",
  },
];

export default function KeyMetrics({
  metrics = defaultMetrics,
  title = "Key Performance Indicators",
  subtitle = "Real-time business metrics and performance analytics",
  className = "",
}: KeyMetricsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getChangeIcon = (changeType?: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return <ArrowUpRight size={16} className="text-green-600" />;
      case "decrease":
        return <ArrowDownRight size={16} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getChangeColor = (changeType?: "increase" | "decrease" | "neutral") => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      {/* Data grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-slate-900">
            {title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className={`group relative bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Header with icon and change */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white">{metric.icon}</span>
                </div>
                {metric.change !== undefined && (
                  <div
                    className={`flex items-center space-x-1 text-sm font-medium ${getChangeColor(
                      metric.changeType
                    )}`}
                  >
                    {getChangeIcon(metric.changeType)}
                    <span>
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                  </div>
                )}
              </div>

              {/* Value */}
              <div className="mb-3">
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl md:text-4xl font-light text-slate-900 group-hover:text-black transition-colors duration-300">
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span className="text-xl font-light text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
                      {metric.suffix}
                    </span>
                  )}
                </div>
              </div>

              {/* Label */}
              <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-black transition-colors duration-300">
                {metric.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                {metric.description}
              </p>

              {/* Progress bar for targets */}
              {metric.target && (
                <div className="mt-4 pt-4 border-t border-slate-200/60">
                  <div className="flex justify-between text-xs text-slate-600 mb-2">
                    <span>Progress</span>
                    <span>
                      {Math.round(
                        (parseFloat(metric.value.toString()) / metric.target) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-slate-600 to-slate-800 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min(
                          (parseFloat(metric.value.toString()) /
                            metric.target) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <div className="text-2xl font-light text-slate-900 mb-1">
              ↗ 18.2%
            </div>
            <div className="text-sm text-slate-600">Overall Growth</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <div className="text-2xl font-light text-slate-900 mb-1">4.7/5</div>
            <div className="text-sm text-slate-600">Performance Score</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <div className="text-2xl font-light text-slate-900 mb-1">99.8%</div>
            <div className="text-sm text-slate-600">Data Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
