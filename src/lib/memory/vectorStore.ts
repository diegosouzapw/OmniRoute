// Raw SQL allowed: sqlite-vec virtual table DDL is dynamic (dim varies). See plan 21 §D5.
// Hard Rule #5 exception: sqlite-vec VIRTUAL TABLE cannot be created via src/lib/db/ domain modules
// because the table dimension (N in FLOAT[N]) depends on the active embedding model at runtime.
//
// NOTE on rowid: vec0 v0.1.9 requires BigInt when inserting explicit rowid values.
// The vec_memories table uses the *same* rowid space as the `memories` table to enable
// a simple JOIN (m.rowid = v.rowid). We do NOT use a named primary-key column because
// vec0 rejects numeric (non-BigInt) values for named PKs in this version.

import { createRequire } from "module";
import type { EmbeddingResolution } from "./embedding/types";
import {
  getMemoryVecMeta,
  setMemoryVecMeta,
  markAllMemoriesNeedReindex,
  countMemoryReindexPending,
} from "../localDb";
import { getDbInstance } from "../db/core";
import { logger } from "../../../open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "../../../open-sse/utils/error.ts";

const _require = createRequire(import.meta.url);

const log = logger("VECTOR_STORE");

// ──────────────── Types ────────────────

export interface VectorSearchHit {
  memoryId: string; // UUID (same as memories.id)
  distance: number; // L2 distance — lower = more similar
  score: number; // 1 / (1 + distance) — higher = better
}

export interface HybridRrfHit {
  memoryId: string;
  vecRank: number | null; // null if not from vector search
  ftsRank: number | null; // null if not from FTS5
  rrfScore: number; // RRF score (k=60 default)
  vecDistance: number | null;
  ftsScore: number | null;
}

export interface VectorStore {
  /** Ensure schema (sqlite-vec loaded, vec_memories created if needed, dim aligned). Idempotent. */
  ensureReady(resolution: EmbeddingResolution): Promise<{ ready: boolean; reason: string }>;
  /** Insert/update vector for a memory. */
  upsertVector(memoryId: string, vector: Float32Array): Promise<void>;
  /** Delete vector for a memory (no-op if not present). */
  deleteVector(memoryId: string): Promise<void>;
  /** KNN brute-force search. Returns top-K hits ordered by distance ASC. */
  searchVector(vector: Float32Array, topK: number, apiKeyId?: string): Promise<VectorSearchHit[]>;
  /** Hybrid RRF search (FTS5 + vector fused via Reciprocal Rank Fusion, k=60). */
  searchHybrid(
    vector: Float32Array,
    queryText: string,
    topK: number,
    apiKeyId?: string,
  ): Promise<HybridRrfHit[]>;
  /** Stats for UI Engine status. */
  stats(): Promise<{
    rowCount: number;
    needsReindex: number;
    activeDim: number | null;
    signature: string | null;
  }>;
  /** Drop and recreate vec_memories (on signature change). Marks all memories needs_reindex=1. */
  resetForSignature(signature: string, dim: number): Promise<void>;
}

// ──────────────── Constants ────────────────

const RRF_K = Number(process.env["MEMORY_RRF_K"] ?? 60);
const TOP_K_DEFAULT = Number(process.env["MEMORY_VEC_TOP_K"] ?? 20);

// ──────────────── Helpers ────────────────

/**
 * Encode a Float32Array as a Buffer of little-endian bytes.
 * sqlite-vec accepts this format for FLOAT[] column values. For int8 tables the
 * SAME float32 blob is passed and quantized in SQL via vec_quantize_int8.
 */
function encodeVector(v: Float32Array): Buffer {
  return Buffer.from(v.buffer, v.byteOffset, v.byteLength);
}

// ──────────────── Quantization (F4.4 / Q2) ────────────────

/** Vector storage quantization mode. Opt-in via MEMORY_VEC_QUANTIZATION=int8. */
export type VecQuantization = "none" | "int8";

/** Mode requested for a NEWLY (re)created vec table (env opt-in, default none). */
function requestedVecQuantization(): VecQuantization {
  return process.env["MEMORY_VEC_QUANTIZATION"] === "int8" ? "int8" : "none";
}

/**
 * Mode actually in effect for the EXISTING table, derived from the stored
 * signature. Reads/writes use this (not the env) so they always match the
 * on-disk column type — an env change only takes effect on the next reset.
 */
function storedVecQuantization(signature: string | null): VecQuantization {
  return signature && signature.endsWith(":int8") ? "int8" : "none";
}

/** Append the int8 marker so switching modes is a signature change → reindex. */
function withQuantizationSignature(base: string, q: VecQuantization): string {
  return q === "int8" ? `${base}:int8` : base;
}

/** vec0 column type for the embedding column. */
function vecColumnType(dim: number, q: VecQuantization): string {
  return q === "int8" ? `int8[${dim}]` : `FLOAT[${dim}]`;
}

/**
 * SQL placeholder for a bound float32 blob. int8 tables quantize it in SQL via
 * `vec_quantize_int8(?, 'unit')` (embeddings are unit-normalized); float32 tables
 * bind the raw blob. The bound parameter is ALWAYS the float32 blob either way.
 */
function vecValueExpr(q: VecQuantization): string {
  return q === "int8" ? "vec_quantize_int8(?, 'unit')" : "?";
}

/** Quantization mode of the live table (from the persisted signature). */
function liveVecQuantization(): VecQuantization {
  return storedVecQuantization(getMemoryVecMeta().embeddingSignature);
}

// ──────────────── Implementation ────────────────

class VectorStoreImpl implements VectorStore {
  async ensureReady(resolution: EmbeddingResolution): Promise<{ ready: boolean; reason: string }> {
    const db = getDbInstance();
    const meta = getMemoryVecMeta();
    const requested = requestedVecQuantization();

    // The quantization mode is folded into the signature so flipping it (e.g.
    // none → int8) is detected as a signature change and triggers a reindex.
    if (resolution.dimensions !== null) {
      const effectiveSignature = withQuantizationSignature(resolution.signature, requested);
      if (effectiveSignature !== meta.embeddingSignature) {
        await this.resetForSignature(effectiveSignature, resolution.dimensions);
        return {
          ready: true,
          reason: `vec_memories recreated with dim=${resolution.dimensions} (${requested})`,
        };
      }
    }

    // Already marked loaded → idempotent no-op.
    if (meta.vecLoaded) {
      return { ready: true, reason: "vec_memories already ready" };
    }

    // Not yet loaded but we have a dim — create the table now. Use the mode of the
    // EXISTING data (from the stored signature) so the column type matches on-disk.
    if (resolution.dimensions !== null) {
      const dim = meta.activeDim ?? resolution.dimensions;
      const q = storedVecQuantization(meta.embeddingSignature);
      try {
        db.exec(
          `CREATE VIRTUAL TABLE IF NOT EXISTS vec_memories USING vec0(embedding ${vecColumnType(dim, q)})`,
        );
        setMemoryVecMeta({ vecLoaded: true, activeDim: dim });
        return { ready: true, reason: `vec_memories created with dim=${dim} (${q})` };
      } catch (err: unknown) {
        const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
        return { ready: false, reason: `failed to create vec_memories: ${msg}` };
      }
    }

    return { ready: false, reason: "no dimensions available yet (lazy probe pending)" };
  }

  async upsertVector(memoryId: string, vector: Float32Array): Promise<void> {
    const db = getDbInstance();

    // Map UUID memoryId → INTEGER rowid (the rowid is used as the FK into vec_memories).
    const row = db.prepare("SELECT rowid FROM memories WHERE id = ?").get(memoryId) as
      | { rowid: number }
      | undefined;

    if (!row) {
      throw new Error(`memory not found: ${memoryId}`);
    }

    // vec0 v0.1.9 requires BigInt for explicit rowid insertion — plain numbers are rejected.
    // INSERT OR REPLACE is not supported by vec0 — use DELETE + INSERT for upsert semantics.
    // int8 tables quantize the float32 blob in SQL (vec_quantize_int8); float32 bind raw.
    const q = liveVecQuantization();
    db.prepare("DELETE FROM vec_memories WHERE rowid = ?").run(BigInt(row.rowid));
    db.prepare(`INSERT INTO vec_memories(rowid, embedding) VALUES (?, ${vecValueExpr(q)})`).run(
      BigInt(row.rowid),
      encodeVector(vector),
    );
  }

  async deleteVector(memoryId: string): Promise<void> {
    const db = getDbInstance();
    db.prepare(
      "DELETE FROM vec_memories WHERE rowid = (SELECT rowid FROM memories WHERE id = ?)",
    ).run(memoryId);
  }

  async searchVector(
    vector: Float32Array,
    topK: number,
    apiKeyId?: string,
  ): Promise<VectorSearchHit[]> {
    const db = getDbInstance();
    const k = topK > 0 ? topK : TOP_K_DEFAULT;

    const q = liveVecQuantization();
    const rows = db
      .prepare(
        `SELECT m.id AS memory_id, v.distance
         FROM vec_memories v
         JOIN memories m ON m.rowid = v.rowid
         WHERE v.embedding MATCH ${vecValueExpr(q)}
           AND ($apiKeyId IS NULL OR m.api_key_id = $apiKeyId)
           AND k = ?
         ORDER BY v.distance ASC`,
      )
      .all(encodeVector(vector), { apiKeyId: apiKeyId ?? null }, k) as Array<{
        memory_id: string;
        distance: number;
      }>;

    return rows.map((r) => ({
      memoryId: r.memory_id,
      distance: r.distance,
      score: 1 / (1 + r.distance),
    }));
  }

  async searchHybrid(
    vector: Float32Array,
    queryText: string,
    topK: number,
    apiKeyId?: string,
  ): Promise<HybridRrfHit[]> {
    const db = getDbInstance();
    const k = topK > 0 ? topK : TOP_K_DEFAULT;
    const rrfK = RRF_K;
    const q = liveVecQuantization();

    // SQLite does not support FULL OUTER JOIN — use UNION ALL + GROUP BY (RRF recipe).
    // Reference: https://alexgarcia.xyz/blog/2024/sqlite-vec-hybrid-search/
    const rows = db
      .prepare(
        `WITH vec_results AS (
           SELECT m.id AS memory_id,
                  ROW_NUMBER() OVER (ORDER BY v.distance ASC) AS vec_rank,
                  v.distance AS vec_distance
           FROM vec_memories v
           JOIN memories m ON m.rowid = v.rowid
           WHERE v.embedding MATCH ${vecValueExpr(q)}
             AND ($apiKeyId IS NULL OR m.api_key_id = $apiKeyId)
             AND k = ?
         ),
         fts_results AS (
           SELECT m.id AS memory_id,
                  ROW_NUMBER() OVER (ORDER BY fts.rank ASC) AS fts_rank,
                  fts.rank AS fts_score
           FROM memory_fts fts
           JOIN memories m ON m.memory_id = fts.rowid
           WHERE fts.memory_fts MATCH ?
             AND ($apiKeyId IS NULL OR m.api_key_id = $apiKeyId)
           LIMIT ?
         ),
         fused AS (
           SELECT
             memory_id,
             MAX(vec_rank)      AS vec_rank,
             MAX(fts_rank)      AS fts_rank,
             MAX(vec_distance)  AS vec_distance,
             MAX(fts_score)     AS fts_score,
             SUM(rrf_contrib)   AS rrf_score
           FROM (
             SELECT memory_id, vec_rank, NULL AS fts_rank, vec_distance,
                    NULL AS fts_score, 1.0 / (${rrfK} + vec_rank) AS rrf_contrib
             FROM vec_results
             UNION ALL
             SELECT memory_id, NULL, fts_rank, NULL, fts_score, 1.0 / (${rrfK} + fts_rank)
             FROM fts_results
           )
           GROUP BY memory_id
         )
         SELECT memory_id, vec_rank, fts_rank, vec_distance, fts_score, rrf_score
         FROM fused
         ORDER BY rrf_score DESC
         LIMIT ?`,
      )
      .all(
        encodeVector(vector),
        { apiKeyId: apiKeyId ?? null },
        k,
        queryText,
        k,
        k,
      ) as Array<{
        memory_id: string;
        vec_rank: number | null;
        fts_rank: number | null;
        vec_distance: number | null;
        fts_score: number | null;
        rrf_score: number;
      }>;

    return rows.map((r) => ({
      memoryId: r.memory_id,
      vecRank: r.vec_rank,
      ftsRank: r.fts_rank,
      rrfScore: r.rrf_score,
      vecDistance: r.vec_distance,
      ftsScore: r.fts_score,
    }));
  }

  async stats(): Promise<{
    rowCount: number;
    needsReindex: number;
    activeDim: number | null;
    signature: string | null;
  }> {
    let rowCount = 0;
    try {
      const db = getDbInstance();
      const row = db.prepare("SELECT COUNT(*) AS cnt FROM vec_memories").get() as
        | { cnt: number }
        | undefined;
      rowCount = row?.cnt ?? 0;
    } catch {
      // vec_memories may not exist yet — not an error, just 0 rows.
      rowCount = 0;
    }

    const needsReindex = countMemoryReindexPending();
    const meta = getMemoryVecMeta();

    return {
      rowCount,
      needsReindex,
      activeDim: meta.activeDim,
      signature: meta.embeddingSignature,
    };
  }

  async resetForSignature(signature: string, dim: number): Promise<void> {
    const db = getDbInstance();
    // The column type follows the mode encoded in the (effective) signature.
    const q = storedVecQuantization(signature);

    // DROP + CREATE is intentionally destructive — triggers lazy backfill via F5.
    db.exec("DROP TABLE IF EXISTS vec_memories");
    db.exec(`CREATE VIRTUAL TABLE vec_memories USING vec0(embedding ${vecColumnType(dim, q)})`);

    markAllMemoriesNeedReindex();
    setMemoryVecMeta({
      activeDim: dim,
      embeddingSignature: signature,
      lastResetAt: new Date().toISOString(),
      vecLoaded: true,
    });
  }
}

// ──────────────── Singleton ────────────────

let _instance: VectorStore | null | undefined = undefined; // undefined = not yet attempted

/**
 * Singleton instance (lazy-initialized).
 * Returns null if sqlite-vec is unavailable (e.g. WASM / cloud backend).
 * Callers should degrade gracefully to FTS5 keyword search when this returns null.
 */
export function getVectorStore(): VectorStore | null {
  if (_instance !== undefined) {
    return _instance;
  }

  // Test seam: VECTOR_STORE_DISABLE_VEC=true forces null (simulates cloud/WASM environment).
  if (process.env["VECTOR_STORE_DISABLE_VEC"] === "true") {
    log.warn(
      "VECTOR_STORE_DISABLE_VEC is set — sqlite-vec disabled. Degrading to FTS5 keyword search.",
    );
    _instance = null;
    return null;
  }

  const db = getDbInstance();
  const raw = db.raw as { loadExtension?: (path: string) => void } | null;

  // sqlite-vec must be loaded as a native extension on the better-sqlite3 raw handle.
  // The SqliteAdapter wrapper does not expose loadExtension directly.
  if (!raw || typeof raw.loadExtension !== "function") {
    log.warn(
      "sqlite-vec not loaded: db driver does not support loadExtension (cloud/WASM backend). " +
        "Degrading to FTS5 keyword search.",
    );
    _instance = null;
    return null;
  }

  try {
    const sqliteVec = _require("sqlite-vec") as { load: (db: unknown) => void };
    sqliteVec.load(raw);
    log.info("sqlite-vec loaded successfully");
    _instance = new VectorStoreImpl();
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    log.warn(`sqlite-vec failed to load: ${safeMsg}. Degrading to FTS5 keyword search.`);
    _instance = null;
  }

  return _instance;
}

/**
 * Reset the singleton cache (for tests only — allows re-initialization between tests).
 * @internal
 */
export function _resetVectorStoreSingleton(): void {
  _instance = undefined;
}
