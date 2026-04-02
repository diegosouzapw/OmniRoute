"use client";

import { useState, useEffect } from "react";
import { Card } from "@/shared/components";
import { useTranslations } from "next-intl";

interface Skill {
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
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
  const [activeTab, setActiveTab] = useState<"skills" | "executions" | "sandbox">("skills");
  const t = useTranslations("skills");

  useEffect(() => {
    Promise.all([
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/skills/executions").then((r) => r.json()),
    ])
      .then(([skillsData, executionsData]) => {
        setSkills(skillsData.skills || []);
        setExecutions(executionsData.executions || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleSkill = async (skillId: string, enabled: boolean) => {
    await fetch(`/api/skills/${skillId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !enabled }),
    });
    setSkills(skills.map((s) => (s.id === skillId ? { ...s, enabled: !enabled } : s)));
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
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-text-muted mt-1">{t("description")}</p>
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
      </div>

      {activeTab === "skills" && (
        <div className="grid gap-4">
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
                    </div>
                    <p className="text-sm text-text-muted mt-1">{skill.description}</p>
                  </div>
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
              </Card>
            ))
          )}
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
    </div>
  );
}
