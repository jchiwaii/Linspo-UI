"use client";

import { useId } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CreditCard,
  ShoppingCart,
  Package,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const salesData = [89, 112, 98, 134, 121, 156, 143, 178, 165, 192, 184, 218];
const salesLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const orderStatus = [
  { label: "Delivered", value: 68, color: "var(--chart-3)" },
  { label: "In Transit", value: 18, color: "var(--chart-1)" },
  { label: "Processing", value: 9, color: "var(--chart-2)" },
  { label: "Returned", value: 5, color: "var(--chart-4)" },
];

const products = [
  { name: "Leather Wallet", category: "Accessories", revenue: 42380, units: 847 },
  { name: "Canvas Tote Bag", category: "Bags", revenue: 37940, units: 632 },
  { name: "Wooden Watch", category: "Watches", revenue: 33420, units: 278 },
  { name: "Silk Scarf", category: "Apparel", revenue: 28710, units: 492 },
  { name: "Ceramic Mug Set", category: "Home", revenue: 22180, units: 739 },
];

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface EcomStatCardProps {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
  trendLabel: string;
  icon: React.ReactNode;
  accentClass: string;
}

export function EcomStatCard({ label, value, trend, trendLabel, icon, accentClass }: EcomStatCardProps) {
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
        <span className="text-muted-foreground">vs last quarter</span>
      </div>
    </article>
  );
}

// ─── Sales Trend ─────────────────────────────────────────────────────────────

export function EcomSalesTrend() {
  const id = useId().replace(/[:]/g, "");
  const W = 580;
  const H = 180;
  const pad = { t: 10, r: 12, b: 28, l: 12 };
  const max = Math.max(...salesData);
  const min = Math.min(...salesData);
  const spread = max - min;

  const pts = salesData.map((v, i) => ({
    x: pad.l + (i / (salesData.length - 1)) * (W - pad.l - pad.r),
    y: pad.t + (1 - (v - min) / spread) * (H - pad.t - pad.b),
  }));
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${pts[0].x},${H - pad.b} ${line} ${pts[pts.length - 1].x},${H - pad.b}`;

  return (
    <article className="surface-panel rounded-xl p-5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">Sales Trend</p>
          <p className="text-sm text-muted-foreground">Gross merchandise value</p>
        </div>
        <div className="text-right">
          <p className="numeric text-2xl font-semibold text-foreground">$2.4M</p>
          <p className="numeric inline-flex items-center gap-1 text-xs text-chart-3">
            <ArrowUpRight className="h-3 w-3" />
            +23.4%
          </p>
        </div>
      </header>
      <div className="h-48">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`sales-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
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
          <polygon points={area} fill={`url(#sales-${id})`} />
          <polyline
            points={line}
            fill="none"
            stroke="var(--chart-2)"
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
              fill={i === pts.length - 1 ? "var(--chart-1)" : "var(--chart-2)"}
            />
          ))}
        </svg>
      </div>
      <footer className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {salesLabels.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </footer>
    </article>
  );
}

// ─── Order Status ─────────────────────────────────────────────────────────────

export function EcomOrderStatus() {
  const total = orderStatus.reduce((s, i) => s + i.value, 0);
  const r = 52;
  const ir = 34;
  let cursor = -Math.PI / 2;

  const slices = orderStatus.map((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const start = cursor;
    cursor += angle;
    const end = cursor;
    const cx = 76;
    const cy = 76;
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
        <p className="font-semibold text-foreground">Order Status</p>
        <p className="text-sm text-muted-foreground">Fulfillment breakdown</p>
      </header>
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 152 152" className="h-32 w-32 shrink-0">
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

// ─── Top Products ─────────────────────────────────────────────────────────────

export function EcomTopProducts() {
  const maxRevenue = Math.max(...products.map((p) => p.revenue));
  return (
    <article className="surface-panel rounded-xl p-5">
      <header className="mb-5">
        <p className="font-semibold text-foreground">Top Products</p>
        <p className="text-sm text-muted-foreground">By revenue, Q1 2026</p>
      </header>
      <div className="space-y-4">
        {products.map((product, i) => (
          <div key={product.name} className="flex items-center gap-4">
            <span className="numeric w-5 shrink-0 text-xs text-muted-foreground">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-foreground">{product.name}</span>
                <span className="numeric shrink-0 text-sm text-foreground">
                  ${(product.revenue / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/60">
                  <div
                    className="h-full rounded-full bg-chart-2"
                    style={{ width: `${(product.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="numeric w-16 shrink-0 text-right text-xs text-muted-foreground">
                  {product.units} units
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

// ─── Full Dashboard ───────────────────────────────────────────────────────────

export default function EcommerceDashboard() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="numeric text-[11px] uppercase tracking-[0.17em] text-chart-2">Artisan Goods</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.04em] text-foreground lg:text-4xl">
            Store Overview
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="numeric rounded-lg border border-border/70 bg-card/60 px-3 py-2 text-xs text-muted-foreground">
            Q1 2026
          </span>
          <button className="numeric flex items-center gap-2 rounded-lg border border-chart-2/40 bg-chart-2/15 px-3 py-2 text-xs text-chart-2 transition hover:bg-chart-2/25">
            <Download className="h-3.5 w-3.5" />
            Report
          </button>
        </div>
      </header>

      <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <EcomStatCard
          label="Gross Merch Value"
          value="$2.4M"
          trend="up"
          trendLabel="+23.4%"
          icon={<CreditCard className="h-4 w-4 text-chart-2" />}
          accentClass="border-chart-2/40 bg-chart-2/15"
        />
        <EcomStatCard
          label="Total Orders"
          value="12,847"
          trend="up"
          trendLabel="+1,240"
          icon={<ShoppingCart className="h-4 w-4 text-chart-1" />}
          accentClass="border-chart-1/40 bg-chart-1/15"
        />
        <EcomStatCard
          label="Avg Order Value"
          value="$187"
          trend="up"
          trendLabel="+$12"
          icon={<Package className="h-4 w-4 text-chart-3" />}
          accentClass="border-chart-3/40 bg-chart-3/15"
        />
        <EcomStatCard
          label="Return Rate"
          value="3.2%"
          trend="down"
          trendLabel="-0.4%"
          icon={<RotateCcw className="h-4 w-4 text-chart-4" />}
          accentClass="border-chart-4/40 bg-chart-4/15"
        />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <EcomSalesTrend />
        </div>
        <div className="xl:col-span-4">
          <EcomOrderStatus />
        </div>
      </div>

      <EcomTopProducts />
    </div>
  );
}
