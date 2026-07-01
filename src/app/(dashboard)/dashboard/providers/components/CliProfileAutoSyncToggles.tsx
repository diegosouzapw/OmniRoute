"use client";

import { useCallback, useEffect, useState } from "react";
import { Toggle } from "@/shared/components";

type FlagEntry = { key: string; effectiveValue: string };

const CODEX_KEY = "OMNIROUTE_AUTO_SYNC_CODEX_PROFILES";
const CLAUDE_KEY = "OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES";

function isOn(value: string | undefined): boolean {
  return value === "true" || value === "1" || value === "yes" || value === "on";
}

/**
 * Providers-dashboard toggle card for the opt-in "auto-sync CLI profiles after model
 * discovery" feature. Reads/writes the OMNIROUTE_AUTO_SYNC_{CODEX,CLAUDE}_PROFILES feature
 * flags via /api/settings/feature-flags. Both default off; enabling one makes a provider
 * model sync regenerate that tool's profile files from the live catalog.
 */
export default function CliProfileAutoSyncToggles() {
  const [codexOn, setCodexOn] = useState(false);
  const [claudeOn, setClaudeOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings/feature-flags");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const flags: FlagEntry[] = Array.isArray(data.flags) ? data.flags : [];
      setCodexOn(isOn(flags.find((f) => f.key === CODEX_KEY)?.effectiveValue));
      setClaudeOn(isOn(flags.find((f) => f.key === CLAUDE_KEY)?.effectiveValue));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const persist = useCallback(
    async (key: string, next: boolean, previous: boolean, apply: (v: boolean) => void) => {
      apply(next); // optimistic
      setSavingKey(key);
      setError(null);
      try {
        const res = await fetch("/api/settings/feature-flags", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value: next ? "true" : "false" }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } catch (err) {
        apply(previous); // revert on failure
        setError(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSavingKey(null);
      }
    },
    []
  );

  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-text-main">CLI profile auto-sync</h3>
        <p className="text-xs text-text-muted">
          After a provider model sync, automatically regenerate CLI tool profiles from the live
          catalog. Off by default — only profile files are written, never the active/default
          config.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Toggle
          checked={codexOn}
          disabled={loading || savingKey === CODEX_KEY}
          onChange={(v) => persist(CODEX_KEY, v, codexOn, setCodexOn)}
          label="Codex profiles"
          description="Regenerate ~/.codex/*.config.toml after model discovery."
        />
        <Toggle
          checked={claudeOn}
          disabled={loading || savingKey === CLAUDE_KEY}
          onChange={(v) => persist(CLAUDE_KEY, v, claudeOn, setClaudeOn)}
          label="Claude Code profiles"
          description="Regenerate ~/.claude/profiles/<name>/settings.json after model discovery."
        />
      </div>
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
