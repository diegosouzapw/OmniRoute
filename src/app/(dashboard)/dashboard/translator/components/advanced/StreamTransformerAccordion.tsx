"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Card } from "@/shared/components";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { cn } from "@/shared/utils/cn";

// ─── Sample payloads ──────────────────────────────────────────────────────────

const SAMPLE_TEXT = `data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":" from OmniRoute"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":12,"completion_tokens":4,"total_tokens":16}}

data: [DONE]
`;

const SAMPLE_TOOL = `data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_123","type":"function","function":{"name":"lookup_weather","arguments":"{\\"city\\":\\"Tok"}}]},"finish_reason":null}]}

data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"function":{"arguments":"yo\\"}"}}]},"finish_reason":null}]}

data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}],"usage":{"prompt_tokens":23,"completion_tokens":9,"total_tokens":32}}

data: [DONE]
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── MiniStat ────────────────────────────────────────────────────────────────

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

// ─── Props ───────────────────────────────────────────────────────────────────

export interface StreamTransformerAccordionProps {
  forceOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Refactor of StreamTransformerMode wrapped in a Collapsible-style header with
 * lazy-render guard (D7): content only mounts after the section is first opened.
 *
 * Visual structure matches @/shared/components/Collapsible (variant="default") so
 * F9 can swap to the shared component without layout changes once Collapsible
 * gains an onOpenChange callback.
 */
export default function StreamTransformerAccordion({
  forceOpen,
  onOpenChange,
}: StreamTransformerAccordionProps) {
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

  // ── Open state (controlled by forceOpen; local toggle otherwise) ──────────
  const [open, setOpen] = useState(Boolean(forceOpen));
  // D7 lazy-render guard: once mounted, keep content in DOM.
  const [hasOpened, setHasOpened] = useState(Boolean(forceOpen));
  // Track previous forceOpen so the effect only reacts to false→true transitions.
  // Without this, a manual close while forceOpen stays true would re-open the accordion
  // on the very next render.
  const prevForceOpen = useRef(Boolean(forceOpen));

  // Sync forceOpen changes from parent after mount (deep-link / back-forward navigation).
  useEffect(() => {
    const prev = prevForceOpen.current;
    prevForceOpen.current = Boolean(forceOpen);
    if (!prev && forceOpen) {
      setOpen(true);
      setHasOpened(true);
      onOpenChange?.(true);
    }
  }, [forceOpen, onOpenChange]);

  const handleToggle = useCallback(() => {
    const next = !open;
    setOpen(next);
    if (next) setHasOpened(true);
    onOpenChange?.(next);
  }, [open, onOpenChange]);

  // ── Transform state (only matters once content is mounted) ────────────────
  const [rawSse, setRawSse] = useState(SAMPLE_TEXT);
  const [transformedSse, setTransformedSse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const transformedFrames = useMemo(() => parseSseFrames(transformedSse), [transformedSse]);
  const eventCount = transformedFrames.length;
  const uniqueEventCount = new Set(transformedFrames.map((frame) => frame.event)).size;

  const handleCopy = useCallback(async (value: string, field: string) => {
    await copyToClipboard(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const runTransform = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/translator/transform-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawSse }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        transformed?: string;
        error?: string;
      };

      if (!res.ok || !data.success) {
        // Hard Rule #12: display only the sanitized error string from buildErrorBody — no stack.
        const displayError = data.error
          ? String(data.error)
          : translateOrFallback("requestFailed", "Request failed");
        throw new Error(displayError);
      }

      setTransformedSse(data.transformed || "");
    } catch (err) {
      const raw =
        err instanceof Error
          ? err.message
          : translateOrFallback("streamTransformFailed", "Failed to transform stream");
      // Defence-in-depth: strip any accidental stack-trace suffix.
      setError(raw.replace(/\s+at\s+\/.*/g, ""));
    } finally {
      setLoading(false);
    }
  }, [rawSse, translateOrFallback]);

  // ── Titles (computed once per render for readability) ─────────────────────
  const title = translateOrFallback(
    "advancedStreamTransformTitle",
    "Stream Transformer (Chat → Responses SSE)"
  );
  const subtitle = translateOrFallback(
    "advancedStreamTransformSubtitle",
    "Converte SSE Chat Completions em Responses API."
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-lg border border-black/5 dark:border-white/5 bg-surface">
      {/* ── Collapsible header — mirrors Collapsible.tsx visual style ──── */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors",
          open && "border-b border-black/5 dark:border-white/5"
        )}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          className="flex items-center gap-3 flex-1 min-w-0 text-left -m-1 p-1 rounded"
        >
          <span
            className="material-symbols-outlined text-text-muted text-[20px] shrink-0"
            aria-hidden="true"
          >
            {open ? "expand_more" : "chevron_right"}
          </span>
          <span
            className="material-symbols-outlined text-text-muted text-[18px] shrink-0"
            aria-hidden="true"
          >
            swap_horiz
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-main truncate">{title}</div>
            <div className="text-xs text-text-muted truncate">{subtitle}</div>
          </div>
        </button>
      </div>

      {/* ── Content: lazy-render guard (D7) ────────────────────────────── */}
      {(open || hasOpened) && (
        <div className={cn("p-4", !open && "hidden")}>
          <div className="space-y-5 min-w-0">
            {/* Info banner */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
              <span
                className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
                aria-hidden="true"
              >
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
                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRawSse(SAMPLE_TEXT)}
                    aria-label={translateOrFallback("loadTextSample", "Load text sample")}
                  >
                    {translateOrFallback("loadTextSample", "Load text sample")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRawSse(SAMPLE_TOOL)}
                    aria-label={translateOrFallback("loadToolSample", "Load tool-call sample")}
                  >
                    {translateOrFallback("loadToolSample", "Load tool-call sample")}
                  </Button>
                  <Button
                    size="sm"
                    icon="play_arrow"
                    onClick={runTransform}
                    loading={loading}
                    aria-label={translateOrFallback(
                      "transformToResponses",
                      "Transform to Responses"
                    )}
                  >
                    {translateOrFallback("transformToResponses", "Transform to Responses")}
                  </Button>
                </div>

                {/* Error display — Hard Rule #12: never show raw err.stack */}
                {error && (
                  <div
                    role="alert"
                    data-testid="error-display"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {error}
                  </div>
                )}

                {/* Input / Output panels */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Raw SSE input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-text-main">
                        {translateOrFallback("rawChatSseInput", "Raw chat completions SSE")}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(rawSse, "input")}
                        aria-label={translateOrFallback("copyInput", "Copy input")}
                      >
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                          {copiedField === "input" ? "check" : "content_copy"}
                        </span>
                      </Button>
                    </div>
                    <textarea
                      value={rawSse}
                      onChange={(e) => setRawSse(e.target.value)}
                      data-testid="raw-sse-input"
                      className="min-h-[360px] w-full rounded-lg border border-border bg-bg-secondary px-3 py-3 text-xs font-mono text-text-main focus:outline-none focus:ring-1 focus:ring-primary/50"
                      spellCheck={false}
                      aria-label={translateOrFallback(
                        "rawChatSseInput",
                        "Raw chat completions SSE"
                      )}
                    />
                  </div>

                  {/* Transformed SSE output */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-text-main">
                        {translateOrFallback(
                          "transformedResponsesSse",
                          "Transformed Responses API SSE"
                        )}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(transformedSse, "output")}
                        disabled={!transformedSse}
                        aria-label={translateOrFallback("copyOutput", "Copy output")}
                      >
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                          {copiedField === "output" ? "check" : "content_copy"}
                        </span>
                      </Button>
                    </div>
                    <pre
                      data-testid="transformed-output"
                      className="min-h-[360px] overflow-auto rounded-lg border border-border bg-bg-secondary px-3 py-3 text-xs font-mono whitespace-pre-wrap break-all"
                    >
                      {transformedSse || translateOrFallback("noResultsYet", "No results yet")}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats grid */}
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

            {/* Event timeline */}
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
                          <th className="pb-2 pr-4">
                            {translateOrFallback("eventType", "Event type")}
                          </th>
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
                            <td className="py-2 pr-4 font-mono text-xs text-primary">
                              {frame.event}
                            </td>
                            <td className="py-2 text-xs text-text-muted break-all">
                              {frame.preview}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
