"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  filename?: string;
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, code, language = "tsx", showLineNumbers = true, filename, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split("\n");

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-lg border border-border bg-[hsl(224_71%_4%)] text-[hsl(210_40%_98%)]",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm text-muted-foreground font-mono">
                {filename}
              </span>
            )}
            {!filename && language && (
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {language}
              </span>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-chart-2" />
                <span className="text-chart-2">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm leading-relaxed">
            <code className="font-mono">
              {lines.map((line, index) => (
                <div key={index} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell pr-4 text-right text-muted-foreground/50 select-none w-8">
                      {index + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {highlightSyntax(line, language)}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

// Simple syntax highlighting
function highlightSyntax(line: string, language: string): React.ReactNode {
  if (language !== "tsx" && language !== "typescript" && language !== "javascript") {
    return line;
  }

  const tokens: { pattern: RegExp; className: string }[] = [
    // Comments
    { pattern: /(\/\/.*$)/g, className: "text-muted-foreground/70" },
    // Strings
    { pattern: /("[^"]*"|'[^']*'|`[^`]*`)/g, className: "text-chart-2" },
    // Keywords
    { pattern: /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|extends|implements|new|this|super|async|await|try|catch|throw|default)\b/g, className: "text-chart-4" },
    // React/JSX
    { pattern: /\b(useState|useEffect|useRef|useMemo|useCallback|React)\b/g, className: "text-chart-1" },
    // Types
    { pattern: /\b(string|number|boolean|null|undefined|void|any|never)\b/g, className: "text-chart-3" },
    // Numbers
    { pattern: /\b(\d+\.?\d*)\b/g, className: "text-chart-3" },
    // JSX tags
    { pattern: /(<\/?[A-Z][a-zA-Z0-9]*)/g, className: "text-chart-1" },
    { pattern: /(<\/?[a-z][a-zA-Z0-9]*)/g, className: "text-chart-5" },
  ];

  let result = line;
  const replacements: { start: number; end: number; replacement: string }[] = [];

  tokens.forEach(({ pattern, className }) => {
    let match;
    const regex = new RegExp(pattern.source, pattern.flags);
    while ((match = regex.exec(line)) !== null) {
      replacements.push({
        start: match.index,
        end: match.index + match[0].length,
        replacement: `<span class="${className}">${escapeHtml(match[0])}</span>`,
      });
    }
  });

  // Sort by position and apply (simple approach - just return colored line)
  if (replacements.length === 0) {
    return line;
  }

  // For simplicity, return a dangerously set HTML (in production, use a proper highlighter like shiki)
  replacements.sort((a, b) => b.start - a.start);
  replacements.forEach(({ start, end, replacement }) => {
    result = result.slice(0, start) + replacement + result.slice(end);
  });

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export { CodeBlock };
