/**
 * TypeSafe AI (Jev / System One) — non-chat evaluation provider.
 *
 * Jev does not generate text. Clients POST a `state` plus typed questions to
 * `/v1/systemone` and get structured answers plus `usage`. Pricing is input
 * tokens only ($0.042 / Mtok); output tokens are free.
 */

export const TYPESAFE_PROVIDER_ID = "typesafe";
export const TYPESAFE_ALIAS = "typesafe";
export const TYPESAFE_BASE_URL = "https://api.typesafe.ai";
export const TYPESAFE_SYSTEMONE_PATH = "/v1/systemone";
export const TYPESAFE_SYSTEMONE_URL = `${TYPESAFE_BASE_URL}${TYPESAFE_SYSTEMONE_PATH}`;
export const TYPESAFE_MODELS_URL = `${TYPESAFE_BASE_URL}/v1/models`;

/** Input-only list price for Jev 1.13 ($/million tokens). Output is free. */
export const JEV_INPUT_USD_PER_MTOK = 0.042;

export const JEV_ALIAS_MODELS = ["jev-latest", "jev-preview"] as const;
export const JEV_DEFAULT_MODEL = "jev-latest";

export const TYPESAFE_CLASSIFIER_TIMEOUT_MS = 2000;
export const TYPESAFE_DEFAULT_CONFIDENCE_THRESHOLD = 0.5;

const JEV_ID_RE = /^jev-[a-z0-9]+(?:[.-][a-z0-9]+)*$/i;

export function stripTypesafeModelPrefix(model: string): string {
  const trimmed = model.trim();
  const prefix = `${TYPESAFE_PROVIDER_ID}/`;
  if (trimmed.toLowerCase().startsWith(prefix)) {
    return trimmed.slice(prefix.length);
  }
  return trimmed;
}

export function isTypesafeJevModelId(model: string): boolean {
  return JEV_ID_RE.test(stripTypesafeModelPrefix(model));
}

export const JEV_DEFAULT_PRICING = {
  input: JEV_INPUT_USD_PER_MTOK,
  output: 0,
  cached: JEV_INPUT_USD_PER_MTOK,
  reasoning: 0,
  cache_creation: JEV_INPUT_USD_PER_MTOK,
} as const;
