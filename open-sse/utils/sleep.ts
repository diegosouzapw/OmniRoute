/**
 * Shared sleep utility to pause execution for a given number of milliseconds.
 *
 * @param ms - Number of milliseconds to sleep
 * @param signal - Optional abort signal; the sleep resolves early (and clears its timer) on abort
 * @returns Promise that resolves after the specified time
 */
export function sleep(ms: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (timer !== undefined) clearTimeout(timer);
      signal?.removeEventListener("abort", finish);
      resolve();
    };
    signal?.addEventListener("abort", finish, { once: true });
    timer = setTimeout(finish, ms);
  });
}
