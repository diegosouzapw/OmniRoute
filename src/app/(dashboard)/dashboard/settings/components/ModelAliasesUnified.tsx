"use client";

import { useEffect, useState } from "react";
import { Button, Card, Input } from "@/shared/components";
import { useTranslations } from "next-intl";

interface WildcardAlias {
  pattern: string;
  target: string;
}

type AliasMode = "exact" | "wildcard";

function translateOrFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
): string {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

export default function ModelAliasesUnified() {
  const [wildcardAliases, setWildcardAliases] = useState<WildcardAlias[]>([]);
  const [builtInAliases, setBuiltInAliases] = useState<Record<string, string>>({});
  const [customAliases, setCustomAliases] = useState<Record<string, string>>({});
  const [aliasMode, setAliasMode] = useState<AliasMode>("exact");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const t = useTranslations("settings");
  const builtInEntries = Object.entries(builtInAliases);
  const customEntries = Object.entries(customAliases);

  useEffect(() => {
    const loadAliases = async () => {
      try {
        const [settingsRes, aliasesRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/settings/model-aliases"),
        ]);
        const settingsData = settingsRes.ok ? await settingsRes.json() : {};
        const aliasesData = aliasesRes.ok ? await aliasesRes.json() : {};
        setWildcardAliases(settingsData.wildcardAliases || []);
        setBuiltInAliases(aliasesData.builtIn || {});
        setCustomAliases(aliasesData.custom || {});
      } catch (error) {
        console.error("Failed to load model aliases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAliases();
  }, []);

  const showStatus = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const addExactAlias = async () => {
    if (!fromValue.trim() || !toValue.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings/model-aliases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: fromValue.trim(), to: toValue.trim() }),
      });
      if (!res.ok) throw new Error("Failed to save exact alias");
      const data = await res.json();
      setCustomAliases(data.custom || {});
      setFromValue("");
      setToValue("");
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to save exact alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const removeExactAlias = async (from: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/model-aliases", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from }),
      });
      if (!res.ok) throw new Error("Failed to remove exact alias");
      const data = await res.json();
      setCustomAliases(data.custom || {});
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to remove exact alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const addWildcardAlias = async () => {
    if (!fromValue.trim() || !toValue.trim()) return;
    setSaving(true);
    try {
      const updated = [...wildcardAliases, { pattern: fromValue.trim(), target: toValue.trim() }];
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wildcardAliases: updated }),
      });
      if (!res.ok) throw new Error("Failed to save wildcard alias");
      setWildcardAliases(updated);
      setFromValue("");
      setToValue("");
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to save wildcard alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const removeWildcardAlias = async (index: number) => {
    setSaving(true);
    try {
      const updated = wildcardAliases.filter((_, currentIndex) => currentIndex !== index);
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wildcardAliases: updated }),
      });
      if (!res.ok) throw new Error("Failed to remove wildcard alias");
      setWildcardAliases(updated);
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to remove wildcard alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    if (aliasMode === "wildcard") {
      await addWildcardAlias();
      return;
    }
    await addExactAlias();
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            swap_horiz
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {translateOrFallback(t, "modelAliasesTitle", "Model Aliases")}
          </h3>
          <p className="text-sm text-text-muted">
            {translateOrFallback(
              t,
              "modelAliasesDesc",
              "Remap model names using exact matches or wildcard patterns."
            )}
          </p>
        </div>
        {status.message && (
          <span
            className={`text-xs font-medium flex items-center gap-1 ${
              status.type === "success" ? "text-emerald-500" : "text-red-500"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              {status.type === "success" ? "check_circle" : "error"}
            </span>
            {status.message}
          </span>
        )}
      </div>

      <div className="mb-5 rounded-lg border border-border/30 bg-surface/20 p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            {
              value: "exact",
              label: translateOrFallback(t, "exactMatchMode", "Exact Match"),
            },
            {
              value: "wildcard",
              label: translateOrFallback(t, "wildcardPatternMode", "Wildcard Pattern"),
            },
          ].map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => setAliasMode(mode.value as AliasMode)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                aliasMode === mode.value
                  ? "bg-white dark:bg-white/10 text-text-main shadow-sm"
                  : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-text-muted mb-3">
          {aliasMode === "exact"
            ? translateOrFallback(
                t,
                "exactMatchModeDesc",
                "Use exact aliases for deprecated or renamed model IDs."
              )
            : translateOrFallback(
                t,
                "wildcardPatternModeDesc",
                "Use wildcard aliases with * and ? when a family of models should map to one target."
              )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-2 items-end">
          <Input
            label={aliasMode === "exact" ? t("deprecatedModelId") : t("pattern")}
            placeholder={
              aliasMode === "exact" ? t("deprecatedModelId") : t("aliasPatternPlaceholder")
            }
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void handleAdd()}
            disabled={loading || saving}
          />
          <div className="hidden md:flex items-center justify-center pb-2 text-text-muted">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </div>
          <Input
            label={aliasMode === "exact" ? t("newModelId") : t("targetModel")}
            placeholder={aliasMode === "exact" ? t("newModelId") : t("aliasTargetPlaceholder")}
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void handleAdd()}
            disabled={loading || saving}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => void handleAdd()}
            disabled={loading || saving || !fromValue.trim() || !toValue.trim()}
            className="md:mb-[2px]"
          >
            {t("add")}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          {translateOrFallback(t, "customAliases", "Custom Aliases")}
        </p>
        <div className="rounded-lg border border-border/30 divide-y divide-border/20">
          {customEntries.length === 0 ? (
            <div className="px-4 py-3 text-sm text-text-muted">
              {translateOrFallback(
                t,
                "noExactAliasesConfigured",
                "No exact-match aliases configured."
              )}
            </div>
          ) : (
            customEntries.map(([from, to]) => (
              <div key={from} className="flex items-center gap-3 px-4 py-2.5">
                <code className="text-xs text-red-400/80 flex-1 truncate">{from}</code>
                <span className="material-symbols-outlined text-[14px] text-text-muted">
                  arrow_forward
                </span>
                <code className="text-xs text-emerald-400/80 flex-1 truncate">{to}</code>
                <button
                  type="button"
                  onClick={() => void removeExactAlias(from)}
                  disabled={saving}
                  className="p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          {translateOrFallback(t, "wildcardRulesTitle", "Wildcard Rules")}
        </p>
        <div className="rounded-lg border border-border/30 divide-y divide-border/20">
          {wildcardAliases.length === 0 ? (
            <div className="px-4 py-3 text-sm text-text-muted">
              {translateOrFallback(
                t,
                "noWildcardAliasesConfigured",
                "No wildcard aliases configured."
              )}
            </div>
          ) : (
            wildcardAliases.map((alias, index) => (
              <div
                key={`${alias.pattern}-${alias.target}-${index}`}
                className="flex items-center gap-3 px-4 py-2.5"
              >
                <code className="text-xs text-purple-400 flex-1 truncate">{alias.pattern}</code>
                <span className="material-symbols-outlined text-[14px] text-text-muted">
                  arrow_forward
                </span>
                <code className="text-xs text-emerald-400/80 flex-1 truncate">{alias.target}</code>
                <button
                  type="button"
                  onClick={() => void removeWildcardAlias(index)}
                  disabled={saving}
                  className="p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <details className="group">
        <summary className="text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer flex items-center gap-1 mb-2">
          <span className="material-symbols-outlined text-[14px] group-open:rotate-90 transition-transform">
            chevron_right
          </span>
          {translateOrFallback(t, "builtInAliases", "Built-in Aliases")} ({builtInEntries.length})
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
