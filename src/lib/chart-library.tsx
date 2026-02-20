import type { ComponentType } from "react";
import {
  AreaRangeCard,
  BarComparisonCard,
  DonutCompositionCard,
  HeatmapMatrixCard,
  RadialGaugeCard,
  ScatterClusterCard,
  StackedBarsCard,
  type VizCardBaseProps,
} from "@/components/library/chart-cards";
import { LineChartKitBoard } from "@/components/library/line-kit";

export interface ChartPropDefinition {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface ChartComponentItem {
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: "Trend" | "Comparison" | "Composition" | "Correlation" | "Monitoring";
  tags: string[];
  install: string;
  usage: string;
  props: ChartPropDefinition[];
  component: ComponentType<VizCardBaseProps>;
}

const sharedProps: ChartPropDefinition[] = [
  {
    name: "className",
    type: "string",
    defaultValue: "undefined",
    description: "Optional class names for layout overrides.",
  },
  {
    name: "compact",
    type: "boolean",
    defaultValue: "false",
    description: "Compresses spacing and chart height for dense dashboards.",
  },
];

export const chartLibrary: ChartComponentItem[] = [
  {
    slug: "line-chart",
    name: "Line Chart",
    summary: "Full dark line-chart UI kit inspired by your concept board.",
    description:
      "A complete line-chart concept system with multiple card variants: overall performance, sales report, compact metric cards, multi-line comparisons, area blends, and radial line composition.",
    category: "Trend",
    tags: ["trend", "timeseries", "line-kit"],
    install: "npm install lucide-react",
    usage: `import {
  LineChartKitBoard,
  LineOverallPerformanceCard,
  LineSalesReportCard,
} from "@/components/library/line-kit";

export function LineChartsShowcase() {
  return (
    <div className="space-y-4">
      <LineSalesReportCard />
      <LineOverallPerformanceCard />
      <LineChartKitBoard />
    </div>
  );
}`,
    props: [
      ...sharedProps,
      {
        name: "compact",
        type: "boolean",
        defaultValue: "false",
        description: "Renders a single compact line card for catalog usage.",
      },
    ],
    component: LineChartKitBoard,
  },
  {
    slug: "area-chart",
    name: "Area Chart",
    summary: "Layered actual-vs-benchmark area visualization.",
    description:
      "Use this when you need a richer story than a single line. It overlays target trajectories against observed values with minimal visual noise.",
    category: "Trend",
    tags: ["actual-vs-target", "volume", "trend"],
    install: "npm install lucide-react",
    usage: `import { AreaRangeCard } from "@/components/library/chart-cards";

export function SessionModule() {
  return <AreaRangeCard />;
}`,
    props: [
      ...sharedProps,
      {
        name: "actual",
        type: "number[]",
        defaultValue: "[22, 28, 30, 36, 34, 41, 39, 46, 44]",
        description: "Primary area series.",
      },
      {
        name: "benchmark",
        type: "number[]",
        defaultValue: "[18, 20, 24, 29, 31, 33, 36, 38, 40]",
        description: "Secondary dashed comparison series.",
      },
    ],
    component: AreaRangeCard,
  },
  {
    slug: "bar-chart",
    name: "Bar Chart",
    summary: "Vertical comparison bars with dense labels.",
    description:
      "A minimal bar system for categorical comparison. Good for acquisition channels, segment analysis, and quick side-by-side performance checks.",
    category: "Comparison",
    tags: ["category", "performance", "distribution"],
    install: "npm install lucide-react",
    usage: `import { BarComparisonCard } from "@/components/library/chart-cards";

export function ChannelModule() {
  return <BarComparisonCard />;
}`,
    props: [
      ...sharedProps,
      {
        name: "data",
        type: "{ label: string; value: number }[]",
        defaultValue: "[{ label: 'Ads', value: 72 }, ...]",
        description: "Categorical series for vertical bars.",
      },
    ],
    component: BarComparisonCard,
  },
  {
    slug: "column-chart",
    name: "Column Chart",
    summary: "Same primitive as Bar Chart, tuned for category decks.",
    description:
      "A column-oriented variant useful when your dashboard language prefers column terminology. Shares the same API as Bar Chart.",
    category: "Comparison",
    tags: ["column", "category", "dashboard"],
    install: "npm install lucide-react",
    usage: `import { BarComparisonCard } from "@/components/library/chart-cards";

export function ColumnModule() {
  return <BarComparisonCard title="Column Overview" />;
}`,
    props: sharedProps,
    component: BarComparisonCard,
  },
  {
    slug: "stacked-bars",
    name: "Stacked Bars",
    summary: "Segmented composition across periods.",
    description:
      "A compact stacked-bar card for cohort mix, retention mix, and split analysis where totals remain comparable across periods.",
    category: "Comparison",
    tags: ["stacked", "cohort", "mix"],
    install: "npm install lucide-react",
    usage: `import { StackedBarsCard } from "@/components/library/chart-cards";

export function CohortModule() {
  return <StackedBarsCard />;
}`,
    props: [
      ...sharedProps,
      {
        name: "data",
        type: "{ label: string; segments: Segment[] }[]",
        defaultValue: "Quarterly sample",
        description: "Stack definitions for each category row.",
      },
    ],
    component: StackedBarsCard,
  },
  {
    slug: "donut-chart",
    name: "Donut Chart",
    summary: "Ring composition chart with side legend.",
    description:
      "Focused donut for workload, budget, and channel split. High contrast slices with subtle card depth preserve readability in compact spaces.",
    category: "Composition",
    tags: ["donut", "proportion", "mix"],
    install: "npm install lucide-react",
    usage: `import { DonutCompositionCard } from "@/components/library/chart-cards";

export function MixModule() {
  return <DonutCompositionCard />;
}`,
    props: [
      ...sharedProps,
      {
        name: "data",
        type: "{ label: string; value: number; color: string }[]",
        defaultValue: "Pipeline/Model/Ops/QA sample",
        description: "Slices for donut geometry.",
      },
    ],
    component: DonutCompositionCard,
  },
  {
    slug: "pie-chart",
    name: "Pie Chart",
    summary: "Pie-compatible composition block.",
    description:
      "If your team asks for pie naming semantics, this entry maps to the same composition primitive and keeps API surface stable.",
    category: "Composition",
    tags: ["pie", "segments", "distribution"],
    install: "npm install lucide-react",
    usage: `import { DonutCompositionCard } from "@/components/library/chart-cards";

export function PieModule() {
  return <DonutCompositionCard title="Pie Composition" />;
}`,
    props: sharedProps,
    component: DonutCompositionCard,
  },
  {
    slug: "scatter-plot",
    name: "Scatter Plot",
    summary: "Correlation card with fitted trajectory.",
    description:
      "Use for relationship analysis across two variables, with a lightweight trendline to communicate directional confidence.",
    category: "Correlation",
    tags: ["scatter", "correlation", "insight"],
    install: "npm install lucide-react",
    usage: `import { ScatterClusterCard } from "@/components/library/chart-cards";

export function CorrelationModule() {
  return <ScatterClusterCard />;
}`,
    props: [
      ...sharedProps,
      {
        name: "points",
        type: "{ x: number; y: number; size?: number }[]",
        defaultValue: "9-point correlation sample",
        description: "Coordinates for scatter points.",
      },
    ],
    component: ScatterClusterCard,
  },
  {
    slug: "heatmap",
    name: "Heatmap",
    summary: "Matrix heatmap for density and cadence.",
    description:
      "Ideal for hourly/day activity maps and behavior intensity scoring. Uses multi-tone tiles for clear bands of emphasis.",
    category: "Monitoring",
    tags: ["heatmap", "density", "matrix"],
    install: "npm install lucide-react",
    usage: `import { HeatmapMatrixCard } from "@/components/library/chart-cards";

export function ActivityModule() {
  return <HeatmapMatrixCard />;
}`,
    props: [
      ...sharedProps,
      {
        name: "matrix",
        type: "number[][]",
        defaultValue: "5x7 intensity matrix",
        description: "Nested array of normalized intensities between 0 and 1.",
      },
    ],
    component: HeatmapMatrixCard,
  },
  {
    slug: "gauge-chart",
    name: "Gauge Chart",
    summary: "Radial monitor for reliability and progress.",
    description:
      "A semi-circular gauge tuned for SLA/SLO style monitoring. Strong center metric with bounded context on the scale.",
    category: "Monitoring",
    tags: ["gauge", "radial", "health"],
    install: "npm install lucide-react",
    usage: `import { RadialGaugeCard } from "@/components/library/chart-cards";

export function ReliabilityModule() {
  return <RadialGaugeCard value={96.2} />;
}`,
    props: [
      ...sharedProps,
      {
        name: "value",
        type: "number",
        defaultValue: "93.7",
        description: "Current measured score.",
      },
      {
        name: "min / max",
        type: "number",
        defaultValue: "0 / 100",
        description: "Lower and upper range bounds.",
      },
    ],
    component: RadialGaugeCard,
  },
];

const slugAliases: Record<string, string> = {
  "line": "line-chart",
  "area": "area-chart",
  "bar": "bar-chart",
  "column": "column-chart",
  "stacked-bar": "stacked-bars",
  "stacked-bar-chart": "stacked-bars",
  "donut": "donut-chart",
  "pie": "pie-chart",
  "scatter": "scatter-plot",
  "radial-gauge": "gauge-chart",
  "gauge": "gauge-chart",
};

export function resolveChartSlug(rawSlug: string): string {
  return slugAliases[rawSlug] ?? rawSlug;
}

export function findChartBySlug(slug: string): ChartComponentItem | undefined {
  const resolved = resolveChartSlug(slug);
  return chartLibrary.find((component) => component.slug === resolved);
}

export const chartCategories = [
  "All",
  "Trend",
  "Comparison",
  "Composition",
  "Correlation",
  "Monitoring",
] as const;

export type ChartCategoryFilter = (typeof chartCategories)[number];
