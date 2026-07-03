// Pure model-mapping / thinking-effort resolution for the ChatGPT-web executor.
// Extracted verbatim from chatgpt-web.ts (static maps + pure resolvers, no state).

export const MODEL_MAP: Record<string, string> = {
  // ChatGPT backend slugs are also accepted directly for power users / tests.
  "gpt-5-5-pro": "gpt-5-5-pro",
  "gpt-5-5-pro-extended": "gpt-5-5-pro",
  "gpt-5-5-thinking": "gpt-5-5-thinking",
  "gpt-5-5": "gpt-5-5",
  "gpt-5-4-pro": "gpt-5-4-pro",
  "gpt-5-4-thinking": "gpt-5-4-thinking",
  "gpt-5-4-t-mini": "gpt-5-4-t-mini",
  "gpt-5-3": "gpt-5-3",
  "gpt-5-3-mini": "gpt-5-3-mini",

  // Public OmniRoute dot-form ids exposed by the provider catalog.
  "gpt-5.5-pro": "gpt-5-5-pro",
  "gpt-5.5-pro-extended": "gpt-5-5-pro",
  "gpt-5.5-thinking": "gpt-5-5-thinking",
  "gpt-5.5": "gpt-5-5",
  "gpt-5.4-pro": "gpt-5-4-pro",
  "gpt-5.4-thinking": "gpt-5-4-thinking",
  "gpt-5.4-thinking-mini": "gpt-5-4-t-mini",
  "gpt-5.3-instant": "gpt-5-3-instant",
  "gpt-5.3": "gpt-5-3",
  "gpt-5.3-mini": "gpt-5-3-mini",
  o3: "o3",
};

export const MODEL_FORCED_EFFORT: Record<string, "standard" | "extended"> = {
  "gpt-5-5-pro": "standard",
  "gpt-5-5-pro-extended": "extended",
  "gpt-5.5-pro": "standard",
  "gpt-5.5-pro-extended": "extended",
};

/** Set of chatgpt.com slugs that the user_last_used_model_config endpoint
 * accepts a `thinking_effort` value for, derived from MODEL_MAP so adding a
 * new thinking entry there automatically extends this set. Includes the
 * abbreviated slug `gpt-5-4-t-mini` (no literal "thinking" substring) — the
 * reason this set exists at all rather than a substring match.
 *
 * Derived from MODEL_MAP keys (always dot-form) that contain "thinking" or
 * are the `o3` reasoning model; the values are the chatgpt.com-side slugs. */
export const THINKING_CAPABLE_SLUGS: ReadonlySet<string> = new Set(
  Object.entries(MODEL_MAP)
    .filter(([k]) => k.includes("thinking") || k === "o3")
    .map(([, v]) => v)
);

/** chatgpt.com only exposes the thinking-effort toggle on dedicated thinking
 * models and the o-series. PATCHing for a non-thinking surface is a no-op
 * (the server accepts it but the routing-time read picks the wrong knob).
 *
 * Three branches because the input can arrive in three shapes:
 *   1. OmniRoute dot-form id (`gpt-5.4-thinking-mini`) — every thinking
 *      variant carries the literal "thinking" substring here.
 *   2. Resolved chatgpt.com slug containing "thinking" (`gpt-5-5-thinking`).
 *   3. Resolved chatgpt.com slug that drops the substring under abbreviation
 *      (`gpt-5-4-t-mini`). Looked up via THINKING_CAPABLE_SLUGS, which is
 *      derived from MODEL_MAP itself so adding a new abbreviated thinking
 *      mapping automatically extends the check.
 *
 * Branch 3 also catches the case where a caller passes the chatgpt.com slug
 * directly as the `model` field (no MODEL_MAP translation needed), which
 * would otherwise silently bypass the PATCH. */
export function isThinkingCapableModel(modelId: string, slug: string): boolean {
  return (
    modelId.includes("thinking") ||
    modelId === "o3" ||
    slug.includes("thinking") ||
    THINKING_CAPABLE_SLUGS.has(slug) ||
    THINKING_CAPABLE_SLUGS.has(modelId)
  );
}

/** Map either a chatgpt.com-native value (`standard`/`extended`) or the
 * OpenAI Chat Completions `reasoning_effort` field to the value the
 * `user_last_used_model_config` endpoint expects.
 *
 *   minimal | low | medium | standard  → standard
 *   high    | xhigh | extended         → extended
 *
 * `medium` collapses to `standard` because chatgpt.com only has two levels —
 * there is no separate medium tier on the web product. Returns null for
 * absent/unknown inputs. */
export function normalizeThinkingEffort(input: unknown): "standard" | "extended" | null {
  if (typeof input !== "string") return null;
  const v = input.trim().toLowerCase();
  if (v === "extended" || v === "high" || v === "xhigh") return "extended";
  if (v === "standard" || v === "low" || v === "medium" || v === "minimal") {
    return "standard";
  }
  return null;
}

/** Resolve the requested effort for this turn.
 * Order: `providerSpecificData.thinkingEffort` (raw override, takes
 * `standard`/`extended` directly) > `body.reasoning_effort` (top-level OpenAI
 * Chat Completions field) > `body.reasoning.effort` (Responses-API nesting).
 * Returns null when the caller did not request one. */
export function resolveThinkingEffort(
  body: unknown,
  providerSpecificData: Record<string, unknown> | undefined
): "standard" | "extended" | null {
  if (providerSpecificData && providerSpecificData.thinkingEffort !== undefined) {
    return normalizeThinkingEffort(providerSpecificData.thinkingEffort);
  }
  const b = (body as Record<string, unknown> | null) ?? null;
  if (!b) return null;
  const top = normalizeThinkingEffort(b.reasoning_effort);
  if (top) return top;
  const nested = (b.reasoning as Record<string, unknown> | undefined)?.effort;
  return normalizeThinkingEffort(nested);
}

export interface ResolvedChatGptModel {
  slug: string;
  effort: "standard" | "extended" | null;
  isPro: boolean;
}

export function resolveChatGptModel(
  model: string,
  body: unknown,
  providerSpecificData: Record<string, unknown> | undefined
): ResolvedChatGptModel {
  const slug = MODEL_MAP[model] ?? model;
  const forcedEffort = MODEL_FORCED_EFFORT[model] ?? null;
  const effort = forcedEffort ?? resolveThinkingEffort(body, providerSpecificData);
  const isPro = slug === "gpt-5-5-pro";
  return { slug, effort, isPro };
}
