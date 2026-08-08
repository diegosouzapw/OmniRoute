/** JobRegistry - unified scheduler for all periodic background jobs.
 *
 * Two strategies: interval (setInterval) and cron (nextTick via cron-parser, DST-safe).
 * Cron re-arms the next fire BEFORE running the current handler, so a slow handler
 * cannot kill the recursion chain.
 */

import { CronExpressionParser } from "cron-parser";
import {
  getAllJobs,
  getJob,
  recordRun,
  pruneRuns,
  cleanupOrphanedRuns,
  upsertJob,
  updateJobEnabled,
  getRuns as dbGetRuns,
} from "../db/jobRegistryDb";
import { isEnvEnabled } from "./core";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import type { JobDefinition, HandlerResult, JobRun } from "./core";

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export class JobRegistry {
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  private running = new Set<string>();
  private handlers = new Map<string, () => Promise<HandlerResult>>();
  private queued = new Set<string>();
  private waiters = new Map<string, Array<() => void>>();
  private cronFailCount = new Map<string, number>();
  private static readonly MAX_CRON_PARSE_FAILURES = 5;
  private cronGetters = new Map<string, () => string>();
  register(def: JobDefinition): void {
    // Never clobber enabled toggle or created_at on re-register.
    // the original created_at. Pass enabled=true for new jobs (seed default).
    upsertJob({
      id: def.id,
      type: def.type,
      cron: def.cron,
      intervalMs: def.intervalMs,
      enabled: getJob(def.id)?.enabled ?? def.enabled ?? true,
      envFlag: def.envFlag,
      config: def.config,
      createdAt: getJob(def.id)?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    this.handlers.set(def.id, def.handler);
    if (def.cronGetter) this.cronGetters.set(def.id, def.cronGetter);
  }

  start(jobId: string): void {
    if (this.timers.has(jobId)) return;
    const job = getJob(jobId);
    const handler = this.handlers.get(jobId);
    if (!job || !handler) {
      console.warn(`[JobRegistry] Skip ${jobId}: no ${job ? "handler" : "job"} registered`);
      return;
    }
    if (job.type === "interval") {
      this.startInterval(jobId, handler, job.intervalMs ?? 60_000);
    } else {
      const tz = (job.config?.timezone as string) || "UTC";
      let cronExpr = job.cron ?? "* * * * *";
      const getter = this.cronGetters.get(jobId);
      if (getter) {
        try {
          cronExpr = getter();
        } catch (err) {
          console.error(`[JobRegistry] cronGetter for ${jobId} threw:`, errMessage(err));
          cronExpr = job.cron ?? "* * * * *";
        }
      }
      this.scheduleNextCron(jobId, cronExpr, tz, job.envFlag);
    }
  }

  stop(jobId: string): void {
    const timer = this.timers.get(jobId);
    if (timer) {
      clearTimeout(timer);
      clearInterval(timer);
      this.timers.delete(jobId);
    }
  }

  async startAll(): Promise<void> {
    if (this.handlers.size === 0) {
      throw new Error("[JobRegistry] No handlers registered. Call register() before startAll().");
    }
    await cleanupOrphanedRuns();
    const jobs = getAllJobs().filter((j) => j.enabled);
    // start() is synchronous and can throw (getJob reads the DB), so each call
    // needs its own try/catch. Collecting them with Promise.allSettled would not
    // work: the callback returns void, every entry settles as fulfilled, and a
    // synchronous throw escapes the map before allSettled is ever reached.
    for (const job of jobs) {
      if (!this.handlers.has(job.id)) {
        console.warn(`[JobRegistry] Skip ${job.id}: no handler registered`);
        continue;
      }
      try {
        this.start(job.id);
      } catch (err) {
        console.error(`[JobRegistry] Failed to start ${job.id}:`, errMessage(err));
      }
    }
  }

  stopAll(): void {
    for (const jobId of [...this.timers.keys()]) this.stop(jobId);
  }

  dispose(): void {
    this.stopAll();
    this.cronFailCount.clear();
  }

  async runNow(jobId: string): Promise<{ started: boolean; reason?: string }> {
    const job = getJob(jobId);
    if (!job) return { started: false, reason: "not_found" };
    if (!job.enabled) return { started: false, reason: "disabled" };
    const handler = this.handlers.get(jobId);
    if (!handler) return { started: false, reason: "no_handler" };

    if (this.running.has(jobId)) {
      if (this.queued.has(jobId)) return { started: false, reason: "already_queued" };
      this.queued.add(jobId);
      return new Promise<{ started: boolean; reason?: string }>((resolve) => {
        const waiters = this.waiters.get(jobId) ?? [];
        waiters.push(() => {
          this.queued.delete(jobId);
          resolve(this.runNow(jobId));
        });
        this.waiters.set(jobId, waiters);
      });
    }

    if (
      job.envFlag &&
      !isEnvEnabled(job.envFlag, job.config?.envDefault === false ? false : true)
    ) {
      return { started: false, reason: "env_disabled" };
    }
    void this.safeRun(jobId, handler);
    return { started: true };
  }

  setEnabled(jobId: string, enabled: boolean): void {
    updateJobEnabled(jobId, enabled);
    if (enabled) {
      this.stop(jobId);
      this.start(jobId);
    } else {
      this.stop(jobId);
    }
  }

  getRuns(jobId: string, limit = 20): JobRun[] {
    return dbGetRuns(jobId, limit);
  }

  listJobs(): JobDefinition[] {
    return getAllJobs().map((job) => ({
      ...job,
      handler: this.handlers.get(job.id) ?? (() => Promise.resolve({ success: true })),
    }));
  }

  private getJobConfig(jobId: string): Record<string, unknown> | null {
    return getJob(jobId)?.config ?? null;
  }

  /** Core execution wrapper: re-entrancy guard + timing + recording + prune. */
  private async safeRun(jobId: string, handler: () => Promise<HandlerResult>): Promise<void> {
    if (this.running.has(jobId)) return;
    this.running.add(jobId);
    const startedAt = new Date().toISOString();
    const start = Date.now();
    try {
      const result = await handler();
      await recordRun(jobId, result.success ? "success" : "failure", {
        startedAt,
        durationMs: Date.now() - start,
        errorMessage: result.error ? sanitizeErrorMessage(result.error) : undefined,
        recordsAffected: result.recordsAffected,
      });
    } catch (err) {
      await recordRun(jobId, "failure", {
        startedAt,
        durationMs: Date.now() - start,
        errorMessage: sanitizeErrorMessage(errMessage(err)),
      });
    } finally {
      this.running.delete(jobId);
      const ws = this.waiters.get(jobId);
      if (ws) {
        this.waiters.delete(jobId);
        for (const resolve of ws) resolve();
      }
      await pruneRuns(jobId);
    }
  }

  private startInterval(
    jobId: string,
    handler: () => Promise<HandlerResult>,
    intervalMs: number
  ): void {
    void this.safeRun(jobId, handler);
    const timer = setInterval(() => void this.safeRun(jobId, handler), intervalMs);
    timer.unref?.();
    this.timers.set(jobId, timer);
  }

  /**
   * Cron nextTick: schedule the next fire, and on fire run the handler then
   * re-arm. The next timer is armed BEFORE the handler runs (recursion-safe -
   * see file header). DST-safe because cron-parser computes the next UTC instant
   * from the IANA timezone; we never compare wall-clock fields.
   */
  private scheduleNextCron(
    jobId: string,
    cronExpr: string,
    tz: string,
    envFlag?: string | null
  ): void {
    let delay: number;
    try {
      const interval = CronExpressionParser.parse(cronExpr, { tz });
      const next = interval.next().getTime();
      delay = Math.max(next - Date.now(), 0);
      this.cronFailCount.delete(jobId);
    } catch (err) {
      const fails = (this.cronFailCount.get(jobId) ?? 0) + 1;
      this.cronFailCount.set(jobId, fails);
      console.error(
        `[JobRegistry] Invalid cron "${cronExpr}" for ${jobId} (fail #${fails}):`,
        errMessage(err)
      );
      if (fails >= JobRegistry.MAX_CRON_PARSE_FAILURES) {
        console.error(
          `[JobRegistry] Cron "${cronExpr}" for ${jobId} failed ${fails} times - stopping job.`
        );
        return;
      }
      delay = 60_000;
    }
    const timer = setTimeout(() => {
      let freshCron = cronExpr;
      const getter = this.cronGetters.get(jobId);
      if (getter) {
        try {
          freshCron = getter();
        } catch (err) {
          console.error(`[JobRegistry] cronGetter for ${jobId} threw in timer:`, errMessage(err));
        }
      }
      this.scheduleNextCron(jobId, freshCron, tz, envFlag);
      if (this.running.has(jobId)) return;
      const jobConfig = this.getJobConfig(jobId);
      if (envFlag && !isEnvEnabled(envFlag, jobConfig?.envDefault === false ? false : true)) return;
      const handler = this.handlers.get(jobId);
      if (handler) void this.safeRun(jobId, handler);
    }, delay);
    timer.unref?.();
    this.timers.set(jobId, timer);
  }
}
