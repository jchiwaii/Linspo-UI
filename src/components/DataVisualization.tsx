"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Activity,
  Target,
  TrendingUp,
  PieChart as PieChartIcon,
} from "lucide-react";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
  category?: string;
}

interface ChartData {
  title: string;
  data: DataPoint[];
  type: "bar" | "line" | "area" | "pie" | "heatmap";
  metric?: string;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
}

interface DataVisualizationProps {
  charts?: ChartData[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultCharts: ChartData[] = [
  {
    title: "Revenue Analytics",
    type: "area",
    metric: "$2.4M",
    change: 12.5,
    changeType: "increase",
    data: [
      { label: "Jan", value: 420, color: "#1e293b" },
      { label: "Feb", value: 380, color: "#334155" },
      { label: "Mar", value: 520, color: "#475569" },
      { label: "Apr", value: 480, color: "#64748b" },
      { label: "May", value: 650, color: "#94a3b8" },
      { label: "Jun", value: 720, color: "#cbd5e1" },
      { label: "Jul", value: 680, color: "#e2e8f0" },
      { label: "Aug", value: 780, color: "#f1f5f9" },
    ],
  },
  {
    title: "User Engagement",
    type: "bar",
    metric: "89.2%",
    change: -2.1,
    changeType: "decrease",
    data: [
      { label: "Mobile", value: 65, color: "#0f172a" },
      { label: "Desktop", value: 85, color: "#1e293b" },
      { label: "Tablet", value: 45, color: "#334155" },
      { label: "Web App", value: 92, color: "#475569" },
      { label: "API", value: 78, color: "#64748b" },
    ],
  },
  {
    title: "Performance Metrics",
    type: "line",
    metric: "99.7%",
    change: 0.3,
    changeType: "increase",
    data: [
      { label: "00:00", value: 98.5 },
      { label: "04:00", value: 99.2 },
      { label: "08:00", value: 97.8 },
      { label: "12:00", value: 99.8 },
      { label: "16:00", value: 98.9 },
      { label: "20:00", value: 99.5 },
    ],
  },
  {
    title: "Market Share",
    type: "pie",
    metric: "34.2%",
    change: 5.7,
    changeType: "increase",
    data: [
      { label: "Product A", value: 34.2, color: "#0f172a" },
      { label: "Product B", value: 28.5, color: "#1e293b" },
      { label: "Product C", value: 22.1, color: "#334155" },
      { label: "Product D", value: 15.2, color: "#475569" },
    ],
  },
];

export default function DataVisualization({
  charts = defaultCharts,
  title = "Data Analytics Dashboard",
  subtitle = "Advanced data visualization and business intelligence",
  className = "",
}: DataVisualizationProps) {
  const [animatedValues, setAnimatedValues] = useState<{
    [key: string]: number;
  }>({});
  const [selectedChart, setSelectedChart] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newValues: { [key: string]: number } = {};
      charts.forEach((chart, chartIndex) => {
        chart.data.forEach((point, pointIndex) => {
          const key = `${chartIndex}-${pointIndex}`;
          newValues[key] = point.value;
        });
      });
      setAnimatedValues(newValues);
    }, 500);

    return () => clearTimeout(timer);
  }, [charts]);

  const BarChart = ({
    data,
    title,
    chartIndex,
    metric,
    change,
    changeType,
  }: {
    data: DataPoint[];
    title: string;
    chartIndex: number;
    metric?: string;
    change?: number;
    changeType?: "increase" | "decrease" | "neutral";
  }) => {
    const maxValue = Math.max(...data.map((d) => d.value));

    return (
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <BarChart3 size={20} className="text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          </div>
          {metric && (
            <div className="text-right">
              <div className="text-2xl font-light text-slate-900">{metric}</div>
              {change !== undefined && (
                <div
                  className={`text-sm font-medium ${
                    changeType === "increase"
                      ? "text-green-600"
                      : changeType === "decrease"
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  {change > 0 ? "+" : ""}
                  {change}%
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {data.map((point, index) => {
            const width =
              ((animatedValues[`${chartIndex}-${index}`] || 0) / maxValue) *
              100;
            return (
              <div key={point.label} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-slate-600 w-16 text-right">
                  {point.label}
                </span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full transition-all duration-1500 ease-out"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900 w-12">
                  {point.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const LineChart = ({
    data,
    title,
    chartIndex,
    metric,
    change,
    changeType,
  }: {
    data: DataPoint[];
    title: string;
    chartIndex: number;
    metric?: string;
    change?: number;
    changeType?: "increase" | "decrease" | "neutral";
  }) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue;

    const points = data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const normalizedValue =
          range > 0
            ? ((animatedValues[`${chartIndex}-${index}`] || minValue) -
                minValue) /
              range
            : 0.5;
        const y = 100 - (normalizedValue * 70 + 15); // 15% padding top/bottom
        return `${x},${y}`;
      })
      .join(" ");

    const areaPoints = `0,100 ${points} 100,100`;

    return (
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Activity size={20} className="text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          </div>
          {metric && (
            <div className="text-right">
              <div className="text-2xl font-light text-slate-900">{metric}</div>
              {change !== undefined && (
                <div
                  className={`text-sm font-medium ${
                    changeType === "increase"
                      ? "text-green-600"
                      : changeType === "decrease"
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  {change > 0 ? "+" : ""}
                  {change}%
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative h-48">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <defs>
              <pattern
                id={`grid-${chartIndex}`}
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient
                id={`gradient-${chartIndex}`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#475569" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill={`url(#grid-${chartIndex})`} />

            {/* Area fill */}
            <polygon
              fill={`url(#gradient-${chartIndex})`}
              points={areaPoints}
              className="transition-all duration-1500 ease-out"
            />

            {/* Line */}
            <polyline
              fill="none"
              stroke="#475569"
              strokeWidth="2.5"
              points={points}
              className="transition-all duration-1500 ease-out"
            />

            {/* Points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const normalizedValue =
                range > 0
                  ? ((animatedValues[`${chartIndex}-${index}`] || minValue) -
                      minValue) /
                    range
                  : 0.5;
              const y = 100 - (normalizedValue * 70 + 15);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#475569"
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-1500 ease-out hover:r-4"
                />
              );
            })}
          </svg>

          {/* Labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-slate-500">
            {data.map((point, index) => (
              <span
                key={index}
                className="transform -rotate-45 origin-top-left"
              >
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AreaChart = ({
    data,
    title,
    chartIndex,
    metric,
    change,
    changeType,
  }: {
    data: DataPoint[];
    title: string;
    chartIndex: number;
    metric?: string;
    change?: number;
    changeType?: "increase" | "decrease" | "neutral";
  }) => {
    return (
      <LineChart
        data={data}
        title={title}
        chartIndex={chartIndex}
        metric={metric}
        change={change}
        changeType={changeType}
      />
    );
  };

  const PieChart = ({
    data,
    title,
    chartIndex,
    metric,
    change,
    changeType,
  }: {
    data: DataPoint[];
    title: string;
    chartIndex: number;
    metric?: string;
    change?: number;
    changeType?: "increase" | "decrease" | "neutral";
  }) => {
    if (!data || data.length === 0) return null;
    const total = data.reduce((sum, point) => sum + point.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <PieChartIcon size={20} className="text-slate-700" />
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          </div>
          {metric && (
            <div className="text-right">
              <div className="text-2xl font-light text-slate-900">{metric}</div>
              {change !== undefined && (
                <div
                  className={`text-sm font-medium ${
                    changeType === "increase"
                      ? "text-green-600"
                      : changeType === "decrease"
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  {change > 0 ? "+" : ""}
                  {change}%
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative w-32 h-32">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {data.map((point, index) => {
                const percentage = (point.value / total) * 100;
                const strokeDasharray = `${percentage} ${100 - percentage}`;
                const strokeDashoffset = -cumulativePercentage;
                cumulativePercentage += percentage;

                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={point.color || `hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      strokeDasharray: `${
                        ((animatedValues[`${chartIndex}-${index}`] || 0) /
                          total) *
                        100
                      } ${
                        100 -
                        ((animatedValues[`${chartIndex}-${index}`] || 0) /
                          total) *
                          100
                      }`,
                    }}
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex-1 space-y-2">
            {data.map((point, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      point.color || `hsl(${index * 60}, 70%, 50%)`,
                  }}
                />
                <span className="text-sm text-slate-600 flex-1">
                  {point.label}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {((point.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      {/* Data visualization background */}
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {charts.map((chart, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                selectedChart === index ? "scale-105 z-10" : ""
              }`}
              onMouseEnter={() => setSelectedChart(index)}
              onMouseLeave={() => setSelectedChart(null)}
            >
              {chart.type === "bar" && (
                <BarChart
                  data={chart.data}
                  title={chart.title}
                  chartIndex={index}
                  metric={chart.metric}
                  change={chart.change}
                  changeType={chart.changeType}
                />
              )}
              {chart.type === "line" && (
                <LineChart
                  data={chart.data}
                  title={chart.title}
                  chartIndex={index}
                  metric={chart.metric}
                  change={chart.change}
                  changeType={chart.changeType}
                />
              )}
              {chart.type === "area" && (
                <AreaChart
                  data={chart.data}
                  title={chart.title}
                  chartIndex={index}
                  metric={chart.metric}
                  change={chart.change}
                  changeType={chart.changeType}
                />
              )}
              {chart.type === "pie" && (
                <PieChart
                  data={chart.data}
                  title={chart.title}
                  chartIndex={index}
                  metric={chart.metric}
                  change={chart.change}
                  changeType={chart.changeType}
                />
              )}
            </div>
          ))}
        </div>

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            <TrendingUp className="mx-auto mb-3 text-emerald-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              ↗ 18.7%
            </div>
            <div className="text-sm text-slate-600">Overall Growth</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            <Target className="mx-auto mb-3 text-blue-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">94.2%</div>
            <div className="text-sm text-slate-600">Target Achievement</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            <Activity className="mx-auto mb-3 text-purple-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">2.4M</div>
            <div className="text-sm text-slate-600">Data Points</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            <BarChart3 className="mx-auto mb-3 text-orange-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">99.8%</div>
            <div className="text-sm text-slate-600">Data Accuracy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
