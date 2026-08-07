/**
 * combo/pinValidation.ts — Capability-aware context-cache pin validation (PR2A).
 *
 * A session pin (session_model_history) is honored UNCONDITIONALLY today as long
 * as the pinned model is still a combo target and its provider is durably up
 * (see dispatchPrelude.tryPinnedModelDispatch). That leaves a real hole observed
 * on vivanta-ollama: a session pinned to qwen2.5vl:7b (toolCalling:false) kept
 * getting `400 does not support tools` on every tool-carrying turn — the 400 was
 * served straight from the pinned dispatch, never fell through to the strategy,
 * and the pin was never cleared. The session was stuck on a model that could not
 * serve it.
 *
 * This module validates the pin against the CURRENT request's requirements
 * BEFORE the body is rewritten, and drops the pin when it provably cannot serve
 * the request, so normal routing (which re-pins the winner) takes over.
 *
 * Rules (all fail-open toward KEEP when capability data is unknown, so a
 * pin is never dropped on a lack of metadata):
 *   1. tools   — request carries tools / tool_choice / tool results AND the
 *                pinned model is known to not support tool calls.
 *   2. vision  — request carries image content AND the pinned model is known to
 *                not support vision.
 *   3. context — combo config.minContextWindow is set AND the pinned model's
 *                known window is below it (mirrors applyContextRequirements).
 *   4. cooldown — pinned model is in a persisted adaptation cooldown (the combo
 *                itself would not route to it either — see applyAdaptationCooldown).
 *   5. learned — pinned model has meaningful request history AND its learned
 *                score is significantly worse than the best alternative with
 *                comparable history (quality degradation, not just infra).
 */

import { getResolvedModelCapabilities } from "../../../src/lib/modelCapabilities";
import { getComboAdaptationByModel } from "../../../src/lib/db/comboAdaptation";

/** Minimum request history before the learned-score rule may drop a pin. */
const MIN_LEARNED_REQUESTS = 3;
/** Learned-score gap below which the pinned model is considered "significantly worse". */
const LEARNED_GAP_DEFAULT = 0.3;

export interface PinValidationInput {
  /** Full provider-prefixed model string, e.g. "ollama-local/qwen2.5vl:7b". */
  pinnedModel: string;
  comboName: string;
  /** The incoming chat-completions body (OpenAI- or Claude-format). */
  body: Record<string, unknown>;
  /** Combo-level minimum context window from config (0/none = no constraint). */
  minContextWindow?: number;
  now?: number;
}

export interface PinValidationResult {
  keep: boolean;
  reason: string | null;
}

/**
 * True when the request asks for tool-calling capability: a non-empty `tools`
 * array, an explicit `tool_choice`, or a trailing message of role `tool`
 * (i.e. the model must handle tool results on this turn).
 */
export function requestHasTools(body: Record<string, unknown>): boolean {
  if (!body || typeof body !== "object") return false;
  if (Array.isArray(body.tools) && body.tools.length > 0) return true;
  if (body.tool_choice) return true;
  const messages = Array.isArray(body.messages)
    ? (body.messages as unknown[])
    : Array.isArray(body.input)
      ? (body.input as unknown[])
      : [];
  for (const message of messages) {
    if (message && typeof message === "object") {
      if ((message as Record<string, unknown>).role === "tool") return true;
    }
  }
  return false;
}

/** True when the request carries image content in any message part. */
export function requestHasImages(body: Record<string, unknown>): boolean {
  if (!body || typeof body !== "object") return false;
  const messages = Array.isArray(body.messages)
    ? (body.messages as unknown[])
    : Array.isArray(body.input)
      ? (body.input as unknown[])
      : [];
  for (const message of messages) {
    if (!message || typeof message !== "object") continue;
    const content = (message as Record<string, unknown>).content;
    if (typeof content === "string") continue;
    if (Array.isArray(content)) {
      for (const part of content) {
        if (part && typeof part === "object") {
          const type = (part as Record<string, unknown>).type;
          if (type === "image_url" || type === "image" || type === "input_image") return true;
        }
      }
    }
  }
  return false;
}

function resolveCapabilities(pinnedModel: string): {
  toolCalling: boolean | null;
  supportsVision: boolean | null;
  contextWindow: number | null;
} {
  try {
    const caps = getResolvedModelCapabilities(pinnedModel);
    return {
      toolCalling: typeof caps.toolCalling === "boolean" ? caps.toolCalling : null,
      supportsVision: typeof caps.supportsVision === "boolean" ? caps.supportsVision : null,
      contextWindow:
        typeof caps.contextWindow === "number" && caps.contextWindow > 0
          ? caps.contextWindow
          : null,
    };
  } catch {
    // Capability lookup must never drop a pin on a metadata error.
    return { toolCalling: null, supportsVision: null, contextWindow: null };
  }
}

/**
 * Decide whether the existing session pin can still serve the incoming request.
 * Pure decision + a synchronous DB read (adaptation state) — safe to call from
 * the combo setup hot path. Fail-open: unknown capability ⇒ keep the pin.
 */
export function validatePinnedModelForRequest(input: PinValidationInput): PinValidationResult {
  const { pinnedModel, comboName, body, minContextWindow } = input;
  const now = input.now ?? Date.now();

  const cap = resolveCapabilities(pinnedModel);

  if (requestHasTools(body) && cap.toolCalling === false) {
    return {
      keep: false,
      reason: `pinned model ${pinnedModel} does not support tool calls (request includes tools)`,
    };
  }
  if (requestHasImages(body) && cap.supportsVision === false) {
    return {
      keep: false,
      reason: `pinned model ${pinnedModel} does not support vision (request includes images)`,
    };
  }
  if (
    typeof minContextWindow === "number" &&
    minContextWindow > 0 &&
    cap.contextWindow !== null &&
    cap.contextWindow < minContextWindow
  ) {
    return {
      keep: false,
      reason: `pinned model ${pinnedModel} context window ${cap.contextWindow} < combo minContextWindow ${minContextWindow}`,
    };
  }

  // Adaptation-backed rules (cooldown + learned score). Fail-open when the table
  // is unavailable or the model has no row (first-use pin is never dropped here).
  let adaptation: Map<
    string,
    { cooldownUntil: string | null; learnedScore: number | null; requestCount: number }
  > | null = null;
  try {
    adaptation = getComboAdaptationByModel(comboName);
  } catch {
    adaptation = new Map();
  }
  const pinnedState = adaptation.get(pinnedModel);

  if (pinnedState?.cooldownUntil) {
    const until = Date.parse(pinnedState.cooldownUntil);
    if (Number.isFinite(until) && until > now) {
      return {
        keep: false,
        reason: `pinned model ${pinnedModel} is in adaptation cooldown until ${new Date(until).toISOString()}`,
      };
    }
  }

  const minRequests =
    Number.parseInt(process.env.PIN_DROP_LEARNED_MIN_REQUESTS || "", 10) || MIN_LEARNED_REQUESTS;
  const learnedGap =
    Number.parseFloat(process.env.PIN_DROP_LEARNED_GAP || "") || LEARNED_GAP_DEFAULT;

  if (
    pinnedState &&
    pinnedState.requestCount >= minRequests &&
    typeof pinnedState.learnedScore === "number" &&
    Number.isFinite(pinnedState.learnedScore)
  ) {
    let bestAlternativeScore: number | null = null;
    for (const [modelStr, state] of adaptation) {
      if (modelStr === pinnedModel) continue;
      if (state.requestCount < minRequests) continue;
      if (typeof state.learnedScore !== "number" || !Number.isFinite(state.learnedScore)) continue;
      if (bestAlternativeScore === null || state.learnedScore > bestAlternativeScore) {
        bestAlternativeScore = state.learnedScore;
      }
    }
    if (
      bestAlternativeScore !== null &&
      pinnedState.learnedScore + learnedGap < bestAlternativeScore
    ) {
      return {
        keep: false,
        reason: `pinned model ${pinnedModel} learned score ${pinnedState.learnedScore.toFixed(2)} significantly worse than best alternative ${bestAlternativeScore.toFixed(2)}`,
      };
    }
  }

  return { keep: true, reason: null };
}
