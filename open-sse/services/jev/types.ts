/**
 * Jev (TypeSafe System One) decision-layer types.
 *
 * Jev is a small typed decision model: callers submit a `state` plus a set of
 * atomic questions and receive calibrated probabilities / labels back, instead
 * of prose. Answers are typed by question shape:
 *   - `noul`   → `noul` probability in [0, 1] (yes/no)
 *   - `choice` → one label + confidence + full probability distribution
 *   - `score`  → an ordered-category magnitude + legend + distribution
 *
 * The wire format mirrors the TypeSafe `/v1/systemone` API exactly.
 */

export type JevQuestion =
  | { type: "noul"; instructions: string; criteria?: { true?: string; false?: string } }
  | { type: "choice"; instructions: string; criteria: Record<string, string> }
  | { type: "score"; instructions: string; criteria: string[] };

export type JevAnswer =
  | { type: "choice"; choice: string; confidence: number; probabilities: Record<string, number> }
  | {
      type: "score";
      score: number;
      confidence: number;
      legend: Record<string, string>;
      probabilities: Record<string, number>;
    }
  | { type: "noul"; noul: number };

export interface JevUsage {
  inputTokens?: number;
  outputTokens?: number;
  costUsd?: number;
  [key: string]: unknown;
}

export interface JevResult {
  /** Resolved decision model (from the API response when present). */
  model: string;
  answers: Record<string, JevAnswer>;
  usage?: JevUsage;
  /** True when served from the in-process answer cache (no network call). */
  cached: boolean;
  latencyMs: number;
}

/**
 * Feature lanes gated by `OMNIROUTE_JEV_FEATURES`. Each lane wires Jev into a
 * different decision surface; a lane is inert when the master switch is off,
 * when it is excluded from the feature list, or when no credential resolves.
 */
export type JevFeature =
  "routing" | "compression" | "mcp" | "tool_search" | "cache" | "keepalive" | "tool_loop";

/**
 * Structural logger slice accepted by the Jev helpers. OmniRoute request-scoped
 * loggers (`log.debug(tag, message, meta)`) and the module logger both satisfy
 * it; callers may pass `null` to stay silent.
 */
export interface JevLogger {
  debug?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
  info?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
  warn?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
  error?: (tag: string, message: string, meta?: Record<string, unknown> | null) => void;
}

/**
 * Header stamped on every classifier request. The gateway's decision lanes skip
 * requests carrying it, so a classifier pointed at OmniRoute's own gateway
 * cannot classify its own classification calls.
 */
export const DECISION_MODEL_REQUEST_HEADER = "x-omniroute-decision-model";
