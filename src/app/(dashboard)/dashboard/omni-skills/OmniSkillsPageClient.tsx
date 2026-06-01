"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { SkillsConceptCard } from "@/shared/components";
import type { SkillsProvider } from "@/lib/skills/providerSettings";
import { OmniSkillsList } from "./components/OmniSkillsList";
import { OmniExecutionsTab } from "./components/OmniExecutionsTab";
import { OmniSandboxTab } from "./components/OmniSandboxTab";
import { OmniMarketplaceTab } from "./components/OmniMarketplaceTab";
import type { OmniSkill } from "./components/OmniSkillCard";

interface Execution {
  id: string;
  skillId: string;
  skillName: string;
  status: string;
  duration: number;
  createdAt: string;
}

export function OmniSkillsPageClient(): JSX.Element {
  const [skills, setSkills] = useState<OmniSkill[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillsPage, setSkillsPage] = useState(1);
  const [skillsTotal, setSkillsTotal] = useState(0);
  const [skillsTotalPages, setSkillsTotalPages] = useState(1);
  const [popularDefaults, setPopularDefaults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modeFilter, setModeFilter] = useState<"all" | "on" | "off" | "auto">("all");
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

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
  const [skillsProvider, setSkillsProvider] = useState<SkillsProvider>("skillsmp");

  const t = useTranslations("skills");
  // NOTE: commonT is intentionally unused here but retained for potential future use
  useTranslations("common");

  const fetchSkills = async (page: number) => {
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (modeFilter !== "all") params.set("mode", modeFilter);

    const res = await fetch(`/api/skills?${params.toString()}`).then((r) => r.json());
    setSkills((res as { data?: OmniSkill[] }).data || []);
    setSkillsTotal((res as { total?: number }).total || 0);
    setSkillsTotalPages((res as { totalPages?: number }).totalPages || 1);
    setPopularDefaults(
      Array.isArray((res as { popularDefaults?: string[] }).popularDefaults)
        ? (res as { popularDefaults: string[] }).popularDefaults
        : []
    );
  };

  const fetchExecutions = async (page: number) => {
    const res = await fetch(`/api/skills/executions?page=${page}&limit=20`).then((r) => r.json());
    setExecutions((res as { data?: Execution[] }).data || []);
    setExecTotal((res as { total?: number }).total || 0);
    setExecTotalPages((res as { totalPages?: number }).totalPages || 1);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/skills?page=1&limit=20").then((r) => r.json()),
      fetch("/api/skills/executions?page=1&limit=20").then((r) => r.json()),
      fetch("/api/settings").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([skillsData, executionsData, settingsData]) => {
        setSkills((skillsData as { data?: OmniSkill[] }).data || []);
        setSkillsTotal((skillsData as { total?: number }).total || 0);
        setSkillsTotalPages((skillsData as { totalPages?: number }).totalPages || 1);
        setPopularDefaults(
          Array.isArray((skillsData as { popularDefaults?: string[] }).popularDefaults)
            ? (skillsData as { popularDefaults: string[] }).popularDefaults
            : []
        );

        setExecutions((executionsData as { data?: Execution[] }).data || []);
        setExecTotal((executionsData as { total?: number }).total || 0);
        setExecTotalPages((executionsData as { totalPages?: number }).totalPages || 1);

        const sd = settingsData as { skillsProvider?: SkillsProvider } | null;
        if (sd?.skillsProvider === "skillsmp" || sd?.skillsProvider === "skillssh") {
          setSkillsProvider(sd.skillsProvider);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const refreshSkills = async () => {
    setSkillsPage(1);
    await fetchSkills(1);
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
      if (selectedSkillId === skillId) setSelectedSkillId(null);
    }
  };

  const handleInstall = async () => {
    setInstalling(true);
    setInstallStatus(null);
    try {
      const manifest = JSON.parse(installJson) as Record<string, unknown>;
      const res = await fetch("/api/skills/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manifest),
      });
      const data = await res.json();
      if (res.ok && (data as { success?: boolean }).success) {
        setInstallStatus({
          type: "success",
          message: t("installSuccess", { id: (data as { id?: string }).id || "" }),
        });
        setInstallJson("");
        await refreshSkills();
      } else {
        setInstallStatus({
          type: "error",
          message:
            (data as { error?: string; message?: string }).error ||
            (data as { error?: string; message?: string }).message ||
            t("installError"),
        });
      }
    } catch (err) {
      setInstallStatus({
        type: "error",
        message: err instanceof Error ? err.message : t("invalidJson"),
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">{t("loading")}...</div>
      </div>
    );
  }

  const enabledCount = skills.filter((s) => s.enabled).length;
  const execSuccessCount = executions.filter((e) => e.status === "success").length;
  const successRate =
    executions.length > 0 ? Math.round((execSuccessCount / executions.length) * 100) : 0;

  const tabs: { id: "skills" | "executions" | "sandbox" | "marketplace"; labelKey: string }[] = [
    { id: "skills", labelKey: "skillsTab" },
    { id: "executions", labelKey: "executionsTab" },
    { id: "sandbox", labelKey: "sandboxTab" },
    { id: "marketplace", labelKey: "marketplaceTab" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Concept card */}
      <SkillsConceptCard variant="omni" />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("totalSkills")}</p>
          <p className="text-2xl font-bold text-text-main mt-1">{skillsTotal}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("enabledSkills")}</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{enabledCount}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wide">
            {t("totalExecutions")}
          </p>
          <p className="text-2xl font-bold text-violet-400 mt-1">{execTotal}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-muted uppercase tracking-wide">{t("successRate")}</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{successRate}%</p>
        </Card>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowInstallModal(true)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
        >
          {t("installSkillButton")}
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map(({ id, labelKey }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === id
                ? "border-violet-500 text-violet-400"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "skills" && (
        <OmniSkillsList
          skills={skills}
          skillsTotal={skillsTotal}
          skillsPage={skillsPage}
          skillsTotalPages={skillsTotalPages}
          popularDefaults={popularDefaults}
          searchTerm={searchTerm}
          modeFilter={modeFilter}
          selectedSkillId={selectedSkillId}
          onSearchTermChange={setSearchTerm}
          onModeFilterChange={setModeFilter}
          onApplyFilters={() => {
            setSkillsPage(1);
            void fetchSkills(1);
          }}
          onPagePrev={() => {
            const p = Math.max(1, skillsPage - 1);
            setSkillsPage(p);
            void fetchSkills(p);
          }}
          onPageNext={() => {
            const p = Math.min(skillsTotalPages, skillsPage + 1);
            setSkillsPage(p);
            void fetchSkills(p);
          }}
          onSelectSkill={setSelectedSkillId}
          onSetMode={setSkillMode}
          onUninstall={deleteSkill}
        />
      )}

      {activeTab === "executions" && (
        <OmniExecutionsTab
          executions={executions}
          execPage={execPage}
          execTotalPages={execTotalPages}
          execTotal={execTotal}
          onPagePrev={() => {
            const p = Math.max(1, execPage - 1);
            setExecPage(p);
            void fetchExecutions(p);
          }}
          onPageNext={() => {
            const p = Math.min(execTotalPages, execPage + 1);
            setExecPage(p);
            void fetchExecutions(p);
          }}
        />
      )}

      {activeTab === "sandbox" && <OmniSandboxTab />}

      {activeTab === "marketplace" && (
        <OmniMarketplaceTab skillsProvider={skillsProvider} onRefreshSkills={refreshSkills} />
      )}

      {/* Install modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{t("installSkillModalTitle")}</h2>
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
            <p className="text-sm text-text-muted mb-4">{t("installSkillModalDesc")}</p>
            <textarea
              value={installJson}
              onChange={(e) => setInstallJson(e.target.value)}
              placeholder={t("installJsonPlaceholder")}
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
                {t("uploadJson")}
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
                {t("cancel")}
              </button>
              <button
                onClick={handleInstall}
                disabled={installing || !installJson.trim()}
                className="px-4 py-1.5 text-sm font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 transition-colors"
              >
                {installing ? t("installing") : t("installSkillButton")}
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

export default OmniSkillsPageClient;
