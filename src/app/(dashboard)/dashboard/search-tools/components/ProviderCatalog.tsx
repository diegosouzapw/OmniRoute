"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { SearchProviderCatalogItem } from "@/shared/schemas/searchTools";

interface ProviderCatalogProps {
  /** If provided, highlight this provider as selected */
  selectedProvider?: string;
  onSelectProvider?: (id: string) => void;
}

function StatusBadge({ status }: { status: SearchProviderCatalogItem["status"] }) {
  const t = useTranslations("search");
  if (status === "configured") {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] text-success font-medium"
        data-testid="status-configured"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" aria-hidden="true" />
        {t("statusConfigured")}
      </span>
    );
  }
  if (status === "rate_limited") {
    return (
      <span
        className="inline-flex items-center gap-1 text-[10px] text-warning font-medium"
        data-testid="status-rate-limited"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" aria-hidden="true" />
        {t("statusRateLimited")}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] text-text-muted font-medium"
      data-testid="status-missing"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-border inline-block" aria-hidden="true" />
      {t("statusMissing")}
    </span>
  );
}

function ProviderCard({
  item,
  selected,
  onSelect,
}: {
  item: SearchProviderCatalogItem;
  selected: boolean;
  onSelect?: () => void;
}) {
  const t = useTranslations("search");
  const isClickable = item.status !== "missing" && onSelect;

  return (
    <div
      className={[
        "border rounded-lg p-3 transition-colors",
        selected ? "border-primary/40 bg-primary/5" : "border-border bg-surface",
        isClickable ? "cursor-pointer hover:border-primary/30" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={isClickable ? onSelect : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onSelect?.();
            }
          : undefined
      }
      data-testid={`provider-card-${item.id}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="text-xs font-semibold text-text-main">{item.name}</div>
          <div className="text-[10px] text-text-muted mt-0.5">
            {item.kind === "search" ? t("kindSearch") : t("kindFetch")}
          </div>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-text-muted">
        <span>
          <span className="font-medium text-text-main">${item.costPerQuery.toFixed(4)}</span>/query
        </span>
        {item.freeMonthlyQuota > 0 && (
          <span>
            Free{" "}
            <span className="font-medium text-text-main">
              {item.freeMonthlyQuota >= 1000
                ? `${(item.freeMonthlyQuota / 1000).toFixed(0)}k`
                : item.freeMonthlyQuota}
            </span>
            /mo
          </span>
        )}
      </div>

      {item.searchTypes && item.searchTypes.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {item.searchTypes.map((t) => (
            <span
              key={t}
              className="text-[9px] px-1.5 py-0.5 rounded bg-bg-alt text-text-muted border border-border"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {item.fetchFormats && item.fetchFormats.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {item.fetchFormats.map((f) => (
            <span
              key={f}
              className="text-[9px] px-1.5 py-0.5 rounded bg-bg-alt text-text-muted border border-border"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {item.status === "missing" && (
        <Link
          href={item.configureHref}
          className="mt-2 block text-[10px] text-accent hover:underline"
          data-testid={`configure-link-${item.id}`}
        >
          Configure →
        </Link>
      )}
    </div>
  );
}

export default function ProviderCatalog({
  selectedProvider,
  onSelectProvider,
}: ProviderCatalogProps) {
  const [providers, setProviders] = useState<SearchProviderCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterKind, setFilterKind] = useState<"all" | "search" | "fetch">("all");

  useEffect(() => {
    // loading is initialized to true — no need to setLoading(true) here
    // (setLoading in the body of useEffect triggers the lint rule react-hooks/set-state-in-effect)
    globalThis
      .fetch("/api/search/providers")
      .then((res) => res.json())
      .then((data: { providers?: SearchProviderCatalogItem[] }) => {
        setProviders(data.providers ?? []);
        setError(null);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load providers");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filterKind === "all" ? providers : providers.filter((p) => p.kind === filterKind);

  const searchCount = providers.filter((p) => p.kind === "search").length;
  const fetchCount = providers.filter((p) => p.kind === "fetch").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8" data-testid="catalog-loading">
        <span
          className="material-symbols-outlined text-[20px] text-primary animate-spin"
          aria-hidden="true"
        >
          progress_activity
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-xs text-error" data-testid="catalog-error">
        Erro ao carregar providers: {error}
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="provider-catalog">
      {/* Filter tabs */}
      <div className="flex gap-1">
        {(["all", "search", "fetch"] as const).map((kind) => (
          <button
            key={kind}
            className={[
              "text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors",
              filterKind === kind
                ? "bg-primary/15 text-primary"
                : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main",
            ].join(" ")}
            onClick={() => setFilterKind(kind)}
            data-testid={`filter-${kind}`}
          >
            {kind === "all"
              ? `All (${providers.length})`
              : kind === "search"
                ? `Search (${searchCount})`
                : `Fetch (${fetchCount})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-xs text-text-muted py-4 text-center">
          No provider found.{" "}
          <Link href="/dashboard/providers" className="text-accent hover:underline">
            Configure providers →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2" data-testid="provider-catalog-grid">
        {filtered.map((item) => (
          <ProviderCard
            key={item.id}
            item={item}
            selected={selectedProvider === item.id}
            onSelect={onSelectProvider ? () => onSelectProvider(item.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
