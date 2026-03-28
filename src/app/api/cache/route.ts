import { NextRequest, NextResponse } from "next/server";
import {
  getCacheStats,
  clearCache,
  cleanExpiredEntries,
  invalidateByModel,
  invalidateBySignature,
  invalidateStale,
} from "@/lib/semanticCache";
import { getIdempotencyStats } from "@/lib/idempotencyLayer";

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * GET /api/cache — Cache statistics
 */
export async function GET() {
  try {
    const cacheStats = getCacheStats();
    const idempotencyStats = getIdempotencyStats();

    return NextResponse.json({
      semanticCache: cacheStats,
      idempotency: idempotencyStats,
    });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

/**
 * DELETE /api/cache — Clear all caches or targeted invalidation.
 *
 * Exactly one optional query parameter may be provided:
 *   ?model=<name>      — invalidate all entries for a specific model
 *   ?signature=<hex>   — invalidate a single entry by its SHA-256 signature
 *   ?staleMs=<number>  — invalidate entries older than N milliseconds
 *   (no params)        — clear all cache entries
 *
 * Providing more than one parameter returns 400 Bad Request.
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const signature = searchParams.get("signature");
    const staleMsParam = searchParams.get("staleMs");

    // Enforce mutual exclusivity — only one invalidation mode per request
    const paramCount = [model, signature, staleMsParam].filter(Boolean).length;
    if (paramCount > 1) {
      return NextResponse.json(
        {
          error:
            "Only one invalidation parameter (model, signature, or staleMs) may be provided per request.",
        },
        { status: 400 }
      );
    }

    if (model) {
      const removed = invalidateByModel(model);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "model", model });
    }

    if (signature) {
      const removed = invalidateBySignature(signature);
      return NextResponse.json({ ok: true, invalidated: removed ? 1 : 0, scope: "signature" });
    }

    if (staleMsParam) {
      const maxAgeMs = parseInt(staleMsParam, 10);
      if (Number.isNaN(maxAgeMs) || maxAgeMs <= 0) {
        return NextResponse.json(
          { error: "staleMs must be a positive integer (milliseconds)." },
          { status: 400 }
        );
      }
      const removed = invalidateStale(maxAgeMs);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "stale", maxAgeMs });
    }

    // Full clear
    clearCache();
    const expiredRemoved = cleanExpiredEntries();
    return NextResponse.json({ ok: true, expiredRemoved, scope: "all" });
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
