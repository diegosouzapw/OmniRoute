import type { PooledContext } from "@omniroute/browser-pool";

export function shouldUseGrokBrowserBacked(): boolean {
  const flag = process.env.WEB_COOKIE_USE_BROWSER;
  if (flag === "1" || flag === "true" || flag === "on") return true;
  const poolFlag = process.env.OMNIROUTE_BROWSER_POOL;
  return poolFlag === "on" || poolFlag === "1" || poolFlag === "true";
}

let grokClearanceAcquireOverride: ((prompt: string) => Promise<PooledContext | null>) | null = null;

export function __setGrokClearanceAcquireOverrideForTesting(
  fn: ((prompt: string) => Promise<PooledContext | null>) | null,
): void {
  grokClearanceAcquireOverride = fn;
}

export async function acquireFreshGrokClearance(prompt: string): Promise<PooledContext | null> {
  if (grokClearanceAcquireOverride) return grokClearanceAcquireOverride(prompt);
  const mod = await import("@omniroute/browser-pool");
  return mod.acquireFreshGrokClearance(prompt);
}
