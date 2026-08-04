"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { NoAuthAccountCard, NoAuthProviderCard } from "@/shared/components";
import { getProviderAlias, supportsNoAuthProviderProxy } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";

const ACCOUNT_PROVIDER_NAMES: Record<string, string> = {
  mimocode: "MiMoCode",
  opencode: "OpenCode",
  dahl: "Dahl",
};

interface NoAuthProviderControlsProps {
  providerId: string;
  providerName: string;
  providerProxy?: { host?: string | null } | null;
  onConfigureProviderProxy: () => void;
}

export default function NoAuthProviderControls({
  providerId,
  providerName,
  providerProxy,
  onConfigureProviderProxy,
}: NoAuthProviderControlsProps) {
  const noAuthT = useTranslations("noAuthProvider");
  const notify = useNotificationStore();
  const t = useTranslations("providers");
  const [blockedProviders, setBlockedProviders] = useState<string[]>([]);
  const [savingEnabled, setSavingEnabled] = useState(false);
  const providerAlias = getProviderAlias(providerId);
  const enabled =
    !blockedProviders.includes(providerId) &&
    !(typeof providerAlias === "string" && blockedProviders.includes(providerAlias));

  useEffect(() => {
    let cancelled = false;

    async function fetchBlockedProviders() {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled && Array.isArray(data.blockedProviders)) {
          setBlockedProviders(data.blockedProviders);
        }
      } catch (error) {
        console.error("Failed to fetch provider settings:", error);
      }
    }

    void fetchBlockedProviders();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleEnabledChange = useCallback(
    async (nextEnabled: boolean) => {
      const previous = blockedProviders;
      const keysToRemove = new Set([providerId, providerAlias].filter(Boolean));
      const next = nextEnabled
        ? previous.filter((item) => !keysToRemove.has(item))
        : Array.from(new Set([...previous.filter((item) => !keysToRemove.has(item)), providerId]));

      setBlockedProviders(next);
      setSavingEnabled(true);
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ blockedProviders: next }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data?.error?.message || data?.error || noAuthT("updateProviderFailed"));
        }
        setBlockedProviders(Array.isArray(data.blockedProviders) ? data.blockedProviders : next);
        notify.success(
          nextEnabled
            ? noAuthT("providerEnabled", { provider: providerName })
            : noAuthT("providerDisabled", { provider: providerName })
        );
      } catch (error) {
        setBlockedProviders(previous);
        notify.error(error instanceof Error ? error.message : noAuthT("updateProviderFailed"));
      } finally {
        setSavingEnabled(false);
      }
    },
    [blockedProviders, noAuthT, notify, providerAlias, providerId, providerName]
  );

  const accountProviderName = ACCOUNT_PROVIDER_NAMES[providerId];
  const host = providerProxy?.host;
  const providerProxyControl = supportsNoAuthProviderProxy(providerId) ? (
    <button
      type="button"
      onClick={onConfigureProviderProxy}
      className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-all ${
        host
          ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25"
          : "bg-black/3 text-text-muted/50 hover:bg-black/6 hover:text-text-muted dark:bg-white/3 dark:hover:bg-white/6"
      }`}
      title={host ? t("providerProxyTitleConfigured", { host }) : t("providerProxyConfigureHint")}
    >
      <span className="material-symbols-outlined text-[14px]">vpn_lock</span>
      <span className="max-w-30 truncate">{host || t("providerProxy")}</span>
    </button>
  ) : null;

  if (accountProviderName) {
    return (
      <NoAuthAccountCard
        providerId={providerId}
        providerName={accountProviderName}
        generateAccountId={() => crypto.randomUUID().replace(/-/g, "")}
        generateApiKey={
          providerId === "dahl"
            ? async () => {
                const res = await fetch("/api/dahl/tokens", { method: "POST" });
                const data = await res.json();
                if (!res.ok || !data.token) {
                  throw new Error(data?.error || "Failed to create Dahl token");
                }
                return data.token as string;
              }
            : undefined
        }
        enabled={enabled}
        savingEnabled={savingEnabled}
        onEnabledChange={handleEnabledChange}
        providerProxyControl={providerProxyControl}
      />
    );
  }

  return (
    <NoAuthProviderCard
      enabled={enabled}
      saving={savingEnabled}
      onEnabledChange={handleEnabledChange}
      providerProxyControl={providerProxyControl}
    />
  );
}
