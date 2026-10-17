/** Wait for the catalog's single retry without leaving a timer after unmount. */
function waitForRetry(delayMs: number, signal: AbortSignal): Promise<void> {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, delayMs);
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

function retryDelayMs(response: Response): number {
  const hint = response.headers.get("Retry-After")?.trim();
  if (!hint) return 1000;
  // Bound parsing and fail conservatively: oversized hints must not retry early.
  if (hint.length > 128) return Number.POSITIVE_INFINITY;
  if (/^\d{1,128}$/.test(hint)) return Number(hint) * 1000;
  const delay = Date.parse(hint) - Date.now();
  return Number.isFinite(delay) ? Math.max(0, delay) : 1000;
}

/** A transient unified-catalog failure gets one retry; ordinary model reads do not. */
export async function fetchModelSelection(
  source: "available" | "catalog",
  signal: AbortSignal
): Promise<Response> {
  const endpoint = source === "catalog" ? "/api/models/catalog" : "/api/models";
  const response = await fetch(endpoint, { signal });
  if (source !== "catalog" || response.status !== 503) return response;

  const delay = retryDelayMs(response);
  // A longer server cooldown must not trap the picker or be retried prematurely.
  if (delay > 30_000) return response;
  await response.body?.cancel();
  await waitForRetry(delay, signal);
  return fetch(endpoint, { signal });
}
