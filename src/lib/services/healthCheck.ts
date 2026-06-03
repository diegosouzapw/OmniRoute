/** Periodic health-check poller for embedded services. */

import type { HealthState } from "./types";

const HEALTH_FETCH_TIMEOUT_MS = 5_000;
const FAILURE_THRESHOLD = 3;

export type OnHealthChange = (health: HealthState) => void;

export class HealthChecker {
  private timer: ReturnType<typeof setInterval> | null = null;
  private consecutiveFailures = 0;
  private currentHealth: HealthState = "unknown";
  private active = false;

  constructor(
    private readonly healthUrl: () => string,
    private readonly intervalMs: number,
    private readonly onChange: OnHealthChange
  ) {}

  start(): void {
    if (this.active) return;
    this.active = true;
    this.consecutiveFailures = 0;
    this.currentHealth = "unknown";
    this.timer = setInterval(() => void this.poll(), this.intervalMs);
  }

  stop(): void {
    this.active = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setHealth("unknown");
  }

  getHealth(): HealthState {
    return this.currentHealth;
  }

  private async poll(): Promise<void> {
    if (!this.active) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), HEALTH_FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(this.healthUrl(), { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        this.consecutiveFailures = 0;
        this.setHealth("healthy");
      } else {
        this.recordFailure();
      }
    } catch {
      clearTimeout(timeout);
      this.recordFailure();
    }
  }

  private recordFailure(): void {
    this.consecutiveFailures++;
    if (this.consecutiveFailures >= FAILURE_THRESHOLD) {
      this.setHealth("unhealthy");
    }
  }

  private setHealth(health: HealthState): void {
    if (health === this.currentHealth) return;
    this.currentHealth = health;
    this.onChange(health);
  }
}
