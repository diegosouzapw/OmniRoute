"use client";

import type React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

const variants = {
  primary:
    "bg-[image:var(--grad-brand)] text-white shadow-sm hover:brightness-105 hover:shadow-md border border-white/20 active:scale-[0.98]",
  accent:
    "bg-accent text-white shadow-sm hover:bg-accent-hover hover:shadow-md border border-white/20 active:scale-[0.98]",
  secondary:
    "bg-white/80 dark:bg-white/[0.08] backdrop-blur-md border border-black/10 dark:border-white/10 text-text-main hover:bg-white dark:hover:bg-white/[0.14] hover:shadow-xs active:scale-[0.98]",
  glass: "glass-button text-text-main hover:border-primary/30 active:scale-[0.98]",
  outline:
    "border border-black/15 dark:border-white/15 text-text-main hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]",
  ghost:
    "text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main active:scale-[0.98]",
  warning:
    "bg-amber-500 text-white hover:bg-amber-600 shadow-sm border border-white/20 active:scale-[0.98]",
  danger:
    "bg-red-500 text-white hover:bg-red-600 shadow-sm border border-white/20 active:scale-[0.98]",
};

export type ButtonVariant = keyof typeof variants;

const sizes = {
  sm: "h-7 px-3 text-xs rounded-control",
  md: "h-9 px-4 text-sm rounded-control",
  lg: "h-11 px-6 text-sm rounded-control",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: keyof typeof sizes;
  icon?: string;
  iconRight?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer",
        "active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          className="material-symbols-outlined animate-spin text-[18px] pointer-events-none"
          aria-hidden="true"
        >
          progress_activity
        </span>
      ) : icon ? (
        <span
          className="material-symbols-outlined text-[18px] pointer-events-none"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span
          className="material-symbols-outlined text-[18px] pointer-events-none"
          aria-hidden="true"
        >
          {iconRight}
        </span>
      )}
    </button>
  );
}
