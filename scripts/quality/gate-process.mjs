import { spawn } from "node:child_process";
import { closeSync, mkdirSync, openSync, writeFileSync, writeSync } from "node:fs";
import { dirname } from "node:path";
import { StringDecoder } from "node:string_decoder";

/** Run one gate without a shell; persist progress before computing its verdict. */
export async function runGateProcess(command, args, options) {
  const {
    cwd,
    env = process.env,
    logPath,
    timeout = 30 * 60 * 1000,
    heartbeatMs = 15000,
    killGraceMs = 1000,
    maxBuffer = 256 * 1024 * 1024,
    signal,
    onHeartbeat = () => {},
  } = options;
  if (!logPath || !Number.isFinite(timeout) || timeout <= 0) {
    throw new Error("Gate execution requires a log path and positive timeout");
  }
  mkdirSync(dirname(logPath), { recursive: true });
  const fd = openSync(logPath, "wx", 0o600);
  const startedAt = new Date().toISOString();
  const started = performance.now();
  let lastOutputAt = startedAt;
  let bytes = 0;
  let out = "";
  let fault = signal?.aborted ? "CANCELLED" : null;
  let spawnError = null;
  let child;
  let escalation;
  let timer;
  let heartbeat;
  let closed = false;
  let settled = false;
  let exitCode = null;
  let exitSignal = null;
  let cleanupError = null;
  let resolveDone;
  const done = new Promise((resolve) => {
    resolveDone = resolve;
  });

  const finish = () => {
    if (settled || !closed || escalation) return;
    settled = true;
    resolveDone();
  };
  const killTree = (killSignal) => {
    if (!child?.pid) return;
    try {
      if (process.platform === "win32") {
        // The release runners are POSIX. Windows still kills descendants, not only npm.cmd.
        const killer = spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
          stdio: "ignore",
          windowsHide: true,
        });
        killer.on("error", () => {
          cleanupError = "taskkill failed";
        });
      } else {
        process.kill(-child.pid, killSignal);
      }
    } catch (error) {
      if (error.code !== "ESRCH") cleanupError = error.code || "cleanup failed";
    }
  };
  const terminate = (reason) => {
    fault ||= reason;
    if (escalation || settled) return;
    killTree("SIGTERM");
    escalation = setTimeout(() => {
      killTree("SIGKILL");
      escalation = null;
      finish();
    }, killGraceMs);
  };
  const cancel = () => terminate("CANCELLED");
  const capture = (chunk, decoder) => {
    bytes += chunk.length;
    lastOutputAt = new Date().toISOString();
    try {
      writeSync(fd, chunk);
    } catch {
      terminate("EVIDENCE_ERROR");
    }
    if (bytes <= maxBuffer) out += decoder.write(chunk);
    else terminate("OUTPUT_LIMIT");
  };

  try {
    if (fault) closed = true;
    else {
      child = spawn(command, args, {
        cwd,
        env,
        shell: false,
        detached: process.platform !== "win32",
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      });
      for (const stream of [child.stdout, child.stderr]) {
        const decoder = new StringDecoder("utf8");
        stream.on("data", (chunk) => capture(chunk, decoder));
        stream.on("end", () => {
          if (bytes <= maxBuffer) out += decoder.end();
        });
      }
      child.on("error", (error) => {
        spawnError = error.code || "spawn failed";
        fault ||= "SPAWN_ERROR";
      });
      child.on("exit", (code, receivedSignal) => {
        exitCode = code;
        exitSignal = receivedSignal;
        if (process.platform !== "win32" && child.pid) {
          try {
            process.kill(-child.pid, 0);
            terminate("ORPHANED_DESCENDANTS");
          } catch (error) {
            if (error.code !== "ESRCH") terminate("CLEANUP_ERROR");
          }
        }
      });
      child.on("close", () => {
        closed = true;
        finish();
      });
      signal?.addEventListener("abort", cancel, { once: true });
      if (signal?.aborted) cancel();
      timer = setTimeout(() => terminate("TIMEOUT"), timeout);
      heartbeat = setInterval(() => {
        try {
          onHeartbeat({ elapsedMs: Math.round(performance.now() - started), bytes, lastOutputAt });
        } catch {
          terminate("EVIDENCE_ERROR");
        }
      }, heartbeatMs);
    }
    finish();
    await done;
  } finally {
    clearTimeout(timer);
    clearInterval(heartbeat);
    signal?.removeEventListener("abort", cancel);
    closeSync(fd);
  }
  const outcome = cleanupError
    ? "CLEANUP_ERROR"
    : fault || (exitSignal ? "SIGNAL" : exitCode === 0 ? "PASS" : "FAIL");
  const code =
    outcome === "PASS"
      ? 0
      : outcome === "TIMEOUT"
        ? 124
        : outcome === "FAIL" && exitCode > 0
          ? exitCode
          : 1;
  const receipt = {
    schemaVersion: 1,
    startedAt,
    completedAt: new Date().toISOString(),
    durationMs: Math.round(performance.now() - started),
    lastOutputAt,
    bytes,
    outcome,
    exitCode,
    signal: exitSignal,
    spawnError,
    cleanupError,
    logPath,
  };
  const receiptPath = `${logPath}.json`;
  writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, { flag: "wx", mode: 0o600 });
  if (outcome !== "PASS" && outcome !== "FAIL")
    out += `\nGate execution ${outcome}; see ${receiptPath}\n`;
  return { code, out, receipt, receiptPath };
}
