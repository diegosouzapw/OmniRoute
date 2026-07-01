/**
 * TV6 — Typed memory decay (opt-in, default-off).
 *
 * Memories become eligible for the decay sweep based on their `type` and age, unless they
 * are immune. Immunity comes from two independent sources:
 *
 *  - **Type immunity** — a type whose configured TTL is `null` never decays. By default
 *    `factual`/`procedural`/`semantic` are immune (durable knowledge), mirroring the
 *    token-savior design where "guardrail/convention/decision never decay". Only
 *    `episodic` (transient conversational context) decays by default.
 *  - **Access immunity** — a memory injected into prompts `>= accessImmunityThreshold`
 *    times has earned its keep and never decays, regardless of type.
 *
 * Every predicate here is a pure function of the record + config + clock. The destructive
 * sweep that consumes them is **opt-in** (`MEMORY_TYPED_DECAY_ENABLED`, default `false`):
 * with the sweep disabled nothing is ever deleted, so the new columns are pure telemetry.
 */

import { MemoryType, type Memory } from "./types";
import { listMemoriesForDecay, deleteMemory } from "./store";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("MEMORY_TYPED_DECAY");

const DAY_MS = 24 * 60 * 60 * 1000;

/** Hard cap on how many candidates a single sweep scans — keeps memory/latency bounded. */
export const SWEEP_SCAN_CAP = 5000;

export interface TypedDecayConfig {
  /** Master switch for the destructive sweep. Default `false` — never deletes by default. */
  enabled: boolean;
  /** Per-type TTL in days; `null` = immune (the type never decays). */
  ttlDaysByType: Record<MemoryType, number | null>;
  /** A memory injected `>=` this many times becomes immune (`0` disables access immunity). */
  accessImmunityThreshold: number;
}

/** Default per-type TTL: only `episodic` decays; durable types are immune. */
export const DEFAULT_TTL_DAYS_BY_TYPE: Record<MemoryType, number | null> = {
  [MemoryType.EPISODIC]: 30,
  [MemoryType.FACTUAL]: null,
  [MemoryType.PROCEDURAL]: null,
  [MemoryType.SEMANTIC]: null,
};

export const DEFAULT_ACCESS_IMMUNITY_THRESHOLD = 3;

/** Subset of a memory the decay predicates actually read. */
export type DecayCandidate = Pick<
  Memory,
  "id" | "type" | "accessCount" | "createdAt" | "lastAccessedAt"
>;

function parseNonNegativeInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

/**
 * Resolve the decay config from the environment (opt-in). `enabled` is `false` unless
 * `MEMORY_TYPED_DECAY_ENABLED === "true"`. `MEMORY_TYPED_DECAY_EPISODIC_DAYS=0` makes
 * episodic immune too (a fully no-op decay policy).
 */
export function resolveTypedDecayConfig(env: NodeJS.ProcessEnv = process.env): TypedDecayConfig {
  const enabled = env.MEMORY_TYPED_DECAY_ENABLED === "true";
  const episodicDays = parseNonNegativeInt(
    env.MEMORY_TYPED_DECAY_EPISODIC_DAYS,
    DEFAULT_TTL_DAYS_BY_TYPE[MemoryType.EPISODIC] as number
  );
  const accessImmunityThreshold = parseNonNegativeInt(
    env.MEMORY_TYPED_DECAY_ACCESS_IMMUNITY,
    DEFAULT_ACCESS_IMMUNITY_THRESHOLD
  );
  return {
    enabled,
    ttlDaysByType: {
      ...DEFAULT_TTL_DAYS_BY_TYPE,
      // 0 (or invalid) → immune; otherwise the configured number of days.
      [MemoryType.EPISODIC]: episodicDays > 0 ? episodicDays : null,
    },
    accessImmunityThreshold,
  };
}

/** A type whose configured TTL is `null` never decays. */
export function isTypeImmune(type: MemoryType, config: TypedDecayConfig): boolean {
  return config.ttlDaysByType[type] == null;
}

/** A memory accessed enough times is immune (disabled when the threshold is `0`). */
export function isAccessImmune(accessCount: number, config: TypedDecayConfig): boolean {
  return config.accessImmunityThreshold > 0 && accessCount >= config.accessImmunityThreshold;
}

/**
 * The instant past which a memory is decayed, or `null` when the memory is immune (by type
 * or by access count) and never decays. The clock starts from the most recent of
 * `lastAccessedAt`/`createdAt`, so recently-used memories get a fresh lease.
 */
export function computeDecayDeadline(
  memory: DecayCandidate,
  config: TypedDecayConfig
): Date | null {
  if (isTypeImmune(memory.type, config)) return null;
  if (isAccessImmune(memory.accessCount, config)) return null;
  const ttlDays = config.ttlDaysByType[memory.type];
  if (ttlDays == null || ttlDays <= 0) return null;
  const base = memory.lastAccessedAt ?? memory.createdAt;
  return new Date(base.getTime() + ttlDays * DAY_MS);
}

/** True when the memory is past its typed-decay deadline (and not immune). */
export function isMemoryDecayed(
  memory: DecayCandidate,
  config: TypedDecayConfig,
  now: Date
): boolean {
  const deadline = computeDecayDeadline(memory, config);
  if (deadline == null) return false;
  return now.getTime() > deadline.getTime();
}

export interface SweepResult {
  /** Candidates examined this pass. */
  scanned: number;
  /** Candidates classified as decayed (past deadline, not immune). */
  decayed: number;
  /** Ids actually deleted (empty on a dry run). */
  deletedIds: string[];
  /** True when the sweep no-op'd because it is disabled (opt-in). */
  skippedDisabled: boolean;
  /** True when the scan hit `SWEEP_SCAN_CAP` and more candidates may remain. */
  capped: boolean;
}

/**
 * Sweep decayed memories. **Opt-in**: when `config.enabled` is `false` and this is not a
 * dry run, it deletes nothing and returns `skippedDisabled: true`. A dry run classifies
 * candidates without deleting (so an operator can preview). Deletions go through
 * `deleteMemory`, which keeps SQLite/sqlite-vec/Qdrant in sync. Fail-open: a per-record
 * delete error is logged and skipped, never thrown.
 */
export async function sweepDecayedMemories(
  options: {
    config?: TypedDecayConfig;
    now?: Date;
    dryRun?: boolean;
    apiKeyId?: string;
  } = {}
): Promise<SweepResult> {
  const config = options.config ?? resolveTypedDecayConfig();
  const now = options.now ?? new Date();
  const dryRun = options.dryRun === true;

  if (!config.enabled && !dryRun) {
    return { scanned: 0, decayed: 0, deletedIds: [], skippedDisabled: true, capped: false };
  }

  const candidates = await listMemoriesForDecay({
    apiKeyId: options.apiKeyId,
    limit: SWEEP_SCAN_CAP + 1,
  });
  const capped = candidates.length > SWEEP_SCAN_CAP;
  const scanned = Math.min(candidates.length, SWEEP_SCAN_CAP);
  const batch = candidates.slice(0, SWEEP_SCAN_CAP);

  const decayedList = batch.filter((c) => isMemoryDecayed(c, config, now));
  const deletedIds: string[] = [];

  if (!dryRun) {
    for (const c of decayedList) {
      try {
        if (await deleteMemory(c.id)) deletedIds.push(c.id);
      } catch (err) {
        log.warn("memory.decay.delete.fail", {
          id: c.id,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  if (capped) {
    log.warn("memory.decay.sweep.capped", { scanned, cap: SWEEP_SCAN_CAP });
  }
  log.info("memory.decay.sweep.done", {
    scanned,
    decayed: decayedList.length,
    deleted: deletedIds.length,
    dryRun,
  });

  return {
    scanned,
    decayed: decayedList.length,
    deletedIds,
    skippedDisabled: false,
    capped,
  };
}

// --- Optional periodic sweep (mirrors startContextWindowReconcile) ---

let sweepTimer: ReturnType<typeof setInterval> | null = null;

function resolveSweepIntervalMs(env: NodeJS.ProcessEnv = process.env): number {
  const raw = env.MEMORY_TYPED_DECAY_SWEEP_INTERVAL;
  if (raw === undefined) return 0; // unset → disabled
  const seconds = Number(raw);
  if (!Number.isFinite(seconds) || seconds <= 0) return 0; // 0/invalid → disabled
  return Math.floor(seconds * 1000);
}

/**
 * Start the periodic decay sweep. **Doubly opt-in**: it no-ops unless BOTH
 * `MEMORY_TYPED_DECAY_ENABLED=true` (the destructive switch) AND
 * `MEMORY_TYPED_DECAY_SWEEP_INTERVAL>0` are set. Idempotent and best-effort: a sweep
 * error is swallowed (the next tick retries). Never deletes by default.
 */
export function startMemoryDecaySweep(intervalMs?: number): void {
  if (sweepTimer) return;
  const config = resolveTypedDecayConfig();
  if (!config.enabled) return; // master switch off → never run the destructive sweep
  const interval = intervalMs ?? resolveSweepIntervalMs();
  if (!interval || interval <= 0) return;

  const tick = () => {
    void sweepDecayedMemories({ config }).catch(() => {
      // Swallow — the sweep is advisory hygiene; the next tick retries.
    });
  };

  setTimeout(tick, 0);
  sweepTimer = setInterval(tick, interval);
  sweepTimer.unref?.();
}

export function stopMemoryDecaySweep(): void {
  if (sweepTimer) {
    clearInterval(sweepTimer);
    sweepTimer = null;
  }
}
