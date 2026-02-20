"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";
import { findChartBySlug } from "@/lib/chart-library";
import { cn } from "@/lib/utils";

type DetailTab = "preview" | "usage" | "props";

export interface ChartDocsScreenProps {
  slug: string;
}

export function ChartDocsScreen({ slug }: ChartDocsScreenProps) {
  const component = useMemo(() => findChartBySlug(slug), [slug]);
  const [activeTab, setActiveTab] = useState<DetailTab>("preview");
  const [copiedInstall, setCopiedInstall] = useState(false);

  if (!component) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center gap-5 px-4 pt-28 text-center">
        <p className="numeric rounded-full border border-border/70 bg-card/50 px-3 py-1 text-xs uppercase tracking-[0.16em] text-chart-2">
          Not Found
        </p>
        <h1 className="text-4xl font-extrabold tracking-[-0.05em] text-foreground">Chart component not found</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          This route does not map to a chart primitive in the current registry.
        </p>
        <Link
          href="/components"
          className="numeric inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card px-4 py-2 text-xs uppercase tracking-[0.12em] text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back To Library
        </Link>
      </main>
    );
  }

  const Preview = component.component;

  const copyInstall = async () => {
    await navigator.clipboard.writeText(component.install);
    setCopiedInstall(true);
    window.setTimeout(() => setCopiedInstall(false), 1600);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="reveal mb-8 space-y-4" style={{ animationDelay: "90ms" }}>
        <Link
          href="/components"
          className="numeric inline-flex items-center gap-1 rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs uppercase tracking-[0.11em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Components
        </Link>

        <div className="space-y-3">
          <p className="numeric text-xs uppercase tracking-[0.16em] text-chart-2">{component.category}</p>
          <h1 className="text-5xl font-extrabold tracking-[-0.06em] text-foreground md:text-6xl">{component.name}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">{component.description}</p>
        </div>
      </section>

      <section className="reveal mb-6 grid gap-4 rounded-xl border border-border/80 bg-card/55 p-4 backdrop-blur md:grid-cols-[1fr_auto] md:items-center" style={{ animationDelay: "140ms" }}>
        <div>
          <p className="numeric mb-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">Install</p>
          <code className="numeric text-sm text-foreground">{component.install}</code>
        </div>
        <button
          type="button"
          onClick={copyInstall}
          className="numeric inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.1em] text-foreground"
        >
          {copiedInstall ? <Check className="h-3.5 w-3.5 text-chart-3" /> : <Copy className="h-3.5 w-3.5" />}
          {copiedInstall ? "Copied" : "Copy"}
        </button>
      </section>

      <section className="reveal" style={{ animationDelay: "190ms" }}>
        <div className="mb-4 flex flex-wrap gap-2">
          {(["preview", "usage", "props"] as DetailTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "numeric rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition",
                activeTab === tab
                  ? "border-chart-1/70 bg-chart-1/15 text-chart-1"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "preview" ? (
          <div className="rounded-xl border border-border/80 bg-card/55 p-4">
            <Preview className="w-full" />
          </div>
        ) : null}

        {activeTab === "usage" ? (
          <CodeBlock code={component.usage} language="tsx" filename={`${component.slug}.tsx`} showLineNumbers={false} />
        ) : null}

        {activeTab === "props" ? (
          <div className="overflow-hidden rounded-xl border border-border/80">
            <table className="w-full text-left text-sm">
              <thead className="bg-card/80">
                <tr className="border-b border-border/80">
                  <th className="px-4 py-3 text-xs uppercase tracking-[0.11em] text-muted-foreground">Prop</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-[0.11em] text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-[0.11em] text-muted-foreground">Default</th>
                  <th className="px-4 py-3 text-xs uppercase tracking-[0.11em] text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={prop.name} className="border-b border-border/65 bg-card/45 last:border-none">
                    <td className="numeric px-4 py-3 text-xs text-chart-1">{prop.name}</td>
                    <td className="numeric px-4 py-3 text-xs text-foreground">{prop.type}</td>
                    <td className="numeric px-4 py-3 text-xs text-muted-foreground">{prop.defaultValue ?? "-"}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default ChartDocsScreen;
