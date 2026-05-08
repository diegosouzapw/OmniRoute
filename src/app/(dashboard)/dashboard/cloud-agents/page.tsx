"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Button, Input, Badge } from "@/shared/components";
import { useTranslations } from "next-intl";

interface CloudAgentTask {
  id: string;
  provider: string;
  status: "pending" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled";
  description: string;
  createdAt: string;
  updatedAt: string;
  result?: string;
  error?: string;
  plan?: string;
  messages: Array<{ role: string; content: string; timestamp: string }>;
}

const CLOUD_AGENTS = [
  {
    id: "jules",
    name: "Jules",
    provider: "Google",
    description: "Google's autonomous coding agent",
    icon: "🟡",
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    id: "devin",
    name: "Devin",
    provider: "Cognition",
    description: "Cognition's AI software engineer",
    icon: "🔵",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "codex-cloud",
    name: "Codex Cloud",
    provider: "OpenAI",
    description: "OpenAI's cloud-based coding agent",
    icon: "⚡",
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export default function CloudAgentsPage() {
  const [tasks, setTasks] = useState<CloudAgentTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CloudAgentTask | null>(null);
  const [newTask, setNewTask] = useState({
    provider: "jules",
    description: "",
  });
  const [messageInput, setMessageInput] = useState("");
  const t = useTranslations("cloudAgents");

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/v1/agents/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || []);
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

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/v1/agents/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: newTask.provider,
          description: newTask.description,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTasks((prev) => [data.task, ...prev]);
        setNewTask({ provider: "jules", description: "" });
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
        body: JSON.stringify({
          action: "message",
          message: messageInput,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSelectedTask(data.task);
        setTasks((prev) => prev.map((task) => (task.id === selectedTask.id ? data.task : task)));
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
        setSelectedTask(data.task);
        setTasks((prev) => prev.map((t) => (t.id === selectedTask.id ? data.task : t)));
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
        setTasks((prev) => prev.map((t) => (t.id === taskId ? data.task : t)));
        if (selectedTask?.id === taskId) {
          setSelectedTask(data.task);
        }
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
        if (selectedTask?.id === taskId) {
          setSelectedTask(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: { color: "bg-zinc-500/10 text-zinc-500", label: t("statusPending") },
      running: { color: "bg-blue-500/10 text-blue-500", label: t("statusRunning") },
      waiting_approval: {
        color: "bg-amber-500/10 text-amber-600",
        label: t("statusWaitingApproval"),
      },
      completed: { color: "bg-emerald-500/10 text-emerald-600", label: t("statusCompleted") },
      failed: { color: "bg-red-500/10 text-red-500", label: t("statusFailed") },
      cancelled: { color: "bg-zinc-500/10 text-zinc-400", label: t("statusCancelled") },
    };
    const s = statusMap[status] || statusMap.pending;
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${s.color}`}
      >
        {status === "running" && <span className="animate-pulse">●</span>}
        {s.label}
      </span>
    );
  };

  const getAgentInfo = (providerId: string) => {
    return CLOUD_AGENTS.find((a) => a.id === providerId) || CLOUD_AGENTS[0];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        <p className="text-sm text-text-muted">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-text-muted mt-1">{t("description")}</p>
        </div>
      </div>

      <Card className="border-purple-500/20 bg-purple-500/5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-sm font-semibold text-text-main">{t("aboutTitle")}</h2>
              <p className="text-sm text-text-muted mt-1">{t("aboutDescription")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CLOUD_AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="rounded-lg border border-purple-500/15 bg-purple-500/5 p-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{agent.icon}</span>
                  <p className="text-sm font-medium text-text-main">{agent.name}</p>
                </div>
                <p className="text-xs text-text-muted">{agent.description}</p>
                <p className="text-[10px] text-purple-500 mt-1">{agent.provider}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-purple-500/15 bg-surface/40 p-3 text-sm text-text-muted">
            <span className="font-medium text-text-main">{t("howItWorksTitle")}</span>
            <span className="ml-1">{t("howItWorksDesc")}</span>
          </div>
        </div>
      </Card>

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
                value={newTask.provider}
                onChange={(e) => setNewTask({ ...newTask, provider: e.target.value })}
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
            <Input
              label={t("taskDescription")}
              placeholder={t("taskDescriptionPlaceholder")}
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" loading={creating}>
              <span className="material-symbols-outlined text-[16px] mr-1">rocket_launch</span>
              {t("startTask")}
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{t("tasks")}</h2>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              <span className="material-symbols-outlined text-[40px] mb-2">assignment</span>
              <p>{t("noTasks")}</p>
            </div>
          ) : (
            tasks.map((task) => {
              const agent = getAgentInfo(task.provider);
              return (
                <Card
                  key={task.id}
                  className={`cursor-pointer transition-all hover:border-primary/30 ${
                    selectedTask?.id === task.id ? "border-primary ring-1 ring-primary/20" : ""
                  }`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{agent.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-text-main line-clamp-1">
                          {task.description || t("untitledTask")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {agent.name} • {new Date(task.createdAt).toLocaleString()}
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

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{t("taskDetail")}</h2>
          {selectedTask ? (
            <Card className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getAgentInfo(selectedTask.provider).icon}</span>
                  <div>
                    <p className="font-medium">{getAgentInfo(selectedTask.provider).name}</p>
                    <p className="text-xs text-text-muted">
                      {t("created")}: {new Date(selectedTask.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {getStatusBadge(selectedTask.status)}
              </div>

              {selectedTask.status === "waiting_approval" && selectedTask.plan && (
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
                    {selectedTask.plan}
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

              {selectedTask.messages.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">{t("conversation")}</p>
                  <div className="flex flex-col gap-2 max-h-64 overflow-auto">
                    {selectedTask.messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-xs ${
                          msg.role === "assistant"
                            ? "bg-purple-500/10 text-text-main"
                            : "bg-surface/40 text-text-main"
                        }`}
                      >
                        <span className="font-medium capitalize">{msg.role}: </span>
                        {msg.content}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                    {selectedTask.result}
                  </pre>
                </div>
              )}

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
            <div className="text-center py-8 text-text-muted border border-dashed border-border/50 rounded-lg">
              <span className="material-symbols-outlined text-[40px] mb-2">touch_app</span>
              <p>{t("selectTaskPrompt")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
