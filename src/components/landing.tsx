"use client";

import Link from "next/link";
import { ArrowRight, Github, LayoutDashboard, Copy, Eye, Layers, ChevronRight } from "lucide-react";
import { dashboardLibrary } from "@/lib/dashboard-library";
import SaaSAnalyticsDashboard from "@/components/dashboards/saas-analytics";

const firstSlug = dashboardLibrary[0]?.slug ?? "";
const firstHref = `/dashboards/${firstSlug}`;

// ─── Navbar ───────────────────────────────────────────────────────────────────

function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30">
            <LayoutDashboard className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-bold tracking-tight text-foreground">Linspo UI</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href={firstHref}
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            Dashboards
          </Link>
          <a
            href="https://github.com/jchiwaii/Linspo-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border/70 bg-card/60 px-3 py-1.5 text-sm text-muted-foreground transition hover:border-border hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

// ─── Browser Mockup ───────────────────────────────────────────────────────────

function BrowserMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_40px_80px_hsl(224_30%_2%/0.8)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-border/50 bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-md bg-background/60 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-chart-2/70" />
          <span className="numeric text-[11px] text-muted-foreground/70">
            linspo-ui.vercel.app/dashboards/saas-analytics
          </span>
        </div>
      </div>

      {/* App layout */}
      <div className="flex" style={{ height: "420px" }}>
        {/* Sidebar */}
        <div className="w-52 shrink-0 border-r border-sidebar-border bg-sidebar/80 p-3">
          <div className="mb-4 flex items-center gap-2 px-1 py-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-primary">
              <LayoutDashboard className="h-3 w-3" />
            </span>
            <span className="text-xs font-semibold text-foreground">Linspo UI</span>
          </div>
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Dashboards
          </p>
          <div className="space-y-0.5">
            {dashboardLibrary.map((item, i) => (
              <div
                key={item.slug}
                className={
                  i === 0
                    ? "flex items-center gap-2 rounded-md bg-primary/10 px-2 py-1.5 ring-1 ring-primary/25"
                    : "flex items-center gap-2 rounded-md px-2 py-1.5"
                }
              >
                <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/40"}`} />
                <span className={`text-[11px] ${i === 0 ? "font-medium text-primary" : "text-muted-foreground"}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative flex-1 overflow-hidden bg-background">
          <div
            className="pointer-events-none absolute left-0 top-0 origin-top-left"
            style={{ transform: "scale(0.4)", width: "250%", height: "250%" }}
          >
            <SaaSAnalyticsDashboard />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/70" />
        </div>
      </div>
    </div>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Eye,
    title: "Live Preview",
    description: "Every dashboard is rendered live in your browser — not screenshots. What you see is exactly what you get.",
  },
  {
    icon: Copy,
    title: "Copy Instantly",
    description: "Copy the full dashboard source or grab individual components. Zero boilerplate, paste and go.",
  },
  {
    icon: Layers,
    title: "Component-level",
    description: "Each dashboard is broken down into named components you can copy independently and compose your own layouts.",
  },
];

function Features() {
  return (
    <section className="border-t border-border/40 bg-card/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border/50 bg-card/50 p-6 transition hover:border-primary/30 hover:bg-card"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20 transition group-hover:bg-primary/20">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Preview Cards ──────────────────────────────────────────────────

function DashboardPreviewCards() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Dashboards</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Ready to browse
            </h2>
          </div>
          <Link
            href={firstHref}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardLibrary.map((item) => {
            const Component = item.component;
            return (
              <Link
                key={item.slug}
                href={`/dashboards/${item.slug}`}
                className="group overflow-hidden rounded-xl border border-border/50 bg-card transition hover:border-primary/30 hover:shadow-[0_0_30px_hsl(245_78%_66%/0.07)]"
              >
                <div className="relative h-48 overflow-hidden bg-background">
                  <div
                    className="pointer-events-none absolute left-0 top-0 origin-top-left"
                    style={{ transform: "scale(0.25)", width: "400%", height: "400%" }}
                  >
                    <Component />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card/95 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-primary/40 bg-background/80 px-4 py-2 text-xs font-medium text-primary backdrop-blur-sm">
                      View Dashboard <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                    <span className="numeric rounded-full border border-border/60 bg-muted/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="border-t border-border/40 py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Start building today
        </h2>
        <p className="mb-8 text-muted-foreground">
          Browse the dashboard library, pick what you need, and ship faster.
        </p>
        <Link
          href={firstHref}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Browse Dashboards <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/20 text-primary">
            <LayoutDashboard className="h-3 w-3" />
          </span>
          <span className="text-sm font-semibold text-foreground">Linspo UI</span>
        </div>
        <p className="text-xs text-muted-foreground">Open source dashboard library</p>
        <a
          href="https://github.com/jchiwaii/Linspo-UI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>
      </div>
    </footer>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        {/* Background dots */}
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 max-w-3xl">
            {/* Badge */}
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1" style={{ animationDelay: "0ms" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">Open source dashboard library</span>
            </div>

            {/* Headline */}
            <h1
              className="reveal mb-6 text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground md:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Beautiful dashboards,{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-chart-6 bg-clip-text text-transparent">
                ready to ship.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="reveal mb-8 max-w-xl text-lg text-muted-foreground"
              style={{ animationDelay: "140ms" }}
            >
              Browse production-ready dashboard layouts for React and Next.js.
              Preview live, then copy the full source or individual components.
            </p>

            {/* CTAs */}
            <div className="reveal flex flex-wrap gap-3" style={{ animationDelay: "200ms" }}>
              <Link
                href={firstHref}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Browse Dashboards <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/jchiwaii/Linspo-UI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/60 px-5 py-2.5 text-sm font-semibold text-muted-foreground transition hover:border-border hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>

          {/* Browser mockup */}
          <div className="reveal" style={{ animationDelay: "280ms" }}>
            <BrowserMockup />
          </div>
        </div>
      </section>

      <Features />
      <DashboardPreviewCards />
      <CtaSection />
      <Footer />
    </div>
  );
}
