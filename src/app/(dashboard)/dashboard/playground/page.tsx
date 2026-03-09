"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, Button, Select, Badge } from "@/shared/components";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface ModelInfo {
  id: string;
  object: string;
  owned_by: string;
}

interface ProviderOption {
  value: string;
  label: string;
}

const ENDPOINT_OPTIONS = [
  { value: "chat", label: "Chat Completions" },
  { value: "responses", label: "Responses" },
  { value: "images", label: "Image Generation" },
  { value: "embeddings", label: "Embeddings" },
  { value: "speech", label: "Text to Speech" },
];

const DEFAULT_BODIES: Record<string, object> = {
  chat: {
    model: "",
    messages: [{ role: "user", content: "Hello! Say hi in one sentence." }],
    max_tokens: 100,
    stream: false,
  },
  responses: {
    model: "",
    input: "Hello! Say hi in one sentence.",
    stream: false,
  },
  images: {
    model: "",
    prompt: "A beautiful sunset over mountains",
    n: 1,
    size: "1024x1024",
  },
  embeddings: {
    model: "",
    input: "Hello world",
    encoding_format: "float",
  },
  speech: {
    model: "openai/tts-1",
    input: "Hello, this is a test of the text-to-speech endpoint.",
    voice: "alloy",
    response_format: "mp3",
  },
};

const ENDPOINT_PATHS: Record<string, string> = {
  chat: "/v1/chat/completions",
  responses: "/v1/responses",
  images: "/v1/images/generations",
  embeddings: "/v1/embeddings",
  speech: "/v1/audio/speech",
};

export default function PlaygroundPage() {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [providers, setProviders] = useState<ProviderOption[]>([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("chat");
  const [requestBody, setRequestBody] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseDuration, setResponseDuration] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Fetch models
  useEffect(() => {
    fetch("/v1/models")
      .then((res) => res.json())
      .then((data) => {
        const modelList = (data?.data || []) as ModelInfo[];
        setModels(modelList);

        // Extract unique providers from model ids (provider/model format)
        const providerSet = new Set<string>();
        modelList.forEach((m) => {
          const parts = m.id.split("/");
          if (parts.length >= 2) providerSet.add(parts[0]);
        });
        const providerOpts = Array.from(providerSet)
          .sort()
          .map((p) => ({ value: p, label: p }));
        setProviders(providerOpts);
        if (providerOpts.length > 0) setSelectedProvider(providerOpts[0].value);
      })
      .catch(() => {});
  }, []);

  // Filter models by selected provider
  const filteredModels = models
    .filter((m) => !selectedProvider || m.id.startsWith(selectedProvider + "/"))
    .map((m) => ({ value: m.id, label: m.id }));

  // Helper to generate default body for a given endpoint and model
  const generateDefaultBody = (endpoint: string, model: string) => {
    const template = { ...DEFAULT_BODIES[endpoint] };
    if ("model" in template) {
      (template as any).model = model;
    }
    return JSON.stringify(template, null, 2);
  };

  // When provider changes, auto-select first model and reset body
  const handleProviderChange = (newProvider: string) => {
    setSelectedProvider(newProvider);
    const providerModels = models
      .filter((m) => !newProvider || m.id.startsWith(newProvider + "/"))
      .map((m) => m.id);
    const firstModel = providerModels[0] || "";
    setSelectedModel(firstModel);
    setRequestBody(generateDefaultBody(selectedEndpoint, firstModel));
    setResponseBody("");
    setResponseStatus(null);
    setResponseDuration(null);
  };

  // When model changes, update body
  const handleModelChange = (newModel: string) => {
    setSelectedModel(newModel);
    setRequestBody(generateDefaultBody(selectedEndpoint, newModel));
    setResponseBody("");
    setResponseStatus(null);
    setResponseDuration(null);
  };

  // When endpoint changes, update body
  const handleEndpointChange = (newEndpoint: string) => {
    setSelectedEndpoint(newEndpoint);
    setRequestBody(generateDefaultBody(newEndpoint, selectedModel));
    setResponseBody("");
    setResponseStatus(null);
    setResponseDuration(null);
  };

  const handleSend = useCallback(async () => {
    if (!requestBody.trim()) return;
    setLoading(true);
    setResponseBody("");
    setAudioUrl(null);
    setResponseStatus(null);
    setResponseDuration(null);

    const controller = new AbortController();
    abortRef.current = controller;
    const startTime = Date.now();

    try {
      const parsed = JSON.parse(requestBody);
      const path = ENDPOINT_PATHS[selectedEndpoint];
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
        signal: controller.signal,
      });

      setResponseStatus(res.status);
      setResponseDuration(Date.now() - startTime);

      const contentType = res.headers.get("content-type") || "";
      if (contentType.startsWith("audio/")) {
        // TTS binary response — create a Blob URL and show inline audio player
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setResponseBody(`// Audio response (${contentType})\n// Click play below to listen.`);
      } else if (contentType.includes("text/event-stream")) {
        // Handle streaming
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulated += decoder.decode(value, { stream: true });
            setResponseBody(accumulated);
          }
        }
      } else {
        const data = await res.json();
        setResponseBody(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        setResponseBody(JSON.stringify({ cancelled: true }, null, 2));
      } else {
        setResponseBody(JSON.stringify({ error: err.message }, null, 2));
      }
      setResponseDuration(Date.now() - startTime);
    }
    setLoading(false);
  }, [requestBody, selectedEndpoint]);

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* silent */
    }
  };

  return (
    <div className="space-y-5">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
          science
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">Model Playground</p>
          <p>
            Test any model directly from the dashboard. Pick a provider, model, and endpoint type,
            then send a request to see the raw response.
          </p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row items-end gap-4">
          {/* Provider */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              Provider
            </label>
            <Select
              value={selectedProvider}
              onChange={(e: any) => handleProviderChange(e.target.value)}
              options={providers}
              className="w-full"
            />
          </div>

          {/* Model */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              Model
            </label>
            <Select
              value={selectedModel}
              onChange={(e: any) => handleModelChange(e.target.value)}
              options={filteredModels}
              className="w-full"
            />
          </div>

          {/* Endpoint */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              Endpoint
            </label>
            <Select
              value={selectedEndpoint}
              onChange={(e: any) => handleEndpointChange(e.target.value)}
              options={ENDPOINT_OPTIONS}
              className="w-full"
            />
          </div>

          {/* Send Button */}
          <div className="shrink-0">
            {loading ? (
              <Button icon="stop" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            ) : (
              <Button
                icon="send"
                onClick={handleSend}
                disabled={!requestBody.trim() || !selectedModel}
              >
                Send
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Split Editor View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Request Panel */}
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-muted">
                  upload
                </span>
                <h3 className="text-sm font-semibold text-text-main">Request</h3>
                <Badge variant="info" size="sm">
                  POST {ENDPOINT_PATHS[selectedEndpoint]}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(requestBody)}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                  title="Copy"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
                <button
                  onClick={() => {
                    const template = { ...DEFAULT_BODIES[selectedEndpoint] };
                    if ("model" in template) (template as any).model = selectedModel;
                    setRequestBody(JSON.stringify(template, null, 2));
                  }}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                  title="Reset to default"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                </button>
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <Editor
                height="400px"
                defaultLanguage="json"
                value={requestBody}
                onChange={(value: string | undefined) => setRequestBody(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  automaticLayout: true,
                  formatOnPaste: true,
                }}
              />
            </div>
          </div>
        </Card>

        {/* Response Panel */}
        <Card>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-muted">
                  download
                </span>
                <h3 className="text-sm font-semibold text-text-main">Response</h3>
                {responseStatus !== null && (
                  <Badge
                    variant={responseStatus >= 200 && responseStatus < 300 ? "success" : "error"}
                    size="sm"
                  >
                    {responseStatus}
                  </Badge>
                )}
                {responseDuration !== null && (
                  <span className="text-xs text-text-muted">{responseDuration}ms</span>
                )}
                {loading && (
                  <span className="material-symbols-outlined text-[14px] text-primary animate-spin">
                    progress_activity
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(responseBody)}
                  className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                  title="Copy"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              {audioUrl ? (
                <div className="p-4 space-y-3">
                  <audio controls src={audioUrl} className="w-full rounded-lg" autoPlay />
                  <a
                    href={audioUrl}
                    download="speech.mp3"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Download audio
                  </a>
                </div>
              ) : (
                <Editor
                  height="400px"
                  defaultLanguage="json"
                  value={responseBody}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    automaticLayout: true,
                    readOnly: true,
                  }}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
