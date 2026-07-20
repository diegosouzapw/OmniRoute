"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { useDisplayBaseUrl } from "@/shared/hooks";
import VscodeTokenAliasCard from "./VscodeTokenAliasCard";
import { matchesSearch } from "@/shared/utils/turkishText";

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
  exampleBody?: any;
  responses: string[];
  loopbackOnly?: boolean;
  alwaysProtected?: boolean;
  internal?: boolean;
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
  const t = useTranslations("endpoint");
  const baseUrl = useDisplayBaseUrl();

  function EndpointBadges({ ep }: { ep: Endpoint }) {
    return (
      <div className="flex items-center gap-1 shrink-0">
        {ep.loopbackOnly && (
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-500 border border-blue-500/30"
            title={t("badgeLoopbackTooltip")}
          >
            {t("badgeLocal")}
          </span>
        )}
        {ep.alwaysProtected && (
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/15 text-red-500 border border-red-500/30"
            title={t("badgeAlwaysProtectedTooltip")}
          >
            {t("badgeProtected")}
          </span>
        )}
        {ep.internal && (
          <span
            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-500/15 text-gray-400 border border-gray-500/30"
            title={t("badgeInternalTooltip")}
          >
            {t("badgeInternal")}
          </span>
        )}
      </div>
    );
  }

  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showInternal, setShowInternal] = useState(false);
  const [securityTier, setSecurityTier] = useState<
    "all" | "public" | "auth" | "loopback" | "always-protected"
  >("all");

  // Try It state
  const [tryingEndpoint, setTryingEndpoint] = useState<string | null>(null);
  const [tryBody, setTryBody] = useState("");
  const [tryResult, setTryResult] = useState<TryItResult | null>(null);
  const [trying, setTrying] = useState(false);
  const [availableApiKeys, setAvailableApiKeys] = useState<Array<{ id: string; key: string }>>([]);
  const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>("");
  const [revealedApiKeys, setRevealedApiKeys] = useState<Record<string, string>>({});
  const [apiKeyLoadError, setApiKeyLoadError] = useState<string | null>(null);
  const [manualApiKey, setManualApiKey] = useState("");
  const [useManualKey, setUseManualKey] = useState(false);
  const selectedApiKey = availableApiKeys.find((apiKey) => apiKey.id === selectedApiKeyId) || null;

  const loadCatalog = useCallback(async () => {
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
          : t("catalogLoadFailed", { status: res.status });
      return { data: null, error: message };
    } catch (error) {
      const message = error instanceof Error ? error.message : t("catalogLoadFailedGeneric");
      return { data: null, error: message };
    }
  }, [t]);

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
  }, [loadCatalog]);

  // Load API keys for Try It functionality. The list endpoint returns masked
  // keys; the selected key is revealed only when sending a Try It request.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/keys?limit=100", { credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) throw new Error(t("apiKeysLoadFailed", { status: res.status }));
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const rows = Array.isArray(data?.keys) ? data.keys : Array.isArray(data) ? data : [];
        const keys = rows
          .filter((k) => k?.id && k.isActive !== false && k.isBanned !== true)
          .map((k) => ({ id: String(k.id), key: String(k.key || k.id) }));
        setAvailableApiKeys(keys);
        setApiKeyLoadError(null);
        if (keys.length > 0) {
          setSelectedApiKeyId((current) => current || keys[0].id);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setAvailableApiKeys([]);
          setApiKeyLoadError(
            error instanceof Error ? error.message : t("apiKeysLoadFailedGeneric")
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [t]);

  // Filter endpoints
  const filteredEndpoints = useMemo(() => {
    if (!catalog) return [];
    return catalog.endpoints.filter((ep) => {
      // Keep the internal-endpoint visibility toggle + security-tier filter
      // (from release) while using the locale-aware matchesSearch helper. The
      // local var is matchesEndpoint (not matchesSearch) to avoid shadowing the
      // imported helper used in its own initializer.
      if (!showInternal && ep.internal) return false;
      const matchesEndpoint =
        !search ||
        matchesSearch(ep.path, search) ||
        matchesSearch(ep.summary, search) ||
        ep.tags.some((t) => matchesSearch(t, search));
      const matchesTag = !selectedTag || ep.tags.includes(selectedTag);
      const matchesTier =
        securityTier === "all" ||
        (securityTier === "loopback" && ep.loopbackOnly) ||
        (securityTier === "always-protected" && ep.alwaysProtected) ||
        (securityTier === "auth" && ep.security && !ep.loopbackOnly && !ep.alwaysProtected) ||
        (securityTier === "public" && !ep.security && !ep.loopbackOnly && !ep.alwaysProtected);
      return matchesEndpoint && matchesTag && matchesTier;
    });
  }, [catalog, search, selectedTag, showInternal, securityTier]);

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
  // Generate example body from OpenAPI schema
  const generateExampleBody = (ep: Endpoint): string => {
    if (ep.method === "GET") return "";
    if (ep.exampleBody) return JSON.stringify(ep.exampleBody, null, 2);
    return "{\n  \n}";
  };

  const handleTryIt = async (ep: Endpoint) => {
    const key = `${ep.method}:${ep.path}`;
    if (tryingEndpoint === key) {
      setTryingEndpoint(null);
      setTryResult(null);
      return;
    }
    setTryingEndpoint(key);
    setTryResult(null);
    setTryBody(generateExampleBody(ep));
  };

  const revealSelectedApiKey = async () => {
    if (!selectedApiKey) return "";
    if (revealedApiKeys[selectedApiKey.id]) return revealedApiKeys[selectedApiKey.id];

    const res = await fetch(`/api/keys/${encodeURIComponent(selectedApiKey.id)}/reveal`, {
      credentials: "same-origin",
    });
    if (!res.ok) {
      throw new Error(
        res.status === 403
          ? t("apiKeyRevealDisabled")
          : t("apiKeyRevealFailed", { status: res.status })
      );
    }
    const data = await res.json();
    if (!data?.key || typeof data.key !== "string") {
      throw new Error(t("apiKeyRevealInvalid"));
    }
    setRevealedApiKeys((current) => ({ ...current, [selectedApiKey.id]: data.key }));
    return data.key;
  };

  const executeTryIt = async (ep: Endpoint) => {
    setTrying(true);
    try {
      const headers: Record<string, string> = {};

      // Add Authorization header if endpoint requires auth
      if (ep.security) {
        let apiKeyForRequest = "";
        if (useManualKey) {
          apiKeyForRequest = manualApiKey;
        } else if (selectedApiKey) {
          apiKeyForRequest = await revealSelectedApiKey();
        }

        if (apiKeyForRequest) {
          headers["Authorization"] = `Bearer ${apiKeyForRequest}`;
        } else {
          throw new Error(t("apiKeyRequired"));
        }
      }

      const res = await fetch("/api/openapi/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: ep.method,
          path: ep.path,
          headers,
          body: tryBody ? JSON.parse(tryBody) : undefined,
        }),
      });
      if (res.ok) setTryResult(await res.json());
      else {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || t("requestFailed", { status: res.status }));
      }
    } catch (err: any) {
      setTryResult({
        status: 0,
        statusText: t("errorStatus"),
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
                  {t("catalogStats", {
                    endpoints: catalog.endpoints.length,
                    categories: allTags.length,
                  })}
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
        <>
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
                <span className="material-symbols-outlined text-[20px] text-red-500">error</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-main">
                  {t("apiEndpointsCatalogUnavailable")}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {catalogError || t("catalogUnavailableDescription")}
                </p>
                <a
                  href="/api/openapi/spec"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 mt-3 px-2.5 py-1.5 text-xs font-medium rounded-lg
                           bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  {t("openJsonResponse")}
                </a>
              </div>
            </div>
          </Card>

          <VscodeTokenAliasCard variant="catalog" />
        </>
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
                placeholder={t("apiEndpointsSearchPlaceholder")}
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
                {t("all")}
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
                  {t("more", { count: allTags.length - 8 })}
                </span>
              )}
            </div>
            {/* Security tier filter */}
            <div className="flex items-center gap-1 ml-1 border-l border-black/10 dark:border-white/10 pl-2 flex-wrap">
              {(["all", "auth", "loopback", "always-protected", "public"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSecurityTier(tier)}
                  className={`px-2 py-1 text-[10px] font-medium rounded-md transition-colors
                    ${
                      securityTier === tier
                        ? "bg-primary/10 text-primary"
                        : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main"
                    }`}
                >
                  {tier === "all"
                    ? t("tierAll")
                    : tier === "auth"
                      ? t("tierAuth")
                      : tier === "loopback"
                        ? t("tierLoopback")
                        : tier === "always-protected"
                          ? t("tierAlwaysProtected")
                          : t("tierPublic")}
                </button>
              ))}
              <button
                onClick={() => setShowInternal(!showInternal)}
                className={`px-2 py-1 text-[10px] font-medium rounded-md transition-colors ml-1
                  ${
                    showInternal
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-black/5 dark:bg-white/5 text-text-muted hover:text-text-main"
                  }`}
                title={t("showInternalTooltip")}
              >
                {showInternal ? t("hideInternal") : t("showInternal")}
              </button>
            </div>
          </div>

          <VscodeTokenAliasCard variant="catalog" />

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
                        <EndpointBadges ep={ep} />
                        {ep.security && (
                          <span
                            className="material-symbols-outlined text-[12px] text-amber-500"
                            title={t("apiEndpointsRequiresAuth")}
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
                                    {t("bearerAuth")}
                                  </span>
                                )}
                                {ep.requestBody && (
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">
                                      description
                                    </span>
                                    {t("requestBody")}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  {t("responses")}: {ep.responses.join(", ")}
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
                              {isTrying ? t("close") : t("tryIt")}
                            </button>
                          </div>

                          {/* curl example */}
                          <div className="rounded-lg bg-black/5 dark:bg-black/30 p-3">
                            <p className="text-[9px] font-semibold text-text-muted uppercase tracking-wider mb-1">
                              {t("example")}
                            </p>
                            <code className="text-[11px] font-mono text-text-main break-all">
                              curl -X {ep.method} {baseUrl}
                              {ep.path}
                              {ep.security ? ' -H "Authorization: Bearer YOUR_KEY"' : ""}
                              {ep.requestBody
                                ? " -H \"Content-Type: application/json\" -d '{...}'"
                                : ""}
                            </code>
                          </div>

                          {/* Try It panel */}
                          {isTrying && (
                            <div className="rounded-lg border border-primary/20 bg-primary/[0.02] p-3 space-y-3">
                              {ep.security && (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                                      {t("apiKey")}
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => setUseManualKey(!useManualKey)}
                                      className="text-[9px] text-primary hover:underline"
                                    >
                                      {useManualKey ? t("switchToSelection") : t("enterManually")}
                                    </button>
                                  </div>

                                  {useManualKey ? (
                                    <input
                                      type="password"
                                      value={manualApiKey}
                                      onChange={(e) => setManualApiKey(e.target.value)}
                                      placeholder={t("pasteApiKey")}
                                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-black/10
                                               dark:border-white/10 bg-white dark:bg-black/30 focus:outline-none
                                               focus:ring-1 focus:ring-primary"
                                    />
                                  ) : availableApiKeys.length > 0 ? (
                                    <select
                                      value={selectedApiKeyId}
                                      onChange={(e) => setSelectedApiKeyId(e.target.value)}
                                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-black/10
                                               dark:border-white/10 bg-white dark:bg-black/30 focus:outline-none
                                               focus:ring-1 focus:ring-primary"
                                    >
                                      {availableApiKeys.map((apiKey) => (
                                        <option key={apiKey.id} value={apiKey.id}>
                                          {apiKey.key}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <p className="text-[11px] text-amber-500">
                                      {apiKeyLoadError || t("noActiveApiKeys")}
                                    </p>
                                  )}
                                </div>
                              )}
                              {ep.method !== "GET" && (
                                <div>
                                  <label className="text-[9px] font-semibold text-text-muted uppercase tracking-wider">
                                    {t("requestBodyJson")}
                                  </label>
                                  <textarea
                                    value={tryBody}
                                    onChange={(e) => setTryBody(e.target.value)}
                                    rows={8}
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
                                {trying ? t("sending") : t("sendRequest")}
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
              <p className="text-sm text-text-muted mt-2">{t("apiEndpointsNoMatch")}</p>
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
                  {t("dataSchemas")}
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
