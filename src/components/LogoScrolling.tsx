"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Activity, BarChart3, Zap } from "lucide-react";

interface RealTimeDataPoint {
  timestamp: string;
  value: number;
  secondary?: number;
}

interface RealTimeChartsProps {
  title?: string;
  subtitle?: string;
  updateInterval?: number;
  className?: string;
}

const generateInitialData = (): RealTimeDataPoint[] => {
  const data: RealTimeDataPoint[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 2000);
    data.push({
      timestamp: timestamp.toLocaleTimeString(),
      value: Math.floor(Math.random() * 100) + 50,
      secondary: Math.floor(Math.random() * 80) + 20,
    });
  }

  return data;
};

export default function RealTimeCharts({
  title = "Real-Time Analytics",
  subtitle = "Live data visualization with automatic updates and smooth animations",
  updateInterval = 2000,
  className = "",
}: RealTimeChartsProps) {
  const [data, setData] = useState<RealTimeDataPoint[]>(generateInitialData());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift(); // Remove oldest point

        const now = new Date();
        newData.push({
          timestamp: now.toLocaleTimeString(),
          value: Math.floor(Math.random() * 100) + 50,
          secondary: Math.floor(Math.random() * 80) + 20,
        });

        return newData;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isLive, updateInterval]);

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = currentValue - previousValue;
  const changePercent =
    previousValue > 0 ? ((change / previousValue) * 100).toFixed(1) : "0.0";

  return (
    <section
      className={`relative bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24 ${className}`}
    >
      {/* Data visualization background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${
                isLive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            ></div>
            <span className="text-sm font-medium text-slate-600">
              {isLive ? "LIVE" : "PAUSED"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-slate-900">
            {title}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Control Panel */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-4">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isLive
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {isLive ? "Pause" : "Resume"}
            </button>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Activity size={16} />
              <span>Current: {currentValue}</span>
            </div>
            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                change >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              <TrendingUp
                size={16}
                className={change < 0 ? "rotate-180" : ""}
              />
              <span>
                {change >= 0 ? "+" : ""}
                {changePercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Real-time Line Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Activity size={20} className="text-slate-700" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Live Data Stream
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light text-slate-900">
                  {currentValue}
                </div>
                <div className="text-sm text-slate-600">Current Value</div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="timestamp"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Real-time Area Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <BarChart3 size={20} className="text-slate-700" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Dual Metrics
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light text-slate-900">
                  {data[data.length - 1]?.secondary || 0}
                </div>
                <div className="text-sm text-slate-600">Secondary Value</div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="timestamp"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="secondary"
                    stackId="2"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <Zap className="mx-auto mb-3 text-yellow-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {updateInterval / 1000}s
            </div>
            <div className="text-sm text-slate-600">Update Rate</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <Activity className="mx-auto mb-3 text-blue-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {data.length}
            </div>
            <div className="text-sm text-slate-600">Data Points</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <TrendingUp className="mx-auto mb-3 text-emerald-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {Math.max(...data.map((d) => d.value))}
            </div>
            <div className="text-sm text-slate-600">Peak Value</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <BarChart3 className="mx-auto mb-3 text-purple-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {Math.round(
                data.reduce((sum, d) => sum + d.value, 0) / data.length
              )}
            </div>
            <div className="text-sm text-slate-600">Average</div>
          </div>
        </div>
      </div>
    </section>
  );
}
