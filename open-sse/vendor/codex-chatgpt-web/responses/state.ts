/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { createHash } from "node:crypto";
import {
  chmodSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { atomicWriteFile, getConfigDir } from "../config";

const MAX_STORED_RESPONSES = 1_000;
const RESPONSE_TTL_MS = 60 * 60 * 1_000;
const SNAPSHOT_DEBOUNCE_MS = 2_000;
/** In-memory high-water byte cap across all entries. Forced store:false continuation chains
 * store the full expanded input each turn — ~quadratic bytes per chain —
 * so a count cap alone cannot bound memory. Oldest-first eviction applies past this mark. */
const MAX_STORED_RESPONSE_BYTES = 64 * 1024 * 1024;
/** Keep the shared snapshot compact. Larger attachment-bearing entries use per-response files. */
const SNAPSHOT_ENTRY_MAX_BYTES = 2 * 1024 * 1024;
const SNAPSHOT_TOTAL_MAX_BYTES = 24 * 1024 * 1024;
/** Large inline attachments are stored per response so one image does not force every writer to
 * rewrite a monolithic snapshot. 80 MiB covers the browser's 50 MB raw aggregate after base64. */
const LARGE_STATE_ENTRY_MAX_BYTES = 80 * 1024 * 1024;
const LARGE_STATE_TOTAL_MAX_BYTES = 512 * 1024 * 1024;
const SNAPSHOT_LOCK_WAIT_MS = 2_000;
const SNAPSHOT_LOCK_STALE_MS = 30_000;
const SNAPSHOT_LOCK_RETRY_MS = 20;

interface StoredResponseState {
  createdAt: number;
  items: unknown[];
  /** Connection+thread+turn that recorded this id; missing on legacy snapshots. */
  namespace?: string;
  /** Approximate in-memory size, computed locally at insert time (never trusted from disk). */
  sizeBytes?: number;
}

export type ResponseStateOptions = { force?: boolean; namespace?: string };

const states = new Map<string, StoredResponseState>();
const dirtyStateIds = new Set<string>();
let storedResponseBytes = 0;

/** The ONLY size computation: approximate entry weight from its items payload. */
function measuredEntry(entry: Omit<StoredResponseState, "sizeBytes">): StoredResponseState {
  let sizeBytes = 0;
  try {
    sizeBytes = JSON.stringify(entry.items).length;
  } catch {
    /* unserializable items: weightless rather than fatal */
  }
  return { ...entry, sizeBytes };
}

/** The ONLY insertion point: keeps the byte counter consistent on replacement. */
function setEntry(id: string, entry: Omit<StoredResponseState, "sizeBytes">): void {
  deleteEntry(id);
  const measured = measuredEntry(entry);
  storedResponseBytes += measured.sizeBytes ?? 0;
  states.set(id, measured);
}

/** The ONLY deletion point: TTL, count, byte, and explicit deletes all route here. */
function deleteEntry(id: string): void {
  const existing = states.get(id);
  if (!existing) return;
  storedResponseBytes -= existing.sizeBytes ?? 0;
  if (storedResponseBytes < 0) storedResponseBytes = 0;
  states.delete(id);
  dirtyStateIds.delete(id);
}
// Expansion provenance must stay proxy-private: a WeakMap distinguishes replayed history from the
// newly appended input suffix without adding an unknown field that native passthrough could send
// upstream. Consumers use the prefix length to bind trusted history and rolling checkpoints to the
// exact replayed portion of this request.
const replayedInputPrefixLengths = new WeakMap<object, number>();
let loaded = false;
let persistTimer: ReturnType<typeof setTimeout> | null = null;
let pendingPersistPath: string | null = null;
const lockWaitCell = new Int32Array(new SharedArrayBuffer(4));

function now(): number {
  return Date.now();
}

function snapshotPath(): string {
  return join(getConfigDir(), "responses-state.json");
}

function largeStateDir(path: string): string {
  return join(dirname(path), "responses-state-large");
}

function largeStatePath(path: string, id: string): string {
  const key = createHash("sha256").update(id).digest("hex");
  return join(largeStateDir(path), `${key}.json`);
}

function persistableState(value: unknown): Omit<StoredResponseState, "sizeBytes"> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const rec = value as StoredResponseState;
  if (typeof rec.createdAt !== "number" || !Array.isArray(rec.items)) return undefined;
  return {
    createdAt: rec.createdAt,
    items: rec.items,
    ...(typeof rec.namespace === "string" && rec.namespace.trim()
      ? { namespace: rec.namespace.trim() }
      : {}),
  };
}

function readSnapshot(path: string): Map<string, Omit<StoredResponseState, "sizeBytes">> {
  const entries = new Map<string, Omit<StoredResponseState, "sizeBytes">>();
  try {
    if (!existsSync(path)) return entries;
    const raw = JSON.parse(readFileSync(path, "utf-8")) as { version?: unknown; states?: unknown };
    if (raw.version !== 1 || !Array.isArray(raw.states)) return entries;
    for (const entry of raw.states) {
      if (!Array.isArray(entry) || entry.length !== 2) continue;
      const [id, value] = entry as [unknown, unknown];
      if (typeof id !== "string") continue;
      const state = persistableState(value);
      if (state) entries.set(id, state);
    }
  } catch {
    /* missing/corrupt snapshot: start empty */
  }
  return entries;
}

function waitForSnapshotLock(): void {
  try {
    Atomics.wait(lockWaitCell, 0, 0, SNAPSHOT_LOCK_RETRY_MS);
  } catch {
    const until = Date.now() + SNAPSHOT_LOCK_RETRY_MS;
    while (Date.now() < until) {
      /* Atomics.wait may be unavailable in restricted runtimes. */
    }
  }
}

function withSnapshotLock<T>(path: string, action: () => T): T {
  const directory = dirname(path);
  const lockPath = `${path}.lock`;
  const deadline = Date.now() + SNAPSHOT_LOCK_WAIT_MS;
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  try {
    chmodSync(directory, 0o700);
  } catch {
    /* Windows ACLs are managed outside this cache. */
  }

  for (;;) {
    let acquired = false;
    try {
      const fd = openSync(lockPath, "wx", 0o600);
      closeSync(fd);
      acquired = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
    if (acquired) {
      try {
        return action();
      } finally {
        rmSync(lockPath, { force: true });
      }
    }

    try {
      if (Date.now() - statSync(lockPath).mtimeMs > SNAPSHOT_LOCK_STALE_MS) {
        rmSync(lockPath, { force: true });
        continue;
      }
    } catch {
      continue;
    }
    if (Date.now() >= deadline) throw new Error("Timed out waiting for response-state lock");
    waitForSnapshotLock();
  }
}

function pruneLargeStateFiles(path: string): void {
  const directory = largeStateDir(path);
  if (!existsSync(directory)) return;
  const at = now();
  const live: { path: string; mtimeMs: number; size: number }[] = [];
  let total = 0;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !/^[a-f0-9]{64}\.json$/.test(entry.name)) continue;
    const filePath = join(directory, entry.name);
    try {
      const stat = statSync(filePath);
      if (at - stat.mtimeMs > RESPONSE_TTL_MS) {
        rmSync(filePath, { force: true });
        continue;
      }
      total += stat.size;
      live.push({ path: filePath, mtimeMs: stat.mtimeMs, size: stat.size });
    } catch {
      /* raced another writer/cleanup */
    }
  }
  live.sort((a, b) => a.mtimeMs - b.mtimeMs);
  while (total > LARGE_STATE_TOTAL_MAX_BYTES || live.length > MAX_STORED_RESPONSES) {
    const oldest = live.shift();
    if (!oldest) break;
    rmSync(oldest.path, { force: true });
    total -= oldest.size;
  }
}

function writeLargeState(
  path: string,
  id: string,
  state: Omit<StoredResponseState, "sizeBytes">
): boolean {
  try {
    const serialized = JSON.stringify({ version: 1, id, state });
    if (Buffer.byteLength(serialized, "utf8") > LARGE_STATE_ENTRY_MAX_BYTES) return false;
    atomicWriteFile(largeStatePath(path, id), serialized);
    pruneLargeStateFiles(path);
    return true;
  } catch {
    return false;
  }
}

function readLargeState(
  path: string,
  id: string
): Omit<StoredResponseState, "sizeBytes"> | undefined {
  const filePath = largeStatePath(path, id);
  try {
    if (!existsSync(filePath)) return undefined;
    const stat = statSync(filePath);
    if (stat.size > LARGE_STATE_ENTRY_MAX_BYTES || now() - stat.mtimeMs > RESPONSE_TTL_MS) {
      rmSync(filePath, { force: true });
      return undefined;
    }
    const raw = JSON.parse(readFileSync(filePath, "utf8")) as {
      version?: unknown;
      id?: unknown;
      state?: unknown;
    };
    if (raw.version !== 1 || raw.id !== id) return undefined;
    const state = persistableState(raw.state);
    if (!state || now() - state.createdAt > RESPONSE_TTL_MS) {
      rmSync(filePath, { force: true });
      return undefined;
    }
    return state;
  } catch {
    return undefined;
  }
}

/**
 * Best-effort disk snapshot so previous_response_id chains survive a proxy restart (the
 * dominant expansion-miss cause: an in-memory-only store dies with the process, and the next
 * chained turn then reaches the upstream as a naked delta). Load is lazy on first store access;
 * persistence is debounced + unref'd so the hot path never blocks and the process can exit.
 * Every disk failure is swallowed — the snapshot is a cache, not a source of truth.
 */
function ensureLoaded(): void {
  if (loaded) return;
  loaded = true;
  for (const [id, state] of readSnapshot(snapshotPath())) {
    const existing = states.get(id);
    // A reload must not replace a newer state produced in this isolate with an older disk copy.
    if (!existing || state.createdAt > existing.createdAt) setEntry(id, state);
  }
  pruneResponses();
}

function persistNow(path: string): void {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  pendingPersistPath = null;
  try {
    const smallStates = new Map<string, Omit<StoredResponseState, "sizeBytes">>();
    const persistedLargeStates = new Map<string, Omit<StoredResponseState, "sizeBytes">>();
    for (const [id, state] of states) {
      const { sizeBytes = 0, ...persistable } = state;
      // Avoid constructing another multi-megabyte JSON string merely to choose the storage tier.
      // Near the boundary, serialize once for an exact UTF-8 byte count.
      const clearlyLarge = sizeBytes > SNAPSHOT_ENTRY_MAX_BYTES - 1_024;
      const size = clearlyLarge
        ? SNAPSHOT_ENTRY_MAX_BYTES + 1
        : Buffer.byteLength(JSON.stringify([id, persistable]), "utf8");
      if (size > SNAPSHOT_ENTRY_MAX_BYTES) {
        const alreadyPersisted = !dirtyStateIds.has(id) && existsSync(largeStatePath(path, id));
        if (alreadyPersisted || writeLargeState(path, id, persistable)) {
          persistedLargeStates.set(id, persistable);
        }
      } else {
        smallStates.set(id, persistable);
        rmSync(largeStatePath(path, id), { force: true });
      }
    }

    withSnapshotLock(path, () => {
      const merged = readSnapshot(path);
      for (const [id, state] of persistedLargeStates) {
        const existing = merged.get(id);
        if (!existing || state.createdAt >= existing.createdAt) merged.delete(id);
      }
      for (const [id, state] of smallStates) {
        const existing = merged.get(id);
        if (!existing || state.createdAt >= existing.createdAt) merged.set(id, state);
      }

      const entries: [string, Omit<StoredResponseState, "sizeBytes">][] = [];
      let total = 0;
      // Newest-first so concurrent writers retain the most recent valid chains within both caps.
      for (const entry of [...merged].sort((a, b) => b[1].createdAt - a[1].createdAt)) {
        if (now() - entry[1].createdAt > RESPONSE_TTL_MS) continue;
        const size = Buffer.byteLength(JSON.stringify(entry), "utf8");
        if (size > SNAPSHOT_ENTRY_MAX_BYTES) continue;
        if (entries.length >= MAX_STORED_RESPONSES || total + size > SNAPSHOT_TOTAL_MAX_BYTES)
          break;
        total += size;
        entries.push(entry);
      }
      entries.reverse();
      atomicWriteFile(path, JSON.stringify({ version: 1, states: entries }));
    });
    for (const id of smallStates.keys()) dirtyStateIds.delete(id);
    for (const id of persistedLargeStates.keys()) dirtyStateIds.delete(id);
  } catch {
    /* best-effort: disk trouble must never affect request handling */
  }
}

function schedulePersist(): void {
  if (persistTimer) return;
  // Resolve the target path now: tests may swap CODEX_CHATGPT_WEB_HOME before the
  // debounce fires, and a late write must land in the home that owned the recorded state.
  pendingPersistPath = snapshotPath();
  const path = pendingPersistPath;
  persistTimer = setTimeout(() => persistNow(path), SNAPSHOT_DEBOUNCE_MS);
  (persistTimer as { unref?: () => void }).unref?.();
}

/** Flush any pending debounced snapshot write (graceful shutdown / deterministic tests). */
export function flushResponseState(): void {
  if (!persistTimer) return;
  // Use the path captured when the write was scheduled; CODEX_CHATGPT_WEB_HOME may have moved.
  persistNow(pendingPersistPath ?? snapshotPath());
}

function inputItems(input: unknown): unknown[] {
  if (input === undefined) return [];
  if (Array.isArray(input)) return input;
  if (typeof input === "string") return [{ role: "user", content: input }];
  return [input];
}

function pruneResponses(at = now()): void {
  for (const [id, state] of states) {
    if (at - state.createdAt > RESPONSE_TTL_MS) deleteEntry(id);
  }
  while (states.size > MAX_STORED_RESPONSES) {
    const oldest = states.keys().next().value;
    if (!oldest) break;
    deleteEntry(oldest);
  }
  // Byte high-water eviction, oldest-first (Map preserves insertion order).
  while (storedResponseBytes > MAX_STORED_RESPONSE_BYTES && states.size > 1) {
    const oldest = states.keys().next().value;
    if (!oldest) break;
    deleteEntry(oldest);
  }
}

function namespaceMatches(state: StoredResponseState | undefined, namespace?: string): boolean {
  if (!state) return false;
  const expected = namespace?.trim() || undefined;
  return state.namespace === expected;
}

function lookupStoredResponse(id: string, namespace?: string): StoredResponseState | undefined {
  ensureLoaded();
  pruneResponses();
  const cached = states.get(id);
  if (namespaceMatches(cached, namespace)) return cached;
  loaded = false;
  ensureLoaded();
  pruneResponses();
  const reloaded = states.get(id);
  if (reloaded) return namespaceMatches(reloaded, namespace) ? reloaded : undefined;
  const large = readLargeState(snapshotPath(), id);
  if (!namespaceMatches(large, namespace) || !large) return undefined;
  setEntry(id, large);
  pruneResponses();
  return states.get(id);
}

export function expandPreviousResponseInput(body: unknown, namespace?: string): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const request = body as Record<string, unknown>;
  const previousId =
    typeof request.previous_response_id === "string" ? request.previous_response_id : undefined;
  if (!previousId) return body;
  const previous = lookupStoredResponse(previousId, namespace);
  if (!previous) return body;
  const expanded = {
    ...request,
    input: [...previous.items, ...inputItems(request.input)],
  };
  replayedInputPrefixLengths.set(expanded, previous.items.length);
  return expanded;
}

/** Number of leading input items restored from previous_response_id state for this exact body. */
export function previousResponseReplayPrefixLength(body: unknown): number {
  if (!body || typeof body !== "object" || Array.isArray(body)) return 0;
  return replayedInputPrefixLengths.get(body) ?? 0;
}

/**
 * Cache completed output and max_output_tokens partial output for previous_response_id replay.
 * Content-filtered incomplete and failed output are not authoritative replay history.
 */
export function rememberResponseState(
  requestBody: unknown,
  response: { id?: unknown; output?: unknown; status?: unknown; incomplete_details?: unknown },
  opts?: ResponseStateOptions
): void {
  if (!requestBody || typeof requestBody !== "object" || Array.isArray(requestBody)) return;
  const request = requestBody as Record<string, unknown>;
  // `force` bypasses only the store:false skip: Codex sends `store:false` on every non-Azure
  // HTTP request (and WS inherits it), yet its WS turns still chain with previous_response_id.
  // The passthrough branch records with force so those chains can be expanded locally; the
  // store stays in-memory with a 1h TTL, so this is a proxy-internal continuation cache, not
  // real server-side response storage.
  if (request.store === false && !opts?.force) return;
  if (typeof response.id !== "string" || !Array.isArray(response.output)) return;
  if (response.status === "incomplete") {
    const details = response.incomplete_details;
    if (
      !details ||
      typeof details !== "object" ||
      Array.isArray(details) ||
      (details as { reason?: unknown }).reason !== "max_output_tokens"
    )
      return;
  } else if (response.status !== undefined && response.status !== "completed") return;
  ensureLoaded();
  const namespace = typeof opts?.namespace === "string" ? opts.namespace.trim() : "";
  setEntry(response.id, {
    createdAt: now(),
    items: [...inputItems(request.input), ...response.output],
    ...(namespace ? { namespace } : {}),
  });
  dirtyStateIds.add(response.id);
  pruneResponses();
  // Forced ChatGPT Web Codex continuations chain on the next HTTP request within
  // milliseconds. Debouncing that write left other Next.js isolates (and the next
  // hop) looking at an empty snapshot and 409ing a valid previous_response_id.
  if (opts?.force) persistNow(snapshotPath());
  else schedulePersist();
}

/** Clear in-memory continuation state without touching disk. Test-only. */
export function resetResponseStateForTests(): void {
  for (const id of [...states.keys()]) deleteEntry(id);
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = null;
  }
  pendingPersistPath = null;
  loaded = true;
  dirtyStateIds.clear();
}
