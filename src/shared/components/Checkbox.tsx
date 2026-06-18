"use client";

import { cn } from "@/shared/utils/cn";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/**
 * Checkbox — token-driven native checkbox (brand accent + keyboard focus ring).
 * Replaces the ad-hoc `<input type="checkbox" style={{ accentColor: "#6366f1" }}>`
 * pattern scattered across the dashboard. Optional `label` wraps it in a clickable row.
 */
export default function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const box = (
    <input
      type="checkbox"
      id={id}
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded-[4px] accent-[var(--color-accent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
  if (!label) return box;
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-2 cursor-pointer text-sm text-text-main"
    >
      {box}
      <span>{label}</span>
    </label>
  );
}
