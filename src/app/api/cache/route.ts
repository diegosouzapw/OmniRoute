import { NextResponse } from "next/server";
import { getCacheStats, clearCache, cleanExpiredEntries } from "@/lib/semanticCache";
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
 * DELETE /api/cache — Clear all caches
 */
export async function DELETE() {
  try {
    clearCache();
    const cleaned = cleanExpiredEntries();
    return NextResponse.json({ ok: true, expiredRemoved: cleaned });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
