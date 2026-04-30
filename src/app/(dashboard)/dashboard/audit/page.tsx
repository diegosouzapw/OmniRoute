"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, SegmentedControl } from "@/shared/components";
import ComplianceTab from "./ComplianceTab";

type McpAuditEntry = {
  id: number;
  toolName: string;
  inputHash: string;
  outputSummary: string;
  durationMs: number;
  apiKeyId: string | null;
  success: boolean;
  errorCode: string | null;
  createdAt: string;
};

type McpAuditResponse = {
  entries: McpAuditEntry[];
  total: number;
  limit: number;
  offset: number;
};

const MCP_PAGE_SIZE = 25;

function McpAuditTab() {
  const t = useTranslations("compliance");
  const [data, setData] = useState<McpAuditResponse>({
    entries: [],
    total: 0,
    limit: MCP_PAGE_SIZE,
    offset: 0,
  });
  const [loading, setLoading] = useState(true);
  const [toolFilter, setToolFilter] = useState("");
  const [successFilter, setSuccessFilter] = useState<"all" | "true" | "false">("all");
  const [offset, setOffset] = useState(0);

  const fetchAudit = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(MCP_PAGE_SIZE));
      params.set("offset", String(offset));
      if (toolFilter) params.set("tool", toolFilter);
      if (successFilter !== "all") params.set("success", successFilter);

      const response = await fetch(`/api/mcp/audit?${params.toString()}`);
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(json.error || t("failedFetchMcpAudit"));
      }

      setData({
        entries: Array.isArray(json.entries) ? json.entries : [],
        total: Number(json.total || 0),
        limit: Number(json.limit || MCP_PAGE_SIZE),
        offset: Number(json.offset || offset),
      });
    } finally {
      setLoading(false);
    }
  }, [offset, successFilter, t, toolFilter]);

  useEffect(() => {
    void fetchAudit();
  }, [fetchAudit]);

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text-main">{t("mcpAudit")}</h2>
            <p className="mt-1 text-sm text-text-muted">{t("mcpAuditDesc")}</p>
            <p className="mt-2 text-xs text-text-muted">
              {t("showing", { count: data.entries.length, total: data.total })}
            </p>
          </div>
          <button
            onClick={() => void fetchAudit()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}
            >
              refresh
            </span>
            {t("refresh")}
          </button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("tool")}
            </span>
            <input
              value={toolFilter}
              onChange={(event) => {
                setOffset(0);
                setToolFilter(event.target.value);
              }}
              placeholder={t("toolPlaceholder")}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
              {t("result")}
            </span>
            <select
              value={successFilter}
              onChange={(event) => {
                setOffset(0);
                setSuccessFilter(event.target.value as "all" | "true" | "false");
              }}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="all">{t("allResults")}</option>
              <option value="true">{t("success")}</option>
              <option value="false">{t("failure")}</option>
            </select>
          </label>
          <div className="flex items-end">
            <button
              onClick={() => {
                setToolFilter("");
                setSuccessFilter("all");
                setOffset(0);
              }}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar"
            >
              {t("clearFilters")}
            </button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-text-muted">{t("loading")}</div>
        ) : data.entries.length === 0 ? (
          <div className="p-10 text-center">
            <span className="material-symbols-outlined text-[40px] text-text-muted">terminal</span>
            <p className="mt-3 text-sm text-text-muted">{t("noMcpEvents")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-border bg-sidebar/40 text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">{t("timestamp")}</th>
                  <th className="px-4 py-3 font-medium">{t("tool")}</th>
                  <th className="px-4 py-3 font-medium">{t("duration")}</th>
                  <th className="px-4 py-3 font-medium">{t("result")}</th>
                  <th className="px-4 py-3 font-medium">{t("apiKey")}</th>
                  <th className="px-4 py-3 font-medium">{t("output")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.entries.map((entry) => (
                  <tr key={entry.id} className="transition-colors hover:bg-sidebar/30">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-text-muted">
                      {new Date(entry.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-main">{entry.toolName}</td>
                    <td className="px-4 py-3 text-text-muted">{entry.durationMs}ms</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full border px-2 py-1 text-xs font-medium ${
                          entry.success
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                            : "border-red-500/30 bg-red-500/10 text-red-600"
                        }`}
                      >
                        {entry.success ? t("success") : entry.errorCode || t("failure")}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {entry.apiKeyId || t("notAvailable")}
                    </td>
                    <td className="max-w-[280px] truncate px-4 py-3 text-xs text-text-muted">
                      {entry.outputSummary || t("notAvailable")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setOffset((current) => Math.max(0, current - MCP_PAGE_SIZE))}
          disabled={offset === 0 || loading}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
        >
          {t("previous")}
        </button>
        <button
          onClick={() => setOffset((current) => current + MCP_PAGE_SIZE)}
          disabled={offset + MCP_PAGE_SIZE >= data.total || loading}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-main transition-colors hover:bg-sidebar disabled:opacity-40"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}

export default function AuditPage() {
  const t = useTranslations("compliance");
  const [activeTab, setActiveTab] = useState("compliance");

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[24px] text-primary">policy</span>
          <h1 className="text-3xl font-bold tracking-tight text-text-main">{t("auditTitle")}</h1>
        </div>
        <p className="mt-1 text-sm text-text-muted">{t("auditDescription")}</p>
      </div>

      <SegmentedControl
        options={[
          { value: "compliance", label: t("complianceTab") },
          { value: "mcp", label: t("mcpTab") },
        ]}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "compliance" ? <ComplianceTab /> : <McpAuditTab />}
    </div>
  );
}
