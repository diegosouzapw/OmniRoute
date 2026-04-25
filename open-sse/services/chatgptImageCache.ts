/**
 * In-memory cache for ChatGPT-generated images so we can serve them via a
 * regular HTTP URL instead of inlining megabytes of base64 into SSE deltas.
 *
 * Why: chatgpt.com's `image_asset_pointer` resolves to a session-signed
 * `estuary/content` URL that 403s for any anonymous client. We have to
 * download the bytes server-side (with the user's session) and re-serve
 * them. Streaming the raw base64 back through SSE works but Open WebUI's
 * progressive markdown renderer displays each chunk as text mid-stream —
 * the user sees ~3 MB of base64 scroll past before the final `)` arrives
 * and the renderer recognizes it as an image. Hosting the image on a
 * regular URL avoids that entirely: we emit a tiny `![image](http://...)`
 * markdown delta and the browser fetches the image normally.
 *
 * The cache is in-memory only, with a short TTL — these URLs are single-use
 * artifacts of one chat turn, not persistent assets. If the user reloads
 * the conversation in a few hours the URLs will 404; that's expected.
 */

import { randomUUID } from "node:crypto";

interface CachedImage {
  bytes: Buffer;
  mime: string;
  expiresAt: number;
  context?: ChatGptImageConversationContext;
}

const cache = new Map<string, CachedImage>();
let cacheBytes = 0;
const DEFAULT_TTL_MS = 30 * 60 * 1000;
const MAX_ENTRIES = 200;
// Per-entry images cap at 8 MB (enforced upstream in the executor) so 32 MB
// covers ~4 large images. The byte cap matters more than entry count: a hot
// loop of 8 MB images would otherwise pin 1.6 GB of RSS before count
// eviction kicked in. Tune via OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB.
const DEFAULT_MAX_BYTES = 256 * 1024 * 1024;

function configuredMaxBytes(): number {
  const raw = Number(process.env.OMNIROUTE_CGPT_WEB_IMAGE_CACHE_MAX_MB);
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_MAX_BYTES;
  return Math.floor(raw * 1024 * 1024);
}

export interface ChatGptImageConversationContext {
  conversationId: string;
  parentMessageId: string;
}

function deleteEntry(id: string): void {
  const entry = cache.get(id);
  if (!entry) return;
  cacheBytes -= entry.bytes.length;
  cache.delete(id);
}

function evictExpired(now = Date.now()): void {
  for (const [id, entry] of cache) {
    if (now >= entry.expiresAt) deleteEntry(id);
  }
}

function evictUntilWithinLimits(maxBytes: number, incomingBytes: number): void {
  // Drop oldest until both the entry-count and total-byte caps are satisfied.
  // Map iteration is insertion-ordered so the first key is the oldest entry.
  while (
    (cache.size >= MAX_ENTRIES || cacheBytes + incomingBytes > maxBytes) &&
    cache.size > 0
  ) {
    const firstKey = cache.keys().next().value;
    if (!firstKey) break;
    deleteEntry(firstKey);
  }
}

export function storeChatGptImage(
  bytes: Buffer,
  mime: string,
  ttlMs = DEFAULT_TTL_MS,
  context?: ChatGptImageConversationContext
): string {
  evictExpired();
  evictUntilWithinLimits(configuredMaxBytes(), bytes.length);
  const id = randomUUID().replace(/-/g, "");
  cache.set(id, { bytes, mime, expiresAt: Date.now() + ttlMs, context });
  cacheBytes += bytes.length;
  return id;
}

export function getChatGptImage(id: string): CachedImage | null {
  evictExpired();
  const entry = cache.get(id);
  if (!entry) return null;
  if (Date.now() >= entry.expiresAt) {
    deleteEntry(id);
    return null;
  }
  return entry;
}

export function getChatGptImageConversationContext(
  id: string
): ChatGptImageConversationContext | null {
  return getChatGptImage(id)?.context ?? null;
}

/** Test-only: clear the cache between tests. */
export function __resetChatGptImageCacheForTesting(): void {
  cache.clear();
  cacheBytes = 0;
}

/** Test-only: peek at current resident-byte total. */
export function __getChatGptImageCacheBytesForTesting(): number {
  return cacheBytes;
}
