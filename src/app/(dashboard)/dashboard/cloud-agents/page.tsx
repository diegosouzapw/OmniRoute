"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, Input, Badge } from "@/shared/components";
import { useTranslations } from "next-intl";

// ── Types ────────────────────────────────────────────────────────────────────

interface CloudAgentTask {
  id: string;
  providerId: string;
  status: "queued" | "running" | "awaiting_approval" | "completed" | "failed" | "cancelled";
  prompt: string;
  source: {
    repoName?: string;
    repoUrl?: string;
    branch?: string;
  };
  createdAt: string;
  updatedAt: string;
  result?: Record<string, unknown> | null;
  error?: string;
  activities: Array<{
    id: string;
    type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
    content: string;
    timestamp: string;
  }>;
}

type TabId = "tasks" | "agents" | "settings";
type TaskStatus = CloudAgentTask["status"];

// ── Constants ────────────────────────────────────────────────────────────────

const CLOUD_AGENTS = [
  {
    id: "jules",
    name: "Jules",
    provider: "Google",
    description: "Google's autonomous coding agent",
    icon: "smart_toy",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-600",
  },
  {
    id: "devin",
    name: "Devin",
    provider: "Cognition",
    description: "Cognition's AI software engineer",
    icon: "psychology",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    id: "codex-cloud",
    name: "Codex Cloud",
    provider: "OpenAI",
    description: "OpenAI's cloud-based coding agent",
    icon: "cloud",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    id: "cursor-cloud",
    name: "Cursor Cloud",
    provider: "Cursor",
    description: "Cursor's Background / Cloud Agents (official API key)",
    icon: "cloud",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-600",
  },
];

const STATUS_OPTIONS: { value: TaskStatus | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "filterAll" },
  { value: "queued", labelKey: "statusPending" },
  { value: "running", labelKey: "statusRunning" },
  { value: "awaiting_approval", labelKey: "statusWaitingApproval" },
  { value: "completed", labelKey: "statusCompleted" },
  { value: "failed", labelKey: "statusFailed" },
  { value: "cancelled", labelKey: "statusCancelled" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAgentInfo(providerId: string) {
  return CLOUD_AGENTS.find((a) => a.id === providerId) || CLOUD_AGENTS[0];
}

function formatDuration(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms < 1000) return `${ms}ms`;
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  return `${mins}m ${remainSecs}s`;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function CloudAgentsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("tasks");
  const t = useTranslations("cloudAgents");

  // ── Tasks state ──────────────────────────────────────────────────────────

  const [tasks, setTasks] = useState<CloudAgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CloudAgentTask | null>(null);
  const [newTask, setNewTask] = useState({
    providerId: "jules",
    prompt: "",
    repoName: "",
    repoUrl: "",
    branch: "main",
    autoCreatePr: true,
  });
  const [messageInput, setMessageInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  // ── Agents health state ──────────────────────────────────────────────────

  const [agentHealth, setAgentHealth] = useState<Record<string, boolean>>({});

  // ── Settings state (localStorage) ────────────────────────────────────────

  const [settings, setSettings] = useState({
    autoCreatePr: true,
    requireApproval: false,
    enabled: true,
  });

  // ── Load settings from localStorage ──────────────────────────────────────

  useEffect(() => {
    try {
      const stored = localStorage.getItem("omniroute-cloud-agents-settings");
      if (stored) setSettings(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    const next = { ...settings, [key]: value };
    setSettings(next);
    try {
      localStorage.setItem("omniroute-cloud-agents-settings", JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  // ── Task helpers ─────────────────────────────────────────────────────────

  const upsertTask = useCallback((task: CloudAgentTask) => {
    setTasks((prev) => {
      const exists = prev.some((c) => c.id === task.id);
      return exists ? prev.map((c) => (c.id === task.id ? task : c)) : [task, ...prev];
    });
    setSelectedTask((current) => (current?.id === task.id ? task : current));
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/agents/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(Array.isArray(data.data) ? data.data : []);
      }
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ── Auto-poll when tasks are running/queued ──────────────────────────────

  const hasActiveTasks = tasks.some((t) => t.status === "running" || t.status === "queued");

  useEffect(() => {
    if (!hasActiveTasks) return;
    const id = setInterval(() => {
      fetchTasks();
    }, 5000);
    return () => clearInterval(id);
  }, [hasActiveTasks, fetchTasks]);

  // ── Fetch agent health ───────────────────────────────────────────────────

  const fetchAgentHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/agents/health");
      if (res.ok) {
        const data = await res.json();
        if (data.data) setAgentHealth(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch agent health:", err);
    }
  }, []);

  // ── Tab mount effects ────────────────────────────────────────────────────

  useEffect(() => {
    if (activeTab === "agents") fetchAgentHealth();
  }, [activeTab, fetchAgentHealth]);

  // ── Filtered tasks ───────────────────────────────────────────────────────

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    if (providerFilter !== "all" && task.providerId !== providerFilter) return false;
    return true;
  });

  // ── Task actions (preserved from original) ───────────────────────────────

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const source = {
        repoName: newTask.repoName.trim(),
        repoUrl: newTask.repoUrl.trim(),
        ...(newTask.branch.trim() ? { branch: newTask.branch.trim() } : {}),
      };
      const res = await fetch("/api/v1/agents/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: newTask.providerId,
          prompt: newTask.prompt,
          source,
          options: { autoCreatePr: newTask.autoCreatePr },
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
        setNewTask({
          providerId: "jules",
          prompt: "",
          repoName: "",
          repoUrl: "",
          branch: "main",
          autoCreatePr: true,
        });
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedTask || !messageInput.trim()) return;
    try {
      const res = await fetch(`/api/v1/agents/tasks/${selectedTask.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "message", message: messageInput }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
        setMessageInput("");
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleApprovePlan = async () => {
    if (!selectedTask) return;
    try {
      const res = await fetch(`/api/v1/agents/tasks/${selectedTask.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
      }
    } catch (err) {
      console.error("Failed to approve plan:", err);
    }
  };

  const handleCancelTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) upsertTask(data.data);
      }
    } catch (err) {
      console.error("Failed to cancel task:", err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/v1/agents/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        if (selectedTask?.id === taskId) setSelectedTask(null);
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // ── Render helpers ───────────────────────────────────────────────────────

  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { variant: "default" | "primary" | "success" | "warning" | "error" | "info"; label: string }
    > = {
      queued: { variant: "default", label: t("statusPending") },
      running: { variant: "info", label: t("statusRunning") },
      awaiting_approval: { variant: "warning", label: t("statusWaitingApproval") },
      completed: { variant: "success", label: t("statusCompleted") },
      failed: { variant: "error", label: t("statusFailed") },
      cancelled: { variant: "default", label: t("statusCancelled") },
    };
    const s = statusMap[status] || statusMap.queued;
    return (
      <Badge variant={s.variant} dot={status === "running"}>
        {s.label}
      </Badge>
    );
  };

  const getPlanText = (task: CloudAgentTask) => {
    return task.activities.find((a) => a.type === "plan")?.content || "";
  };

  const formatResult = (result: CloudAgentTask["result"]) => {
    if (!result) return "";
    if (typeof result === "string") return result;
    return JSON.stringify(result, null, 2);
  };

  // ── Tab definitions ──────────────────────────────────────────────────────

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: "tasks", label: t("tasksTab") || "Tasks", icon: "task_alt" },
    { id: "agents", label: t("agentsTab") || "Agents", icon: "smart_toy" },
    { id: "settings", label: t("settingsTab") || "Settings", icon: "tune" },
  ];

  // ── Loading state ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold text-text-main">{t("aboutTitle")}</h2>
            <p className="text-sm text-text-muted mt-1">{t("aboutDescription")}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${settings.enabled ? "bg-emerald-500" : "bg-zinc-400"}`}
            />
            <span className="text-xs text-text-muted">
              {settings.enabled
                ? t("agentsEnabled") || "Enabled"
                : t("agentsDisabled") || "Disabled"}
            </span>
          </div>
        </div>
      </Card>

      {/* Tab bar */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === tab.id
                ? "border-purple-500 text-purple-500"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tasks Tab ──────────────────────────────────────────────────────── */}
      {activeTab === "tasks" && (
        <div className="flex flex-col gap-6">
          {/* Create task form */}
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <span className="material-symbols-outlined text-[20px]">add_task</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t("newTaskTitle")}</h3>
                <p className="text-sm text-text-muted">{t("newTaskDescription")}</p>
              </div>
            </div>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-text-muted mb-1.5 block">
                    {t("selectAgent")}
                  </label>
                  <select
                    value={newTask.providerId}
                    onChange={(e) => setNewTask({ ...newTask, providerId: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {CLOUD_AGENTS.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name} ({agent.provider})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-text-muted mb-1.5 block">
                  {t("taskDescription")}
                </label>
                <textarea
                  placeholder={t("taskDescriptionPlaceholder")}
                  value={newTask.prompt}
                  onChange={(e) => setNewTask({ ...newTask, prompt: e.target.value })}
                  className="min-h-24 w-full rounded-lg border border-border/50 bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("repositoryName")}
                  placeholder="omniroute"
                  value={newTask.repoName}
                  onChange={(e) => setNewTask({ ...newTask, repoName: e.target.value })}
                  required
                />
                <Input
                  label={t("repositoryUrl")}
                  placeholder="https://github.com/owner/repo"
                  value={newTask.repoUrl}
                  onChange={(e) => setNewTask({ ...newTask, repoUrl: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t("branch")}
                  placeholder="main"
                  value={newTask.branch}
                  onChange={(e) => setNewTask({ ...newTask, branch: e.target.value })}
                />
                <label className="flex items-center gap-2 text-sm text-text-muted pt-7">
                  <input
                    type="checkbox"
                    checked={newTask.autoCreatePr}
                    onChange={(e) => setNewTask({ ...newTask, autoCreatePr: e.target.checked })}
                    className="h-4 w-4 rounded border-border/60"
                  />
                  Auto-create PR
                </label>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="primary" loading={creating}>
                  <span className="material-symbols-outlined text-[16px] mr-1">rocket_launch</span>
                  {t("startTask")}
                </Button>
              </div>
            </form>
          </Card>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | "all")}
              className="rounded-lg border border-border/50 bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.labelKey) || opt.value}
                </option>
              ))}
            </select>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="rounded-lg border border-border/50 bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">{t("filterAllProviders") || "All Providers"}</option>
              {CLOUD_AGENTS.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
            {hasActiveTasks && (
              <span className="flex items-center gap-1.5 text-xs text-blue-500">
                <span className="animate-pulse">●</span>
                {t("autoRefreshing") || "Auto-refreshing"}
              </span>
            )}
          </div>

          {/* Tasks list + detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 text-text-muted border border-dashed border-border/50 rounded-lg">
                  <span className="material-symbols-outlined text-[48px] mb-2 block text-text-muted/50">
                    assignment
                  </span>
                  <p className="text-sm font-medium">{t("noTasksTitle") || "No tasks yet"}</p>
                  <p className="text-xs mt-1">
                    {t("noTasksDesc") || "Create your first task to get started."}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const agent = getAgentInfo(task.providerId);
                  return (
                    <Card
                      key={task.id}
                      padding="sm"
                      hover
                      className={`transition-all ${
                        selectedTask?.id === task.id
                          ? "!border-purple-500 ring-1 ring-purple-500/20"
                          : ""
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg ${agent.iconBg} ${agent.iconColor}`}>
                            <span className="material-symbols-outlined text-[16px]">
                              {agent.icon}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-main line-clamp-1">
                              {task.prompt || t("untitledTask")}
                            </p>
                            <p className="text-xs text-text-muted">
                              {agent.name} · {new Date(task.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(task.status)}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Task detail panel */}
            <div className="flex flex-col gap-3">
              {selectedTask ? (
                <Card className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg ${getAgentInfo(selectedTask.providerId).iconBg} ${getAgentInfo(selectedTask.providerId).iconColor}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {getAgentInfo(selectedTask.providerId).icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{getAgentInfo(selectedTask.providerId).name}</p>
                        <p className="text-xs text-text-muted">
                          {t("created")}: {new Date(selectedTask.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(selectedTask.status)}
                  </div>

                  {/* Duration for completed/failed tasks */}
                  {selectedTask.status === "completed" && (
                    <div className="flex items-center gap-1.5 text-xs text-text-muted">
                      <span className="material-symbols-outlined text-[14px]">timer</span>
                      {formatDuration(selectedTask.createdAt, selectedTask.updatedAt)}
                    </div>
                  )}

                  {/* Awaiting approval: show plan */}
                  {selectedTask.status === "awaiting_approval" && getPlanText(selectedTask) && (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[16px] text-amber-600">
                          description
                        </span>
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                          {t("planReady")}
                        </span>
                      </div>
                      <pre className="text-xs text-text-muted whitespace-pre-wrap bg-black/5 dark:bg-white/5 rounded p-2 max-h-32 overflow-auto">
                        {getPlanText(selectedTask)}
                      </pre>
                      <div className="flex gap-2 mt-2">
                        <Button variant="primary" size="sm" onClick={handleApprovePlan}>
                          <span className="material-symbols-outlined text-[14px] mr-1">check</span>
                          {t("approvePlan")}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleCancelTask(selectedTask.id)}
                        >
                          {t("rejectPlan")}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {selectedTask.activities.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{t("conversation")}</p>
                      <div className="flex flex-col gap-2 max-h-64 overflow-auto">
                        {selectedTask.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className={`p-2 rounded-lg text-xs ${
                              activity.type === "message" || activity.type === "completion"
                                ? "bg-purple-500/10 text-text-main"
                                : "bg-surface/40 text-text-main"
                            }`}
                          >
                            <span className="font-medium capitalize">{activity.type}: </span>
                            {activity.content}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Result with PR link */}
                  {selectedTask.result && (
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">
                          check_circle
                        </span>
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                          {t("result")}
                        </span>
                      </div>
                      <pre className="text-xs text-text-muted whitespace-pre-wrap">
                        {formatResult(selectedTask.result)}
                      </pre>
                      {(selectedTask.result as Record<string, unknown>)?.prUrl && (
                        <a
                          href={(selectedTask.result as Record<string, unknown>).prUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                          {t("viewPR") || "View Pull Request"}
                        </a>
                      )}
                    </div>
                  )}

                  {/* Error */}
                  {selectedTask.error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-[16px] text-red-500">
                          error
                        </span>
                        <span className="text-sm font-medium text-red-600">{t("error")}</span>
                      </div>
                      <p className="text-xs text-text-muted">{selectedTask.error}</p>
                    </div>
                  )}

                  {/* Message input for running tasks */}
                  {selectedTask.status === "running" && (
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("sendMessagePlaceholder")}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button variant="primary" onClick={handleSendMessage}>
                        <span className="material-symbols-outlined text-[16px]">send</span>
                      </Button>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex justify-between pt-3 border-t border-border/30">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelTask(selectedTask.id)}
                      disabled={["completed", "failed", "cancelled"].includes(selectedTask.status)}
                    >
                      <span className="material-symbols-outlined text-[14px] mr-1">cancel</span>
                      {t("cancel")}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(selectedTask.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <span className="material-symbols-outlined text-[14px] mr-1">delete</span>
                      {t("delete")}
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="text-center py-12 text-text-muted border border-dashed border-border/50 rounded-lg">
                  <span className="material-symbols-outlined text-[48px] mb-2 block text-text-muted/50">
                    touch_app
                  </span>
                  <p className="text-sm">{t("selectTaskPrompt")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Agents Tab ─────────────────────────────────────────────────────── */}
      {activeTab === "agents" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLOUD_AGENTS.map((agent) => {
            const connected = agentHealth[agent.id] === true;
            return (
              <Card key={agent.id} padding="md" className="relative">
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl ${agent.iconBg} ${agent.iconColor}`}>
                    <span className="material-symbols-outlined text-[32px]">{agent.icon}</span>
                  </div>

                  {/* Name + provider */}
                  <div>
                    <h3 className="text-base font-semibold text-text-main">{agent.name}</h3>
                    <p className="text-xs text-text-muted">{agent.provider}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-muted">{agent.description}</p>

                  {/* Connection status */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    <span className="text-xs text-text-muted">
                      {connected
                        ? t("connected") || "Connected"
                        : t("notConnected") || "Not connected"}
                    </span>
                  </div>

                  {/* Configure button */}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      window.location.href = "/dashboard/providers?section=cloudagent";
                    }}
                  >
                    <span className="material-symbols-outlined text-[14px] mr-1">settings</span>
                    {t("configure") || "Configure"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── Settings Tab ───────────────────────────────────────────────────── */}
      {activeTab === "settings" && (
        <Card>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-semibold text-text-main mb-1">
                {t("settingsTitle") || "Cloud Agent Settings"}
              </h3>
              <p className="text-sm text-text-muted">
                {t("settingsDesc") || "Configure local preferences for cloud agents."}
              </p>
            </div>

            {/* Toggle: Enable cloud agents */}
            <div className="flex items-center justify-between py-3 border-b border-border/30">
              <div>
                <p className="text-sm font-medium text-text-main">
                  {t("settingEnableAgents") || "Enable cloud agents"}
                </p>
                <p className="text-xs text-text-muted">
                  {t("settingEnableAgentsDesc") ||
                    "Master switch for all cloud agent functionality."}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.enabled}
                onClick={() => updateSetting("enabled", !settings.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enabled ? "bg-purple-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    settings.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle: Auto-create PR */}
            <div className="flex items-center justify-between py-3 border-b border-border/30">
              <div>
                <p className="text-sm font-medium text-text-main">
                  {t("settingAutoPR") || "Auto-create PR"}
                </p>
                <p className="text-xs text-text-muted">
                  {t("settingAutoPRDesc") ||
                    "Automatically create a pull request when a task completes."}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.autoCreatePr}
                onClick={() => updateSetting("autoCreatePr", !settings.autoCreatePr)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoCreatePr ? "bg-purple-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    settings.autoCreatePr ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle: Require approval */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-text-main">
                  {t("settingRequireApproval") || "Require plan approval"}
                </p>
                <p className="text-xs text-text-muted">
                  {t("settingRequireApprovalDesc") ||
                    "Pause execution until you approve the agent's plan."}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={settings.requireApproval}
                onClick={() => updateSetting("requireApproval", !settings.requireApproval)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.requireApproval ? "bg-purple-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    settings.requireApproval ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
