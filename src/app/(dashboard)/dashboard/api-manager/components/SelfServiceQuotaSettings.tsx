"use client";

import { useId } from "react";
import { HeaderModeSelect } from "./HeaderModeSelect";
import { ProviderQuotaPicker } from "./ProviderQuotaPicker";
import type { QuotaProviderOption, SelfServiceQuota } from "../selfServiceQuota";

/**
 * Controlled editor for the per-key self-service quota settings: which reachable
 * providers' shared account quota the key holder can see (`null` = all, `[]` = none,
 * otherwise an explicit subset) and the upstream `anthropic-ratelimit-*` header mode.
 * Used by the API key permissions modal and the per-key details page.
 */
export function SelfServiceQuotaSettings({
  value,
  onChange,
  providerOptions,
  disabled = false,
  showProviderPicker = true,
}: {
  value: SelfServiceQuota;
  onChange: (next: SelfServiceQuota) => void;
  providerOptions: readonly QuotaProviderOption[];
  disabled?: boolean;
  /** The provider picker only matters while the key shares account quota. */
  showProviderPicker?: boolean;
}) {
  const baseId = useId();
  const headerSelectId = `${baseId}-headers`;
  const shareAll = value.sharedQuotaProviders === null;
  const selected = value.sharedQuotaProviders ?? [];
  const reachable = new Set(providerOptions.map((option) => option.provider));

  const setProviders = (sharedQuotaProviders: string[] | null) =>
    onChange({ ...value, sharedQuotaProviders });

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
      {showProviderPicker && (
        <ProviderQuotaPicker
          baseId={baseId}
          disabled={disabled}
          shareAll={shareAll}
          selected={selected}
          providerOptions={providerOptions}
          reachable={reachable}
          onSetProviders={setProviders}
        />
      )}

      <HeaderModeSelect
        id={headerSelectId}
        value={value.anthropicRateLimitHeaders}
        disabled={disabled}
        onChange={(mode) => onChange({ ...value, anthropicRateLimitHeaders: mode })}
      />
    </div>
  );
}
