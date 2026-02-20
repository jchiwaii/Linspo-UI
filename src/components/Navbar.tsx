"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/demo", label: "Demo" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-chart-1/40 bg-chart-1/15 text-chart-1">
            <BarChart3 className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-bold leading-none text-foreground">Linspo UI</p>
            <p className="numeric text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Data Viz Library</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "numeric rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.11em] transition",
                  isActive
                    ? "border-chart-1/65 bg-chart-1/15 text-chart-1"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-card/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/jchiwaii/Linspo-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="numeric hidden rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.11em] text-muted-foreground transition hover:text-foreground md:inline-flex"
          >
            GitHub
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-border/80 bg-card/80 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "numeric rounded-md border px-3 py-2 text-xs uppercase tracking-[0.1em]",
                    isActive
                      ? "border-chart-1/60 bg-chart-1/15 text-chart-1"
                      : "border-border/60 bg-background/65 text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
