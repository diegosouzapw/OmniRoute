/**
 * TypeSafe System One client — typed evaluation against api.typesafe.ai.
 *
 * Used by the jev combo strategy (#15276) to ask Jev which configured model
 * should handle a request. Not a chat executor: System One answers noul /
 * choice / score questions and returns calibrated probabilities.
 *
 * Docs: https://docs.typesafe.ai/api
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";

export const TYPESAFE_PROVIDER_ID = "typesafe";
export const TYPESAFE_SYSTEM_ONE_BASE_URL = "https://api.typesafe.ai";
export const TYPESAFE_SYSTEM_ONE_PATH = "/v1/systemone";
export const TYPESAFE_DEFAULT_MODEL = "jev-latest";

/** Hard ceiling so a hung TypeSafe call cannot stall combo dispatch. */
export const TYPESAFE_SYSTEM_ONE_TIMEOUT_MS = 8_000;
/** TypeSafe choice questions accept at most 255 options. */
export const TYPESAFE_MAX_CHOICE_OPTIONS = 255;
/** Cap on `state` so a long transcript cannot be forwarded wholesale. */
export const TYPESAFE_MAX_STATE_CHARS = 8_000;

type FetchLike = typeof fetch;

export type SystemOneChoiceCriteria = Readonly<Record<string, string | null>>;

export type SystemOneChoiceSuccess = {
  ok: true;
  choice: string;
  probabilities: Record<string, number>;
  confidence: number;
  model: string | null;
  inputTokens: number | null;
  outputTokens: number | null;
};

export type SystemOneUnavailableReason =
  | "missing_api_key"
  | "empty_criteria"
  | "timeout"
  | "http_error"
  | "invalid_response"
  | "network_error";

export type SystemOneChoiceUnavailable = {
  ok: false;
  reason: SystemOneUnavailableReason;
  status: number | null;
  /** Sanitized, safe to log or put in a decision-trace detail field. */
  detail: string;
};

export type SystemOneChoiceResult = SystemOneChoiceSuccess | SystemOneChoiceUnavailable;

export type EvaluateSystemOneChoiceOptions = {
  apiKey: string | null | undefined;
  state: string;
  criteria: SystemOneChoiceCriteria;
  /** Defaults to a routing-oriented instruction. */
  instructions?: string;
  model?: string;
  timeoutMs?: number;
  fetchImpl?: FetchLike;
  baseUrl?: string;
  /** Aborted when the caller cancels; combined with the timeout. */
  signal?: AbortSignal | null;
};

const DEFAULT_INSTRUCTIONS =
  "Which of these configured models is the most appropriate for this request?";

function unavailable(
  reason: SystemOneUnavailableReason,
  detail: string,
  status: number | null = null
): SystemOneChoiceUnavailable {
  return {
    ok: false,
    reason,
    status,
    detail: sanitizeErrorMessage(detail) || reason,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toFiniteNumber(value: unknown): number | null {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : null;
}

function parseProbabilities(value: unknown): Record<string, number> | null {
  if (!isRecord(value)) return null;
  const out: Record<string, number> = {};
  for (const [key, raw] of Object.entries(value)) {
    const n = toFiniteNumber(raw);
    if (n === null || n < 0) return null;
    out[key] = n;
  }
  return out;
}

/**
 * Parse a System One response body into a choice result. Pure — no I/O.
 * Exported for unit tests.
 */
export function parseSystemOneChoiceResponse(body: unknown): SystemOneChoiceResult {
  if (!isRecord(body)) {
    return unavailable("invalid_response", "System One response was not a JSON object");
  }

  const answers = body.answers;
  if (!isRecord(answers)) {
    return unavailable("invalid_response", "System One response missing answers");
  }

  const route = answers.route;
  if (!isRecord(route)) {
    return unavailable("invalid_response", "System One response missing answers.route");
  }

  if (route.type !== "choice") {
    return unavailable(
      "invalid_response",
      `System One answers.route.type was ${String(route.type)}, expected choice`
    );
  }

  const choice = typeof route.choice === "string" ? route.choice.trim() : "";
  if (!choice) {
    return unavailable("invalid_response", "System One choice answer had an empty choice");
  }

  const probabilities = parseProbabilities(route.probabilities);
  if (!probabilities) {
    return unavailable("invalid_response", "System One choice answer missing probabilities");
  }

  const confidence = toFiniteNumber(route.confidence);
  if (confidence === null || confidence < 0 || confidence > 1) {
    return unavailable("invalid_response", "System One choice answer missing confidence");
  }

  const usage = isRecord(body.usage) ? body.usage : null;
  return {
    ok: true,
    choice,
    probabilities,
    confidence,
    model: typeof body.model === "string" ? body.model : null,
    inputTokens: usage ? toFiniteNumber(usage.input_tokens) : null,
    outputTokens: usage ? toFiniteNumber(usage.output_tokens) : null,
  };
}

/**
 * Ask System One (Jev) to pick one option from `criteria`.
 *
 * Never throws. Missing key, timeout, HTTP errors, and malformed bodies all
 * return `{ ok: false, reason, ... }` so combo dispatch can fall open.
 */
export async function evaluateSystemOneChoice(
  options: EvaluateSystemOneChoiceOptions
): Promise<SystemOneChoiceResult> {
  const apiKey = typeof options.apiKey === "string" ? options.apiKey.trim() : "";
  if (!apiKey) {
    return unavailable("missing_api_key", "No TypeSafe API key configured");
  }

  const criteriaEntries = Object.entries(options.criteria || {}).filter(
    ([key]) => typeof key === "string" && key.trim().length > 0
  );
  if (criteriaEntries.length === 0) {
    return unavailable("empty_criteria", "System One choice requires at least one criterion");
  }
  if (criteriaEntries.length > TYPESAFE_MAX_CHOICE_OPTIONS) {
    return unavailable(
      "invalid_response",
      `System One choice accepts at most ${TYPESAFE_MAX_CHOICE_OPTIONS} options`
    );
  }

  const criteria: Record<string, string | null> = {};
  for (const [key, value] of criteriaEntries) {
    criteria[key.trim()] =
      typeof value === "string"
        ? value
        : value === null || value === undefined
          ? null
          : String(value);
  }

  const rawState = typeof options.state === "string" ? options.state : "";
  const state =
    rawState.length > TYPESAFE_MAX_STATE_CHARS
      ? rawState.slice(0, TYPESAFE_MAX_STATE_CHARS)
      : rawState;
  const instructions =
    typeof options.instructions === "string" && options.instructions.trim().length > 0
      ? options.instructions.trim()
      : DEFAULT_INSTRUCTIONS;
  const model =
    typeof options.model === "string" && options.model.trim().length > 0
      ? options.model.trim()
      : TYPESAFE_DEFAULT_MODEL;
  const timeoutMs =
    typeof options.timeoutMs === "number" &&
    Number.isFinite(options.timeoutMs) &&
    options.timeoutMs > 0
      ? options.timeoutMs
      : TYPESAFE_SYSTEM_ONE_TIMEOUT_MS;
  const baseUrl = (options.baseUrl || TYPESAFE_SYSTEM_ONE_BASE_URL).replace(/\/+$/, "");
  const fetchImpl = options.fetchImpl ?? fetch;

  if (options.signal?.aborted) {
    return unavailable("timeout", "System One call aborted before it started");
  }

  const controller = new AbortController();
  const onAbort = () => controller.abort();
  options.signal?.addEventListener("abort", onAbort, { once: true });
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(`${baseUrl}${TYPESAFE_SYSTEM_ONE_PATH}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        state,
        questions: {
          route: {
            type: "choice",
            instructions,
            criteria,
          },
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      // Status only. Upstream bodies can echo the state or the key.
      return unavailable(
        "http_error",
        `System One returned HTTP ${response.status}`,
        response.status
      );
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : "invalid JSON";
      return unavailable("invalid_response", `System One response was not JSON: ${message}`);
    }

    return parseSystemOneChoiceResponse(json);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return unavailable("timeout", `System One timed out after ${timeoutMs}ms`);
    }
    return unavailable("network_error", "System One request failed");
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", onAbort);
  }
}
