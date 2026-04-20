"use client";

import { useState, useEffect } from "react";
import { Card, Input, Button } from "@/shared/components";
import FallbackChainsEditor from "./FallbackChainsEditor";
import {
  ROUTING_STRATEGIES,
  SETTINGS_FALLBACK_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { useTranslations } from "next-intl";

const STRATEGIES = ROUTING_STRATEGIES.filter((strategy) =>
  SETTINGS_FALLBACK_STRATEGY_VALUES.includes(strategy.value)
).map((strategy) => ({
  value: strategy.value,
  labelKey: strategy.labelKey,
  descKey: strategy.settingsDescKey,
  icon: strategy.icon,
}));

export default function RoutingTab() {
  const [settings, setSettings] = useState<any>({
    fallbackStrategy: "fill-first",
    alwaysPreserveClientCache: "auto",
    globalRandomRoutingEnabled: false,
    globalRandomRoutingMode: "strict",
    globalRandomRoutingExcludeCombos: true,
  });
  const [loading, setLoading] = useState(true);
  const [aliases, setAliases] = useState([]);
  const [lkgpCacheLoading, setLkgpCacheLoading] = useState(false);
  const [lkgpCacheStatus, setLkgpCacheStatus] = useState({ type: "", message: "" });
  const [availableProviders, setAvailableProviders] = useState<
    Array<{ id: string; label: string; activeConnections: number }>
  >([]);
  const [providersLoading, setProvidersLoading] = useState(true);
  const [playgroundModels, setPlaygroundModels] = useState<string[]>([]);
  const [testModel, setTestModel] = useState("");
  const [testPrompt, setTestPrompt] = useState(
    "Explique em 3 linhas como você responderia este teste."
  );
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    model: string;
    content: string;
    usage?: Record<string, unknown> | null;
  } | null>(null);
  const [testError, setTestError] = useState("");
  const [globalRandomPoolText, setGlobalRandomPoolText] = useState("");
  const [globalRandomWeightsText, setGlobalRandomWeightsText] = useState("{}");
  const [globalRandomSaveStatus, setGlobalRandomSaveStatus] = useState({
    type: "",
    message: "",
  });
  const [newPattern, setNewPattern] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const t = useTranslations("settings");
  const strategyHintKeyByValue = STRATEGIES.reduce<Record<string, string>>((acc, strategy) => {
    acc[strategy.value] = strategy.descKey;
    return acc;
  }, {});

  useEffect(() => {
    Promise.all([
      fetch("/api/settings").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/providers").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/v1/models").then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([settingsData, providersData, modelsData]) => {
        const data = settingsData || {};
        setSettings(data);
        setAliases(data.wildcardAliases || []);
        const pool = Array.isArray(data.globalRandomRoutingPool)
          ? data.globalRandomRoutingPool
          : [];
        setGlobalRandomPoolText(pool.join("\n"));
        const weights =
          data.globalRandomRoutingWeights && typeof data.globalRandomRoutingWeights === "object"
            ? data.globalRandomRoutingWeights
            : {};
        try {
          setGlobalRandomWeightsText(JSON.stringify(weights, null, 2));
        } catch {
          setGlobalRandomWeightsText("{}");
        }

        const connections = Array.isArray(providersData?.connections)
          ? providersData.connections
          : [];
        const activeByProvider = new Map<string, number>();
        for (const conn of connections) {
          if (!conn || conn.isActive === false || typeof conn.provider !== "string") continue;
          activeByProvider.set(conn.provider, (activeByProvider.get(conn.provider) || 0) + 1);
        }
        const options = Array.from(activeByProvider.entries())
          .map(([id, activeConnections]) => ({
            id,
            label: AI_PROVIDERS?.[id]?.name || id,
            activeConnections,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setAvailableProviders(options);

        const modelIds = Array.isArray(modelsData?.data)
          ? modelsData.data.map((m: any) => (typeof m?.id === "string" ? m.id : "")).filter(Boolean)
          : [];
        setPlaygroundModels(modelIds);
        if (modelIds.length > 0) {
          setTestModel(modelIds[0]);
        }
      })
      .finally(() => {
        setLoading(false);
        setProvidersLoading(false);
      });
  }, []);

  const updateSetting = async (patch) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, ...patch }));
      }
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  const addAlias = async () => {
    if (!newPattern.trim() || !newTarget.trim()) return;
    const updated = [...aliases, { pattern: newPattern.trim(), target: newTarget.trim() }];
    await updateSetting({ wildcardAliases: updated });
    setAliases(updated);
    setNewPattern("");
    setNewTarget("");
  };

  const removeAlias = async (idx) => {
    const updated = aliases.filter((_, i) => i !== idx);
    await updateSetting({ wildcardAliases: updated });
    setAliases(updated);
  };

  const toggleGlobalRandomProvider = async (providerId: string, checked: boolean) => {
    const current = Array.isArray(settings.globalRandomRoutingProviders)
      ? settings.globalRandomRoutingProviders
      : [];
    const next = checked
      ? Array.from(new Set([...current, providerId]))
      : current.filter((id: string) => id !== providerId);
    await updateSetting({ globalRandomRoutingProviders: next });
  };

  const runChatRoutingTest = async () => {
    setTestError("");
    setTestResult(null);
    const modelToUse = testModel || playgroundModels[0] || "";
    if (!modelToUse) {
      setTestError("Nenhum modelo disponível para teste.");
      return;
    }
    if (!testPrompt.trim()) {
      setTestError("Digite uma mensagem para testar.");
      return;
    }

    setTestLoading(true);
    try {
      const res = await fetch("/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelToUse,
          stream: false,
          temperature: 0.2,
          messages: [{ role: "user", content: testPrompt.trim() }],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setTestError(data?.error?.message || data?.error || "Falha ao executar teste de chat.");
        return;
      }

      const content =
        data?.choices?.[0]?.message?.content ||
        (Array.isArray(data?.output)
          ? data.output
              .map((item: any) =>
                Array.isArray(item?.content)
                  ? item.content
                      .map((c: any) =>
                        typeof c?.text === "string" ? c.text : typeof c === "string" ? c : ""
                      )
                      .join("\n")
                  : ""
              )
              .filter(Boolean)
              .join("\n")
          : "") ||
        "";

      setTestResult({
        model: typeof data?.model === "string" ? data.model : modelToUse,
        content: typeof content === "string" ? content : JSON.stringify(content),
        usage: data?.usage || null,
      });
    } catch {
      setTestError("Erro de rede ao testar chat.");
    } finally {
      setTestLoading(false);
    }
  };

  const saveGlobalRandomAdvanced = async () => {
    setGlobalRandomSaveStatus({ type: "", message: "" });
    try {
      const parsedPool = globalRandomPoolText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      let parsedWeights: Record<string, number> = {};
      try {
        const raw = JSON.parse(globalRandomWeightsText || "{}");
        if (raw && typeof raw === "object" && !Array.isArray(raw)) {
          parsedWeights = Object.fromEntries(
            Object.entries(raw)
              .filter(([k, v]) => typeof k === "string" && k.trim().length > 0 && Number(v) >= 0)
              .map(([k, v]) => [k.trim(), Number(v)])
          );
        } else {
          throw new Error("Invalid weights format");
        }
      } catch {
        setGlobalRandomSaveStatus({
          type: "error",
          message: 'Pesos inválidos. Use JSON válido: { "provider/model": 2 }',
        });
        return;
      }

      const patch = {
        globalRandomRoutingPool: parsedPool,
        globalRandomRoutingWeights: parsedWeights,
      };
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        setGlobalRandomSaveStatus({
          type: "error",
          message: "Falha ao salvar pool/pesos do roteamento global.",
        });
        return;
      }
      setSettings((prev) => ({ ...prev, ...patch }));
      setGlobalRandomSaveStatus({
        type: "success",
        message: "Roteamento global salvo com sucesso.",
      });
    } catch {
      setGlobalRandomSaveStatus({
        type: "error",
        message: "Erro ao salvar configuração de roteamento global.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Strategy Selection */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              route
            </span>
          </div>
          <h3 className="text-lg font-semibold">{t("routingStrategy")}</h3>
        </div>

        <div className="mb-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
            {t("routingAdvancedGuideTitle")}
          </p>
          <p className="text-xs text-text-muted mt-1">{t("routingAdvancedGuideHint1")}</p>
          <p className="text-xs text-text-muted">{t("routingAdvancedGuideHint2")}</p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 mb-4"
          style={{ gridAutoRows: "1fr" }}
        >
          {STRATEGIES.map((s) => (
            <button
              key={s.value}
              onClick={() => updateSetting({ fallbackStrategy: s.value })}
              disabled={loading}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border text-center transition-all ${
                settings.fallbackStrategy === s.value
                  ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  settings.fallbackStrategy === s.value ? "text-blue-400" : "text-text-muted"
                }`}
              >
                {s.icon}
              </span>
              <div>
                <p
                  className={`text-sm font-medium ${settings.fallbackStrategy === s.value ? "text-blue-400" : ""}`}
                >
                  {t(s.labelKey)}
                </p>
                <p className="text-xs text-text-muted mt-0.5">{t(s.descKey)}</p>
              </div>
            </button>
          ))}
        </div>

        {settings.fallbackStrategy === "round-robin" && (
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div>
              <p className="text-sm font-medium">{t("stickyLimit")}</p>
              <p className="text-xs text-text-muted">{t("stickyLimitDesc")}</p>
            </div>
            <Input
              type="number"
              min="1"
              max="10"
              value={settings.stickyRoundRobinLimit || 3}
              onChange={(e) => updateSetting({ stickyRoundRobinLimit: parseInt(e.target.value) })}
              disabled={loading}
              className="w-20 text-center"
            />
          </div>
        )}

        <p className="text-xs text-text-muted italic pt-3 border-t border-border/30 mt-3">
          {t(strategyHintKeyByValue[settings.fallbackStrategy] || "fillFirstDesc")}
        </p>
      </Card>

      {/* Adaptive Volume Routing */}
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                network_ping
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("adaptiveVolumeRouting") || "Adaptive Volume Routing"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("adaptiveVolumeRoutingDesc") ||
                  "Automatically adjusts traffic volume between providers based on real-time latency and error rates."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!settings.adaptiveVolumeRouting}
                onChange={(e) => updateSetting({ adaptiveVolumeRouting: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Global Random Routing */}
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                shuffle
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Global Random Routing</h3>
              <p className="text-sm text-text-muted mt-1">
                Roteia cada requisição para um modelo aleatório global, sem depender de combo.
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!!settings.globalRandomRoutingEnabled}
                onChange={(e) => updateSetting({ globalRandomRoutingEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium block mb-1">Modo</label>
            <select
              className="w-full rounded-lg border border-border/50 bg-surface/40 px-3 py-2 text-sm"
              value={settings.globalRandomRoutingMode || "strict"}
              onChange={(e) => updateSetting({ globalRandomRoutingMode: e.target.value })}
              disabled={loading}
            >
              <option value="strict">Strict (uniforme)</option>
              <option value="weighted">Weighted (por peso)</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={settings.globalRandomRoutingExcludeCombos !== false}
                onChange={(e) =>
                  updateSetting({ globalRandomRoutingExcludeCombos: e.target.checked })
                }
                disabled={loading}
              />
              Excluir combos do pool global
            </label>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-border/40 bg-surface/20 p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-sm font-medium">Providers for global routing</p>
            <span className="text-xs text-text-muted">
              {Array.isArray(settings.globalRandomRoutingProviders) &&
              settings.globalRandomRoutingProviders.length > 0
                ? `${settings.globalRandomRoutingProviders.length} selected`
                : "None selected = all active providers"}
            </span>
          </div>
          {providersLoading ? (
            <p className="text-xs text-text-muted">Loading active providers...</p>
          ) : availableProviders.length === 0 ? (
            <p className="text-xs text-text-muted">
              No active providers found. Activate at least one provider first.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {availableProviders.map((provider) => {
                const selected = Array.isArray(settings.globalRandomRoutingProviders)
                  ? settings.globalRandomRoutingProviders.includes(provider.id)
                  : false;
                return (
                  <label
                    key={provider.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-border/40 px-2 py-1.5 text-sm"
                  >
                    <span className="truncate">
                      {provider.label}
                      <span className="ml-1 text-xs text-text-muted">
                        ({provider.activeConnections})
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={(e) => toggleGlobalRandomProvider(provider.id, e.target.checked)}
                      disabled={loading}
                    />
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium block mb-1">Manual model pool (optional)</label>
            <textarea
              className="w-full min-h-36 rounded-lg border border-border/50 bg-surface/40 px-3 py-2 text-sm font-mono"
              placeholder={"openai/gpt-4.1\nanthropic/claude-sonnet-4-5\nmistral/mistral-large"}
              value={globalRandomPoolText}
              onChange={(e) => setGlobalRandomPoolText(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-text-muted mt-1">
              Leave empty to auto-build using selected active providers above.
            </p>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Pesos (JSON)</label>
            <textarea
              className="w-full min-h-36 rounded-lg border border-border/50 bg-surface/40 px-3 py-2 text-sm font-mono"
              placeholder={'{\n  "openai/gpt-4.1": 2,\n  "anthropic/claude-sonnet-4-5": 1\n}'}
              value={globalRandomWeightsText}
              onChange={(e) => setGlobalRandomWeightsText(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-text-muted mt-1">Só é usado no modo Weighted.</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button size="sm" variant="primary" onClick={saveGlobalRandomAdvanced} disabled={loading}>
            Salvar pool e pesos
          </Button>
          {globalRandomSaveStatus.message && (
            <span
              className={`text-xs ${globalRandomSaveStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {globalRandomSaveStatus.message}
            </span>
          )}
        </div>
      </Card>

      {/* LKGP Toggle */}
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 h-fit">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                verified
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {t("lkgpToggleTitle") || "Last Known Good Provider (LKGP)"}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {t("lkgpToggleDesc") ||
                  "When enabled, the router remembers which provider last served a successful response and tries it first on subsequent requests."}
              </p>
            </div>
          </div>
          <div className="pt-1">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.lkgpEnabled !== false}
                onChange={(e) => updateSetting({ lkgpEnabled: e.target.checked })}
                disabled={loading}
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            loading={lkgpCacheLoading}
            onClick={async () => {
              setLkgpCacheLoading(true);
              setLkgpCacheStatus({ type: "", message: "" });
              try {
                const res = await fetch("/api/settings/lkgp-cache", { method: "DELETE" });
                const data = await res.json();
                if (res.ok) {
                  setLkgpCacheStatus({
                    type: "success",
                    message: t("lkgpCacheCleared") || "LKGP cache cleared successfully",
                  });
                } else {
                  setLkgpCacheStatus({
                    type: "error",
                    message:
                      data.error || t("lkgpCacheClearFailed") || "Failed to clear LKGP cache",
                  });
                }
              } catch {
                setLkgpCacheStatus({
                  type: "error",
                  message: t("errorOccurred") || "An error occurred",
                });
              } finally {
                setLkgpCacheLoading(false);
              }
            }}
          >
            <span className="material-symbols-outlined text-[14px] mr-1" aria-hidden="true">
              delete_sweep
            </span>
            {t("clearLkgpCache") || "Clear LKGP Cache"}
          </Button>
          {lkgpCacheStatus.message && (
            <span
              className={`text-xs ${lkgpCacheStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {lkgpCacheStatus.message}
            </span>
          )}
        </div>
      </Card>

      {/* Chat Routing Playground */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chat
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Chat Routing Playground</h3>
            <p className="text-sm text-text-muted">
              Teste uma conversa e veja qual modelo foi usado no retorno.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium block mb-1">Modelo de entrada</label>
            <select
              className="w-full rounded-lg border border-border/50 bg-surface/40 px-3 py-2 text-sm"
              value={testModel}
              onChange={(e) => setTestModel(e.target.value)}
              disabled={loading || testLoading}
            >
              {playgroundModels.length === 0 ? (
                <option value="">Sem modelos disponíveis</option>
              ) : (
                playgroundModels.map((modelId) => (
                  <option key={modelId} value={modelId}>
                    {modelId}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              size="sm"
              variant="primary"
              onClick={runChatRoutingTest}
              loading={testLoading}
              disabled={loading || testLoading || playgroundModels.length === 0}
            >
              Testar chat agora
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium block mb-1">Mensagem</label>
          <textarea
            className="w-full min-h-24 rounded-lg border border-border/50 bg-surface/40 px-3 py-2 text-sm"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            disabled={testLoading}
            placeholder="Digite uma mensagem para testar o roteamento..."
          />
        </div>

        {testError ? <p className="mt-3 text-sm text-red-500">{testError}</p> : null}

        {testResult ? (
          <div className="mt-4 rounded-lg border border-border/40 bg-surface/20 p-3">
            <p className="text-xs text-text-muted">
              Modelo retornado: <span className="font-mono text-text-main">{testResult.model}</span>
            </p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-text-main">
              {testResult.content}
            </pre>
            {testResult.usage ? (
              <pre className="mt-2 text-xs text-text-muted overflow-x-auto">
                {JSON.stringify(testResult.usage, null, 2)}
              </pre>
            ) : null}
          </div>
        ) : null}
      </Card>

      {/* Wildcard Aliases */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              alt_route
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("modelAliases")}</h3>
            <p className="text-sm text-text-muted">{t("modelAliasesDesc")}</p>
          </div>
        </div>

        {aliases.length > 0 && (
          <div className="flex flex-col gap-1.5 mb-4">
            {aliases.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-surface/30 border border-border/20"
              >
                <div className="flex min-w-0 items-center gap-2 text-sm">
                  <span className="font-mono text-purple-400 break-all">{a.pattern}</span>
                  <span className="material-symbols-outlined text-[14px] text-text-muted">
                    arrow_forward
                  </span>
                  <span className="font-mono text-text-main break-all">{a.target}</span>
                </div>
                <button
                  onClick={() => removeAlias(i)}
                  className="shrink-0 text-text-muted hover:text-red-400 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
          <div className="flex-1">
            <Input
              label={t("pattern")}
              placeholder={t("aliasPatternPlaceholder")}
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label={t("targetModel")}
              placeholder={t("aliasTargetPlaceholder")}
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={addAlias}
            className="mb-[2px] sm:w-auto w-full"
          >
            {t("add")}
          </Button>
        </div>
      </Card>

      {/* Fallback Chains */}
      <FallbackChainsEditor />

      {/* Client Cache Control */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              cached
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Client Cache Control</h3>
            <p className="text-sm text-text-muted">
              Configure how client-side cache_control headers are handled
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              value: "auto",
              label: "Auto (Recommended)",
              desc: "Preserve cache_control for native Claude-compatible flows with deterministic routing; CC-compatible bridges use OmniRoute-managed markers",
            },
            {
              value: "always",
              label: "Always Preserve",
              desc: "Always forward client cache_control headers to upstream providers",
            },
            {
              value: "never",
              label: "Never Preserve",
              desc: "Always remove client cache_control headers, let OmniRoute manage caching",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting({ alwaysPreserveClientCache: option.value })}
              disabled={loading}
              className={`w-full flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all ${
                settings.alwaysPreserveClientCache === option.value
                  ? "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20"
                  : "border-border/50 hover:border-border hover:bg-surface/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    settings.alwaysPreserveClientCache === option.value
                      ? "text-green-400"
                      : "text-text-muted"
                  }`}
                >
                  {settings.alwaysPreserveClientCache === option.value
                    ? "check_circle"
                    : "radio_button_unchecked"}
                </span>
                <span
                  className={`text-sm font-medium ${settings.alwaysPreserveClientCache === option.value ? "text-green-400" : ""}`}
                >
                  {option.label}
                </span>
              </div>
              <p className="text-xs text-text-muted ml-7">{option.desc}</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
