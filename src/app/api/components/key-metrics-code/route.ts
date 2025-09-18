import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Target, Zap } from "lucide-react";

interface Metric {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
}

interface KeyMetricsProps {
  metrics?: Metric[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultMetrics: Metric[] = [
  {
    id: "growth",
    value: "150",
    label: "Growth Rate",
    description: "Consistent month-over-month growth across all key metrics",
    icon: <TrendingUp size={20} />,
    suffix: "%",
  },
  {
    id: "users",
    value: "10K",
    label: "Active Users",
    description: "Engaged users leveraging our platform daily",
    icon: <Users size={20} />,
    suffix: "+",
  },
  {
    id: "accuracy",
    value: "99.9",
    label: "Accuracy",
    description: "Precision in delivery and performance metrics",
    icon: <Target size={20} />,
    suffix: "%",
  },
  {
    id: "performance",
    value: "2.1",
    label: "Load Time",
    description: "Average response time across all endpoints",
    icon: <Zap size={20} />,
    suffix: "s",
  },
];

export default function KeyMetrics({
  metrics = defaultMetrics,
  title = "Performance Metrics",
  subtitle = "Real-time insights into our platform's key performance indicators",
  className = "",
}: KeyMetricsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={\`relative bg-gradient-to-br from-white via-gray-50/80 to-white py-24 \${className}\`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className={\`group relative bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500 \${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }\`}
              style={{
                transitionDelay: \`\${index * 150}ms\`,
              }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-900 to-black rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white">{metric.icon}</span>
              </div>

              {/* Value */}
              <div className="mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl md:text-5xl font-light text-gray-900 group-hover:text-black transition-colors duration-300">
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span className="text-2xl font-light text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {metric.suffix}
                    </span>
                  )}
                </div>
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                {metric.label}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {metric.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gray-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}`;

  return NextResponse.json({ code });
}
