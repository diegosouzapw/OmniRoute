"use client";

// Per-provider rate-limit retry delay. Stored in resilience settings as
// `providerQuotaOverrides[providerId].rateLimitCooldownSeconds` and applied by
// open-sse/services/rotationConfig.ts::overrideFor ONLY when the upstream sent no
// retry hint (Retry-After / reset headers / body retryDelay always win). "Auto"
// removes the field so the engine's scaled connection-cooldown backoff applies.

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { providerText } from "../providerPageHelpers";

export const RETRY_DELAY_AUTO = "auto";
export const RETRY_DELAY_OPTION_SECONDS = [15, 30, 60, 120, 300, 600, 1800, 3600] as const;

type ProviderQuotaOverrideEntry = Record<string, number | undefined>;
type ProviderQuotaOverrides = Record<string, ProviderQuotaOverrideEntry>;

/**
 * Returns the full `providerQuotaOverrides` map to PATCH (the route replaces the whole map),
 * setting or clearing only `rateLimitCooldownSeconds` for `providerId` and preserving every
 * other provider and every other field (rpm / concurrency / providerConcurrency).
 */
export function computeRetryDelayOverrides(
  current: ProviderQuotaOverrides | null | undefined,
  providerId: string,
  value: string
): ProviderQuotaOverrides {
  const next: ProviderQuotaOverrides = { ...(current || {}) };
  const entry: ProviderQuotaOverrideEntry = { ...(next[providerId] || {}) };
  const seconds = Number(value);
  if (value === RETRY_DELAY_AUTO || !Number.isFinite(seconds) || seconds < 1) {
    delete entry.rateLimitCooldownSeconds;
  } else {
    entry.rateLimitCooldownSeconds = Math.trunc(seconds);
  }
  if (Object.keys(entry).length > 0) next[providerId] = entry;
  else delete next[providerId];
  return next;
}

/** Select value for the stored override ("auto" when unset). */
export function retryDelaySelectValue(
  overrides: ProviderQuotaOverrides | null | undefined,
  providerId: string
): string {
  const seconds = overrides?.[providerId]?.rateLimitCooldownSeconds;
  return typeof seconds === "number" && seconds > 0 ? String(seconds) : RETRY_DELAY_AUTO;
}

function formatSeconds(seconds: number): string {
  if (seconds % 3600 === 0) return `${seconds / 3600}h`;
  if (seconds % 60 === 0) return `${seconds / 60}m`;
  return `${seconds}s`;
}

interface ProviderRetryDelaySelectProps {
  providerId: string;
}

export default function ProviderRetryDelaySelect({ providerId }: ProviderRetryDelaySelectProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [overrides, setOverrides] = useState<ProviderQuotaOverrides>({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/resilience", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!cancelled && data?.providerQuotaOverrides) {
          setOverrides(data.providerQuotaOverrides as ProviderQuotaOverrides);
        }
      } catch (error) {
        console.error("Failed to load resilience settings:", error);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = useCallback(
    async (value: string) => {
      const previous = overrides;
      const next = computeRetryDelayOverrides(previous, providerId, value);
      setOverrides(next);
      setSaving(true);
      try {
        const response = await fetch("/api/resilience", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ providerQuotaOverrides: next }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(
            data?.error?.message ||
              (typeof data?.error === "string" ? data.error : "") ||
              providerText(t, "retryDelayUpdateFailed", "Failed to update retry delay")
          );
        }
        if (data?.providerQuotaOverrides) {
          setOverrides(data.providerQuotaOverrides as ProviderQuotaOverrides);
        }
        notify.success(providerText(t, "retryDelaySaved", "Retry delay saved"));
      } catch (error) {
        setOverrides(previous);
        notify.error(
          error instanceof Error
            ? error.message
            : providerText(t, "retryDelayUpdateFailed", "Failed to update retry delay")
        );
      } finally {
        setSaving(false);
      }
    },
    [notify, overrides, providerId, t]
  );

  const title = providerText(t, "retryDelayTitle", "Retry delay");
  const selected = retryDelaySelectValue(overrides, providerId);
  // A value stored through the API that is not one of the presets is still shown.
  const optionSeconds: number[] = [...RETRY_DELAY_OPTION_SECONDS];
  if (selected !== RETRY_DELAY_AUTO && !optionSeconds.includes(Number(selected))) {
    optionSeconds.push(Number(selected));
    optionSeconds.sort((a, b) => a - b);
  }

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-500">
          <span className="material-symbols-outlined text-[20px]">timer</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-sm text-text-muted">
            {providerText(
              t,
              "retryDelayDesc",
              "How long a connection rests after a rate-limit error when the provider does not say when to retry. Auto uses the built-in backoff; a reset time sent by the provider always wins."
            )}
          </p>
        </div>
        <select
          aria-label={title}
          value={selected}
          disabled={!loaded || saving}
          onChange={(event) => void handleChange(event.target.value)}
          className="shrink-0 rounded-md border border-border bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value={RETRY_DELAY_AUTO}>{providerText(t, "retryDelayAuto", "Auto")}</option>
          {optionSeconds.map((seconds) => (
            <option key={seconds} value={String(seconds)}>
              {formatSeconds(seconds)}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
}
