"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";
import { DOCS_TOKENS } from "./tokens";

type CalloutType = "info" | "warning" | "danger";

interface CalloutProps {
  type: CalloutType;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Callout({ type, title, children, className }: CalloutProps) {
  const theme = DOCS_TOKENS.colors[type];

  return (
    <div
      role="note"
      aria-labelledby="callout-title"
      className={cn(
        "relative overflow-hidden rounded-lg border-l-4 p-4 my-4 transition-colors",
        "bg-bg-subtle border-border",
        className
      )}
      style={{ borderLeftColor: theme.border }}
    >
      <div className="flex items-start gap-3">
        <div id="callout-title" className="font-semibold text-sm text-text-main">
          {title}
        </div>
        <div className="text-sm leading-relaxed text-text-muted">{children}</div>
      </div>
    </div>
  );
}
