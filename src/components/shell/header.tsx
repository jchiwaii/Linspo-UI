"use client";

import Link from "next/link";
import { Github, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { MobileSidebar } from "./sidebar";

export function ShellHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border bg-sidebar px-4">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle — hidden on desktop */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30">
              <LayoutDashboard className="h-3.5 w-3.5" />
            </span>
            <div className="leading-none">
              <p className="text-sm font-bold tracking-tight text-foreground">Linspo UI</p>
              <p className="numeric text-[10px] text-muted-foreground">Dashboard Library</p>
            </div>
          </Link>
        </div>

        <a
          href="https://github.com/jchiwaii/Linspo-UI"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-border/50 bg-card/40 px-2.5 py-1.5 text-xs text-muted-foreground transition hover:border-border hover:text-foreground"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute inset-y-0 left-0 w-64 overflow-y-auto border-r border-sidebar-border bg-sidebar">
            <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
              <span className="text-sm font-semibold text-foreground">Dashboards</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <MobileSidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
