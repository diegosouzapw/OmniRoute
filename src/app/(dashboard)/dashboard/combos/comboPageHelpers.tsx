"use client";

import { useTranslations } from "next-intl";

export function getI18nOrFallback(t, key, fallback, values = undefined) {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {}
  return fallback;
}

/** Subtitle naming the kind of target a combo editor step points at. */
export function getComboStepKindLabel(t, entry) {
  if (entry.kind === "combo-ref") {
    return getI18nOrFallback(t, "builderComboRefStep", "Nested combo reference");
  }
  if (entry.kind === "provider-wildcard") {
    return getI18nOrFallback(t, "builderProviderWildcard", "All matching provider models");
  }
  if (entry.connectionId) return getI18nOrFallback(t, "builderPinnedAccount", "Pinned account");
  if (entry.providerId) {
    return getI18nOrFallback(t, "builderDynamicAccountShort", "Dynamic account");
  }
  return getI18nOrFallback(t, "builderLegacyEntry", "Legacy model entry");
}

export function AutoComboTruncatedNote({ results }) {
  const t = useTranslations("combos");
  const tested = Array.isArray(results.results) ? results.results.length : 0;
  const total = results.totalCandidates;
  if (results.comboType !== "auto" || typeof total !== "number" || total <= tested) {
    return null;
  }
  return (
    <p className="text-xs text-text-muted">
      {getI18nOrFallback(
        t,
        "autoComboTestTruncated",
        `Tested ${tested} of ${total} live candidates (highest weights first).`,
        { tested, total }
      )}
    </p>
  );
}
