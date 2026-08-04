// ClinePass live catalog resolver. Cline publishes the authoritative picker
// contents through the public recommended-models endpoint. OmniRoute exposes
// the subscription bucket on ClinePass and keeps recommended/free entries on
// the sibling Cline provider so the two catalogs remain clearly separated.

export const CLINEPASS_MODELS_ENDPOINT = "https://api.cline.bot/api/v1/ai/cline/recommended-models";
export const CLINE_MODELS_ENDPOINT = "https://api.cline.bot/api/v1/ai/cline/models";
const FETCH_TIMEOUT_MS = 5000;

export interface ClinepassModel {
  id: string;
  name: string;
  description?: string;
}

type ClineRecommendedModelsPayload = {
  clinePass?: unknown;
  recommended?: unknown;
  free?: unknown;
};

function normalizeClinepassModel(value: unknown): ClinepassModel | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const entry = value as Record<string, unknown>;
  if (typeof entry.id !== "string" || !entry.id.trim()) return null;

  const id = entry.id.trim();
  const name = typeof entry.name === "string" && entry.name.trim() ? entry.name.trim() : id;
  const description =
    typeof entry.description === "string" && entry.description.trim()
      ? entry.description.trim()
      : undefined;
  return { id, name, ...(description ? { description } : {}) };
}

function normalizeModelBucket(value: unknown): ClinepassModel[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    const normalized = normalizeClinepassModel(entry);
    return normalized ? [normalized] : [];
  });
}

function getModelList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  const response = payload as Record<string, unknown>;
  if (Array.isArray(response.data)) return response.data;
  return Array.isArray(response.models) ? response.models : [];
}

function hasTextOnlyOutput(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const architecture = (value as Record<string, unknown>).architecture;
  if (!architecture || typeof architecture !== "object" || Array.isArray(architecture)) {
    return false;
  }

  const modality = (architecture as Record<string, unknown>).modality;
  if (typeof modality !== "string") return false;
  const [, output] = modality.toLowerCase().split("->", 2);
  return output?.trim() === "text";
}

/**
 * Normalize only the official ClinePass subscription bucket.
 */
export function parseClinepassRecommendedModels(payload: unknown): ClinepassModel[] {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const response = payload as ClineRecommendedModelsPayload;
  return normalizeModelBucket(response.clinePass).filter((model) =>
    model.id.startsWith("cline-pass/")
  );
}

/** Normalize the recommendation and free buckets for the sibling Cline provider. */
export function parseClineRecommendedModels(payload: unknown): ClinepassModel[] {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const response = payload as ClineRecommendedModelsPayload;
  const models: ClinepassModel[] = [];
  const seen = new Set<string>();
  for (const model of [
    ...normalizeModelBucket(response.recommended),
    ...normalizeModelBucket(response.free),
  ]) {
    if (seen.has(model.id)) continue;
    seen.add(model.id);
    models.push(model);
  }
  return models;
}

/** Normalize the full Cline catalog while keeping ClinePass subscription models separate. */
export function parseClineModels(payload: unknown): ClinepassModel[] {
  return getModelList(payload).flatMap((entry) => {
    if (!hasTextOnlyOutput(entry)) return [];
    const model = normalizeClinepassModel(entry);
    return model && !model.id.startsWith("cline-pass/") ? [model] : [];
  });
}

/**
 * Filter a flat model list down to the ClinePass subscription namespace.
 */
export function filterClinepassModels(rawList: unknown): ClinepassModel[] {
  return normalizeModelBucket(rawList).filter((model) => model.id.startsWith("cline-pass/"));
}

/**
 * Resolve the live ClinePass catalog. The endpoint is public, so discovery no
 * longer depends on an API key or OAuth token. Returns null on failure so the
 * registry's generated fallback remains available offline.
 */
export async function resolveClinepassModels(
  _credentials?: { apiKey?: string | null; accessToken?: string | null },
  fetchImpl: typeof fetch = fetch
): Promise<{ models: ClinepassModel[] } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetchImpl(CLINEPASS_MODELS_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) return null;

    const models = parseClinepassRecommendedModels(await response.json());
    return models.length ? { models } : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
