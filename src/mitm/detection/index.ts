/**
 * Detection dispatcher.
 *
 * `detectAgent(id)` returns whether the given AgentBridge target is installed
 * on the current machine. All detection probes are filesystem-only — they
 * never spawn shells or interpolate runtime paths (Hard Rule #13).
 *
 * Trae is intentionally absent from the dispatch table: its viability is still
 * under investigation, so callers receive `{ installed: false }` until the
 * upstream surface is confirmed (see `targets/trae.ts`).
 */
import type { AgentId, DetectionResult } from "../types";
import { detectAntigravity } from "./antigravity";
import { detectKiro } from "./kiro";
import { detectCopilot } from "./copilot";
import { detectCodex } from "./codex";
import { detectCursor } from "./cursor";
import { detectZed } from "./zed";
import { detectClaudeCode } from "./claudeCode";
import { detectOpenCode } from "./openCode";

export const DETECTORS: Record<AgentId, () => DetectionResult> = {
  antigravity: detectAntigravity,
  kiro: detectKiro,
  copilot: detectCopilot,
  codex: detectCodex,
  cursor: detectCursor,
  zed: detectZed,
  "claude-code": detectClaudeCode,
  "open-code": detectOpenCode,
  trae: () => ({ installed: false }),
};

export function detectAgent(id: AgentId): DetectionResult {
  const fn = DETECTORS[id];
  if (!fn) return { installed: false };
  try {
    return fn();
  } catch {
    return { installed: false };
  }
}

export {
  detectAntigravity,
  detectKiro,
  detectCopilot,
  detectCodex,
  detectCursor,
  detectZed,
  detectClaudeCode,
  detectOpenCode,
};
