"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";

/**
 * EmptyState — FASE-07 UX
 *
 * Reusable empty state component for dashboard sections when no data
 * is available. Provides visual feedback and optional action button.
 *
 * Usage:
 *   <EmptyState
 *     icon="📡"
 *     title="No providers yet"
 *     description="Add your first API provider to get started."
 *     actionLabel="Add Provider"
 *     onAction={() => router.push('/providers/add')}
 *   />
 */

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: (() => void) | null;
}

export default function EmptyState({
  icon = "📭",
  title,
  description = "",
  actionLabel = "",
  onAction = null,
}: EmptyStateProps) {
  const t = useTranslations("common");
  const resolvedTitle = title ?? t("nothingHere");
  return (
    <div className="empty-state-root">
      <div className="empty-state-icon" role="img" aria-hidden="true">
        {icon}
      </div>
      <h3 className="empty-state-title">{resolvedTitle}</h3>
      {description && <p className="empty-state-description">{description}</p>}
      {actionLabel && onAction && (
        <button onClick={onAction} className={cn("empty-state-action btn-root btn-secondary")}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
