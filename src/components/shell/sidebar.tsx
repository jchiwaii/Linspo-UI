"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardLibrary } from "@/lib/dashboard-library";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

// Group dashboards by category
const grouped = dashboardLibrary.reduce(
  (acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  },
  {} as Record<string, typeof dashboardLibrary>,
);

// ─── Shared nav content ───────────────────────────────────────────────────────

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="p-3">
      <Link
        href="/"
        onClick={onNavigate}
        className="mb-4 flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground/60 transition hover:text-muted-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to home
      </Link>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-4">
          <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
            {category}
          </p>
          <ul className="space-y-0.5">
            {items.map((item) => {
              const isActive = pathname === `/dashboards/${item.slug}`;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/dashboards/${item.slug}`}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition",
                      isActive
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        isActive ? "bg-primary" : "bg-muted-foreground/30",
                      )}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="mt-6 border-t border-sidebar-border pt-4">
        <p className="px-2 text-[10px] leading-relaxed text-muted-foreground/40">
          More dashboards coming soon. Add yours to the registry.
        </p>
      </div>
    </div>
  );
}

// ─── Desktop sidebar ──────────────────────────────────────────────────────────

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-sidebar-border bg-sidebar lg:block">
      <SidebarContent />
    </aside>
  );
}

// ─── Mobile sidebar (rendered inside the header overlay) ─────────────────────

export function MobileSidebar({ onNavigate }: { onNavigate: () => void }) {
  return <SidebarContent onNavigate={onNavigate} />;
}
