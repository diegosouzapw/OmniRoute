"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";
import type { SkillsProvider } from "@/lib/skills/providerSettings";

interface Skill {
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
  mode?: "on" | "off" | "auto";
  sourceProvider?: "skillsmp" | "skillssh" | "local";
  tags?: string[];
  installCount?: number;
  createdAt: string;
}

interface Execution {
  id: string;
  skillId: string;
  skillName: string;
  status: string;
  duration: number;
  createdAt: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillsPage, setSkillsPage] = useState(1);
  const [skillsTotal, setSkillsTotal] = useState(0);
  const [skillsTotalPages, setSkillsTotalPages] = useState(1);
  const [popularDefaults, setPopularDefaults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState<"all" | "on" | "off" | "auto">("all");

  const [execPage, setExecPage] = useState(1);
  const [execTotal, setExecTotal] = useState(0);
  const [execTotalPages, setExecTotalPages] = useState(1);

  const [activeTab, setActiveTab] = useState<"skills" | "executions" | "sandbox" | "marketplace">(
    "skills"
  );
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installJson, setInstallJson] = useState("");
  const [installStatus, setInstallStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [installing, setInstalling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mpQuery, setMpQuery] = useState("");
  const [mpResults, setMpResults] = useState<
    {
      name: string;
      description: string;
      skillMdContent?: string;
      version?: string;
      sourceUrl?: string;
    }[]
  >([]);
  const [mpLoading, setMpLoading] = useState(false);
  const [mpError, setMpError] = useState("");
  const [mpInstallingId, setMpInstallingId] = useState<string | null>(null);
  const [shQuery, setShQuery] = useState("");
  const [shResults, setShResults] = useState<
    { id: string; skillId: string; name: string; installs: number; source: string }[]
  >([]);
  const [shLoading, setShLoading] = useState(false);
  const [shError, setShError] = useState("");
  const [shInstallingId, setShInstallingId] = useState<string | null>(null);
  const [skillsProvider, setSkillsProvider] = useState<SkillsProvider>("skillsmp");
  const t = useTranslations("skills");

  const fetchSkills = async (page: number) => {
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (modeFilter !== "all") params.set("mode", modeFilter);

    const res = await fetch(`/api/skills?${params.toString()}`).then((r) => r.json());
    setSkills(res.data || []);
    setSkillsTotal(res.total || 0);
    setSkillsTotalPages(res.totalPages || 1);
    setPopularDefaults(Array.isArray(res.popularDefaults) ? res.popularDefaults : []);
  };

  const fetchExecutions = async (page: number) => {
    const res = await fetch(`/api/skills/executions?page=${page}&limit=20`).then((r) => r.json());
    setExecutions(res.data || []);
    setExecTotal(res.total || 0);
    setExecTotalPages(res.totalPages || 1);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/skills?page=1&limit=20").then((r) => r.json()),
      fetch("/api/skills/executions?page=1&limit=20").then((r) => r.json()),
      fetch("/api/settings").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([skillsData, executionsData, settingsData]) => {
        setSkills(skillsData.data || []);
        setSkillsTotal(skillsData.total || 0);
        setSkillsTotalPages(skillsData.totalPages || 1);
        setPopularDefaults(
          Array.isArray(skillsData.popularDefaults) ? skillsData.popularDefaults : []
        );

        setExecutions(executionsData.data || []);
        setExecTotal(executionsData.total || 0);
        setExecTotalPages(executionsData.totalPages || 1);

        if (
          settingsData?.skillsProvider === "skillsmp" ||
          settingsData?.skillsProvider === "skillssh"
        ) {
          setSkillsProvider(settingsData.skillsProvider);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const refreshSkills = async () => {
    setSkillsPage(1);
    await fetchSkills(1);
  };

  const toggleSkill = async (skillId: string, enabled: boolean) => {
    await fetch(`/api/skills/${skillId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !enabled }),
    });
    setSkills(skills.map((s) => (s.id === skillId ? { ...s, enabled: !enabled } : s)));
  };

  const setSkillMode = async (skillId: string, mode: "on" | "off" | "auto") => {
    await fetch(`/api/skills/${skillId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode }),
    });

    setSkills(skills.map((s) => (s.id === skillId ? { ...s, mode, enabled: mode !== "off" } : s)));
  };

  const deleteSkill = async (skillId: string) => {
    const res = await fetch(`/api/skills/${skillId}`, { method: "DELETE" });
    if (res.ok) {
      setSkills(skills.filter((s) => s.id !== skillId));
    }
  };

  const handleInstall = async () => {
    setInstalling(true);
    setInstallStatus(null);
    try {
      const manifest = JSON.parse(installJson);
      const res = await fetch("/api/skills/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manifest),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInstallStatus({ type: "success", message: `Skill installed (${data.id})` });
        setInstallJson("");
        await refreshSkills();
      } else {
        setInstallStatus({
          type: "error",
          message: data.error || data.message || "Install failed",
        });
      }
    } catch (err) {
      setInstallStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Invalid JSON",
      });
    } finally {
      setInstalling(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInstallJson((ev.target?.result as string) || "");
    };
    reader.readAsText(file);
  };

  const searchMarketplace = async () => {
    setMpLoading(true);
    setMpError("");
    setMpResults([]);
    try {
      const res = await fetch(`/api/skills/marketplace?q=${encodeURIComponent(mpQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        setMpError(data.error || "Search failed");
      } else {
        setMpResults(Array.isArray(data) ? data : data.skills || []);
      }
    } catch (err) {
      setMpError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setMpLoading(false);
    }
  };

  const installFromMarketplace = async (skill: {
    name: string;
    description: string;
    skillMdContent?: string;
    version?: string;
    sourceUrl?: string;
  }) => {
    setMpInstallingId(skill.name);
    try {
      const res = await fetch("/api/skills/marketplace/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skill.name,
          description: skill.description,
          skillMdContent: skill.skillMdContent || skill.description,
          version: skill.version || "1.0.0",
          sourceUrl: skill.sourceUrl,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await refreshSkills();
        setMpInstallingId(null);
      } else {
        setMpError(data.error || "Install failed");
        setMpInstallingId(null);
      }
    } catch (err) {
      setMpError(err instanceof Error ? err.message : "Install failed");
      setMpInstallingId(null);
    }
  };

  const searchSkillsSh = async () => {
    setShLoading(true);
    setShError("");
    setShResults([]);
    try {
      const res = await fetch(`/api/skills/skillssh?q=${encodeURIComponent(shQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        setShError(data.error || "Search failed");
      } else {
        setShResults(data.skills || []);
      }
    } catch (err) {
      setShError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setShLoading(false);
    }
  };

  const installFromSkillsSh = async (skill: {
    id: string;
    skillId: string;
    name: string;
    installs: number;
    source: string;
  }) => {
    setShInstallingId(skill.id);
    try {
      const res = await fetch("/api/skills/skillssh/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skill.name,
          description: `Installed from skills.sh (${skill.source})`,
          source: skill.source,
          skillId: skill.skillId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await refreshSkills();
        setShInstallingId(null);
      } else {
        setShError(data.error || "Install failed");
        setShInstallingId(null);
      }
    } catch (err) {
      setShError(err instanceof Error ? err.message : "Install failed");
      setShInstallingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">{t("loading")}...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-text-muted mt-1">{t("description")}</p>
        </div>
        <button
          onClick={() => setShowInstallModal(true)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
        >
          Install Skill
        </button>
      </div>

      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "skills"
              ? "border-violet-500 text-violet-400"
              : "border-transparent text-text-muted hover:text-text-main"
          }`}
        >
          {t("skillsTab")}
        </button>
        <button
          onClick={() => setActiveTab("executions")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "executions"
              ? "border-violet-500 text-violet-400"
              : "border-transparent text-text-muted hover:text-text-main"
          }`}
        >
          {t("executionsTab")}
        </button>
        <button
          onClick={() => setActiveTab("sandbox")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "sandbox"
              ? "border-violet-500 text-violet-400"
              : "border-transparent text-text-muted hover:text-text-main"
          }`}
        >
          {t("sandboxTab")}
        </button>
        <button
          onClick={() => setActiveTab("marketplace")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "marketplace"
              ? "border-violet-500 text-violet-400"
              : "border-transparent text-text-muted hover:text-text-main"
          }`}
        >
          Marketplace
        </button>
      </div>

      {activeTab === "skills" && (
        <div className="grid gap-4">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter skills by name, description, or tag"
                className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value as "all" | "on" | "off" | "auto")}
                className="px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="all">All modes</option>
                <option value="on">On</option>
                <option value="auto">Auto</option>
                <option value="off">Off</option>
              </select>
              <button
                onClick={() => {
                  setSkillsPage(1);
                  void fetchSkills(1);
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
              >
                Apply filters
              </button>
            </div>

            {popularDefaults.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-text-muted mb-2">
                  Popular by default for selected provider:
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularDefaults.map((name) => (
                    <span
                      key={name}
                      className="text-xs px-2 py-1 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {skills.length === 0 ? (
            <Card>
              <div className="text-center py-8 text-text-muted">{t("noSkills")}</div>
            </Card>
          ) : (
            skills.map((skill) => (
              <Card key={skill.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-surface/50 text-text-muted">
                        v{skill.version}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-surface/50 text-text-muted">
                        {(skill.sourceProvider || "local").toUpperCase()}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">
                        mode: {skill.mode || (skill.enabled ? "on" : "off")}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted mt-1">{skill.description}</p>
                    {Array.isArray(skill.tags) && skill.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skill.tags.map((tag) => (
                          <span
                            key={`${skill.id}-${tag}`}
                            className="text-[11px] px-1.5 py-0.5 rounded bg-surface/60 text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSkillMode(skill.id, "on")}
                        className={`text-xs px-2 py-1 rounded border ${
                          (skill.mode || (skill.enabled ? "on" : "off")) === "on"
                            ? "border-emerald-500 text-emerald-400"
                            : "border-border text-text-muted"
                        }`}
                      >
                        ON
                      </button>
                      <button
                        onClick={() => setSkillMode(skill.id, "auto")}
                        className={`text-xs px-2 py-1 rounded border ${
                          (skill.mode || (skill.enabled ? "on" : "off")) === "auto"
                            ? "border-amber-500 text-amber-400"
                            : "border-border text-text-muted"
                        }`}
                      >
                        AUTO
                      </button>
                      <button
                        onClick={() => setSkillMode(skill.id, "off")}
                        className={`text-xs px-2 py-1 rounded border ${
                          (skill.mode || (skill.enabled ? "on" : "off")) === "off"
                            ? "border-red-500 text-red-400"
                            : "border-border text-text-muted"
                        }`}
                      >
                        OFF
                      </button>
                    </div>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="text-xs px-2 py-1 rounded text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Uninstall
                    </button>
                    <button
                      onClick={() => toggleSkill(skill.id, skill.enabled)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        skill.enabled ? "bg-violet-500" : "bg-border"
                      }`}
                      role="switch"
                      aria-checked={skill.enabled}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          skill.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-text-muted">
              Page {skillsPage} of {skillsTotalPages} ({skillsTotal} total)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const p = Math.max(1, skillsPage - 1);
                  setSkillsPage(p);
                  fetchSkills(p);
                }}
                disabled={skillsPage === 1}
                className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
              >
                Prev
              </button>
              <button
                onClick={() => {
                  const p = Math.min(skillsTotalPages, skillsPage + 1);
                  setSkillsPage(p);
                  fetchSkills(p);
                }}
                disabled={skillsPage === skillsTotalPages || skillsTotalPages === 0}
                className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "executions" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-text-muted border-b border-border">
                  <th className="pb-3 font-medium">{t("skill")}</th>
                  <th className="pb-3 font-medium">{t("status")}</th>
                  <th className="pb-3 font-medium">{t("duration")}</th>
                  <th className="pb-3 font-medium">{t("time")}</th>
                </tr>
              </thead>
              <tbody>
                {executions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-text-muted">
                      {t("noExecutions")}
                    </td>
                  </tr>
                ) : (
                  executions.map((exec) => (
                    <tr key={exec.id} className="border-b border-border/50">
                      <td className="py-3 font-medium">{exec.skillName}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            exec.status === "success"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : exec.status === "error"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {exec.status}
                        </span>
                      </td>
                      <td className="py-3 text-text-muted">{exec.duration}ms</td>
                      <td className="py-3 text-text-muted text-sm">
                        {new Date(exec.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-sm text-text-muted">
              Page {execPage} of {execTotalPages} ({execTotal} total)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const p = Math.max(1, execPage - 1);
                  setExecPage(p);
                  fetchExecutions(p);
                }}
                disabled={execPage === 1}
                className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
              >
                Prev
              </button>
              <button
                onClick={() => {
                  const p = Math.min(execTotalPages, execPage + 1);
                  setExecPage(p);
                  fetchExecutions(p);
                }}
                disabled={execPage === execTotalPages || execTotalPages === 0}
                className="px-3 py-1 text-sm rounded border border-border text-text-muted hover:text-text-main disabled:opacity-40 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "sandbox" && (
        <div className="grid gap-4">
          <Card>
            <h3 className="font-semibold mb-4">{t("sandboxConfig")}</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
                <div>
                  <p className="font-medium">{t("cpuLimit")}</p>
                  <p className="text-xs text-text-muted">{t("cpuLimitDesc")}</p>
                </div>
                <span className="font-mono">100ms</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
                <div>
                  <p className="font-medium">{t("memoryLimit")}</p>
                  <p className="text-xs text-text-muted">{t("memoryLimitDesc")}</p>
                </div>
                <span className="font-mono">256MB</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
                <div>
                  <p className="font-medium">{t("timeout")}</p>
                  <p className="text-xs text-text-muted">{t("timeoutDesc")}</p>
                </div>
                <span className="font-mono">30s</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30">
                <div>
                  <p className="font-medium">{t("networkAccess")}</p>
                  <p className="text-xs text-text-muted">{t("networkAccessDesc")}</p>
                </div>
                <span className="text-text-muted">{t("disabled")}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "marketplace" && (
        <div className="grid gap-4">
          <Card>
            <h3 className="font-semibold mb-2">Skills Marketplace</h3>
            <p className="text-sm text-text-muted mb-4">
              Active provider:{" "}
              <span className="font-medium">
                {skillsProvider === "skillsmp" ? "SkillsMP" : "skills.sh"}
              </span>
              . Change this in Settings → Memory & Skills.
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={skillsProvider === "skillsmp" ? mpQuery : shQuery}
                onChange={(e) =>
                  skillsProvider === "skillsmp"
                    ? setMpQuery(e.target.value)
                    : setShQuery(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (skillsProvider === "skillsmp" ? searchMarketplace() : searchSkillsSh())
                }
                placeholder={
                  skillsProvider === "skillsmp" ? "Search SkillsMP..." : "Search skills.sh..."
                }
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
              <button
                onClick={() =>
                  skillsProvider === "skillsmp" ? searchMarketplace() : searchSkillsSh()
                }
                disabled={skillsProvider === "skillsmp" ? mpLoading : shLoading}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
              >
                {skillsProvider === "skillsmp"
                  ? mpLoading
                    ? "Searching..."
                    : "Search SkillsMP"
                  : shLoading
                    ? "Searching..."
                    : "Search skills.sh"}
              </button>
            </div>
            {(skillsProvider === "skillsmp" ? mpError : shError) && (
              <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm mb-4">
                {skillsProvider === "skillsmp" ? mpError : shError}
              </div>
            )}
          </Card>

          {skillsProvider === "skillsmp" && mpResults.length > 0 && (
            <div className="grid gap-3">
              {mpResults.map((skill) => (
                <Card key={skill.name}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{skill.name}</h4>
                      <p className="text-sm text-text-muted mt-1">{skill.description}</p>
                    </div>
                    <button
                      onClick={() => installFromMarketplace(skill)}
                      disabled={mpInstallingId === skill.name}
                      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
                    >
                      {mpInstallingId === skill.name ? "Installing..." : "Install"}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {skillsProvider === "skillssh" && shResults.length > 0 && (
            <div className="grid gap-3">
              {shResults.map((skill) => (
                <Card key={skill.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{skill.name}</h4>
                      <p className="text-sm text-text-muted mt-1">
                        {skill.source} · {skill.installs.toLocaleString()} installs
                      </p>
                    </div>
                    <button
                      onClick={() => installFromSkillsSh(skill)}
                      disabled={shInstallingId === skill.id}
                      className="px-4 py-1.5 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
                    >
                      {shInstallingId === skill.id ? "Installing..." : "Install"}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {skillsProvider === "skillsmp" && !mpLoading && mpResults.length === 0 && !mpError && (
            <Card>
              <div className="text-center py-8 text-text-muted">
                Configure your SkillsMP API key in Settings to browse the marketplace.
              </div>
            </Card>
          )}
          {skillsProvider === "skillssh" && !shLoading && shResults.length === 0 && !shError && (
            <Card>
              <div className="text-center py-8 text-text-muted">
                Search the skills.sh open directory to discover and install agent skills.
              </div>
            </Card>
          )}
        </div>
      )}

      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Install Skill</h2>
              <button
                onClick={() => {
                  setShowInstallModal(false);
                  setInstallStatus(null);
                  setInstallJson("");
                }}
                className="text-text-muted hover:text-text-main"
              >
                X
              </button>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Paste a skill manifest JSON or upload a .json file.
            </p>
            <textarea
              value={installJson}
              onChange={(e) => setInstallJson(e.target.value)}
              placeholder='{"name": "my-skill", "version": "1.0.0", "description": "...", "schema": {"input": {}, "output": {}}, "handlerCode": "..."}'
              className="w-full h-48 p-3 rounded-lg bg-background border border-border text-sm font-mono resize-none focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            <div className="flex items-center gap-3 mt-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-sm rounded-lg border border-border text-text-muted hover:text-text-main transition-colors"
              >
                Upload JSON
              </button>
              <div className="flex-1" />
              <button
                onClick={() => {
                  setShowInstallModal(false);
                  setInstallStatus(null);
                  setInstallJson("");
                }}
                className="px-3 py-1.5 text-sm rounded-lg border border-border text-text-muted hover:text-text-main transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInstall}
                disabled={installing || !installJson.trim()}
                className="px-4 py-1.5 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
              >
                {installing ? "Installing..." : "Install"}
              </button>
            </div>
            {installStatus && (
              <div
                className={`mt-3 p-3 rounded-lg text-sm ${
                  installStatus.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {installStatus.message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
