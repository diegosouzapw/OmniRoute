import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  readPidFile,
  isPidRunning,
  cleanupPidFile,
  killAllSubprocesses,
  sleep,
} from "../utils/pid.mjs";
import { t } from "../i18n.mjs";
import { stopProcessGracefully } from "../../../src/shared/platform/windowsProcess.ts";

const execFileAsync = promisify(execFile);

export function registerStop(program) {
  program
    .command("stop")
    .description(t("stop.description"))
    .action(async (opts) => {
      const exitCode = await runStopCommand(opts);
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runStopCommand(opts = {}) {
  const pid = readPidFile("server");
  // #9455: when the server was started with a supervisor (the default), killing only
  // the child lets the supervisor respawn it immediately. The supervisor's PID is
  // persisted separately by serve.mjs; SIGTERM it FIRST so its handler sets
  // isShuttingDown=true and stops the child cleanly without respawning.
  const supervisorPid = readPidFile("supervisor");

  if (pid && isPidRunning(pid)) {
    console.log(t("stop.stopping", { pid }));
    try {
      if (supervisorPid && isPidRunning(supervisorPid)) {
        try {
          process.kill(supervisorPid, "SIGTERM");
        } catch {}
        // Give the supervisor a moment to cascade the shutdown to its child so we
        // don't race the child kill against the supervisor's own child stop.
        await sleep(300);
      }

      // #8045: on win32, process.kill(pid, "SIGTERM") unconditionally force-terminates
      // the target instead of delivering an interceptable signal, racing (and beating)
      // the server's own async graceful shutdown / WAL checkpoint. stopProcessGracefully
      // skips the immediate SIGTERM on win32 and just polls before escalating to SIGKILL.
      if (isPidRunning(pid)) {
        await stopProcessGracefully({ pid, timeoutMs: 5000, isPidRunning, sleep });
      }

      killAllSubprocesses();
      cleanupPidFile("server");
      cleanupPidFile("supervisor");
      console.log(t("stop.stopped"));
      return 0;
    } catch (err) {
      console.error(
        t("common.error", { message: err instanceof Error ? err.message : String(err) })
      );
      return 1;
    }
  }

  const port = opts.port ? parseInt(String(opts.port), 10) : 20128;
  if (pid === null) {
    console.log(t("stop.portFallback"));
    // #9455: a stale supervisor PID file would let the port-fallback stop also
    // leave the supervisor running and respawning. Stop it first.
    if (supervisorPid && isPidRunning(supervisorPid)) {
      try {
        process.kill(supervisorPid, "SIGTERM");
      } catch {}
    }
    const portFreed = await killByPort(port);
    killAllSubprocesses();
    cleanupPidFile("server");
    cleanupPidFile("supervisor");
    // #9455: only report success when the port is actually free — previously stop
    // printed "Server stopped." even when killByPort was a no-op (win32).
    if (portFreed) {
      console.log(t("stop.stopped"));
    } else {
      console.log(t("stop.notRunning"));
    }
    return 0;
  }

  console.log(t("stop.notRunning"));
  return 0;
}

/**
 * Kill the process listening on `port`. Returns true once the port is free
 * (or no listener was found), false if it could not be freed.
 *
 * #9455: previously this was a no-op on win32 (`if (win32) return;`) yet the
 * caller still reported "Server stopped." — a lie. The win32 branch now uses
 * `netstat -ano` to find LISTENING PIDs and `process.kill()` (SIGTERM then
 * SIGKILL), mirroring the POSIX `lsof` path.
 */
export async function killByPort(port, deps = {}) {
  const exec = deps.execFileAsync || execFileAsync;
  const kill = deps.processKill || ((p, sig) => process.kill(p, sig));
  const running = deps.isPidRunning || isPidRunning;
  const wait = deps.sleep || sleep;
  const platform = deps.platform || process.platform;

  if (platform === "win32") {
    return killByPortWin32(port, { exec, kill, running, wait });
  }
  return killByPortPosix(port, { exec, kill, running, wait });
}

async function killByPortPosix(port, { exec, kill, running, wait }) {
  let pids = [];
  try {
    const { stdout } = await exec("lsof", ["-ti", `:${port}`]);
    pids = stdout
      .trim()
      .split("\n")
      .map((p) => parseInt(p, 10))
      .filter((p) => Number.isFinite(p) && p > 0);
  } catch {
    // lsof not available or no process on port
  }
  return terminatePids(pids, { kill, running, wait });
}

async function killByPortWin32(port, { exec, kill, running, wait }) {
  let pids = [];
  try {
    const { stdout } = await exec("netstat", ["-ano"]);
    pids = parseNetstatPids(stdout, port);
  } catch {
    // netstat not available or empty
  }
  return terminatePids(pids, { kill, running, wait });
}

function parseNetstatPids(stdout, port) {
  const portCol = `:${port}`;
  const pids = [];
  for (const line of stdout.split(/\r?\n/)) {
    const cols = line.trim().split(/\s+/);
    // Expected columns: Proto LocalAddress ForeignAddress State PID
    if (cols.length < 5) continue;
    if (cols[0] !== "TCP" && cols[0] !== "TCPv6") continue;
    const local = cols[1] || "";
    if (!local.endsWith(portCol)) continue;
    if ((cols[cols.length - 2] || "").toUpperCase() !== "LISTENING") continue;
    const pid = parseInt(cols[cols.length - 1], 10);
    if (Number.isFinite(pid) && pid > 0 && !pids.includes(pid)) pids.push(pid);
  }
  return pids;
}

async function terminatePids(pids, { kill, running, wait }) {
  if (pids.length === 0) return true;
  for (const p of pids) {
    try {
      kill(p, "SIGTERM");
    } catch {}
  }
  await wait(1000);
  for (const p of pids) {
    try {
      if (running(p)) kill(p, "SIGKILL");
    } catch {}
  }
  // Confirm the port is free: any PID still alive means we failed.
  return pids.every((p) => !running(p));
}
