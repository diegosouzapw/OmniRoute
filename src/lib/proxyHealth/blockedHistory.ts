import fs from "node:fs";
import path from "node:path";
import type { ProbeCause } from "./decision.ts";
import { resolveDataDir } from "@/lib/dataPaths";

const HISTORY_FILE = "blocked-history.json";

/**
 * Aggregate blocked-verdict history per proxy (persisted, observable only).
 *
 * Written ONLY by the periodic sweep in `scheduler.ts` right after the
 * display-verdict write; read by display consumers. The history aggregates
 * cause plus counts across sweeps and restarts (best-effort JSON file), so
 * the UI can show a refusal streak without re-probing.
 *
 * Lifecycle: an entry is the CURRENT refusal streak of one proxy. It ends —
 * and the entry is dropped — when a sweep sees the proxy healthy (`ok`), so
 * `count`/`firstSeen` never carry over a recovery; `fail`/`hang`/
 * `inconclusive` sweeps prove nothing about the target and keep the streak.
 * Entries of proxies that no longer exist (deleted by the operator, a
 * subscription sync, or the sweep's auto-remove) are pruned at the start of
 * every sweep against the live registry. It is NEVER imported
 * by the pure decision layer (`decision.ts`): recording an observation
 * neither counts a failure, nor writes a status, nor removes a proxy.
 */
export interface BlockedHistoryEntry {
  /** Cumulative blocked observations kept for this proxy. */
  count: number;
  /** ms epoch of the first kept observation. */
  firstSeen: number;
  /** ms epoch of the latest observation. */
  lastSeen: number;
  /** Cause of the latest observation (reused from the verdict builder). */
  lastCause: ProbeCause;
  /** Target HTTP status of the latest observation, null on refused relays. */
  lastStatus: number | null;
}

declare global {
  var __proxyHealthBlockedHistory: Map<string, BlockedHistoryEntry> | undefined;
  var __proxyHealthBlockedHistoryLoaded: boolean | undefined;
  var __proxyHealthBlockedHistoryLoadLogged: boolean | undefined;
}

function getHistoryMap(): Map<string, BlockedHistoryEntry> {
  if (!globalThis.__proxyHealthBlockedHistory) {
    globalThis.__proxyHealthBlockedHistory = new Map();
  }
  return globalThis.__proxyHealthBlockedHistory;
}

const MAX_BLOCKED_HISTORY = 5000;

function historyFilePath(): string {
  return path.join(resolveDataDir(), HISTORY_FILE);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidEntry(value: unknown): value is BlockedHistoryEntry {
  if (!isRecord(value)) return false;
  return (
    typeof value.count === "number" &&
    Number.isFinite(value.count) &&
    value.count > 0 &&
    typeof value.firstSeen === "number" &&
    typeof value.lastSeen === "number" &&
    (value.lastCause === "unclassified" ||
      value.lastCause === "target_refused" ||
      value.lastCause === "unproven") &&
    (typeof value.lastStatus === "number" || value.lastStatus === null)
  );
}

function loadHistory(): void {
  if (globalThis.__proxyHealthBlockedHistoryLoaded) return;
  globalThis.__proxyHealthBlockedHistoryLoaded = true;
  let raw: string;
  try {
    raw = fs.readFileSync(historyFilePath(), "utf8");
  } catch {
    return;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return;
    const entries = getHistoryMap();
    for (const [id, value] of Object.entries(parsed)) {
      if (!isValidEntry(value)) continue;
      if (entries.size >= MAX_BLOCKED_HISTORY) break;
      entries.set(id, value);
    }
  } catch {
    if (!globalThis.__proxyHealthBlockedHistoryLoadLogged) {
      globalThis.__proxyHealthBlockedHistoryLoadLogged = true;
      console.warn("[ProxyHealth] Blocked history unreadable, starting empty.");
    }
  }
}

const SAVE_DEBOUNCE_MS = 1000;
let saveTimer: ReturnType<typeof setTimeout> | null = null;
let saveFailureLogged = false;

function saveHistory(): void {
  try {
    const dir = resolveDataDir();
    fs.mkdirSync(dir, { recursive: true });
    const tmp = path.join(dir, `${HISTORY_FILE}.tmp`);
    fs.writeFileSync(tmp, JSON.stringify(Object.fromEntries(getHistoryMap())), "utf8");
    fs.renameSync(tmp, historyFilePath());
  } catch (error) {
    // Best-effort: a persistence failure never fails the sweep, but it is said
    // once so a history that silently stops surviving restarts is noticed.
    if (!saveFailureLogged) {
      saveFailureLogged = true;
      console.warn("[ProxyHealth] Blocked history not persisted:", (error as Error)?.message);
    }
  }
}

// One sweep records many observations: coalesce them into a single write.
function scheduleSave(): void {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveHistory();
  }, SAVE_DEBOUNCE_MS);
  saveTimer.unref?.();
}

/** Write any pending history now (tests, shutdown hooks). */
export function flushBlockedHistory(): void {
  if (!saveTimer) return;
  clearTimeout(saveTimer);
  saveTimer = null;
  saveHistory();
}

/**
 * Record one `blocked` observation for a proxy. Cumulative: `count`
 * increments per observation while `firstSeen` stays fixed. The cause is
 * reused from the already computed verdict — never re-classified here.
 */
export function recordBlockedObservation(
  id: string,
  cause: ProbeCause,
  status: number | null,
  at: number
): void {
  if (!id) return;
  loadHistory();
  const entries = getHistoryMap();
  const prior = entries.get(id);
  if (prior === undefined && entries.size >= MAX_BLOCKED_HISTORY) {
    const oldest = entries.keys().next();
    if (!oldest.done) entries.delete(oldest.value);
  }
  entries.delete(id);
  entries.set(id, {
    count: (prior?.count ?? 0) + 1,
    firstSeen: prior?.firstSeen ?? at,
    lastSeen: at,
    lastCause: cause,
    lastStatus: status,
  });
  scheduleSave();
}

export function getBlockedHistory(id: string): BlockedHistoryEntry | undefined {
  loadHistory();
  return getHistoryMap().get(id);
}

export function deleteBlockedHistory(id: string): void {
  loadHistory();
  if (getHistoryMap().delete(id)) scheduleSave();
}

/**
 * Drop the history of every proxy not in `liveIds` (the full registry read by
 * the sweep). Covers every delete path — operator, batch, subscription sync —
 * without each having to know about this store. Returns the pruned count.
 */
export function pruneBlockedHistory(liveIds: Iterable<string>): number {
  loadHistory();
  const live = new Set(liveIds);
  const entries = getHistoryMap();
  let pruned = 0;
  for (const id of [...entries.keys()]) {
    if (!live.has(id)) {
      entries.delete(id);
      pruned++;
    }
  }
  if (pruned > 0) scheduleSave();
  return pruned;
}

/** Tests only: isolate suites sharing the process memory. */
export function clearBlockedHistoryForTesting(opts?: { keepFile?: boolean }): void {
  if (opts?.keepFile === true) flushBlockedHistory();
  else if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  getHistoryMap().clear();
  globalThis.__proxyHealthBlockedHistoryLoaded = false;
  globalThis.__proxyHealthBlockedHistoryLoadLogged = false;
  if (opts?.keepFile !== true) {
    try {
      // Remove only our own file — never the directory (the DB lives there).
      fs.rmSync(historyFilePath(), { force: true });
    } catch {
      // No file yet — nothing to remove.
    }
  }
}

/** Tests only: cap oracle for the size test. */
export function __blockedHistoryCapForTesting(): number {
  return MAX_BLOCKED_HISTORY;
}

/** Tests only: size oracle for the size test. */
export function __blockedHistorySizeForTesting(): number {
  return getHistoryMap().size;
}
