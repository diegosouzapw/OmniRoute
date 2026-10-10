import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { resolveDataDir } from "@/lib/dataPaths";

export type SupervisedShutdownOutcome = "supervisor" | "none";

export interface SupervisedShutdownDeps {
  parentPid?: number;
  selfPid?: number;
  readPidFile?: (service: "supervisor") => number | null;
  isPidRunning?: (pid: number) => boolean;
  isSupervisorCommand?: (pid: number) => boolean;
  writeShutdownIntent?: (pid: number) => void;
  killProcess?: (pid: number) => void;
}

/**
 * #16030 (P2): `serve` is the CLI's DEFAULT command, so a supervised server may
 * have been launched as `node /usr/local/bin/omniroute` with no subcommand at
 * all. Accept that form plus an explicit `serve`; reject other subcommands.
 */
export function isOmnirouteServeCommand(command: string): boolean {
  const tokens = command.split(/\s+/).filter(Boolean);
  const index = tokens.findIndex((token) => {
    const base = token.split(/[\\/]/).pop() ?? "";
    return base === "omniroute" || base === "omniroute.exe" || base === "omniroute.cmd";
  });
  if (index === -1) return false;
  const rest = tokens.slice(index + 1).filter((token) => !token.startsWith("-"));
  return rest.length === 0 || rest[0] === "serve";
}

function defaultIsSupervisorCommand(pid: number): boolean {
  try {
    // Linux-only: macOS has no procfs, so this check fails there and callers
    // must rely on the shutdown-intent marker instead (see below).
    const command = readFileSync(`/proc/${pid}/cmdline`).toString("utf8").replaceAll("\0", " ");
    return isOmnirouteServeCommand(command);
  } catch {
    return false;
  }
}

/**
 * #16030 (P1): portable shutdown intent. The child writes a marker carrying its
 * own pid before exiting on purpose; the CLI supervisor consumes it and exits
 * instead of restarting. Works on every platform, unlike procfs reads.
 */
function defaultWriteShutdownIntent(pid: number): void {
  try {
    const file = path.join(resolveDataDir(), "supervisor", ".shutdown-intent");
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, String(pid), "utf8");
  } catch {
    // Best-effort: a failed marker write must not block the shutdown request.
  }
}

function defaultReadSupervisorPid(): number | null {
  try {
    const file = path.join(resolveDataDir(), "supervisor", ".pid");
    if (!existsSync(file)) return null;
    const pid = Number.parseInt(readFileSync(file, "utf8").trim(), 10);
    return Number.isInteger(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

function defaultIsPidRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function requestSupervisedShutdown(
  deps: SupervisedShutdownDeps = {}
): SupervisedShutdownOutcome {
  const parentPid = deps.parentPid ?? process.ppid;
  const selfPid = deps.selfPid ?? process.pid;
  const readPidFile = deps.readPidFile ?? defaultReadSupervisorPid;
  const isPidRunning = deps.isPidRunning ?? defaultIsPidRunning;
  const isSupervisorCommand = deps.isSupervisorCommand ?? defaultIsSupervisorCommand;
  const writeShutdownIntent = deps.writeShutdownIntent ?? defaultWriteShutdownIntent;
  const killProcess = deps.killProcess ?? ((pid: number) => process.kill(pid, "SIGTERM"));

  // Always record intent first: even when the supervisor's identity cannot be
  // proven below (no procfs, default-argv launch), the marker lets the
  // supervisor treat this child's deliberate exit as a stop, not a crash.
  writeShutdownIntent(selfPid);

  const supervisorPid = readPidFile("supervisor");
  if (
    !Number.isInteger(supervisorPid) ||
    !supervisorPid ||
    supervisorPid <= 0 ||
    supervisorPid !== parentPid ||
    !isPidRunning(supervisorPid) ||
    !isSupervisorCommand(supervisorPid)
  ) {
    return "none";
  }
  killProcess(supervisorPid);
  return "supervisor";
}
