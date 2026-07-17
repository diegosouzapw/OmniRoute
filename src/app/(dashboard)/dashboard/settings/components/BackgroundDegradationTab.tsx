"use client";

import { useState, useEffect } from "react";
import { Card, ModelSelectField, Toggle } from "@/shared/components";
import { useTranslations } from "next-intl";

export default function BackgroundDegradationTab() {
  const [config, setConfig] = useState({
    enabled: false,
    degradationMap: {},
    detectionPatterns: [],
    stats: { detected: 0, tokensSaved: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings/background-degradation")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (updates) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const { stats, ...persistable } = newConfig;
      const res = await fetch("/api/settings/background-degradation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persistable),
      });
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addMapping = () => {
    if (!newFrom.trim() || !newTo.trim()) return;
    const map = { ...config.degradationMap, [newFrom.trim()]: newTo.trim() };
    save({ degradationMap: map });
    setNewFrom("");
    setNewTo("");
  };

  const removeMapping = (key) => {
    const map = { ...config.degradationMap };
    delete map[key];
    save({ degradationMap: map });
  };

  const addPattern = () => {
    if (!newPattern.trim()) return;
    const patterns = [...config.detectionPatterns, newPattern.trim()];
    save({ detectionPatterns: patterns });
    setNewPattern("");
  };

  const removePattern = (idx) => {
    const patterns = config.detectionPatterns.filter((_, i) => i !== idx);
    save({ detectionPatterns: patterns });
  };

  const mapEntries = Object.entries(config.degradationMap || {}) as [string, string][];

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            speed
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {t("backgroundDegradationTitle") || "Background Task Degradation"}
          </h3>
          <p className="text-sm text-text-muted">
            {t("backgroundDegradationDesc") ||
              "Auto-redirect background requests (titles, summaries) to cheaper models"}
          </p>
        </div>
        {status === "saved" && (
          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>{" "}
            {t("saved") || "Saved"}
          </span>
        )}
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
        <div>
          <p className="text-sm font-medium">
            {t("enableDegradation") || "Enable Background Degradation"}
          </p>
          <p className="text-xs text-text-muted mt-0.5">
            {t("enableDegradationHint") ||
              "Automatically use cheaper models for background utility tasks"}
          </p>
        </div>
        <Toggle
          checked={config.enabled}
          onChange={(enabled) => save({ enabled })}
          disabled={loading || saving}
          ariaLabel={t("enableDegradation") || "Enable Background Degradation"}
        />
      </div>

      {/* Stats */}
      {config.stats && config.stats.detected > 0 && (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-sky-500/5 border border-sky-500/20 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-sky-400">analytics</span>
            <span className="text-xs text-text-muted">
              {t("tasksDetected") || "Tasks detected"}:
            </span>
            <span className="text-sm font-mono font-semibold text-sky-400">
              {config.stats.detected}
            </span>
          </div>
        </div>
      )}

      {config.enabled && (
        <>
          {/* Degradation Map */}
          <div className="mb-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              {t("degradationMap") || "Model Degradation Map"}
            </p>

            {/* Add new mapping */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1">
                <ModelSelectField
                  value={newFrom}
                  onChange={setNewFrom}
                  placeholder={t("premiumModel") || "Premium model"}
                />
              </div>
              <span className="text-text-muted text-lg">→</span>
              <div className="flex-1">
                <ModelSelectField
                  value={newTo}
                  onChange={setNewTo}
                  placeholder={t("cheapModel") || "Cheap model"}
                />
              </div>
              <button
                onClick={addMapping}
                disabled={saving || !newFrom.trim() || !newTo.trim()}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 disabled:opacity-50 transition-all"
              >
                {t("add") || "Add"}
              </button>
            </div>

            {/* Existing mappings */}
            {mapEntries.length > 0 && (
              <div className="rounded-lg border border-border/30 divide-y divide-border/20 max-h-48 overflow-y-auto">
                {mapEntries.map(([from, to]) => (
                  <div key={from} className="flex items-center gap-3 px-4 py-2">
                    <code className="text-xs text-orange-400/80 flex-1 truncate">{from}</code>
                    <span className="material-symbols-outlined text-[14px] text-text-muted">
                      arrow_forward
                    </span>
                    <code className="text-xs text-sky-400/80 flex-1 truncate">{to}</code>
                    <button
                      onClick={() => removeMapping(from)}
                      disabled={saving}
                      className="p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detection Patterns */}
          <details className="group">
            <summary className="text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-[14px] group-open:rotate-90 transition-transform">
                chevron_right
              </span>
              {t("detectionPatterns") || "Detection Patterns"} (
              {config.detectionPatterns?.length || 0})
            </summary>

            {/* Add new pattern */}
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder={t("newPattern") || 'e.g. "generate a title"'}
                value={newPattern}
                onChange={(e) => setNewPattern(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-sm bg-surface border border-border/50 focus:border-sky-500/50 focus:outline-none"
              />
              <button
                onClick={addPattern}
                disabled={saving || !newPattern.trim()}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 disabled:opacity-50 transition-all"
              >
                {t("add") || "Add"}
              </button>
            </div>

            {/* Existing patterns */}
            <div className="flex flex-wrap gap-2">
              {(config.detectionPatterns || []).map((pattern, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20"
                >
                  {pattern}
                  <button
                    onClick={() => removePattern(idx)}
                    className="hover:text-red-400 transition-colors"
                    disabled={saving}
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </span>
              ))}
            </div>
          </details>
        </>
      )}
    </Card>
  );
}
