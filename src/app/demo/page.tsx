import {
  AreaRangeCard,
  BarComparisonCard,
  DonutCompositionCard,
  HeatmapMatrixCard,
  RadialGaugeCard,
  ScatterClusterCard,
  StackedBarsCard,
  TrendLineCard,
} from "@/components/library/chart-cards";

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="reveal mb-8 space-y-3" style={{ animationDelay: "90ms" }}>
        <p className="numeric text-xs uppercase tracking-[0.17em] text-chart-2">dashboard playground</p>
        <h1 className="text-5xl font-extrabold tracking-[-0.06em] text-foreground md:text-6xl">Composed Analytics Surface</h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Every module below is a reusable chart component from the library, combined into one minimal operational view.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="reveal lg:col-span-7" style={{ animationDelay: "150ms" }}>
          <TrendLineCard />
        </div>
        <div className="reveal lg:col-span-5" style={{ animationDelay: "190ms" }}>
          <RadialGaugeCard />
        </div>

        <div className="reveal lg:col-span-6" style={{ animationDelay: "230ms" }}>
          <AreaRangeCard />
        </div>
        <div className="reveal lg:col-span-3" style={{ animationDelay: "270ms" }}>
          <DonutCompositionCard />
        </div>
        <div className="reveal lg:col-span-3" style={{ animationDelay: "310ms" }}>
          <BarComparisonCard />
        </div>

        <div className="reveal lg:col-span-4" style={{ animationDelay: "350ms" }}>
          <StackedBarsCard />
        </div>
        <div className="reveal lg:col-span-4" style={{ animationDelay: "390ms" }}>
          <ScatterClusterCard />
        </div>
        <div className="reveal lg:col-span-4" style={{ animationDelay: "430ms" }}>
          <HeatmapMatrixCard />
        </div>
      </section>
    </main>
  );
}
