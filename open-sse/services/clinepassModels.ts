import { buildClineHeaders } from "@/shared/utils/clineAuth";

// ClinePass live-models resolver. ClinePass is API-key-only (BYOK), but the
// underlying api.cline.bot host also accepts the OAuth `cline` credential shape,
// so the resolver reuses buildClineHeaders() (the shared workos:-prefixed Cline
// header set) for the non-apikey path. Only `cline-pass/*` model ids are kept.

const CLINEPASS_MODELS_ENDPOINT = "https://api.cline.bot/api/v1/models";
const FETCH_TIMEOUT_MS = 5000;

export interface ClinepassModel {
  id: string;
  name: string;
}

/**
 * Filter a raw models list down to the ClinePass namespace (`cline-pass/*`).
 * Pure — shared by the live resolver and the discovery-config parseResponse.
 */
export function filterClinepassModels(rawList: unknown): ClinepassModel[] {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .filter(
      (m): m is { id: string; name?: string } =>
        !!m &&
        typeof (m as { id?: unknown }).id === "string" &&
        (m as { id: string }).id.startsWith("cline-pass/")
    )
    .map((m) => ({ id: m.id, name: m.name || m.id }));
}

function buildModelListHeaders(token: string, isApiKey: boolean): Record<string, string> {
  if (isApiKey) {
    return {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  return buildClineHeaders(token, { Accept: "application/json" });
}

/**
 * Resolve the live ClinePass model catalogue for a connection. Returns
 * `{ models }` on success or `null` on any failure (missing token, non-2xx,
 * bad shape, timeout) so callers fall back to the static registry catalogue.
 */
export async function resolveClinepassModels(credentials: {
  apiKey?: string | null;
  accessToken?: string | null;
}): Promise<{ models: ClinepassModel[] } | null> {
  const isApiKey = Boolean(credentials?.apiKey);
  const token = isApiKey ? credentials.apiKey : credentials?.accessToken;
  if (!token) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const headers = buildModelListHeaders(token, isApiKey);
    const response = await fetch(CLINEPASS_MODELS_ENDPOINT, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    if (!response.ok) return null;

    const json = await response.json();
    const rawList = Array.isArray(json) ? json : json?.data;
    const models = filterClinepassModels(rawList);
    return models.length ? { models } : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
