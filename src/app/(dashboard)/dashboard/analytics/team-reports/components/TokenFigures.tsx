"use client";

import { useTranslations } from "next-intl";

import { fmtCompact, fmtFull } from "@/shared/utils/formatting";

import type { TokenSplit } from "./format";

/** Labels of the three token figures (Input, Output, Cache), shared by every report view. */
export function useTokenLabels(): Record<"input" | "output" | "cache", string> {
  const tCommon = useTranslations("common");
  const t = useTranslations("reports");
  return { input: tCommon("input"), output: tCommon("output"), cache: t("colCache") };
}

/** Cache total; the read / write breakdown is a hover title and is also read by screen readers. */
export function CacheTokens({ split }: { split: TokenSplit }) {
  const t = useTranslations("requestLogger.detail");
  const detail = `${t("cacheRead", { value: fmtFull(split.cacheRead) })} · ${t("cacheWrite", {
    value: fmtFull(split.cacheCreation),
  })}`;
  return (
    <span title={detail} className="cursor-help underline decoration-dotted underline-offset-2">
      {fmtCompact(split.cache)}
      <span className="sr-only"> ({detail})</span>
    </span>
  );
}
