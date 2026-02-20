import { cn } from "@/lib/utils";

interface LineKitBlockProps {
  className?: string;
  compact?: boolean;
}

type Point = {
  x: number;
  y: number;
};

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const LINE_BLUE = "#1f70ff";
const LINE_CYAN = "#19e5ff";

const cardShell =
  "h-full rounded-[1.2rem] border border-white/10 bg-[#2f3448] text-white shadow-[0_12px_30px_rgba(11,14,26,0.36)]";

function chartPoints(data: number[], width: number, height: number, padding = 8): Point[] {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const spread = max - min || 1;

  return data.map((value, index) => ({
    x: padding + (index / (data.length - 1 || 1)) * (width - padding * 2),
    y: height - padding - ((value - min) / spread) * (height - padding * 2),
  }));
}

function smoothPath(points: Point[]): string {
  if (points.length < 2) {
    return "";
  }

  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 2; i += 1) {
    const current = points[i + 1];
    const next = points[i + 2];
    const controlX = (current.x + next.x) / 2;
    const controlY = (current.y + next.y) / 2;
    path += ` Q ${current.x} ${current.y} ${controlX} ${controlY}`;
  }

  const penultimate = points[points.length - 2];
  const last = points[points.length - 1];
  path += ` Q ${penultimate.x} ${penultimate.y} ${last.x} ${last.y}`;

  return path;
}

function areaPath(points: Point[], baseY: number): string {
  if (points.length === 0) {
    return "";
  }

  const line = smoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${baseY} L ${first.x} ${baseY} Z`;
}

function toCoordinates(values: number[], radius: number, center = 50): Point[] {
  return values.map((value, index) => {
    const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
    const r = radius * value;

    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });
}

function closedPath(points: Point[]): string {
  if (points.length === 0) {
    return "";
  }

  return `${smoothPath([...points, points[0]])} Z`;
}

function AxisLabels({ values, className }: { values: string[]; className?: string }) {
  return (
    <div className={cn("flex h-full flex-col justify-between text-[11px] leading-none text-white/68", className)}>
      {values.map((value) => (
        <span key={value} className="numeric">
          {value}
        </span>
      ))}
    </div>
  );
}

function MonthLabels({ values, className }: { values: string[]; className?: string }) {
  return (
    <div className={cn("flex justify-between text-[11px] text-white/70", className)}>
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}

function SectionTitle({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <header className={cn("space-y-1", className)}>
      <h3 className="text-[1.95rem] font-semibold tracking-[-0.035em] text-white">{title}</h3>
      {subtitle ? <p className="text-sm text-white/66">{subtitle}</p> : null}
    </header>
  );
}

function TrendDot({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill="rgba(25,229,255,0.2)" />
      <circle cx={x} cy={y} r="4" fill={LINE_CYAN} />
    </g>
  );
}

export function LineOverallPerformanceCard({ className, compact }: LineKitBlockProps) {
  const data = [52, 70, 33, 79, 47, 82];
  const width = 280;
  const height = 150;
  const points = chartPoints(data, width, height, 8);

  return (
    <section className={cn(cardShell, compact ? "p-4" : "p-6", className)}>
      <SectionTitle
        title="Overall Performance"
        subtitle="Customizable templates"
        className={compact ? "[&>h3]:text-[1.35rem] [&>p]:text-xs" : undefined}
      />

      <div className={cn("mt-4 grid grid-cols-[30px_minmax(0,1fr)] gap-3", compact ? "h-[162px]" : "h-[194px]")}>
        <AxisLabels values={["90%", "70%", "50%", "30%", "10%"]} />

        <div className="flex flex-col">
          <div className="relative flex-1">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
              {points.map((point) => (
                <line
                  key={`v-${point.x}`}
                  x1={point.x}
                  y1={4}
                  x2={point.x}
                  y2={height - 5}
                  stroke="rgba(255,255,255,0.4)"
                  strokeDasharray="5 8"
                  strokeWidth="1"
                />
              ))}

              <path d={smoothPath(points)} fill="none" stroke={LINE_BLUE} strokeWidth="2.35" strokeLinecap="round" strokeLinejoin="round" />
              <path d={smoothPath(points)} fill="none" stroke={LINE_CYAN} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
              <TrendDot x={points[points.length - 1].x} y={points[points.length - 1].y} />
            </svg>
          </div>

          <div className="mt-2 border-t border-white/30 pt-2">
            <MonthLabels values={MONTHS_SHORT} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineSalesReportCard({ className, compact }: LineKitBlockProps) {
  const data = [23, 48, 31, 45, 12, 46];
  const width = 360;
  const height = compact ? 128 : 148;
  const points = chartPoints(data, width, height, 6);
  const marker = points[3];

  return (
    <section className={cn(cardShell, compact ? "p-4" : "p-6", className)}>
      <SectionTitle
        title="Sales Report"
        subtitle="Trajectory and period comparison"
        className={compact ? "[&>h3]:text-[1.45rem] [&>p]:text-xs" : undefined}
      />

      <div className="mt-4 grid grid-cols-[32px_minmax(0,1fr)] gap-3">
        <AxisLabels values={["50%", "40%", "30%", "20%", "10%"]} />

        <div>
          <div className={cn("relative", compact ? "h-[132px]" : "h-[154px]")}>
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
              {[0, 1, 2, 3, 4].map((line) => {
                const y = 6 + line * ((height - 12) / 4);
                return (
                  <line
                    key={line}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="rgba(255,255,255,0.28)"
                    strokeDasharray="6 9"
                    strokeWidth="1"
                  />
                );
              })}

              <path d={smoothPath(points)} fill="none" stroke={LINE_BLUE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d={smoothPath(points)} fill="none" stroke={LINE_CYAN} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <TrendDot x={marker.x} y={marker.y} />
            </svg>

            <div
              className="numeric absolute rounded-md bg-black/90 px-2 py-1 text-[11px]"
              style={{
                left: `${(marker.x / width) * 100}%`,
                top: `${(marker.y / height) * 100}%`,
                transform: "translate(-50%, -155%)",
              }}
            >
              4.62k
            </div>
          </div>

          <div className="mt-2 border-t border-white/30 pt-2">
            <MonthLabels values={MONTHS_SHORT} />
          </div>

          {!compact ? (
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
              <div className="space-y-1">
                <p className="numeric text-[2.1rem] font-semibold leading-none text-cyan-300">$4.63k</p>
                <p className="text-xs text-white/68">2 Jan - 17 Feb</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="numeric text-[2.1rem] font-semibold leading-none text-cyan-300">$12.73k</p>
                <p className="text-xs text-white/68">23 Feb - 18 Apr</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function LineMiniSalesCard({ className }: Pick<LineKitBlockProps, "className">) {
  const data = [0.2, 0.22, 0.3, 0.34, 0.18, 0.21, 0.38, 0.31, 0.26, 0.35, 0.41, 0.4];
  const width = 168;
  const height = 86;
  const points = chartPoints(data, width, height, 4);

  return (
    <section className={cn(cardShell, "p-4", className)}>
      <div className="grid h-full grid-cols-[1fr_170px] gap-3">
        <div className="space-y-1 self-start">
          <p className="text-[1.75rem] font-semibold tracking-[-0.03em]">Sales Report</p>
          <p className="numeric text-[2rem] font-semibold leading-none text-cyan-300">$4.63k</p>
          <p className="text-xs text-white/66">2 Jan - 17 Feb</p>
        </div>

        <div className="grid grid-cols-[1fr_22px] gap-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
            {[0.1, 0.2, 0.3, 0.4].map((tick) => {
              const y = height - (tick / 0.4) * height;
              return <line key={tick} x1={0} y1={y} x2={width} y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />;
            })}

            <path d={smoothPath(points)} fill="none" stroke={LINE_BLUE} strokeWidth="2.2" />
            <path d={smoothPath(points)} fill="none" stroke={LINE_CYAN} strokeWidth="1" />
          </svg>

          <div className="flex flex-col justify-between text-[10px] leading-none text-white/64">
            <span>0.4</span>
            <span>0.3</span>
            <span>0.2</span>
            <span>0.1</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineDualMetricCard({ className }: Pick<LineKitBlockProps, "className">) {
  const data = [0.14, 0.21, 0.42, 0.18, 0.11, 0.28, 0.31, 0.49];
  const width = 160;
  const height = 138;
  const points = chartPoints(data, width, height, 6);

  return (
    <section className={cn(cardShell, "p-4", className)}>
      <div className="grid h-full grid-cols-[1fr_160px] gap-4">
        <div className="space-y-4">
          <div>
            <p className="numeric text-[2rem] font-semibold leading-none text-cyan-300">$4.63k</p>
            <p className="text-xs text-white/68">942% from Feb 12 - Mar 4</p>
          </div>

          <div>
            <p className="numeric text-[2rem] font-semibold leading-none text-pink-400">$0.46k</p>
            <p className="text-xs text-white/68">942% from Mar 23 - Apr 8</p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="relative flex-1">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
              {points.map((point) => (
                <line key={`v-${point.x}`} x1={point.x} y1={2} x2={point.x} y2={height - 2} stroke="rgba(255,255,255,0.35)" />
              ))}

              <path d={smoothPath(points)} fill="none" stroke={LINE_BLUE} strokeWidth="2.2" />
              <path d={smoothPath(points)} fill="none" stroke={LINE_CYAN} strokeWidth="1.15" />
              <TrendDot x={points[2].x} y={points[2].y} />
            </svg>
          </div>

          <div className="mt-1">
            <MonthLabels values={["Jan", "Feb", "Mar", "Apr", "May"]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineMultiTrendCard({ className }: Pick<LineKitBlockProps, "className">) {
  const width = 274;
  const height = 146;
  const sets = [
    [0.32, 0.28, 0.37, 0.34, 0.22, 0.29, 0.27, 0.25],
    [0.21, 0.27, 0.31, 0.2, 0.24, 0.19, 0.36, 0.39],
    [0.14, 0.2, 0.18, 0.25, 0.22, 0.18, 0.16, 0.1],
    [0.35, 0.29, 0.23, 0.3, 0.27, 0.31, 0.15, 0.1],
  ];

  const colors = [LINE_BLUE, LINE_CYAN, "#69b8ff", "#2ad6d8"];

  return (
    <section className={cn(cardShell, "p-5", className)}>
      <SectionTitle title="Sales Report" subtitle="Interaction" className="[&>h3]:text-[2rem]" />
      <p className="mt-1 text-xs text-white/68">942% from Feb 12 - Apr 4</p>

      <div className="mt-3 grid grid-cols-[30px_minmax(0,1fr)] gap-3">
        <AxisLabels values={["0.4", "0.3", "0.2", "0.1"]} />

        <div>
          <svg viewBox={`0 0 ${width} ${height}`} className="h-[160px] w-full" preserveAspectRatio="none">
            {[0.1, 0.2, 0.3, 0.4].map((tick) => {
              const y = height - (tick / 0.4) * height;
              return <line key={tick} x1={0} y1={y} x2={width} y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />;
            })}

            {sets.map((set, index) => {
              const points = chartPoints(set, width, height, 6);
              return (
                <path
                  key={`set-${index}`}
                  d={smoothPath(points)}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth={index === 1 ? 2.4 : 1.5}
                  strokeOpacity={index === 1 ? 1 : 0.8}
                />
              );
            })}

            {(() => {
              const points = chartPoints(sets[1], width, height, 6);
              return <TrendDot x={points[4].x} y={points[4].y} />;
            })()}
          </svg>

          <div className="mt-2 flex items-end justify-between border-t border-white/20 pt-3">
            <div>
              <p className="text-[11px] text-white/65">weekly</p>
              <p className="numeric text-[2rem] font-semibold leading-none text-cyan-300">$1.33k</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-white/65">monthly</p>
              <p className="numeric text-[2rem] font-semibold leading-none text-cyan-300">$4.63k</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineAreaProgressCard({ className }: Pick<LineKitBlockProps, "className">) {
  const data = [30, 40, 22, 48, 31, 40, 21, 22, 47];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const width = 372;
  const height = 176;
  const points = chartPoints(data, width, height, 8);

  return (
    <section className={cn(cardShell, "p-5", className)}>
      <SectionTitle title="Sales Report" subtitle="Area + progression blend" className="[&>h3]:text-[2rem]" />

      <div className="mt-3 grid grid-cols-[30px_minmax(0,1fr)] gap-3">
        <AxisLabels values={["50%", "40%", "30%", "20%", "10%"]} />

        <div>
          <div className="relative h-[196px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line-area-kit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={LINE_CYAN} stopOpacity="0.72" />
                  <stop offset="100%" stopColor={LINE_CYAN} stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3, 4].map((line) => {
                const y = 8 + line * ((height - 16) / 4);
                return (
                  <line
                    key={line}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="rgba(255,255,255,0.28)"
                    strokeDasharray="7 10"
                    strokeWidth="1"
                  />
                );
              })}

              {[1, 6].map((index) => {
                const x = points[index].x - 24;
                return (
                  <rect key={`bar-${index}`} x={x} y={height - 114} width="48" height="114" fill="url(#line-area-kit)" opacity="0.88" />
                );
              })}

              <path d={areaPath(points, height - 6)} fill="url(#line-area-kit)" opacity="0.4" />
              <path d={smoothPath(points)} fill="none" stroke={LINE_BLUE} strokeWidth="2.45" />
              <path d={smoothPath(points)} fill="none" stroke={LINE_CYAN} strokeWidth="1.15" />

              <TrendDot x={points[1].x} y={points[1].y} />
              <TrendDot x={points[5].x} y={points[5].y} />
            </svg>
          </div>

          <div className="mt-2 border-t border-white/30 pt-2">
            <MonthLabels values={months} className="text-[11px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineRadialComparisonCard({ className }: Pick<LineKitBlockProps, "className">) {
  const income = [0.8, 0.74, 0.87, 0.68, 0.58, 0.83, 0.7, 0.6, 0.77, 0.66, 0.81, 0.72];
  const expense = [0.68, 0.79, 0.7, 0.59, 0.84, 0.75, 0.62, 0.71, 0.65, 0.79, 0.63, 0.74];
  const incomePoints = toCoordinates(income, 42);
  const expensePoints = toCoordinates(expense, 42);

  return (
    <section className={cn(cardShell, "p-5", className)}>
      <div className="mx-auto max-w-[220px]">
        <svg viewBox="0 0 100 100" className="h-56 w-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.36)" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.2)" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.32)" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.32)" />

          <path d={closedPath(incomePoints)} fill="none" stroke={LINE_BLUE} strokeWidth="1.6" strokeLinecap="round" />
          <path d={closedPath(expensePoints)} fill="none" stroke={LINE_CYAN} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-5 border-t border-white/20 pt-3">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-white/76">
            <span className="h-2.5 w-2.5 bg-blue-500" /> Income
          </div>
          <p className="numeric text-[2.1rem] font-semibold leading-none text-cyan-300">$5.73k</p>
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-white/76">
            <span className="h-2.5 w-2.5 bg-cyan-300" /> Expense
          </div>
          <p className="numeric text-[2.1rem] font-semibold leading-none text-cyan-300">$1.63k</p>
        </div>
      </div>
    </section>
  );
}

export function LineChartKitBoard({ className, compact }: LineKitBlockProps) {
  if (compact) {
    return <LineOverallPerformanceCard compact className={className} />;
  }

  return (
    <div className={cn("space-y-5", className)}>
      <div className="grid gap-5 xl:grid-cols-[1fr_1.15fr_0.95fr]">
        <LineOverallPerformanceCard className="h-[22rem]" />
        <LineSalesReportCard className="h-[22rem]" />

        <div className="grid gap-5 xl:grid-rows-2">
          <LineMiniSalesCard className="h-[10.5rem]" />
          <LineDualMetricCard className="h-[11rem]" />
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.45fr_0.95fr]">
        <LineMultiTrendCard className="h-[23rem]" />
        <LineAreaProgressCard className="h-[23rem]" />
        <LineRadialComparisonCard className="h-[23rem]" />
      </div>
    </div>
  );
}

export default LineChartKitBoard;
