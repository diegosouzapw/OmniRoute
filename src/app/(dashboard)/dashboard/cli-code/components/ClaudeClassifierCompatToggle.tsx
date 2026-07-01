"use client";

import { useCallback, useEffect, useState } from "react";

type CompatMode = "off" | "auto" | "always";

const MODES: CompatMode[] = ["off", "auto", "always"];

const MODE_STYLES: Record<CompatMode, string> = {
  off: "bg-black/5 dark:bg-white/5 text-text-muted border-border",
  auto: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/40",
  always: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/40",
};

function isCompatMode(value: unknown): value is CompatMode {
  return value === "off" || value === "auto" || value === "always";
}

/**
 * Opt-in toggle (default "off") for Claude Code's auto-permission classifier compat mode.
 *
 * Claude Code's `--permission-mode auto` sends an internal `/v1/messages` security-classifier
 * request that requires the response to START with `<block>no</block>` (ALLOW) / `<block>yes</block>`
 * (BLOCK). When a combo/fallback route sends that call to a cheap model returning empty content,
 * Claude Code fails closed on every gated action. "auto" detects the classifier request and
 * short-circuits with a synthetic ALLOW response without calling upstream; "always" applies it to
 * every Claude-format request. Cycles off → auto → always via the existing /api/settings PATCH.
 */
export default function ClaudeClassifierCompatToggle() {
  const [mode, setMode] = useState<CompatMode>("off");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMode(isCompatMode(data?.claudeClassifierCompat) ? data.claudeClassifierCompat : "off");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load setting");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cycle = useCallback(async () => {
    const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    const previous = mode;
    setMode(next); // optimistic
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claudeClassifierCompat: next }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      setMode(previous); // revert on failure
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }, [mode]);

  return (
    <div className="rounded-lg border border-border bg-surface/40 p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-xs font-semibold text-text-main">Auto-permission classifier compat</h4>
          <p className="text-xs text-text-muted">
            Short-circuit Claude Code&apos;s <code>--permission-mode auto</code> security classifier
            with a synthetic allow, so fallback routes don&apos;t fail closed. Off by default.
          </p>
        </div>
        <button
          type="button"
          onClick={cycle}
          disabled={loading || saving}
          title="Cycle off → auto → always"
          className={`shrink-0 rounded border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors disabled:opacity-50 ${MODE_STYLES[mode]}`}
        >
          {mode}
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
