"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FREE_PROVIDERS, OAUTH_PROVIDERS } from "@/shared/constants/providers";

type TierCount = { configured: number; active: number };
type Coverage = { tier1: TierCount; tier2: TierCount; tier3: TierCount };

const FREE_IDS = new Set(Object.keys(FREE_PROVIDERS));
const OAUTH_IDS = new Set(Object.keys(OAUTH_PROVIDERS));

function classifyConnection(providerId: string): "tier1" | "tier2" | "tier3" {
  if (FREE_IDS.has(providerId)) return "tier3";
  if (OAUTH_IDS.has(providerId)) return "tier1";
  return "tier2";
}

const TIER_LABELS: Record<string, string> = {
  tier1: "Subscription",
  tier2: "Cheap",
  tier3: "Free",
};
const TIER_COLORS: Record<string, string> = {
  tier1: "text-amber-500",
  tier2: "text-green-500",
  tier3: "text-indigo-400",
};

export function TierCoverageWidget() {
  const t = useTranslations("common");
  const [coverage, setCoverage] = useState<Coverage | null>(null);

  useEffect(() => {
    fetch("/api/providers")
      .then((r) => r.json())
      .then((data) => {
        const connections: { provider: string; isActive: boolean }[] = data.connections ?? [];
        const counts: Coverage = {
          tier1: { configured: 0, active: 0 },
          tier2: { configured: 0, active: 0 },
          tier3: { configured: 0, active: 0 },
        };
        for (const conn of connections) {
          const tier = classifyConnection(conn.provider);
          counts[tier].configured++;
          if (conn.isActive) counts[tier].active++;
        }
        setCoverage(counts);
      })
      .catch(() => {});
  }, []);

  if (!coverage) return null;

  const tiers = (["tier1", "tier2", "tier3"] as const).map((k) => ({
    key: k,
    label: TIER_LABELS[k],
    colorClass: TIER_COLORS[k],
    ...coverage[k],
  }));

  return (
    <div className="rounded-xl border border-white/[0.06] bg-surface p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm">Tier coverage</h3>
          <p className="text-xs text-text-muted mt-0.5">Providers configured per fallback tier</p>
        </div>
        <Link
          href="/dashboard/providers"
          className="text-xs text-text-muted hover:text-text-main transition-colors"
        >
          Manage →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiers.map(({ key, label, colorClass, configured, active }) => (
          <div key={key} className="text-center">
            <div className={`text-2xl font-bold ${colorClass}`}>{active}</div>
            <div className="text-xs text-text-muted mt-0.5">{label}</div>
            {configured > 0 && active < configured && (
              <div className="text-xs text-amber-500 mt-0.5">{configured - active} inactive</div>
            )}
            {configured === 0 && (
              <Link
                href="/dashboard/providers/new"
                className="text-xs text-blue-400 underline mt-0.5 block"
              >
                {t("add")}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
