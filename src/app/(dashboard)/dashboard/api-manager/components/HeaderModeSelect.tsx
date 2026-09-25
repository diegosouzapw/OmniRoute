"use client";

import { useTranslations } from "next-intl";
import {
  ANTHROPIC_RATE_LIMIT_HEADER_MODES,
  isAnthropicRateLimitHeaderMode,
} from "../selfServiceQuota";
import type { AnthropicRateLimitHeaderMode } from "../selfServiceQuota";

const HEADER_MODE_COPY: Record<AnthropicRateLimitHeaderMode, { label: string; desc: string }> = {
  auto: { label: "anthropicRateLimitHeadersAuto", desc: "anthropicRateLimitHeadersAutoDesc" },
  forward: {
    label: "anthropicRateLimitHeadersForward",
    desc: "anthropicRateLimitHeadersForwardDesc",
  },
  strip: { label: "anthropicRateLimitHeadersStrip", desc: "anthropicRateLimitHeadersStripDesc" },
};

/** Select + per-mode description list for the upstream `anthropic-ratelimit-*` header mode. */
export function HeaderModeSelect({
  id,
  value,
  disabled,
  onChange,
}: {
  id: string;
  value: AnthropicRateLimitHeaderMode;
  disabled: boolean;
  onChange: (mode: AnthropicRateLimitHeaderMode) => void;
}) {
  const t = useTranslations("apiManager");
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-main">
        {t("anthropicRateLimitHeadersLabel")}
      </label>
      <p className="text-xs text-text-muted">{t("anthropicRateLimitHeadersDesc")}</p>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event) => {
          const mode = event.target.value;
          if (isAnthropicRateLimitHeaderMode(mode)) onChange(mode);
        }}
        className="w-full rounded-control border border-black/10 bg-surface px-3 py-2 text-[16px] text-text-main focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-50 sm:w-auto sm:text-sm dark:border-white/10"
      >
        {ANTHROPIC_RATE_LIMIT_HEADER_MODES.map((mode) => (
          <option key={mode} value={mode}>
            {t(HEADER_MODE_COPY[mode].label)}
          </option>
        ))}
      </select>
      <ul className="flex flex-col gap-0.5 text-[11px] text-text-muted">
        {ANTHROPIC_RATE_LIMIT_HEADER_MODES.map((mode) => (
          <li key={mode} className={value === mode ? "text-text-main" : undefined}>
            <span className="font-semibold">{t(HEADER_MODE_COPY[mode].label)}:</span>{" "}
            {t(HEADER_MODE_COPY[mode].desc)}
          </li>
        ))}
      </ul>
    </div>
  );
}
