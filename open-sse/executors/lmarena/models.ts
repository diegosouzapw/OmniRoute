/**
 * LMArena live model list parsing, catalog normalization, and name→UUID resolution.
 */

export const LMARENA_API_BASE = "https://arena.ai";
export const LMARENA_STREAM_URL = `${LMARENA_API_BASE}/nextjs-api/stream/create-evaluation`;
/**
 * Current Chrome stable UA (header surface).
 * TLS JA3 profile is separate: tls-client-node tops out at chrome_146 — see
 * LMARENA_PROFILE in lmarenaTlsClient.ts. Headers track the live browser string;
 * fingerprint stays at the newest native profile we can actually impersonate.
 */
export const LMARENA_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
export const LMARENA_MODEL_ID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Browser-like CORS headers for arena.ai same-origin API calls. */
export function buildLmarenaBrowserHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    Accept: "text/event-stream, application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Origin: LMARENA_API_BASE,
    Referer: `${LMARENA_API_BASE}/`,
    "Sec-Ch-Ua": '"Chromium";v="150", "Google Chrome";v="150", "Not-A.Brand";v="24"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": LMARENA_USER_AGENT,
    ...extra,
  };
}

export interface LMArenaModelMetadata {
  id?: string;
  publicName?: string;
  name?: string;
  displayName?: string;
  organization?: string;
  provider?: string;
  userSelectable?: boolean;
  rank?: number;
  rankByModality?: Record<string, number>;
  capabilities?: {
    inputCapabilities?: Record<string, boolean>;
    outputCapabilities?: Record<string, boolean>;
  };
}

// Live arena.ai HTML discovery is intentionally disabled. Catalog + UUID map
// come from the Direct-chat scrape seed (registry/lmarena/directModels.ts).

function stripLMArenaModelPrefix(model: string): string {
  return model.replace(/^(?:lmarena|lma|arena)\//i, "").trim();
}

function normalizeModelName(model: string): string {
  return model.trim().toLowerCase();
}

function hasLMArenaCapability(
  entry: LMArenaModelMetadata,
  direction: "input" | "output",
  key: string
): boolean {
  const capabilities =
    direction === "input"
      ? entry.capabilities?.inputCapabilities
      : entry.capabilities?.outputCapabilities;
  return capabilities?.[key] === true;
}

/**
 * Arena ships hundreds of initialModels rows; many are webdev-only, hidden,
 * unranked sentinels (chat rank = MAX_SAFE_INTEGER), or UUID twins that 404 on
 * create-evaluation. Keep the catalog to chat-usable, ranked, selectable rows.
 */
const LMARENA_MAX_REASONABLE_CHAT_RANK = 100_000;
/** Soft cap after dedupe — Arena UI only surfaces ~100–130 chat models. */
export const LMARENA_CATALOG_SOFT_CAP = 120;

const deadCatalogKeys = new Map<string, number>();
const DEAD_CATALOG_TTL_MS = 6 * 60 * 60 * 1000;

function deadKey(value: string): string {
  return value.trim().toLowerCase();
}

/** Remember a model id/publicName that 404/502'd so the next catalog import drops it. */
export function markLMArenaCatalogModelDead(idOrPublicName: string): void {
  if (!idOrPublicName?.trim()) return;
  deadCatalogKeys.set(deadKey(idOrPublicName), Date.now() + DEAD_CATALOG_TTL_MS);
}

export function clearLMArenaDeadCatalogModels(): void {
  deadCatalogKeys.clear();
}

function isMarkedDead(entry: LMArenaModelMetadata, publicId: string): boolean {
  const now = Date.now();
  for (const key of [publicId, entry.id, entry.publicName, entry.name, entry.displayName]) {
    if (!key) continue;
    const exp = deadCatalogKeys.get(deadKey(key));
    if (exp === undefined) continue;
    if (exp <= now) {
      deadCatalogKeys.delete(deadKey(key));
      continue;
    }
    return true;
  }
  return false;
}

function isLMArenaChatCatalogModel(entry: LMArenaModelMetadata): boolean {
  if (entry.userSelectable === false) return false;
  // Must resolve to a real Arena UUID for create-evaluation.
  if (typeof entry.id !== "string" || !LMARENA_MODEL_ID_RE.test(entry.id)) return false;

  const chatRank = entry.rankByModality?.chat;
  if (typeof chatRank !== "number" || !Number.isFinite(chatRank)) return false;
  // Unranked / placeholder rows use huge sentinels and commonly 404 when probed.
  if (chatRank >= LMARENA_MAX_REASONABLE_CHAT_RANK) return false;

  if (!hasLMArenaCapability(entry, "input", "text")) return false;
  if (!hasLMArenaCapability(entry, "output", "text")) return false;

  // Prefer rows with a stable human slug (not bare UUID as the only label).
  const publicId = getLMArenaPublicModelId(entry).trim();
  if (!publicId) return false;
  if (LMARENA_MODEL_ID_RE.test(publicId) && !entry.publicName && !entry.name) return false;

  return true;
}

function lmarenaModelResolutionScore(entry: LMArenaModelMetadata): number {
  let score = 0;
  if (entry.userSelectable === false) score += 1_000_000;
  if (!hasLMArenaCapability(entry, "input", "text")) score += 100_000;
  if (!hasLMArenaCapability(entry, "output", "text")) score += 50_000;

  const chatRank = entry.rankByModality?.chat;
  if (typeof chatRank === "number" && Number.isFinite(chatRank)) {
    score += chatRank;
  } else if (typeof entry.rank === "number" && Number.isFinite(entry.rank)) {
    score += 10_000 + entry.rank;
  } else {
    score += 20_000;
  }

  if (!entry.name) score += 500;
  if (!entry.organization && !entry.provider) score += 100;

  return score;
}

function getLMArenaPublicModelId(entry: LMArenaModelMetadata): string {
  return entry.publicName || entry.displayName || entry.name || entry.id || "";
}

export function normalizeLMArenaModelsForCatalog(models: LMArenaModelMetadata[]): Array<{
  id: string;
  name: string;
  owned_by: string;
  supportsVision?: boolean;
  apiFormat: "chat-completions";
  supportedEndpoints: ["chat"];
}> {
  const bestByPublicId = new Map<string, { entry: LMArenaModelMetadata; index: number }>();

  models.forEach((entry, index) => {
    if (!isLMArenaChatCatalogModel(entry)) return;
    const publicId = getLMArenaPublicModelId(entry).trim();
    if (!publicId) return;
    if (isMarkedDead(entry, publicId)) return;

    const previous = bestByPublicId.get(publicId);
    if (
      !previous ||
      lmarenaModelResolutionScore(entry) < lmarenaModelResolutionScore(previous.entry)
    ) {
      bestByPublicId.set(publicId, { entry, index });
    }
  });

  return Array.from(bestByPublicId.entries())
    .sort(
      ([, a], [, b]) =>
        lmarenaModelResolutionScore(a.entry) - lmarenaModelResolutionScore(b.entry) ||
        a.index - b.index
    )
    .slice(0, LMARENA_CATALOG_SOFT_CAP)
    .map(([id, { entry }]) => ({
      id,
      name: entry.displayName || entry.publicName || entry.name || id,
      owned_by: entry.organization || entry.provider || "lmarena",
      ...(hasLMArenaCapability(entry, "input", "image") ? { supportsVision: true } : {}),
      apiFormat: "chat-completions" as const,
      supportedEndpoints: ["chat"] as const,
    }));
}

export function pickLMArenaModelId(model: string, models: LMArenaModelMetadata[]): string {
  const requested = stripLMArenaModelPrefix(model);
  if (LMARENA_MODEL_ID_RE.test(requested)) return requested;

  const normalized = normalizeModelName(requested);
  const matches = models
    .map((entry, index) => ({ entry, index }))
    // Only map onto chat-catalog-quality rows — avoids binding a public name to a
    // webdev-only / unranked twin UUID that 404s on create-evaluation.
    .filter(({ entry }) => isLMArenaChatCatalogModel(entry))
    .filter(({ entry }) =>
      [entry.id, entry.publicName, entry.name, entry.displayName].some(
        (candidate) => typeof candidate === "string" && normalizeModelName(candidate) === normalized
      )
    );
  const match = matches.sort(
    (a, b) =>
      lmarenaModelResolutionScore(a.entry) - lmarenaModelResolutionScore(b.entry) ||
      a.index - b.index
  )[0]?.entry;

  return match?.id || requested;
}

export function parseLMArenaInitialModels(html: string): LMArenaModelMetadata[] {
  const escapedMarker = '\\"initialModels\\":[';
  const plainMarker = '"initialModels":[';
  const marker = html.includes(escapedMarker) ? escapedMarker : plainMarker;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return [];

  const arrayStart = markerIndex + marker.length - 1;
  const escapedEnd = '],\\"initialModelAId\\"';
  const plainEnd = '],"initialModelAId"';
  const arrayEnd = html.indexOf(escapedEnd, arrayStart);
  const fallbackEnd = html.indexOf(plainEnd, arrayStart);
  const endIndex = arrayEnd >= 0 ? arrayEnd : fallbackEnd;
  if (endIndex < 0 || endIndex < arrayStart) return [];

  const rawArray = html.slice(arrayStart, endIndex + 1).replace(/\\"/g, '"');
  try {
    const parsed = JSON.parse(rawArray);
    return Array.isArray(parsed) ? (parsed as LMArenaModelMetadata[]) : [];
  } catch {
    return [];
  }
}

type LogFn = {
  debug?: (scope: string, msg: string) => void;
  warn?: (scope: string, msg: string) => void;
};

/** Static Direct-chat allowlist only — no arena.ai network call. */
export async function getLMArenaModels(log?: LogFn): Promise<LMArenaModelMetadata[]> {
  const { LMARENA_DIRECT_MODEL_ENTRIES } =
    await import("../../config/providers/registry/lmarena/directModels.ts");
  // Chat path only — Image rows live in IMAGE_PROVIDERS (imageRegistry).
  const models: LMArenaModelMetadata[] = LMARENA_DIRECT_MODEL_ENTRIES.filter(
    (m) => m.category === "Text" || m.category === "Search"
  ).map((m) => ({
    id: m.arenaId,
    publicName: m.catalogId,
    name: m.publicName,
    displayName: m.displayName,
    organization: m.organization,
    userSelectable: true,
    capabilities: {
      inputCapabilities: { text: true, ...(m.vision ? { image: true } : {}) },
      outputCapabilities: {
        text: true,
        ...(m.category === "Search" ? { web: true } : {}),
      },
    },
    rankByModality: { chat: 1 },
  }));
  log?.debug?.(
    "LMArenaExecutor",
    `Using static Direct-chat catalog (${models.length} Text/Search models; Image in imageRegistry)`
  );
  return models;
}

export async function resolveLMArenaModelId(model: string, log?: LogFn): Promise<string> {
  const requested = stripLMArenaModelPrefix(model);
  if (LMARENA_MODEL_ID_RE.test(requested)) return requested;

  try {
    const { resolveLmarenaArenaId } =
      await import("../../config/providers/registry/lmarena/directModels.ts");
    const fromSeed = resolveLmarenaArenaId(requested);
    if (fromSeed) return fromSeed;
    return pickLMArenaModelId(requested, await getLMArenaModels(log));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log?.warn?.(
      "LMArenaExecutor",
      `Using raw model id after static catalog lookup failed: ${message}`
    );
    return requested;
  }
}
