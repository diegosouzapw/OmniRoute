"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Select } from "@/shared/components";
import type { ProviderTier } from "@omniroute/open-sse/services/tierTypes";
import { fetchProviderTierOverride, saveProviderTierOverride } from "./providerTierFieldApi";

export interface ProviderTierFieldProps {
  /** Provider connection id string — the same key `classifyTier()` matches on. */
  provider?: string;
}

/**
 * Generic per-connection tier-override selector (#7818).
 *
 * Unlike `m365Tier.ts`'s `M365_TIER_CAPABLE_PROVIDERS` allowlist (which gates a
 * provider-specific surface), the tier override is a routing concern that
 * applies uniformly to every connection, built-in or custom — no capability
 * gate needed. Self-contained: fetches the current override on mount and
 * persists a change immediately via the tier-config route, independent of the
 * modal's own save flow (the override lives in the global `tier_config` table,
 * not on the connection record).
 */
export default function ProviderTierField({ provider }: ProviderTierFieldProps) {
  const t = useTranslations("providers");
  const [tier, setTier] = useState<ProviderTier | "">("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!provider) return;
    fetchProviderTierOverride(provider).then((value) => {
      if (!cancelled) setTier(value);
    });
    return () => {
      cancelled = true;
    };
  }, [provider]);

  if (!provider) return null;

  const handleChange = async (next: ProviderTier | "") => {
    setTier(next);
    setSaving(true);
    try {
      await saveProviderTierOverride(provider, next);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Select
      label={t("tierOverrideLabel")}
      value={tier}
      disabled={saving}
      options={[
        { value: "", label: t("tierOverrideAuto") },
        { value: "free", label: t("tierOverrideFree") },
        { value: "cheap", label: t("tierOverrideCheap") },
        { value: "premium", label: t("tierOverridePremium") },
      ]}
      onChange={(e) => handleChange(e.target.value as ProviderTier | "")}
      hint={t("tierOverrideHelpText")}
    />
  );
}
