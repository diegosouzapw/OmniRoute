"use client";

import type React from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/cn";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: string;
  action?: ReactNode;
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  icon,
  action,
  padding = "md",
  hover = false,
  className,
  ...props
}: CardProps) {
  const paddings = {
    none: "",
    xs: "p-3",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "glass-card",
        "rounded-card border border-border shadow-sm",
        hover &&
          "hover:shadow-md hover:border-primary/35 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
        paddings[padding],
        className
      )}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-border text-text-muted shadow-xs">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>
            )}
            <div>
              {title && <h3 className="text-text-main font-semibold tracking-tight">{title}</h3>}
              {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

// Sub-component: Bordered section inside Card — glass-aware (audit: no opaque fills inside glass-card)
Card.Section = function CardSection({ children, className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl",
        "bg-[var(--glass-bg-subtle)] backdrop-blur-sm",
        "border border-white/10 dark:border-white/[0.06] shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardRowProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

// Sub-component: Hoverable row inside Card — glass-aware hover (uses translucent tokens, not opaque bg-bg-subtle)
Card.Row = function CardRow({ children, className, ...props }: CardRowProps) {
  return (
    <div
      className={cn(
        "p-3 -mx-3 px-3 transition-colors",
        "border-b border-white/10 dark:border-white/[0.06] last:border-b-0",
        "hover:bg-white/[0.38] dark:hover:bg-white/[0.04] hover:backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardListItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

// Sub-component: List item with hover actions (macOS style) — glass-aware hover
Card.ListItem = function CardListItem({
  children,
  actions,
  className,
  ...props
}: CardListItemProps) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-3 -mx-3 px-3",
        "border-b border-white/10 dark:border-white/[0.04] last:border-b-0",
        "hover:bg-white/[0.38] dark:hover:bg-white/[0.04] hover:backdrop-blur-sm",
        "transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {actions && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          {actions}
        </div>
      )}
    </div>
  );
};
