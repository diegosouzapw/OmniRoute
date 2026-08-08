"use client";

// Issue #8935 — per-provider opt-out for the synthetic anonymous (no-auth)
// credential fallback on API-key providers whose static definition declares
// anonymousFallback: true (opencode-go, opencode-zen, pollinations, kilocode).
// Default ON (fallback enabled) when the setting is absent, so existing
// behavior is preserved for everyone who does not opt out. True no-auth
// providers (NOAUTH_PROVIDERS / WEB_COOKIE_PROVIDERS) never see this control —
// their synthetic credential is the only credential path and is governed by
// blockedProviders instead.

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { getProviderAlias, getProviderById } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";
import { providerText } from "../providerPageHelpers";

export function computeNoAuthFallbackDisabledProviders(
  current: string[],
  providerId: string,
  providerAlias: string | undefined,
  disabling: boolean
): string[] {
  const keysToRemove = new Set([providerId, providerAlias].filter(Boolean));
  if (!disabling) {
    return current.filter((item) => !keysToRemove.has(item));
  }
  return Array.from(new Set([...current.filter((item) => !keysToRemove.has(item)), providerId]));
}

export function isNoAuthFallbackEnabled(
  providerId: string,
  providerAlias: string | undefined,
  disabledProviders: string[] | undefined
): boolean {
  if (!Array.isArray(disabledProviders)) return true;
  return (
    !disabledProviders.includes(providerId) &&
    !(typeof providerAlias === "string" && disabledProviders.includes(providerAlias))
  );
}

interface AnonymousFallbackToggleProps {
  providerId: string;
  providerName: string;
}

export default function AnonymousFallbackToggle({
  providerId,
  providerName,
}: AnonymousFallbackToggleProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [disabledProviders, setDisabledProviders] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const providerDef = getProviderById(providerId) as { anonymousFallback?: boolean } | undefined;
  const providerAlias = getProviderAlias(providerId);
  const fallbackEnabled = isNoAuthFallbackEnabled(providerId, providerAlias, disabledProviders);

  useEffect(() => {
    let cancelled = false;

    async function fetchDisabledProviders() {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled && Array.isArray(data.noAuthFallbackDisabledProviders)) {
          setDisabledProviders(data.noAuthFallbackDisabledProviders);
        }
      } catch (error) {
        console.error("Failed to fetch provider settings:", error);
      }
    }

    void fetchDisabledProviders();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggle = useCallback(
    async (nextEnabled: boolean) => {
      const previous = disabledProviders;
      const next = computeNoAuthFallbackDisabledProviders(
        previous,
        providerId,
        providerAlias,
        !nextEnabled
      );
      setDisabledProviders(next);
      setSaving(true);
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ noAuthFallbackDisabledProviders: next }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(
            data?.error?.message ||
              data?.error ||
              providerText(
                t,
                "anonymousFallbackUpdateFailed",
                "Failed to update anonymous fallback setting"
              )
          );
        }
        setDisabledProviders(
          Array.isArray(data.noAuthFallbackDisabledProviders)
            ? data.noAuthFallbackDisabledProviders
            : next
        );
        notify.success(
          nextEnabled
            ? providerText(
                t,
                "anonymousFallbackEnabled",
                "Anonymous fallback enabled for {provider}",
                {
                  provider: providerName,
                }
              )
            : providerText(
                t,
                "anonymousFallbackDisabled",
                "Anonymous fallback disabled for {provider} — exhausted connections will skip this provider",
                { provider: providerName }
              )
        );
      } catch (error) {
        setDisabledProviders(previous);
        notify.error(
          error instanceof Error
            ? error.message
            : providerText(
                t,
                "anonymousFallbackUpdateFailed",
                "Failed to update anonymous fallback setting"
              )
        );
      } finally {
        setSaving(false);
      }
    },
    [disabledProviders, notify, providerAlias, providerId, providerName, t]
  );

  // Only API-key providers whose static definition opts into the anonymous
  // fallback get this control; everything else self-hides.
  if (providerDef?.anonymousFallback !== true) {
    return null;
  }

  const title = providerText(t, "anonymousFallbackTitle", "Anonymous fallback");

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]">key_off</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-sm text-text-muted">
            {providerText(
              t,
              "anonymousFallbackDesc",
              "When all configured connections are exhausted (quota, credits, or expiry), temporarily use this provider's keyless tier. Turn off to skip this provider instead of sending anonymous requests — recommended when the keyless tier rejects them (401)."
            )}
          </p>
        </div>
        <button
          type="button"
          aria-pressed={fallbackEnabled}
          aria-label={title}
          disabled={saving}
          onClick={() => handleToggle(!fallbackEnabled)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
            fallbackEnabled ? "bg-sky-500" : "bg-black/[0.12] dark:bg-white/[0.15]"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              fallbackEnabled ? "translate-x-[26px]" : "translate-x-[3px]"
            }`}
          />
        </button>
      </div>
    </Card>
  );
}
