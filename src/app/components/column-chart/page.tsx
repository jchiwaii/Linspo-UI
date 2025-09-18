"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Code2, Copy, Check } from "lucide-react";
import ColumnChart from "@/components/ColumnChart";

export default function ColumnChartShowcasePage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("// ColumnChart component code...");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/components"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Components</span>
            </Link>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "preview"
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "code"
                    ? "bg-white text-black"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <Code2 size={16} />
                <span>Code</span>
              </button>
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl font-light mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Column Chart
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              Vertical column charts with grouping and stacking capabilities,
              perfect for comparing categories.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Column Chart",
                "Vertical",
                "Grouped",
                "Categories",
                "Comparison",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-zinc-800/50 overflow-hidden">
            {activeTab === "preview" ? (
              <div className="p-8">
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      preview.localhost:3000
                    </span>
                  </div>
                  <div className="min-h-[600px] relative">
                    <ColumnChart />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
                    <span className="text-zinc-400 text-sm font-mono">
                      ColumnChart.tsx
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-sm font-medium transition-all duration-300 border border-zinc-700"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span className="text-xs">
                        {copied ? "Copied!" : "Copy"}
                      </span>
                    </button>
                  </div>
                  <div className="p-4 text-sm text-gray-300">
                    <p>
                      Vertical column chart component with hover effects and
                      tooltips.
                    </p>
                    <p className="mt-2">
                      Features: Vertical orientation, grouping capabilities,
                      interactive tooltips.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
