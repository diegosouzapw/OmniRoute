"use client";

import { useTranslations } from "next-intl";

export function getI18nOrFallback(t, key, fallback, values = undefined) {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {}
  return fallback;
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
