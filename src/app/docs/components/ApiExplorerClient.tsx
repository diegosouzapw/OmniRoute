"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  tag: string;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: "POST",
    path: "/v1/chat/completions",
    description: "OpenAI-compatible chat completions with streaming support",
    tag: "Chat",
  },
  {
    method: "POST",
    path: "/v1/responses",
    description: "OpenAI Responses API format",
    tag: "Responses",
  },
  {
    method: "GET",
    path: "/v1/models",
    description: "List available models across all providers",
    tag: "Models",
  },
  {
    method: "POST",
    path: "/v1/embeddings",
    description: "Generate text embeddings",
    tag: "Embeddings",
  },
  {
    method: "POST",
    path: "/v1/images/generations",
    description: "Generate images from text prompts",
    tag: "Images",
  },
  {
    method: "POST",
    path: "/v1/audio/transcriptions",
    description: "Transcribe audio files",
    tag: "Audio",
  },
  {
    method: "POST",
    path: "/v1/audio/speech",
    description: "Text-to-speech generation",
    tag: "Audio",
  },
  {
    method: "POST",
    path: "/v1/moderations",
    description: "Content moderation check",
    tag: "Moderations",
  },
  {
    method: "POST",
    path: "/v1/rerank",
    description: "Re-rank documents by relevance",
    tag: "Rerank",
  },
  {
    method: "POST",
    path: "/v1/search",
    description: "Web search across 5 providers",
    tag: "Search",
  },
  {
    method: "POST",
    path: "/v1/videos/generations",
    description: "Generate videos from prompts",
    tag: "Video",
  },
  {
    method: "POST",
    path: "/v1/music/generations",
    description: "Generate music from prompts",
    tag: "Music",
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  POST: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PUT: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  DELETE: "bg-red-500/10 text-red-600 border-red-500/20",
  PATCH: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const EXAMPLE_BODIES: Record<string, string> = {
  "/v1/chat/completions": JSON.stringify(
    { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: "Hello!" }], stream: true },
    null,
    2
  ),
  "/v1/models": "",
  "/v1/embeddings": JSON.stringify(
    { model: "openai/text-embedding-3-small", input: "Hello world" },
    null,
    2
  ),
  "/v1/images/generations": JSON.stringify(
    { model: "openai/dall-e-3", prompt: "A sunset over mountains", n: 1 },
    null,
    2
  ),
  "/v1/responses": JSON.stringify(
    { model: "openai/gpt-4o-mini", input: "What is OmniRoute?" },
    null,
    2
  ),
};

export function ApiExplorerClient() {
  const [selected, setSelected] = useState<ApiEndpoint | null>(null);
  const [baseUrl, setBaseUrl] = useState("http://localhost:20128");
  const [apiKey, setApiKey] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const allTags = [...new Set(API_ENDPOINTS.map((e) => e.tag))];
  const filteredEndpoints = filterTag
    ? API_ENDPOINTS.filter((e) => e.tag === filterTag)
    : API_ENDPOINTS;

  const handleSelect = useCallback((endpoint: ApiEndpoint) => {
    setSelected(endpoint);
    setResponse(null);
    const example = EXAMPLE_BODIES[endpoint.path] || "";
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
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button
              onClick={() => setFilterTag(null)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors
                ${!filterTag ? "bg-primary/10 text-primary border-primary/20" : "border-border text-text-muted hover:text-text-main"}`}
            >
              All
            </button>
            {allTags.map((tag) => (
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
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-1 text-xs font-mono font-bold rounded border ${METHOD_COLORS[selected.method]}`}
              >
                {selected.method}
              </span>
              <span className="font-mono text-sm text-text-main">{selected.path}</span>
            </div>
            <p className="text-sm text-text-muted">{selected.description}</p>

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

            {selected.method !== "GET" && (
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
