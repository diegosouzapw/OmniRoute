import type { ExecuteInput } from "./base.ts";
import {
  DeepSeekWebExecutor,
  acquireAccessToken,
  extractUserToken,
  tokenCache,
} from "./deepseek-web.ts";

interface AutoRefreshConfig {
  sessionRefreshInterval?: number;
  maxRefreshRetries?: number;
  autoRefresh?: boolean;
}

export class DeepSeekWebWithAutoRefreshExecutor extends DeepSeekWebExecutor {
  private refreshConfig: {
    sessionRefreshInterval: number;
    maxRefreshRetries: number;
    autoRefresh: boolean;
  };
  private lastRefreshTime = 0;
  private refreshTimer: ReturnType<typeof setInterval> | null = null;
  private sessionValid = false;
  private retryCount = 0;
  private readonly maxRetries = 2;
  private currentUserToken = "";

  constructor(config: AutoRefreshConfig = {}) {
    super();
    this.refreshConfig = {
      sessionRefreshInterval: 50 * 60 * 1000,
      maxRefreshRetries: 3,
      autoRefresh: true,
      ...config,
    };
  }

  override async execute(input: ExecuteInput) {
    this.retryCount = 0;
    const creds = input.credentials as unknown as Record<string, unknown>;
    this.setCurrentUserToken(extractUserToken(creds));
    return this.executeWithRetry(input);
  }

  isSessionValid(): boolean {
    return this.sessionValid;
  }

  getTimeSinceRefresh(): number {
    return Date.now() - this.lastRefreshTime;
  }

  async refreshSession(): Promise<void> {
    await this.doRefreshSession();
  }

  destroy(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private startAutoRefresh(): void {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(async () => {
      if (!this.currentUserToken) {
        this.sessionValid = false;
        return;
      }
      try {
        await this.doRefreshSession();
      } catch (error) {
        console.error("[DeepSeek-WEB-AUTO-REFRESH] Auto-refresh failed:", error);
      }
    }, this.refreshConfig.sessionRefreshInterval);
    if (typeof this.refreshTimer === "object" && "unref" in this.refreshTimer) {
      (this.refreshTimer as { unref?: () => void }).unref?.();
    }
  }

  private setCurrentUserToken(userToken: string | null): void {
    if (!userToken) {
      return;
    }
    if (this.currentUserToken === userToken) {
      return;
    }
    this.currentUserToken = userToken;
    this.sessionValid = false;
    if (this.refreshConfig.autoRefresh) {
      this.startAutoRefresh();
    }
  }

  private async doRefreshSession(): Promise<void> {
    if (!this.currentUserToken) {
      this.sessionValid = false;
      throw new Error("No userToken available for session refresh");
    }
    const { maxRefreshRetries } = this.refreshConfig;
    for (let attempt = 0; attempt < maxRefreshRetries; attempt++) {
      try {
        tokenCache.delete(this.currentUserToken);
        const accessToken = await acquireAccessToken(this.currentUserToken);
        if (accessToken) {
          this.lastRefreshTime = Date.now();
          this.sessionValid = true;
          return;
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        if (msg.includes("invalid") || msg.includes("expired")) {
          this.sessionValid = false;
          throw new Error("Token expired — get a new userToken from DeepSeek localStorage");
        }
        if (attempt >= maxRefreshRetries - 1) throw error;
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }
    throw new Error("Failed to refresh session after max retries");
  }

  private executeBase(input: ExecuteInput) {
    return super.execute(input);
  }

  /**
   * Refresh the session once and re-run the base executor. Returns the retried
   * result, or `null` when the refresh itself fails (dead userToken) so the
   * caller surfaces the original failure instead of looping.
   */
  private async refreshAndRetry(
    input: ExecuteInput
  ): Promise<Awaited<ReturnType<typeof this.executeBase>> | null> {
    this.retryCount++;
    try {
      await this.doRefreshSession();
      return await this.executeBase(input);
    } catch (refreshError) {
      console.error(
        `[DeepSeek-WEB] Session refresh failed (attempt ${this.retryCount}/${this.maxRetries}):`,
        refreshError
      );
      return null;
    }
  }

  private async executeWithRetry(input: ExecuteInput) {
    try {
      const result = await this.executeBase(input);

      // The base DeepSeekWebExecutor never throws on an upstream auth failure —
      // it converts 401/403 into a returned error Response (and deletes the stale
      // access token). Detect that here so auto-refresh actually fires; relying
      // only on the thrown-error catch below left the retry path dead, so a stale
      // access token surfaced a 401 to the client on every refresh boundary
      // instead of self-healing.
      const status = result?.response?.status;
      if ((status === 401 || status === 403) && this.retryCount < this.maxRetries) {
        const retried = await this.refreshAndRetry(input);
        return retried ?? result;
      }

      return result;
    } catch (error: unknown) {
      // Defensive: keep handling genuinely thrown failures (e.g. a network error
      // that escapes the base) even though the base normally returns Responses.
      const msg = error instanceof Error ? error.message : String(error);
      const isUnauthorized =
        msg.includes("401") || msg.includes("Unauthorized") || msg.includes("expired");
      if (isUnauthorized && this.retryCount < this.maxRetries) {
        const retried = await this.refreshAndRetry(input);
        if (retried) return retried;
      }
      if (msg.includes("429") || msg.includes("Rate limit")) {
        console.warn("[DeepSeek-WEB] Rate limited:", msg);
      }
      throw error;
    }
  }
}

export const deepseekWebWithAutoRefreshExecutor = new DeepSeekWebWithAutoRefreshExecutor();
