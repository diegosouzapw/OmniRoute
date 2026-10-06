/**
 * CCR (Content-Compression-Retrieve) engine (H4)
 *
 * Replaces large contiguous blocks of text with a content-addressed
 * retrieve marker: `[CCR retrieve hash=<24hex> chars=<N>]`
 *
 * The verbatim block is stored in a principal-scoped, bounded in-module store.
 * The store key is `${principalId ?? "__anon__"} ${contentHash}` so that one
 * principal cannot read another's stored blocks (IDOR protection).
 *
 * The `retrieve` MCP tool (or the `handleCcrRetrieve` helper exported here)
 * returns the block on demand when called with the matching callerId.
 *
 * Algorithm:
 *   - Scan non-system messages; for each `type:"text"` part or string content,
 *     find contiguous text blocks ≥ minChars characters.
 *   - Replace the block with `[CCR retrieve hash=<24hex> chars=<N>]` only if
 *     the marker is shorter than the original block.
 *   - Store the original block keyed by (principalId, hash) in the CCR store.
 *
 * Feedback (scoped by principal):
 *   - `recordRetrieval(hash, principalId)` increments a retrieval counter for
 *     that (principalId, hash) pair.
 *   - `shouldSkipCompression(hash, principalId)` returns true once the counter
 *     reaches RETRIEVAL_THRESHOLD for that principal — one principal's behaviour
 *     does not affect another's (cross-tenant state drift protection).
 *
 * Memory bound:
 *   - Entries are capped by count, global bytes, per-principal bytes, block bytes and TTL.
 *   - Expired and least-recently-used entries are removed before a store is rejected.
 *
 * Conservative guards:
 *   - Never touch `role: "system"`.
 *   - Only replace if it shrinks (marker shorter than original).
 *   - Only replace blocks ≥ minChars (default 600).
 *   - `stackable: true`, `stackPriority: 4` (runs just after session-dedup(3)).
 */
import crypto from "node:crypto";
import {
  deleteAllCcrBlocks,
  deleteCcrBlockRow,
  loadCcrBlock,
  persistCcrBlock,
  touchCcrBlock,
} from "../../../../../src/lib/db/ccrBlocks.ts";
import { createCompressionStats } from "../../stats.ts";
import { queryBlock, type CcrQuery } from "./ccrQuery.ts";
import { callerSupportsCcrRetrieve, injectCcrProtocolInstruction } from "./protocolInstruction.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";
import type { CompressionResult } from "../../types.ts";

// ─── constants ────────────────────────────────────────────────────────────────

const ENGINE_ID = "ccr";
/** Default minimum character count for a block to be a CCR candidate. */
const DEFAULT_MIN_CHARS = 600;
/** Number of retrievals before a block is flagged "do-not-compress" for that principal. */
const RETRIEVAL_THRESHOLD = 3;
/**
 * H8 — default retrieval ramp factor. Each prior retrieval (below the threshold) raises a block's
 * effective `minChars` linearly, so hot content is compressed progressively less; `1` disables the
 * ramp (only the >= threshold cliff remains — the legacy binary behavior).
 */
const RETRIEVAL_RAMP_FACTOR_DEFAULT = 2;
/**
 * Maximum number of entries in the LRU-ordered store, across every principal. The store
 * is keyed per principal, but this cap is not: the only per-principal cap is
 * `MAX_CCR_PRINCIPAL_BYTES`. Eviction under this cap takes the storing principal's own
 * blocks first (see `enforceGlobalBudget`).
 */
export const MAX_CCR_ENTRIES = 5_000;
export const MAX_CCR_BLOCK_BYTES = 2 * 1024 * 1024;
export const MAX_CCR_PRINCIPAL_BYTES = 16 * 1024 * 1024;
export const MAX_CCR_GLOBAL_BYTES = 64 * 1024 * 1024;
export const DEFAULT_CCR_TTL_SECONDS = 24 * 60 * 60;
export const MAX_CCR_TTL_SECONDS = 7 * 24 * 60 * 60;
export const MAX_CCR_MCP_FULL_BYTES = 256 * 1024;

export type CcrEntrySource = "compression" | "mcp" | "ionizer" | "session-dedup";

export interface CcrEntryMetadata {
  hash: string;
  bytes: number;
  chars: number;
  lines: number;
  contentType: string;
  source: CcrEntrySource;
  createdAt: number;
  lastAccessedAt: number;
  expiresAt: number;
  retrievalCount: number;
}

type CcrEntry = Omit<CcrEntryMetadata, "retrievalCount"> & {
  principalId: string;
  content: string;
};

export interface StoreCcrBlockOptions {
  contentType?: string;
  source?: CcrEntrySource;
  ttlSeconds?: number;
  now?: number;
}

export type StoreCcrBlockResult =
  | { stored: true; hash: string; metadata: CcrEntryMetadata }
  | {
      stored: false;
      hash: string;
      reason: "block_too_large" | "principal_budget_exceeded" | "global_budget_exceeded";
    };

export function isCcrStoreRejection(
  result: StoreCcrBlockResult
): result is Extract<StoreCcrBlockResult, { stored: false }> {
  return result.stored === false;
}

export interface CcrStoreStats {
  storage: "memory";
  entries: number;
  bytes: number;
  limits: {
    maxEntries: number;
    maxBlockBytes: number;
    maxPrincipalBytes: number;
    maxGlobalBytes: number;
    defaultTtlSeconds: number;
    maxTtlSeconds: number;
    maxMcpFullBytes: number;
  };
  lifecycle: {
    expiredEvictions: number;
    capacityEvictions: number;
    rejectedStores: number;
  };
}

// ─── principal-scoped, bounded content store ──────────────────────────────────

/**
 * Store key = `${principalId ?? "__anon__"} ${contentHash}`.
 * Using a compound key scopes data to the principal that stored it.
 */
const ccrStore = new Map<string, CcrEntry>();
const retrievalCounts = new Map<string, number>();
const principalBytesMap = new Map<string, number>();
let ccrTotalBytes = 0;
type CcrLifecycleCounters = CcrStoreStats["lifecycle"];
const lifecycleByPrincipal = new Map<string, CcrLifecycleCounters>();

/** Sentinel used when no principalId is provided. */
const ANON = "__anon__";

function buildStoreKey(hash: string, principalId?: string): string {
  return `${principalId ?? ANON} ${hash}`;
}

// ─── durable second tier (#9061) ──────────────────────────────────────────────

/**
 * The map above is the hot cache. It loses entries to cross-principal LRU eviction, to
 * the TTL, to restarts, and to a retrieve landing on another instance, while
 * `fidelityGateStep` waives fidelity checks for sampling engines on the grounds that
 * their drop is "CCR-recoverable", and the protocol instruction promises the model a
 * verbatim block. These helpers put the block on disk so that promise survives.
 *
 * Every one of them is best-effort: a store without a usable database (compression
 * preview, unit tests, a read-only volume) degrades to today's in-memory behaviour
 * rather than failing the request.
 *
 * Three guards keep this from changing what the deployment stores at rest more than it
 * has to. They follow the call-log artifact path, which faced the same question:
 *
 *   1. Blocks over `MAX_DURABLE_BLOCK_BYTES` stay memory-only. `MAX_CCR_BLOCK_BYTES` is
 *      2 MB, and 5,000 of those would be 10 GB of prompt text in SQLite. 512 KB is the
 *      ceiling #1647 already set on call artifacts for this exact reason.
 *   2. No durable tier on a cloud runtime, which has no local disk to write to.
 *   3. `COMPRESSION_CCR_DURABLE_STORE=false` turns it off. The content is prompt text, and an
 *      operator who does not want that on disk needs a switch that is not a rebuild.
 *
 * The switch defaults to on because the model is already told, by the CCR protocol
 * instruction, that it can retrieve the block verbatim. Leaving it off by default would
 * keep that promise hollow for everyone who never reads this file.
 */
const MAX_DURABLE_BLOCK_BYTES = 512 * 1024;

/** Matches the detection call-log artifacts use (`callLogArtifacts.ts`). */
const isCloudRuntime = typeof globalThis.caches === "object" && globalThis.caches !== null;

function durableTierEnabled(): boolean {
  return !isCloudRuntime && process.env.COMPRESSION_CCR_DURABLE_STORE !== "false";
}

const loggedDurableErrors = new Set<string>();

function warnDurableError(operation: string, error: unknown): void {
  if (process.env.NODE_ENV === "test") return;
  if (loggedDurableErrors.has(operation)) return;
  if (loggedDurableErrors.size >= 20) {
    const first = loggedDurableErrors.values().next().value;
    if (first !== undefined) loggedDurableErrors.delete(first);
  }
  loggedDurableErrors.add(operation);
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[ccr] durable ${operation} failed: ${message}`);
}

/**
 * Writes are deferred off the request path. Measured on this repo, a synchronous
 * `persistCcrBlock` costs 0.032 ms at the 600-char minimum block but 1.77 ms at 500 KB,
 * past the 1 ms this engine declares in its metadata, and roughly 7x the sha256 it
 * already pays over the same bytes. The block is in the map before the defer runs, so an
 * in-process retrieve never waits for the disk; only a crash inside that tick loses the
 * durable copy, and the client's next request re-stores it under the same hash.
 *
 * Persist and delete share this queue so they cannot reorder: `setImmediate` is FIFO, and
 * a delete that overtook its own persist would resurrect the block it just removed.
 */
const MAX_PENDING_DURABLE_WRITES = 1_000;
let pendingDurableWrites = 0;
let droppedDurableWrites = 0;

function deferDurable(operation: string, work: () => void, droppable = false): void {
  // Backpressure. A burst faster than SQLite drains would otherwise queue without bound
  // and hold every block's content live in the closure. Dropping a persist is safe: the
  // block is still in the map, and the client re-stores it under the same hash on its
  // next request. Deletes are never dropped, or a deleted block would come back.
  if (droppable && pendingDurableWrites >= MAX_PENDING_DURABLE_WRITES) {
    droppedDurableWrites++;
    return;
  }
  pendingDurableWrites++;
  setImmediate(() => {
    pendingDurableWrites--;
    try {
      work();
    } catch (error) {
      warnDurableError(operation, error);
    }
  });
}

function persistEntry(entry: CcrEntry): void {
  if (!durableTierEnabled()) return;
  if (entry.bytes > MAX_DURABLE_BLOCK_BYTES) return;
  const snapshot = { ...entry };
  deferDurable("persist", () => persistCcrBlock(snapshot), true);
}

function forgetEntry(hash: string, principalId: string): void {
  if (!durableTierEnabled()) return;
  deferDurable("delete", () => deleteCcrBlockRow(principalId, hash));
}

/**
 * Read a block the map no longer holds and put it back in the map, so the LRU/byte
 * accounting keeps working from there. Returns null when there is no durable row, which
 * is also what a missing database looks like.
 */
function rehydrateEntry(hash: string, principalId: string, now: number): CcrEntry | null {
  if (!durableTierEnabled()) return null;
  let row: ReturnType<typeof loadCcrBlock>;
  try {
    row = loadCcrBlock(principalId, hash, now);
  } catch (error) {
    warnDurableError("load", error);
    return null;
  }
  if (!row) return null;

  const entry: CcrEntry = {
    hash: row.hash,
    principalId: row.principalId,
    content: row.content,
    bytes: row.bytes,
    chars: row.chars,
    lines: row.lines,
    contentType: row.contentType,
    source: row.source as CcrEntrySource,
    createdAt: row.createdAt,
    lastAccessedAt: now,
    expiresAt: row.expiresAt,
  };

  // Re-admit through the same budgets a fresh store would face. If the block no longer
  // fits, it stays on disk and is served straight from the row instead of being cached.
  if (
    enforcePrincipalBudget(entry.principalId, entry.bytes) &&
    enforceGlobalBudget(entry.principalId, entry.bytes)
  ) {
    const key = buildStoreKey(hash, principalId === ANON ? undefined : principalId);
    ccrStore.set(key, entry);
    ccrTotalBytes += entry.bytes;
    principalBytesMap.set(entry.principalId, principalBytes(entry.principalId) + entry.bytes);
  }

  try {
    touchCcrBlock(entry.principalId, hash, now);
  } catch (error) {
    warnDurableError("touch", error);
  }
  return entry;
}

function readLifecycleCounters(principalId: string): CcrLifecycleCounters {
  return (
    lifecycleByPrincipal.get(principalId) ?? {
      expiredEvictions: 0,
      capacityEvictions: 0,
      rejectedStores: 0,
    }
  );
}

function mutableLifecycleCounters(principalId: string): CcrLifecycleCounters {
  const existing = lifecycleByPrincipal.get(principalId);
  if (existing) return existing;
  const counters = { expiredEvictions: 0, capacityEvictions: 0, rejectedStores: 0 };
  lifecycleByPrincipal.set(principalId, counters);
  return counters;
}

function publicMetadata(entry: CcrEntry): CcrEntryMetadata {
  const { principalId: _principalId, content: _content, ...metadata } = entry;
  return {
    ...metadata,
    retrievalCount: retrievalCounts.get(buildStoreKey(entry.hash, entry.principalId)) ?? 0,
  };
}

function setRetrievalCount(key: string, count: number): void {
  if (!retrievalCounts.has(key) && retrievalCounts.size >= MAX_CCR_ENTRIES) {
    const oldestKey = retrievalCounts.keys().next().value;
    if (oldestKey !== undefined) retrievalCounts.delete(oldestKey);
  }
  retrievalCounts.delete(key);
  retrievalCounts.set(key, count);
}

function removeEntry(key: string, reason?: "expired" | "capacity"): boolean {
  const entry = ccrStore.get(key);
  if (!entry) return false;
  ccrStore.delete(key);
  ccrTotalBytes = Math.max(0, ccrTotalBytes - entry.bytes);
  const remainingPrincipalBytes = Math.max(
    0,
    (principalBytesMap.get(entry.principalId) ?? 0) - entry.bytes
  );
  if (remainingPrincipalBytes === 0) principalBytesMap.delete(entry.principalId);
  else principalBytesMap.set(entry.principalId, remainingPrincipalBytes);
  const counters = mutableLifecycleCounters(entry.principalId);
  if (reason === "expired") {
    counters.expiredEvictions++;
    // Expiry is the one eviction that means the block is finished. Capacity eviction is
    // not: that block stays on disk, which is the point of the durable tier (#9061).
    forgetEntry(entry.hash, entry.principalId);
  }
  if (reason === "capacity") counters.capacityEvictions++;
  return true;
}

function purgeExpired(now = Date.now()): void {
  for (const [key, entry] of ccrStore) {
    if (entry.expiresAt <= now) removeEntry(key, "expired");
  }
}

function getActiveEntry(key: string, now = Date.now()): CcrEntry | null {
  const entry = ccrStore.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= now) {
    removeEntry(key, "expired");
    return null;
  }
  return entry;
}

function principalBytes(principalId: string): number {
  return principalBytesMap.get(principalId) ?? 0;
}

function evictOldestMatching(predicate: (entry: CcrEntry) => boolean): boolean {
  for (const [key, entry] of ccrStore) {
    if (predicate(entry)) return removeEntry(key, "capacity");
  }
  return false;
}

function normalizeTtlSeconds(value: number | undefined): number {
  if (!Number.isFinite(value) || value === undefined) return DEFAULT_CCR_TTL_SECONDS;
  return Math.max(60, Math.min(MAX_CCR_TTL_SECONDS, Math.floor(value)));
}

/**
 * Compute a 24-hex content hash for a text block (SHA-256 prefix).
 * This is the hash embedded in the marker; principal scoping is internal to
 * the store key and is NOT part of the marker itself.
 */
function hashContent(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

function rejectStore(
  hash: string,
  owner: string,
  reason: Exclude<StoreCcrBlockResult, { stored: true }>["reason"]
): StoreCcrBlockResult {
  mutableLifecycleCounters(owner).rejectedStores++;
  return { stored: false, hash, reason };
}

function enforcePrincipalBudget(owner: string, bytes: number): boolean {
  while (
    principalBytes(owner) + bytes > MAX_CCR_PRINCIPAL_BYTES &&
    evictOldestMatching((entry) => entry.principalId === owner)
  ) {
    // Evict the owner's least-recently-used entries until this block fits.
  }
  return principalBytes(owner) + bytes <= MAX_CCR_PRINCIPAL_BYTES;
}

/**
 * Enforce the entry and global byte caps, giving up the storing principal's own
 * least-recently-used blocks before anyone else's.
 *
 * The caps here are global while the only per-principal cap is `MAX_CCR_PRINCIPAL_BYTES`,
 * so nothing bounds a principal's entry *count*. Blocks start at `DEFAULT_MIN_CHARS`, so
 * 5,000 of them is around 3 MB, under a fifth of one principal's 16 MB byte allowance,
 * and enough to exhaust the shared entry budget on its own. Evicting the globally oldest
 * entry from there took a block from whoever had been quiet longest, because LRU keeps
 * promoting the busy principal's own entries to the tail.
 *
 * Preferring `owner` keeps the global bound exactly as strict and makes a principal pay
 * for its own pressure first. Falling back to any principal preserves the previous
 * behaviour for the case that actually needs it: a newcomer storing into a store held
 * entirely by others, which would otherwise never fit.
 */
function enforceGlobalBudget(owner: string, bytes: number): boolean {
  const overBudget = () =>
    ccrStore.size >= MAX_CCR_ENTRIES || ccrTotalBytes + bytes > MAX_CCR_GLOBAL_BYTES;

  while (overBudget()) {
    if (evictOldestMatching((entry) => entry.principalId === owner)) continue;
    if (evictOldestMatching(() => true)) continue;
    break;
  }
  return ccrTotalBytes + bytes <= MAX_CCR_GLOBAL_BYTES;
}

/**
 * Store a block in the CCR store under the given principal.
 * Returns the 24-hex content hash (for embedding in the marker).
 */
export function tryStoreBlock(
  text: string,
  principalId?: string,
  options: StoreCcrBlockOptions = {}
): StoreCcrBlockResult {
  const hash = hashContent(text);
  const owner = principalId ?? ANON;
  const key = buildStoreKey(hash, principalId);
  const now = options.now ?? Date.now();
  purgeExpired(now);

  const existing = ccrStore.get(key);
  if (existing) {
    existing.lastAccessedAt = now;
    existing.expiresAt = now + normalizeTtlSeconds(options.ttlSeconds) * 1000;
    ccrStore.delete(key);
    ccrStore.set(key, existing);
    return { stored: true, hash, metadata: publicMetadata(existing) };
  }

  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > MAX_CCR_BLOCK_BYTES) {
    return rejectStore(hash, owner, "block_too_large");
  }

  if (!enforcePrincipalBudget(owner, bytes)) {
    return rejectStore(hash, owner, "principal_budget_exceeded");
  }

  if (!enforceGlobalBudget(owner, bytes)) {
    return rejectStore(hash, owner, "global_budget_exceeded");
  }

  const ttlSeconds = normalizeTtlSeconds(options.ttlSeconds);
  const entry: CcrEntry = {
    hash,
    principalId: owner,
    content: text,
    bytes,
    chars: text.length,
    lines: text.length === 0 ? 0 : text.split("\n").length,
    contentType: options.contentType?.trim().slice(0, 128) || "text/plain",
    source: options.source ?? "compression",
    createdAt: now,
    lastAccessedAt: now,
    expiresAt: now + ttlSeconds * 1000,
  };
  ccrStore.set(key, entry);
  ccrTotalBytes += bytes;
  principalBytesMap.set(owner, principalBytes(owner) + bytes);
  persistEntry(entry);
  return { stored: true, hash, metadata: publicMetadata(entry) };
}

export function storeBlock(
  text: string,
  principalId?: string,
  options: StoreCcrBlockOptions = {}
): string {
  const result = tryStoreBlock(text, principalId, options);
  if (isCcrStoreRejection(result)) {
    throw new RangeError(`CCR store rejected block: ${result.reason}`);
  }
  return result.hash;
}

/**
 * Retrieve the verbatim block for a given hash and principal.
 * Returns null if not found or if the principal does not match the stored key.
 */
export function retrieveBlock(hash: string, principalId?: string, now = Date.now()): string | null {
  const key = buildStoreKey(hash, principalId);
  const entry = getActiveEntry(key, now);
  if (!entry) {
    // Miss in the hot cache is not proof the block is gone (#9061): LRU eviction, the TTL
    // sweep, a restart, or another instance all land here while the row is still on disk.
    const restored = rehydrateEntry(hash, principalId ?? ANON, now);
    return restored ? restored.content : null;
  }
  entry.lastAccessedAt = now;
  ccrStore.delete(key);
  ccrStore.set(key, entry);
  return entry.content;
}

/**
 * Record a retrieval event for a given (hash, principal) pair (feedback signal).
 */
export function recordRetrieval(hash: string, principalId?: string): void {
  const key = buildStoreKey(hash, principalId);
  setRetrievalCount(key, (retrievalCounts.get(key) ?? 0) + 1);
}

/**
 * Returns true if the block has been retrieved often enough by this principal
 * that it should be excluded from compression in future requests.
 * Each principal's feedback is isolated from other principals.
 */
export function shouldSkipCompression(hash: string, principalId?: string): boolean {
  const key = buildStoreKey(hash, principalId);
  return (retrievalCounts.get(key) ?? 0) >= RETRIEVAL_THRESHOLD;
}

/**
 * H8 — retrieval-aware minimum block size (graduated feedback). A frequently-retrieved
 * `(principal, hash)` block is compressed progressively less: each prior retrieval (below the
 * threshold) raises the size bar linearly, and once the retrieval count reaches
 * `RETRIEVAL_THRESHOLD` the block is never compressed (`Infinity` — this subsumes the previous
 * binary `shouldSkipCompression` cliff). Pure function of the retrieval counter; `rampFactor <= 1`
 * disables the ramp so only the `>= threshold` cliff remains (byte-identical to the legacy path).
 */
export function effectiveMinChars(
  baseMinChars: number,
  hash: string,
  principalId: string | undefined,
  rampFactor: number
): number {
  const count = retrievalCounts.get(buildStoreKey(hash, principalId)) ?? 0;
  if (count >= RETRIEVAL_THRESHOLD) return Number.POSITIVE_INFINITY;
  if (count <= 0 || rampFactor <= 1) return baseMinChars;
  // Linear ramp: count=1 → base·rampFactor; count=2 → base·(1 + 2·(rampFactor−1)); …
  return Math.round(baseMinChars * (1 + (rampFactor - 1) * count));
}

/** Resolve the H8 ramp factor from the env (`COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR`), default 2. */
export function resolveRetrievalRampFactor(env: NodeJS.ProcessEnv = process.env): number {
  const raw = env.COMPRESSION_CCR_RETRIEVAL_RAMP_FACTOR;
  if (raw === undefined) return RETRIEVAL_RAMP_FACTOR_DEFAULT;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 1 ? n : RETRIEVAL_RAMP_FACTOR_DEFAULT;
}

/**
 * Reset the CCR store and retrieval counts (for testing).
 */
export function resetCcrStore(): void {
  ccrStore.clear();
  retrievalCounts.clear();
  principalBytesMap.clear();
  ccrTotalBytes = 0;
  lifecycleByPrincipal.clear();
  // Through the same queue as persist/delete, so a reset cannot overtake a write it was
  // meant to clear.
  deferDurable("reset", deleteAllCcrBlocks);
}

/** Resolves once the deferred durable writes queued so far have run. */
export function flushCcrDurableWrites(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

export function inspectCcrBlock(
  hash: string,
  principalId?: string,
  now = Date.now()
): CcrEntryMetadata | null {
  const entry = getActiveEntry(buildStoreKey(hash, principalId), now);
  return entry ? publicMetadata(entry) : null;
}

export function listCcrBlocks(
  principalId?: string,
  options: { offset?: number; limit?: number; now?: number } = {}
): { entries: CcrEntryMetadata[]; total: number; offset: number; limit: number; hasMore: boolean } {
  purgeExpired(options.now);
  const owner = principalId ?? ANON;
  const offset = Math.max(0, Math.floor(options.offset ?? 0));
  const limit = Math.max(1, Math.min(100, Math.floor(options.limit ?? 25)));
  const all: CcrEntryMetadata[] = [];
  for (const entry of ccrStore.values()) {
    if (entry.principalId === owner) all.push(publicMetadata(entry));
  }
  all.reverse();
  return {
    entries: all.slice(offset, offset + limit),
    total: all.length,
    offset,
    limit,
    hasMore: offset + limit < all.length,
  };
}

export function deleteCcrBlock(hash: string, principalId?: string, _now = Date.now()): boolean {
  const removedFromCache = removeEntry(buildStoreKey(hash, principalId));
  // An explicit delete must reach the durable tier too, otherwise the next retrieve
  // rehydrates the block the caller just deleted.
  forgetEntry(hash, principalId ?? ANON);
  return removedFromCache;
}

export function getCcrStoreStats(principalId?: string, now = Date.now()): CcrStoreStats {
  purgeExpired(now);
  const owner = principalId ?? ANON;
  const entries = Array.from(ccrStore.values()).filter((entry) => entry.principalId === owner);
  return {
    storage: "memory",
    entries: entries.length,
    bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0),
    limits: {
      maxEntries: MAX_CCR_ENTRIES,
      maxBlockBytes: MAX_CCR_BLOCK_BYTES,
      maxPrincipalBytes: MAX_CCR_PRINCIPAL_BYTES,
      maxGlobalBytes: MAX_CCR_GLOBAL_BYTES,
      defaultTtlSeconds: DEFAULT_CCR_TTL_SECONDS,
      maxTtlSeconds: MAX_CCR_TTL_SECONDS,
      maxMcpFullBytes: MAX_CCR_MCP_FULL_BYTES,
    },
    lifecycle: { ...readLifecycleCounters(owner) },
  };
}

// ─── MCP tool handler (pure function) ────────────────────────────────────────

/**
 * Handler for the `omniroute_ccr_retrieve` MCP tool.
 *
 * The `callerId` parameter must be the authenticated principal id derived from
 * the MCP `extra` context (see compressionTools.ts). Only the principal that
 * stored the block can retrieve it.
 *
 * Returns the verbatim block for the given hash, or an error object.
 */
export function handleCcrRetrieve(
  args: { hash: string } & CcrQuery,
  callerId?: string
): { content: string } | { error: string } {
  if (!args.hash || typeof args.hash !== "string") {
    return { error: "hash parameter is required and must be a string" };
  }

  const block = retrieveBlock(args.hash, callerId);
  if (block === null) {
    return {
      error: `CCR block not found for hash=${args.hash}. The block may have expired or the hash is invalid.`,
    };
  }

  recordRetrieval(args.hash, callerId);
  if (!args.mode || args.mode === "full") return { content: block };
  return queryBlock(block, args);
}

// ─── message content processing ──────────────────────────────────────────────

type MessageLike = {
  role?: string;
  content?: string | Array<Record<string, unknown>>;
  [key: string]: unknown;
};

/**
 * Build a CCR marker string for a block.
 */
export function buildCcrMarker(hash: string, charCount: number): string {
  return `[CCR retrieve hash=${hash} chars=${charCount}]`;
}

export function buildCcrReference(
  hash: string,
  charCount: number
): {
  hash: string;
  uri: string;
  marker: string;
} {
  return { hash, uri: `ccr://${hash}`, marker: buildCcrMarker(hash, charCount) };
}

/**
 * #7746 guard: how many leading characters of the original block to keep in front
 * of the marker. `maybeCcrReplace` treats an entire message/part as ONE candidate
 * block (see module docstring), so a bare marker alone would silently discard the
 * ENTIRE prompt for any caller that cannot resolve `omniroute_ccr_retrieve`
 * (every plain OpenAI-compatible client — it is only ever exposed as an MCP tool).
 * Keeping a short, human-readable preamble means the model still sees the start
 * of the user's intent even when the marker itself is unreachable, while the full
 * text remains verbatim-retrievable by hash for MCP-capable callers.
 */
const MARKER_PREAMBLE_CHARS = 200;

/**
 * Build the text that replaces a compressed block: a short preamble of the
 * original content followed by the retrieve marker, never the marker alone.
 */
function buildCcrReplacementText(text: string, marker: string): string {
  const preamble = text.slice(0, MARKER_PREAMBLE_CHARS).trimEnd();
  return `${preamble}… ${marker}`;
}

/**
 * Replace a large text block with a CCR marker if it shrinks the content.
 * Returns the new text and a flag indicating whether replacement happened.
 */
function maybeCcrReplace(
  text: string,
  minChars: number,
  principalId: string | undefined,
  rampFactor: number
): { text: string; replaced: boolean; hash: string | null } {
  // Base floor first (no hash cost for tiny blocks that could never compress anyway).
  if (text.length < minChars) {
    return { text, replaced: false, hash: null };
  }

  const hash = hashContent(text);

  // H8: retrieved blocks demand an ever-larger size before compressing; at/above the retrieval
  // threshold the effective minimum is Infinity, so the block is excluded (subsumes the former
  // binary shouldSkipCompression cliff).
  if (text.length < effectiveMinChars(minChars, hash, principalId, rampFactor)) {
    return { text, replaced: false, hash: null };
  }

  const marker = buildCcrMarker(hash, text.length);
  // #7746: never leave a caller with ONLY the bare marker — keep a short preamble
  // so the original prompt is not silently, totally unreachable for non-MCP callers.
  const replacement = buildCcrReplacementText(text, marker);

  // Only replace if it actually shrinks
  if (replacement.length >= text.length) {
    return { text, replaced: false, hash: null };
  }

  const stored = tryStoreBlock(text, principalId, { source: "compression" });
  if (!stored.stored) return { text, replaced: false, hash: null };
  return { text: replacement, replaced: true, hash };
}

/**
 * Process all non-system messages: find large text blocks and replace with CCR markers.
 */
function processMessages(
  messages: MessageLike[],
  minChars: number,
  principalId: string | undefined,
  rampFactor: number
): { messages: MessageLike[]; replacedCount: number } {
  let replacedCount = 0;

  const result = messages.map((msg) => {
    if (msg.role === "system") return { ...msg };

    // H-fix1: skip tool outputs (OpenAI `role:"tool"` and Anthropic user
    // messages whose content is exclusively `tool_result` parts). When
    // OmniRoute is used as a chat-completion PROVIDER, the upstream LLM has no
    // way to call `omniroute_ccr_retrieve` and expand markers — replacing tool
    // outputs with `[CCR retrieve hash=…]` placeholders therefore breaks the agent
    // loop. Preserve tool outputs verbatim so the LLM can keep reasoning.
    if (msg.role === "tool") return { ...msg };
    if (msg.role === "user" && Array.isArray(msg.content)) {
      const parts = msg.content as Array<Record<string, unknown>>;
      if (parts.length > 0 && parts.every((p) => p?.["type"] === "tool_result")) {
        return { ...msg };
      }
    }

    if (typeof msg.content === "string") {
      const { text, replaced } = maybeCcrReplace(msg.content, minChars, principalId, rampFactor);
      if (replaced) {
        replacedCount++;
        return { ...msg, content: text };
      }
      return { ...msg };
    }

    if (Array.isArray(msg.content)) {
      let changed = false;
      const newContent = msg.content.map((part) => {
        if (part?.["type"] !== "text" || typeof part?.["text"] !== "string") return part;
        const { text, replaced } = maybeCcrReplace(
          part["text"] as string,
          minChars,
          principalId,
          rampFactor
        );
        if (replaced) {
          changed = true;
          replacedCount++;
          return { ...part, text };
        }
        return part;
      });
      if (changed) {
        return { ...msg, content: newContent };
      }
      return { ...msg };
    }

    return { ...msg };
  });

  return { messages: result, replacedCount };
}

// ─── schema & validation ──────────────────────────────────────────────────────

const CCR_SCHEMA: EngineConfigField[] = [
  {
    key: "enabled",
    type: "boolean",
    label: "Enabled",
    defaultValue: true,
  },
  {
    key: "minChars",
    type: "number",
    label: "Minimum block characters",
    description: "Minimum character count for a block to be a CCR candidate.",
    defaultValue: DEFAULT_MIN_CHARS,
    min: 100,
    max: 1_000_000,
  },
  {
    key: "retrievalRampFactor",
    type: "number",
    label: "Retrieval ramp factor (H8)",
    description:
      "How steeply frequently-retrieved blocks resist compression. Each prior retrieval raises " +
      "the effective minimum block size linearly; 1 disables the ramp (binary skip at the " +
      "threshold only).",
    defaultValue: RETRIEVAL_RAMP_FACTOR_DEFAULT,
    min: 1,
    max: 100,
  },
];

function validateCcrConfig(config: Record<string, unknown>): EngineValidationResult {
  const errors: string[] = [];
  if (config["enabled"] !== undefined && typeof config["enabled"] !== "boolean") {
    errors.push("enabled must be a boolean");
  }
  if (config["minChars"] !== undefined) {
    const v = config["minChars"];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 1) {
      errors.push("minChars must be a positive number");
    }
  }
  if (config["retrievalRampFactor"] !== undefined) {
    const v = config["retrievalRampFactor"];
    if (typeof v !== "number" || !Number.isFinite(v) || v < 1) {
      errors.push("retrievalRampFactor must be a number >= 1");
    }
  }
  return { valid: errors.length === 0, errors };
}

// ─── engine export ────────────────────────────────────────────────────────────

export const ccrEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "CCR (Content-Compression-Retrieve)",
  description:
    "Replaces large blocks of text with content-addressed retrieve markers " +
    "`[CCR retrieve hash=<24hex> chars=N]`. The original block is stored and " +
    "retrievable via the `omniroute_ccr_retrieve` MCP tool (H4). " +
    "Store is principal-scoped: only the storing principal can retrieve their blocks.",
  icon: "archive",
  targets: ["messages"],
  stackable: true,
  // stackPriority 4 = runs just after session-dedup (3), before headroom (15),
  // caveman (20), aggressive (30), ultra (40).
  stackPriority: 4,
  metadata: {
    id: ENGINE_ID,
    name: "CCR (Content-Compression-Retrieve)",
    description:
      "Reversible compression: large blocks → retrieve marker. " +
      "Original retrievable via MCP tool (H4). Principal-scoped for tenant isolation.",
    inputScope: "messages",
    targetLatencyMs: 1,
    supportsPreview: true,
    stable: true,
  },

  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult {
    const stepConfig = options?.stepConfig ?? {};

    if (stepConfig["enabled"] === false) {
      return { body, compressed: false, stats: null };
    }

    // #7746 follow-up: only callers whose tools[] proves they can reach
    // omniroute_ccr_retrieve may have content replaced at all. For everyone
    // else (plain OpenAI-compatible clients — the marker is an MCP-only
    // contract) replacement would strand the original text behind a hash the
    // model has no way to resolve. Skip the whole engine for them. The check
    // is wrapped defensively: a malformed body must fail OPEN (no
    // compression), never throw into the request pipeline.
    let callerCanRetrieve = false;
    try {
      callerCanRetrieve = callerSupportsCcrRetrieve(body);
    } catch (err) {
      // Defensive: the helper is total, but if it ever throws we must fail
      // OPEN (no compression) — and surface it so a future regression in the
      // helper is visible instead of silently bypassing compression forever.
      console.warn(
        "[compression/ccr] callerSupportsCcrRetrieve threw; skipping compression:",
        err instanceof Error ? err.message : err
      );
      callerCanRetrieve = false;
    }
    if (!callerCanRetrieve) {
      return { body, compressed: false, stats: null };
    }

    const minChars =
      typeof stepConfig["minChars"] === "number"
        ? (stepConfig["minChars"] as number)
        : DEFAULT_MIN_CHARS;

    // H8: retrieval-aware ramp factor — stepConfig wins, else env (default 2). 1 = binary cliff only.
    const rampFactor =
      typeof stepConfig["retrievalRampFactor"] === "number"
        ? (stepConfig["retrievalRampFactor"] as number)
        : resolveRetrievalRampFactor();

    const messages = body["messages"];
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }

    const start = performance.now();
    const { messages: newMessages, replacedCount } = processMessages(
      messages as MessageLike[],
      minChars,
      options?.principalId,
      rampFactor
    );

    if (replacedCount === 0) {
      return { body, compressed: false, stats: null };
    }

    // #8033: teach MCP-capable callers the marker → omniroute_ccr_retrieve contract
    // (once per session; never told to non-MCP callers who cannot reach the tool).
    const messagesWithProtocol = injectCcrProtocolInstruction(newMessages, body);

    const newBody: Record<string, unknown> = { ...body, messages: messagesWithProtocol };
    const durationMs = Math.round(performance.now() - start);
    const stats = createCompressionStats(
      body,
      newBody,
      "stacked",
      ["ccr"],
      [`ccr-replaced-${replacedCount}-blocks`],
      durationMs
    );

    return { body: newBody, compressed: true, stats };
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return CCR_SCHEMA;
  },

  validateConfig(config: Record<string, unknown>): EngineValidationResult {
    return validateCcrConfig(config);
  },
};
