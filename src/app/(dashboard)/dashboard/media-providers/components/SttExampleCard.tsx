"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useApiKey } from "../../providers/hooks/useApiKey";
import { useProviderModels } from "../../providers/hooks/useProviderModels";
import { PlaygroundCard } from "./PlaygroundCard";
import { buildCurl } from "../../providers/utils/buildCurl";

interface Props {
  providerId: string;
}

const ENDPOINT_PATH = "/api/v1/audio/transcriptions";
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

function extractError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const err = d.error as Record<string, unknown> | undefined;
  if (err?.message) return String(err.message);
  if (typeof d.message === "string") return d.message;
  return null;
}

function SttResultRenderer(data: unknown) {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const text = typeof d.text === "string" ? d.text : null;
  if (text !== null) {
    return (
      <div className="p-3">
        <p className="text-sm text-text-main whitespace-pre-wrap">{text}</p>
      </div>
    );
  }
  return <pre className="text-xs p-3 text-text-main">{JSON.stringify(data, null, 2)}</pre>;
}

export function SttExampleCard({ providerId }: Props) {
  const t = useTranslations("miniPlayground");
  const { apiKey } = useApiKey();
  const { models } = useProviderModels(providerId);

  // Show only speech-to-text models. Providers like OpenRouter expose a large
  // chat catalog on the same connection, so narrow to transcription entries
  // (type "audio" / subtype "transcription"). A no-op for audio-only STT
  // providers, whose models are all transcription.
  const sttModels = models.filter((m) => m.type === "audio" && m.subtype === "transcription");

  const firstModel = sttModels[0]?.id ?? "whisper-1";
  const [model, setModel] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<{ data: unknown; latencyMs: number } | undefined>();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveModel = model || firstModel;

  // The transcription route resolves the provider from the leading segment of
  // the submitted model id, so a bare id (e.g. "deepgram/nova-3" for the
  // OpenRouter connection) would misroute. Qualify it with this connection's
  // provider id at submit time. Single-token ids (e.g. "whisper-1") already
  // lack a slash and pass through unchanged once prefixed.
  const qualify = (id: string) => (id.startsWith(`${providerId}/`) ? id : `${providerId}/${id}`);

  // cURL is multipart — show a representative snippet
  const curlSnippet = buildCurl({
    endpoint:
      (typeof window !== "undefined" ? window.location.origin : "http://localhost:20128") +
      ENDPOINT_PATH,
    headers: {
      Authorization: `Bearer ${apiKey || "<your-api-key>"}`,
    },
    body: {
      model: qualify(effectiveModel),
      file: "<path/to/audio.mp3>",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFileError(null);
    if (selected && selected.size > MAX_FILE_SIZE_BYTES) {
      setFileError(t("fileTooLarge25Mb"));
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleRun = async () => {
    if (!file) {
      setError(t("selectAudioFirst"));
      return;
    }
    setRunning(true);
    setError(null);
    setResult(undefined);
    const t0 = performance.now();
    try {
      const formData = new FormData();
      formData.append("model", qualify(effectiveModel));
      formData.append("file", file);

      const res = await fetch(ENDPOINT_PATH, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "x-connection-id": providerId,
        },
        body: formData,
      });
      const data: unknown = await res.json();
      const latencyMs = performance.now() - t0;
      const errMsg = extractError(data);
      if (!res.ok || errMsg) {
        setError(errMsg ?? `HTTP ${res.status}`);
      } else {
        setResult({ data, latencyMs });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("requestFailed"));
    } finally {
      setRunning(false);
    }
  };

  const modelOptions = sttModels.length > 0 ? sttModels : [{ id: "whisper-1" }];

  return (
    <PlaygroundCard
      kindLabel={t("speechToText")}
      apiEndpoint={ENDPOINT_PATH}
      onRun={handleRun}
      curlSnippet={curlSnippet}
      running={running}
      result={result}
      error={error}
      resultRenderer={SttResultRenderer}
    >
      {/* Model */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("model")}</label>
        <select
          value={model || firstModel}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-md border border-border bg-bg-subtle text-sm px-2 py-1.5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {modelOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.id}
            </option>
          ))}
        </select>
      </div>
      {/* File upload */}
      <div>
        <label className="block text-xs text-text-muted mb-1">{t("audioFile")}</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-xs rounded-md border border-border bg-bg-subtle px-3 py-1.5 text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">upload_file</span>
            {file ? file.name : t("chooseFile")}
          </button>
          {file && (
            <span className="text-xs text-text-muted">{Math.round(file.size / 1024)}KB</span>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="audio/mp3,audio/wav,audio/m4a,audio/ogg,audio/flac,audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileError && <p className="text-xs text-red-400 mt-1">{fileError}</p>}
        <p className="text-xs text-text-muted mt-1">{t("audioFormats25Mb")}</p>
      </div>
    </PlaygroundCard>
  );
}
