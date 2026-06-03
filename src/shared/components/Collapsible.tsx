"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

interface CollapsibleProps {
  /** Header content (always visible, click-to-toggle). */
  title: ReactNode;
  /** Optional secondary line under the title. */
  subtitle?: ReactNode;
  /** Material symbol name shown left of the title. */
  icon?: string;
  /** Trailing element rendered next to the chevron (badges, op counts, etc). */
  trailing?: ReactNode;
  /** Whether the section is open on first render. Defaults to false. */
  defaultOpen?: boolean;
  /** Visual variant. `default` for top-level sections; `inline` for nested rows. */
  variant?: "default" | "inline";
  /** Custom class for the wrapper. */
  className?: string;
  /** Content rendered when expanded. */
  children: ReactNode;
}

/**
 * Minimal click-to-expand section. Stateless from the caller's perspective
 * (open/closed lives in local state — does NOT survive page refresh, per the
 * UX brief). Uses material-symbols-outlined chevrons to match the rest of
 * the OmniRoute UI.
 */
export default function Collapsible({
  title,
  subtitle,
  icon,
  trailing,
  defaultOpen = false,
  variant = "default",
  className,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  const wrapperClasses = cn(
    variant === "default"
      ? "rounded-lg border border-black/5 dark:border-white/5 bg-surface"
      : "rounded-md border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]",
    className
  );

  const headerRowClasses = cn(
    "flex items-center gap-3",
    variant === "default" ? "p-4" : "p-3",
    "hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors",
    open && "border-b border-black/5 dark:border-white/5"
  );

  // The chevron + title region is the click target. Trailing interactive
  // controls (Toggle, Button) live OUTSIDE the toggle button so we never nest
  // <button> inside <button> (invalid HTML; breaks keyboard nav + ARIA).
  return (
    <div className={wrapperClasses}>
      <div className={headerRowClasses}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-3 flex-1 min-w-0 text-left -m-1 p-1 rounded"
        >
          <span
            className="material-symbols-outlined text-text-muted text-[20px] shrink-0"
            aria-hidden="true"
          >
            {open ? "expand_more" : "chevron_right"}
          </span>
          {icon && (
            <span
              className="material-symbols-outlined text-text-muted text-[18px] shrink-0"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-main truncate">{title}</div>
            {subtitle && <div className="text-xs text-text-muted truncate">{subtitle}</div>}
          </div>
        </button>
        {trailing && <div className="flex items-center gap-2 shrink-0">{trailing}</div>}
      </div>
      {open && <div className={variant === "default" ? "p-4" : "p-3"}>{children}</div>}
    </div>
  );
}
