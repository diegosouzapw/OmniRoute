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

  if (pid && isPidRunning(pid)) {
    console.log(t("stop.stopping", { pid }));
    try {
      // #8045: on win32, process.kill(pid, "SIGTERM") unconditionally force-terminates
      // the target instead of delivering an interceptable signal, racing (and beating)
      // the server's own async graceful shutdown / WAL checkpoint. stopProcessGracefully
      // skips the immediate SIGTERM on win32 and just polls before escalating to SIGKILL.
      await stopProcessGracefully({ pid, timeoutMs: 5000, isPidRunning, sleep });

      killAllSubprocesses();
      cleanupPidFile("server");
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
    await killByPort(port);
    killAllSubprocesses();
    cleanupPidFile("server");
    console.log(t("stop.stopped"));
    return 0;
  }

  console.log(t("stop.notRunning"));
  return 0;
}

async function killByPort(port) {
  if (process.platform === "win32") return;
  try {
    const { stdout } = await execFileAsync("lsof", ["-ti", `:${port}`]);
    const pids = stdout
      .trim()
      .split("\n")
      .map((p) => parseInt(p, 10))
      .filter((p) => Number.isFinite(p) && p > 0);

    for (const p of pids) {
      try {
        process.kill(p, "SIGTERM");
      } catch {}
    }

    if (pids.length > 0) {
      await sleep(1000);
      for (const p of pids) {
        try {
          if (isPidRunning(p)) process.kill(p, "SIGKILL");
        } catch {}
      }
    }
  } catch {
    // lsof not available or no process on port
  }
}
