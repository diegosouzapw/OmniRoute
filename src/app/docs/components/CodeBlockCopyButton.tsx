"use client";

import React, { useState, useRef } from "react";

export function CodeBlockCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 bg-bg border border-border rounded-md
        hover:bg-bg-subtle transition-colors opacity-0 group-hover:opacity-100"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      <span className="material-symbols-outlined text-sm text-text-muted">
        {copied ? "check" : "content_copy"}
      </span>
    </button>
  );
}