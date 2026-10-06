"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import CliStatusBadge from "./CliStatusBadge";

import { Button, Card, ManualConfigModal, ModelSelectModal } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import type { ToolBatchStatus } from "@/shared/types/cliBatchStatus";

const SETTINGS_ENDPOINT = "/api/cli-tools/grok-build-settings";
const PRESETS_KEY = "omniroute.grokBuildEndpointPresets";
const CUSTOM_ENDPOINT = "__custom__";
const SUBAGENTS = ["general-purpose", "explore", "plan"] as const;

type SubagentType = (typeof SUBAGENTS)[number];
type Message = { type: "success" | "error"; text: string } | null;
type ModelOption = { value: string; label?: string };
type ApiKeyOption = { id: string; name?: string; key?: string };
type EndpointOption = { id: string; label: string; url: string };
type SavedEndpoint = { name: string; baseUrl: string };
type Backup = { id: string; createdAt: string };
type GrokModelStatus = {
  model: string | null;
  base_url: string | null;
  context_window: number | null;
};
type GrokStatus = {
  installed?: boolean;
  runnable?: boolean;
  hasOmniRoute?: boolean;
  apiKeyConfigured?: boolean;
  configPath?: string;
  config?: {
    model?: GrokModelStatus | null;
    subagentModels?: Partial<Record<SubagentType, GrokModelStatus | null>>;
  };
  error?: { message?: string } | string;
};

interface GrokBuildToolCardProps {
  tool: { name: string; description?: string };
  isExpanded?: boolean;
  onToggle?: () => void;
  apiKeys?: ApiKeyOption[];
  activeProviders?: Array<{
    provider: string;
    id?: string | number;
    providerSpecificData?: unknown;
  }>;
  hasActiveProviders?: boolean;
  availableModels?: ModelOption[];
  batchStatus?: ToolBatchStatus | null;
  lastConfiguredAt?: string | null;
}

const errorText = (body: unknown, fallback: string): string => {
  if (!body || typeof body !== "object") return fallback;
  const error = (body as { error?: unknown }).error;
  if (typeof error === "string") return error;
  if (
    error &&
    typeof error === "object" &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return fallback;
};

const ensureV1 = (value: string): string => {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return `${trimmed.replace(/(?:\/v1)+$/, "")}/v1`;
};

const readPresets = (): SavedEndpoint[] => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(PRESETS_KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is SavedEndpoint =>
      Boolean(
        item &&
        typeof item === "object" &&
        typeof item.name === "string" &&
        typeof item.baseUrl === "string"
      )
    );
  } catch {
    return [];
  }
};

const getTunnelUrl = (body: unknown): string => {
  if (!body || typeof body !== "object") return "";
  const record = body as Record<string, unknown>;
  for (const key of ["apiUrl", "publicUrl", "tunnelUrl"]) {
    if (typeof record[key] === "string" && record[key]) return ensureV1(record[key]);
  }
  return "";
};

const modelLabel = (type: SubagentType): string =>
  type === "general-purpose" ? "General purpose" : `${type[0].toUpperCase()}${type.slice(1)}`;

/** Configure Grok Build model slots and endpoint access. */
export default function GrokBuildToolCard({
  tool,
  isExpanded = true,
  onToggle = () => undefined,
  apiKeys = [],
  activeProviders = [],
  hasActiveProviders = false,
  availableModels = [],
  batchStatus = null,
  lastConfiguredAt = null,
}: GrokBuildToolCardProps) {
  const t = useTranslations("cliTools");
  const [status, setStatus] = useState<GrokStatus | null>(null);
  const [checking, setChecking] = useState(true);
  const [applying, setApplying] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState<Message>(null);
  const [model, setModel] = useState("");
  const [subagentModels, setSubagentModels] = useState<Partial<Record<SubagentType, string>>>({});
  const [selectedKeyId, setSelectedKeyId] = useState("");
  const [endpoints, setEndpoints] = useState<EndpointOption[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [customEndpoint, setCustomEndpoint] = useState("");
  const [modelTarget, setModelTarget] = useState<"main" | SubagentType | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [backups, setBackups] = useState<Backup[]>([]);
  const [showBackups, setShowBackups] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState<string | null>(null);

  // Default to the first available key while the user hasn't picked one —
  // derived during render instead of synced through an effect
  // (react-hooks/set-state-in-effect).
  const effectiveKeyId = selectedKeyId || apiKeys[0]?.id || "";

  const hydrateStatus = useCallback((next: GrokStatus) => {
    setStatus(next);
    setModel(next.config?.model?.model ?? "");
    setSubagentModels(
      Object.fromEntries(
        SUBAGENTS.flatMap((type) => {
          const value = next.config?.subagentModels?.[type]?.model;
          return value ? [[type, value]] : [];
        })
      )
    );
  }, []);

  const refreshStatus = useCallback(async () => {
    setChecking(true);
    try {
      const response = await fetch(SETTINGS_ENDPOINT);
      const body = (await response.json()) as GrokStatus;
      if (!response.ok) throw new Error(errorText(body, "Failed to read Grok Build settings"));
      hydrateStatus(body);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setChecking(false);
    }
  }, [hydrateStatus]);

  const refreshEndpoints = useCallback(async () => {
    const requests = [
      fetch("/api/settings"),
      fetch("/api/tunnels/cloudflared"),
      fetch("/api/tunnels/tailscale"),
      fetch("/api/tunnels/ngrok"),
    ];
    const results = await Promise.allSettled(requests);
    const bodies = await Promise.all(
      results.map(async (result) =>
        result.status === "fulfilled" && result.value.ok ? result.value.json() : null
      )
    );
    const settings = (bodies[0] ?? {}) as Record<string, unknown>;
    const next: EndpointOption[] = [];
    if (typeof settings.apiPort === "number") {
      next.push({
        id: "local",
        label: "Local",
        url: `http://127.0.0.1:${settings.apiPort}/v1`,
      });
    }
    if (typeof settings.cloudUrl === "string" && typeof settings.machineId === "string") {
      next.push({
        id: "cloud",
        label: "Cloud",
        url: ensureV1(`${settings.cloudUrl.replace(/\/+$/, "")}/${settings.machineId}`),
      });
    }
    ["cloudflared", "tailscale", "ngrok"].forEach((name, index) => {
      const url = getTunnelUrl(bodies[index + 1]);
      if (url) next.push({ id: name, label: name, url });
    });
    readPresets().forEach((preset, index) => {
      next.push({ id: `saved-${index}`, label: preset.name, url: ensureV1(preset.baseUrl) });
    });
    next.push({ id: CUSTOM_ENDPOINT, label: "Custom", url: "" });
    setEndpoints(next);
    setSelectedEndpoint((current) => current || next[0]?.id || CUSTOM_ENDPOINT);
  }, []);

  const refreshBackups = useCallback(async () => {
    try {
      const response = await fetch("/api/cli-tools/backups?tool=grok-build");
      const body = (await response.json()) as { backups?: Backup[] };
      if (response.ok) setBackups(body.backups ?? []);
    } catch {
      setBackups([]);
    }
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    // Load in an async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effect bodies).
    void (async () => {
      await Promise.all([refreshStatus(), refreshEndpoints(), refreshBackups()]);
    })();
  }, [isExpanded, refreshBackups, refreshEndpoints, refreshStatus]);

  const baseUrl = useMemo(() => {
    if (selectedEndpoint === CUSTOM_ENDPOINT) return ensureV1(customEndpoint);
    return endpoints.find((endpoint) => endpoint.id === selectedEndpoint)?.url ?? "";
  }, [customEndpoint, endpoints, selectedEndpoint]);

  const manualToml = useMemo(() => {
    const contextWindowFor = (selected: string): number =>
      (
        availableModels.find((candidate) => candidate.value === selected) as
          (ModelOption & { contextWindow?: number; contextLength?: number }) | undefined
      )?.contextWindow ??
      (
        availableModels.find((candidate) => candidate.value === selected) as
          (ModelOption & { contextWindow?: number; contextLength?: number }) | undefined
      )?.contextLength ??
      200000;
    const mainModel = model || "provider/model-id";
    const blocks = [
      `[models]\ndefault = "omniroute"`,
      `[model.omniroute]\nmodel = "${mainModel}"\nbase_url = "${baseUrl || "http://127.0.0.1:<API_PORT>/v1"}"\nname = "OmniRoute"\ndescription = "Routed via OmniRoute gateway"\napi_backend = "chat_completions"\napi_key = "<API_KEY_FROM_DASHBOARD>"\ncontext_window = ${contextWindowFor(mainModel)}`,
    ];
    const mappings: string[] = [];
    for (const type of SUBAGENTS) {
      const selected = subagentModels[type]?.trim();
      if (!selected) continue;
      const slot = `omniroute-${type}`;
      mappings.push(`${type} = "${slot}"`);
      blocks.push(
        `[model.${slot}]\nmodel = "${selected}"\nbase_url = "${baseUrl || "http://127.0.0.1:<API_PORT>/v1"}"\nname = "OmniRoute ${type}"\ndescription = "Routed via OmniRoute gateway"\napi_backend = "chat_completions"\napi_key = "<API_KEY_FROM_DASHBOARD>"\ncontext_window = ${contextWindowFor(selected)}`
      );
    }
    if (mappings.length) blocks.splice(1, 0, `[subagents.models]\n${mappings.join("\n")}`);
    return `${blocks.join("\n\n")}\n`;
  }, [availableModels, baseUrl, model, subagentModels]);

  const apply = async () => {
    setApplying(true);
    setMessage(null);
    try {
      const desiredSubagents = Object.fromEntries(
        SUBAGENTS.flatMap((type) => {
          const selected = subagentModels[type]?.trim();
          return selected ? [[type, { model: selected }]] : [];
        })
      );
      const selectedContext = (selected: string): number | undefined => {
        const option = availableModels.find((candidate) => candidate.value === selected) as
          (ModelOption & { contextWindow?: number; contextLength?: number }) | undefined;
        return option?.contextWindow ?? option?.contextLength;
      };
      const response = await fetch(SETTINGS_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          baseUrl,
          keyId: effectiveKeyId || null,
          model,
          contextWindow: selectedContext(model),
          subagentModels: Object.fromEntries(
            Object.entries(desiredSubagents).map(([type, entry]) => [
              type,
              { ...entry, contextWindow: selectedContext(entry.model) },
            ])
          ),
        }),
      });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(errorText(body, "Failed to apply settings"));
      setMessage({ type: "success", text: "Grok Build settings applied." });
      await Promise.all([refreshStatus(), refreshBackups()]);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setApplying(false);
    }
  };

  const reset = async () => {
    setResetting(true);
    setMessage(null);
    try {
      const response = await fetch(SETTINGS_ENDPOINT, { method: "DELETE" });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(errorText(body, "Failed to reset settings"));
      setMessage({ type: "success", text: "Grok Build settings reset." });
      await Promise.all([refreshStatus(), refreshBackups()]);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setResetting(false);
    }
  };

  const selectModel = (selection: unknown) => {
    const value = (selection as { value?: unknown })?.value;
    if (typeof value !== "string") return;
    if (modelTarget === "main") setModel(value);
    else if (modelTarget) setSubagentModels((current) => ({ ...current, [modelTarget]: value }));
    setModelTarget(null);
  };

  const restoreBackup = async (backupId: string) => {
    setRestoringBackup(backupId);
    setMessage(null);
    try {
      const response = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool: "grok-build", backupId }),
      });
      const body: unknown = await response.json();
      if (!response.ok) throw new Error(errorText(body, "Failed to restore backup"));
      setMessage({ type: "success", text: "Grok Build backup restored." });
      await Promise.all([refreshStatus(), refreshBackups()]);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : String(error) });
    } finally {
      setRestoringBackup(null);
    }
  };

  const configured = Boolean(status?.hasOmniRoute);
  const cliReady = Boolean(status?.installed && status?.runnable);
  const effectiveConfigStatus = status
    ? cliReady
      ? configured
        ? "configured"
        : "not_configured"
      : "not_installed"
    : (batchStatus?.config.status ?? null);
  const rowClass = "flex items-center gap-2";
  const labelClass = "w-32 shrink-0 text-right text-sm font-semibold text-text-main";
  const inputClass =
    "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50";

  return (
    <Card padding="sm" className="overflow-hidden">
      <div className="flex cursor-pointer items-center justify-between" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center">
            <ProviderIcon providerId="grok" size={32} type="color" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">{tool.name}</h3>
              <CliStatusBadge
                effectiveConfigStatus={effectiveConfigStatus}
                batchStatus={null}
                lastConfiguredAt={lastConfiguredAt ?? batchStatus?.config.lastConfiguredAt ?? null}
              />
            </div>
            <p className="truncate text-xs text-text-muted">{tool.description}</p>
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-[20px] text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </div>

      {isExpanded && (
        <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
          {checking && (
            <div className="flex items-center gap-2 text-text-muted">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              <span>{t("checkingCli", { tool: "Grok Build" })}</span>
            </div>
          )}

          {!checking && status && !cliReady && (
            <div className="flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
              <span className="material-symbols-outlined text-yellow-500">warning</span>
              <div>
                <p className="font-medium text-yellow-600 dark:text-yellow-400">
                  {status.installed
                    ? t("cliNotRunnable", { tool: "Grok Build" })
                    : t("cliNotInstalled", { tool: "Grok Build" })}
                </p>
                <p className="text-sm text-text-muted">
                  Direct Apply needs the Grok Build CLI on this computer. Manual Config stays
                  available.
                </p>
              </div>
            </div>
          )}

          {status?.config?.model?.base_url && (
            <div className={rowClass}>
              <span className={labelClass}>{t("current")}</span>
              <span className="material-symbols-outlined text-[14px] text-text-muted">
                arrow_forward
              </span>
              <span className="min-w-0 flex-1 truncate px-2 py-1.5 text-xs text-text-muted">
                {status.config.model.base_url}
              </span>
            </div>
          )}

          <div className={rowClass}>
            <label className={labelClass} htmlFor="grok-build-endpoint">
              {t("baseUrl")}
            </label>
            <span className="material-symbols-outlined text-[14px] text-text-muted">
              arrow_forward
            </span>
            <select
              id="grok-build-endpoint"
              className={inputClass}
              value={selectedEndpoint}
              onChange={(event) => setSelectedEndpoint(event.target.value)}
            >
              {endpoints.map((endpoint) => (
                <option key={endpoint.id} value={endpoint.id}>
                  {endpoint.label}: {endpoint.url || "Enter a URL"}
                </option>
              ))}
            </select>
          </div>
          {selectedEndpoint === CUSTOM_ENDPOINT && (
            <div className={rowClass}>
              <span className={labelClass}>Custom URL</span>
              <span className="material-symbols-outlined text-[14px] text-text-muted">
                arrow_forward
              </span>
              <input
                aria-label="Custom endpoint"
                className={inputClass}
                type="url"
                value={customEndpoint}
                onChange={(event) => setCustomEndpoint(event.target.value)}
                placeholder="https://gateway.example/v1"
              />
            </div>
          )}

          <div className={rowClass}>
            <label className={labelClass} htmlFor="grok-build-api-key">
              {t("apiKey")}
            </label>
            <span className="material-symbols-outlined text-[14px] text-text-muted">
              arrow_forward
            </span>
            <select
              id="grok-build-api-key"
              className={inputClass}
              value={effectiveKeyId}
              onChange={(event) => setSelectedKeyId(event.target.value)}
            >
              <option value="">Use the OmniRoute default key</option>
              {apiKeys.map((key) => (
                <option key={key.id} value={key.id}>
                  {key.key || key.name || key.id}
                </option>
              ))}
            </select>
          </div>

          <div className={rowClass}>
            <span className={labelClass}>{t("model")}</span>
            <span className="material-symbols-outlined text-[14px] text-text-muted">
              arrow_forward
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasActiveProviders}
              onClick={() => setModelTarget("main")}
            >
              {t("selectModel")}
            </Button>
            <input
              aria-label="Main model"
              className={inputClass}
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder={availableModels[0]?.value || "provider/model-id"}
            />
            {model && (
              <button
                type="button"
                className="rounded p-1 text-text-muted transition-colors hover:text-red-500"
                title={t("clear")}
                onClick={() => setModel("")}
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>

          <div className="my-2 h-px bg-border/50" />
          <div className="mb-2 text-right text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Subagent model overrides
          </div>
          {SUBAGENTS.map((type) => (
            <div className={`${rowClass} group`} key={type}>
              <span className="w-32 shrink-0 truncate text-right text-[11px] font-mono text-text-main opacity-70 transition-opacity group-hover:opacity-100">
                {modelLabel(type)}
              </span>
              <span className="material-symbols-outlined text-[14px] text-border transition-colors group-hover:text-primary">
                arrow_forward
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!hasActiveProviders}
                onClick={() => setModelTarget(type)}
              >
                {t("selectModel")}
              </Button>
              <input
                aria-label={`${modelLabel(type)} model`}
                className={inputClass}
                value={subagentModels[type] ?? ""}
                onChange={(event) =>
                  setSubagentModels((current) => ({ ...current, [type]: event.target.value }))
                }
                placeholder={`Use ${model || "the main model"}`}
              />
              {subagentModels[type] && (
                <button
                  type="button"
                  className="rounded p-1 text-text-muted transition-colors hover:text-red-500"
                  title={t("clear")}
                  onClick={() =>
                    setSubagentModels((current) => ({ ...current, [type]: undefined }))
                  }
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          ))}

          {message && (
            <p
              role="status"
              className={`rounded px-2 py-1.5 text-xs ${message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
            >
              {message.text}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              loading={applying}
              disabled={!cliReady || !model || !baseUrl}
              onClick={apply}
            >
              <span className="material-symbols-outlined mr-1 text-[14px]">save</span>
              {t("apply")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              loading={resetting}
              disabled={!configured}
              onClick={reset}
            >
              <span className="material-symbols-outlined mr-1 text-[14px]">restore</span>
              {t("reset")}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowManual(true)}>
              <span className="material-symbols-outlined mr-1 text-[14px]">content_copy</span>
              {t("manualConfig")}
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowBackups((current) => !current);
                if (!showBackups) void refreshBackups();
              }}
            >
              <span className="material-symbols-outlined mr-1 text-[14px]">history</span>
              {t("backups")}
              {backups.length > 0 && ` (${backups.length})`}
            </Button>
          </div>

          {showBackups && (
            <div className="mt-2 rounded-lg border border-border bg-surface p-3">
              <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold text-text-main">
                <span className="material-symbols-outlined text-[14px]">history</span>
                {t("configBackups")}
              </h4>
              {backups.length === 0 ? (
                <p className="text-xs text-text-muted">{t("noBackupsYet")}</p>
              ) : (
                <div className="space-y-1.5">
                  {backups.map((backup) => (
                    <div
                      key={backup.id}
                      className="flex items-center gap-2 rounded bg-black/5 px-2 py-1.5 text-xs dark:bg-white/5"
                    >
                      <span className="material-symbols-outlined text-[14px] text-text-muted">
                        description
                      </span>
                      <span className="flex-1 truncate font-mono" title={backup.id}>
                        {backup.id}
                      </span>
                      <span className="whitespace-nowrap text-text-muted">
                        {new Date(backup.createdAt).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
                        disabled={restoringBackup === backup.id}
                        onClick={() => void restoreBackup(backup.id)}
                      >
                        {restoringBackup === backup.id ? "..." : t("restore")}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {modelTarget && (
        <ModelSelectModal
          isOpen
          onClose={() => setModelTarget(null)}
          onSelect={selectModel}
          selectedModel={modelTarget === "main" ? model : (subagentModels[modelTarget] ?? "")}
          activeProviders={activeProviders}
          title={`Select ${modelTarget === "main" ? "main" : modelLabel(modelTarget)} model`}
        />
      )}
      <ManualConfigModal
        isOpen={showManual}
        onClose={() => setShowManual(false)}
        title="Grok Build manual config"
        configs={[{ filename: "~/.grok/config.toml", content: manualToml }]}
      />
    </Card>
  );
}
