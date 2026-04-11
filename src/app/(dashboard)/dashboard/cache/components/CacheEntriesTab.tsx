"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/shared/components";
import { useTranslations } from "next-intl";

interface CacheEntry {
  id: string;
  signature: string;
  model: string;
  hit_count: number;
  tokens_saved: number;
  created_at: string;
  expires_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function CacheEntriesTab() {
  const t = useTranslations("cache");
  const [entries, setEntries] = useState<CacheEntry[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(pagination.limit) });
        if (search) params.set("search", search);

        const res = await fetch(`/api/cache/entries?${params}`);
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries);
          setPagination(data.pagination);
        } else {
          setEntries([]);
          setError(t("entriesLoadError"));
        }
      } catch {
        setEntries([]);
        setError(t("entriesLoadError"));
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, search, t]
  );

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleDelete = async (signature: string) => {
    setDeleting(signature);
    try {
      await fetch(`/api/cache/entries?signature=${encodeURIComponent(signature)}`, {
        method: "DELETE",
      });
      await fetchEntries(pagination.page);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder={t("searchEntries")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchEntries()}
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-surface text-text-main placeholder:text-text-muted"
        />
        <Button variant="secondary" size="sm" onClick={() => fetchEntries()}>
          {t("search")}
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-text-muted">{t("loading")}</div>
      ) : error ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
          <div className="text-sm text-red-300">{error}</div>
          <Button variant="secondary" size="sm" onClick={() => fetchEntries(pagination.page)}>
            {t("refresh")}
          </Button>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-sm text-text-muted text-center py-8">{t("noEntries")}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-text-muted border-b border-border/30">
                  <th className="pb-2 pr-4">{t("signature")}</th>
                  <th className="pb-2 pr-4">{t("model")}</th>
                  <th className="pb-2 pr-4">{t("hits")}</th>
                  <th className="pb-2 pr-4">{t("tokensSaved")}</th>
                  <th className="pb-2 pr-4">{t("created")}</th>
                  <th className="pb-2 pr-4">{t("expires")}</th>
                  <th className="pb-2">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-border/20">
                    <td className="py-2 pr-4 font-mono text-xs">
                      {entry.signature.slice(0, 12)}...
                    </td>
                    <td className="py-2 pr-4">{entry.model}</td>
                    <td className="py-2 pr-4 tabular-nums">{entry.hit_count}</td>
                    <td className="py-2 pr-4 tabular-nums text-green-500">
                      {(entry.tokens_saved ?? 0).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4 text-xs text-text-muted">
                      {formatDate(entry.created_at)}
                    </td>
                    <td className="py-2 pr-4 text-xs text-text-muted">
                      {formatDate(entry.expires_at)}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleDelete(entry.signature)}
                        disabled={deleting === entry.signature}
                        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
                      >
                        {deleting === entry.signature ? "..." : "🗑️"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fetchEntries(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                ←
              </Button>
              <span className="text-sm text-text-muted">
                {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fetchEntries(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
              >
                →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
