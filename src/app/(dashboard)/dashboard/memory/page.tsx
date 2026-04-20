"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Badge, Button, Card, Input, Modal, Select } from "@/shared/components";
import Tooltip from "@/shared/components/Tooltip";
import { useTranslations } from "next-intl";
import { useNotificationStore } from "@/store/notificationStore";

interface Memory {
  id: string;
  apiKeyId: string;
  sessionId: string | null;
  type: "factual" | "episodic" | "procedural" | "semantic";
  key: string;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
}

interface MemoryStats {
  totalEntries: number;
  tokensUsed: number;
  hitRate: number;
}

export default function MemoryPage() {
  const t = useTranslations("memory");
  const tc = useTranslations("common");
  const notify = useNotificationStore();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [stats, setStats] = useState<MemoryStats>({
    totalEntries: 0,
    tokensUsed: 0,
    hitRate: 0,
  });
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [health, setHealth] = useState<{ working: boolean; latencyMs: number } | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newType, setNewType] = useState<Memory["type"]>("factual");
  const [newKey, setNewKey] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newSessionId, setNewSessionId] = useState("");
  const [newApiKeyId, setNewApiKeyId] = useState("");
  const [newExpiresAt, setNewExpiresAt] = useState("");
  const [newMetadataJson, setNewMetadataJson] = useState("{}");

  const resetCreateForm = useCallback(() => {
    setNewType("factual");
    setNewKey("");
    setNewContent("");
    setNewSessionId("");
    setNewApiKeyId("");
    setNewExpiresAt("");
    setNewMetadataJson("{}");
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "factual":
        return "info";
      case "episodic":
        return "success";
      case "procedural":
        return "warning";
      case "semantic":
        return "error";
      default:
        return "default";
    }
  };

  const memoryTypeLegend = useMemo(() => {
    const types: Array<Memory["type"]> = ["factual", "episodic", "procedural", "semantic"];
    return types.map((type) => ({
      type,
      label: t(type),
      help: t(`typeHelp.${type}` as any),
      variant: getTypeColor(type) as any,
    }));
  }, [t]);

  const fetchMemories = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (filterType !== "all") params.append("type", filterType);
      if (searchQuery) params.append("q", searchQuery);

      const response = await fetch(`/api/memory?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setMemories(data.data || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
        setStats({
          totalEntries: data.stats?.total ?? data.total ?? 0,
          tokensUsed: data.stats?.tokensUsed ?? 0,
          hitRate: data.stats?.hitRate ?? 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, filterType, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMemories();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchMemories]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/memory/${id}`, { method: "DELETE" });
      setMemories(memories.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Failed to delete memory:", error);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        items: memories,
      };

      const dataStr = JSON.stringify(payload, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `memory-export-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      notify.success(t("exportSuccess"));
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("exportFailed"));
    } finally {
      setExporting(false);
    }
  };

  const parseImportPayload = (raw: unknown): Array<Partial<Memory>> => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw as Array<Partial<Memory>>;
    if (typeof raw === "object" && raw !== null) {
      const obj = raw as any;
      if (Array.isArray(obj.items)) return obj.items as Array<Partial<Memory>>;
      if (Array.isArray(obj.data)) return obj.data as Array<Partial<Memory>>;
    }
    return [];
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (file: File) => {
    setImporting(true);
    try {
      const text = await file.text();
      const raw = JSON.parse(text);
      const items = parseImportPayload(raw);
      if (!items.length) {
        notify.error(t("importEmpty"));
        return;
      }

      let successCount = 0;
      let failCount = 0;

      for (const item of items) {
        const key = String((item as any).key || "").trim();
        const content = String((item as any).content || "").trim();
        if (!key || !content) {
          failCount += 1;
          continue;
        }

        const typeCandidate = String((item as any).type || "factual") as Memory["type"];
        const type: Memory["type"] = ["factual", "episodic", "procedural", "semantic"].includes(
          typeCandidate
        )
          ? typeCandidate
          : "factual";

        const metadataRaw = (item as any).metadata;
        const metadata =
          metadataRaw && typeof metadataRaw === "object" && !Array.isArray(metadataRaw)
            ? (metadataRaw as Record<string, unknown>)
            : {};

        const expiresAtRaw = (item as any).expiresAt;
        const expiresAt =
          typeof expiresAtRaw === "string" && expiresAtRaw.trim().length > 0
            ? new Date(expiresAtRaw)
            : null;

        const body = {
          key,
          content,
          type,
          sessionId: String((item as any).sessionId || "").trim(),
          apiKeyId: String((item as any).apiKeyId || "").trim(),
          metadata,
          expiresAt:
            expiresAt && !Number.isNaN(expiresAt.getTime()) ? expiresAt.toISOString() : null,
        };

        const res = await fetch("/api/memory", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });

        if (res.ok) successCount += 1;
        else failCount += 1;
      }

      if (successCount > 0) {
        notify.success(t("importSuccess", { count: successCount } as any));
        setPage(1);
        await fetchMemories();
      }
      if (failCount > 0) {
        notify.warning(t("importPartial", { count: failCount } as any));
      }
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("importFailed"));
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCreate = async () => {
    const trimmedKey = newKey.trim();
    const trimmedContent = newContent.trim();
    if (!trimmedKey || !trimmedContent) {
      notify.error(t("addMemoryValidation"));
      return;
    }

    let metadata: Record<string, unknown> = {};
    try {
      const raw = (newMetadataJson || "").trim();
      metadata = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      if (metadata === null || Array.isArray(metadata) || typeof metadata !== "object") {
        throw new Error("metadata must be an object");
      }
    } catch {
      notify.error(t("metadataInvalid"));
      return;
    }

    const expiresAt = newExpiresAt.trim().length > 0 ? new Date(newExpiresAt) : null;
    if (expiresAt && Number.isNaN(expiresAt.getTime())) {
      notify.error(t("expiresAtInvalid"));
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/memory", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          key: trimmedKey,
          content: trimmedContent,
          type: newType,
          sessionId: newSessionId.trim(),
          apiKeyId: newApiKeyId.trim(),
          metadata,
          expiresAt: expiresAt ? expiresAt.toISOString() : null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        const message = (err && (err.message || err.error || err.detail)) || t("addMemoryFailed");
        notify.error(String(message));
        return;
      }

      notify.success(t("addMemorySuccess"));
      setShowAddModal(false);
      resetCreateForm();
      setPage(1);
      await fetchMemories();
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("addMemoryFailed"));
    } finally {
      setCreating(false);
    }
  };

  const checkHealth = async () => {
    setCheckingHealth(true);
    try {
      const res = await fetch("/api/memory/health");
      if (res.ok) {
        setHealth(await res.json());
      }
    } catch {
      setHealth(null);
    } finally {
      setCheckingHealth(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <div className="flex items-center gap-2">
            {health !== null && (
              <span
                className={`inline-block w-3 h-3 rounded-full ${health.working ? "bg-green-500" : "bg-red-500"}`}
                title={health.working ? `Pipeline OK (${health.latencyMs}ms)` : "Pipeline error"}
              />
            )}
            {health === null && !checkingHealth && (
              <span
                className="inline-block w-3 h-3 rounded-full bg-gray-400"
                title="Health unknown"
              />
            )}
            <Button variant="outline" size="sm" onClick={checkHealth} disabled={checkingHealth}>
              {checkingHealth ? "Checking..." : "Check Health"}
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} loading={exporting}>
            {t("export")}
          </Button>
          <Button variant="outline" onClick={handleImportClick} loading={importing}>
            {t("import")}
          </Button>
          <Button onClick={() => setShowAddModal(true)}>{t("addMemory")}</Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImportFile(file);
            }}
          />
        </div>
      </div>

      <Card>
        <div className="p-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-muted">{t("typeLegend")}</span>
          {memoryTypeLegend.map((entry) => (
            <Tooltip key={entry.type} content={entry.help}>
              <span className="inline-flex">
                <Badge variant={entry.variant}>{entry.label}</Badge>
              </span>
            </Tooltip>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-500">{t("totalEntries")}</div>
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-500">{t("tokensUsed")}</div>
            <div className="text-2xl font-bold">{(stats.tokensUsed ?? 0).toLocaleString()}</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-500">{t("hitRate")}</div>
            <div className="text-2xl font-bold">{((stats.hitRate ?? 0) * 100).toFixed(1)}%</div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{t("memories")}</h2>
            <div className="flex gap-2">
              <Input
                placeholder={t("search")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-64"
              />
              <Select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">{t("allTypes")}</option>
                <option value="factual">{t("factual")}</option>
                <option value="episodic">{t("episodic")}</option>
                <option value="procedural">{t("procedural")}</option>
                <option value="semantic">{t("semantic")}</option>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">{t("type")}</th>
                  <th className="text-left py-2 px-4">{t("key")}</th>
                  <th className="text-left py-2 px-4">{t("content")}</th>
                  <th className="text-left py-2 px-4">{t("created")}</th>
                  <th className="text-left py-2 px-4">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {memories.map((memory) => (
                  <tr key={memory.id} className="border-b">
                    <td className="py-2 px-4">
                      <Tooltip content={t(`typeHelp.${memory.type}` as any)}>
                        <span className="inline-flex">
                          <Badge variant={getTypeColor(memory.type) as any}>{memory.type}</Badge>
                        </span>
                      </Tooltip>
                    </td>
                    <td className="py-2 px-4 font-medium">{memory.key}</td>
                    <td className="py-2 px-4 max-w-md truncate">{memory.content}</td>
                    <td className="py-2 px-4">{new Date(memory.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(memory.id)}>
                        {t("delete")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Page {page} of {totalPages} ({total} total)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setCreating(false);
        }}
        title={t("addMemoryTitle")}
        size="lg"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setShowAddModal(false);
                resetCreateForm();
              }}
              disabled={creating}
            >
              {tc("cancel")}
            </Button>
            <Button onClick={handleCreate} loading={creating}>
              {tc("save")}
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-muted mb-4">{t("addMemoryDesc")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            label={t("type")}
            value={newType}
            onChange={(e) => setNewType(e.target.value as Memory["type"])}
            options={[
              { value: "factual", label: t("factual") },
              { value: "episodic", label: t("episodic") },
              { value: "procedural", label: t("procedural") },
              { value: "semantic", label: t("semantic") },
            ]}
            placeholder={t("typePlaceholder")}
          />

          <Input
            label={t("key")}
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder={t("keyPlaceholder")}
          />
        </div>

        <div className="mt-3">
          <label className="text-sm font-medium text-text-main">{t("content")}</label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder={t("contentPlaceholder")}
            className="input-root mt-1 w-full min-h-[120px] resize-y py-2 px-3 text-sm text-text-main bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md placeholder-text-muted/60 focus:ring-1 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <Input
            label={t("sessionId")}
            value={newSessionId}
            onChange={(e) => setNewSessionId(e.target.value)}
            placeholder={t("sessionIdPlaceholder")}
          />
          <Input
            label={t("apiKeyId")}
            value={newApiKeyId}
            onChange={(e) => setNewApiKeyId(e.target.value)}
            placeholder={t("apiKeyIdPlaceholder")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <Input
            label={t("expiresAt")}
            value={newExpiresAt}
            onChange={(e) => setNewExpiresAt(e.target.value)}
            placeholder={t("expiresAtPlaceholder")}
          />
          <div>
            <label className="text-sm font-medium text-text-main">{t("metadata")}</label>
            <textarea
              value={newMetadataJson}
              onChange={(e) => setNewMetadataJson(e.target.value)}
              placeholder={t("metadataPlaceholder")}
              className="input-root mt-1 w-full min-h-[88px] resize-y py-2 px-3 text-sm font-mono text-text-main bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md placeholder-text-muted/60 focus:ring-1 focus:ring-primary/30 focus:border-primary/50 focus:outline-none transition-all shadow-inner"
            />
            <p className="text-xs text-text-muted mt-1">{t("metadataHint")}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
