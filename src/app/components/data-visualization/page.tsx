"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Code2, Copy, Check } from "lucide-react";
import DataVisualization from "@/components/DataVisualization";

export default function DataVisualizationShowcasePage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState<string>("");

  const copyToClipboard = async () => {
    try {
      const response = await fetch("/api/components/data-visualization-code");
      const { code } = await response.json();
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  React.useEffect(() => {
    if (activeTab === "code") {
      fetch("/api/components/data-visualization-code")
        .then((res) => res.json())
        .then(({ code }) => setCode(code))
        .catch((err) => console.error("Failed to fetch code:", err));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative">
        <div className="container mx-auto px-4 max-w-7xl py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/components"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft size={20} />
                <span>Back to Components</span>
              </Link>
            </div>

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
              Data Visualization
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              Clean and modern charts and graphs with smooth animations. Perfect
              for dashboards, analytics, and data-driven applications.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Charts",
                "Analytics",
                "Dashboard",
                "Data",
                "Visualization",
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

                  <div className="min-h-[700px] relative">
                    <DataVisualization />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="p-6">
                  <div className="bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
                      <span className="text-zinc-400 text-sm font-mono">
                        DataVisualization.tsx
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-zinc-500">
                          TypeScript + React + Tailwind CSS
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
                    </div>

                    <div className="overflow-x-auto">
                      <pre className="p-4 text-sm leading-relaxed">
                        <code className="language-typescript text-gray-300 whitespace-pre">
                          {code || "Loading code..."}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="mt-8 space-y-6 text-zinc-400">
                    <div>
                      <h4 className="font-medium text-white mb-2">
                        Installation
                      </h4>
                      <p>Install the required dependencies:</p>
                      <pre className="mt-2 p-3 bg-zinc-900 rounded-lg text-sm border border-zinc-800">
                        <code>npm install lucide-react</code>
                      </pre>
                    </div>

                    <div>
                      <h4 className="font-medium text-white mb-2">Features</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Animated bar and line charts</li>
                        <li>Responsive design with hover effects</li>
                        <li>Customizable data and styling</li>
                        <li>Summary statistics cards</li>
                        <li>Pure CSS animations for smooth performance</li>
                      </ul>
                    </div>
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
