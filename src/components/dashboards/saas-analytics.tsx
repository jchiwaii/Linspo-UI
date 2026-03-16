"use client";

import { useId } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
  DollarSign,
  Users,
  UserMinus,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueData = [52, 68, 71, 64, 89, 82, 97, 103, 95, 118, 112, 134];
const revenueLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const userSegments = [
  { label: "Free", value: 42, color: "var(--chart-5)" },
  { label: "Pro", value: 31, color: "var(--chart-1)" },
  { label: "Business", value: 18, color: "var(--chart-2)" },
  { label: "Enterprise", value: 9, color: "var(--chart-6)" },
];

const channels = [
  { label: "Organic Search", value: 38, color: "var(--chart-1)" },
  { label: "Paid Ads", value: 27, color: "var(--chart-2)" },
  { label: "Referral", value: 18, color: "var(--chart-5)" },
  { label: "Social", value: 11, color: "var(--chart-3)" },
  { label: "Direct", value: 6, color: "var(--chart-6)" },
];

const activity = [
  { event: "Enterprise plan upgrade", user: "Acme Corp", time: "2 min ago", type: "upgrade" },
  { event: "Trial started", user: "Nova Systems", time: "18 min ago", type: "trial" },
  { event: "Subscription cancelled", user: "Bolt Inc", time: "1 hr ago", type: "cancel" },
  { event: "API key generated", user: "Pixel Labs", time: "2 hr ago", type: "action" },
  { event: "Plan upgrade – Pro", user: "Stark Media", time: "3 hr ago", type: "upgrade" },
  { event: "New user signup", user: "Flux Studio", time: "4 hr ago", type: "trial" },
];

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  trendLabel: string;
  icon: React.ReactNode;
  accentClass: string;
}

export function SaaSStatCard({ label, value, trend, trendLabel, icon, accentClass }: StatCardProps) {
  return (
    <article className="surface-panel rounded-xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="numeric text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
          <p className="numeric mt-2 text-[2rem] font-bold leading-none text-foreground">{value}</p>
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border", accentClass)}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs">
        {trend === "up" && <ArrowUpRight className="h-3.5 w-3.5 text-chart-3" />}
        {trend === "down" && <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />}
        <span
          className={cn(
            "numeric font-medium",
            trend === "up" && "text-chart-3",
            trend === "down" && "text-destructive",
            trend === "flat" && "text-muted-foreground",
          )}
        >
          {trendLabel}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </article>
  );
}

// ─── Revenue Chart ────────────────────────────────────────────────────────────

export function SaaSRevenueChart() {
  const id = useId().replace(/[:]/g, "");
  const W = 580;
  const H = 180;
  const pad = { t: 10, r: 12, b: 28, l: 12 };
  const max = Math.max(...revenueData);
  const min = Math.min(...revenueData);
  const spread = max - min;

  const pts = revenueData.map((v, i) => ({
    x: pad.l + (i / (revenueData.length - 1)) * (W - pad.l - pad.r),
    y: pad.t + (1 - (v - min) / spread) * (H - pad.t - pad.b),
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pts[0].x},${H - pad.b} ${line} ${pts[pts.length - 1].x},${H - pad.b}`;

  return (
    <article className="surface-panel rounded-xl p-5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">Revenue Trend</p>
          <p className="text-sm text-muted-foreground">Monthly recurring revenue</p>
        </div>
        <div className="text-right">
          <p className="numeric text-2xl font-semibold text-foreground">$134K</p>
          <p className="numeric inline-flex items-center gap-1 text-xs text-chart-3">
            <ArrowUpRight className="h-3 w-3" />
            +19.6%
          </p>
        </div>
      </header>
      <div className="h-48">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`rev-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => {
            const y = pad.t + (i / 3) * (H - pad.t - pad.b);
            return (
              <line
                key={i}
                x1={pad.l}
                y1={y}
                x2={W - pad.r}
                y2={y}
                stroke="var(--border)"
                strokeOpacity="0.5"
                strokeDasharray="4 6"
                strokeWidth="1"
              />
            );
          })}
          <polygon points={area} fill={`url(#rev-${id})`} />
          <polyline
            points={line}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === pts.length - 1 ? 4.5 : 2.5}
              fill={i === pts.length - 1 ? "var(--chart-2)" : "var(--chart-1)"}
            />
          ))}
        </svg>
      </div>
      <footer className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {revenueLabels.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </footer>
    </article>
  );
}

// ─── User Breakdown ───────────────────────────────────────────────────────────

export function SaaSUserBreakdown() {
  const total = userSegments.reduce((s, i) => s + i.value, 0);
  const r = 58;
  const ir = 38;
  let cursor = -Math.PI / 2;

  const slices = userSegments.map((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const start = cursor;
    cursor += angle;
    const end = cursor;
    const cx = 82;
    const cy = 82;
    const ox1 = cx + r * Math.cos(start);
    const oy1 = cy + r * Math.sin(start);
    const ox2 = cx + r * Math.cos(end);
    const oy2 = cy + r * Math.sin(end);
    const ix1 = cx + ir * Math.cos(end);
    const iy1 = cy + ir * Math.sin(end);
    const ix2 = cx + ir * Math.cos(start);
    const iy2 = cy + ir * Math.sin(start);
    const large = angle > Math.PI ? 1 : 0;
    return {
      ...seg,
      pct: Math.round((seg.value / total) * 100),
      d: `M${ox1} ${oy1} A${r} ${r} 0 ${large} 1 ${ox2} ${oy2} L${ix1} ${iy1} A${ir} ${ir} 0 ${large} 0 ${ix2} ${iy2}Z`,
    };
  });

  return (
    <article className="surface-panel h-full rounded-xl p-5">
      <header className="mb-4">
        <p className="font-semibold text-foreground">User Breakdown</p>
        <p className="text-sm text-muted-foreground">Plan distribution</p>
      </header>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 164 164" className="h-36 w-36 shrink-0">
          {slices.map((s) => (
            <path key={s.label} d={s.d} fill={s.color} stroke="var(--card)" strokeWidth="2.5" />
          ))}
        </svg>
        <ul className="flex-1 space-y-2.5">
          {slices.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="numeric text-foreground">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ─── Channel Bars ─────────────────────────────────────────────────────────────

export function SaaSChannelBars() {
  const max = Math.max(...channels.map((c) => c.value));
  return (
    <article className="surface-panel h-full rounded-xl p-5">
      <header className="mb-5">
        <p className="font-semibold text-foreground">Acquisition Channels</p>
        <p className="text-sm text-muted-foreground">Traffic source breakdown</p>
      </header>
      <div className="space-y-3.5">
        {channels.map((ch) => (
          <div key={ch.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{ch.label}</span>
              <span className="numeric text-foreground">{ch.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/60">
              <div
                className="h-full rounded-full"
                style={{ width: `${(ch.value / max) * 100}%`, background: ch.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

// ─── Activity List ────────────────────────────────────────────────────────────

export function SaaSActivityList() {
  return (
    <article className="surface-panel h-full rounded-xl p-5">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Recent Activity</p>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </div>
        <button className="numeric text-[11px] uppercase tracking-wider text-chart-1 hover:underline">
          View all
        </button>
      </header>
      <ul className="divide-y divide-border/50">
        {activity.map((item, i) => (
          <li key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <span
              className={cn(
                "mt-1 h-2 w-2 shrink-0 rounded-full",
                item.type === "upgrade" && "bg-chart-3",
                item.type === "trial" && "bg-chart-1",
                item.type === "cancel" && "bg-destructive",
                item.type === "action" && "bg-chart-5",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">{item.event}</p>
              <p className="text-xs text-muted-foreground">{item.user}</p>
            </div>
            <span className="numeric shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

// ─── Full Dashboard ───────────────────────────────────────────────────────────

export default function SaaSAnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="numeric text-[11px] uppercase tracking-[0.17em] text-chart-2">SaaS Platform</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.04em] text-foreground lg:text-4xl">
            Analytics Overview
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="numeric flex items-center gap-2 rounded-lg border border-border/70 bg-card/60 px-3 py-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5" />
            Mar 2026
          </span>
          <button className="numeric flex items-center gap-2 rounded-lg border border-chart-1/40 bg-chart-1/15 px-3 py-2 text-xs text-chart-1 transition hover:bg-chart-1/25">
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
        </div>
      </header>

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SaaSStatCard
          label="Monthly Revenue"
          value="$134K"
          trend="up"
          trendLabel="+19.6%"
          icon={<DollarSign className="h-4 w-4 text-chart-1" />}
          accentClass="border-chart-1/40 bg-chart-1/15"
        />
        <SaaSStatCard
          label="Active Users"
          value="8,421"
          trend="up"
          trendLabel="+340 new"
          icon={<Users className="h-4 w-4 text-chart-2" />}
          accentClass="border-chart-2/40 bg-chart-2/15"
        />
        <SaaSStatCard
          label="Churn Rate"
          value="2.4%"
          trend="down"
          trendLabel="-0.8%"
          icon={<UserMinus className="h-4 w-4 text-chart-4" />}
          accentClass="border-chart-4/40 bg-chart-4/15"
        />
        <SaaSStatCard
          label="NPS Score"
          value="68"
          trend="up"
          trendLabel="+4 pts"
          icon={<Star className="h-4 w-4 text-chart-3" />}
          accentClass="border-chart-3/40 bg-chart-3/15"
        />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <SaaSRevenueChart />
        </div>
        <div className="xl:col-span-5">
          <SaaSUserBreakdown />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <SaaSChannelBars />
        </div>
        <div className="xl:col-span-8">
          <SaaSActivityList />
        </div>
      </div>
    </div>
  );
}
