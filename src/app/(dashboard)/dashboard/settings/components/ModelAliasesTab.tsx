"use client";

import { useState, useEffect } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function ModelAliasesTab() {
  const [builtIn, setBuiltIn] = useState<Record<string, string>>({});
  const [custom, setCustom] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings/model-aliases")
      .then((res) => res.json())
      .then((data) => {
        setBuiltIn(data.builtIn || {});
        setCustom(data.custom || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addAlias = async () => {
    if (!newFrom.trim() || !newTo.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings/model-aliases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: newFrom.trim(), to: newTo.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setCustom(data.custom);
        setNewFrom("");
        setNewTo("");
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const removeAlias = async (from: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/model-aliases", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from }),
      });
      if (res.ok) {
        const data = await res.json();
        setCustom(data.custom);
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const builtInEntries = Object.entries(builtIn);
  const customEntries = Object.entries(custom);

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            swap_horiz
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("modelAliasesTitle") || "Model Aliases"}</h3>
          <p className="text-sm text-text-muted">
            {t("modelAliasesDesc") || "Auto-forward deprecated model IDs to their replacements"}
          </p>
        </div>
        {status === "saved" && (
          <span className="ml-auto text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
            {t("saved") || "Saved"}
          </span>
        )}
      </div>

      {/* Add custom alias */}
      <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
        <p className="text-sm font-medium mb-3">{t("addCustomAlias") || "Add Custom Alias"}</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={t("deprecatedModelId") || "Deprecated model ID"}
            value={newFrom}
            onChange={(e) => setNewFrom(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-sm bg-surface border border-border/50 focus:border-amber-500/50 focus:outline-none"
          />
          <span className="text-text-muted text-lg">→</span>
          <input
            type="text"
            placeholder={t("newModelId") || "New model ID"}
            value={newTo}
            onChange={(e) => setNewTo(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg text-sm bg-surface border border-border/50 focus:border-amber-500/50 focus:outline-none"
          />
          <button
            onClick={addAlias}
            disabled={saving || !newFrom.trim() || !newTo.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 disabled:opacity-50 transition-all"
          >
            {t("add") || "Add"}
          </button>
        </div>
      </div>

      {/* Custom aliases */}
      {customEntries.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            {t("customAliases") || "Custom Aliases"}
          </p>
          <div className="rounded-lg border border-border/30 divide-y divide-border/20">
            {customEntries.map(([from, to]) => (
              <div key={from} className="flex items-center gap-3 px-4 py-2.5">
                <code className="text-xs text-red-400/80 flex-1 truncate">{from}</code>
                <span className="material-symbols-outlined text-[14px] text-text-muted">
                  arrow_forward
                </span>
                <code className="text-xs text-emerald-400/80 flex-1 truncate">{to}</code>
                <button
                  onClick={() => removeAlias(from)}
                  disabled={saving}
                  className="p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Built-in aliases (collapsed by default) */}
      <details className="group">
        <summary className="text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer flex items-center gap-1 mb-2">
          <span className="material-symbols-outlined text-[14px] group-open:rotate-90 transition-transform">
            chevron_right
          </span>
          {t("builtInAliases") || "Built-in Aliases"} ({builtInEntries.length})
        </summary>
        <div className="rounded-lg border border-border/30 divide-y divide-border/20 max-h-60 overflow-y-auto">
          {builtInEntries.map(([from, to]) => (
            <div key={from} className="flex items-center gap-3 px-4 py-2 opacity-60">
              <code className="text-xs text-red-400/60 flex-1 truncate">{from}</code>
              <span className="material-symbols-outlined text-[14px] text-text-muted">
                arrow_forward
              </span>
              <code className="text-xs text-emerald-400/60 flex-1 truncate">{to}</code>
              <span className="material-symbols-outlined text-[14px] text-text-muted">lock</span>
            </div>
          ))}
        </div>
      </details>
    </Card>
  );
}
