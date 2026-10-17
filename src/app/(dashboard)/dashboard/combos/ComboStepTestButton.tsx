"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { getI18nOrFallback } from "./comboPageHelpers";
import {
  describeComboStepTestResult,
  getComboStepTestKey,
  getComboStepTestSnapshot,
  resolveComboStepTestTarget,
  runComboStepTest,
  subscribeComboStepTests,
} from "./comboStepTest";

const STATE_STYLES = {
  idle: { icon: "science", tone: "text-text-muted border-transparent" },
  running: { icon: "progress_activity", tone: "text-text-muted border-transparent" },
  ok: { icon: "check_circle", tone: "text-green-500 border-green-500/40" },
  error: { icon: "cancel", tone: "text-red-500 border-red-500/40" },
} as const;

/** Per-step Test button for the combo modal model list (one probe per click). */
export default function ComboStepTestButton({ entry }: { entry: unknown }) {
  const t = useTranslations("combos");
  const target = useMemo(() => resolveComboStepTestTarget(entry), [entry]);
  const key = target ? getComboStepTestKey(target) : null;
  const snapshot = useSyncExternalStore(
    subscribeComboStepTests,
    () => (key ? getComboStepTestSnapshot(key) : undefined),
    () => undefined
  );

  const state = snapshot?.state ?? "idle";
  const style = STATE_STYLES[state];
  const title = !target
    ? getI18nOrFallback(t, "testStepNotTestable", "Only single-model steps can be tested")
    : snapshot?.state === "running"
      ? getI18nOrFallback(t, "testStepRunning", "Testing…")
      : snapshot
        ? describeComboStepTestResult(snapshot)
        : getI18nOrFallback(t, "testStep", "Test this model");

  return (
    <button
      type="button"
      onClick={() => target && void runComboStepTest(target)}
      disabled={!target || state === "running"}
      className={`p-0.5 rounded border transition-colors ${style.tone} ${
        target
          ? "hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
          : "opacity-30 cursor-not-allowed"
      }`}
      title={title}
      aria-label={title}
    >
      <span
        className={`material-symbols-outlined text-[12px] ${state === "running" ? "animate-spin" : ""}`}
      >
        {style.icon}
      </span>
    </button>
  );
}
