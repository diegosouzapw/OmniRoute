"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Card from "./Card";
import { matchesOnlyPaidModels } from "@/shared/utils/freeModels";

export interface ModelMapping {
  id: string;
  pattern: string;
  comboId: string;
  comboName?: string;
  priority: number;
  enabled: boolean;
  description: string;
}

interface Combo {
  id: string;
  name: string;
}

export default function ModelRoutingSection({ combos: externalCombos }: { combos?: Combo[] } = {}) {
  const t = useTranslations("settings");
  const [mappings, setMappings] = useState<ModelMapping[]>([]);
  const [internalCombos, setInternalCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hidePaidModels, setHidePaidModels] = useState(false);
  const combos = externalCombos || internalCombos;

  // Form state
  const [pattern, setPattern] = useState("");
  const [comboId, setComboId] = useState("");
  const [priority, setPriority] = useState(0);
  const [description, setDescription] = useState("");

  const loadMappings = async () => {
    try {
      const res = await fetch("/api/model-combo-mappings");
      if (res.ok) {
        const data = await res.json();
        return data.mappings || [];
      }
    } catch {}
    return [];
  };

  useEffect(() => {
    let cancelled = false;
    loadMappings().then((data) => {
      if (!cancelled) {
        setMappings(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // #6540: read hidePaidModels once so the pattern field can warn (fail-open)
  // when it resolves only to paid model families.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setHidePaidModels(data.hidePaidModels === true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (externalCombos !== undefined) return;
    let cancelled = false;
    fetch("/api/combos")
      .then((res) => (res.ok ? res.json() : { combos: [] }))
      .then((data) => {
        if (!cancelled) {
          setInternalCombos(Array.isArray(data?.combos) ? data.combos : []);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [externalCombos]);

  const refetchMappings = async () => {
    const data = await loadMappings();
    setMappings(data);
  };

  const resetForm = () => {
    setPattern("");
    setComboId("");
    setPriority(0);
    setDescription("");
    setAdding(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!pattern.trim() || !comboId) return;

    try {
      if (editingId) {
        const res = await fetch(`/api/model-combo-mappings/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pattern: pattern.trim(), comboId, priority, description }),
        });
        if (res.ok) await refetchMappings();
      } else {
        const res = await fetch("/api/model-combo-mappings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pattern: pattern.trim(), comboId, priority, description }),
        });
        if (res.ok) await refetchMappings();
      }
    } catch {}
    resetForm();
  };

  const handleEdit = (m: ModelMapping) => {
    setPattern(m.pattern);
    setComboId(m.comboId);
    setPriority(m.priority);
    setDescription(m.description);
    setEditingId(m.id);
    setAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteRoutingRule"))) return;
    try {
      await fetch(`/api/model-combo-mappings/${id}`, { method: "DELETE" });
      setMappings((prev) => prev.filter((m) => m.id !== id));
    } catch {}
  };

  const handleToggle = async (m: ModelMapping) => {
    try {
      const res = await fetch(`/api/model-combo-mappings/${m.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !m.enabled }),
      });
      if (res.ok) {
        setMappings((prev) => prev.map((x) => (x.id === m.id ? { ...x, enabled: !x.enabled } : x)));
      }
    } catch {}
  };

  // #6540: fail-open heuristic — only warn/block when the pattern resolves
  // to at least one model AND every match is paid. A pattern matching a
  // mix of free and paid models (or nothing recognizable) is left alone.
  const patternIsPaidOnly = hidePaidModels && matchesOnlyPaidModels(pattern);

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              route
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("modelRoutingTitle")}</h3>
            <p className="text-sm text-text-muted">{t("modelRoutingDesc")}</p>
          </div>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg
                       bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            {t("addRule")}
          </button>
        )}
      </div>

      {/* Inline form */}
      {adding && (
        <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/[0.03] dark:bg-primary/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                {t("pattern")}
              </label>
              <input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="claude-sonnet*"
                className="w-full mt-0.5 px-2.5 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10
                           bg-white dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-[9px] text-text-muted mt-0.5">{t("patternHint")}</p>
              {patternIsPaidOnly && (
                <p className="text-[9px] text-amber-500 mt-0.5">
                  {t("paidModelPatternWarning") ||
                    "This pattern only matches paid models — enable paid models or adjust the pattern."}
                </p>
              )}
            </div>
            <div>
              <label className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                {t("routeToCombo")}
              </label>
              <select
                value={comboId}
                onChange={(e) => setComboId(e.target.value)}
                className="w-full mt-0.5 px-2.5 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10
                           bg-white dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">{t("selectCombo")}</option>
                {combos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                {t("priority")}
              </label>
              <input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="w-full mt-0.5 px-2.5 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10
                           bg-white dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-[9px] text-text-muted mt-0.5">{t("priorityHint")}</p>
            </div>
            <div>
              <label className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                {t("description")}
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Route Opus models to frontier combo"
                className="w-full mt-0.5 px-2.5 py-1.5 text-xs rounded-lg border border-black/10 dark:border-white/10
                           bg-white dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2.5">
            <button
              onClick={handleSave}
              disabled={!pattern.trim() || !comboId || patternIsPaidOnly}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-primary text-white
                         hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              {editingId ? t("update") : t("save")}
            </button>
            <button
              onClick={resetForm}
              className="px-3 py-1 text-xs font-medium rounded-lg
                         bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      )}

      {/* Mappings list */}
      {loading ? (
        <div className="mt-3 text-xs text-text-muted">{t("loading")}</div>
      ) : mappings.length === 0 ? (
        <div className="mt-3 text-center py-4">
          <p className="text-xs text-text-muted">{t("noRoutingRules")}</p>
          <p className="text-[10px] text-text-muted mt-1">{t("routingRuleHint")}</p>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-1.5">
          {mappings.map((m) => (
            <div
              key={m.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors
                ${
                  m.enabled
                    ? "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.02]"
                    : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] opacity-50"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <code className="text-xs px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono shrink-0">
                  {m.pattern}
                </code>
                <span className="text-text-muted text-[10px]">→</span>
                <span className="text-xs font-medium text-primary truncate">
                  {m.comboName || m.comboId.slice(0, 8)}
                </span>
                {m.description && (
                  <span className="text-[10px] text-text-muted truncate hidden sm:inline">
                    {m.description}
                  </span>
                )}
                <span className="text-[9px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/5 text-text-muted shrink-0">
                  P{m.priority}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleToggle(m)}
                  className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title={m.enabled ? t("disable") : t("enable")}
                >
                  <span
                    className={`material-symbols-outlined text-[14px] ${m.enabled ? "text-emerald-500" : "text-text-muted"}`}
                  >
                    {m.enabled ? "toggle_on" : "toggle_off"}
                  </span>
                </button>
                <button
                  onClick={() => handleEdit(m)}
                  className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-[14px] text-text-muted">
                    edit
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-1 rounded hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[14px] text-red-500">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
