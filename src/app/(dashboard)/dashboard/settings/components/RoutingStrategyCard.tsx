"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, Input, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

type RoutingSettings = {
  fallbackStrategy?: string;
  stickyRoundRobinLimit?: number | string;
  comboStrategy?: string;
  comboStickyRoundRobinLimit?: number | string;
};

type Translate = ReturnType<typeof useTranslations>;

async function patchSettings(body: Record<string, unknown>) {
  const res = await fetch("/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("settings patch failed");
  return res.json();
}

async function patchComboDefaultsStrategy(strategy: string) {
  const res = await fetch("/api/settings/combo-defaults", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comboDefaults: { strategy } }),
  });
  if (!res.ok) throw new Error("combo-defaults patch failed");
}

function numericLimit(value: number | string | undefined, fallback: number): number {
  const n = typeof value === "number" ? value : parseInt(String(value), 10);
  return Number.isFinite(n) ? n : fallback;
}

/** Loads/persists the routing-strategy settings and tracks loading/busy state.
 * Extracted out of the component body to keep RoutingStrategyCard's own render
 * function under the complexity/size gate. */
function useRoutingStrategySettings() {
  const [settings, setSettings] = useState<RoutingSettings>({
    fallbackStrategy: "fill-first",
    stickyRoundRobinLimit: 3,
    comboStrategy: "fallback",
    comboStickyRoundRobinLimit: 1,
  });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setSettings({
        fallbackStrategy: data?.fallbackStrategy || "fill-first",
        stickyRoundRobinLimit: data?.stickyRoundRobinLimit ?? 3,
        comboStrategy: data?.comboStrategy || "fallback",
        comboStickyRoundRobinLimit: data?.comboStickyRoundRobinLimit ?? 1,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  const run = useCallback(async (fn: () => Promise<void>) => {
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }, []);

  return { settings, setSettings, loading, busy, run };
}

type SectionProps = {
  t: Translate;
  busy: boolean;
  settings: RoutingSettings;
  setSettings: React.Dispatch<React.SetStateAction<RoutingSettings>>;
  run: (fn: () => Promise<void>) => Promise<void>;
};

function AccountRoundRobinSection({ t, busy, settings, setSettings, run }: SectionProps) {
  const accountRoundRobin = settings.fallbackStrategy === "round-robin";
  return (
    <>
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-base">{t("accountRoundRobin")}</p>
          <p className="text-xs sm:text-sm text-text-muted">{t("accountRoundRobinDesc")}</p>
        </div>
        <Toggle
          checked={accountRoundRobin}
          disabled={busy}
          onChange={() =>
            run(async () => {
              const next = accountRoundRobin ? "fill-first" : "round-robin";
              const updated = await patchSettings({ fallbackStrategy: next });
              setSettings((prev) => ({ ...prev, fallbackStrategy: updated.fallbackStrategy || next }));
            })
          }
        />
      </div>

      {accountRoundRobin && (
        <div className="flex items-start sm:items-center justify-between gap-4 pt-2 border-t border-border/50">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm sm:text-base">{t("stickyLimit")}</p>
            <p className="text-xs sm:text-sm text-text-muted">{t("stickyLimitDesc")}</p>
          </div>
          <Input
            type="number"
            min={1}
            max={10}
            disabled={busy}
            className="w-16 sm:w-20 text-center shrink-0"
            value={settings.stickyRoundRobinLimit ?? 3}
            onChange={(e) => setSettings((prev) => ({ ...prev, stickyRoundRobinLimit: e.target.value }))}
            onBlur={() =>
              run(async () => {
                const limit = Math.min(
                  10,
                  Math.max(1, parseInt(String(settings.stickyRoundRobinLimit), 10) || 3)
                );
                const updated = await patchSettings({ stickyRoundRobinLimit: limit });
                setSettings((prev) => ({
                  ...prev,
                  stickyRoundRobinLimit: updated.stickyRoundRobinLimit ?? limit,
                }));
              })
            }
          />
        </div>
      )}
    </>
  );
}

function ComboRoundRobinSection({ t, busy, settings, setSettings, run }: SectionProps) {
  const comboRoundRobin = settings.comboStrategy === "round-robin";
  return (
    <>
      <div className="flex items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm sm:text-base">{t("comboRoundRobin")}</p>
          <p className="text-xs sm:text-sm text-text-muted">{t("comboRoundRobinDesc")}</p>
        </div>
        <Toggle
          checked={comboRoundRobin}
          disabled={busy}
          onChange={() =>
            run(async () => {
              const next = comboRoundRobin ? "fallback" : "round-robin";
              const defaultComboStrategy = next === "round-robin" ? "round-robin" : "priority";
              await patchComboDefaultsStrategy(defaultComboStrategy);
              const updated = await patchSettings({ comboStrategy: next });
              setSettings((prev) => ({ ...prev, comboStrategy: updated.comboStrategy || next }));
            })
          }
        />
      </div>

      {comboRoundRobin && (
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="font-medium">{t("comboStickyLimit")}</p>
            <p className="text-sm text-text-muted">{t("comboStickyLimitDesc")}</p>
          </div>
          <Input
            type="number"
            min={1}
            max={100}
            disabled={busy}
            className="w-20 text-center"
            value={settings.comboStickyRoundRobinLimit ?? 1}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, comboStickyRoundRobinLimit: e.target.value }))
            }
            onBlur={() =>
              run(async () => {
                const limit = Math.min(
                  100,
                  Math.max(1, parseInt(String(settings.comboStickyRoundRobinLimit), 10) || 1)
                );
                const updated = await patchSettings({ comboStickyRoundRobinLimit: limit });
                setSettings((prev) => ({
                  ...prev,
                  comboStickyRoundRobinLimit: updated.comboStickyRoundRobinLimit ?? limit,
                }));
              })
            }
          />
        </div>
      )}
    </>
  );
}

function RoutingSummaryFooter({
  t,
  accountRoundRobin,
  comboRoundRobin,
  accountStickyDisplay,
  comboStickyDisplay,
}: {
  t: Translate;
  accountRoundRobin: boolean;
  comboRoundRobin: boolean;
  accountStickyDisplay: number;
  comboStickyDisplay: number;
}) {
  return (
    <p className="text-xs text-text-muted italic pt-2 border-t border-border/50">
      {accountRoundRobin
        ? t("routingStrategyAccountSummary", { limit: accountStickyDisplay })
        : t("routingStrategyFillFirstSummary")}
      {comboRoundRobin
        ? t("routingStrategyComboSummary", { limit: comboStickyDisplay })
        : t("routingStrategyComboFallbackSummary")}
    </p>
  );
}

/**
 * 9router-style Routing Strategy card (Profile → Routing Strategy parity).
 * Settings → Routing, first card on the page.
 */
export default function RoutingStrategyCard() {
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const { settings, setSettings, loading, busy, run } = useRoutingStrategySettings();

  const accountRoundRobin = settings.fallbackStrategy === "round-robin";
  const comboRoundRobin = settings.comboStrategy === "round-robin";
  const accountStickyDisplay = numericLimit(settings.stickyRoundRobinLimit, 3);
  const comboStickyDisplay = numericLimit(settings.comboStickyRoundRobinLimit, 1);

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            route
          </span>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold">{t("routingStrategyTitle")}</h3>
          <p className="text-xs text-text-muted">{t("routingStrategySubtitle")}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-text-muted">{tc("loading")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <AccountRoundRobinSection t={t} busy={busy} settings={settings} setSettings={setSettings} run={run} />
          <ComboRoundRobinSection t={t} busy={busy} settings={settings} setSettings={setSettings} run={run} />
          <RoutingSummaryFooter
            t={t}
            accountRoundRobin={accountRoundRobin}
            comboRoundRobin={comboRoundRobin}
            accountStickyDisplay={accountStickyDisplay}
            comboStickyDisplay={comboStickyDisplay}
          />
        </div>
      )}
    </Card>
  );
}
