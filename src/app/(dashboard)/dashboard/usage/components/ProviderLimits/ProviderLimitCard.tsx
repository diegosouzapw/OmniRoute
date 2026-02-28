"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import QuotaProgressBar from "./QuotaProgressBar";
import { calculatePercentage } from "./utils";

const planVariants = {
  free: "default",
  pro: "primary",
  ultra: "success",
  enterprise: "info",
};

export default function ProviderLimitCard({
  provider,
  name,
  plan,
  quotas = [],
  message = null,
  loading = false,
  error = null,
  onRefresh,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const t = useTranslations("usage");

  const handleRefresh = async () => {
    if (!onRefresh || refreshing) return;

    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  // Get provider info from config
  const getProviderColor = () => {
    const colors = {
      github: "#000000",
      antigravity: "#4285F4",
      codex: "#10A37F",
      kiro: "#FF9900",
      claude: "#D97757",
    };
    return colors[provider?.toLowerCase()] || "#6B7280";
  };

  const providerColor = getProviderColor();
  const planVariant = planVariants[plan?.toLowerCase()] || "default";

  return (
    <Card padding="md" className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Provider Logo */}
          <div
            className="size-10 rounded-lg flex items-center justify-center p-1.5"
            style={{ backgroundColor: `${providerColor}15` }}
          >
            {imgError ? (
              <span className="text-sm font-bold" style={{ color: providerColor }}>
                {provider?.slice(0, 2).toUpperCase() || "PR"}
              </span>
            ) : (
              <Image
                src={`/providers/${provider}.png`}
                alt={provider || t("providerLimits")}
                width={40}
                height={40}
                className="object-contain rounded-lg"
                sizes="40px"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-text-primary">{name || provider}</h3>
            {plan && (
              <Badge
                variant={(planVariants as any)[plan?.toLowerCase()] || "default"}
                size={"xs" as any}
              >
                {plan}
              </Badge>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={t("refreshQuota")}
        >
          <span
            className={`material-symbols-outlined text-[20px] text-text-muted ${
              refreshing || loading ? "animate-spin" : ""
            }`}
          >
            refresh
          </span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            <div className="h-2 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
            <div className="h-2 bg-black/5 dark:bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Info Message (for providers without API) */}
      {!loading && !error && message && (
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-blue-500 text-[20px]">info</span>
            <p className="text-sm text-blue-600 dark:text-blue-400">{message}</p>
          </div>
        </div>
      )}

      {/* Quota Progress Bars */}
      {!loading && !error && !message && quotas?.length > 0 && (
        <div className="space-y-4">
          {quotas.map((quota, index) => {
            // For Antigravity, use remainingPercentage if available, otherwise calculate
            const percentage =
              quota.remainingPercentage !== undefined
                ? Math.round(((quota.total - quota.used) / quota.total) * 100)
                : calculatePercentage(quota.used, quota.total);
            const unlimited = quota.total === 0 || quota.total === null;

            return (
              <QuotaProgressBar
                key={`${quota.name}-${index}`}
                label={quota.name}
                used={quota.used}
                total={quota.total}
                percentage={percentage}
                unlimited={unlimited}
                resetTime={quota.resetAt}
              />
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && !message && quotas?.length === 0 && (
        <div className="text-center py-8 text-text-muted">
          <span className="material-symbols-outlined text-[48px] opacity-20">data_usage</span>
          <p className="text-sm mt-2">{t("noQuotaDataAvailable")}</p>
        </div>
      )}
    </Card>
  );
}
