/**
 * InAppLoginService — Playwright-based web login for cookie providers
 *
 * Opens a Playwright browser context, navigates to the provider's login page,
 * and polls for target cookies/tokens after the user completes login.
 *
 * Used as the dashboard/web fallback path when Electron is not available.
 * For Electron-native login, see electron/loginManager.js.
 *
 * Events:
 *   "status" — { providerId: string, status: string, message: string }
 *     status values: starting, navigating, waiting, polling, complete, error, cancelled
 */

import { EventEmitter } from "events";
import { TOKEN_EXTRACTION_CONFIGS, TokenExtractionConfig, type TokenSource } from "./tokenExtractionConfig";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface LoginResult {
  success: boolean;
  credentials?: Record<string, string>;
  error?: string;
}

interface ActiveLogin {
  providerId: string;
  aborted: boolean;
}

// ─── Service ────────────────────────────────────────────────────────────────

export class InAppLoginService extends EventEmitter {
  private activeLogin: ActiveLogin | null = null;

  /**
   * Start a login flow for a web-cookie provider using Playwright.
   * @param providerId - e.g. "claude-web", "chatgpt-web"
   * @param options.timeout - Total timeout in ms (default: config value or 300s)
   */
  async startLogin(providerId: string, options?: { timeout?: number }): Promise<LoginResult> {
    const config = TOKEN_EXTRACTION_CONFIGS.get(providerId);
    if (!config) {
      this.emit("status", { providerId, status: "error", message: "No extraction config found" });
      return { success: false, error: `No extraction config for provider: ${providerId}` };
    }

    if (this.activeLogin) {
      this.emit("status", { providerId, status: "error", message: "A login is already in progress" });
      return { success: false, error: "A login process is already in progress" };
    }

    this.activeLogin = { providerId, aborted: false };
    this.emit("status", { providerId, status: "starting", message: `Opening ${config.displayName} login...` });

    try {
      const result = await this.runBrowserLogin(config, options?.timeout);
      this.emit("status", {
        providerId,
        status: result.success ? "complete" : "error",
        message: result.success ? "Credentials extracted successfully" : (result.error || "Login failed"),
      });
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.emit("status", { providerId, status: "error", message });
      return { success: false, error: `Login failed: ${message}` };
    } finally {
      this.activeLogin = null;
    }
  }

  /**
   * Run the actual Playwright browser login flow
   */
  private async runBrowserLogin(
    config: TokenExtractionConfig,
    timeout?: number
  ): Promise<LoginResult> {
    const pollInterval = config.pollingConfig.pollInterval || 1000;
    const maxTimeout = timeout || config.pollingConfig.timeout || 300_000;
    const minLoginTime = config.pollingConfig.minLoginTime || 5000;
    const providerId = config.providerId;

    // Dynamically import Playwright (it's a heavy dep, only load when needed)
    let playwright: any;
    try {
      playwright = await import("playwright");
    } catch {
      return { success: false, error: "Playwright is not installed. Use Electron for native login." };
    }

    if (this.activeLogin?.aborted) {
      return { success: false, error: "Login cancelled" };
    }

    // Launch browser
    this.emit("status", { providerId, status: "starting", message: "Launching browser..." });
    const browser = await playwright.chromium.launch({
      headless: false, // User must interact with the login page
    });

    try {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        locale: "en-US",
      });
      const page = await context.newPage();

      // Navigate to login URL
      this.emit("status", { providerId, status: "navigating", message: `Loading ${config.loginUrl}` });
      await page.goto(config.loginUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Poll for success URL + token extraction
      const maxPolls = Math.floor(maxTimeout / pollInterval);
      const credentials: Record<string, string> = {};
      const startTime = Date.now();

      for (let i = 0; i < maxPolls; i++) {
        if (this.activeLogin?.aborted) {
          this.emit("status", { providerId, status: "cancelled", message: "Login cancelled by user" });
          return { success: false, error: "Login cancelled" };
        }

        // Emit progress every 30 seconds
        if (i > 0 && i % 30 === 0) {
          this.emit("status", {
            providerId,
            status: "waiting",
            message: `Waiting for login... (${Math.round(i / 60)}m)`,
          });
        }

        // Wait before polling (respect minLoginTime on first iteration)
        if (Date.now() - startTime < minLoginTime) {
          await sleep(pollInterval);
          continue;
        }

        // Gather cookies from browser context
        const cookies = await context.cookies();
        const tokenSources = config.tokenSources;

        // Check cookie-based sources
        for (const source of tokenSources) {
          if (source.type === "cookie") {
            const domain = source.domain || undefined;
            const matched = cookies.find(
              (c: any) =>
                c.name === source.name &&
                (!domain || c.domain.includes(domain.replace(/^\./, "")))
            );
            if (matched && !credentials[source.name]) {
              credentials[source.name] = matched.value;
            }
          }
        }

        // Check localStorage-based tokens
        for (const source of tokenSources) {
          if (source.type === "localStorage" && !credentials[source.key]) {
            try {
              const value = await page.evaluate((key: string) => localStorage.getItem(key), source.key);
              if (value && typeof value === "string") {
                credentials[source.key] = value;
              }
            } catch {
              // localStorage access may fail on some domains
            }
          }
          if (source.type === "sessionStorage" && !credentials[source.key]) {
            try {
              const value = await page.evaluate((key: string) => sessionStorage.getItem(key), source.key);
              if (value && typeof value === "string") {
                credentials[source.key] = value;
              }
            } catch {
              // sessionStorage access may fail on some domains
            }
          }
        }

        // Check if all required tokens are found
        const requiredKeys = tokenSources.map((s) =>
          s.type === "cookie" ? s.name : s.type === "localStorage" || s.type === "sessionStorage" ? s.key : s.name
        );
        const allFound = requiredKeys.every((k) => credentials[k] !== undefined);

        if (allFound && Object.keys(credentials).length > 0) {
          return { success: true, credentials };
        }

        // Check for success URL pattern
        if (config.successUrlPattern) {
          try {
            const currentUrl = page.url();
            if (config.successUrlPattern.test(currentUrl) && Object.keys(credentials).length > 0) {
              return { success: true, credentials };
            }
          } catch {
            // URL access may fail on some pages
          }
        }

        await sleep(pollInterval);
      }

      return { success: false, error: "Login timed out" };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.emit("status", { providerId, status: "error", message });
      return { success: false, error: `Login failed: ${message}` };
    } finally {
      await browser.close().catch(() => {});
    }
  }

  /**
   * Cancel the current login flow
   */
  cancel(): void {
    if (this.activeLogin) {
      this.emit("status", {
        providerId: this.activeLogin.providerId,
        status: "cancelled",
        message: "Login cancelled by user",
      });
      this.activeLogin.aborted = true;
      this.activeLogin = null;
    }
  }

  /**
   * Get the active provider ID, if any
   */
  getActiveProvider(): string | null {
    return this.activeLogin?.providerId || null;
  }

  /**
   * Check if a login flow is in progress
   */
  isActive(): boolean {
    return this.activeLogin !== null && !this.activeLogin.aborted;
  }
}

// ─── Sleep helper ───────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Singleton ──────────────────────────────────────────────────────────────

export const inAppLoginService = new InAppLoginService();
