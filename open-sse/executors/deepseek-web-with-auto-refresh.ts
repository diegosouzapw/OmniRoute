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

  private async executeWithRetry(input: ExecuteInput) {
    try {
      return await this.executeBase(input);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const isUnauthorized =
        msg.includes("401") || msg.includes("Unauthorized") || msg.includes("expired");
      if (isUnauthorized && this.retryCount < this.maxRetries) {
        this.retryCount++;
        try {
          await this.doRefreshSession();
          return await this.executeBase(input);
        } catch (refreshError) {
          console.error(
            `[DeepSeek-WEB] Session refresh failed (attempt ${this.retryCount}/${this.maxRetries}):`,
            refreshError
          );
        }
      }
      if (msg.includes("429") || msg.includes("Rate limit")) {
        console.warn("[DeepSeek-WEB] Rate limited:", msg);
      }
      throw error;
    }
  }
}

export const deepseekWebWithAutoRefreshExecutor = new DeepSeekWebWithAutoRefreshExecutor();
