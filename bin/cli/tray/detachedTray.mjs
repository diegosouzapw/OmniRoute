import { execFileSync, spawn } from "node:child_process";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { createServer, connect } from "node:net";

/** Builds arguments for the hidden process that owns the server and tray. */
export function buildTrayWorkerArgs({ port, maxRestarts, readyPort, readyToken, tlsCert, tlsKey }) {
  const args = [
    "serve",
    "--tray",
    "--tray-worker",
    "--no-open",
    "--port",
    String(port),
    "--max-restarts",
    String(maxRestarts),
    "--tray-ready-port",
    String(readyPort),
    "--tray-ready-token",
    readyToken,
  ];
  if (tlsCert) args.push("--tls-cert", tlsCert);
  if (tlsKey) args.push("--tls-key", tlsKey);
  return args;
}

/** Builds the platform command that starts the hidden tray worker. */
export function buildTrayLaunch({ platform, execPath, cliPath, workerArgs, label }) {
  if (platform === "darwin") {
    return {
      command: "launchctl",
      args: ["submit", "-l", label, "--", execPath, cliPath, ...workerArgs],
      options: { stdio: "ignore" },
    };
  }
  return {
    command: execPath,
    args: [cliPath, ...workerArgs],
    options: { detached: true, stdio: "ignore", windowsHide: true },
  };
}

/** Returns an error for command modes that conflict with detached tray mode. */
export function validateTrayOptions(opts) {
  if (opts.trayWorker && (!opts.trayReadyPort || !opts.trayReadyToken)) {
    return "tray worker requires readiness credentials";
  }
  if (!opts.tray || opts.trayWorker) return null;
  if (opts.daemon) return "--tray cannot use --daemon";
  if (opts.log) return "--tray cannot use --log";
  if (opts.noRecovery || opts.recovery === false) return "--tray cannot use --no-recovery";
  return null;
}

/** Creates a token-protected loopback server for tray worker readiness. */
export async function createTrayReadinessServer(token) {
  let markReady;
  const ready = new Promise((resolve) => {
    markReady = resolve;
  });
  const expected = Buffer.from(token);
  const server = createServer((socket) => {
    let data = "";
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => {
      data += chunk;
      if (data.length > 256) socket.destroy();
    });
    socket.on("end", () => {
      const received = Buffer.from(data);
      if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
        socket.end("ERROR");
        return;
      }
      socket.end("READY");
      markReady();
    });
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  return {
    port: address.port,
    wait(timeoutMs) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("Tray worker did not become ready")),
          timeoutMs
        );
        ready.then(() => {
          clearTimeout(timer);
          resolve();
        });
      });
    },
    close() {
      server.close();
    },
  };
}

/** Notifies the parent process that the server and tray are ready. */
export async function notifyTrayReady(port, token) {
  await new Promise((resolve, reject) => {
    const socket = connect({ host: "127.0.0.1", port }, () => socket.end(token));
    let reply = "";
    socket.setEncoding("utf8");
    socket.on("data", (chunk) => {
      reply += chunk;
    });
    socket.on("end", () => {
      if (reply === "READY") resolve();
      else reject(new Error("Tray readiness token was rejected"));
    });
    socket.on("error", reject);
  });
}

/** Starts a detached tray worker and waits until its server and tray are ready. */
export async function startDetachedTray(
  { cliPath, port, maxRestarts, tlsCert, tlsKey, timeoutMs = 60000 },
  { platform = process.platform, spawnProcess = spawn } = {}
) {
  const token = randomBytes(32).toString("hex");
  const readiness = await createTrayReadinessServer(token);
  const label = `com.omniroute.tray.${process.pid}.${Date.now()}`;
  const workerArgs = buildTrayWorkerArgs({
    port,
    maxRestarts,
    readyPort: readiness.port,
    readyToken: token,
    tlsCert,
    tlsKey,
  });
  const launch = buildTrayLaunch({
    platform,
    execPath: process.execPath,
    cliPath,
    workerArgs,
    label,
  });
  const child = spawnProcess(launch.command, launch.args, launch.options);
  const spawnFailure = new Promise((_, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => {
      if (platform !== "darwin" || code !== 0) {
        reject(new Error(`Tray worker exited before readiness with code ${code ?? "unknown"}`));
      }
    });
  });
  if (platform !== "darwin") child.unref?.();
  try {
    await Promise.race([readiness.wait(timeoutMs), spawnFailure]);
    return { platform, pid: child.pid, label: platform === "darwin" ? label : null };
  } catch (err) {
    if (platform === "darwin") {
      try {
        execFileSync("launchctl", ["bootout", `gui/${process.getuid()}/${label}`], {
          stdio: "ignore",
        });
      } catch {}
    } else if (platform === "win32" && child.pid) {
      try {
        execFileSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
      } catch {}
    } else if (child.pid) {
      try {
        process.kill(child.pid, "SIGTERM");
      } catch {}
    }
    throw err;
  } finally {
    readiness.close();
  }
}
