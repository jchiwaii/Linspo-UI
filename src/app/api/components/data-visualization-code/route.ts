import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartData {
  title: string;
  data: DataPoint[];
  type: "bar" | "line" | "pie";
}

interface DataVisualizationProps {
  charts?: ChartData[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultCharts: ChartData[] = [
  {
    title: "Monthly Revenue",
    type: "bar",
    data: [
      { label: "Jan", value: 65, color: "bg-gray-800" },
      { label: "Feb", value: 78, color: "bg-gray-700" },
      { label: "Mar", value: 90, color: "bg-gray-600" },
      { label: "Apr", value: 81, color: "bg-gray-500" },
      { label: "May", value: 95, color: "bg-gray-400" },
      { label: "Jun", value: 88, color: "bg-gray-300" },
    ],
  },
  {
    title: "User Growth",
    type: "line",
    data: [
      { label: "Week 1", value: 20 },
      { label: "Week 2", value: 35 },
      { label: "Week 3", value: 45 },
      { label: "Week 4", value: 60 },
      { label: "Week 5", value: 75 },
      { label: "Week 6", value: 85 },
    ],
  },
];

export default function DataVisualization({
  charts = defaultCharts,
  title = "Analytics Dashboard",
  subtitle = "Real-time insights and performance metrics",
  className = "",
}: DataVisualizationProps) {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      charts.forEach((chart, chartIndex) => {
        chart.data.forEach((point, pointIndex) => {
          const key = \`\${chartIndex}-\${pointIndex}\`;
          newValues[key] = point.value;
        });
      });
      setAnimatedValues(newValues);
    }, 300);

    return () => clearTimeout(timer);
  }, [charts]);

  const BarChart = ({ data, title }: { data: DataPoint[]; title: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
      <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 size={20} className="text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {data.map((point, index) => {
            const height = ((animatedValues[\`0-\${index}\`] || 0) / maxValue) * 100;
            return (
              <div key={point.label} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600 w-12">
                  {point.label}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={\`h-full \${point.color || 'bg-gray-800'} rounded-full transition-all duration-1000 ease-out\`}
                    style={{ width: \`\${height}%\` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-8">
                  {point.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title }: { data: DataPoint[]; title: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((animatedValues[\`1-\${index}\`] || 0) / maxValue) * 80;
      return \`\${x},\${y}\`;
    }).join(' ');

    return (
      <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp size={20} className="text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
            
            {/* Line */}
            <polyline
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              points={points}
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((animatedValues[\`1-\${index}\`] || 0) / maxValue) * 80;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#374151"
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
          
          {/* Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
            {data.map((point, index) => (
              <span key={index}>{point.label}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {charts.map((chart, index) => (
            <div key={index}>
              {chart.type === "bar" && <BarChart data={chart.data} title={chart.title} />}
              {chart.type === "line" && <LineChart data={chart.data} title={chart.title} />}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 text-center hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
            <TrendingUp className="mx-auto mb-3 text-green-600" size={24} />
            <div className="text-2xl font-light text-gray-900 mb-1">+24%</div>
            <div className="text-sm text-gray-600">Growth Rate</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 text-center hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
            <BarChart3 className="mx-auto mb-3 text-blue-600" size={24} />
            <div className="text-2xl font-light text-gray-900 mb-1">1.2M</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 text-center hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
            <PieChart className="mx-auto mb-3 text-purple-600" size={24} />
            <div className="text-2xl font-light text-gray-900 mb-1">89%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
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
