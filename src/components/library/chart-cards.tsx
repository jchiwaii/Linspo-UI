import { useId } from "react";
import { ArrowDownRight, ArrowUpRight, Dot } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VizCardBaseProps {
  className?: string;
  compact?: boolean;
}

interface FrameProps extends VizCardBaseProps {
  title: string;
  subtitle: string;
  metric: string;
  delta: string;
  tone?: "up" | "down" | "flat";
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function ChartFrame({
  className,
  compact,
  title,
  subtitle,
  metric,
  delta,
  tone = "up",
  children,
  footer,
}: FrameProps) {
  return (
    <article
      className={cn(
        "surface-panel relative overflow-hidden rounded-xl",
        compact ? "p-4" : "p-5",
        className
      )}
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-chart-1/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-chart-2/10 blur-3xl" />

      <header className={cn("relative z-10 flex items-start justify-between gap-3", compact ? "mb-4" : "mb-5") }>
        <div>
          <p className={cn("font-semibold text-foreground", compact ? "text-sm" : "text-base")}>{title}</p>
          <p className={cn("text-muted-foreground", compact ? "text-xs" : "text-sm")}>{subtitle}</p>
        </div>

        <div className="text-right">
          <p className={cn("numeric text-foreground", compact ? "text-lg font-semibold" : "text-2xl font-semibold")}>
            {metric}
          </p>
          <p
            className={cn(
              "numeric inline-flex items-center gap-1 text-xs font-medium",
              tone === "up" && "text-chart-3",
              tone === "down" && "text-destructive",
              tone === "flat" && "text-muted-foreground"
            )}
          >
            {tone === "up" && <ArrowUpRight className="h-3 w-3" />}
            {tone === "down" && <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </p>
        </div>
      </header>

      <div className={cn("relative z-10", compact ? "h-36" : "h-44")}>{children}</div>
      {footer ? (
        <footer className={cn("relative z-10 border-t border-border/70", compact ? "mt-3 pt-3" : "mt-4 pt-4")}>
          {footer}
        </footer>
      ) : null}
    </article>
  );
}

function toPolylinePoints(data: number[], width: number, height: number, padding = 8) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const spread = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1 || 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((value - min) / spread) * (height - padding * 2);
    return { x, y, value };
  });

  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${padding},${height - padding} ${polyline} ${width - padding},${height - padding}`;

  return { points, polyline, area };
}

function normalizeSeries(series: number[], width: number, height: number, padding = 8) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const spread = max - min || 1;

  return series.map((value, index) => ({
    x: padding + (index / (series.length - 1 || 1)) * (width - padding * 2),
    y: height - padding - ((value - min) / spread) * (height - padding * 2),
    value,
  }));
}

export interface TrendLineCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  labels?: string[];
  data?: number[];
}

export function TrendLineCard({
  className,
  compact,
  title = "Revenue Velocity",
  subtitle = "Trailing 10 intervals",
  metric = "$3.82M",
  delta = "+18.4%",
  tone = "up",
  labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"],
  data = [36, 42, 39, 51, 49, 58, 55, 66, 63, 74],
}: TrendLineCardProps) {
  const id = useId().replace(/[:]/g, "");
  const width = 340;
  const height = compact ? 130 : 150;
  const { points, polyline, area } = toPolylinePoints(data, width, height, 10);

  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
      footer={
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          {labels.slice(0, compact ? 4 : 6).map((label) => (
            <span key={label}>{label}</span>
          ))}
          <span className="numeric text-chart-1">NOW</span>
        </div>
      }
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-label="Line trend">
        <defs>
          <linearGradient id={`trend-area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.42" />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => {
          const y = 12 + line * ((height - 24) / 3);
          return (
            <line
              key={line}
              x1={8}
              y1={y}
              x2={width - 8}
              y2={y}
              stroke="var(--border)"
              strokeOpacity="0.6"
              strokeDasharray="4 6"
              strokeWidth="1"
            />
          );
        })}

        <polygon points={area} fill={`url(#trend-area-${id})`} />
        <polyline
          points={polyline}
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={index === points.length - 1 ? 4.8 : 2.8}
            fill={index === points.length - 1 ? "var(--chart-2)" : "var(--chart-1)"}
            className={index === points.length - 1 ? "pulse-ring" : undefined}
          />
        ))}
      </svg>
    </ChartFrame>
  );
}

export interface AreaRangeCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  actual?: number[];
  benchmark?: number[];
}

export function AreaRangeCard({
  className,
  compact,
  title = "Active Sessions",
  subtitle = "Actual vs benchmark",
  metric = "148K",
  delta = "+9.2%",
  tone = "up",
  actual = [22, 28, 30, 36, 34, 41, 39, 46, 44],
  benchmark = [18, 20, 24, 29, 31, 33, 36, 38, 40],
}: AreaRangeCardProps) {
  const id = useId().replace(/[:]/g, "");
  const width = 340;
  const height = compact ? 130 : 150;
  const actualSeries = normalizeSeries(actual, width, height, 10);
  const benchmarkSeries = normalizeSeries(benchmark, width, height, 10);
  const actualLine = actualSeries.map((point) => `${point.x},${point.y}`).join(" ");
  const benchmarkLine = benchmarkSeries.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `10,${height - 10} ${actualLine} ${width - 10},${height - 10}`;

  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
      footer={
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Dot className="h-4 w-4 text-chart-1" /> Actual
          </span>
          <span className="inline-flex items-center gap-1">
            <Dot className="h-4 w-4 text-chart-5" /> Benchmark
          </span>
        </div>
      }
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" aria-label="Area range">
        <defs>
          <linearGradient id={`area-fill-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-3)" stopOpacity="0.44" />
            <stop offset="100%" stopColor="var(--chart-3)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((line) => {
          const y = 12 + line * ((height - 24) / 3);
          return (
            <line
              key={line}
              x1={8}
              y1={y}
              x2={width - 8}
              y2={y}
              stroke="var(--border)"
              strokeOpacity="0.56"
              strokeDasharray="3 5"
            />
          );
        })}

        <polygon points={area} fill={`url(#area-fill-${id})`} />
        <polyline points={actualLine} fill="none" stroke="var(--chart-3)" strokeWidth="2.8" strokeLinecap="round" />
        <polyline
          points={benchmarkLine}
          fill="none"
          stroke="var(--chart-5)"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
      </svg>
    </ChartFrame>
  );
}

export interface BarComparisonCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  data?: { label: string; value: number }[];
}

export function BarComparisonCard({
  className,
  compact,
  title = "Channel Lift",
  subtitle = "Conversion by source",
  metric = "4.8%",
  delta = "+0.7%",
  tone = "up",
  data = [
    { label: "Ads", value: 72 },
    { label: "SEO", value: 54 },
    { label: "Social", value: 61 },
    { label: "Email", value: 44 },
    { label: "Direct", value: 68 },
  ],
}: BarComparisonCardProps) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
    >
      <div className="flex h-full items-end gap-3 pt-2">
        {data.map((item, index) => {
          const height = (item.value / max) * 100;
          return (
            <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full rounded-md bg-muted/70" style={{ height: "100%" }}>
                <div
                  className="absolute bottom-0 w-full rounded-md bg-chart-2 transition-all duration-500"
                  style={{
                    height: `${height}%`,
                    opacity: index === data.length - 1 ? 1 : 0.75,
                  }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

export interface StackedBarsCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  data?: {
    label: string;
    segments: { name: string; value: number; tone: "chart-1" | "chart-2" | "chart-4" }[];
  }[];
}

export function StackedBarsCard({
  className,
  compact,
  title = "Retention Mix",
  subtitle = "New, returning, churn-risk",
  metric = "82.1%",
  delta = "+4.1%",
  tone = "up",
  data = [
    {
      label: "Q1",
      segments: [
        { name: "New", value: 34, tone: "chart-1" },
        { name: "Returning", value: 46, tone: "chart-2" },
        { name: "Risk", value: 20, tone: "chart-4" },
      ],
    },
    {
      label: "Q2",
      segments: [
        { name: "New", value: 28, tone: "chart-1" },
        { name: "Returning", value: 54, tone: "chart-2" },
        { name: "Risk", value: 18, tone: "chart-4" },
      ],
    },
    {
      label: "Q3",
      segments: [
        { name: "New", value: 30, tone: "chart-1" },
        { name: "Returning", value: 55, tone: "chart-2" },
        { name: "Risk", value: 15, tone: "chart-4" },
      ],
    },
  ],
}: StackedBarsCardProps) {
  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
      footer={
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Dot className="h-4 w-4 text-chart-1" />New</span>
          <span className="inline-flex items-center gap-1"><Dot className="h-4 w-4 text-chart-2" />Returning</span>
          <span className="inline-flex items-center gap-1"><Dot className="h-4 w-4 text-chart-4" />Risk</span>
        </div>
      }
    >
      <div className="flex h-full flex-col justify-center gap-4">
        {data.map((row) => {
          const total = row.segments.reduce((sum, segment) => sum + segment.value, 0);
          return (
            <div key={row.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{row.label}</span>
                <span className="numeric text-foreground">{total}%</span>
              </div>
              <div className="flex h-4 overflow-hidden rounded-md bg-muted/70">
                {row.segments.map((segment) => (
                  <div
                    key={segment.name}
                    className={cn(
                      segment.tone === "chart-1" && "bg-chart-1",
                      segment.tone === "chart-2" && "bg-chart-2",
                      segment.tone === "chart-4" && "bg-chart-4"
                    )}
                    style={{ width: `${segment.value}%` }}
                    title={`${segment.name}: ${segment.value}%`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

export interface DonutCompositionCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  data?: { label: string; value: number; color: string }[];
}

export function DonutCompositionCard({
  className,
  compact,
  title = "Workload Split",
  subtitle = "By execution stream",
  metric = "96 Tasks",
  delta = "Steady",
  tone = "flat",
  data = [
    { label: "Pipeline", value: 41, color: "var(--chart-1)" },
    { label: "Model", value: 27, color: "var(--chart-2)" },
    { label: "Ops", value: 18, color: "var(--chart-5)" },
    { label: "QA", value: 14, color: "var(--chart-4)" },
  ],
}: DonutCompositionCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = compact ? 48 : 58;
  const innerRadius = compact ? 30 : 38;

  let cursor = -Math.PI / 2;
  const slices = data.map((slice) => {
    const angle = (slice.value / total) * Math.PI * 2;
    const start = cursor;
    const end = cursor + angle;
    cursor = end;

    const outerStart = {
      x: 80 + radius * Math.cos(start),
      y: 80 + radius * Math.sin(start),
    };
    const outerEnd = {
      x: 80 + radius * Math.cos(end),
      y: 80 + radius * Math.sin(end),
    };
    const innerStart = {
      x: 80 + innerRadius * Math.cos(end),
      y: 80 + innerRadius * Math.sin(end),
    };
    const innerEnd = {
      x: 80 + innerRadius * Math.cos(start),
      y: 80 + innerRadius * Math.sin(start),
    };

    const largeArc = angle > Math.PI ? 1 : 0;

    return {
      ...slice,
      percent: Math.round((slice.value / total) * 100),
      path: `M ${outerStart.x} ${outerStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerStart.x} ${innerStart.y} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y} Z`,
    };
  });

  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
    >
      <div className={cn("grid h-full items-center gap-3", compact ? "grid-cols-1" : "grid-cols-[1fr_auto]")}>
        <div className="flex h-full items-center justify-center">
          <svg viewBox="0 0 160 160" className="h-full max-h-[150px] w-full max-w-[180px]">
            {slices.map((slice) => (
              <path key={slice.label} d={slice.path} fill={slice.color} stroke="var(--card)" strokeWidth="2" />
            ))}
          </svg>
        </div>

        <ul className={cn("space-y-1.5", compact && "hidden") }>
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: slice.color }} />
                {slice.label}
              </span>
              <span className="numeric text-foreground">{slice.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartFrame>
  );
}

export interface ScatterClusterCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  points?: { x: number; y: number; size?: number }[];
}

export function ScatterClusterCard({
  className,
  compact,
  title = "Impact Correlation",
  subtitle = "Cost vs ROI",
  metric = "r = 0.82",
  delta = "Strong fit",
  tone = "flat",
  points = [
    { x: 14, y: 26, size: 5 },
    { x: 22, y: 33, size: 7 },
    { x: 29, y: 31, size: 4 },
    { x: 36, y: 45, size: 8 },
    { x: 46, y: 52, size: 6 },
    { x: 54, y: 57, size: 5 },
    { x: 63, y: 61, size: 9 },
    { x: 71, y: 69, size: 6 },
    { x: 82, y: 74, size: 8 },
  ],
}: ScatterClusterCardProps) {
  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
      footer={
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Low Spend</span>
          <span className="numeric">High Spend</span>
        </div>
      }
    >
      <svg viewBox="0 0 340 150" className="h-full w-full" aria-label="Scatter correlation">
        {[0, 1, 2, 3].map((line) => {
          const y = 20 + line * 34;
          return (
            <line
              key={`h-${line}`}
              x1="18"
              y1={y}
              x2="324"
              y2={y}
              stroke="var(--border)"
              strokeOpacity="0.55"
              strokeDasharray="3 6"
            />
          );
        })}

        {[0, 1, 2, 3, 4].map((line) => {
          const x = 18 + line * 76;
          return (
            <line
              key={`v-${line}`}
              x1={x}
              y1="20"
              x2={x}
              y2="124"
              stroke="var(--border)"
              strokeOpacity="0.4"
              strokeDasharray="3 6"
            />
          );
        })}

        <line x1="24" y1="112" x2="314" y2="34" stroke="var(--chart-2)" strokeWidth="2.5" strokeDasharray="8 5" />

        {points.map((point, index) => (
          <circle
            key={`${point.x}-${point.y}-${index}`}
            cx={point.x * 3.4}
            cy={130 - point.y}
            r={point.size ?? 5}
            fill={index % 3 === 0 ? "var(--chart-1)" : index % 3 === 1 ? "var(--chart-3)" : "var(--chart-5)"}
            fillOpacity="0.8"
          />
        ))}
      </svg>
    </ChartFrame>
  );
}

export interface HeatmapMatrixCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  matrix?: number[][];
}

export function HeatmapMatrixCard({
  className,
  compact,
  title = "Engagement Heatmap",
  subtitle = "Weekly interaction density",
  metric = "86.2",
  delta = "+6.3 pts",
  tone = "up",
  matrix = [
    [0.18, 0.25, 0.31, 0.4, 0.52, 0.61, 0.44],
    [0.2, 0.28, 0.38, 0.5, 0.67, 0.72, 0.49],
    [0.24, 0.33, 0.44, 0.56, 0.73, 0.78, 0.58],
    [0.2, 0.3, 0.41, 0.53, 0.64, 0.7, 0.57],
    [0.15, 0.24, 0.37, 0.46, 0.59, 0.63, 0.45],
  ],
}: HeatmapMatrixCardProps) {
  const tones = ["var(--chart-1)", "var(--chart-3)", "var(--chart-2)"];

  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
    >
      <div className="grid h-full gap-2" style={{ gridTemplateRows: `repeat(${matrix.length}, minmax(0, 1fr))` }}>
        {matrix.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}>
            {row.map((value, colIndex) => {
              const tone = tones[(rowIndex + colIndex) % tones.length];
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="h-full rounded-md border border-border/60"
                  style={{
                    background: tone,
                    opacity: 0.2 + value * 0.85,
                  }}
                  title={`Intensity ${Math.round(value * 100)}%`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

export interface RadialGaugeCardProps extends VizCardBaseProps {
  title?: string;
  subtitle?: string;
  metric?: string;
  delta?: string;
  tone?: "up" | "down" | "flat";
  value?: number;
  min?: number;
  max?: number;
}

export function RadialGaugeCard({
  className,
  compact,
  title = "SLO Confidence",
  subtitle = "Live reliability index",
  metric = "93.7%",
  delta = "+1.2",
  tone = "up",
  value = 93.7,
  min = 0,
  max = 100,
}: RadialGaugeCardProps) {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  const circumference = 260;
  const progress = circumference * normalized;

  return (
    <ChartFrame
      className={className}
      compact={compact}
      title={title}
      subtitle={subtitle}
      metric={metric}
      delta={delta}
      tone={tone}
      footer={
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="numeric">{min}</span>
          <span>Target 95</span>
          <span className="numeric">{max}</span>
        </div>
      }
    >
      <div className="relative flex h-full items-center justify-center">
        <svg viewBox="0 0 240 160" className="h-full w-full max-w-[320px]">
          <path
            d="M 22 132 A 98 98 0 0 1 218 132"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M 22 132 A 98 98 0 0 1 218 132"
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth="16"
            strokeLinecap="round"
            pathLength={circumference}
            strokeDasharray={`${progress} ${circumference}`}
          />

          <circle cx="120" cy="132" r="4" fill="var(--chart-1)" />
        </svg>
        <div className="absolute top-[44%] flex -translate-y-1/2 flex-col items-center">
          <span className="numeric text-3xl font-semibold text-foreground">{value.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">health score</span>
        </div>
      </div>
    </ChartFrame>
  );
}
