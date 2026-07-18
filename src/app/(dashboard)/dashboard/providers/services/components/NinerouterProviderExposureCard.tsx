/**
 * G-09 — Provider Exposure toggle for 9Router.
 * Persists the `providerExpose` field via POST /api/services/9router/provider-expose.
 * When enabled, 9Router models appear as `9router/...` in OmniRoute's model selection.
 */
"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Toggle } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "9router";

function renderPrefix(chunks: ReactNode) {
  return <code className="font-mono bg-bg-subtle px-1 rounded">{chunks}</code>;
}

function renderSmallPrefix(chunks: ReactNode) {
  return <code className="font-mono bg-bg-subtle px-1 rounded text-xs">{chunks}</code>;
}

export function NinerouterProviderExposureCard() {
  const t = useTranslations("embeddedServices");
  const { data, mutate } = useServiceStatus(NAME);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleToggle(enabled: boolean) {
    setPending(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/services/${NAME}/provider-expose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const errorMsg =
          body?.error?.message ??
          body?.message ??
          t("providerExposureUpdateFailed", { status: res.status });
        setMsg({ ok: false, text: errorMsg });
        return;
      }
      setMsg(null);
      mutate();
    } catch {
      setMsg({ ok: false, text: t("providerExposureNetworkFailed") });
    } finally {
      setPending(false);
    }
  }

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-8 rounded-lg flex items-center justify-center bg-purple-500/10">
          <span className="material-symbols-outlined text-purple-500 text-xl">hub</span>
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("providerExposure")}</h3>
          <p className="text-xs text-text-muted">
            {t.rich("providerExposureDescription", {
              prefix: renderPrefix,
            })}
          </p>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
            msg.ok
              ? "bg-green-500/10 text-green-600 dark:text-green-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <span className="material-symbols-outlined text-[12px]">
            {msg.ok ? "check_circle" : "error"}
          </span>
          {msg.text}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">
            {t.rich("providerExposureLabel", {
              prefix: renderSmallPrefix,
            })}
          </p>
          <p className="text-xs text-text-muted mt-0.5">{t("providerExposureHint")}</p>
        </div>
        <Toggle
          checked={data?.providerExpose ?? false}
          onChange={handleToggle}
          disabled={pending || !data}
        />
      </div>
    </Card>
  );
}
