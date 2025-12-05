"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart3, Moon, Sun, Github } from "lucide-react";

interface NavbarProps {
  currentPage?: string;
  className?: string;
}

export default function Navbar({ currentPage, className = "" }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkModePreference = document.documentElement.classList.contains("dark");
    setIsDark(darkModePreference);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.add("transitioning");
    if (isDark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setIsDark(!isDark);
    setTimeout(() => html.classList.remove("transitioning"), 300);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md ${className}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 size={18} className="text-primary-foreground" />
            </div>
            <span>Linspo UI</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/components"
              className={`text-sm transition-colors ${currentPage === "components"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Components
            </Link>
            <Link
              href="/demo"
              className={`text-sm transition-colors ${currentPage === "demo"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Demo
            </Link>
            <a
              href="https://github.com/jchiwaii/Linspo-UI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg border border-border bg-background hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
