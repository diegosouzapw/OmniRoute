"use client";

import { useState } from "react";

interface Snippet {
  label: string;
  code: string;
}

interface HmacRecipeBlockProps {
  title?: string;
  /** Single code block (backward compat) */
  code?: string;
  /** Multiple language snippets rendered with tab switcher */
  snippets?: Snippet[];
}

export function HmacRecipeBlock({ code, title, snippets }: HmacRecipeBlockProps) {
  const tabs: Snippet[] = snippets ?? (code ? [{ label: "Node.js", code }] : []);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(tabs[active]?.code ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (tabs.length === 0) return null;

  return (
    <div className="space-y-1">
      {title && (
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{title}</p>
      )}
      {tabs.length > 1 && (
        <div className="flex gap-1">
          {tabs.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                i === active
                  ? "bg-primary/10 text-primary"
                  : "text-text-muted hover:bg-sidebar hover:text-text-main"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-sidebar p-3 pr-10 text-xs text-text-main">
          {tabs[active]?.code}
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
