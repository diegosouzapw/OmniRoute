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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/cache — Clear all caches or targeted invalidation
 *
 * Query params:
 *   ?model=<name>      — invalidate entries for a specific model
 *   ?signature=<hex>   — invalidate a single entry by signature
 *   ?staleMs=<number>  — invalidate entries older than N milliseconds
 *   (no params)        — clear everything
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const signature = searchParams.get("signature");
    const staleMsParam = searchParams.get("staleMs");

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
      if (isNaN(maxAgeMs) || maxAgeMs <= 0) {
        return NextResponse.json({ error: "Invalid staleMs value" }, { status: 400 });
      }
      const removed = invalidateStale(maxAgeMs);
      return NextResponse.json({ ok: true, invalidated: removed, scope: "stale", maxAgeMs });
    }

    // Full clear
    clearCache();
    const expiredRemoved = cleanExpiredEntries();
    return NextResponse.json({ ok: true, expiredRemoved, scope: "all" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
