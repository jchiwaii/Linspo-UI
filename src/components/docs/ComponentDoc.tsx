"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Package, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";

// Types
interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface ComponentDocProps {
  title: string;
  description: string;
  children: ReactNode; // The preview component
  code: string;
  dependencies?: string[];
  props?: PropDefinition[];
  installCommand?: string;
  category?: string;
  className?: string;
}

export function ComponentDoc({
  title,
  description,
  children,
  code,
  dependencies = [],
  props = [],
  installCommand,
  category,
  className,
}: ComponentDocProps) {
  const [copiedInstall, setCopiedInstall] = React.useState(false);

  const copyInstallCommand = async () => {
    if (installCommand) {
      await navigator.clipboard.writeText(installCommand);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to Components
        </Link>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {category && (
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Installation */}
      {(installCommand || dependencies.length > 0) && (
        <div className="mb-8 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Terminal size={18} />
            Installation
          </h2>

          {installCommand && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
              <span className="text-muted-foreground">$</span>
              <code className="flex-1">{installCommand}</code>
              <button
                onClick={copyInstallCommand}
                className="p-1.5 hover:bg-background rounded transition-colors"
              >
                {copiedInstall ? (
                  <Check size={14} className="text-chart-2" />
                ) : (
                  <Copy size={14} className="text-muted-foreground" />
                )}
              </button>
            </div>
          )}

          {dependencies.length > 0 && (
            <div className="flex items-start gap-2 text-sm">
              <Package size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <span className="text-muted-foreground">Dependencies: </span>
                {dependencies.map((dep, i) => (
                  <span key={dep}>
                    <code className="text-foreground bg-muted px-1.5 py-0.5 rounded text-xs">
                      {dep}
                    </code>
                    {i < dependencies.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview & Code Tabs */}
      <Tabs defaultValue="preview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 overflow-hidden">
            <div className="flex items-center justify-center min-h-[300px]">
              {children}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <CodeBlock code={code} language="tsx" filename={`${title.toLowerCase().replace(/\s+/g, "-")}.tsx`} />
        </TabsContent>
      </Tabs>

      {/* Props Table */}
      {props.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Props</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium text-foreground">Prop</th>
                  <th className="text-left p-3 font-medium text-foreground">Type</th>
                  <th className="text-left p-3 font-medium text-foreground">Default</th>
                  <th className="text-left p-3 font-medium text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {props.map((prop) => (
                  <tr key={prop.name} className="hover:bg-muted/50 transition-colors">
                    <td className="p-3">
                      <code className="text-chart-1 font-mono text-xs bg-chart-1/10 px-1.5 py-0.5 rounded">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </td>
                    <td className="p-3">
                      <code className="text-muted-foreground font-mono text-xs">
                        {prop.type}
                      </code>
                    </td>
                    <td className="p-3">
                      {prop.default ? (
                        <code className="text-muted-foreground font-mono text-xs">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentDoc;
