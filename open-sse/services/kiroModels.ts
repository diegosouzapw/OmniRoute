/**
 * Kiro (AWS CodeWhisperer / Amazon Q) live model discovery.
 *
 * Kiro's model catalog is per-account / per-tier — the free tier, Pro, Pro+ and
 * Power plans expose different model sets, and AWS IAM Identity Center (enterprise)
 * orgs further restrict it to an admin-curated "approved models" list. The Kiro
 * IDE populates its model picker from the Kiro control plane, with the legacy
 * Amazon Q endpoint retained as a compatibility fallback:
 *
 *   GET https://management.{region}.kiro.dev/List-Available-Models?origin=AI_EDITOR
 *   Authorization: Bearer <accessToken>
 *   → { models: [ { modelId, modelName?, tokenLimits?: { maxInputTokens } }, ... ] }
 *
 * This works for both "simple" Builder ID / social logins and AWS IAM Identity
 * Center accounts:
 *   - `origin=AI_EDITOR` alone is used when the connection has no profile ARN.
 *   - `profileArn` is sent on the first request when the IDE persisted one.
 *   - The endpoint is region-matched (IdC tokens are region-bound, e.g.
 *     eu-central-1) with a us-east-1 fallback (the legacy CodeWhisperer home region).
 *
 * A safe fallback to the static registry catalog is preserved so model import
 * never breaks when the account is offline / unauthenticated / token-expired.
 */

import { createHash } from "node:crypto";

import { v4 as uuidv4 } from "uuid";

import { buildKiroClientHeaders } from "./kiroClientProfile.ts";
import { resolveKiroRuntimeRegion } from "./kiroRegion.ts";

type RawRecord = Record<string, unknown>;

const CACHE_TTL_MS = 5 * 60 * 1000;

const catalogCache = new Map<string, { expiresAt: number; models: KiroModel[] }>();

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toPositiveNumber(value: unknown): number | undefined {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export type KiroModel = {
  id: string;
  name: string;
  owned_by: string;
  contextLength?: number;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  rateMultiplier?: number;
  description?: string;
};

export type KiroModelsResult = {
  models: KiroModel[];
  /** "api" = live discovery; "fallback" = static catalog (offline/unauthed/error). */
  source: "api" | "fallback";
};

/**
 * Parse a CodeWhisperer `ListAvailableModels` response into managed model rows.
 * Only ids present in the live response are returned, which gives the exact
 * per-account / per-tier entitlement filtering.
 */
export function parseKiroModels(data: unknown): KiroModel[] {
  const payload = asRecord(data);
  const items = Array.isArray(payload.models)
    ? (payload.models as unknown[])
    : Array.isArray(payload.availableModels)
      ? (payload.availableModels as unknown[])
      : [];

  const seen = new Set<string>();
  const models: KiroModel[] = [];

  for (const value of items) {
    const item = asRecord(value);
    const id = toNonEmptyString(item.modelId) || toNonEmptyString(item.id);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const name = toNonEmptyString(item.modelName) || toNonEmptyString(item.name) || id;
    const tokenLimits = asRecord(item.tokenLimits);
    const inputTokenLimit = toPositiveNumber(tokenLimits.maxInputTokens);
    const outputTokenLimit = toPositiveNumber(tokenLimits.maxOutputTokens);
    const rateMultiplier = toPositiveNumber(item.rateMultiplier);
    const description = toNonEmptyString(item.description);
    models.push({
      id,
      name,
      owned_by: "kiro",
      ...(inputTokenLimit ? { contextLength: inputTokenLimit, inputTokenLimit } : {}),
      ...(outputTokenLimit ? { outputTokenLimit } : {}),
      ...(rateMultiplier ? { rateMultiplier } : {}),
      ...(description ? { description } : {}),
    });
  }

  return models;
}

/**
 * Derive the RUNTIME AWS region for a Kiro connection's model discovery. Delegates to the shared
 * resolver: the profileArn region wins (that is where the Q Developer profile + ListAvailableModels
 * live — us-east-1 / eu-central-1), then a valid stored profile region, else us-east-1. The IdC
 * token region (e.g. eu-north-1) is deliberately not used as a runtime region.
 */
export function resolveKiroRegion(providerSpecificData: unknown): string {
  return resolveKiroRuntimeRegion(
    asRecord(providerSpecificData) as { region?: unknown; profileArn?: unknown }
  );
}

/**
 * Build the ordered list of `ListAvailableModels` base URLs to try: the
 * region-matched Amazon Q host first, then the us-east-1 home region as a
 * fallback (CodeWhisperer's canonical region).
 */
export function buildKiroModelsEndpoints(region: string): string[] {
  const normalized = (toNonEmptyString(region) || "us-east-1").toLowerCase();
  const urls: string[] = [
    `https://management.${normalized}.kiro.dev/List-Available-Models`,
    `https://q.${normalized}.amazonaws.com/ListAvailableModels`,
  ];
  if (normalized !== "us-east-1") {
    urls.push("https://q.us-east-1.amazonaws.com/ListAvailableModels");
  }
  return urls;
}

export type FetchKiroModelsOptions = {
  /** Stored Kiro access token (Bearer). */
  accessToken: string | null | undefined;
  /** Connection providerSpecificData (region, profileArn). */
  providerSpecificData?: unknown;
  /** Injectable fetch (defaults to global fetch). */
  fetchImpl?: typeof fetch;
  /** Static catalog to fall back to when live discovery is unavailable. */
  fallbackModels?: Array<{ id: string; name?: string }>;
};

function toFallbackResult(
  fallbackModels: Array<{ id: string; name?: string }> | undefined
): KiroModelsResult {
  const models = (fallbackModels || [])
    .map((model) => {
      const id = toNonEmptyString(model.id);
      if (!id) return null;
      return {
        id,
        name: toNonEmptyString(model.name) || id,
        owned_by: "kiro",
      };
    })
    .filter((model): model is KiroModel => Boolean(model));
  return { models, source: "fallback" };
}

function buildKiroFingerprintHeaders(providerSpecificData: unknown, accessToken: string) {
  return {
    ...buildKiroClientHeaders(providerSpecificData, accessToken, "control-plane"),
    "amz-sdk-request": "attempt=1; max=1",
    "amz-sdk-invocation-id": uuidv4(),
    Accept: "application/json",
  };
}

function cacheKey(accessToken: string, providerSpecificData: unknown): string {
  const psd = asRecord(providerSpecificData);
  const seed =
    toNonEmptyString(psd.profileArn) ||
    toNonEmptyString(psd.clientId) ||
    accessToken ||
    "anonymous";
  return createHash("sha256").update(`kiro:${seed}`).digest("hex");
}

async function tryFetchModels(
  fetchImpl: typeof fetch,
  url: string,
  accessToken: string,
  providerSpecificData: unknown
): Promise<KiroModel[] | null> {
  try {
    const response = await fetchImpl(url, {
      method: "GET",
      headers: {
        ...buildKiroFingerprintHeaders(providerSpecificData, accessToken),
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const models = parseKiroModels(data);
    return models.length > 0 ? models : null;
  } catch {
    return null;
  }
}

/**
 * Discover the Kiro model catalog live via `ListAvailableModels`, falling back
 * to the static catalog when no token is available or every attempt fails.
 *
 * Attempt order stops at the first success: Kiro management first, then the
 * region-matched Amazon Q endpoint and its us-east-1 fallback. A stored
 * profileArn is included from the first request because current Kiro IDE social
 * accounts reject an origin-only request as invalid.
 */
export async function fetchKiroAvailableModels(
  options: FetchKiroModelsOptions
): Promise<KiroModelsResult> {
  const { accessToken, providerSpecificData, fetchImpl = fetch, fallbackModels } = options;

  const token = toNonEmptyString(accessToken);
  if (!token) {
    return toFallbackResult(fallbackModels);
  }

  const key = cacheKey(token, providerSpecificData);
  const cached = catalogCache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return { models: cached.models, source: "api" };
  }

  const region = resolveKiroRegion(providerSpecificData);
  const endpoints = buildKiroModelsEndpoints(region);
  const profileArn = toNonEmptyString(asRecord(providerSpecificData).profileArn);

  const query = new URLSearchParams({
    origin: "AI_EDITOR",
    ...(profileArn ? { profileArn } : {}),
  });

  for (const base of endpoints) {
    const models = await tryFetchModels(fetchImpl, `${base}?${query}`, token, providerSpecificData);
    if (models) {
      catalogCache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, models });
      return { models, source: "api" };
    }
  }

  return toFallbackResult(fallbackModels);
}

export function clearKiroModelCache(): void {
  catalogCache.clear();
}
