/**
 * Muse Code request/URL tweaks for DefaultExecutor (extracted from default.ts).
 */

import { getModelTargetFormat } from "../../config/providerModels.ts";
import { MUSE_SPARK_MIN_OUTPUT_TOKENS } from "../opencodeMuseSpark.ts";

/**
 * A Responses-format model (registry targetFormat, e.g. muse-code) carries a Responses body;
 * sending it to /chat/completions fails upstream with "unknown parameter `input`". Keep the
 * URL in lockstep with the body.
 */
export function responsesUrlForModel(chatUrl: string, provider: string, model: string) {
  return getModelTargetFormat(provider, model) === "openai-responses"
    ? chatUrl.replace(/\/chat\/completions\/?$/, "/responses")
    : chatUrl;
}

/**
 * Muse spends the whole budget on hidden reasoning before any text: a tiny caller budget
 * (health probes send 16–32) ends `response.incomplete` + `response.failed` "Provider returned
 * empty content" → 502 and a model lockout. Same floor as the opencode muse-spark path; larger
 * budgets and unset budgets are untouched.
 */
export function floorMuseOutputTokens<T>(body: T): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const record = { ...(body as Record<string, unknown>) };
  for (const field of ["max_output_tokens", "max_tokens"] as const) {
    const value = record[field];
    if (typeof value === "number" && value < MUSE_SPARK_MIN_OUTPUT_TOKENS) {
      record[field] = MUSE_SPARK_MIN_OUTPUT_TOKENS;
    }
  }
  return record as T;
}
