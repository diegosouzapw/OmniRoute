"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/shared/components";
import { useDisplayBaseUrl } from "@/shared/hooks";

/* ─── Types ──────────────────────────────────────────── */
interface Endpoint {
  method: string;
  path: string;
  tags: string[];
  summary: string;
  description: string;
  security: boolean;
  parameters: any[];
  requestBody: boolean;
  responses: string[];
}

interface CatalogData {
  info: { title?: string; version?: string; description?: string };
  servers: { url: string; description?: string }[];
  tags: { name: string; description?: string }[];
  endpoints: Endpoint[];
  schemas: string[];
}

interface TryItResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: any;
  latencyMs: number;
  contentType: string;
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  PUT: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  PATCH: "bg-orange-500/15 text-orange-500 border-orange-500/30",
  DELETE: "bg-red-500/15 text-red-500 border-red-500/30",
};

/* ─── Main Component ─────────────────────────────────── */
export default function ApiEndpointsTab() {
  const baseUrl = useDisplayBaseUrl();
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Try It state
  const [tryingEndpoint, setTryingEndpoint] = useState<string | null>(null);
  const [tryBody, setTryBody] = useState("");
  const [tryResult, setTryResult] = useState<TryItResult | null>(null);
  const [trying, setTrying] = useState(false);

  const loadCatalog = async () => {
    try {
      const res = await fetch("/api/openapi/spec");
      if (res.ok) {
        const data = await res.json();
        return { data: data as CatalogData, error: null };
      }
      const body = await res.json().catch(() => null);
      const message =
        body && typeof body.error === "string"
          ? body.error
          : `API catalog request failed with HTTP ${res.status}`;
      return { data: null, error: message };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load API catalog";
      return { data: null, error: message };
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadCatalog().then((result) => {
      if (!cancelled) {
        setCatalog(result.data);
        setCatalogError(result.error);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter endpoints
  const filteredEndpoints = useMemo(() => {
    if (!catalog) return [];
    return catalog.endpoints.filter((ep) => {
      const matchesSearch =
        !search ||
        ep.path.toLowerCase().includes(search.toLowerCase()) ||
        ep.summary.toLowerCase().includes(search.toLowerCase()) ||
        ep.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesTag = !selectedTag || ep.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [catalog, search, selectedTag]);

  // Group by tag
  const groupedEndpoints = useMemo(() => {
    const groups: Record<string, Endpoint[]> = {};
    for (const ep of filteredEndpoints) {
      const tag = ep.tags[0] || "Other";
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(ep);
    }
    return groups;
  }, [filteredEndpoints]);

  const allTags = useMemo(() => {
    if (!catalog) return [];
    return catalog.tags.map((t) => t.name);
  }, [catalog]);

  // Try It handler
  const handleTryIt = async (ep: Endpoint) => {
    const key = `${ep.method}:${ep.path}`;
    if (tryingEndpoint === key) {
      setTryingEndpoint(null);
      setTryResult(null);
      return;
    }
    setTryingEndpoint(key);
    setTryResult(null);
    setTryBody(ep.method === "GET" ? "" : "{\n  \n}");
  };

  const executeTryIt = async (ep: Endpoint) => {
    setTrying(true);
    try {
      const res = await fetch("/api/openapi/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: ep.method,
          path: ep.path.replace("/api/", "/"),
          body: tryBody ? JSON.parse(tryBody) : undefined,
        }),
      });
      if (res.ok) setTryResult(await res.json());
    } catch (err: any) {
      setTryResult({
        status: 0,
        statusText: "Error",
        headers: {},
        body: { error: err.message },
        latencyMs: 0,
        contentType: "application/json",
      });
    }
    setTrying(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/5 rounded-lg w-1/3" />
        <div className="h-64 bg-white/5 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header with spec info */}
      {catalog && (
        <Card className="p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
                <span className="material-symbols-outlined text-primary text-[20px]">api</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">{catalog.info.title || "API"}</h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-mono font-semibold">
                    {catalog.info.version}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  {catalog.endpoints.length} endpoints across {allTags.length} categories
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/docs/openapi.yaml"
                download
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg
                           bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">download</span>
                YAML
              </a>
              <a
                href="/api/openapi/spec"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg
                           bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                JSON
              </a>
            </div>
          </div>
        </Card>
      )}

      {/* ═══ API CATALOG ═══ */}
      {!catalog && (
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
              <span className="material-symbols-outlined text-[20px] text-red-500">error</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-main">API catalog unavailable</h3>
              <p className="text-xs text-text-muted mt-1">
                {catalogError || "The OpenAPI specification could not be loaded."}
              </p>
              <a
                href="/api/openapi/spec"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 mt-3 px-2.5 py-1.5 text-xs font-medium rounded-lg
                           bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                Open JSON response
              </a>
            </div>
          </div>
        </Card>
      )}

      {catalog && (
        <>
          {/* Search & filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined text-[16px] text-text-muted absolute left-3 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search endpoints..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-black/10 dark:border-white/10
                           bg-white dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-2 py-1 text-[10px] font-medium rounded-md transition-colors
                  ${
                    !selectedTag
                      ? "bg-primary/10 text-primary"
                      : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main"
                  }`}
              >
                All
              </button>
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2 py-1 text-[10px] font-medium rounded-md transition-colors
                    ${
                      selectedTag === tag
                        ? "bg-primary/10 text-primary"
                        : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main"
                    }`}
                >
                  {tag}
                </button>
              ))}
              {allTags.length > 8 && (
                <span className="px-2 py-1 text-[10px] text-text-muted">
                  +{allTags.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* Endpoint groups */}
          {Object.entries(groupedEndpoints).map(([tag, endpoints]) => (
            <Card key={tag} className="overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 dark:border-white/5">
                <span className="material-symbols-outlined text-[14px] text-primary">folder</span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  {tag}
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-text-muted">
                  {endpoints.length}
                </span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div className="divide-y divide-black/[0.03] dark:divide-white/[0.03]">
                {endpoints.map((ep) => {
                  const key = `${ep.method}:${ep.path}`;
                  const isExpanded = expandedEndpoint === key;
                  const isTrying = tryingEndpoint === key;

                  return (
                    <div key={key}>
                      <div
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]
                                   cursor-pointer transition-colors"
                        onClick={() => setExpandedEndpoint(isExpanded ? null : key)}
                      >
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border min-w-[42px] text-center font-mono
                            ${METHOD_COLORS[ep.method] || "bg-gray-500/15 text-gray-500"}`}
                        >
                          {ep.method}
                        </span>
                        <code className="text-xs font-mono text-text-main flex-1 truncate">
                          {ep.path}
                        </code>
                        <span className="text-[11px] text-text-muted hidden sm:inline truncate max-w-[200px]">
                          {ep.summary}
                        </span>
                        {ep.security && (
                          <span
                            className="material-symbols-outlined text-[12px] text-amber-500"
                            title="Requires auth"
                          >
                            lock
                          </span>
                        )}
                        <span
                          className={`material-symbols-outlined text-[14px] text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        >
                          expand_more
                        </span>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="px-4 pb-3 space-y-3 bg-black/[0.01] dark:bg-white/[0.01]">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs text-text-main font-medium">{ep.summary}</p>
                              {ep.description && ep.description !== ep.summary && (
                                <p className="text-[11px] text-text-muted mt-1">{ep.description}</p>
                              )}
                              <div className="flex items-center gap-3 mt-2 text-[10px] text-text-muted">
                                {ep.security && (
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px] text-amber-500">
                                      lock
                                    </span>
                                    Bearer Auth
                                  </span>
                                )}
                                {ep.requestBody && (
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">
                                      description
                                    </span>
                                    Request Body
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  Responses: {ep.responses.join(", ")}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTryIt(ep);
                              }}
                              className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold rounded-lg
                                         transition-colors shrink-0
                                ${
                                  isTrying
                                    ? "bg-primary text-white"
                                    : "bg-primary/10 text-primary hover:bg-primary/20"
                                }`}
                            >
                              <span className="material-symbols-outlined text-[12px]">
                                {isTrying ? "close" : "play_arrow"}
                              </span>
                              {isTrying ? "Close" : "Try It"}
                            </button>
                          </div>

                          {/* curl example */}
                          <div className="rounded-lg bg-black/5 dark:bg-black/30 p-3">
                            <p className="text-[9px] font-semibold text-text-muted uppercase tracking-wider mb-1">
                              Example
                            </p>
                            <code className="text-[11px] font-mono text-text-main break-all">
                              curl -X {ep.method} {baseUrl}
                              {ep.path.replace("/api/", "/")}
                              {ep.security ? ' -H "Authorization: Bearer YOUR_KEY"' : ""}
                              {ep.requestBody
                                ? " -H \"Content-Type: application/json\" -d '{...}'"
                                : ""}
                            </code>
                          </div>

                          {/* Try It panel */}
                          {isTrying && (
                            <div className="rounded-lg border border-primary/20 bg-primary/[0.02] p-3 space-y-3">
                              {ep.method !== "GET" && (
                                <div>
                                  <label className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                                    Request Body (JSON)
                                  </label>
                                  <textarea
                                    value={tryBody}
                                    onChange={(e) => setTryBody(e.target.value)}
                                    rows={4}
                                    className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-black/10
                                             dark:border-white/10 bg-white dark:bg-black/30 focus:outline-none
                                             focus:ring-1 focus:ring-primary resize-none"
                                    placeholder='{ "model": "gpt-4o", "messages": [...] }'
                                  />
                                </div>
                              )}
                              <button
                                onClick={() => executeTryIt(ep)}
                                disabled={trying}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg
                                           bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[14px]">
                                  {trying ? "hourglass_empty" : "send"}
                                </span>
                                {trying ? "Sending..." : "Send Request"}
                              </button>

                              {tryResult && (
                                <div className="rounded-lg bg-black/5 dark:bg-black/30 p-3 space-y-2">
                                  <div className="flex items-center gap-3 text-xs">
                                    <span
                                      className={`px-2 py-0.5 rounded font-bold ${
                                        tryResult.status >= 200 && tryResult.status < 300
                                          ? "bg-emerald-500/15 text-emerald-500"
                                          : tryResult.status >= 400
                                            ? "bg-red-500/15 text-red-500"
                                            : "bg-amber-500/15 text-amber-500"
                                      }`}
                                    >
                                      {tryResult.status} {tryResult.statusText}
                                    </span>
                                    <span className="text-text-muted">{tryResult.latencyMs}ms</span>
                                  </div>
                                  <pre className="text-[11px] font-mono text-text-main overflow-auto max-h-[300px] whitespace-pre-wrap">
                                    {typeof tryResult.body === "string"
                                      ? tryResult.body
                                      : JSON.stringify(tryResult.body, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}

          {filteredEndpoints.length === 0 && (
            <Card className="p-8 text-center">
              <span className="material-symbols-outlined text-[32px] text-text-muted">
                search_off
              </span>
              <p className="text-sm text-text-muted mt-2">No endpoints match your filter</p>
            </Card>
          )}

          {/* Schemas section */}
          {catalog.schemas.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[14px] text-primary">
                  data_object
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Data Schemas
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-text-muted">
                  {catalog.schemas.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {catalog.schemas.map((schema) => (
                  <span
                    key={schema}
                    className="text-[10px] px-2 py-1 rounded-md bg-purple-500/10 text-purple-500 dark:text-purple-300 font-mono"
                  >
                    {schema}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
