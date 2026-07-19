/**
 * Notion AI Web model discovery helpers.
 *
 * Notion has no public model catalog API. The browser AI surface loads models via
 * cookie-auth `POST /api/v3/getAvailableModels` with body `{ spaceId }` (see
 * browser capture against app.notion.com). These helpers parse that response and
 * build the cookie/headers/body the models-discovery route needs.
 */

const NOTION_APP_ORIGIN = "https://www.notion.so";
const NOTION_MODELS_URL = `${NOTION_APP_ORIGIN}/api/v3/getAvailableModels`;
const NOTION_SPACES_URL = `${NOTION_APP_ORIGIN}/api/v3/getSpaces`;
const NOTION_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";
/** Recent Notion web client version — accepted loosely but required by some paths. */
const NOTION_CLIENT_VERSION = "23.13.20260718.1805";

export type NotionDiscoveredModel = {
  id: string;
  name: string;
  owned_by: string;
  supportsReasoning?: boolean;
  disabled?: boolean;
};

/** Offline fallback when getAvailableModels is unreachable (seeded from live picker). */
export const NOTION_WEB_FALLBACK_MODELS: NotionDiscoveredModel[] = [
  { id: "notion-ai", name: "Notion AI (default)", owned_by: "notion" },
  { id: "orange-mousse", name: "GPT-5.6 Sol", owned_by: "openai" },
  { id: "orchid-muffin", name: "GPT-5.6 Terra", owned_by: "openai" },
  { id: "olive-jellyroll", name: "GPT-5.6 Luna", owned_by: "openai" },
  { id: "oatmeal-cookie", name: "GPT-5.2", owned_by: "openai" },
  { id: "oval-kumquat-medium", name: "GPT-5.4", owned_by: "openai" },
  { id: "opal-quince-medium", name: "GPT-5.5", owned_by: "openai" },
  { id: "oregon-grape-medium", name: "GPT-5.4 Mini", owned_by: "openai" },
  { id: "otaheite-apple-medium", name: "GPT-5.4 Nano", owned_by: "openai" },
  { id: "vertex-gemini-3.5-flash", name: "Gemini 3.5 Flash", owned_by: "gemini" },
  { id: "gingerbread", name: "Gemini 3 Flash", owned_by: "gemini" },
  { id: "galette-medium-thinking", name: "Gemini 3.1 Pro", owned_by: "gemini" },
  { id: "almond-croissant-low", name: "Sonnet 4.6", owned_by: "anthropic" },
  { id: "angel-cake-high", name: "Sonnet 5", owned_by: "anthropic" },
  { id: "avocado-froyo-medium", name: "Opus 4.6", owned_by: "anthropic" },
  { id: "apricot-sorbet-high", name: "Opus 4.7", owned_by: "anthropic" },
  { id: "ambrosia-tart-high", name: "Opus 4.8", owned_by: "anthropic" },
  { id: "anthropic-haiku-4.5", name: "Haiku 4.5", owned_by: "anthropic" },
  { id: "acai-budino-high", name: "Fable 5", owned_by: "anthropic" },
  { id: "fireworks-kimi-k2.6", name: "Kimi K2.6", owned_by: "mystery" },
  { id: "fireworks-kimi-k2.7", name: "Kimi K2.7 Code", owned_by: "mystery" },
  { id: "baseten-deepseek-v4-pro", name: "DeepSeek V4 Pro", owned_by: "mystery" },
  { id: "baseten-glm-5.2", name: "GLM 5.2", owned_by: "mystery" },
  { id: "xigua-mochi-medium", name: "Grok 4.3", owned_by: "xai" },
  { id: "strawberry-whoopiepie", name: "Grok 4.5", owned_by: "xai" },
  { id: "xinomavro-cake", name: "Grok Build 0.1", owned_by: "xai" },
];

/** Normalize a pasted credential to a Cookie header string. */
export function normalizeNotionWebCookie(raw: string): string {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return "";
  return trimmed.includes("=") ? trimmed : `token_v2=${trimmed}`;
}

/** Read `name=value` from a cookie header (case-insensitive name). */
export function readCookieValue(cookie: string, name: string): string {
  if (!cookie || !name) return "";
  const re = new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`, "i");
  const m = cookie.match(re);
  if (!m) return "";
  const raw = m[1].trim();
  // Malformed % sequences in cookie values must not throw (Gemini review).
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function extractSpaceIdFromNotionCookie(cookie: string): string {
  return (
    readCookieValue(cookie, "space_id") ||
    readCookieValue(cookie, "spaceId") ||
    ""
  );
}

export function extractNotionUserIdFromCookie(cookie: string): string {
  return (
    readCookieValue(cookie, "notion_user_id") ||
    readCookieValue(cookie, "notion_user_id_v2") ||
    readCookieValue(cookie, "user_id") ||
    ""
  );
}

/** Trim to a non-empty string, or fall back to `fallback`. */
function trimmedOrFallback(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/** True when the row's `modelConfiguration.supportedReasoningEfforts` is a non-empty array. */
function rowSupportsReasoning(row: Record<string, unknown>): boolean {
  const efforts = (row.modelConfiguration as { supportedReasoningEfforts?: unknown } | undefined)
    ?.supportedReasoningEfforts;
  return Array.isArray(efforts) && efforts.length > 0;
}

/**
 * Parse one getAvailableModels list entry into a model, or `null` when the entry
 * should be skipped (disabled, malformed, or a duplicate id already in `seen`).
 */
function parseNotionModelEntry(
  entry: unknown,
  seen: Set<string>
): NotionDiscoveredModel | null {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
  const row = entry as Record<string, unknown>;
  if (row.isDisabled === true) return null;

  const id = typeof row.model === "string" ? row.model.trim() : "";
  if (!id || seen.has(id)) return null;

  seen.add(id);
  return {
    id,
    name: trimmedOrFallback(row.modelMessage, id),
    owned_by: trimmedOrFallback(row.modelFamily, "notion"),
    ...(rowSupportsReasoning(row) ? { supportsReasoning: true } : {}),
  };
}

/** Ensure a stable default id always exists for clients that still request notion-ai. */
function withDefaultNotionModel(
  out: NotionDiscoveredModel[],
  seen: Set<string>
): NotionDiscoveredModel[] {
  if (out.length === 0 || seen.has("notion-ai")) return out;
  return [{ id: "notion-ai", name: "Notion AI (default)", owned_by: "notion" }, ...out];
}

/**
 * Parse getAvailableModels JSON into OpenAI-style model entries.
 * Skips disabled models; prefers display `modelMessage` as name and internal
 * `model` codename as id (what runInferenceTranscript expects).
 */
export function parseNotionAvailableModels(data: unknown): NotionDiscoveredModel[] {
  if (!data || typeof data !== "object" || Array.isArray(data)) return [];
  const list = (data as { models?: unknown }).models;
  if (!Array.isArray(list)) return [];

  const seen = new Set<string>();
  const out: NotionDiscoveredModel[] = [];
  for (const entry of list) {
    const model = parseNotionModelEntry(entry, seen);
    if (model) out.push(model);
  }

  return withDefaultNotionModel(out, seen);
}

export function buildNotionModelsDiscoveryHeaders(token: string): Record<string, string> {
  const cookie = normalizeNotionWebCookie(token);
  const spaceId = extractSpaceIdFromNotionCookie(cookie);
  const userId = extractNotionUserIdFromCookie(cookie);
  const headers: Record<string, string> = {
    accept: "*/*",
    "content-type": "application/json",
    "user-agent": NOTION_USER_AGENT,
    origin: NOTION_APP_ORIGIN,
    referer: `${NOTION_APP_ORIGIN}/ai`,
    "notion-client-version": NOTION_CLIENT_VERSION,
    "notion-audit-log-platform": "web",
    ...(cookie ? { cookie } : {}),
  };
  if (spaceId) headers["x-notion-space-id"] = spaceId;
  if (userId) headers["x-notion-active-user-header"] = userId;
  return headers;
}

export function buildNotionModelsDiscoveryBody(token: string): { spaceId?: string } {
  const cookie = normalizeNotionWebCookie(token);
  const spaceId = extractSpaceIdFromNotionCookie(cookie);
  return spaceId ? { spaceId } : {};
}

export function getNotionModelsDiscoveryUrl(): string {
  return NOTION_MODELS_URL;
}

/**
 * Try to resolve a workspace spaceId from getSpaces when the cookie has none.
 * Returns "" on any failure (caller falls back to local catalog).
 */
export async function resolveNotionSpaceIdFromGetSpaces(
  cookie: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  const normalized = normalizeNotionWebCookie(cookie);
  if (!normalized) return "";
  try {
    const res = await fetchImpl(NOTION_SPACES_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        cookie: normalized,
        origin: NOTION_APP_ORIGIN,
        referer: `${NOTION_APP_ORIGIN}/`,
        "user-agent": NOTION_USER_AGENT,
      },
      body: "{}",
    });
    if (!res.ok) return "";
    const data = (await res.json()) as unknown;
    return pickFirstSpaceId(data);
  } catch {
    return "";
  }
}

/** Common shape: { [userId]: { space_view: { ... }, space: { [spaceId]: ... } } } */
function pickSpaceIdFromUserMap(root: Record<string, unknown>): string {
  for (const value of Object.values(root)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const spaceMap = (value as Record<string, unknown>).space;
    if (spaceMap && typeof spaceMap === "object" && !Array.isArray(spaceMap)) {
      const ids = Object.keys(spaceMap as Record<string, unknown>);
      if (ids.length > 0) return ids[0];
    }
  }
  return "";
}

/** Flat shape: { spaces: [{ id }] } */
function pickSpaceIdFromSpacesArray(spaces: unknown): string {
  if (!Array.isArray(spaces)) return "";
  for (const s of spaces) {
    if (s && typeof s === "object" && typeof (s as { id?: string }).id === "string") {
      return (s as { id: string }).id;
    }
  }
  return "";
}

/** Flat shape: { spaceIds: [] } */
function pickSpaceIdFromSpaceIdsArray(spaceIds: unknown): string {
  return Array.isArray(spaceIds) && typeof spaceIds[0] === "string" ? spaceIds[0] : "";
}

/** Best-effort spaceId extraction from getSpaces response shapes. */
export function pickFirstSpaceId(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const root = data as Record<string, unknown>;

  return (
    pickSpaceIdFromUserMap(root) ||
    pickSpaceIdFromSpacesArray(root.spaces) ||
    pickSpaceIdFromSpaceIdsArray(root.spaceIds)
  );
}

/**
 * End-to-end discovery used by the models route special-case (and unit tests).
 * Resolves spaceId from cookie or getSpaces, then calls getAvailableModels.
 */
export async function discoverNotionWebModels(opts: {
  token: string;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal | null;
}): Promise<{ models: NotionDiscoveredModel[]; spaceId: string; source: "api" }> {
  const fetchImpl = opts.fetchImpl ?? fetch;
  const cookie = normalizeNotionWebCookie(opts.token);
  if (!cookie) {
    throw new Error("Missing Notion token_v2 cookie");
  }

  let spaceId = extractSpaceIdFromNotionCookie(cookie);
  if (!spaceId) {
    spaceId = await resolveNotionSpaceIdFromGetSpaces(cookie, fetchImpl);
  }
  if (!spaceId) {
    throw new Error(
      "Missing Notion spaceId — include space_id=… in the cookie header or re-login so getSpaces can resolve a workspace"
    );
  }

  // Prefer the canonical space id extractor (case-insensitive) so we do not
  // append a second space_id= when the cookie used spaceId= or mixed case.
  const cookieForHeaders = extractSpaceIdFromNotionCookie(cookie)
    ? cookie
    : `${cookie}; space_id=${spaceId}`;
  const headers = buildNotionModelsDiscoveryHeaders(cookieForHeaders);
  headers["x-notion-space-id"] = spaceId;

  const res = await fetchImpl(NOTION_MODELS_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ spaceId }),
    signal: opts.signal ?? undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`getAvailableModels failed (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const models = parseNotionAvailableModels(data);
  if (models.length === 0) {
    throw new Error("getAvailableModels returned no enabled models");
  }
  return { models, spaceId, source: "api" };
}

export {
  NOTION_MODELS_URL,
  NOTION_SPACES_URL,
  NOTION_APP_ORIGIN,
  NOTION_CLIENT_VERSION,
};
