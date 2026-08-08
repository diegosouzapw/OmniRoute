/**
 * Registry adapter for the token health check.
 *
 * The sweep used to start itself on import. The registry owns the schedule now,
 * so the adapter lives here next to the other job registrations rather than in
 * tokenHealthCheck.ts, which is already at its size ceiling.
 *
 * Disable semantics are unchanged: isHealthCheckDisabled() still honours
 * OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK, NEXT_PHASE=phase-production-build and
 * isAutomatedTestProcess(). The registry only fires the interval; the handler
 * decides whether there is anything to do.
 */
import { isHealthCheckDisabled, sweep } from "@/lib/tokenHealthCheck";
import type { JobRegistry } from "@/lib/jobRegistry/registry";

const TOKEN_HEALTH_CHECK_INTERVAL_MS = 60_000;

export function registerTokenHealthCheck(registry: JobRegistry): void {
  const now = new Date().toISOString();
  registry.register({
    id: "token_health_check",
    type: "interval",
    cron: null,
    intervalMs: TOKEN_HEALTH_CHECK_INTERVAL_MS,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: now,
    updatedAt: now,
    handler: async () => {
      if (isHealthCheckDisabled()) {
        return { success: true, recordsAffected: 0 };
      }
      // Errors are not caught here: safeRun records a thrown error as a failure run
      // with its message, the same as the budget reset job.
      const swept = await sweep();
      return { success: true, recordsAffected: swept };
    },
  });
}
