"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  filename,
  children,
  className,
}: CodeBlockProps) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div
      className={cn(
        "group relative my-6 rounded-lg overflow-hidden border border-border",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-bg-subtle border-b border-border text-xs font-medium text-text-muted">
          <span>{filename}</span>
          <button
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-text-main"
            aria-label="Copy code to clipboard"
          >
            Copy
          </button>
        </div>
      )}
      <pre
        className="p-4 overflow-x-auto text-sm font-mono bg-bg-subtle text-text-main"
        tabIndex={0}
      >
        <code className="block">{children || code}</code>
      </pre>
    </div>
  );
}
