"use client";

import { useState } from "react";

interface HmacRecipeBlockProps {
  code: string;
  title?: string;
}

export function HmacRecipeBlock({ code, title }: HmacRecipeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-1">
      {title && (
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{title}</p>
      )}
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-sidebar p-3 pr-10 text-xs text-text-main">
          {code}
        </pre>
        <button
          type="button"
          onClick={() => void copy()}
          title={copied ? "Copied!" : "Copy"}
          className="absolute right-2 top-2 rounded p-1 text-text-muted transition-colors hover:bg-surface hover:text-text-main"
        >
          <span className="material-symbols-outlined text-[14px]">
            {copied ? "check" : "content_copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
