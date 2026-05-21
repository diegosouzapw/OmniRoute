/**
 * Claude Web Executor with Auto-Refresh cf_clearance
 *
 * Wraps the existing ClaudeWebExecutor with Turnstile solving capability.
 * When cf_clearance is missing or invalid, automatically solves Cloudflare
 * Turnstile challenge and injects fresh token.
 */

import type { ExecuteInput } from "./base.ts";
import { ClaudeWebExecutor } from "./claude-web.ts";
import { getCfClearanceToken } from "../services/claudeTurnstileSolver.ts";

/**
 * Enhanced executor with auto-refresh
 */
export class ClaudeWebAutoRefreshExecutor extends ClaudeWebExecutor {
  /**
   * Override execute to add cf_clearance auto-refresh
   */
  async execute(input: ExecuteInput) {
    const { credentials, log, signal } = input;

    // First attempt with provided credentials
    let result = await super.execute(input);

    // Check if response is a 403 (Cloudflare challenge) or 401 (invalid cf_clearance)
    if (result.response.status === 403 || result.response.status === 401) {
      log?.warn?.(
        "CLAUDE-WEB",
        `HTTP ${result.response.status} - attempting to refresh cf_clearance`
      );

      try {
        // Attempt to solve Turnstile and get fresh cf_clearance
        const freshCfClearance = await getCfClearanceToken({ force: true });

        // Update credentials with fresh cf_clearance
        const updatedCreds = {
          ...credentials,
          cookie: credentials?.cookie
            ? `${credentials.cookie}; cf_clearance=${freshCfClearance}`
            : `cf_clearance=${freshCfClearance}`,
        };

        log?.info?.("CLAUDE-WEB", "cf_clearance refreshed, retrying request");

        // Retry with fresh cookie
        result = await super.execute({
          ...input,
          credentials: updatedCreds,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        log?.error?.("CLAUDE-WEB", `Failed to auto-refresh cf_clearance: ${message}`);
        // Return original error response
      }
    }

    return result;
  }

  /**
   * Override testConnection to include cf_clearance check
   */
  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      // Test with provided credentials first
      const basicTest = await super.testConnection(credentials, signal);
      if (basicTest) {
        return true;
      }

      // If basic test failed, try to refresh cf_clearance
      const rawCookie = String((credentials as any)?.cookie || "");
      if (!rawCookie.trim()) {
        return false;
      }

      log?.warn?.("CLAUDE-WEB", "Initial connection test failed, attempting Turnstile solve");

      const freshCfClearance = await getCfClearanceToken();
      const updatedCreds = {
        ...credentials,
        cookie: `${rawCookie}; cf_clearance=${freshCfClearance}`,
      };

      return await super.testConnection(updatedCreds, signal);
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const claudeWebAutoRefresh = new ClaudeWebAutoRefreshExecutor();
