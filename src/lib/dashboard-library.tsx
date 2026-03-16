import { type ComponentType } from "react";
import SaaSAnalyticsDashboard from "@/components/dashboards/saas-analytics";
import EcommerceDashboard from "@/components/dashboards/ecommerce";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardComponent {
  name: string;
  description: string;
  code: string;
}

export interface DashboardItem {
  slug: string;
  name: string;
  description: string;
  category: "Analytics" | "E-commerce" | "Finance" | "SaaS" | "Admin" | "CRM";
  tags: string[];
  component: ComponentType;
  componentCount: number;
  code: string;
  components: DashboardComponent[];
}

// ─── Registry ─────────────────────────────────────────────────────────────────

export const dashboardLibrary: DashboardItem[] = [
  {
    slug: "saas-analytics",
    name: "SaaS Analytics",
    description: "A full analytics overview for SaaS products — MRR, churn, user breakdown, acquisition channels, and live activity feed.",
    category: "SaaS",
    tags: ["revenue", "users", "churn", "channels", "activity"],
    component: SaaSAnalyticsDashboard,
    componentCount: 5,
    code: `"use client";

import { useId } from "react";
import {
  ArrowUpRight, ArrowDownRight, Download, RefreshCw,
  DollarSign, Users, UserMinus, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const revenueData = [52, 68, 71, 64, 89, 82, 97, 103, 95, 118, 112, 134];
const revenueLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

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

export function SaaSStatCard({ label, value, trend, trendLabel, icon, accentClass }) {
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
        <span className={cn("numeric font-medium",
          trend === "up" && "text-chart-3",
          trend === "down" && "text-destructive",
          trend === "flat" && "text-muted-foreground"
        )}>{trendLabel}</span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </article>
  );
}

// ... see full source at src/components/dashboards/saas-analytics.tsx`,
    components: [
      {
        name: "SaaSStatCard",
        description: "KPI stat card with icon, metric, and trend indicator",
        code: `export function SaaSStatCard({ label, value, trend, trendLabel, icon, accentClass }) {
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
        <span className={cn("numeric font-medium",
          trend === "up" && "text-chart-3",
          trend === "down" && "text-destructive",
          trend === "flat" && "text-muted-foreground"
        )}>{trendLabel}</span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </article>
  );
}`,
      },
      {
        name: "SaaSRevenueChart",
        description: "SVG area line chart showing monthly revenue trend",
        code: `export function SaaSRevenueChart() {
  const id = useId().replace(/[:]/g, "");
  const W = 580; const H = 180;
  const pad = { t: 10, r: 12, b: 28, l: 12 };
  const max = Math.max(...revenueData);
  const min = Math.min(...revenueData);
  const spread = max - min;

  const pts = revenueData.map((v, i) => ({
    x: pad.l + (i / (revenueData.length - 1)) * (W - pad.l - pad.r),
    y: pad.t + (1 - (v - min) / spread) * (H - pad.t - pad.b),
  }));
  const line = pts.map((p) => \`\${p.x},\${p.y}\`).join(" ");
  const area = \`\${pts[0].x},\${H - pad.b} \${line} \${pts[pts.length - 1].x},\${H - pad.b}\`;

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
            <ArrowUpRight className="h-3 w-3" />+19.6%
          </p>
        </div>
      </header>
      <div className="h-48">
        <svg viewBox={\`0 0 \${W} \${H}\`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={\`rev-\${id}\`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0,1,2,3].map((i) => {
            const y = pad.t + (i / 3) * (H - pad.t - pad.b);
            return <line key={i} x1={pad.l} y1={y} x2={W-pad.r} y2={y}
              stroke="var(--border)" strokeOpacity="0.5" strokeDasharray="4 6" strokeWidth="1" />;
          })}
          <polygon points={area} fill={\`url(#rev-\${id})\`} />
          <polyline points={line} fill="none" stroke="var(--chart-1)"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y}
              r={i === pts.length - 1 ? 4.5 : 2.5}
              fill={i === pts.length - 1 ? "var(--chart-2)" : "var(--chart-1)"} />
          ))}
        </svg>
      </div>
      <footer className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {revenueLabels.map((m) => <span key={m}>{m}</span>)}
      </footer>
    </article>
  );
}`,
      },
      {
        name: "SaaSUserBreakdown",
        description: "Donut chart showing user plan distribution",
        code: `export function SaaSUserBreakdown() {
  const total = userSegments.reduce((s, i) => s + i.value, 0);
  const r = 58; const ir = 38;
  let cursor = -Math.PI / 2;

  const slices = userSegments.map((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const start = cursor; cursor += angle; const end = cursor;
    const cx = 82; const cy = 82;
    const ox1 = cx + r * Math.cos(start); const oy1 = cy + r * Math.sin(start);
    const ox2 = cx + r * Math.cos(end);   const oy2 = cy + r * Math.sin(end);
    const ix1 = cx + ir * Math.cos(end);  const iy1 = cy + ir * Math.sin(end);
    const ix2 = cx + ir * Math.cos(start); const iy2 = cy + ir * Math.sin(start);
    const large = angle > Math.PI ? 1 : 0;
    return {
      ...seg,
      pct: Math.round((seg.value / total) * 100),
      d: \`M\${ox1} \${oy1} A\${r} \${r} 0 \${large} 1 \${ox2} \${oy2} L\${ix1} \${iy1} A\${ir} \${ir} 0 \${large} 0 \${ix2} \${iy2}Z\`,
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
}`,
      },
      {
        name: "SaaSChannelBars",
        description: "Horizontal bar chart for acquisition channel breakdown",
        code: `export function SaaSChannelBars() {
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
              <div className="h-full rounded-full"
                style={{ width: \`\${(ch.value / max) * 100}%\`, background: ch.color }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}`,
      },
      {
        name: "SaaSActivityList",
        description: "Real-time activity feed with event types and timestamps",
        code: `export function SaaSActivityList() {
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
            <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full",
              item.type === "upgrade" && "bg-chart-3",
              item.type === "trial" && "bg-chart-1",
              item.type === "cancel" && "bg-destructive",
              item.type === "action" && "bg-chart-5"
            )} />
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
}`,
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce Store",
    description: "Store performance overview with GMV, order metrics, sales trend, fulfillment status, and top product rankings.",
    category: "E-commerce",
    tags: ["gmv", "orders", "products", "fulfillment", "revenue"],
    component: EcommerceDashboard,
    componentCount: 4,
    code: `"use client";

import { useId } from "react";
import {
  ArrowUpRight, ArrowDownRight, Download,
  CreditCard, ShoppingCart, Package, RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const salesData = [89,112,98,134,121,156,143,178,165,192,184,218];
const salesLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const orderStatus = [
  { label: "Delivered", value: 68, color: "var(--chart-3)" },
  { label: "In Transit", value: 18, color: "var(--chart-1)" },
  { label: "Processing", value: 9,  color: "var(--chart-2)" },
  { label: "Returned",   value: 5,  color: "var(--chart-4)" },
];

const products = [
  { name: "Leather Wallet",  category: "Accessories", revenue: 42380, units: 847 },
  { name: "Canvas Tote Bag", category: "Bags",        revenue: 37940, units: 632 },
  { name: "Wooden Watch",    category: "Watches",     revenue: 33420, units: 278 },
  { name: "Silk Scarf",      category: "Apparel",     revenue: 28710, units: 492 },
  { name: "Ceramic Mug Set", category: "Home",        revenue: 22180, units: 739 },
];

// ... see full source at src/components/dashboards/ecommerce.tsx`,
    components: [
      {
        name: "EcomStatCard",
        description: "KPI stat card with icon, metric, and trend indicator",
        code: `export function EcomStatCard({ label, value, trend, trendLabel, icon, accentClass }) {
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
        <span className={cn("numeric font-medium",
          trend === "up" && "text-chart-3",
          trend === "down" && "text-destructive",
          trend === "flat" && "text-muted-foreground"
        )}>{trendLabel}</span>
        <span className="text-muted-foreground">vs last quarter</span>
      </div>
    </article>
  );
}`,
      },
      {
        name: "EcomSalesTrend",
        description: "SVG area chart showing GMV over the year",
        code: `export function EcomSalesTrend() {
  const id = useId().replace(/[:]/g, "");
  const W = 580; const H = 180;
  const pad = { t: 10, r: 12, b: 28, l: 12 };
  const max = Math.max(...salesData);
  const min = Math.min(...salesData);
  const spread = max - min;

  const pts = salesData.map((v, i) => ({
    x: pad.l + (i / (salesData.length - 1)) * (W - pad.l - pad.r),
    y: pad.t + (1 - (v - min) / spread) * (H - pad.t - pad.b),
  }));
  const line = pts.map((p) => \`\${p.x},\${p.y}\`).join(" ");
  const area = \`\${pts[0].x},\${H - pad.b} \${line} \${pts[pts.length - 1].x},\${H - pad.b}\`;

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
            <ArrowUpRight className="h-3 w-3" />+23.4%
          </p>
        </div>
      </header>
      <div className="h-48">
        <svg viewBox={\`0 0 \${W} \${H}\`} className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={\`sales-\${id}\`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0,1,2,3].map((i) => {
            const y = pad.t + (i / 3) * (H - pad.t - pad.b);
            return <line key={i} x1={pad.l} y1={y} x2={W-pad.r} y2={y}
              stroke="var(--border)" strokeOpacity="0.5" strokeDasharray="4 6" strokeWidth="1" />;
          })}
          <polygon points={area} fill={\`url(#sales-\${id})\`} />
          <polyline points={line} fill="none" stroke="var(--chart-2)"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y}
              r={i === pts.length - 1 ? 4.5 : 2.5}
              fill={i === pts.length - 1 ? "var(--chart-1)" : "var(--chart-2)"} />
          ))}
        </svg>
      </div>
      <footer className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {salesLabels.map((m) => <span key={m}>{m}</span>)}
      </footer>
    </article>
  );
}`,
      },
      {
        name: "EcomOrderStatus",
        description: "Donut chart showing fulfillment status breakdown",
        code: `export function EcomOrderStatus() {
  const total = orderStatus.reduce((s, i) => s + i.value, 0);
  const r = 52; const ir = 34;
  let cursor = -Math.PI / 2;

  const slices = orderStatus.map((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const start = cursor; cursor += angle; const end = cursor;
    const cx = 76; const cy = 76;
    const ox1 = cx + r * Math.cos(start); const oy1 = cy + r * Math.sin(start);
    const ox2 = cx + r * Math.cos(end);   const oy2 = cy + r * Math.sin(end);
    const ix1 = cx + ir * Math.cos(end);  const iy1 = cy + ir * Math.sin(end);
    const ix2 = cx + ir * Math.cos(start); const iy2 = cy + ir * Math.sin(start);
    const large = angle > Math.PI ? 1 : 0;
    return {
      ...seg,
      pct: Math.round((seg.value / total) * 100),
      d: \`M\${ox1} \${oy1} A\${r} \${r} 0 \${large} 1 \${ox2} \${oy2} L\${ix1} \${iy1} A\${ir} \${ir} 0 \${large} 0 \${ix2} \${iy2}Z\`,
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
}`,
      },
      {
        name: "EcomTopProducts",
        description: "Ranked product list with revenue bars and unit counts",
        code: `export function EcomTopProducts() {
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
                  \${(product.revenue / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/60">
                  <div className="h-full rounded-full bg-chart-2"
                    style={{ width: \`\${(product.revenue / maxRevenue) * 100}%\` }} />
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
}`,
      },
    ],
  },
];

export function getDashboard(slug: string): DashboardItem | undefined {
  return dashboardLibrary.find((d) => d.slug === slug);
}
