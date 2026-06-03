"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  OPENAPI_ENDPOINTS,
  OPENAPI_TAGS,
  OPENAPI_VERSION,
  type OpenApiEndpoint,
} from "../lib/openapi.generated";

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  POST: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PUT: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  DELETE: "bg-red-500/10 text-red-600 border-red-500/20",
  PATCH: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

/**
 * A small map of richer "Try It" example bodies keyed by full path. The
 * generated OpenAPI module exposes every endpoint with its description and
 * summary; only paths in this map get a non-empty default request body when
 * selected. Anything not listed here falls back to the empty placeholder
 * (the user can paste their own body).
 */
const EXAMPLE_BODIES: Record<string, string> = {
  "/api/v1/chat/completions": JSON.stringify(
    {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "Hello!" }],
      stream: true,
    },
    null,
    2
  ),
  "/api/v1/embeddings": JSON.stringify(
    { model: "openai/text-embedding-3-small", input: "Hello world" },
    null,
    2
  ),
  "/api/v1/images/generations": JSON.stringify(
    { model: "openai/gpt-image-2", prompt: "A sunset over mountains", n: 1 },
    null,
    2
  ),
  "/api/v1/responses": JSON.stringify(
    { model: "openai/gpt-4o-mini", input: "What is OmniRoute?" },
    null,
    2
  ),
  "/api/v1/messages": JSON.stringify(
    {
      model: "anthropic/claude-3-5-sonnet",
      max_tokens: 1024,
      messages: [{ role: "user", content: "Hi" }],
    },
    null,
    2
  ),
  "/api/v1/messages/count_tokens": JSON.stringify(
    {
      model: "anthropic/claude-3-5-sonnet",
      messages: [{ role: "user", content: "Hi" }],
    },
    null,
    2
  ),
  "/api/v1/moderations": JSON.stringify(
    { model: "openai/omni-moderation-latest", input: "Sample text" },
    null,
    2
  ),
  "/api/v1/rerank": JSON.stringify(
    {
      model: "cohere/rerank-v3.5",
      query: "best ai gateway",
      documents: ["Document 1", "Document 2"],
    },
    null,
    2
  ),
  "/api/v1/audio/transcriptions": "",
  "/api/v1/audio/speech": JSON.stringify(
    { model: "openai/tts-1", input: "Hello world", voice: "alloy" },
    null,
    2
  ),
};

export function ApiExplorerClient() {
  const [selected, setSelected] = useState<OpenApiEndpoint | null>(null);
  const [baseUrl, setBaseUrl] = useState("http://localhost:20128");
  const [apiKey, setApiKey] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const filteredEndpoints = useMemo(
    () => (filterTag ? OPENAPI_ENDPOINTS.filter((e) => e.tag === filterTag) : OPENAPI_ENDPOINTS),
    [filterTag]
  );

  const handleSelect = useCallback((endpoint: OpenApiEndpoint) => {
    setSelected(endpoint);
    setResponse(null);
    const example = EXAMPLE_BODIES[endpoint.path] ?? "";
    setRequestBody(example);
  }, []);

  const handleTryIt = async () => {
    if (!selected) return;
    setLoading(true);
    setResponse(null);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

      const opts: RequestInit = { method: selected.method, headers };
      if (selected.method !== "GET" && requestBody.trim()) {
        opts.body = requestBody;
      }

      // Strip the leading /api so callers can paste `http://localhost:20128`
      // as the base URL without doubling the prefix. The OpenAPI spec uses
      // `/api/v1/...` because that is the Next.js route; the runtime client
      // hits the same path.
      const res = await fetch(`${baseUrl}${selected.path}`, opts);
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream")) {
        setResponse("SSE stream started — check the terminal/devtools for real-time output.");
      } else {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : "Request failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-72 shrink-0">
        <div className="sticky top-4">
          <div className="mb-3 flex items-center gap-2 text-xs text-text-muted">
            <span>
              {OPENAPI_ENDPOINTS.length} endpoints · OpenAPI v{OPENAPI_VERSION}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button
              onClick={() => setFilterTag(null)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors
                ${!filterTag ? "bg-primary/10 text-primary border-primary/20" : "border-border text-text-muted hover:text-text-main"}`}
            >
              All
            </button>
            {OPENAPI_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors
                  ${filterTag === tag ? "bg-primary/10 text-primary border-primary/20" : "border-border text-text-muted hover:text-text-main"}`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-1 max-h-96 overflow-y-auto">
            {filteredEndpoints.map((endpoint) => (
              <button
                key={`${endpoint.method}-${endpoint.path}`}
                onClick={() => handleSelect(endpoint)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                  ${
                    selected?.path === endpoint.path && selected?.method === endpoint.method
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-bg-subtle border border-transparent"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded border ${METHOD_COLORS[endpoint.method] || "border-border"}`}
                  >
                    {endpoint.method}
                  </span>
                  <span className="truncate text-text-muted font-mono text-xs">
                    {endpoint.path}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {selected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`px-2 py-1 text-xs font-mono font-bold rounded border ${METHOD_COLORS[selected.method]}`}
              >
                {selected.method}
              </span>
              <span className="font-mono text-sm text-text-main">{selected.path}</span>
              {selected.requiresAuth && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-amber-500/30 bg-amber-500/10 text-amber-600">
                  auth
                </span>
              )}
            </div>
            <p className="text-sm text-text-muted">{selected.summary || selected.description}</p>
            {selected.description && selected.description !== selected.summary && (
              <p className="text-xs text-text-muted whitespace-pre-line">{selected.description}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-text-muted block mb-1">Base URL</label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-bg-subtle border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted block mb-1">API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-3 py-2 text-sm bg-bg-subtle border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {selected.method !== "GET" && selected.hasRequestBody && (
              <div>
                <label className="text-xs text-text-muted block mb-1">Request Body</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 text-sm font-mono bg-bg-subtle border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            )}

            <button
              onClick={handleTryIt}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>

            {response !== null && (
              <div>
                <label className="text-xs text-text-muted block mb-1">Response</label>
                <pre className="bg-bg-subtle p-4 rounded-lg overflow-x-auto text-xs font-mono text-text-main max-h-80">
                  {response}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-text-muted">
            <span className="material-symbols-outlined text-4xl mb-2 block">api</span>
            <p className="text-lg font-medium">Select an endpoint to explore</p>
            <p className="text-sm mt-1">
              Choose an API from the sidebar to see details and try it live
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
