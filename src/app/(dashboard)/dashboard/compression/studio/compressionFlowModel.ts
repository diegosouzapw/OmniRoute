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
import type { CompressionCompletedPayload } from "@/lib/events/types";

// ── Engine Step ───────────────────────────────────────────────────────────

export interface CompressionEngineStep {
  engine: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  rulesApplied?: string[];
  durationMs?: number;
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
