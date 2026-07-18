/**
 * Pure, DB-free chunked sync helper shared by both the OAuth and non-OAuth
 * (local/API-key) paths in `syncAllProviderLimits()`.
 *
 * Processes `items` in chunks of `chunkSize`, running each chunk's fetchers
 * concurrently (`Promise.allSettled`) but waiting `spacingMs` between chunks
 * (never after the last one). `chunkSize=1` reproduces the strictly-sequential
 * OAuth behavior; `chunkSize=concurrency` reproduces the previous fast
 * chunked-concurrent behavior for local/API-key connections, now with the
 * spacing gap applied between chunks so `PROVIDER_LIMITS_SYNC_SPACING_MS` is
 * honored on both paths (see #6916).
 */
export async function syncInChunksWithSpacing<T, R>(
  items: T[],
  chunkSize: number,
  spacingMs: number,
  fetcher: (item: T) => Promise<R>,
  onChunkResults: (chunk: T[], results: PromiseSettledResult<R>[]) => void
): Promise<void> {
  const size = chunkSize > 0 ? chunkSize : 1;
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    const results = await Promise.allSettled(chunk.map(fetcher));
    onChunkResults(chunk, results);
    const isLastChunk = i + size >= items.length;
    if (spacingMs > 0 && !isLastChunk) {
      await new Promise<void>((resolve) => setTimeout(resolve, spacingMs));
    }
  }
}
