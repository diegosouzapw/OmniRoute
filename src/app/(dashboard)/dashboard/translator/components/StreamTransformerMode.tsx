"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

import { Button, Card } from "@/shared/components";
import { copyToClipboard } from "@/shared/utils/clipboard";

const TEXT_SAMPLE = `data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":" from OmniRoute"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":12,"completion_tokens":4,"total_tokens":16}}

data: [DONE]
`;

const TOOL_SAMPLE = `data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_123","type":"function","function":{"name":"lookup_weather","arguments":"{\\"city\\":\\"Tok"}}]},"finish_reason":null}]}

data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"function":{"arguments":"yo\\"}"}}]},"finish_reason":null}]}

data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}],"usage":{"prompt_tokens":23,"completion_tokens":9,"total_tokens":32}}

data: [DONE]
`;

function getFramePreview(data: unknown): string {
  if (typeof data === "string") return data;
  if (!data || typeof data !== "object") return "";

  const record = data as Record<string, unknown>;
  const delta = record.delta;
  if (typeof delta === "string") return delta;

  const item = record.item;
  if (item && typeof item === "object") {
    const itemRecord = item as Record<string, unknown>;
    const type = itemRecord.type;
    const text = itemRecord.text;
    const name = itemRecord.name;
    if (typeof text === "string" && text) return text;
    if (typeof name === "string" && name) return `${type || "item"}: ${name}`;
    if (typeof type === "string" && type) return type;
  }

  const text = record.text;
  if (typeof text === "string" && text) return text;

  return JSON.stringify(data).slice(0, 140);
}

function parseSseFrames(rawSse: string): Array<{ event: string; preview: string }> {
  return rawSse
    .split("\n\n")
    .map((frame) => frame.trim())
    .filter(Boolean)
    .map((frame) => {
      const eventLine = frame
        .split("\n")
        .find((line) => line.startsWith("event:"))
        ?.replace(/^event:\s*/, "")
        .trim();
      const dataLine = frame
        .split("\n")
        .find((line) => line.startsWith("data:"))
        ?.replace(/^data:\s*/, "");

      if (dataLine === "[DONE]") {
        return { event: "done", preview: "[DONE]" };
      }

      let parsedData: unknown = dataLine || "";
      try {
        parsedData = dataLine ? JSON.parse(dataLine) : "";
      } catch {
        parsedData = dataLine || "";
      }

      return {
        event: eventLine || "message",
        preview: getFramePreview(parsedData),
      };
    });
}

export default function StreamTransformerMode() {
  const t = useTranslations("translator");
  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: Record<string, unknown>) => {
      try {
        const translated = t(key, values);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const [rawSse, setRawSse] = useState(TEXT_SAMPLE);
  const [transformedSse, setTransformedSse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const transformedFrames = useMemo(() => parseSseFrames(transformedSse), [transformedSse]);
  const eventCount = transformedFrames.length;
  const uniqueEventCount = new Set(transformedFrames.map((frame) => frame.event)).size;

  const handleCopy = async (value: string, field: string) => {
    await copyToClipboard(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const runTransform = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/translator/transform-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawSse }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || translateOrFallback("requestFailed", "Request failed"));
      }

      setTransformedSse(data.transformed || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to transform stream");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 min-w-0">
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
          swap_horiz
        </span>
        <div>
          <p className="font-medium text-text-main mb-0.5">
            {translateOrFallback("streamTransformerTitle", "Responses Stream Transformer")}
          </p>
          <p>
            {translateOrFallback(
              "streamTransformerDescription",
              "Paste a chat completions SSE stream, run it through OmniRoute's Responses transformer, and inspect the emitted response.* events before wiring a client."
            )}
          </p>
        </div>
      </div>

      <Card>
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setRawSse(TEXT_SAMPLE)}>
              {translateOrFallback("loadTextSample", "Load text sample")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setRawSse(TOOL_SAMPLE)}>
              {translateOrFallback("loadToolSample", "Load tool-call sample")}
            </Button>
            <Button size="sm" icon="play_arrow" onClick={runTransform} loading={loading}>
              {translateOrFallback("transformToResponses", "Transform to Responses")}
            </Button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-text-main">
                  {translateOrFallback("rawChatSseInput", "Raw chat completions SSE")}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(rawSse, "input")}>
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedField === "input" ? "check" : "content_copy"}
                  </span>
                </Button>
              </div>
              <textarea
                value={rawSse}
                onChange={(e) => setRawSse(e.target.value)}
                className="min-h-[360px] w-full rounded-lg border border-border bg-bg-secondary px-3 py-3 text-xs font-mono text-text-main focus:outline-none focus:ring-1 focus:ring-primary/50"
                spellCheck={false}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-text-main">
                  {translateOrFallback("transformedResponsesSse", "Transformed Responses API SSE")}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(transformedSse, "output")}
                  disabled={!transformedSse}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedField === "output" ? "check" : "content_copy"}
                  </span>
                </Button>
              </div>
              <pre className="min-h-[360px] overflow-auto rounded-lg border border-border bg-bg-secondary px-3 py-3 text-xs font-mono whitespace-pre-wrap break-all">
                {transformedSse || translateOrFallback("noResultsYet", "No results yet")}
              </pre>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MiniStat
          label={translateOrFallback("transformedEvents", "Transformed events")}
          value={eventCount}
        />
        <MiniStat
          label={translateOrFallback("uniqueEventTypes", "Unique event types")}
          value={uniqueEventCount}
        />
        <MiniStat
          label={translateOrFallback("inputLines", "Input lines")}
          value={rawSse.split("\n").length}
        />
        <MiniStat
          label={translateOrFallback("outputLines", "Output lines")}
          value={transformedSse ? transformedSse.split("\n").length : 0}
        />
      </div>

      <Card>
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-text-main">
            {translateOrFallback("transformedEventTimeline", "Transformed event timeline")}
          </h3>

          {transformedFrames.length === 0 ? (
            <p className="text-sm text-text-muted">
              {translateOrFallback(
                "transformerTimelineHint",
                "Run the transformer to inspect emitted response.output_* events in order."
              )}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-text-muted border-b border-border">
                    <th className="pb-2 pr-4">#</th>
                    <th className="pb-2 pr-4">{translateOrFallback("eventType", "Event type")}</th>
                    <th className="pb-2">{translateOrFallback("eventPreview", "Preview")}</th>
                  </tr>
                </thead>
                <tbody>
                  {transformedFrames.map((frame, index) => (
                    <tr
                      key={`${frame.event}_${index}`}
                      className="border-b border-border/50 align-top"
                    >
                      <td className="py-2 pr-4 text-xs text-text-muted">{index + 1}</td>
                      <td className="py-2 pr-4 font-mono text-xs text-primary">{frame.event}</td>
                      <td className="py-2 text-xs text-text-muted break-all">{frame.preview}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <div className="p-4">
        <p className="text-lg font-bold text-text-main">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      </div>
    </Card>
  );
}
