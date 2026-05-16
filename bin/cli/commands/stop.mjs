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
      process.kill(pid, "SIGTERM");

      let waited = 0;
      while (waited < 5000 && isPidRunning(pid)) {
        await sleep(100);
        waited += 100;
      }

      if (isPidRunning(pid)) {
        process.kill(pid, "SIGKILL");
        await sleep(500);
      }

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
