"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, Badge, Button, Input, Select } from "@/shared/components";
import { useTranslations } from "next-intl";

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
        setStats(data.stats || { totalEntries: 0, tokensUsed: 0, hitRate: 0 });
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

  const handleExport = () => {
    const dataStr = JSON.stringify(memories, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `memory-export-${new Date().toISOString()}.json`;
    link.click();
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
          <Button variant="outline" onClick={handleExport}>
            {t("export")}
          </Button>
          <Button variant="outline">{t("import")}</Button>
          <Button>{t("addMemory")}</Button>
        </div>
      </div>

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
                      <Badge variant={getTypeColor(memory.type) as any}>{memory.type}</Badge>
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
    </div>
  );
}
