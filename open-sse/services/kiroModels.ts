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

type RawRecord = Record<string, unknown>;

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
      return { id, name: toNonEmptyString(model.name) || id, owned_by: "kiro" };
    })
    .filter((model): model is KiroModel => Boolean(model));
  return { models, source: "fallback" };
}

async function tryFetchModels(
  fetchImpl: typeof fetch,
  url: string,
  accessToken: string
): Promise<KiroModel[] | null> {
  try {
    const response = await fetchImpl(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
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

  const region = resolveKiroRegion(providerSpecificData);
  const endpoints = buildKiroModelsEndpoints(region);
  const profileArn = toNonEmptyString(asRecord(providerSpecificData).profileArn);

  // Pass 1: origin-only (works for Builder ID / social / IdC).
  for (const base of endpoints) {
    const models = await tryFetchModels(fetchImpl, `${base}?origin=AI_EDITOR`, token);
    if (models) return { models, source: "api" };
  }

  // Pass 2: retry with profileArn (desktop accounts that require it) on the
  // region-matched endpoint only. Skipped for Builder ID / IdC where sending a
  // profileArn can 403.
  if (profileArn) {
    const url = `${endpoints[0]}?origin=AI_EDITOR&profileArn=${encodeURIComponent(profileArn)}`;
    const models = await tryFetchModels(fetchImpl, url, token);
    if (models) return { models, source: "api" };
  }

  return toFallbackResult(fallbackModels);
}
