"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import {
  chartCategories,
  chartLibrary,
  type ChartCategoryFilter,
} from "@/lib/chart-library";
import { cn } from "@/lib/utils";

export function ChartCatalogScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ChartCategoryFilter>("All");

  const filteredComponents = useMemo(() => {
    return chartLibrary.filter((item) => {
      const inCategory = category === "All" || item.category === category;
      const normalized = query.trim().toLowerCase();
      const matchesSearch =
        normalized.length === 0 ||
        item.name.toLowerCase().includes(normalized) ||
        item.summary.toLowerCase().includes(normalized) ||
        item.tags.some((tag) => tag.includes(normalized));

      return inCategory && matchesSearch;
    });
  }, [category, query]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
      <section className="reveal space-y-5" style={{ animationDelay: "80ms" }}>
        <p className="numeric inline-flex rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-chart-1">
          Chart Component Library
        </p>
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.06em] text-foreground md:text-7xl">
          Minimal Data Components.
          <br />
          Max Signal.
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          A chart-only UI library inspired by copy-paste workflows. Every block is tuned for dashboards, telemetry surfaces, and analytics narratives.
        </p>
      </section>

      <section className="reveal mt-10 grid gap-4 rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur" style={{ animationDelay: "160ms" }}>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by chart name, role, or tag"
            className="h-11 w-full rounded-lg border border-border/80 bg-background/65 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {chartCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "numeric rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.08em] transition",
                category === item
                  ? "border-chart-1/80 bg-chart-1/15 text-chart-1"
                  : "border-border bg-background/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredComponents.length > 0 ? (
          filteredComponents.map((item, index) => {
            const Preview = item.component;

            return (
              <Link
                key={item.slug}
                href={`/components/${item.slug}`}
                className="group reveal flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card/65 p-3 transition duration-200 hover:-translate-y-1 hover:border-chart-1/50"
                style={{ animationDelay: `${240 + index * 40}ms` }}
              >
                <div className="mb-3 flex items-start justify-between gap-2 px-1">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.summary}</p>
                  </div>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 text-muted-foreground transition group-hover:text-chart-1" />
                </div>

                <Preview compact className="min-h-[220px]" />

                <div className="mt-3 flex flex-wrap gap-1 px-1">
                  <span className="numeric rounded-full border border-border/70 bg-background/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-chart-2">
                    {item.category}
                  </span>
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="numeric rounded-full border border-border/70 bg-background/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="reveal col-span-full rounded-xl border border-border bg-card/50 p-10 text-center" style={{ animationDelay: "220ms" }}>
            <p className="text-sm text-muted-foreground">No components matched this filter.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default ChartCatalogScreen;
