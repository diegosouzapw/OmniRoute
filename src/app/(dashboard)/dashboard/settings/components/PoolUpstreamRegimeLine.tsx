"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type UniformEgressRegime = {
  provider: string;
  windowHours: number;
  attempts: number;
  measured: number;
  share5xx: number;
  exitsTouched: number;
  exitsWithTraffic: number;
  affectedExits: number;
  uniform: boolean;
  state: "measured" | "unmeasured";
};

function isRegime(value: unknown): value is UniformEgressRegime {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.provider === "string" &&
    typeof record.windowHours === "number" &&
    typeof record.attempts === "number" &&
    typeof record.measured === "number" &&
    typeof record.share5xx === "number" &&
    typeof record.exitsTouched === "number" &&
    typeof record.exitsWithTraffic === "number" &&
    typeof record.affectedExits === "number" &&
    typeof record.uniform === "boolean" &&
    (record.state === "measured" || record.state === "unmeasured")
  );
}

/**
 * One line under a provider pool when every exit fails upstream together: the
 * provider fails as a whole, never an exit problem. Renders nothing unless the
 * read reports a measured uniform 5xx regime — an unmeasured window, a healthy
 * provider, or a failed/off read hides the line instead of concluding.
 */
export function PoolUpstreamRegimeLine({ provider }: { provider: string }) {
  const t = useTranslations("proxyRegistry");
  const [loaded, setLoaded] = useState<{ provider: string; regime: UniformEgressRegime | null }>({
    provider: "",
    regime: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/settings/proxies/pool/uniform-egress?provider=${encodeURIComponent(provider)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((body: unknown) => {
        if (!cancelled) setLoaded({ provider, regime: isRegime(body) ? body : null });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ provider, regime: null });
      });
    return () => {
      cancelled = true;
    };
  }, [provider]);

  const regime = loaded.provider === provider ? loaded.regime : null;
  if (!regime || !regime.uniform || regime.state !== "measured") return null;

  return (
    <div className="mb-1" data-testid="proxy-registry-upstream-regime-line">
      <p className="text-xs text-text-muted">
        {t("uniformEgressLine", {
          affected: regime.affectedExits,
          exits: regime.exitsWithTraffic,
          provider: regime.provider,
          hours: regime.windowHours,
        })}
      </p>
    </div>
  );
}
