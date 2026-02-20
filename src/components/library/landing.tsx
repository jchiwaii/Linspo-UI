import Link from "next/link";
import { ArrowRight, Braces, ChartNoAxesCombined, Orbit, Sparkle } from "lucide-react";
import { chartLibrary } from "@/lib/chart-library";

export function LibraryLanding() {
  const featured = chartLibrary.slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="grid items-end gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-6">
          <p className="numeric reveal inline-flex rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs uppercase tracking-[0.16em] text-chart-2" style={{ animationDelay: "80ms" }}>
            chart-only ui primitives
          </p>

          <h1 className="reveal text-[3.2rem] font-extrabold leading-[0.88] tracking-[-0.065em] text-foreground sm:text-[5.6rem]" style={{ animationDelay: "140ms" }}>
            Shadcn for
            <br />
            Data Viz.
          </h1>

          <p className="reveal max-w-xl text-sm text-muted-foreground md:text-base" style={{ animationDelay: "220ms" }}>
            Linspo UI is now a dedicated chart component library: clean cards, reusable APIs, and direct copy-paste snippets for dashboards.
          </p>

          <div className="reveal flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
            <Link
              href="/components"
              className="numeric inline-flex items-center gap-2 rounded-lg border border-chart-1/65 bg-chart-1/15 px-5 py-3 text-xs uppercase tracking-[0.12em] text-chart-1 transition hover:bg-chart-1/20"
            >
              Explore Components
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/demo"
              className="numeric inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/60 px-5 py-3 text-xs uppercase tracking-[0.12em] text-foreground"
            >
              See Dashboard Demo
            </Link>
          </div>
        </div>

        <div className="reveal relative" style={{ animationDelay: "220ms" }}>
          <div className="aurora-grid pointer-events-none absolute inset-0 rounded-xl opacity-30" />
          <div className="surface-panel floaty rounded-xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Signature Component</p>
              <span className="numeric rounded-full border border-border/70 bg-background/60 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-chart-1">
                live preview
              </span>
            </div>
            {(() => {
              const Signature = featured[0].component;
              return <Signature />;
            })()}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-4">
        {[
          {
            icon: ChartNoAxesCombined,
            title: "Chart-only focus",
            text: "No generic buttons or forms. Every primitive is built for data surfaces.",
          },
          {
            icon: Braces,
            title: "Copy-first API",
            text: "Each component ships with code snippets and prop docs.",
          },
          {
            icon: Orbit,
            title: "Modular styles",
            text: "Consistent depth, color rhythm, and numerical typography.",
          },
          {
            icon: Sparkle,
            title: "Minimal motion",
            text: "Focused transitions and reveal timing that improve scanning.",
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="reveal surface-panel rounded-xl p-4"
            style={{ animationDelay: `${360 + index * 70}ms` }}
          >
            <item.icon className="mb-3 h-5 w-5 text-chart-2" />
            <p className="mb-1 text-sm font-semibold text-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-foreground">Featured Charts</h2>
          <Link
            href="/components"
            className="numeric rounded-full border border-border/70 bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.11em] text-muted-foreground transition hover:text-foreground"
          >
            View Full Library
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((component, index) => {
            const Preview = component.component;
            return (
              <Link
                href={`/components/${component.slug}`}
                key={component.slug}
                className="reveal block rounded-xl border border-border/80 bg-card/60 p-3 transition hover:-translate-y-1 hover:border-chart-1/45"
                style={{ animationDelay: `${440 + index * 70}ms` }}
              >
                <div className="mb-2 flex items-center justify-between px-1">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{component.name}</p>
                    <p className="text-xs text-muted-foreground">{component.summary}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <Preview compact />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default LibraryLanding;
