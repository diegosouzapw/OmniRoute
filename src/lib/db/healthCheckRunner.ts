import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";
import type { DbHealthCheckResult, PagerCorruptionNote } from "./healthCheck";

export interface DbHealthJob {
  filePath: string;
  autoRepair: boolean;
  skipIntegrityCheck: boolean;
  backupDir: string;
  pagerCorruption: PagerCorruptionNote | null;
}

/**
 * `skipIntegrityCheck` (#13149): a caller may waive the integrity scan — the dashboard
 * poll does. It is part of the job identity, so a waived scan is never replayed from the
 * cache to a caller that asked for a full one (the reverse direction is safe).
 */
export function createDbHealthCoordinator(
  execute: (autoRepair: boolean, skipIntegrityCheck: boolean) => Promise<DbHealthCheckResult>,
  options: { now?: () => number; cacheMs?: number } = {}
) {
  const now = options.now ?? Date.now;
  const cacheMs = options.cacheMs ?? 60_000;
  let stopping = false;
  let active: {
    autoRepair: boolean;
    skipIntegrityCheck: boolean;
    promise: Promise<DbHealthCheckResult>;
  } | null = null;
  let cached: { result: DbHealthCheckResult; expires: number } | null = null;
  return {
    get busy(): boolean {
      return active !== null;
    },
    invalidate(): void {
      cached = null;
    },
    async stop(cancel: () => void): Promise<void> {
      stopping = true;
      cached = null;
      cancel();
      await active?.promise.catch(() => {});
    },
    run(autoRepair: boolean, skipIntegrityCheck = false): Promise<DbHealthCheckResult> {
      if (stopping) return Promise.reject(new Error("Database health checks are stopping"));
      if (active) {
        // A run that DID scan integrity satisfies a caller that was willing to skip it,
        // never the reverse (#13149) — so only widen, never narrow, the in-flight job.
        return active.autoRepair === autoRepair &&
          (active.skipIntegrityCheck === skipIntegrityCheck || !active.skipIntegrityCheck)
          ? active.promise
          : Promise.reject(new Error("Database health check already in progress"));
      }
      if (!autoRepair && cached && now() < cached.expires) return Promise.resolve(cached.result);
      cached = null;
      let resolve!: (result: DbHealthCheckResult) => void;
      let reject!: (error: unknown) => void;
      const promise = new Promise<DbHealthCheckResult>((yes, no) => {
        resolve = yes;
        reject = no;
      });
      active = { autoRepair, skipIntegrityCheck, promise };
      const succeed = (result: DbHealthCheckResult) => {
        // Only a full (integrity-scanning) diagnosis may be replayed from the cache:
        // caching a skipped scan would silently downgrade a later full request (#13149).
        if (!autoRepair && !skipIntegrityCheck) cached = { result, expires: now() + cacheMs };
        active = null;
        resolve(result);
      };
      const fail = (error: unknown) => {
        active = null;
        reject(error);
      };
      try {
        execute(autoRepair, skipIntegrityCheck).then(succeed, fail);
      } catch (error) {
        fail(error);
      }
      return promise;
    },
  };
}

export function resolveDbHealthWorker(): { workerFile: string; execArgv: string[] } {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const entryDir = process.argv[1] ? path.dirname(path.resolve(process.argv[1])) : process.cwd();
  const candidates = [
    path.join(moduleDir, "healthCheckWorker.js"),
    path.join(entryDir, "src/lib/db/healthCheckWorker.js"),
    path.resolve("src/lib/db/healthCheckWorker.js"),
    path.join(moduleDir, "healthCheckWorker.ts"),
    path.resolve("src/lib/db/healthCheckWorker.ts"),
  ];
  for (const workerFile of candidates) {
    // Explicit packaging owns these files; keep the dynamic probe opaque to Next tracing.
    if (Reflect.apply(fs.existsSync, fs, [workerFile])) {
      return { workerFile, execArgv: workerFile.endsWith(".ts") ? ["--import", "tsx/esm"] : [] };
    }
  }
  throw new Error("Database health worker is missing");
}

function isHealthResult(value: unknown): value is DbHealthCheckResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<DbHealthCheckResult>;
  return (
    typeof result.isHealthy === "boolean" &&
    Array.isArray(result.issues) &&
    typeof result.checkedAt === "string" &&
    typeof result.repairedCount === "number" &&
    typeof result.backupCreated === "boolean" &&
    typeof result.autoRepair === "boolean" &&
    typeof result.driver?.name === "string" &&
    typeof result.driver?.degraded === "boolean"
  );
}

export async function runDbHealthInChild(
  job: DbHealthJob,
  options: {
    workerFile?: string;
    execArgv?: string[];
    timeoutMs?: number;
    signal?: AbortSignal;
  } = {}
): Promise<DbHealthCheckResult> {
  if (options.signal?.aborted) throw new Error("Database health check cancelled");
  const resolved = options.workerFile
    ? { workerFile: options.workerFile, execArgv: options.execArgv ?? [] }
    : resolveDbHealthWorker();
  return new Promise((resolve, reject) => {
    const child = fork(resolved.workerFile, [], {
      execArgv: resolved.execArgv,
      stdio: ["ignore", "ignore", "ignore", "ipc"],
    });
    let result: DbHealthCheckResult | null = null;
    let failure: Error | null = null;
    const cancel = () => {
      failure = new Error("Database health check cancelled");
      child.kill("SIGKILL");
    };
    options.signal?.addEventListener("abort", cancel, { once: true });
    if (options.signal?.aborted) cancel();
    const timer = setTimeout(() => {
      failure = new Error("Database health worker timed out");
      child.kill("SIGKILL");
    }, options.timeoutMs ?? 120_000);
    child.on("message", (message: unknown) => {
      if (isHealthResult(message) && message.autoRepair === job.autoRepair) result = message;
      else failure = new Error("Database health worker failed");
    });
    child.on("error", () => {
      failure = new Error("Database health worker failed to start");
    });
    child.once("close", (code) => {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", cancel);
      if (!failure && code === 0 && result) resolve(result);
      else reject(failure ?? new Error("Database health worker exited without a result"));
    });
    child.send(job, (error) => {
      if (error) {
        failure = new Error("Database health worker communication failed");
        child.kill("SIGKILL");
      }
    });
  });
}
