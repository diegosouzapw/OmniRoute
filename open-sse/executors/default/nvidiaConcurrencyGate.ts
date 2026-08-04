/**
 * nvidiaConcurrencyGate — per-connection concurrency cap for the `nvidia`
 * provider (#6846 Phase 1).
 *
 * NVIDIA NIM's free tier sends no rate-limit headers and has no usage API
 * (see docs/reference/PROVIDER_REFERENCE.md `nvidia` note), so most 429 storms
 * come from parallel bursts against one connection rather than sustained total
 * volume. This reuses the generic `rateLimitSemaphore` FIFO queue (already used
 * by combo round-robin/quota-share dispatch) to serialize concurrent requests
 * per `nvidia:<connectionId>` — excess requests wait in the queue instead of
 * firing doomed parallel calls.
 *
 * No-op for every other provider and for a missing `connectionId` — returns
 * `null`, and callers should skip the `finally` release when the return value
 * is `null`.
 */
import * as semaphore from "../../services/rateLimitSemaphore.ts";
import { getProviderConcurrencyCap } from "../../services/providerDefaultRateLimit.ts";

const NVIDIA_DEFAULT_CONCURRENCY_CAP = 6;
const NVIDIA_ACQUIRE_TIMEOUT_MS = 30_000;

/**
 * Acquire a concurrency slot for an nvidia request. Resolves to a release
 * function that MUST be called (typically in a `finally`) once the request
 * completes, or `null` when the gate does not apply (non-nvidia provider, or
 * no connection id to scope the gate to). Rejects with a
 * `SEMAPHORE_TIMEOUT`-coded error if the queue wait exceeds the timeout —
 * propagates like any other executor failure (caller/combo fallback handles it).
 */
export function acquireNvidiaConcurrencySlot(
  provider: string,
  connectionId: string | null | undefined
): Promise<(() => void) | null> {
  if (provider !== "nvidia" || !connectionId) return Promise.resolve(null);
  const maxConcurrency = getProviderConcurrencyCap(provider, NVIDIA_DEFAULT_CONCURRENCY_CAP);
  const key = `${provider}:${connectionId}`;
  return semaphore.acquire(key, { maxConcurrency, timeoutMs: NVIDIA_ACQUIRE_TIMEOUT_MS });
}
