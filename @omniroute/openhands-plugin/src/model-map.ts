/**
 * OpenHands → OmniRoute model mapping.
 *
 * OpenHands sends `model: "<LLM_MODEL>"` and expects the OpenAI-compatible
 * endpoint to accept that exact string. OmniRoute uses provider-prefixed
 * model IDs (`ds/deepseek-v4-flash`) and combo names. This module maps
 * common OpenHands-friendly names to the OmniRoute model/combo they should
 * resolve to, and back-fills the `LLM_MODEL` value for OpenHands.
 */

export interface OpenHandsModelMap {
  /** OpenHands-friendly model name (e.g. "deepseek-chat") */
  [openHandsName: string]: string;
}

/**
 * Default mapping for the model names OpenHands and the broader ecosystem
 * commonly send. Values are OmniRoute model IDs or combo names. Extend or
 * override via {@link resolveOpenHandsModel}.
 */
export const DEFAULT_OPENHANDS_MODEL_MAP: OpenHandsModelMap = Object.freeze({
  // DeepSeek
  "deepseek-chat": "ds/deepseek-v4-flash",
  "deepseek-reasoner": "ds/deepseek-v4-pro",
  // Claude / Anthropic
  "claude-sonnet-4.5": "anthropic/claude-sonnet-4.5",
  "claude-opus-4.1": "anthropic/claude-opus-4.1",
  "claude-haiku-4.5": "anthropic/claude-haiku-4.5",
  // GPT / OpenAI
  "gpt-4o": "openai/gpt-4o",
  "gpt-4o-mini": "openai/gpt-4o-mini",
  "gpt-5": "openai/gpt-5",
  // Gemini
  "gemini-2.5-flash": "gemini/gemini-2.5-flash",
  "gemini-2.5-pro": "gemini/gemini-2.5-pro",
  // GLM / Z.AI (NVIDIA NIM free endpoint)
  "glm-5.2": "nvidia/z-ai/glm-5.2",
});

/**
 * Resolve the OmniRoute model ID for an OpenHands-friendly model name.
 * Returns the input unchanged when no mapping exists (OmniRoute will try to
 * resolve it as a literal model/combo).
 */
export function resolveOpenHandsModel(
  openHandsModel: string,
  map: OpenHandsModelMap = DEFAULT_OPENHANDS_MODEL_MAP
): string {
  if (!openHandsModel) return openHandsModel;
  const mapped = map[openHandsModel];
  return mapped ?? openHandsModel;
}

/**
 * Build the `LLM_MODEL` value for OpenHands from an OmniRoute model ID/combo.
 *
 * OpenHands only surfaces the literal `LLM_MODEL` string in its UI, so for
 * OmniRoute combos (e.g. "vivanta-core") that's already the right value.
 * For provider-prefixed IDs, we return them as-is — the OmniRoute Model
 * Alias Resolver accepts both the raw ID and aliases on the `/v1` endpoint.
 */
export function buildOpenHandsModel(omnirouteModelOrCombo: string): string {
  return omnirouteModelOrCombo;
}
