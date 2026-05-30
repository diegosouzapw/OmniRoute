/**
 * SessionFactory — Creates initialized Session instances
 *
 * For zero-auth providers (Pollinations, Puter): just assigns a fingerprint.
 * For cookie-based providers (ChatGPT Web, DeepSeek Web): would launch
 * headless Playwright, solve Turnstile, and extract cookies.
 *
 * Currently only zero-auth is implemented. Cookie-based provider support
 * is planned for Phase 3.
 */

import { FingerprintRotator } from "./fingerprintRotator.ts";
import { Session } from "./session.ts";
import type { PoolConfig } from "./types.ts";

export class SessionFactory {
  private rotator = new FingerprintRotator();

  constructor(private config: PoolConfig) {}

  /**
   * Create a new session with the next available fingerprint.
   * For zero-auth providers, this is a lightweight operation
   * (just picks a fingerprint). For cookie-based providers this
   * would involve Playwright browser automation.
   */
  createSession(): Session {
    const fingerprint = this.rotator.random();
    return new Session(
      fingerprint,
      this.config.cooldownBase,
      this.config.cooldownMax,
      this.config.cooldownJitter,
    );
  }

  /** Reset the fingerprint rotator (e.g., after config change) */
  resetRotator(): void {
    this.rotator.reset();
  }

  /** Number of available fingerprint profiles */
  get profileCount(): number {
    return this.rotator.count;
  }

  /** Build headers from session fingerprint */
  buildHeaders(
    session: Session,
    extra?: Record<string, string>,
  ): Record<string, string> {
    return session.buildHeaders(extra);
  }
}
