"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await fetch("/api/memory");
      if (response.ok) {
        const data = await response.json();
        setMemories(data.memories || []);
        setStats(data.stats || { totalEntries: 0, tokensUsed: 0, hitRate: 0 });
      }
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const filteredMemories = memories.filter((memory) => {
    const matchesType = filterType === "all" || memory.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.key.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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
        <h1 className="text-2xl font-bold">Memory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            Export
          </Button>
          <Button variant="outline">Import</Button>
          <Button>Add Memory</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-500">Total Entries</div>
            <div className="text-2xl font-bold">{stats.totalEntries}</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-500">Tokens Used</div>
            <div className="text-2xl font-bold">{stats.tokensUsed.toLocaleString()}</div>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-500">Hit Rate</div>
            <div className="text-2xl font-bold">{(stats.hitRate * 100).toFixed(1)}%</div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Memories</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="factual">Factual</option>
                <option value="episodic">Episodic</option>
                <option value="procedural">Procedural</option>
                <option value="semantic">Semantic</option>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Type</th>
                  <th className="text-left py-2 px-4">Key</th>
                  <th className="text-left py-2 px-4">Content</th>
                  <th className="text-left py-2 px-4">Created</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMemories.map((memory) => (
                  <tr key={memory.id} className="border-b">
                    <td className="py-2 px-4">
                      <Badge variant={getTypeColor(memory.type) as any}>{memory.type}</Badge>
                    </td>
                    <td className="py-2 px-4 font-medium">{memory.key}</td>
                    <td className="py-2 px-4 max-w-md truncate">{memory.content}</td>
                    <td className="py-2 px-4">{new Date(memory.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(memory.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
