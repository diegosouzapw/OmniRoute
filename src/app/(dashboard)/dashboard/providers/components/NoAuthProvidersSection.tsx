"use client";

import { useTranslations } from "next-intl";
import { getProviderAlias } from "@/shared/constants/providers";
import type { ProviderEntry } from "../providerPageUtils";
import ProviderCard from "./ProviderCard";
import ProviderCountBadge from "./ProviderCountBadge";

/** Provider shape consumed by {@link ProviderCard} for a no-auth entry. */
interface NoAuthProvider {
  id?: string;
  name: string;
  alias?: string;
  color?: string;
  apiType?: string;
  deprecated?: boolean;
  deprecationReason?: string;
  hasFree?: boolean;
  freeNote?: string;
  subscriptionRisk?: boolean;
  serviceKinds?: string[];
}

type NoAuthEntry = ProviderEntry<NoAuthProvider>;

interface NoAuthProvidersSectionProps {
  /** Visible (non-blocked) entries, already filtered for the active display mode. */
  visibleEntries: NoAuthEntry[];
  /** Count badge props derived from the full visible set (configured/total). */
  count: { configured: number; total: number };
  /** Entries currently in `blockedProviders` — surfaced, never hidden (#5183). */
  blockedEntries: NoAuthEntry[];
  /** Current blocked-provider list (id/alias), used to compute the un-block delta. */
  blockedProviders: string[];
  /** Persist a new blocked-provider list after an un-block. */
  onBlockedChange: (next: string[]) => void;
  /** Surface a failure message (un-block PATCH failed). */
  onError: (message: string) => void;
  testingMode: string | null;
  onBatchTest: (mode: string) => void;
  onToggleProvider: (providerId: string, toggleAuthType: string, active: boolean) => void;
}

/**
 * The "No Auth" section of the providers page. Disabled (blocked) no-auth
 * providers are surfaced in a dedicated "Disabled" group with an Enable button
 * that un-blocks them in place, instead of vanishing from the page (#5166/#5183).
 */
export default function NoAuthProvidersSection({
  visibleEntries,
  count,
  blockedEntries,
  blockedProviders,
  onBlockedChange,
  onError,
  testingMode,
  onBatchTest,
  onToggleProvider,
}: NoAuthProvidersSectionProps) {
  const t = useTranslations("providers");

  const handleUnblock = async (providerId: string) => {
    const alias = getProviderAlias(providerId);
    const keysToRemove = new Set([providerId, alias].filter(Boolean) as string[]);
    const previous = blockedProviders;
    const next = previous.filter((p) => !keysToRemove.has(p));
    onBlockedChange(next);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedProviders: next }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error?.message || data?.error || "Failed to update provider");
      }
      onBlockedChange(Array.isArray(data.blockedProviders) ? data.blockedProviders : next);
    } catch (error) {
      onBlockedChange(previous);
      onError(error instanceof Error ? error.message : t("repairEnvFailed"));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-semibold flex items-center gap-2 flex-1 min-w-0">
          {t("noAuthProviders")}{" "}
          <span className="size-2.5 rounded-full bg-stone-500" title={t("noAuthLabel")} />
          <ProviderCountBadge {...count} />
        </h2>
        <button
          onClick={() => onBatchTest("no-auth")}
          disabled={!!testingMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            testingMode === "no-auth"
              ? "bg-primary/20 border-primary/40 text-primary animate-pulse"
              : "bg-bg-subtle border-border text-text-muted hover:text-text-primary hover:border-primary/40"
          }`}
          title={t("testAll")}
        >
          <span
            className={`material-symbols-outlined text-[14px]${testingMode === "no-auth" ? " animate-spin" : ""}`}
          >
            play_arrow
          </span>
          {testingMode === "no-auth" ? t("testing") : t("testAll")}
        </button>
      </div>
      <p className="text-sm text-text-muted -mt-2">{t("noAuthProvidersDesc")}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {visibleEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
          <ProviderCard
            key={providerId}
            providerId={providerId}
            provider={provider}
            stats={stats}
            authType="no-auth"
            onToggle={(active) => onToggleProvider(providerId, toggleAuthType, active)}
          />
        ))}
      </div>
      {blockedEntries.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {t("disabled")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
            {blockedEntries.map(({ providerId, provider }) => (
              <div
                key={providerId}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-bg-subtle px-3 py-2.5 opacity-80"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-text-main">
                    {provider.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                    <span className="size-1.5 rounded-full bg-red-500" />
                    {t("disabled")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleUnblock(providerId)}
                  className="shrink-0 rounded-md border border-border px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-text-primary"
                  title={t("enableProvider")}
                >
                  {t("enableProvider")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
