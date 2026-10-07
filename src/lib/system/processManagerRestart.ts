/**
 * Restart mechanism detection for the npm-mode dashboard "Update" flow.
 *
 * #11885: `src/app/api/system/version/route.ts` hardcoded `pm2 restart omniroute` as the
 * ONLY restart mechanism, at two near-identical branches. OmniRoute ships its OWN
 * supervisor (`bin/cli/runtime/processSupervisor.mjs`, started by `omniroute serve` /
 * `omniroute serve --daemon`) with PID-file management (`bin/cli/utils/pid.mjs`) as an
 * alternative to pm2 — so on any install that isn't pm2-managed, the restart step
 * silently degraded to a "skipped" status while the install step still reported "done",
 * which reads like a completed live update even though nothing restarted.
 *
 * This module tries OmniRoute's own PID-file-managed supervisor first, then falls back
 * to pm2, and returns an honest "restart-required" outcome instead of a silent no-op
 * when neither is detected.
 */
import path from "node:path";
import fs from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { resolveDataDir } from "@/lib/dataPaths";

const execFileAsync = promisify(execFile);

export type RestartMethod = "own-supervisor" | "pm2" | "none";
export type RestartStatus = "done" | "restart-required";

export interface RestartOutcome {
  method: RestartMethod;
  status: RestartStatus;
  message: string;
}

type PidService = "server" | "supervisor";

export interface RestartManagerDeps {
  readPidFile?: (service: PidService) => number | null;
  isPidRunning?: (pid: number) => boolean;
  killProcess?: (pid: number) => void;
  execPm2?: (args: string[]) => Promise<unknown>;
}

function defaultReadPidFile(service: PidService): number | null {
  try {
    const file = path.join(resolveDataDir(), service, ".pid");
    if (!fs.existsSync(file)) return null;
    const raw = fs.readFileSync(file, "utf8").trim();
    const pid = parseInt(raw, 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

function defaultIsPidRunning(pid: number): boolean {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function defaultKillProcess(pid: number): void {
  process.kill(pid, "SIGTERM");
}

function defaultExecPm2(args: string[]): Promise<unknown> {
  return execFileAsync("pm2", args, { timeout: 30_000 });
}

/**
 * Attempt to restart the running OmniRoute server.
 *
 * Order:
 *  1. OmniRoute's own PID-file-managed supervisor — SIGTERM the supervised "server"
 *     child ONLY, never the supervisor process itself. The supervisor's exit handler
 *     (`ServerSupervisor.handleExit`) treats an unexpected child exit as a crash and
 *     respawns it, which IS the restart we want. SIGTERM to the SUPERVISOR instead
 *     sets its `isShuttingDown` flag and intentionally skips the respawn (see
 *     `bin/cli/commands/stop.mjs`) — that would stop the service, not restart it.
 *  2. pm2, for installs that use it instead of the CLI's own supervisor.
 *  3. Neither detected — return an honest "restart-required" outcome rather than a
 *     silently-skipped step that reads like nothing was wrong.
 */
export async function restartRunningServer(
  deps: RestartManagerDeps = {}
): Promise<RestartOutcome> {
  const readPidFile = deps.readPidFile ?? defaultReadPidFile;
  const isPidRunning = deps.isPidRunning ?? defaultIsPidRunning;
  const killProcess = deps.killProcess ?? defaultKillProcess;
  const execPm2 = deps.execPm2 ?? defaultExecPm2;

  const supervisorPid = readPidFile("supervisor");
  const serverPid = readPidFile("server");
  const supervisorAlive = Boolean(supervisorPid && isPidRunning(supervisorPid));
  const serverAlive = Boolean(serverPid && isPidRunning(serverPid));

  if (supervisorAlive && serverAlive && serverPid) {
    try {
      killProcess(serverPid);
      return {
        method: "own-supervisor",
        status: "done",
        message: "Restarted via the OmniRoute supervisor (server process recycled).",
      };
    } catch {
      // Fall through to pm2 / restart-required below.
    }
  }

  try {
    await execPm2(["restart", "omniroute", "--update-env"]);
    return { method: "pm2", status: "done", message: "Service restarted via pm2." };
  } catch {
    return {
      method: "none",
      status: "restart-required",
      message:
        "Files were updated, but no supported process manager (OmniRoute's own supervisor or pm2) was detected — restart the server manually to apply the update.",
    };
  }
}
