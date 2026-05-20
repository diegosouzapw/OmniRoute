import type { ExecuteInput } from "./base.ts";
import { DeepSeekWebExecutor, DEEPSEEK_WEB_BASE } from "./deepseek-web.ts";

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
  private currentCookies = "";

  constructor(config: AutoRefreshConfig = {}) {
    super();
    this.refreshConfig = {
      sessionRefreshInterval: 20 * 60 * 60 * 1000,
      maxRefreshRetries: 3,
      autoRefresh: true,
      ...config,
    };
    if (this.refreshConfig.autoRefresh) {
      this.startAutoRefresh();
    }
  }

  override async execute(input: ExecuteInput) {
    this.retryCount = 0;
    this.currentCookies =
      ((input.credentials as unknown as Record<string, unknown>).cookies as string) || "";
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
      try {
        await this.doRefreshSession();
      } catch (error) {
        console.error("[DeepSeek-WEB-AUTO-REFRESH] Auto-refresh failed:", error);
      }
    }, this.refreshConfig.sessionRefreshInterval);
  }

  private async doRefreshSession(): Promise<void> {
    if (!this.currentCookies) {
      this.sessionValid = false;
      throw new Error("No cookies available for session refresh");
    }
    const { maxRefreshRetries } = this.refreshConfig;
    for (let attempt = 0; attempt < maxRefreshRetries; attempt++) {
      try {
        // Validate session by fetching current user (lightweight, no PoW needed)
        const response = await fetch(`${DEEPSEEK_WEB_BASE}/api/v0/users/current`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Cookie: this.currentCookies,
          },
        });
        if (response.ok) {
          const json = await response.json();
          if (json?.data?.biz_data?.token) {
            this.lastRefreshTime = Date.now();
            this.sessionValid = true;
            return;
          }
        }
        if (response.status === 401 || response.status === 403) {
          this.sessionValid = false;
          throw new Error("Session expired - requires re-authentication");
        }
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      } catch (error) {
        if (attempt >= maxRefreshRetries - 1) throw error;
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }
    throw new Error("Failed to refresh session after max retries");
  }

  private async executeWithRetry(input: ExecuteInput) {
    try {
      return await super.execute(input);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const isUnauthorized =
        msg.includes("401") || msg.includes("Unauthorized") || msg.includes("Session expired");
      if (isUnauthorized && this.retryCount < this.maxRetries) {
        this.retryCount++;
        try {
          await this.doRefreshSession();
          return await super.execute(input);
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
