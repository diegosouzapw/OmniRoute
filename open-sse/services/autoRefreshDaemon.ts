/**
 * AutoRefreshDaemon — Background cookie validity checker for web-cookie providers
 *
 * Periodically checks stored credentials for web-cookie providers by making
 * lightweight requests to their home pages. If a credential is expired, it
 * logs a warning and marks the credential for re-authentication.
 *
 * The daemon does NOT automatically re-login (that requires user interaction
 * for security). It alerts the system so higher-level components can decide
 * what to do (e.g., fallback to another provider, prompt user to re-login).
 */

import { TOKEN_EXTRACTION_CONFIGS } from "./tokenExtractionConfig";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DaemonStatus {
  running: boolean;
  checkedProviderCount: number;
  expiredCredentials: string[];
  lastRun: number | null;
}

interface StoredCredentialEntry {
  providerId: string;
  value: string;
  storedAt: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_CHECK_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
const MIN_CHECK_INTERVAL_MS = 60 * 1000; // 1 minute minimum

// ─── Daemon ─────────────────────────────────────────────────────────────────

class AutoRefreshDaemon {
  private timerId: ReturnType<typeof setInterval> | null = null;
  private running = false;
  private checkIntervalMs: number;
  private expiredCredentials: string[] = [];
  private lastRun: number | null = null;
  /** In-memory store of web-cookie credentials (real persistence uses SQLite) */
  private credentialStore = new Map<string, StoredCredentialEntry>();

  constructor(checkIntervalMs = DEFAULT_CHECK_INTERVAL_MS) {
    this.checkIntervalMs = Math.max(checkIntervalMs, MIN_CHECK_INTERVAL_MS);
  }

  /**
   * Register a credential for auto-refresh monitoring.
   * Called when credentials are extracted/updated.
   */
  registerCredential(providerId: string, value: string): void {
    this.credentialStore.set(providerId, {
      providerId,
      value,
      storedAt: Date.now(),
    });
  }

  /**
   * Remove a credential from monitoring (e.g., provider deleted)
   */
  unregisterCredential(providerId: string): void {
    this.credentialStore.delete(providerId);
  }

  /**
   * Start the daemon — begins periodic credential checks
   */
  start(): void {
    if (this.running) return;
    this.running = true;

    // Run an initial check immediately
    this.check().catch(() => {});

    this.timerId = setInterval(() => {
      this.check().catch(() => {});
    }, this.checkIntervalMs);
    // Don't keep the process alive solely for this periodic daemon.
    (this.timerId as { unref?: () => void })?.unref?.();

    console.log(
      `[AutoRefreshDaemon] Started — checking ${this.credentialStore.size} credentials every ${this.checkIntervalMs / 1000}s`
    );
  }

  /**
   * Stop the daemon
   */
  stop(): void {
    if (!this.running) return;
    this.running = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    console.log("[AutoRefreshDaemon] Stopped");
  }

  /**
   * Check all stored credentials for validity.
   * Makes a lightweight HEAD/GET request to the provider's home page.
   */
  async check(): Promise<void> {
    this.lastRun = Date.now();
    const newlyExpired: string[] = [];

    const entries = [...this.credentialStore.entries()];

    for (const [providerId] of entries) {
      const config = TOKEN_EXTRACTION_CONFIGS.get(providerId);
      if (!config) {
        this.credentialStore.delete(providerId);
        continue;
      }

      try {
        const isValid = await this.validateCredential(providerId, config.homeUrl);
        if (!isValid) {
          newlyExpired.push(providerId);
          console.warn(
            `[AutoRefreshDaemon] Credential expired for "${providerId}" (${config.displayName})`
          );
        }
      } catch {
        // Network errors are non-fatal — retry next cycle
      }
    }

    // Update expired list
    for (const id of newlyExpired) {
      if (!this.expiredCredentials.includes(id)) {
        this.expiredCredentials.push(id);
      }
    }
  }

  /**
   * Validate a credential by making a request to the provider's home page.
   * Returns true if the response suggests the credential is still valid.
   */
  private async validateCredential(providerId: string, homeUrl: string): Promise<boolean> {
    const entry = this.credentialStore.get(providerId);
    if (!entry) return false;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(homeUrl, {
        method: "HEAD",
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        },
      });

      // A valid credential typically returns 200 (occasionally 301/302)
      // 401/403 strongly suggest expired credential
      if (response.status === 401 || response.status === 403) {
        return false;
      }

      return true;
    } catch {
      // Network errors (timeout, DNS failure) don't mean the credential is bad
      return true;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Get the current daemon status
   */
  getStatus(): DaemonStatus {
    return {
      running: this.running,
      checkedProviderCount: this.credentialStore.size,
      expiredCredentials: [...this.expiredCredentials],
      lastRun: this.lastRun,
    };
  }

  /**
   * Clear expired credentials list (e.g., after re-authentication)
   */
  clearExpired(): void {
    this.expiredCredentials = [];
  }

  /**
   * Restart the daemon (useful when config changes)
   */
  restart(): void {
    this.stop();
    this.start();
  }
}

// ─── Singleton ──────────────────────────────────────────────────────────────

export const autoRefreshDaemon = new AutoRefreshDaemon();
