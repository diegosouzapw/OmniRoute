/**
 * Claude Web Auto-Refresh Wrapper
 *
 * Enhances the existing ClaudeWebExecutor with automatic cf_clearance solving.
 * Intercepts 403/401 responses and attempts Turnstile challenge solve.
 */

import type { ExecuteInput } from "./base.ts";
import { ClaudeWebExecutor } from "./claude-web.ts";
import { getCfClearanceToken, getCacheStatus } from "../services/claudeTurnstileSolver.ts";

/**
 * Read the Claude Web session cookie from the credentials object passed
 * to the auto-refresh wrapper. Mirrors the priority chain in
 * `ClaudeWebExecutor.readClaudeWebCookie` (cookie → apiKey →
 * providerSpecificData.cookie) so the wrapper can see the same value
 * the inner executor sees — without this, the wrapper would re-read
 * `credentials.cookie` only and the dashboard's `apiKey`-posted
 * cookies would never reach the Turnstile solver.
 */
function readClaudeWebCookieForAutoRefresh(credentials: unknown): string {
  if (!credentials || typeof credentials !== "object") return "";
  const c = credentials as Record<string, unknown>;
  const direct = typeof c.cookie === "string" ? c.cookie : "";
  if (direct.trim()) return direct;
  const apiKey = typeof c.apiKey === "string" ? c.apiKey : "";
  if (apiKey.trim()) return apiKey;
  const psd = c.providerSpecificData;
  if (psd && typeof psd === "object") {
    const nested = (psd as Record<string, unknown>).cookie;
    if (typeof nested === "string" && nested.trim()) return nested;
  }
  return "";
}

class ClaudeWebWithAutoRefresh extends ClaudeWebExecutor {
  private retryCount = 0;
  private maxRetries = 2;

  async execute(input: ExecuteInput) {
    const { credentials, log } = input;
    this.retryCount = 0;
    return this.executeWithRetry(input);
  }

  private async executeWithRetry(input: ExecuteInput) {
    const { credentials, log } = input;

    // Execute request
    let result = await super.execute(input);

    // If success (200), return immediately
    if (result.response.status === 200) {
      return result;
    }

    // If challenge (403) or auth error (401), and retries remain
    if (
      (result.response.status === 403 || result.response.status === 401) &&
      this.retryCount < this.maxRetries
    ) {
      this.retryCount++;
      log?.warn?.(
        "CLAUDE-WEB",
        `HTTP ${result.response.status} detected - attempt ${this.retryCount}/${this.maxRetries}`
      );

      try {
        // Get fresh cf_clearance
        const cacheStatus = getCacheStatus();
        const shouldForce = this.retryCount > 1;

        log?.info?.(
          "CLAUDE-WEB",
          `Solving Turnstile (cache: ${cacheStatus.hasCached ? `${Math.round((cacheStatus.expiresIn || 0) / 1000)}s left` : "empty"})...`
        );

        const freshCfClearance = await getCfClearanceToken({ force: shouldForce });

        // Update credentials
        const rawCookie = readClaudeWebCookieForAutoRefresh(credentials);
        const hasCfClearance = rawCookie.includes("cf_clearance=");

        let newCookie: string;
        if (hasCfClearance) {
          newCookie = rawCookie.replace(/cf_clearance=[^;]+/, `cf_clearance=${freshCfClearance}`);
        } else {
          newCookie = `${rawCookie}; cf_clearance=${freshCfClearance}`;
        }

        log?.info?.("CLAUDE-WEB", "cf_clearance injected, retrying...");

        // Retry with fresh cookie
        const updatedInput: ExecuteInput = {
          ...input,
          credentials: {
            ...credentials,
            cookie: newCookie,
          },
        };

        result = await this.executeWithRetry(updatedInput);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        log?.error?.("CLAUDE-WEB", `Auto-refresh failed: ${msg}`);
        // Fall through to return error response
      }
    }

    return result;
  }

  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const basicTest = await super.testConnection(credentials, signal);
      if (basicTest) return true;

      const rawCookie = readClaudeWebCookieForAutoRefresh(credentials);
      if (!rawCookie.trim()) return false;

      const freshCfClearance = await getCfClearanceToken();
      const newCookie = rawCookie.includes("cf_clearance=")
        ? rawCookie.replace(/cf_clearance=[^;]+/, `cf_clearance=${freshCfClearance}`)
        : `${rawCookie}; cf_clearance=${freshCfClearance}`;

      return await super.testConnection({ ...credentials, cookie: newCookie }, signal);
    } catch {
      return false;
    }
  }
}

export { ClaudeWebWithAutoRefresh };
export const createClaudeWebExecutor = () => new ClaudeWebWithAutoRefresh();
