"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

interface DataPoint {
  date: Date;
  value: number;
  category?: string;
  metadata?: {
    events?: number;
    conversions?: number;
    revenue?: number;
  };
}

interface TimeSeriesWidgetProps {
  data?: DataPoint[];
  title?: string;
  subtitle?: string;
  className?: string;
  metric?: string;
}

const generateTimeSeriesData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const startDate = new Date(2025, 0, 1); // January 1, 2025

  for (let i = 0; i < 31; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Generate realistic data with trends and patterns
    const baseValue = 1000 + Math.sin(i * 0.2) * 200;
    const randomVariation = (Math.random() - 0.5) * 300;
    const weekendEffect = date.getDay() === 0 || date.getDay() === 6 ? -150 : 0;

    data.push({
      date,
      value: Math.max(
        0,
        Math.round(baseValue + randomVariation + weekendEffect)
      ),
      metadata: {
        events: Math.floor(Math.random() * 50) + 10,
        conversions: Math.floor(Math.random() * 20) + 5,
        revenue: Math.floor(Math.random() * 5000) + 1000,
      },
    });
  }

  return data;
};

export default function TimeSeriesWidget({
  data = generateTimeSeriesData(),
  title = "Time Series Analytics",
  subtitle = "Calendar-based data visualization and trend analysis",
  className = "",
  metric = "Daily Active Users",
}: TimeSeriesWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDataForDate = (date: Date) => {
    return data.find(
      (point) =>
        point.date.getDate() === date.getDate() &&
        point.date.getMonth() === date.getMonth() &&
        point.date.getFullYear() === date.getFullYear()
    );
  };

  const getIntensityColor = (value: number, maxValue: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.8) return "bg-slate-800";
    if (intensity > 0.6) return "bg-slate-600";
    if (intensity > 0.4) return "bg-slate-400";
    if (intensity > 0.2) return "bg-slate-300";
    if (intensity > 0) return "bg-slate-200";
    return "bg-slate-100";
  };

  const maxValue = Math.max(...data.map((d) => d.value));
  const avgValue = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayData = getDataForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isHovered = hoveredDay === day;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          onMouseEnter={() => setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
          className={`relative h-12 w-full rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
            isToday
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-transparent"
          } ${isSelected ? "ring-2 ring-slate-400" : ""} ${
            isHovered ? "scale-110 z-10" : ""
          } ${
            dayData ? getIntensityColor(dayData.value, maxValue) : "bg-slate-50"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span
              className={`${
                dayData && dayData.value > avgValue
                  ? "text-white"
                  : "text-slate-700"
              }`}
            >
              {day}
            </span>
            {dayData && (
              <span
                className={`text-xs ${
                  dayData.value > avgValue ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {dayData.value.toLocaleString()}
              </span>
            )}
          </div>

          {/* Tooltip on hover */}
          {isHovered && dayData && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg z-20 whitespace-nowrap">
              <div className="font-medium">{date.toLocaleDateString()}</div>
              <div>
                {metric}: {dayData.value.toLocaleString()}
              </div>
              {dayData.metadata && (
                <div className="text-slate-300 mt-1">
                  Events: {dayData.metadata.events} | Revenue: $
                  {dayData.metadata.revenue?.toLocaleString()}
                </div>
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const recentData = data
    .filter(
      (point) => point.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 7);

  const selectedData = selectedDate ? getDataForDate(selectedDate) : null;

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

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <TrendingUp className="mx-auto mb-3 text-emerald-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {maxValue.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Peak Value</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <Activity className="mx-auto mb-3 text-blue-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {Math.round(avgValue).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Average</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <BarChart3 className="mx-auto mb-3 text-purple-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {data.length}
            </div>
            <div className="text-sm text-slate-600">Data Points</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl p-6 text-center">
            <Calendar className="mx-auto mb-3 text-orange-600" size={24} />
            <div className="text-2xl font-light text-slate-900 mb-1">
              {selectedData ? selectedData.value.toLocaleString() : "—"}
            </div>
            <div className="text-sm text-slate-600">Selected Day</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Heatmap */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:border-slate-300/60 hover:shadow-xl transition-all duration-500">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Hover over dates to see detailed metrics
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs font-medium text-slate-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {renderCalendarDays()}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-slate-100 rounded-sm"></div>
                <div className="w-3 h-3 bg-slate-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-slate-300 rounded-sm"></div>
                <div className="w-3 h-3 bg-slate-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-slate-600 rounded-sm"></div>
                <div className="w-3 h-3 bg-slate-800 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Recent Data & Selected Day Details */}
          <div className="space-y-6">
            {/* Selected Day Details */}
            {selectedData && (
              <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {selectedDate?.toLocaleDateString()}
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-light text-slate-900">
                      {selectedData.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">{metric}</div>
                  </div>
                  {selectedData.metadata && (
                    <div className="space-y-2 pt-4 border-t border-slate-200">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Events</span>
                        <span className="text-sm font-medium text-slate-900">
                          {selectedData.metadata.events}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">
                          Conversions
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                          {selectedData.metadata.conversions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Revenue</span>
                        <span className="text-sm font-medium text-slate-900">
                          ${selectedData.metadata.revenue?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Trends */}
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Recent Trends
              </h3>
              <div className="space-y-3">
                {recentData.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {point.date.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-slate-600">
                        {point.date.toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-900">
                        {point.value.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs ${
                          point.value > avgValue
                            ? "text-emerald-600"
                            : "text-slate-500"
                        }`}
                      >
                        {point.value > avgValue ? "↗" : "↘"}{" "}
                        {Math.round((point.value / avgValue - 1) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
