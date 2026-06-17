"use client";

// src/app/(dashboard)/dashboard/playground/components/tabs/CompareTab.tsx

import { useEffect, useRef, useState } from "react";
import CompareColumn, { type CompareColumnData, type ColumnStatus } from "../CompareColumn";
import type { ConfigState } from "../StudioConfigPane";
import type { StreamMetrics } from "@/shared/schemas/playground";

interface CompareTabProps {
  configState: ConfigState;
}

const MAX_COLUMNS = 4; // D10: cap at 4 columns

interface ColumnState {
  id: string;
  model: string;
  status: ColumnStatus;
  metrics: StreamMetrics;
  response: string;
  errorMessage?: string;
}

const INITIAL_METRICS: StreamMetrics = {
  ttftMs: null,
  totalMs: null,
  tokensIn: 0,
  tokensOut: 0,
  tps: null,
  costUsd: null,
};

function createColumnId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `compare-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * ColumnMetricsTracker — plain (non-React) imperative object for tracking per-column stream metrics.
 * Uses simple mutable state (no React hooks) so it can be stored in a ref and called safely
 * from async callbacks without violating Rules of Hooks.
 */
class ColumnMetricsTracker {
  private startedAt: number | null = null;
  private firstChunkAt: number | null = null;
  private finishedAt: number | null = null;
  private tokensOut = 0;
  private tokensIn = 0;

  reset() {
    this.startedAt = null;
    this.firstChunkAt = null;
    this.finishedAt = null;
    this.tokensOut = 0;
    this.tokensIn = 0;
  }

  start() {
    this.startedAt = Date.now();
  }

  onFirstChunk() {
    if (this.firstChunkAt == null) {
      this.firstChunkAt = Date.now();
    }
  }

  onChunk(n: number) {
    this.tokensOut += n;
  }

  finish(usage?: { prompt_tokens?: number; completion_tokens?: number }) {
    this.finishedAt = Date.now();
    if (usage?.prompt_tokens != null) this.tokensIn = usage.prompt_tokens;
    if (usage?.completion_tokens != null) this.tokensOut = usage.completion_tokens;
  }

  getMetrics(): StreamMetrics {
    const { startedAt, firstChunkAt, finishedAt, tokensOut, tokensIn } = this;
    const ttftMs = startedAt != null && firstChunkAt != null ? firstChunkAt - startedAt : null;
    const totalMs = startedAt != null && finishedAt != null ? finishedAt - startedAt : null;
    const tps =
      totalMs != null && totalMs > 0 && tokensOut > 0 ? (tokensOut / totalMs) * 1000 : null;
    return { ttftMs, totalMs, tokensIn, tokensOut, tps, costUsd: null };
  }
}

/**
 * CompareTab — up to 4 parallel streaming columns (D10 + D19 + D22).
 *
 * Streaming uses native fetch + ReadableStream (not EventSource).
 * Each column has its own AbortController.
 * Cmd+K (or Ctrl+K) focuses the "add column" model input.
 */
export default function CompareTab({ configState }: CompareTabProps) {
  const [columns, setColumns] = useState<ColumnState[]>(() => [
    {
      id: createColumnId(),
      model: configState.model,
      status: "idle",
      metrics: INITIAL_METRICS,
      response: "",
    },
  ]);

  // AbortControllers per column id
  const controllersRef = useRef<Map<string, AbortController>>(new Map());
  // Metrics trackers per column id (plain class instances, no React hooks)
  const metricsTrackersRef = useRef<Map<string, ColumnMetricsTracker>>(new Map());

  // User prompt input
  const [prompt, setPrompt] = useState("");

  // RAF throttle: pending chunk accumulator and scheduled frame id
  const pendingRef = useRef<Record<string, string>>({});
  const rafRef = useRef<number | null>(null);

  // Input for model name when adding a column
  const [newModel, setNewModel] = useState("");
  const addInputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K shortcut to focus model input (D10)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        addInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function getOrCreateTracker(id: string): ColumnMetricsTracker {
    if (!metricsTrackersRef.current.has(id)) {
      metricsTrackersRef.current.set(id, new ColumnMetricsTracker());
    }
    return metricsTrackersRef.current.get(id)!;
  }

  /**
   * Throttle per-column chunk updates via requestAnimationFrame.
   * Accumulates all deltas that arrive within a single frame and flushes
   * them with a single setColumns call, preventing hundreds of re-renders/s.
   */
  function pushChunk(colId: string, delta: string) {
    pendingRef.current[colId] = (pendingRef.current[colId] ?? "") + delta;

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        const snapshot = pendingRef.current;
        pendingRef.current = {};
        rafRef.current = null;

        setColumns((prev) =>
          prev.map((c) => {
            const extra = snapshot[c.id];
            return extra != null ? { ...c, response: c.response + extra } : c;
          })
        );
      });
    }
  }

  function addColumn() {
    if (columns.length >= MAX_COLUMNS) return;
    const model = newModel.trim() || configState.model;
    const id = createColumnId();
    setColumns((prev) => [
      ...prev,
      { id, model, status: "idle", metrics: INITIAL_METRICS, response: "" },
    ]);
    setNewModel("");
  }

  function removeColumn(id: string) {
    controllersRef.current.get(id)?.abort();
    controllersRef.current.delete(id);
    metricsTrackersRef.current.delete(id);
    setColumns((prev) => prev.filter((c) => c.id !== id));
  }

  function cancelColumn(id: string) {
    controllersRef.current.get(id)?.abort();
  }

  function cancelAll() {
    for (const ctrl of controllersRef.current.values()) {
      ctrl.abort();
    }
  }

  function updateColumn(id: string, patch: Partial<ColumnState>) {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  /**
   * Stream a single column's SSE request (D19).
   */
  async function streamColumn(col: ColumnState): Promise<void> {
    const tracker = getOrCreateTracker(col.id);
    tracker.reset();

    const controller = new AbortController();
    controllersRef.current.set(col.id, controller);

    updateColumn(col.id, { status: "streaming", response: "", metrics: INITIAL_METRICS });
    tracker.start();

    const body: Record<string, unknown> = {
      model: col.model,
      stream: true,
      messages: [
        ...(configState.systemPrompt
          ? [{ role: "system", content: configState.systemPrompt }]
          : []),
        { role: "user", content: prompt },
      ],
    };

    const { params } = configState;
    if (params.temperature != null) body["temperature"] = params.temperature;
    if (params.max_tokens != null) body["max_tokens"] = params.max_tokens;
    if (params.top_p != null) body["top_p"] = params.top_p;
    if (params.presence_penalty != null) body["presence_penalty"] = params.presence_penalty;
    if (params.frequency_penalty != null) body["frequency_penalty"] = params.frequency_penalty;
    if (params.seed != null) body["seed"] = params.seed;
    if (params.stop != null) body["stop"] = params.stop;

    let accumulated = "";
    let firstChunk = true;

    try {
      const res = await fetch(`${configState.baseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Unknown error");
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
      }

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice("data: ".length).trim();
          if (data === "[DONE]") continue;

          let parsed: Record<string, unknown>;
          try {
            parsed = JSON.parse(data) as Record<string, unknown>;
          } catch {
            continue;
          }

          const choices = (parsed["choices"] as Array<Record<string, unknown>> | undefined) ?? [];
          const delta = choices[0]?.["delta"] as Record<string, unknown> | undefined;
          const content = delta?.["content"];

          if (typeof content === "string" && content !== "") {
            if (firstChunk) {
              tracker.onFirstChunk();
              firstChunk = false;
            }
            accumulated += content;
            tracker.onChunk(1);

            // Throttled: accumulate delta and flush once per animation frame
            pushChunk(col.id, content);
          }

          const usage = parsed["usage"] as
            | { prompt_tokens?: number; completion_tokens?: number }
            | undefined;
          if (usage != null) {
            tracker.finish(usage);
          }
        }
      }

      tracker.finish();
      updateColumn(col.id, {
        status: "done",
        metrics: tracker.getMetrics(),
      });
    } catch (err) {
      if (controller.signal.aborted) {
        // Cancel any pending RAF for this column and clean up its pending delta
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        delete pendingRef.current[col.id];
        updateColumn(col.id, { status: "idle" });
        return;
      }
      const message = err instanceof Error ? err.message : String(err);
      updateColumn(col.id, {
        status: "error",
        errorMessage: message,
        metrics: tracker.getMetrics(),
      });
    }
  }

  /**
   * Run all columns in parallel (D10).
   */
  async function runAll() {
    cancelAll();
    await Promise.allSettled(columns.map((col) => streamColumn(col)));
  }

  const isAnyStreaming = columns.some((c) => c.status === "streaming");
  const atColumnLimit = columns.length >= MAX_COLUMNS;

  const displayColumns: CompareColumnData[] = columns.map((c) => ({
    id: c.id,
    model: c.model,
    status: c.status,
    metrics: c.metrics,
    response: c.response,
    errorMessage: c.errorMessage,
  }));

  return (
    <div className="flex flex-col h-full">
      {/* Prompt input area */}
      <div className="px-4 pt-3 pb-2 border-b border-border bg-bg-alt shrink-0">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here…"
          rows={3}
          className="w-full text-sm bg-surface border border-border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-text-main resize-y"
          aria-label="User prompt"
        />
      </div>

      {/* Compare toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-alt shrink-0">
        {/* Run / Cancel all */}
        {isAnyStreaming ? (
          <button
            onClick={cancelAll}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 transition-colors"
            aria-label="Cancel all streams"
          >
            <span className="material-symbols-outlined text-[14px]">stop</span>
            Cancel all
          </button>
        ) : (
          <button
            onClick={() => void runAll()}
            disabled={columns.length === 0 || !prompt.trim()}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Run all columns"
          >
            <span className="material-symbols-outlined text-[14px]">play_arrow</span>
            Run all
          </button>
        )}

        {/* Add column */}
        <div className="flex items-center gap-1.5 ml-2">
          <input
            ref={addInputRef}
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addColumn();
            }}
            placeholder="Model (Cmd+K)…"
            disabled={atColumnLimit}
            className="text-xs bg-surface border border-border rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-text-main w-40 disabled:opacity-40"
            aria-label="Model name for new column"
          />
          <button
            onClick={addColumn}
            disabled={atColumnLimit}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-border text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={atColumnLimit ? `Maximum ${MAX_COLUMNS} columns` : "Add column"}
            aria-label="Add model column"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            Add model
          </button>
        </div>

        {/* Column count indicator */}
        <span className="ml-auto text-[11px] text-text-muted">
          {columns.length}/{MAX_COLUMNS} columns
        </span>
      </div>

      {/* Columns area */}
      <div
        className="flex-1 grid overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${Math.max(columns.length, 1)}, minmax(0, 1fr))`,
        }}
      >
        {displayColumns.map((col) => (
          <CompareColumn
            key={col.id}
            column={col}
            onCancel={cancelColumn}
            onRemove={removeColumn}
          />
        ))}

        {columns.length === 0 && (
          <div className="flex items-center justify-center h-full text-text-muted col-span-4">
            <div className="text-center space-y-2">
              <span className="material-symbols-outlined text-[48px] text-text-muted/30">
                compare
              </span>
              <p className="text-sm">Add a model column to compare</p>
              <p className="text-xs text-text-muted/60">
                Up to {MAX_COLUMNS} models simultaneously
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
