import { createHash } from "node:crypto";
import { homedir } from "node:os";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type {
  OmniRouteEnrichmentEntry,
  OmniRouteEnrichmentMap,
  OmniRouteProviderConnection,
  OmniRouteRawAutoCombo,
  OmniRouteRawCombo,
  OmniRouteRawModelEntry,
} from "./shared/index.js";

export const DEFAULT_MODEL_CACHE_TTL_MS = 300_000 as const;

/**
 * Breather after a refresh whose models fetch came back empty (gateway down
 * or refusing). Transforms inside the window serve last-known-good without
 * re-firing the fetch suite. Short on purpose: it only guards the
 * pathological case, normal TTL expiry still refetches every window.
 */
export const UNREACHABLE_COOLDOWN_MS = 15_000 as const;

export interface CatalogSnapshot {
  models: OmniRouteRawModelEntry[];
  combos: OmniRouteRawCombo[];
  autoCombos: OmniRouteRawAutoCombo[];
  providers?: OmniRouteProviderConnection[];
  enrichment?: OmniRouteEnrichmentMap;
  fetchedAt: number;
}

export const SNAPSHOT_FORMAT_VERSION = 2 as const;

/**
 * A raw snapshot entry is stale when it cannot be mapped to a publishable
 * model: no string `id` (unroutable) or a pre-mapped `api` block without a
 * valid `npm` package (the runner would reject it as `Unsupported package`).
 * Plain `/v1/models` entries carry no `api` block -- it is synthesized at
 * publish time -- so only a present-but-invalid block drops the entry.
 */
export function isStaleSnapshotModel(entry: unknown): boolean {
  if (!entry || typeof entry !== "object") return true;
  const id = (entry as { id?: unknown }).id;
  if (typeof id !== "string" || id.length === 0) return true;
  const api = (entry as { api?: unknown }).api;
  if (api === undefined) return false;
  if (!api || typeof api !== "object") return true;
  const npm = (api as { npm?: unknown }).npm;
  return typeof npm !== "string" || npm.length === 0;
}

interface DiskSnapshotV2 {
  v: 2;
  identityFingerprint: string;
  models: OmniRouteRawModelEntry[];
  combos: OmniRouteRawCombo[];
  autoCombos?: OmniRouteRawAutoCombo[];
  providers?: OmniRouteProviderConnection[];
  /**
   * Display names, provider labels, pricing and free-tier budgets, as
   * `[key, entry]` pairs (a Map does not survive JSON). Persisted because a
   * cold start otherwise publishes raw model ids until the first refresh
   * completes — which is the moment the snapshot exists to cover.
   */
  enrichment?: [string, OmniRouteEnrichmentEntry][];
  writtenAt: number;
}

/**
 * Ceiling on what one snapshot may occupy on disk. A gateway with thousands of
 * models makes this file grow without bound otherwise; past the cap the
 * enrichment overlay is dropped first (it is rebuilt on the next refresh)
 * rather than losing the catalog itself.
 */
const MAX_SNAPSHOT_BYTES = 32 * 1024 * 1024;

function trimTrailingSlashes(value: string): string {
  let i = value.length;
  while (i > 0 && value.charCodeAt(i - 1) === 0x2f) i -= 1;
  return i === value.length ? value : value.slice(0, i);
}

function normalizeBaseURL(baseURL: string): string {
  try {
    const parsed = new URL(baseURL);
    parsed.hash = "";
    parsed.pathname = trimTrailingSlashes(parsed.pathname) || "/";
    return parsed.toString();
  } catch {
    return trimTrailingSlashes(baseURL);
  }
}

export function memoryCacheKey(baseURL: string, credentialId: string): string {
  return `${baseURL}::${createHash("sha256").update(credentialId).digest("hex")}`;
}

export function snapshotIdentityFingerprint(
  baseURL: string,
  apiKey: string,
  managementReadToken: string
): string {
  return createHash("sha256")
    .update(JSON.stringify([normalizeBaseURL(baseURL), apiKey, managementReadToken]))
    .digest("hex");
}

export function diskSnapshotPath(providerId: string): string {
  // OPENCODE_DATA_DIR is honoured verbatim when set: whoever controls the
  // process environment already chooses where the process writes, so
  // resolving it further would only surprise. The providerId segment stays
  // bounded by the options schema (letters, digits, '.', '_' and '-'; never
  // "." or ".."), keeping the file inside <dir>/plugins/.
  const dir = process.env.OPENCODE_DATA_DIR ?? join(homedir(), ".local", "share", "opencode");
  return join(dir, "plugins", `omniroute-${providerId}.json`);
}

export async function readDiskSnapshot(
  providerId: string,
  identityFingerprint: string,
  logger?: { warn: (message: string) => void }
): Promise<CatalogSnapshot | undefined> {
  try {
    const body = await readFile(diskSnapshotPath(providerId), "utf8");
    const parsed = JSON.parse(body) as Partial<DiskSnapshotV2>;
    if (
      !parsed ||
      typeof parsed.v !== "number" ||
      parsed.v < SNAPSHOT_FORMAT_VERSION ||
      typeof parsed.identityFingerprint !== "string" ||
      parsed.identityFingerprint !== identityFingerprint
    ) {
      return undefined;
    }
    if (
      !Array.isArray(parsed.models) ||
      parsed.models.length === 0 ||
      !Array.isArray(parsed.combos)
    ) {
      return undefined;
    }
    const stale = (parsed.models as unknown[]).filter(isStaleSnapshotModel).length;
    const models = (parsed.models as OmniRouteRawModelEntry[]).filter(
      (entry) => !isStaleSnapshotModel(entry)
    );
    if (stale > 0) {
      logger?.warn(`[omniroute-v2] dropping ${stale} stale snapshot entries without api block`);
    }
    if (models.length === 0) return undefined;
    return {
      models,
      combos: parsed.combos as OmniRouteRawCombo[],
      autoCombos: Array.isArray(parsed.autoCombos)
        ? (parsed.autoCombos as OmniRouteRawAutoCombo[])
        : [],
      providers: Array.isArray(parsed.providers)
        ? (parsed.providers as OmniRouteProviderConnection[])
        : [],
      // A snapshot written before this field existed, or one whose overlay was
      // dropped for size, simply starts unenriched and recovers on the first
      // refresh — the same state as before it was persisted at all.
      enrichment: Array.isArray(parsed.enrichment)
        ? new Map(parsed.enrichment as [string, OmniRouteEnrichmentEntry][])
        : undefined,
      fetchedAt: typeof parsed.writtenAt === "number" ? parsed.writtenAt : Date.now(),
    };
  } catch {
    return undefined;
  }
}

export async function writeDiskSnapshot(
  providerId: string,
  snapshot: CatalogSnapshot,
  identityFingerprint: string
): Promise<void> {
  try {
    if (snapshot.models.length === 0) return;
    const file = diskSnapshotPath(providerId);
    await mkdir(dirname(file), { recursive: true, mode: 0o700 });
    const envelope: DiskSnapshotV2 = {
      v: 2,
      identityFingerprint,
      models: snapshot.models,
      combos: snapshot.combos,
      autoCombos: snapshot.autoCombos,
      providers: snapshot.providers ?? [],
      enrichment: snapshot.enrichment ? [...snapshot.enrichment.entries()] : undefined,
      writtenAt: Date.now(),
    };
    let payload = JSON.stringify(envelope);
    if (payload.length > MAX_SNAPSHOT_BYTES && envelope.enrichment !== undefined) {
      delete envelope.enrichment;
      payload = JSON.stringify(envelope);
    }
    if (payload.length > MAX_SNAPSHOT_BYTES) return;
    await writeFile(file, payload, { encoding: "utf8", mode: 0o600 });
  } catch {
    // Best-effort: callers already hold the in-memory entry.
  }
}

export async function clearDiskSnapshot(providerId: string): Promise<boolean> {
  try {
    await unlink(diskSnapshotPath(providerId));
    return true;
  } catch {
    return false;
  }
}
