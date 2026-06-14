"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const DEFAULT_BYPASS_PATTERNS = [
  "*.bank.*",
  "*.gov.*",
  "*.okta.com",
  "*.auth0.com",
];

interface BypassListEditorProps {
  patterns: string[];
  onSave: (patterns: string[]) => Promise<void>;
}

/**
 * Textarea / chip editor for user-defined bypass patterns.
 * Shows read-only defaults + editable user list.
 */
export function BypassListEditor({ patterns, onSave }: BypassListEditorProps) {
  const t = useTranslations("agentBridge");
  const [userInput, setUserInput] = useState(patterns.join("\n"));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const parsed = userInput
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      await onSave(parsed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs font-medium text-text-muted mb-1.5">
          {t("bypassDefaultsLabel") || "Default bypass patterns (read-only)"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DEFAULT_BYPASS_PATTERNS.map((p) => (
            <span
              key={p}
              className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface text-xs text-text-muted border border-border/40"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-text-muted mb-1.5 block">
          {t("bypassUserLabel") || "Custom bypass patterns (one per line, glob or regex)"}
        </label>
        <textarea
          className="w-full min-h-[80px] rounded-lg border border-border/50 bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="*.internal.corp&#10;sso.example.com"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        >
          {saving ? t("saving") || "Saving…" : t("saveBypassList") || "Save bypass list"}
        </button>
      </div>
    </div>
  );
}
