"use client";

import { useState } from "react";
import { Copy, Check, Code2, Eye, Layers, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type DashboardItem } from "@/lib/dashboard-library";

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ code, label = "Copy" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition",
        copied
          ? "border-chart-2/40 bg-chart-2/10 text-chart-2"
          : "border-border/70 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground",
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ─── Code Pane ────────────────────────────────────────────────────────────────

function CodePane({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[hsl(224_22%_4%)]">
      <div className="overflow-x-auto">
        <pre className="p-5 text-[13px] leading-relaxed">
          <code className="font-mono text-[hsl(210_20%_82%)]">{code}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Fullscreen Overlay ───────────────────────────────────────────────────────

function FullscreenOverlay({
  dashboard,
  onClose,
}: {
  dashboard: DashboardItem;
  onClose: () => void;
}) {
  const DashboardComponent = dashboard.component;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
      {/* Close bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/50 bg-background/90 px-5 py-2.5 backdrop-blur-xl">
        <span className="text-sm font-semibold text-foreground">{dashboard.name}</span>
        <div className="flex items-center gap-2">
          <CopyButton code={dashboard.code} label="Copy dashboard" />
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-md border border-border/70 bg-card/60 px-2.5 py-1.5 text-xs text-muted-foreground transition hover:border-border hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Close
          </button>
        </div>
      </div>
      <DashboardComponent />
    </div>
  );
}

// ─── Viewer ───────────────────────────────────────────────────────────────────

type ViewTab = "preview" | "code";

export default function DashboardViewer({ dashboard }: { dashboard: DashboardItem }) {
  const [viewTab, setViewTab] = useState<ViewTab>("preview");
  const [codeTab, setCodeTab] = useState<string>("full");
  const [fullscreen, setFullscreen] = useState(false);

  const DashboardComponent = dashboard.component;
  const activeCode =
    codeTab === "full"
      ? dashboard.code
      : (dashboard.components.find((c) => c.name === codeTab)?.code ?? "");
  const activeComponent = dashboard.components.find((c) => c.name === codeTab);

  return (
    <>
      {/* Fullscreen overlay */}
      {fullscreen && (
        <FullscreenOverlay dashboard={dashboard} onClose={() => setFullscreen(false)} />
      )}

      <div className="flex min-h-full flex-col">
        {/* Viewer header */}
        <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-6 py-3">
            <div>
              <h1 className="text-base font-bold tracking-tight text-foreground">{dashboard.name}</h1>
              <p className="text-xs text-muted-foreground">{dashboard.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <CopyButton code={dashboard.code} label="Copy dashboard" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 px-6 pb-0">
            {(["preview", "code"] as ViewTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setViewTab(tab)}
                className={cn(
                  "flex items-center gap-1.5 border-b-2 px-3 pb-2.5 pt-1.5 text-xs font-medium capitalize transition",
                  viewTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === "preview" ? <Eye className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
                {tab}
              </button>
            ))}

            {/* Fullscreen button — only visible on preview tab */}
            {viewTab === "preview" && (
              <button
                onClick={() => setFullscreen(true)}
                className="ml-auto flex items-center gap-1.5 pb-2.5 pt-1.5 text-xs text-muted-foreground transition hover:text-foreground"
                title="Open fullscreen"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                Fullscreen
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={viewTab === "preview" ? "flex-1" : "flex-1 p-6"}>
          {/* Preview */}
          {viewTab === "preview" && <DashboardComponent />}

          {/* Code */}
          {viewTab === "code" && (
            <div className="space-y-4">
              {/* Component selector */}
              <div className="flex flex-wrap items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                <button
                  onClick={() => setCodeTab("full")}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    codeTab === "full"
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  Full Dashboard
                </button>
                {dashboard.components.map((comp) => (
                  <button
                    key={comp.name}
                    onClick={() => setCodeTab(comp.name)}
                    className={cn(
                      "numeric rounded-full border px-3 py-1 text-xs transition",
                      codeTab === comp.name
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
                    )}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>

              {/* Description + copy */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-card/50 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  {codeTab === "full"
                    ? "Complete dashboard — copy and paste into your React/Next.js project."
                    : activeComponent?.description}
                </p>
                <CopyButton code={activeCode} />
              </div>

              <CodePane code={activeCode} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
