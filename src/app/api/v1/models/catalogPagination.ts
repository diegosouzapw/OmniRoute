/**
 * OpenAI-compatible `limit` / `after` paging plus a complete JSON body writer
 * for GET /v1/models. Large catalogs (~1MB+) were returned as one
 * `Response.json()` write without Content-Length, which cut mid-body for
 * Desktop and other buffered clients.
 */

export const CATALOG_PAGE_LIMIT_MAX = 10_000;
export const CATALOG_BODY_CHUNK_BYTES = 64 * 1024;

export type CatalogPage = {
  after: string | null;
  limit: number | null;
};

export type CatalogPageResult<T> = {
  models: T[];
  hasMore: boolean;
  lastId: string | null;
};

/**
 * Parse OpenAI-style `limit` and `after` query params. Missing or invalid
 * values mean "return the full list" so existing clients stay byte-compatible
 * aside from the added Content-Length header.
 */
export function parseCatalogPage(request: Request): CatalogPage {
  const url = new URL(request.url);
  const afterRaw = url.searchParams.get("after");
  const after = afterRaw && afterRaw.trim().length > 0 ? afterRaw.trim() : null;
  const limitRaw = url.searchParams.get("limit");
  let limit: number | null = null;
  if (limitRaw != null && limitRaw.trim() !== "") {
    const parsed = Number.parseInt(limitRaw, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      limit = Math.min(parsed, CATALOG_PAGE_LIMIT_MAX);
    }
  }
  return { after, limit };
}

export function catalogPageCacheKey(page: CatalogPage): string {
  return `after=${page.after ?? ""};limit=${page.limit ?? ""}`;
}

export function applyCatalogPage<T extends { id?: unknown }>(
  models: T[],
  page: CatalogPage
): CatalogPageResult<T> {
  if (!page.after && page.limit == null) {
    return { models, hasMore: false, lastId: null };
  }

  let start = 0;
  if (page.after) {
    const idx = models.findIndex((model) => model.id === page.after);
    start = idx >= 0 ? idx + 1 : 0;
  }

  const end = page.limit != null ? start + page.limit : models.length;
  const sliced = models.slice(start, end);
  const last = sliced[sliced.length - 1];
  return {
    models: sliced,
    hasMore: end < models.length,
    lastId: typeof last?.id === "string" ? last.id : null,
  };
}

/**
 * Serialize a catalog JSON object with Content-Length and chunked enqueue so
 * the body cannot be cut mid-write on large payloads.
 */
export function catalogJsonResponse(
  body: Record<string, unknown>,
  headers: Record<string, string> = {},
  status = 200
): Response {
  const payload = JSON.stringify(body);
  return catalogStringResponse(payload, headers, status);
}

export function catalogStringResponse(
  payload: string,
  headers: Headers | Record<string, string> = {},
  status = 200
): Response {
  const bytes = Buffer.byteLength(payload);
  const merged = headers instanceof Headers ? new Headers(headers) : new Headers(headers);
  merged.set("content-type", "application/json");
  merged.set("content-length", String(bytes));

  if (bytes <= CATALOG_BODY_CHUNK_BYTES) {
    return new Response(payload, { status, headers: merged });
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const buf = Buffer.from(payload);
      for (let offset = 0; offset < buf.length; offset += CATALOG_BODY_CHUNK_BYTES) {
        controller.enqueue(buf.subarray(offset, offset + CATALOG_BODY_CHUNK_BYTES));
      }
      controller.close();
    },
  });
  return new Response(stream, { status, headers: merged });
}
