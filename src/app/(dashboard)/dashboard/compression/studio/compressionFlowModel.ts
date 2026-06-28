/**
 * compressionFlowModel — pure reducer and replay helper for Compression Studio (Tela A).
 *
 * Pure functions: no React, no side effects.
 * Converts a `compression.completed` WS payload into:
 *   1. A `CompressionRunModel` (typed, serialisable model for UI).
 *   2. A ReactFlow `{ nodes, edges }` graph (left→right pipeline view).
 *   3. Progressive replay frames for animated step-by-step cascade.
 */

import type { Node, Edge } from "@xyflow/react";
import type { CompressionCompletedPayload, CompressionStepPayload } from "@/lib/events/types";

// ── Engine Step ───────────────────────────────────────────────────────────

export interface CompressionEngineStep {
  engine: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  rulesApplied?: string[];
  durationMs?: number;
  rejected?: boolean;
  rejectReason?: string;
}

// ── Diff ─────────────────────────────────────────────────────────────────

export type DiffSegment = { type: "same" | "removed" | "added"; text: string };

// ── Encoder comparison (TOON/GCF/JSON A/B) ────────────────────────────────

export interface EncoderSize {
  bytes: number;
  tokens: number;
}

export interface EncoderComparison {
  arraysCompared: number;
  json: EncoderSize;
  gcf: EncoderSize;
  toon: EncoderSize;
  toonAvailable: boolean;
  winner: "gcf" | "toon" | "json";
}

// ── Preview API response ──────────────────────────────────────────────────

export interface PreviewResponse {
  original: string;
  compressed: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPct: number;
  mode: string;
  durationMs?: number;
  engineBreakdown: CompressionEngineStep[];
  diff: DiffSegment[];
  preservedBlocks: Array<{ kind: string; preview: string }>;
  ruleRemovals: string[];
  encoderComparison?: EncoderComparison | null;
}

// ── Run Model ─────────────────────────────────────────────────────────────

export interface CompressionRunModel {
  requestId: string;
  comboId: string | null;
  mode: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  steps: CompressionEngineStep[];
  timestamp: number;
  diff?: DiffSegment[];
  encoderComparison?: EncoderComparison | null;
}

// ── previewToRunModel ─────────────────────────────────────────────────────

export function previewToRunModel(res: PreviewResponse, label: string): CompressionRunModel {
  return {
    requestId: `preview-${label}`,
    comboId: null,
    mode: res.mode,
    originalTokens: res.originalTokens,
    compressedTokens: res.compressedTokens,
    savingsPercent: res.savingsPct,
    steps: res.engineBreakdown,
    timestamp: 0,
    diff: res.diff,
    encoderComparison: res.encoderComparison ?? null,
  };
}

// ── compressionEventToModel ───────────────────────────────────────────────

/**
 * Build a `CompressionRunModel` from a `compression.completed` WS payload.
 */
export function compressionEventToModel(payload: CompressionCompletedPayload): CompressionRunModel {
  const steps: CompressionEngineStep[] = payload.engineBreakdown.map((entry) => ({
    engine: entry.engine,
    originalTokens: entry.originalTokens,
    compressedTokens: entry.compressedTokens,
    savingsPercent: entry.savingsPercent,
    techniquesUsed: entry.techniquesUsed,
    rulesApplied: entry.rulesApplied,
    durationMs: entry.durationMs,
  }));

  return {
    requestId: payload.requestId,
    comboId: payload.comboId,
    mode: payload.mode,
    originalTokens: payload.originalTokens,
    compressedTokens: payload.compressedTokens,
    savingsPercent: payload.savingsPercent,
    steps,
    timestamp: payload.timestamp,
  };
}

// ── Live step streaming (F3.3) ────────────────────────────────────────────

/**
 * Build a partial `CompressionRunModel` from the per-engine `compression.step` events received
 * so far. Run-level totals span the whole pipeline: input = first step's input, output = last
 * step's output. Used to render the live in-flight run before `compression.completed` arrives.
 */
export function stepEventsToRunModel(steps: CompressionStepPayload[]): CompressionRunModel {
  const first = steps[0];
  const last = steps[steps.length - 1];
  const originalTokens = first?.originalTokens ?? 0;
  const compressedTokens = last?.compressedTokens ?? originalTokens;
  const savingsPercent =
    originalTokens > 0
      ? Math.round(((originalTokens - compressedTokens) / originalTokens) * 100)
      : 0;
  return {
    requestId: first?.requestId ?? "",
    comboId: first?.comboId ?? null,
    mode: first?.mode ?? "stacked",
    originalTokens,
    compressedTokens,
    savingsPercent,
    steps: steps.map((s) => ({
      engine: s.engine,
      originalTokens: s.originalTokens,
      compressedTokens: s.compressedTokens,
      savingsPercent: s.savingsPercent,
      techniquesUsed: s.techniquesUsed ?? [],
      rulesApplied: s.rulesApplied,
      durationMs: s.durationMs,
    })),
    timestamp: last?.timestamp ?? 0,
  };
}

/** A single in-flight (still-streaming) compression run, keyed by requestId. */
export interface InFlightCompressionRun {
  requestId: string;
  steps: CompressionStepPayload[];
}

/** Append a step to the in-flight run; a new requestId starts a fresh run (latest wins). */
export function appendInFlightStep(
  state: InFlightCompressionRun | null,
  step: CompressionStepPayload
): InFlightCompressionRun {
  if (state && state.requestId === step.requestId) {
    return { requestId: state.requestId, steps: [...state.steps, step] };
  }
  return { requestId: step.requestId, steps: [step] };
}

/** Clear the in-flight run when its run completes (otherwise leave it untouched). */
export function clearInFlightOnComplete(
  state: InFlightCompressionRun | null,
  completedRequestId: string
): InFlightCompressionRun | null {
  return state && state.requestId === completedRequestId ? null : state;
}

// ── compressionRunToFlow ──────────────────────────────────────────────────

/**
 * Produce a left→right ReactFlow graph from a `CompressionRunModel`.
 *
 * Layout: Input → [EngineStep × N] → Output
 * Nodes:  N + 2 total (input + N engine + output)
 * Edges:  N + 1 sequential connections
 */
export function compressionRunToFlow(model: CompressionRunModel): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const X_STEP = 200;

  // Input node
  const inputId = "input";
  nodes.push({
    id: inputId,
    type: "input",
    position: { x: 0, y: 0 },
    data: {
      label: `Input\n${model.originalTokens} tokens`,
      tokens: model.originalTokens,
    },
  });

  // Engine step nodes
  let prevId = inputId;
  for (let i = 0; i < model.steps.length; i++) {
    const step = model.steps[i];
    const nodeId = `engine-${i}`;
    nodes.push({
      id: nodeId,
      type: "engine",
      position: { x: (i + 1) * X_STEP, y: 0 },
      data: {
        engine: step.engine,
        originalTokens: step.originalTokens,
        compressedTokens: step.compressedTokens,
        savingsPercent: step.savingsPercent,
        techniquesUsed: step.techniquesUsed,
        rulesApplied: step.rulesApplied,
        durationMs: step.durationMs,
        label: step.engine,
      },
    });
    edges.push({
      id: `e-${prevId}-${nodeId}`,
      source: prevId,
      target: nodeId,
    });
    prevId = nodeId;
  }

  // Output node
  const outputId = "output";
  nodes.push({
    id: outputId,
    type: "output",
    position: { x: (model.steps.length + 1) * X_STEP, y: 0 },
    data: {
      label: `Output\n${model.compressedTokens} tokens`,
      tokens: model.compressedTokens,
      savingsPercent: model.savingsPercent,
    },
  });
  edges.push({
    id: `e-${prevId}-${outputId}`,
    source: prevId,
    target: outputId,
  });

  return { nodes, edges };
}

// ── buildReplayFrames ─────────────────────────────────────────────────────

/**
 * Build progressive replay frames from a `CompressionRunModel`.
 *
 * Returns an array of N frames (where N = model.steps.length).
 * Frame[i] contains steps[0..i] — i.e., the state after applying i+1 engines.
 * Each frame is a self-contained `CompressionRunModel` snapshot.
 *
 * Intended for animated step-by-step replay in the UI: since compression is
 * sub-ms synchronous, "real-time" in the studio means replaying from a single
 * `compression.completed` event.
 */
export function buildReplayFrames(model: CompressionRunModel): CompressionRunModel[] {
  if (model.steps.length === 0) return [];

  return model.steps.map((_, i) => {
    const slicedSteps = model.steps.slice(0, i + 1);
    const lastStep = slicedSteps[slicedSteps.length - 1];
    // compressedTokens at this frame = output of the last applied engine
    const compressedTokens = lastStep.compressedTokens;
    const savingsPercent =
      model.originalTokens > 0
        ? ((model.originalTokens - compressedTokens) / model.originalTokens) * 100
        : 0;

    return {
      requestId: model.requestId,
      comboId: model.comboId,
      mode: model.mode,
      originalTokens: model.originalTokens,
      compressedTokens,
      savingsPercent,
      steps: [...slicedSteps],
      timestamp: model.timestamp,
    };
  });
}
