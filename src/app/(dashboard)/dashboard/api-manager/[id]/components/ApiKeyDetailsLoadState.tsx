"use client";

import { useTranslations } from "next-intl";
import { Button, CardSkeleton } from "@/shared/components";
import type { DetailsLoadError } from "../useApiKeyDetails";

const LOAD_ERROR_KEYS = {
  not_found: "loadNotFound",
  forbidden: "loadForbidden",
  failed: "loadFailed",
} as const;

/** Skeleton shown while the initial page fetch is in flight. */
export function ApiKeyDetailsLoadingSkeleton() {
  const tc = useTranslations("common");
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="space-y-4">
      <span className="sr-only">{tc("loading")}</span>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

/** Fatal load error (page has no usable data yet) with a retry action. */
export function ApiKeyDetailsLoadError({
  error,
  onRetry,
}: {
  error: DetailsLoadError | null;
  onRetry: () => void;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-card border border-red-500/30 bg-red-500/5 p-4"
    >
      <p className="text-sm text-red-700 dark:text-red-300">
        {t(LOAD_ERROR_KEYS[error ?? "failed"])}
      </p>
      <Button size="sm" variant="secondary" icon="refresh" onClick={onRetry}>
        {tc("retry")}
      </Button>
    </div>
  );
}
