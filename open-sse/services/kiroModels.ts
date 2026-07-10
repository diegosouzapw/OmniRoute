/**
 * Kiro (AWS CodeWhisperer / Amazon Q) live model discovery.
 *
 * Kiro's model catalog is per-account / per-tier — the free tier, Pro, Pro+ and
 * Power plans expose different model sets, and AWS IAM Identity Center (enterprise)
 * orgs further restrict it to an admin-curated "approved models" list. The Kiro
 * IDE / CLI populates its model picker by calling the CodeWhisperer
 * `ListAvailableModels` operation:
 *
 *   GET https://q.{region}.amazonaws.com/ListAvailableModels?origin=AI_EDITOR
 *   Authorization: Bearer <accessToken>
 *   → { models: [ { modelId, modelName?, tokenLimits?: { maxInputTokens } }, ... ] }
 *
 * This works for both "simple" Builder ID / social logins and AWS IAM Identity
 * Center accounts:
 *   - `origin=AI_EDITOR` alone is the universal call (Builder ID / IdC).
 *   - `profileArn` is only sent for desktop-style accounts that have one, and only
 *     as a retry, because sending it for Builder ID can yield 403.
 *   - The endpoint is region-matched (IdC tokens are region-bound, e.g.
 *     eu-central-1) with a us-east-1 fallback (the legacy CodeWhisperer home region).
 *
 * A safe fallback to the static registry catalog is preserved so model import
 * never breaks when the account is offline / unauthenticated / token-expired.
 */

import { createHash } from "node:crypto";

import { v4 as uuidv4 } from "uuid";

type RawRecord = Record<string, unknown>;

const KIRO_RUNTIME_SDK_VERSION = "1.0.0";
const KIRO_AGENT_OS = "windows";
const KIRO_AGENT_OS_VERSION = "10.0.26200";
const KIRO_NODE_VERSION = "22.21.1";
const KIRO_IDE_VERSION = "0.10.32";
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

export type KiroModel = {
  id: string;
  name: string;
  owned_by: string;
  capabilities?: {
    thinking: boolean;
    agentic: boolean;
  };
  contextLength?: number;
  rateMultiplier?: number;
  upstreamModelId?: string;
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
    models.push({ id, name, owned_by: "kiro" });
  }

  return models;
}

function stripSyntheticSuffixes(id: string): string {
  let out = id;
  if (out.endsWith("-agentic")) out = out.slice(0, -"-agentic".length);
  if (out.endsWith("-thinking")) out = out.slice(0, -"-thinking".length);
  return out;
}

function formatDisplayName(modelName: unknown, modelId: string, rateMultiplier: unknown): string {
  const base = toNonEmptyString(modelName) || modelId;
  const rate = Number(rateMultiplier);
  if (!Number.isFinite(rate) || Math.abs(rate - 1.0) < 1e-9 || rate <= 0) {
    return `Kiro ${base}`;
  }
  return `Kiro ${base} (${rate.toFixed(1)}x credit)`;
}

function buildVariants(upstream: string, displayName: string): KiroModel[] {
  const safeUpstream = stripSyntheticSuffixes(upstream);
  const display = displayName || `Kiro ${safeUpstream}`;
  const isAuto = safeUpstream === "auto" || safeUpstream === "auto-kiro";
  const variants: KiroModel[] = [
    {
      id: safeUpstream,
      name: display,
      owned_by: "kiro",
      capabilities: { thinking: false, agentic: false },
    },
    {
      id: `${safeUpstream}-thinking`,
      name: `${display} (Thinking)`,
      owned_by: "kiro",
      capabilities: { thinking: true, agentic: false },
    },
  ];

  if (!isAuto) {
    variants.push({
      id: `${safeUpstream}-agentic`,
      name: `${display} (Agentic)`,
      owned_by: "kiro",
      capabilities: { thinking: false, agentic: true },
    });
    variants.push({
      id: `${safeUpstream}-thinking-agentic`,
      name: `${display} (Thinking + Agentic)`,
      owned_by: "kiro",
      capabilities: { thinking: true, agentic: true },
    });
  }

  return variants;
}

function expandKiroModels(data: unknown): KiroModel[] {
  const payload = asRecord(data);
  const items = Array.isArray(payload.models)
    ? (payload.models as unknown[])
    : Array.isArray(payload.availableModels)
      ? (payload.availableModels as unknown[])
      : [];
  const expanded: KiroModel[] = [];
  const seen = new Set<string>();

  for (const value of items) {
    const item = asRecord(value);
    const upstreamId = toNonEmptyString(item.modelId) || toNonEmptyString(item.id);
    if (!upstreamId) continue;
    const display = formatDisplayName(item.modelName || item.name, upstreamId, item.rateMultiplier);
    const tokenLimits = asRecord(item.tokenLimits);
    const contextLength = Number(tokenLimits.maxInputTokens) || 200000;
    const rateMultiplier = Number(item.rateMultiplier);

    for (const variant of buildVariants(upstreamId, display)) {
      if (seen.has(variant.id)) continue;
      seen.add(variant.id);
      expanded.push({
        ...variant,
        contextLength,
        rateMultiplier: Number.isFinite(rateMultiplier) ? rateMultiplier : 1.0,
        upstreamModelId: upstreamId,
        description: toNonEmptyString(item.description) || "",
      });
    }
  }

  return expanded;
}

/**
 * Derive the AWS region for a Kiro connection. Mirrors getKiroUsage: prefer the
 * stored region, then the region embedded in the profileArn, else us-east-1.
 */
export function resolveKiroRegion(providerSpecificData: unknown): string {
  const psd = asRecord(providerSpecificData);
  const explicit = toNonEmptyString(psd.region);
  if (explicit) return explicit.toLowerCase();

  const profileArn = toNonEmptyString(psd.profileArn);
  const fromArn = profileArn
    ? profileArn.toLowerCase().match(/^arn:aws:codewhisperer:([a-z0-9-]+):/)?.[1]
    : undefined;

  return fromArn || "us-east-1";
}

/**
 * Build the ordered list of `ListAvailableModels` base URLs to try: the
 * region-matched Amazon Q host first, then the us-east-1 home region as a
 * fallback (CodeWhisperer's canonical region).
 */
export function buildKiroModelsEndpoints(region: string): string[] {
  const normalized = (toNonEmptyString(region) || "us-east-1").toLowerCase();
  const urls: string[] = [`https://q.${normalized}.amazonaws.com/ListAvailableModels`];
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
  const psd = asRecord(providerSpecificData);
  const seed =
    toNonEmptyString(psd.clientId) ||
    toNonEmptyString(psd.profileArn) ||
    accessToken ||
    "kiro-anonymous";
  const machineId = createHash("sha256").update(String(seed)).digest("hex");
  const userAgent =
    `aws-sdk-js/${KIRO_RUNTIME_SDK_VERSION} ua/2.1 ` +
    `os/${KIRO_AGENT_OS}#${KIRO_AGENT_OS_VERSION} ` +
    `lang/js md/nodejs#${KIRO_NODE_VERSION} ` +
    `api/codewhispererruntime#${KIRO_RUNTIME_SDK_VERSION} m/N,E ` +
    `KiroIDE-${KIRO_IDE_VERSION}-${machineId}`;

  return {
    "User-Agent": userAgent,
    "x-amz-user-agent": `aws-sdk-js/${KIRO_RUNTIME_SDK_VERSION} KiroIDE-${KIRO_IDE_VERSION}-${machineId}`,
    "x-amzn-kiro-agent-mode": "vibe",
    "x-amzn-codewhisperer-optout": "true",
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
    const models = expandKiroModels(data);
    return models.length > 0 ? models : null;
  } catch {
    return null;
  }
}

/**
 * Discover the Kiro model catalog live via `ListAvailableModels`, falling back
 * to the static catalog when no token is available or every attempt fails.
 *
 * Attempt order (stops at the first success):
 *   1. `origin=AI_EDITOR` on each region-matched endpoint — universal path that
 *      works for Builder ID / social ("simple") and IAM Identity Center accounts.
 *   2. `origin=AI_EDITOR&profileArn=...` on the primary endpoint, only when a
 *      profileArn is present (desktop-style accounts that require it).
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

  // Pass 1: origin-only (works for Builder ID / social / IdC).
  for (const base of endpoints) {
    const models = await tryFetchModels(
      fetchImpl,
      `${base}?origin=AI_EDITOR`,
      token,
      providerSpecificData
    );
    if (models) {
      catalogCache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, models });
      return { models, source: "api" };
    }
  }

  // Pass 2: retry with profileArn (desktop accounts that require it) on the
  // region-matched endpoint only. Skipped for Builder ID / IdC where sending a
  // profileArn can 403.
  if (profileArn) {
    const url = `${endpoints[0]}?origin=AI_EDITOR&profileArn=${encodeURIComponent(profileArn)}`;
    const models = await tryFetchModels(fetchImpl, url, token, providerSpecificData);
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
