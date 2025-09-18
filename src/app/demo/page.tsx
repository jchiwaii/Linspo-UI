"use client";

import React from "react";
import DataDashboardHero from "@/components/Hero";
import KeyMetrics from "@/components/KeyMetrics";
import DataVisualization from "@/components/DataVisualization";
import InteractiveCards from "@/components/InteractiveCards";
import TimeSeriesWidget from "@/components/CalendarWidget";
import RealTimeCharts from "@/components/LogoScrolling";

export default function DemoPage() {
  return (
    <main className="bg-white">
      {/* Hero Section with Live Metrics */}
      <DataDashboardHero />

      {/* Key Performance Indicators */}
      <KeyMetrics />

      {/* Advanced Data Visualization */}
      <DataVisualization />

      {/* Component Showcase */}
      <InteractiveCards />

      {/* Time Series Analytics */}
      <TimeSeriesWidget />

      {/* Real-Time Charts */}
      <RealTimeCharts />
    </main>
  );
}
