/**
 * shared.ts — Single source of truth for the intelligence transform skeleton
 * (remediation of AUDIT_TASKS.md 2.5).
 *
 * All four source transforms repeat the same shape: guard the input array,
 * normalise a model id, clamp a raw signal into 0..1, then fan out one row
 * per task category. That skeleton lives here; each transform keeps only
 * its raw→0..1 mapping.
 */
import { canonicalize } from "../idCanonicalizer.ts";
import type { ModelIntelligenceEntry } from "../../db/modelIntelligence.ts";

/** Row shape produced by every transform (syncedAt is stamped by the DB layer). */
export type IntelligenceRow = Omit<ModelIntelligenceEntry, "syncedAt">;

/**
 * The 7 canonical task categories. queryModelIntelligence()
 * (open-sse/services/autoCombo/taskFitness.ts:206-222) does exact-category
 * matching with no 'default' fallback, so every transform must emit one row
 * per category or its source contributes nothing to real routing (0.2).
 */
export const TASK_CATEGORIES = [
  "coding",
  "review",
  "planning",
  "analysis",
  "debugging",
  "documentation",
  "default",
] as const;

export type TaskCategory = (typeof TASK_CATEGORIES)[number];

/** Clamp a score into the 0..1 range. Non-finite input clamps to 0. */
export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

/** Normalise a raw model id: stringify, trim, lowercase; "" when missing. */
export function normId(value: unknown): string {
  if (typeof value === "string") return value.trim().toLowerCase();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/**
 * Narrow an unknown array element to a record. Returns null for null,
 * primitives, and arrays so transforms skip garbage rows without throwing.
 */
export function asRecord(value: unknown): Record<string, unknown> | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

/** Finite-number narrow helper: returns null for missing/non-numeric/NaN/±Infinity. */
export function asFinite(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export interface FanOutArgs {
  /** Already-normalised model id (via normId). */
  model: string;
  /** Source literal stored in the DB (kept stable for downstream sync consumers). */
  source: string;
  /** Clamped 0..1 signal, fanned out unchanged to all 7 categories (see below). */
  score: number;
  eloRaw?: number | null;
  confidence?: string | null;
  expiresAt?: string | null;
}

/**
 * Expand one model × signal into one row per TASK_CATEGORIES, populating
 * canonicalId/sourceId/matchConfidence via canonicalize().
 *
 * Same score across all 7 categories: none of the four external sources
 * (modelgrep, PublicAI, Arena external, Hugging Face) provides genuine
 * per-category signal — they each yield one scalar per model — so emitting
 * per-category variance would be fabricated data (Rule 1).
 */
export function fanOutCategories(args: FanOutArgs): IntelligenceRow[] {
  const match = canonicalize(args.model);
  return TASK_CATEGORIES.map((category) => ({
    model: args.model,
    source: args.source,
    category,
    score: args.score,
    eloRaw: args.eloRaw ?? null,
    confidence: args.confidence ?? null,
    expiresAt: args.expiresAt ?? null,
    canonicalId: match.canonicalId,
    sourceId: match.sourceId,
    matchConfidence: match.matchConfidence,
  }));
}
