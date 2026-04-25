import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getChatGptImage } from "@omniroute/open-sse/services/chatgptImageCache.ts";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * Serve a cached ChatGPT-generated image by its opaque cache id.
 *
 * Auth: intentionally unauthenticated. The id is a 128-bit random UUID and
 * the entry has a short TTL, so the URL is unguessable for the lifetime of
 * the chat turn. We need it open because it's loaded by the user's BROWSER
 * (via an `<img>` tag rendered from markdown) — that fetch doesn't carry
 * the OmniRoute API key. Rate limiting / abuse protection sit at the
 * network layer the same way they do for any other static asset.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getChatGptImage(id);
  if (!entry) {
    return new Response(JSON.stringify({ error: "Image not found or expired" }), {
      status: 404,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
  // entry.bytes is a Buffer (subclass of Uint8Array); pass it directly.
  // Wrapping in `new Uint8Array(...)` would copy the entire payload — up to
  // 8 MB per image — for no benefit.
  return new Response(entry.bytes, {
    status: 200,
    headers: {
      "Content-Type": entry.mime,
      // Allow short browser caching — the id is unique-per-image, so a
      // cache hit is fine and saves a round-trip if the user re-renders
      // the chat. Beyond the in-memory TTL the URL 404s anyway.
      "Cache-Control": "private, max-age=1800",
      "Content-Length": String(entry.bytes.length),
      ...CORS_HEADERS,
    },
  });
}
