"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Card, Badge, Button, Input, Select, Modal } from "@/shared/components";
import EditMemoryModal from "../EditMemoryModal";

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
  cacheStats?: { hits: number; misses: number };
}

const TYPE_TOOLTIPS: Record<string, string> = {
  factual: "memory.tooltip.factual",
  episodic: "memory.tooltip.episodic",
  procedural: "memory.tooltip.procedural",
  semantic: "memory.tooltip.semantic",
};

function getTypeColor(type: string): "info" | "success" | "warning" | "error" | "default" {
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
}

export default function MemoriesTab() {
  const t = useTranslations("memory");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [stats, setStats] = useState<MemoryStats>({
    totalEntries: 0,
    tokensUsed: 0,
    hitRate: 0,
    cacheStats: { hits: 0, misses: 0 },
  });
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [health, setHealth] = useState<{ working: boolean; latencyMs: number } | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newMemory, setNewMemory] = useState<Partial<Memory>>({
    type: "factual",
    key: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editTarget, setEditTarget] = useState<Memory | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [summarizeDialogOpen, setSummarizeDialogOpen] = useState(false);
  const [summarizeCandidates, setSummarizeCandidates] = useState<string[]>([]);
  const [summarizeDryRunLoading, setSummarizeDryRunLoading] = useState(false);
  const [summarizeRunLoading, setSummarizeRunLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string>("");

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
          cacheStats: data.stats?.cacheStats ?? { hits: 0, misses: 0 },
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
      setMemories((ms) => ms.filter((m) => m.id !== id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Failed to delete memory:", error);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(memories, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `memory-export-${new Date().toISOString()}.json`;
    try {
      document.body.appendChild(link);
      link.click();
    } finally {
      link.remove();
      URL.revokeObjectURL(url);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSubmitting(true);
    setImportStatus("");
    let skipped = 0;
    let imported = 0;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      const memoriesToImport = Array.isArray(data) ? data : [data];

      // Plan 21 fix: validate each entry against the canonical type enum
      // before POSTing. Previously only key/content presence was checked, so
      // entries with invalid `type` (e.g. legacy "user") reached the backend
      // and counted as skipped without a clear local reason.
      const VALID_TYPES = new Set(["factual", "episodic", "procedural", "semantic"]);
      for (const m of memoriesToImport) {
        if (!m || typeof m !== "object") {
          skipped++;
          continue;
        }
        const key = typeof m.key === "string" ? m.key.trim() : "";
        const content = typeof m.content === "string" ? m.content : "";
        if (!key || !content) {
          skipped++;
          continue;
        }
        const type = typeof m.type === "string" && VALID_TYPES.has(m.type) ? m.type : "factual";
        const metadata =
          m.metadata && typeof m.metadata === "object" && !Array.isArray(m.metadata)
            ? m.metadata
            : {};
        const res = await fetch("/api/memory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, key, content, metadata }),
        });
        if (res.ok) imported++;
        else skipped++;
      }
      fetchMemories();
      setImportStatus(
        t("importResult", { imported, skipped }),
      );
    } catch {
      setImportStatus(t("importError"));
    } finally {
      setIsSubmitting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddMemory = async () => {
    if (!newMemory.key || !newMemory.content) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/memory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMemory),
      });
      if (response.ok) {
        setAddDialogOpen(false);
        setNewMemory({ type: "factual", key: "", content: "" });
        fetchMemories();
      }
    } catch (error) {
      console.error("Failed to add memory:", error);
    } finally {
      setIsSubmitting(false);
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

  // Auto-run health check on mount + poll every 30s, so the indicator reflects
  // engine health without requiring a manual click.
  useEffect(() => {
    void checkHealth();
    const id = setInterval(() => {
      void checkHealth();
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const openEdit = (m: Memory) => {
    setEditTarget(m);
    setEditOpen(true);
  };

  const handleCompactDryRun = async () => {
    setSummarizeDryRunLoading(true);
    try {
      const res = await fetch("/api/memory/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dryRun: true, olderThanDays: 30 }),
      });
      const data = await res.json().catch(() => null);
      const candidates: string[] =
        Array.isArray(data?.candidates) ? data.candidates.map((c: { key?: string }) => c?.key ?? String(c)) : [];
      setSummarizeCandidates(candidates);
      setSummarizeDialogOpen(true);
    } catch {
      setSummarizeCandidates([]);
      setSummarizeDialogOpen(true);
    } finally {
      setSummarizeDryRunLoading(false);
    }
  };

  const handleCompactConfirm = async () => {
    setSummarizeRunLoading(true);
    try {
      await fetch("/api/memory/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dryRun: false, olderThanDays: 30 }),
      });
      setSummarizeDialogOpen(false);
      fetchMemories();
    } catch {
      setSummarizeDialogOpen(false);
    } finally {
      setSummarizeRunLoading(false);
    }
  };

  const showHitRate =
    (stats.cacheStats?.hits ?? 0) + (stats.cacheStats?.misses ?? 0) > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-end gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {health !== null && (
            <span
              className={`inline-block w-3 h-3 rounded-full ${health.working ? "bg-green-500" : "bg-red-500"}`}
              title={
                health.working
                  ? t("pipelineOk", { latencyMs: health.latencyMs })
                  : t("pipelineError")
              }
            />
          )}
          {health === null && !checkingHealth && (
            <span
              className="inline-block w-3 h-3 rounded-full bg-gray-400"
              title={t("healthUnknown")}
            />
          )}
          <Button variant="outline" size="sm" onClick={checkHealth} disabled={checkingHealth}>
            {checkingHealth ? t("checkingHealth") : t("checkHealth")}
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <Button variant="outline" size="sm" onClick={handleExport}>
            {t("export")}
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportClick} loading={isSubmitting}>
            {t("import")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCompactDryRun}
            loading={summarizeDryRunLoading}
          >
            {t("compactOld")}
          </Button>
          <Button size="sm" onClick={() => setAddDialogOpen(true)}>
            {t("addMemory")}
          </Button>
        </div>
      </div>

      {importStatus && (
        <div className="p-3 rounded-lg bg-surface/30 border border-border/60 text-xs text-text-muted">
          {importStatus}
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-text-muted">{t("totalEntries")}</span>
              <span
                className="material-symbols-outlined text-[14px] text-text-muted cursor-help"
                title={t("tooltip.totalEntries")}
              >
                info
              </span>
            </div>
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-text-muted">{t("tokensUsed")}</span>
              <span
                className="material-symbols-outlined text-[14px] text-text-muted cursor-help"
                title={t("tooltip.tokensUsed")}
              >
                info
              </span>
            </div>
            <div className="text-2xl font-bold">{(stats.tokensUsed ?? 0).toLocaleString()}</div>
          </div>
        </Card>
        {showHitRate && (
          <Card>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-text-muted">{t("hitRate")}</span>
                <span
                  className="material-symbols-outlined text-[14px] text-text-muted cursor-help"
                  title={t("tooltip.hitRate")}
                >
                  info
                </span>
              </div>
              <div className="text-2xl font-bold">
                {((stats.hitRate ?? 0) * 100).toFixed(1)}%
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Memories table */}
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

          {memories.length === 0 ? (
            <div
              data-testid="memories-empty-state"
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <span className="material-symbols-outlined text-[40px] text-text-muted mb-3">
                psychology
              </span>
              <p className="text-sm font-medium text-text-main mb-1">
                {t("emptyState.title")}
              </p>
              <p className="text-xs text-text-muted max-w-xs">
                {t("emptyState.description")}
              </p>
              <Button className="mt-4" size="sm" onClick={() => setAddDialogOpen(true)}>
                {t("addMemory")}
              </Button>
            </div>
          ) : (
            <>
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
                      <tr key={memory.id} className="border-b hover:bg-surface/30">
                        <td className="py-2 px-4">
                          <Badge
                            variant={getTypeColor(memory.type)}
                            title={t(TYPE_TOOLTIPS[memory.type]?.replace("memory.", "") ?? memory.type)}
                          >
                            {t(memory.type)}
                          </Badge>
                        </td>
                        <td className="py-2 px-4 font-medium">{memory.key}</td>
                        <td className="py-2 px-4 max-w-md truncate text-text-muted">
                          {memory.content}
                        </td>
                        <td className="py-2 px-4 text-xs text-text-muted">
                          {new Date(memory.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              data-testid={`edit-memory-${memory.id}`}
                              onClick={() => openEdit(memory)}
                              title={t("editMemory")}
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              data-testid={`delete-memory-${memory.id}`}
                              onClick={() => setDeleteConfirmId(memory.id)}
                            >
                              {t("delete")}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-text-muted">
                  {t("pageInfo", { page, totalPages, total })}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    {t("previous")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    {t("next")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Add Memory Modal */}
      <Modal
        isOpen={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        title={t("addMemory")}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              disabled={isSubmitting}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleAddMemory}
              loading={isSubmitting}
              disabled={!newMemory.key || !newMemory.content}
            >
              {t("save")}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t("type")}</label>
            <Select
              value={newMemory.type}
              onChange={(e) =>
                setNewMemory({ ...newMemory, type: e.target.value as Memory["type"] })
              }
              className="w-full"
            >
              <option value="factual">{t("factual")}</option>
              <option value="episodic">{t("episodic")}</option>
              <option value="procedural">{t("procedural")}</option>
              <option value="semantic">{t("semantic")}</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("key")}</label>
            <Input
              value={newMemory.key}
              onChange={(e) => setNewMemory({ ...newMemory, key: e.target.value })}
              placeholder={t("keyPlaceholder")}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("content")}</label>
            <Input
              value={newMemory.content}
              onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
              placeholder={t("contentPlaceholder")}
              className="w-full"
            />
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title={t("deleteConfirmTitle")}
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              {t("cancel")}
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            >
              {t("delete")}
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-muted">{t("deleteConfirmDesc")}</p>
      </Modal>

      {/* Edit memory modal */}
      <EditMemoryModal
        memory={editTarget}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={fetchMemories}
      />

      {/* Summarize confirm dialog */}
      <Modal
        isOpen={summarizeDialogOpen}
        onClose={() => setSummarizeDialogOpen(false)}
        title={t("summarize.title")}
        footer={
          <>
            <Button variant="outline" onClick={() => setSummarizeDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              onClick={handleCompactConfirm}
              loading={summarizeRunLoading}
              disabled={summarizeCandidates.length === 0}
            >
              {t("summarize.confirm")}
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          {summarizeCandidates.length === 0 ? (
            <p className="text-sm text-text-muted">{t("summarize.noCandidates")}</p>
          ) : (
            <>
              <p className="text-sm text-text-muted">
                {t("summarize.candidatesDesc", { count: summarizeCandidates.length })}
              </p>
              <ul className="space-y-1 max-h-48 overflow-y-auto">
                {summarizeCandidates.map((key, i) => (
                  <li key={i} className="text-xs font-mono text-text-main truncate px-2 py-1 bg-surface/30 rounded">
                    {key}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
