/**
 * Shared classification for browser-backed executors: distinguishes a missing Playwright
 * Chromium binary (`chromium.launch: Executable doesn't exist at ...`) from a transient upstream
 * fault. This is a host/config problem, not something a retry loop can fix, so executors must
 * NOT surface it as a plain retryable 5xx (which marks the account unavailable / trips the
 * provider circuit breaker). Originally added for `gemini-web.ts` (#3516); extracted here so
 * every browser-backed executor (Gemini Web, Z.ai Web, ...) can share the same detection.
 */
export function isMissingBrowserExecutable(message: string): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes("executable doesn't exist") ||
    lower.includes("executablenotfound") ||
    lower.includes("playwright install") ||
    (lower.includes("chromium") && lower.includes("download"))
  );
}

/**
 * #15300: a headed Chromium launched on a host with no X server (Docker -web image, bare VPS)
 * dies at launch. Host/config problem like a missing binary — not a transient upstream fault.
 */
export function isMissingDisplay(message: string): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes("xserver") ||
    lower.includes("x server") ||
    lower.includes("headed browser without") ||
    lower.includes("$display")
  );
}
