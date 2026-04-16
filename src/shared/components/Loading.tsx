"use client";

import type { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type LoadingType = "spinner" | "page" | "skeleton" | "card";

const spinnerSizes: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

interface PageLoadingProps {
  message?: string;
  className?: string;
}

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  type?: LoadingType;
  className?: string;
  message?: string;
  size?: SpinnerSize;
  label?: string;
}

// Spinner loading
export function Spinner({ size = "md", className, label }: SpinnerProps) {
  const t = useTranslations("common");
  const ariaLabel = label ?? t("loading");
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      className={cn("inline-flex", className)}
    >
      <span className="sr-only">{ariaLabel}</span>
      <span
        aria-hidden="true"
        className={cn(
          "material-symbols-outlined text-primary animate-spin motion-reduce:animate-none",
          spinnerSizes[size]
        )}
      >
        progress_activity
      </span>
    </span>
  );
}

// Full page loading
export function PageLoading({ message, className }: PageLoadingProps) {
  const t = useTranslations("common");
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6",
        className
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="xl" />
      <p className="mt-4 text-text-muted text-center">{message ?? t("loading")}</p>
    </div>
  );
}

// Skeleton loading
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse motion-reduce:animate-none rounded-lg bg-border", className)}
      {...props}
    />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-border bg-surface" aria-hidden="true">
      <div className="flex items-center justify-between mb-4 gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-10 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

// Default export
export default function Loading({
  type = "spinner",
  className,
  message,
  size,
  label,
  ...props
}: LoadingProps) {
  switch (type) {
    case "page":
      return <PageLoading message={message} className={className} />;
    case "skeleton":
      return <Skeleton className={className} {...props} />;
    case "card":
      return <CardSkeleton />;
    default:
      return <Spinner size={size} className={className} label={label} />;
  }
}
