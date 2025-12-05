"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { BarChart3 } from "lucide-react";

interface ComponentPageProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function ComponentPage({ title, subtitle, children }: ComponentPageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-28 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            href="/components"
                            className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
                        >
                            ← Back to Components
                        </Link>
                        <h1
                            className={`text-4xl font-semibold text-foreground mb-3 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {title}
                        </h1>
                        <p
                            className={`text-lg text-muted-foreground max-w-2xl transition-all duration-500 delay-100 ${isLoaded ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            {subtitle}
                        </p>
                    </div>

                    {/* Content */}
                    <div
                        className={`transition-all duration-500 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                    >
                        {children}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 border-t border-border">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <BarChart3 size={18} />
                        <span className="text-sm">Linspo UI</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
