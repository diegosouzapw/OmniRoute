"use client";

import type React from "react";
import type { ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

const variants = {
  default:
    "bg-black/[0.04] dark:bg-white/[0.07] backdrop-blur-xs border border-black/8 dark:border-white/10 text-text-muted shadow-xs",
  primary: "bg-primary/12 backdrop-blur-xs border border-primary/20 text-primary shadow-xs",
  success:
    "bg-green-500/12 backdrop-blur-xs border border-green-500/20 text-green-600 dark:text-green-400 shadow-xs",
  warning:
    "bg-amber-500/12 backdrop-blur-xs border border-amber-500/20 text-amber-600 dark:text-amber-400 shadow-xs",
  error:
    "bg-red-500/12 backdrop-blur-xs border border-red-500/20 text-red-600 dark:text-red-400 shadow-xs",
  info: "bg-blue-500/12 backdrop-blur-xs border border-blue-500/20 text-blue-600 dark:text-blue-400 shadow-xs",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

interface BadgeProps {
  children?: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  dot?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn(
            "size-1.5 rounded-full",
            variant === "success" && "bg-green-500",
            variant === "warning" && "bg-yellow-500",
            variant === "error" && "bg-red-500",
            variant === "info" && "bg-blue-500",
            variant === "primary" && "bg-primary",
            variant === "default" && "bg-gray-500"
          )}
        />
      )}
      {icon && (
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
