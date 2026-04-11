"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card } from "@/shared/components";

type ForwardingKeywordsResponse = {
  config: Record<string, unknown>;
  defaults: Record<string, unknown>;
};

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default function ForwardingKeywordsTab() {
  const saveStatusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);
  const [defaults, setDefaults] = useState<Record<string, unknown> | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const isDirty = useMemo(() => {
    if (!config) return false;
    return draft !== formatJson(config);
  }, [config, draft]);

  const load = async () => {
    try {
      const res = await fetch("/api/settings/forwarding-keywords");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as ForwardingKeywordsResponse;
      setConfig(data.config);
      setDefaults(data.defaults);
      setDraft(formatJson(data.config));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load forwarding keyword settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    return () => {
      if (saveStatusTimeoutRef.current) {
        clearTimeout(saveStatusTimeoutRef.current);
      }
    };
  }, []);

  const save = async () => {
    setStatus("");
    setError("");

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(draft) as Record<string, unknown>;
    } catch {
      setError("JSON is invalid. Fix the editor content before saving.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/settings/forwarding-keywords", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = await res.json();
      if (!res.ok) {
        const message = data?.error?.message || data?.error || "Failed to save forwarding keywords";
        throw new Error(String(message));
      }
      setConfig(data.config);
      setDefaults(data.defaults);
      setDraft(formatJson(data.config));
      setStatus("saved");
      if (saveStatusTimeoutRef.current) {
        clearTimeout(saveStatusTimeoutRef.current);
      }
      saveStatusTimeoutRef.current = setTimeout(() => {
        setStatus("");
        saveStatusTimeoutRef.current = null;
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save forwarding keyword settings");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    if (!defaults) return;
    setDraft(formatJson(defaults));
    setStatus("");
    setError("");
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            conversion_path
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Forwarding Keyword Rules</h3>
          <p className="text-sm text-text-muted">
            Manage Claude OAuth lexical rewrite rules in OmniRoute settings instead of editing proxy
            code. Changes apply only inside the proxy forwarding path.
          </p>
        </div>
        {status === "saved" && (
          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Saved
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-border/40 bg-surface/30 p-3 text-xs text-text-muted leading-relaxed">
          Edit the JSON for lane-specific rewrite rules. Tool names, free text, and prompt-tag
          replacements are all persisted in settings and loaded by the proxy before forwarding.
        </div>

        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={18}
          spellCheck={false}
          disabled={loading || saving}
          className="w-full rounded-lg border border-border/50 bg-surface/30 px-4 py-3 font-mono text-sm leading-6 resize-y min-h-[360px] focus:outline-none focus:ring-1 focus:ring-sky-500/30 focus:border-sky-500/50"
        />

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="primary"
            onClick={save}
            disabled={loading || saving || !isDirty}
          >
            {saving ? "Saving..." : "Save forwarding rules"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={resetToDefaults}
            disabled={loading || saving || !defaults}
          >
            Reset editor to defaults
          </Button>
          <Button size="sm" variant="ghost" onClick={load} disabled={loading || saving}>
            Reload
          </Button>
        </div>
      </div>
    </Card>
  );
}
