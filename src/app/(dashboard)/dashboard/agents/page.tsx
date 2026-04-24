"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card, Button, Input } from "@/shared/components";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { useTranslations } from "next-intl";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { CLI_COMPAT_PROVIDER_IDS } from "@/shared/constants/cliCompatProviders";

interface AgentInfo {
  id: string;
  name: string;
  binary: string;
  version: string | null;
  installed: boolean;
  protocol: string;
  isCustom?: boolean;
}

interface AgentSummary {
  total: number;
  installed: number;
  notFound: number;
  builtIn: number;
  custom: number;
}

// Map agent binary IDs to provider icon IDs for ProviderIcon component
const AGENT_ICON_MAP: Record<string, string> = {
  claude: "anthropic",
  "claude-code": "anthropic",
  codex: "openai",
  "gemini-cli": "google",
  gemini: "google",
  opencode: "opencode",
  openclaw: "openclaw",
  cline: "cline",
  kilocode: "kilocode",
  kilo: "kilocode",
  cursor: "cursor",
  antigravity: "antigravity",
  droid: "droid",
  goose: "goose",
  aider: "aider",
  kiro: "kiro",
  nanobot: "nanobot",
  picoclaw: "picoclaw",
  zeroclaw: "zeroclaw",
  ironclaw: "ironclaw",
};

function getAgentIconId(agentId: string): string | null {
  return AGENT_ICON_MAP[agentId] || null;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentInfo[]>([]);
  const [summary, setSummary] = useState<AgentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [newAgent, setNewAgent] = useState({
    name: "",
    binary: "",
    versionCommand: "",
    spawnArgs: "",
  });
  const t = useTranslations("agents");
  const ts = useTranslations("settings");

  const fetchAgents = useCallback(async () => {
    try {
      const res = await fetch("/api/acp/agents");
      const data = await res.json();
      setAgents(data.agents || []);
      setSummary(data.summary || null);
    } catch (err) {
      console.error("Failed to fetch agents:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
    // Also fetch settings for CLI fingerprint
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d))
      .catch(() => {});
  }, [fetchAgents]);

  const updateSetting = async (key: string, value: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) setSettings((prev) => ({ ...prev, [key]: value }));
    } catch (err) {
      console.error("Failed to update setting:", err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/acp/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "refresh" }),
      });
      const data = await res.json();
      setAgents(data.agents || []);
      await fetchAgents();
    } catch (err) {
      console.error("Failed to refresh:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const id = newAgent.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const res = await fetch("/api/acp/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: newAgent.name,
          binary: newAgent.binary,
          versionCommand: newAgent.versionCommand || `${newAgent.binary} --version`,
          spawnArgs: newAgent.spawnArgs ? newAgent.spawnArgs.split(",").map((s) => s.trim()) : [],
          protocol: "stdio",
        }),
      });
      if (res.ok) {
        setNewAgent({ name: "", binary: "", versionCommand: "", spawnArgs: "" });
        setShowAddForm(false);
        await fetchAgents();
      }
    } catch (err) {
      console.error("Failed to add agent:", err);
    } finally {
      setAddLoading(false);
    }
  };

  const handleRemoveAgent = async (agentId: string) => {
    try {
      const res = await fetch(`/api/acp/agents?id=${agentId}`, { method: "DELETE" });
      if (res.ok) {
        await fetchAgents();
      }
    } catch (err) {
      console.error("Failed to remove agent:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        <p className="text-sm text-text-muted">{t("scanning")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-text-muted mt-1">{t("description")}</p>
        </div>
        <Button variant="secondary" onClick={handleRefresh} loading={refreshing}>
          <span className="material-symbols-outlined text-[16px] mr-1">refresh</span>
          {t("refresh")}
        </Button>
      </div>

      <Card className="border-blue-500/20 bg-blue-500/5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-sm font-semibold text-text-main">{t("architectureTitle")}</h2>
              <p className="text-sm text-text-muted mt-1">{t("architectureDescription")}</p>
            </div>
            <Link
              href="/dashboard/cli-tools"
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/20 px-3 py-1.5 text-xs text-blue-500 hover:bg-blue-500/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              {t("cliToolsRedirectCta")}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-surface/60 px-3 py-1 font-medium text-text-main">
              {t("flowOmniRoute")}
            </span>
            <span className="rounded-full bg-surface/60 px-3 py-1 font-medium text-text-main">
              {t("flowSpawn")}
            </span>
            <span className="rounded-full bg-surface/60 px-3 py-1 font-medium text-text-main">
              {t("flowLocalBinary")}
            </span>
            <span className="rounded-full bg-surface/60 px-3 py-1 font-medium text-text-main">
              {t("flowExecute")}
            </span>
          </div>
          <div className="rounded-lg border border-blue-500/15 bg-surface/40 p-3 text-sm text-text-muted">
            <span className="font-medium text-text-main">{t("cliToolsRedirectTitle")}</span>{" "}
            {t("cliToolsRedirectDesc")}{" "}
            <Link href="/dashboard/cli-tools" className="text-blue-500 hover:underline">
              {t("openCliTools")}
            </Link>
            .
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <div className="text-2xl font-bold text-primary">{summary.installed}</div>
            <div className="text-xs text-text-muted mt-1">{t("installed")}</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <div className="text-2xl font-bold text-text-muted">{summary.notFound}</div>
            <div className="text-xs text-text-muted mt-1">{t("notFound")}</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <div className="text-2xl font-bold">{summary.builtIn}</div>
            <div className="text-xs text-text-muted mt-1">{t("builtIn")}</div>
          </div>
          <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
            <div className="text-2xl font-bold text-amber-500">{summary.custom}</div>
            <div className="text-xs text-text-muted mt-1">{t("custom")}</div>
          </div>
        </div>
      )}

      {/* Setup Guide */}
      <Card>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                support
              </span>
            </div>
            <h3 className="text-lg font-semibold">{t("setupGuideTitle")}</h3>
          </div>
          <Link
            href="/dashboard/cli-tools"
            className="text-xs px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-surface/40 transition-colors"
          >
            {t("openCliTools")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-border/50 bg-black/[0.02] dark:bg-white/[0.02] p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-500">radar</span>
              <p className="text-sm font-medium">{t("setupGuideDetectCliTitle")}</p>
            </div>
            <p className="text-xs text-text-muted">{t("setupGuideDetectCliDesc")}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-black/[0.02] dark:bg-white/[0.02] p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-[16px] text-amber-500">build</span>
              <p className="text-sm font-medium">{t("setupGuideCustomAgentTitle")}</p>
            </div>
            <p className="text-xs text-text-muted">{t("setupGuideCustomAgentDesc")}</p>
          </div>
          <div className="rounded-lg border border-border/50 bg-black/[0.02] dark:bg-white/[0.02] p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-500">
                terminal
              </span>
              <p className="text-sm font-medium">{t("setupGuideCommandMissingTitle")}</p>
            </div>
            <p className="text-xs text-text-muted">{t("setupGuideCommandMissingDesc")}</p>
          </div>
        </div>
      </Card>

      {/* CLI Fingerprint Matching */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              fingerprint
            </span>
          </div>
          <h3 className="text-lg font-semibold">{ts("cliFingerprint")}</h3>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted">{ts("cliFingerprintDesc")}</p>
          <div className="flex flex-wrap gap-2">
            {CLI_COMPAT_PROVIDER_IDS.map((providerId) => {
              const providerMeta = Object.values(AI_PROVIDERS).find(
                (p: any) => p.id === providerId
              ) as any;
              const isEnabled = (settings.cliCompatProviders || []).includes(providerId);
              const displayName = providerMeta?.name || providerId;
              const icon = providerMeta?.icon || "terminal";
              const color = providerMeta?.color || "#888";
              return (
                <button
                  key={providerId}
                  onClick={() => {
                    const current: string[] = settings.cliCompatProviders || [];
                    const updated = current.includes(providerId)
                      ? current.filter((p) => p !== providerId)
                      : [...current, providerId];
                    updateSetting("cliCompatProviders", updated);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    isEnabled
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-black/[0.02] dark:bg-white/[0.02] border-transparent text-text-muted hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ color: isEnabled ? undefined : color }}
                  >
                    {isEnabled ? "fingerprint" : icon}
                  </span>
                  {displayName}
                  {isEnabled && (
                    <span className="material-symbols-outlined text-[12px] text-emerald-500">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {(settings.cliCompatProviders || []).length > 0 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {ts("cliFingerprintEnabled", {
                count: (settings.cliCompatProviders || []).length,
              })}
            </p>
          )}
        </div>
      </Card>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    agent.installed
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-zinc-500/10 text-zinc-400"
                  }`}
                >
                  {getAgentIconId(agent.id) ? (
                    <ProviderIcon providerId={getAgentIconId(agent.id)!} size={20} type="color" />
                  ) : (
                    <span className="material-symbols-outlined text-[20px]">
                      {agent.installed ? "smart_toy" : "block"}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1.5">
                    {agent.name}
                    {agent.isCustom && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                        {t("custom")}
                      </span>
                    )}
                  </div>
                  <code className="text-xs text-text-muted">{agent.binary}</code>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {agent.installed ? (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span>
                    {agent.version || t("installed")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-500 font-medium">
                    <span className="material-symbols-outlined text-[12px]">cancel</span>
                    {t("notFound")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono">
                {agent.protocol}
              </span>
              {agent.isCustom && (
                <button
                  onClick={() => handleRemoveAgent(agent.id)}
                  className="text-xs text-red-500 hover:text-red-400 transition-colors flex items-center gap-0.5"
                  title={t("remove")}
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  {t("remove")}
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Custom Agent */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">{t("addCustomAgent")}</h3>
              <p className="text-sm text-text-muted">{t("addCustomAgentDesc")}</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => setShowAddForm(!showAddForm)}>
            <span className="material-symbols-outlined text-[16px]">
              {showAddForm ? "expand_less" : "expand_more"}
            </span>
          </Button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddAgent}
            className="flex flex-col gap-4 pt-4 border-t border-border/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t("agentName")}
                placeholder={t("agentNamePlaceholder")}
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                required
              />
              <Input
                label={t("binaryName")}
                placeholder={t("binaryNamePlaceholder")}
                value={newAgent.binary}
                onChange={(e) => setNewAgent({ ...newAgent, binary: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t("versionCommand")}
                placeholder={t("versionCommandPlaceholder")}
                value={newAgent.versionCommand}
                onChange={(e) => setNewAgent({ ...newAgent, versionCommand: e.target.value })}
              />
              <Input
                label={t("spawnArgs")}
                placeholder={t("spawnArgsPlaceholder")}
                value={newAgent.spawnArgs}
                onChange={(e) => setNewAgent({ ...newAgent, spawnArgs: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" loading={addLoading}>
                <span className="material-symbols-outlined text-[16px] mr-1">add</span>
                {t("addAgent")}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
