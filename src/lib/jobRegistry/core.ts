/** JobRegistry shared types + env-gate helper . */

export interface JobRecord {
  id: string;
  type: "interval" | "cron";
  cron: string | null;
  intervalMs: number | null;
  enabled: boolean;
  envFlag: string | null;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface JobDefinition extends JobRecord {
  handler: () => Promise<HandlerResult>;
  cronGetter?: () => string;
}

export interface HandlerResult {
  success: boolean;
  recordsAffected?: number;
  error?: string;
}

export interface JobRun {
  id: number;
  jobId: string;
  startedAt: string;
  finishedAt: string | null;
  status: "running" | "success" | "failure";
  errorMessage: string | null;
  recordsAffected: number;
  durationMs: number | null;
}

const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

/**
 * Boolean env-var gate used by cron jobs (e.g. warmup).
 *
 * - No envFlag          -> always enabled (no gate).
 * - envFlag, env unset  -> fall back to `defaultWhenUnset` (job-level default; warmup=false).
 * - envFlag, env set    -> truthy check against TRUE_ENV_VALUES.
 */
export function isEnvEnabled(envName: string | undefined, defaultWhenUnset = true): boolean {
  if (!envName) return true;
  const v = process.env[envName];
  if (v === undefined) return defaultWhenUnset;
  return TRUE_ENV_VALUES.has(v.trim().toLowerCase());
}
