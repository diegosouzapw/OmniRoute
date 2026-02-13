"use client";

import { cn } from "@/shared/utils/cn";

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
}) {
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
        "bg-surface",
        "border border-black/5 dark:border-white/5",
        "rounded-lg shadow-sm",
        hover && "hover:shadow-md hover:border-primary/30 transition-all cursor-pointer",
        paddings[padding],
        className
      )}
      {...props}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-bg text-text-muted">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>
            )}
            <div>
              {title && <h3 className="text-text-main font-semibold">{title}</h3>}
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

// Sub-component: Bordered section inside Card
Card.Section = function CardSection({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg",
        "bg-black/[0.02] dark:bg-white/[0.02]",
        "border border-black/5 dark:border-white/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Sub-component: Hoverable row inside Card
Card.Row = function CardRow({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "p-3 -mx-3 px-3 transition-colors",
        "border-b border-black/5 dark:border-white/5 last:border-b-0",
        "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Sub-component: List item with hover actions (macOS style)
Card.ListItem = function CardListItem({ children, actions, className, ...props }) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between p-3 -mx-3 px-3",
        "border-b border-black/[0.03] dark:border-white/[0.03] last:border-b-0",
        "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]",
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
