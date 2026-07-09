"use client";

import { useCallback, useEffect, useState } from "react";
import { Input, Select } from "@/shared/components";
import { useTranslations } from "next-intl";
import { ACCOUNT_FALLBACK_STRATEGY_VALUES } from "@/shared/constants/routingStrategies";

type ProviderStrategyOverride = {
  fallbackStrategy?: string;
  stickyRoundRobinLimit?: number;
};

type Props = {
  providerKey: string;
  connectionCount: number;
};

const STRATEGY_OPTIONS = ACCOUNT_FALLBACK_STRATEGY_VALUES.filter((v) =>
  ["fill-first", "round-robin", "priority", "p2c", "random", "least-used"].includes(v)
);

function clampProviderStickyLimit(raw: string): number {
  const val = parseInt(raw, 10);
  return Math.min(10, Math.max(1, Number.isNaN(val) ? 3 : val));
}

/** Loads/saves the per-provider account-routing override. Extracted out of the
 * component body to keep ProviderAccountRoutingCard's own render function small. */
function useProviderAccountRoutingState(providerKey: string) {
  const [strategy, setStrategy] = useState<string>("");
  const [stickyLimit, setStickyLimit] = useState("3");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/settings", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    const override = ((data?.providerStrategies || {}) as Record<string, ProviderStrategyOverride>)[
      providerKey
    ];
    setStrategy(override?.fallbackStrategy || "");
    setStickyLimit(
      override?.stickyRoundRobinLimit != null ? String(override.stickyRoundRobinLimit) : ""
    );
  }, [providerKey]);

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  const save = useCallback(
    async (nextStrategy: string, nextSticky: string) => {
      setBusy(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch current settings");
        const data = await res.json();
        const current = (data?.providerStrategies || {}) as Record<
          string,
          ProviderStrategyOverride
        >;
        const override: ProviderStrategyOverride = {};
        if (nextStrategy) override.fallbackStrategy = nextStrategy;
        if (nextStrategy === "round-robin" && nextSticky !== "") {
          override.stickyRoundRobinLimit = clampProviderStickyLimit(nextSticky);
        }
        const updated = { ...current };
        if (Object.keys(override).length === 0) delete updated[providerKey];
        else updated[providerKey] = override;
        const patchRes = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ providerStrategies: updated }),
        });
        if (!patchRes.ok) throw new Error("Failed to save provider routing settings");
      } catch (e) {
        console.error(e);
      } finally {
        setBusy(false);
      }
    },
    [providerKey]
  );

  return { strategy, setStrategy, stickyLimit, setStickyLimit, busy, save };
}

export default function ProviderAccountRoutingCard({ providerKey, connectionCount }: Props) {
  const t = useTranslations("settings");
  const { strategy, setStrategy, stickyLimit, setStickyLimit, busy, save } =
    useProviderAccountRoutingState(providerKey);

  if (connectionCount < 2) return null;

  return (
    <div className="mb-4 rounded-lg border border-border/60 bg-black/[0.02] dark:bg-white/[0.02] p-3">
      <p className="text-sm font-medium">{t("providerAccountRoutingTitle")}</p>
      <p className="text-xs text-text-muted mb-3">{t("providerAccountRoutingDesc")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label={t("providerRoutingStrategy")}
          disabled={busy}
          value={strategy}
          onChange={(e) => {
            const v = e.target.value;
            setStrategy(v);
            save(v, stickyLimit).catch(console.error);
          }}
        >
          <option value="">{t("providerRoutingInheritGlobal")}</option>
          {STRATEGY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
        {strategy === "round-robin" && (
          <Input
            label={t("stickyLimit")}
            type="number"
            min={1}
            max={10}
            disabled={busy}
            value={stickyLimit || "3"}
            onChange={(e) => setStickyLimit(e.target.value)}
            onBlur={() => save(strategy, stickyLimit).catch(console.error)}
          />
        )}
      </div>
    </div>
  );
}