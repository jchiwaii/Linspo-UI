import { cn } from "@/lib/utils";

interface LineKitBlockProps {
  className?: string;
  compact?: boolean;
}

type Point = {
  x: number;
  y: number;
};

const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const lineBlue = "#1f70ff";
const lineCyan = "#19e5ff";

function chartPoints(data: number[], width: number, height: number): Point[] {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const spread = max - min || 1;

  return data.map((value, index) => ({
    x: (index / (data.length - 1 || 1)) * width,
    y: height - ((value - min) / spread) * height,
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

const cardShell =
  "rounded-[1.2rem] border border-white/10 bg-[#2f3448] text-white shadow-[0_16px_28px_rgba(9,12,20,0.34)]";

function AxisLabels({ values }: { values: string[] }) {
  return (
    <div className="flex h-full flex-col justify-between text-[11px] text-white/75">
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}

export function LineOverallPerformanceCard({ className, compact }: LineKitBlockProps) {
  const data = [52, 70, 33, 79, 47, 82];
  const width = 260;
  const height = 140;
  const points = chartPoints(data, width, height);
  const path = smoothPath(points);

  return (
    <section className={cn(cardShell, compact ? "p-4" : "p-6", className)}>
      <header>
        <h3 className={cn("font-bold tracking-[-0.02em]", compact ? "text-xl" : "text-2xl")}>Overall Performance</h3>
        <p className="text-sm text-white/70">Customizable Templates</p>
      </header>

      <div className={cn("mt-5 grid grid-cols-[30px_1fr] gap-3", compact ? "h-40" : "h-44")}>
        <AxisLabels values={["90%", "70%", "50%", "30%", "10%"]} />

        <div className="relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
            {points.map((point, index) => (
              <line
                key={`v-${index}`}
                x1={point.x}
                y1={4}
                x2={point.x}
                y2={height - 2}
                stroke="rgba(255,255,255,0.44)"
                strokeDasharray="4 8"
                strokeWidth="1"
              />
            ))}

            <path d={path} fill="none" stroke={lineBlue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d={path} fill="none" stroke={lineCyan} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4.2" fill={lineCyan} />
          </svg>

          <div className="mt-3 border-t border-white/35 pt-2">
            <div className="flex justify-between text-xs text-white/80">
              {monthsShort.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineSalesReportCard({ className, compact }: LineKitBlockProps) {
  const data = [23, 48, 31, 45, 12, 46];
  const width = 360;
  const height = compact ? 128 : 146;
  const points = chartPoints(data, width, height);
  const path = smoothPath(points);
  const marker = points[3];

  return (
    <section className={cn(cardShell, compact ? "p-4" : "p-6", className)}>
      <h3 className={cn("font-bold tracking-[-0.02em]", compact ? "text-xl" : "text-[2rem]")}>Sales Report</h3>

      <div className="mt-4 grid grid-cols-[34px_1fr] gap-3">
        <AxisLabels values={["50%", "40%", "30%", "20%", "10%"]} />

        <div>
          <div className={cn("relative", compact ? "h-36" : "h-44")}>
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
              {[0, 1, 2, 3, 4].map((line) => {
                const y = (line / 4) * height;
                return (
                  <line
                    key={line}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="rgba(255,255,255,0.3)"
                    strokeDasharray="6 8"
                    strokeWidth="1"
                  />
                );
              })}

              <path d={path} fill="none" stroke={lineBlue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d={path} fill="none" stroke={lineCyan} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={marker.x} cy={marker.y} r="5" fill={lineCyan} />
            </svg>

            <div
              className="numeric absolute rounded-md bg-black/90 px-2.5 py-1 text-xs"
              style={{ left: `${(marker.x / width) * 100}%`, top: `${(marker.y / height) * 100}%`, transform: "translate(-50%, -150%)" }}
            >
              4.62k
            </div>
          </div>

          <div className="mt-3 border-t border-white/35 pt-2">
            <div className="flex justify-between text-xs text-white/80">
              {monthsShort.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>

          {!compact ? (
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
              <div>
                <p className="numeric text-4xl font-semibold text-cyan-300">$4.63k</p>
                <p className="text-xs text-white/70">2 Jan - 17 Feb</p>
              </div>
              <div>
                <p className="numeric text-4xl font-semibold text-cyan-300">$12.73k</p>
                <p className="text-xs text-white/70">23 Feb - 18 Apr</p>
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
  const width = 150;
  const height = 78;
  const points = chartPoints(data, width, height);

  return (
    <section className={cn(cardShell, "p-4", className)}>
      <div className="grid grid-cols-[1fr_148px] gap-3">
        <div>
          <p className="text-2xl font-bold tracking-[-0.02em]">Sales Report</p>
          <p className="numeric mt-1 text-[2rem] font-semibold text-cyan-300">$4.63k</p>
          <p className="text-xs text-white/70">2 Jan - 17 Feb</p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-20 w-full" preserveAspectRatio="none">
            {[0.1, 0.2, 0.3, 0.4].map((tick) => {
              const y = height - (tick / 0.4) * height;
              return <line key={tick} x1={0} y1={y} x2={width} y2={y} stroke="rgba(255,255,255,0.34)" strokeWidth="1" />;
            })}

            <path d={smoothPath(points)} fill="none" stroke={lineBlue} strokeWidth="2" />
            <path d={smoothPath(points)} fill="none" stroke={lineCyan} strokeWidth="1" />
          </svg>

          <div className="flex flex-col justify-between text-[11px] text-white/70">
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
  const width = 150;
  const height = 140;
  const points = chartPoints(data, width, height);

  return (
    <section className={cn(cardShell, "p-4", className)}>
      <div className="grid grid-cols-[1fr_150px] gap-4">
        <div>
          <p className="text-2xl font-bold tracking-[-0.02em]">$4.63k</p>
          <p className="text-xs text-white/80">942% from Feb 12 - mar 4</p>

          <p className="mt-5 text-2xl font-bold tracking-[-0.02em] text-pink-400">$0.46k</p>
          <p className="text-xs text-white/80">942% from mar 23 - Apr 8</p>
        </div>

        <div>
          <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full" preserveAspectRatio="none">
            {points.map((point) => (
              <line key={`v-${point.x}`} x1={point.x} y1={2} x2={point.x} y2={height} stroke="rgba(255,255,255,0.35)" />
            ))}

            <path d={smoothPath(points)} fill="none" stroke={lineBlue} strokeWidth="2.1" />
            <path d={smoothPath(points)} fill="none" stroke={lineCyan} strokeWidth="1.2" />
            <circle cx={points[2].x} cy={points[2].y} r="4" fill={lineCyan} />
          </svg>

          <div className="mt-1 flex justify-between text-xs text-white/80">
            {["Jan", "Feb", "Mar", "Apr", "May"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LineMultiTrendCard({ className }: Pick<LineKitBlockProps, "className">) {
  const width = 260;
  const height = 140;
  const sets = [
    [0.32, 0.28, 0.37, 0.34, 0.22, 0.29, 0.27, 0.25],
    [0.21, 0.27, 0.31, 0.2, 0.24, 0.19, 0.36, 0.39],
    [0.14, 0.2, 0.18, 0.25, 0.22, 0.18, 0.16, 0.1],
    [0.35, 0.29, 0.23, 0.3, 0.27, 0.31, 0.15, 0.1],
  ];

  const colors = [lineBlue, lineCyan, "#69b8ff", "#2ad6d8"];

  return (
    <section className={cn(cardShell, "p-5", className)}>
      <h3 className="text-[2rem] font-bold tracking-[-0.03em]">Sales Report</h3>
      <p className="text-sm text-white/75">interaction</p>
      <p className="text-sm text-white/75">942% from Feb 12 - Apr 4</p>

      <div className="mt-3 grid grid-cols-[30px_1fr] gap-3">
        <AxisLabels values={["0.4", "0.3", "0.2", "0.1"]} />

        <div>
          <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" preserveAspectRatio="none">
            {[0.1, 0.2, 0.3, 0.4].map((tick) => {
              const y = height - (tick / 0.4) * height;
              return <line key={tick} x1={0} y1={y} x2={width} y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />;
            })}

            {sets.map((set, index) => {
              const points = chartPoints(set, width, height);
              return (
                <path
                  key={`set-${index}`}
                  d={smoothPath(points)}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth={index === 1 ? 2.4 : 1.6}
                  strokeOpacity={index === 1 ? 1 : 0.8}
                />
              );
            })}

            {(() => {
              const points = chartPoints(sets[1], width, height);
              return <circle cx={points[4].x} cy={points[4].y} r="3" fill={lineCyan} />;
            })()}
          </svg>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-xs text-white/75">weekly</p>
              <p className="numeric text-4xl font-semibold text-cyan-300">$1.33k</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/75">monthly</p>
              <p className="numeric text-4xl font-semibold text-cyan-300">$4.63k</p>
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
  const width = 360;
  const height = 170;
  const points = chartPoints(data, width, height);

  return (
    <section className={cn(cardShell, "p-5", className)}>
      <h3 className="text-[2rem] font-bold tracking-[-0.03em]">Sales Report</h3>

      <div className="mt-3 grid grid-cols-[30px_1fr] gap-3">
        <AxisLabels values={["50%", "40%", "30%", "20%", "10%"]} />

        <div>
          <div className="relative h-52">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="line-area-kit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineCyan} stopOpacity="0.65" />
                  <stop offset="100%" stopColor={lineCyan} stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3, 4].map((line) => {
                const y = (line / 4) * height;
                return (
                  <line
                    key={line}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="rgba(255,255,255,0.3)"
                    strokeDasharray="8 10"
                    strokeWidth="1"
                  />
                );
              })}

              {[1, 6].map((index) => {
                const x = points[index].x - 22;
                return <rect key={`bar-${index}`} x={x} y={height - 110} width="44" height="110" fill="url(#line-area-kit)" opacity="0.8" />;
              })}

              <path d={areaPath(points, height)} fill="url(#line-area-kit)" opacity="0.4" />
              <path d={smoothPath(points)} fill="none" stroke={lineBlue} strokeWidth="2.5" />
              <path d={smoothPath(points)} fill="none" stroke={lineCyan} strokeWidth="1.2" />

              <circle cx={points[1].x} cy={points[1].y} r="4" fill={lineCyan} />
              <circle cx={points[5].x} cy={points[5].y} r="4" fill={lineCyan} />
            </svg>
          </div>

          <div className="mt-2 border-t border-white/35 pt-2">
            <div className="flex justify-between text-xs text-white/80">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
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
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.35)" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.2)" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.35)" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.35)" />

          <path d={closedPath(incomePoints)} fill="none" stroke={lineBlue} strokeWidth="1.6" strokeLinecap="round" />
          <path d={closedPath(expensePoints)} fill="none" stroke={lineCyan} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mt-1 grid grid-cols-2 gap-5">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-white/80">
            <span className="h-2.5 w-2.5 bg-blue-500" /> Income
          </div>
          <p className="numeric text-4xl font-semibold text-cyan-300">$5.73k</p>
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-white/80">
            <span className="h-2.5 w-2.5 bg-cyan-300" /> Expanse
          </div>
          <p className="numeric text-4xl font-semibold text-cyan-300">$1.63k</p>
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
    <div className={cn("space-y-4", className)}>
      <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr_0.95fr]">
        <LineOverallPerformanceCard />
        <LineSalesReportCard />
        <div className="grid gap-4">
          <LineMiniSalesCard />
          <LineDualMetricCard />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.45fr_0.95fr]">
        <LineMultiTrendCard />
        <LineAreaProgressCard />
        <LineRadialComparisonCard />
      </div>
    </div>
  );
}

export default LineChartKitBoard;
