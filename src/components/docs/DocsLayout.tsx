"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Grid3X3,
  Gauge,
  Calendar,
  Sparkles,
  Table2,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Charts",
    items: [
      { title: "Bar Chart", href: "/components/bar-chart", icon: BarChart3 },
      { title: "Line Chart", href: "/components/line-chart", icon: LineChart },
      { title: "Area Chart", href: "/components/area-chart", icon: Activity },
      { title: "Pie Chart", href: "/components/pie-chart", icon: PieChart },
      { title: "Donut Chart", href: "/components/donut-chart", icon: PieChart },
      {
        title: "Column Chart",
        href: "/components/column-chart",
        icon: BarChart3,
      },
      {
        title: "Scatter Plot",
        href: "/components/scatter-plot",
        icon: Grid3X3,
      },
      { title: "Gauge Chart", href: "/components/gauge-chart", icon: Gauge },
      { title: "Heatmap", href: "/components/heatmap", icon: Grid3X3 },
    ],
  },
  {
    title: "Widgets",
    items: [
      { title: "Key Metrics", href: "/components/key-metrics", icon: Sparkles },
      {
        title: "Calendar Widget",
        href: "/components/calendar-widget",
        icon: Calendar,
      },
      {
        title: "Data Tables",
        href: "/components/data-visualization",
        icon: Table2,
      },
    ],
  },
];

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 shrink-0 border-r border-border bg-background",
        className
      )}
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 px-4">
        <nav className="space-y-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground mb-2 px-2">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        {Icon && <Icon size={16} />}
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <DocsSidebar className="hidden lg:block" />
      <main className="flex-1 px-6 py-8 lg:px-12 max-w-4xl">{children}</main>
    </div>
  );
}

export default DocsLayout;
