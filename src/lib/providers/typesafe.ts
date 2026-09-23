/**
 * TypeSafe AI System One provider constants and model normalization helpers.
 */

export const TYPESAFE_PROVIDER_ID = "typesafe";
export const TYPESAFE_BASE_URL = "https://api.typesafe.ai";
export const TYPESAFE_SYSTEMONE_PATH = "/v1/systemone";
export const TYPESAFE_MODELS_PATH = "/v1/models";
export const TYPESAFE_SYSTEMONE_URL = `${TYPESAFE_BASE_URL}${TYPESAFE_SYSTEMONE_PATH}`;
export const TYPESAFE_MODELS_URL = `${TYPESAFE_BASE_URL}${TYPESAFE_MODELS_PATH}`;

export const JEV_INPUT_USD_PER_MTOK = 0.042;
export const JEV_DEFAULT_MODEL = "jev-latest";

export const TYPESAFE_REQUEST_TIMEOUT_MS = 30_000;

const JEV_MODEL_ID = /^jev-[a-z0-9]+(?:[.-][a-z0-9]+)*$/i;

export function stripTypesafeModelPrefix(model: string): string {
  const value = model.trim();
  const prefix = `${TYPESAFE_PROVIDER_ID}/`;
  return value.toLowerCase().startsWith(prefix) ? value.slice(prefix.length) : value;
}

export function isTypesafeJevModelId(model: string): boolean {
  return JEV_MODEL_ID.test(stripTypesafeModelPrefix(model));
}

export function toTypesafePublicModelId(model: string): string {
  const upstreamModel = stripTypesafeModelPrefix(model);
  return `${TYPESAFE_PROVIDER_ID}/${upstreamModel}`;
}

export const JEV_DEFAULT_PRICING = {
  input: JEV_INPUT_USD_PER_MTOK,
  output: 0,
  cached: JEV_INPUT_USD_PER_MTOK,
  reasoning: 0,
  cache_creation: JEV_INPUT_USD_PER_MTOK,
} as const;
