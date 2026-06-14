"use client";

import { useMemo } from "react";
import type { NodeTypes } from "@xyflow/react";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";
import { EngineNode } from "./nodes/EngineNode";
import { IoNode } from "./nodes/IoNode";
import { compressionRunToFlow, type CompressionRunModel } from "./compressionFlowModel";
import { useCompressionReplay, type ReplaySpeed } from "./useCompressionReplay";

// ── Static node type map (defined outside to avoid re-creation) ───────────

const NODE_TYPES: NodeTypes = {
  engine: EngineNode as unknown as NodeTypes["engine"],
  io: IoNode as unknown as NodeTypes["io"],
  // The model also sets type "input"/"output" for IoNode — map both
  input: IoNode as unknown as NodeTypes["input"],
  output: IoNode as unknown as NodeTypes["output"],
};

// ── Helpers ───────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString();
}

// ── Speed selector ────────────────────────────────────────────────────────

const SPEEDS: ReplaySpeed[] = [0.3, 1, 3];

function SpeedButton({
  s,
  active,
  onClick,
}: {
  s: ReplaySpeed;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2 py-0.5 rounded text-[11px] border transition-colors"
      style={{
        borderColor: active ? "var(--color-primary)" : "var(--color-border)",
        color: active ? "var(--color-primary)" : "var(--color-text-muted)",
        background: active ? "var(--color-primary-subtle)" : "transparent",
      }}
    >
      {s}×
    </button>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-3 text-muted"
      data-testid="compression-cockpit-empty"
    >
      <span className="text-3xl opacity-40">⌁</span>
      <p className="text-sm">No compression run available.</p>
      <p className="text-xs opacity-60">Live data arrives via the WS compression channel.</p>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────

export interface CompressionCockpitProps {
  /**
   * If provided, renders this run directly (static / drill-down mode).
   * If omitted, the cockpit uses `useLiveCompression` to pick the latest run.
   */
  run?: CompressionRunModel | null;
}

// ── Main component ────────────────────────────────────────────────────────

/**
 * CompressionCockpit — A3 cockpit view (Compression Studio, Tela A).
 *
 * Renders the compression pipeline as a ReactFlow canvas (A2) with:
 * - A header showing run metadata (mode, comboId, total savings).
 * - Replay controls (play/pause/reset + speed selector).
 * - Graceful empty state when no run is available.
 *
 * Controlled component: it renders the `run` prop when supplied and the empty
 * state otherwise. The parent owns the live data — it subscribes via the
 * `useLiveCompression` hook and passes `lastRun` as `run` — which keeps this
 * component WS-free and unit-testable with a static run.
 */
export function CompressionCockpit({ run: runProp }: CompressionCockpitProps) {
  // Replay drives frame-by-frame animation (cosmetic — sub-ms compression is sync)
  const { currentFrame, isPlaying, isComplete, speed, setSpeed, play, pause, reset } =
    useCompressionReplay(runProp ?? null);

  // Displayed run: replay frame while playing, else the full run
  const displayRun = currentFrame ?? runProp ?? null;

  // Build nodes/edges from the model
  const { nodes, edges } = useMemo(() => {
    if (!displayRun) return { nodes: [], edges: [] };

    // compressionRunToFlow uses type "input"/"output" for IoNode — remap to "io"
    const raw = compressionRunToFlow(displayRun);
    const remappedNodes = raw.nodes.map((n) => {
      if (n.type === "input") {
        return { ...n, type: "io", data: { ...n.data, variant: "input" } };
      }
      if (n.type === "output") {
        return {
          ...n,
          type: "io",
          data: { ...n.data, variant: "output", savingsPercent: displayRun.savingsPercent },
        };
      }
      return n;
    });
    return { nodes: remappedNodes, edges: raw.edges };
  }, [displayRun]);

  const fitKey = displayRun ? `${displayRun.requestId}-${nodes.length}` : "empty";

  if (!runProp) {
    return <EmptyState />;
  }

  const run = runProp;

  return (
    <div className="flex flex-col h-full gap-2" data-testid="compression-cockpit">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-bg/60 shrink-0">
        <span className="text-xs font-semibold text-muted uppercase tracking-wide">{run.mode}</span>
        {run.comboId && (
          <span className="text-xs text-muted px-1.5 py-0.5 rounded bg-border/40 font-mono">
            {run.comboId}
          </span>
        )}
        <span className="text-xs text-muted font-mono opacity-70 truncate">{run.requestId}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[11px] text-muted">
            {fmt(run.originalTokens)} → {fmt(run.compressedTokens)} tok
          </span>
          <span className="text-xs font-bold" style={{ color: "#22c55e" }}>
            −{run.savingsPercent.toFixed(1)}%
          </span>
          {isComplete && (
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted">
              replay done
            </span>
          )}
        </div>
      </div>

      {/* ── Canvas ─────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 rounded-lg overflow-hidden border border-border">
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          fitKey={fitKey}
          className="h-full w-full"
        />
      </div>

      {/* ── Replay controls ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-bg/60 shrink-0">
        <button
          onClick={isPlaying ? pause : play}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-border text-xs hover:bg-border/30 transition-colors"
          aria-label={isPlaying ? "Pause replay" : "Play replay"}
        >
          {isPlaying ? "⏸ Pause" : "▷ Replay"}
        </button>
        <button
          onClick={reset}
          className="px-2 py-1 rounded border border-border text-xs text-muted hover:bg-border/30 transition-colors"
          aria-label="Reset replay"
        >
          ⟳
        </button>
        <div className="flex items-center gap-1 ml-2">
          {SPEEDS.map((s) => (
            <SpeedButton key={s} s={s} active={speed === s} onClick={() => setSpeed(s)} />
          ))}
        </div>
        {displayRun && currentFrame && (
          <span className="ml-auto text-[11px] text-muted">
            step {displayRun?.steps.length ?? 0}/{run.steps.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default CompressionCockpit;
