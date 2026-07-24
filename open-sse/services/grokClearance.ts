export function shouldUseGrokBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

let grokClearanceAcquireOverride: ((signal?: AbortSignal) => Promise<string | null>) | null = null;

export function __setGrokClearanceAcquireOverrideForTesting(
  fn: ((signal?: AbortSignal) => Promise<string | null>) | null,
): void {
  grokClearanceAcquireOverride = fn;
}

export async function acquireFreshGrokClearance(signal?: AbortSignal): Promise<string | null> {
  if (grokClearanceAcquireOverride) return grokClearanceAcquireOverride(signal);
  const mod = await import("@omniroute/browser-pool");
  return mod.acquireFreshGrokClearance(signal);
}
