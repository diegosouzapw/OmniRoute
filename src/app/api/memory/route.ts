import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { listMemories, createMemory, getMemoryTokensUsed } from "@/lib/memory/store";
import { memoryCache } from "@/lib/memory/cache";
import { MemoryType } from "@/lib/memory/types";
import { parsePaginationParams, buildPaginatedResponse } from "@/shared/types/pagination";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const createMemorySchema = z.object({
  content: z.string().min(1),
  key: z.string().min(1),
  type: z.nativeEnum(MemoryType).default(MemoryType.FACTUAL),
  sessionId: z.string().default(""),
  apiKeyId: z.string().default(""),
  metadata: z.record(z.string(), z.unknown()).default({}),
  expiresAt: z.coerce.date().nullable().default(null),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    const paginationParams = parsePaginationParams(searchParams);
    const rawOffset = searchParams.get("offset");
    const offset =
      typeof rawOffset === "string" && rawOffset.trim().length > 0
        ? Math.max(0, Number.parseInt(rawOffset, 10) || 0)
        : undefined;
    const query = searchParams.get("q") || undefined;

    const apiKeyId = searchParams.get("apiKeyId") || undefined;
    const type = (searchParams.get("type") as any) || undefined;
    const sessionId = searchParams.get("sessionId") || undefined;

    const result = await listMemories({
      apiKeyId,
      type,
      sessionId,
      query,
      limit: paginationParams.limit,
      offset,
      page: offset === undefined ? paginationParams.page : undefined,
    });

    // Total tokens across all memories (computed in SQL inside the domain module
    // to avoid loading every memory's content into process memory).
    const tokensUsed = getMemoryTokensUsed(apiKeyId);

    // Compute hit rate from memory cache
    const cacheStats = memoryCache.stats();
    const totalCacheRequests = cacheStats.hits + cacheStats.misses;
    const hitRate = totalCacheRequests > 0 ? cacheStats.hits / totalCacheRequests : 0;

    const stats = {
      total: result.total,
      byType: result.byType ?? {},
      tokensUsed,
      hitRate,
      // Plan 21 / D18: MemoriesTab uses cacheStats to decide whether to render
      // the Hit Rate card (only when hits + misses > 0). Without this field
      // the card would never appear even when hitRate > 0.
      cacheStats: { hits: cacheStats.hits, misses: cacheStats.misses },
    };

    const responsePagination =
      offset === undefined
        ? paginationParams
        : {
            ...paginationParams,
            page: Math.floor(offset / paginationParams.limit) + 1,
          };

    const paginatedResponse = buildPaginatedResponse(result.data, result.total, responsePagination);

    return NextResponse.json({
      ...paginatedResponse,
      stats,
    });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(createMemorySchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const memoryId = await createMemory(validation.data);
    return NextResponse.json({ success: true, id: memoryId });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 400 });
  }
}
