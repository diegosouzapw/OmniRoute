"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Card, Button, Select, Badge } from "@/shared/components";
import { ALIAS_TO_ID } from "@/shared/constants/providers";
import { pickMaskedDisplayValue, pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
const SearchPlayground = dynamic(() => import("./SearchPlayground"), {
  ssr: false,
});
const ChatPlayground = dynamic(() => import("./ChatPlayground"), {
  ssr: false,
});

interface ModelInfo {
  id: string;
  object: string;
  owned_by: string;
}

interface ProviderOption {
  value: string;
  label: string;
}

interface ConnectionOption {
  id: string;
  name: string;
  email?: string;
  provider: string;
  authType: string;
}

// Endpoint options will be generated dynamically with translations

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
  transcription: {
    // Note: this endpoint requires multipart/form-data — use the file upload below
    model: "deepgram/nova-3",
    language: "en",
  },
  video: {
    model: "comfyui/animatediff",
    prompt: "A timelapse of a sunset over the ocean",
    n: 1,
  },
  music: {
    model: "comfyui/stable-audio",
    prompt: "Calm ambient piano music with soft reverb",
    duration: 10,
  },
  rerank: {
    model: "cohere/rerank-english-v3.0",
    query: "What is the capital of France?",
    documents: [
      "Paris is the capital of France.",
      "London is the capital of England.",
      "Berlin is the capital of Germany.",
    ],
    top_n: 2,
  },
  search: {
    query: "latest AI developments",
    max_results: 5,
    search_type: "web",
  },
};

const ENDPOINT_PATHS: Record<string, string> = {
  chat: "/v1/chat/completions",
  responses: "/v1/responses",
  images: "/v1/images/generations",
  embeddings: "/v1/embeddings",
  speech: "/v1/audio/speech",
  transcription: "/v1/audio/transcriptions",
  video: "/v1/videos/generations",
  music: "/v1/music/generations",
  rerank: "/v1/rerank",
  search: "/v1/search",
};

// Models known to support vision (image input)
const VISION_MODELS = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4-turbo",
  "gpt-4-vision",
  "claude-3",
  "claude-sonnet",
  "claude-opus",
  "claude-haiku",
  "gemini",
  "llava",
  "bakllava",
  "pixtral",
  "qwen-vl",
  "qvq",
  "mistral-pixtral",
];

function isVisionModel(modelId: string): boolean {
  const lower = modelId.toLowerCase();
  return VISION_MODELS.some((k) => lower.includes(k));
}

/** Convert a File to base64 data URI */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Render image results from OpenAI-compatible format */
function ImageResultsInline({ data }: { data: any }) {
  const t = useTranslations("playground");
  const images: Array<{ url?: string; b64_json?: string; revised_prompt?: string }> =
    data?.data || [];
  if (images.length === 0) return null;
  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
        {t("imagesGenerated", { count: images.length })}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {images.map((img, i) => {
          const src = img.url || (img.b64_json ? `data:image/png;base64,${img.b64_json}` : null);
          if (!src) return null;
          return (
            <div key={i} className="relative group rounded-lg overflow-hidden border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={img.revised_prompt || t("generatedImage", { index: i + 1 })}
                className="w-full"
              />
              <a
                href={src}
                download={`image-${i + 1}.png`}
                className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px]">download</span>
                {t("save")}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  const t = useTranslations("playground");

  // Get translated endpoint options
  const endpointOptions = useMemo(
    () => [
      { value: "conversational", label: "Chat (Conversational)" },
      { value: "chat", label: t("endpointOptions.chat") },
      { value: "responses", label: t("endpointOptions.responses") },
      { value: "images", label: t("endpointOptions.images") },
      { value: "embeddings", label: t("endpointOptions.embeddings") },
      { value: "speech", label: t("endpointOptions.speech") },
      { value: "transcription", label: t("endpointOptions.transcription") },
      { value: "video", label: t("endpointOptions.video") },
      { value: "music", label: t("endpointOptions.music") },
      { value: "rerank", label: t("endpointOptions.rerank") },
      { value: "search", label: t("endpointOptions.search") },
    ],
    [t]
  );

  const [models, setModels] = useState<ModelInfo[]>([]);
  const [providers, setProviders] = useState<ProviderOption[]>([]);
  const [allConnections, setAllConnections] = useState<ConnectionOption[]>([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("chat");
  const [requestBody, setRequestBody] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageData, setImageData] = useState<any>(null);
  const [transcriptionText, setTranscriptionText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseDuration, setResponseDuration] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // base64 URIs for vision

  const isSearchEndpoint = selectedEndpoint === "search";
  const isConversationalEndpoint = selectedEndpoint === "conversational";
  const isTranscriptionEndpoint = selectedEndpoint === "transcription";
  const isChatEndpoint = selectedEndpoint === "chat";
  const isImageEndpoint = selectedEndpoint === "images";
  const supportsVision = isChatEndpoint && isVisionModel(selectedModel);

  // Load connections for a given provider — filtered from allConnections
  const providerConnections = allConnections.filter((c) => {
    if (!selectedProvider) return false;
    const resolvedProvider = ALIAS_TO_ID[selectedProvider] || selectedProvider;
    return c.provider === resolvedProvider || c.provider === selectedProvider;
  });

  // Fetch models and ALL connections at startup
  useEffect(() => {
    // Fetch models
    fetch("/v1/models")
      .then((res) => res.json())
      .then((data) => {
        const modelList = (data?.data || []) as ModelInfo[];
        setModels(modelList);

        const providerSet = new Set<string>();
        modelList.forEach((m) => {
          const parts = m.id.split("/");
          if (parts.length >= 2) providerSet.add(parts[0]);
        });
        const providerOpts = Array.from(providerSet)
          .sort()
          .map((p) => ({ value: p, label: p }));
        setProviders(providerOpts);
        if (providerOpts.length > 0) {
          setSelectedProvider(providerOpts[0].value);
        }
      })
      .catch(() => {});

    // Fetch ALL connections (once)
    fetch("/api/providers/client")
      .then((res) => res.json())
      .then((data) => {
        const conns: ConnectionOption[] = [];
        for (const conn of data?.connections || []) {
          conns.push({
            id: conn.id,
            name: conn.name || conn.id,
            email: conn.email,
            provider: conn.provider,
            authType: conn.authType || "apiKey",
          });
        }
        setAllConnections(conns);
      })
      .catch(() => {});
  }, []);

  const filteredModels = models
    .filter((m) => !selectedProvider || m.id.startsWith(selectedProvider + "/"))
    .map((m) => ({ value: m.id, label: m.id }));

  const generateDefaultBody = (endpoint: string, model: string) => {
    const template = { ...DEFAULT_BODIES[endpoint] };
    if ("model" in template) {
      (template as any).model = model;
    }
    return JSON.stringify(template, null, 2);
  };

  const handleProviderChange = (newProvider: string) => {
    setSelectedProvider(newProvider);
    setSelectedConnection("");
    const providerModels = models
      .filter((m) => !newProvider || m.id.startsWith(newProvider + "/"))
      .map((m) => m.id);
    const firstModel = providerModels[0] || "";
    setSelectedModel(firstModel);
    setRequestBody(generateDefaultBody(selectedEndpoint, firstModel));
    clearResults();
  };

  const handleModelChange = (newModel: string) => {
    setSelectedModel(newModel);
    setRequestBody(generateDefaultBody(selectedEndpoint, newModel));
    clearResults();
  };

  const handleEndpointChange = (newEndpoint: string) => {
    setSelectedEndpoint(newEndpoint);
    setRequestBody(generateDefaultBody(newEndpoint, selectedModel));
    setUploadedFile(null);
    setUploadedImages([]);
    clearResults();
  };

  const clearResults = () => {
    setResponseBody("");
    setResponseStatus(null);
    setResponseDuration(null);
    setAudioUrl(null);
    setImageData(null);
    setTranscriptionText(null);
  };

  /** Handle audio file select for transcription endpoint */
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setUploadedFile(file);
  };

  /** Handle image file select for vision models */
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const base64s = await Promise.all(files.map(fileToBase64));
    setUploadedImages((prev) => [...prev, ...base64s].slice(0, 4)); // max 4 images
  };

  /** Inject uploaded images into chat messages body */
  const buildChatBodyWithImages = (parsed: any, imageBase64s: string[]): any => {
    if (!imageBase64s.length) return parsed;
    const messages = [...(parsed.messages || [])];
    if (messages.length === 0) return parsed;
    const lastMsg = messages[messages.length - 1];
    const currentContent = typeof lastMsg.content === "string" ? lastMsg.content : "";
    messages[messages.length - 1] = {
      ...lastMsg,
      content: [
        { type: "text", text: currentContent },
        ...imageBase64s.map((b64) => ({
          type: "image_url",
          image_url: { url: b64 },
        })),
      ],
    };
    return { ...parsed, messages };
  };

  const handleSend = async () => {
    if (!requestBody.trim() && !isTranscriptionEndpoint) return;
    setLoading(true);
    clearResults();

    const controller = new AbortController();
    abortRef.current = controller;
    const startTime = Date.now();

    try {
      const path = ENDPOINT_PATHS[selectedEndpoint];
      let res: Response;

      if (isTranscriptionEndpoint) {
        // Multipart form-data for transcription
        const form = new FormData();
        if (uploadedFile) {
          form.append("file", uploadedFile);
        }
        // Parse extra params from JSON editor
        try {
          const extra = JSON.parse(requestBody || "{}");
          for (const [k, v] of Object.entries(extra)) {
            if (k !== "file") form.append(k, String(v));
          }
        } catch {
          /* ignore parse errors */
        }
        const fetchHeaders: Record<string, string> = {};
        if (selectedConnection) {
          fetchHeaders["X-OmniRoute-Connection"] = selectedConnection;
        }
        res = await fetch(`/api${path}`, {
          method: "POST",
          headers: fetchHeaders,
          body: form,
          signal: controller.signal,
        });
      } else {
        let parsed = JSON.parse(requestBody);
        // Inject vision images if available
        if (supportsVision && uploadedImages.length > 0) {
          parsed = buildChatBodyWithImages(parsed, uploadedImages);
        }
        const fetchHeaders: Record<string, string> = { "Content-Type": "application/json" };
        if (selectedConnection) {
          fetchHeaders["X-OmniRoute-Connection"] = selectedConnection;
        }
        res = await fetch(`/api${path}`, {
          method: "POST",
          headers: fetchHeaders,
          body: JSON.stringify(parsed),
          signal: controller.signal,
        });
      }

      setResponseStatus(res.status);
      setResponseDuration(Date.now() - startTime);

      const contentType = res.headers.get("content-type") || "";
      if (contentType.startsWith("audio/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setResponseBody(`// Audio response (${contentType})\n// Click play below to listen.`);
      } else if (contentType.includes("text/event-stream")) {
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
        // Detect image generation result → render inline
        if (isImageEndpoint && data?.data && Array.isArray(data.data) && res.ok) {
          setImageData(data);
        }
        // Detect transcription result → render plain text
        if (isTranscriptionEndpoint && typeof data?.text === "string") {
          setTranscriptionText(data.text || "(empty result — check provider credentials)");
        }
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
  };

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

  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  return (
    <div className="space-y-5">
      {/* Info Banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
          science
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">{t("title")}</p>
          <p>{t("description")}</p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row items-end gap-4">
          {/* Endpoint — always first */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
              {t("endpoint")}
            </label>
            <Select
              value={selectedEndpoint}
              onChange={(e: any) => handleEndpointChange(e.target.value)}
              options={endpointOptions}
              className="w-full"
            />
          </div>

          {/* Provider — hidden in search mode */}
          {!isSearchEndpoint && !isConversationalEndpoint && (
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                {t("provider")}
              </label>
              <Select
                value={selectedProvider}
                onChange={(e: any) => handleProviderChange(e.target.value)}
                options={providers}
                className="w-full"
              />
            </div>
          )}

          {/* Model — hidden in search mode */}
          {!isSearchEndpoint && !isConversationalEndpoint && (
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                {t("model")}
              </label>
              <Select
                value={selectedModel}
                onChange={(e: any) => handleModelChange(e.target.value)}
                options={filteredModels}
                className="w-full"
              />
            </div>
          )}

          {/* Account/Key — always shown when provider is selected */}
          {!isSearchEndpoint && !isConversationalEndpoint && (
            <div className="flex-1 w-full">
              <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">
                {t("accountKey")}
              </label>
              <Select
                value={selectedConnection}
                onChange={(e: any) => setSelectedConnection(e.target.value)}
                options={[
                  {
                    value: "",
                    label:
                      providerConnections.length > 0
                        ? t("autoAccounts", { count: providerConnections.length })
                        : t("noAccounts"),
                  },
                  ...providerConnections.map((c) => ({
                    value: c.id,
                    label: pickDisplayValue([c.name, c.email], emailsVisible, c.id),
                  })),
                ]}
                className="w-full"
              />
            </div>
          )}

          {/* Send Button — hidden in search mode (SearchPlayground has its own) */}
          {!isSearchEndpoint && !isConversationalEndpoint && (
            <div className="shrink-0">
              {loading ? (
                <Button icon="stop" variant="secondary" onClick={handleCancel}>
                  {t("cancel")}
                </Button>
              ) : (
                <Button
                  icon="send"
                  onClick={handleSend}
                  disabled={
                    (!requestBody.trim() && !isTranscriptionEndpoint) ||
                    (!selectedModel && !isTranscriptionEndpoint)
                  }
                >
                  {t("send")}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Isolated sub-components */}
      {isSearchEndpoint ? (
        <SearchPlayground />
      ) : isConversationalEndpoint ? (
        <ChatPlayground
          selectedProvider={selectedProvider}
          selectedModel={selectedModel}
          selectedConnection={selectedConnection}
          models={models}
          providers={providers}
          providerConnections={providerConnections}
          onProviderChange={handleProviderChange}
          onModelChange={handleModelChange}
          onConnectionChange={setSelectedConnection}
          noAccountsString={t("noAccounts")}
          autoAccountsString={
            providerConnections.length > 0
              ? t("autoAccounts", { count: providerConnections.length })
              : ""
          }
        />
      ) : (
        <>
          {/* File Upload Zone — shown for transcription and vision models */}
          {(isTranscriptionEndpoint || supportsVision) && (
            <Card>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-text-muted">
                    attach_file
                  </span>
                  <h3 className="text-sm font-semibold text-text-main">
                    {isTranscriptionEndpoint ? t("audioFile") : t("attachImages")}
                  </h3>
                  {isTranscriptionEndpoint && (
                    <Badge variant="info" size="sm">
                      {t("multipartFormData")}
                    </Badge>
                  )}
                  {supportsVision && (
                    <Badge variant="info" size="sm">
                      {t("upToImages")}
                    </Badge>
                  )}
                </div>
                {isTranscriptionEndpoint && (
                  <div>
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleAudioFileChange}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-sm"
                    />
                    {uploadedFile && (
                      <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] text-green-500">
                          check_circle
                        </span>
                        {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(0)} KB)
                      </p>
                    )}
                    {!uploadedFile && (
                      <p className="text-xs text-amber-500 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">info</span>
                        {t("selectAudioFile")}
                      </p>
                    )}
                  </div>
                )}
                {supportsVision && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFileChange}
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-text-main text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-sm"
                    />
                    {uploadedImages.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {uploadedImages.map((src, i) => (
                          <div
                            key={i}
                            className="relative group size-16 rounded overflow-hidden border border-border"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={src}
                              alt={`Attached ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() =>
                                setUploadedImages((prev) => prev.filter((_, idx) => idx !== i))
                              }
                              className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => setUploadedImages([])}
                          className="text-xs text-text-muted hover:text-red-500 self-center ml-1"
                        >
                          {t("clearAll")}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )}

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
                    <h3 className="text-sm font-semibold text-text-main">{t("request")}</h3>
                    <Badge variant="info" size="sm">
                      POST {ENDPOINT_PATHS[selectedEndpoint]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(requestBody)}
                      className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-main transition-colors"
                      title={t("copy")}
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
                      title={t("resetToDefault")}
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    </button>
                  </div>
                </div>
                {isTranscriptionEndpoint && (
                  <p className="text-xs text-text-muted bg-amber-500/10 border border-amber-500/20 rounded px-2 py-1.5 flex items-start gap-1">
                    <span className="material-symbols-outlined text-[12px] text-amber-500 mt-0.5">
                      info
                    </span>
                    {t("transcriptionHint")}
                  </p>
                )}
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
                    <h3 className="text-sm font-semibold text-text-main">{t("response")}</h3>
                    {responseStatus !== null && (
                      <Badge
                        variant={
                          responseStatus >= 200 && responseStatus < 300 ? "success" : "error"
                        }
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
                      title={t("copy")}
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
                        {t("downloadAudio")}
                      </a>
                    </div>
                  ) : imageData ? (
                    <ImageResultsInline data={imageData} />
                  ) : transcriptionText !== null ? (
                    <div className="p-4 space-y-2">
                      <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
                        {t("transcription")}
                      </p>
                      <div className="bg-surface/50 rounded p-3 text-sm text-text-main leading-relaxed whitespace-pre-wrap">
                        {transcriptionText}
                      </div>
                      <button
                        onClick={() => handleCopy(transcriptionText)}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[12px]">content_copy</span>
                        {t("copyText")}
                      </button>
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
        </>
      )}
    </div>
  );
}
