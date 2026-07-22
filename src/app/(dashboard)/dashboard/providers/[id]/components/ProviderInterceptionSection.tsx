"use client";

/**
 * ProviderInterceptionSection — provider-level toggles for OmniRoute web
 * search/fetch tool interception (#3384 Phases 1-2 shipped the DB schema +
 * resolvers only; #7339 wires interceptFetch into the chat pipeline and adds
 * this dashboard toggle, covering both interceptSearch and interceptFetch
 * since they share one interception-rules row per provider).
 *
 * Renders a card on the provider detail page where operators opt a provider
 * into routing its provider-native web_search / web_fetch tool calls through
 * OmniRoute's own /v1/search and /v1/web/fetch endpoints instead of letting
 * the upstream provider run them natively. Off (undefined) preserves today's
 * native-bypass behavior exactly — this is purely additive opt-in.
 */

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";
import Toggle from "@/shared/components/Toggle";

interface ProviderInterceptionSectionProps {
  providerId: string;
}

interface InterceptionToggles {
  interceptSearch: boolean;
  interceptFetch: boolean;
}

type Translate = (key: string, values?: Record<string, string>) => string;

const DEFAULT_TOGGLES: InterceptionToggles = { interceptSearch: false, interceptFetch: false };

async function fetchInterceptionToggles(providerId: string): Promise<InterceptionToggles> {
  const res = await fetch(`/api/providers/${providerId}/interception-rules`);
  const data = await res.json();
  return {
    interceptSearch: data?.interceptSearch === true,
    interceptFetch: data?.interceptFetch === true,
  };
}

async function throwOnErrorResponse(res: Response): Promise<void> {
  if (res.ok) return;
  const errData = await res.json().catch(() => ({}));
  throw new Error(errData.error || `HTTP ${res.status}`);
}

async function putInterceptionToggles(
  providerId: string,
  toggles: InterceptionToggles
): Promise<void> {
  const res = await fetch(`/api/providers/${providerId}/interception-rules`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toggles),
  });
  await throwOnErrorResponse(res);
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function useProviderInterceptionToggles(providerId: string, t: Translate) {
  const notify = useNotificationStore();
  const [toggles, setToggles] = useState<InterceptionToggles>(DEFAULT_TOGGLES);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<keyof InterceptionToggles | null>(null);

  const loadToggles = useCallback(async () => {
    setLoading(true);
    try {
      setToggles(await fetchInterceptionToggles(providerId));
    } catch (err) {
      notify.error(t("interceptionLoadError", { error: errorMessage(err) }));
    } finally {
      setLoading(false);
    }
  }, [providerId, notify, t]);

  useEffect(() => {
    loadToggles();
  }, [loadToggles]);

  const handleToggle = useCallback(
    async (key: keyof InterceptionToggles, value: boolean) => {
      const next = { ...toggles, [key]: value };
      setSavingKey(key);
      try {
        await putInterceptionToggles(providerId, next);
        setToggles(next);
      } catch (err) {
        notify.error(t("interceptionSaveError", { error: errorMessage(err) }));
      } finally {
        setSavingKey(null);
      }
    },
    [providerId, toggles, notify, t]
  );

  return { toggles, loading, savingKey, handleToggle };
}

function InterceptionSectionSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <div className="h-5 w-56 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 h-16 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}

export default function ProviderInterceptionSection({
  providerId,
}: ProviderInterceptionSectionProps) {
  const t = useTranslations("providers");
  const { toggles, loading, savingKey, handleToggle } = useProviderInterceptionToggles(
    providerId,
    t
  );

  if (loading) {
    return <InterceptionSectionSkeleton />;
  }

  return (
    <div className="rounded-xl border border-border bg-white p-5 dark:bg-zinc-950">
      <h2 className="text-base font-semibold text-text-main mb-1">
        {t("interceptionSectionTitle")}
      </h2>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {t("interceptionSectionHint")}
      </p>
      <div className="flex flex-col gap-4">
        <Toggle
          size="sm"
          checked={toggles.interceptSearch}
          disabled={savingKey === "interceptSearch"}
          onChange={(value) => handleToggle("interceptSearch", value)}
          label={t("interceptSearchLabel")}
          description={t("interceptSearchHint")}
        />
        <Toggle
          size="sm"
          checked={toggles.interceptFetch}
          disabled={savingKey === "interceptFetch"}
          onChange={(value) => handleToggle("interceptFetch", value)}
          label={t("interceptFetchLabel")}
          description={t("interceptFetchHint")}
        />
      </div>
    </div>
  );
}
