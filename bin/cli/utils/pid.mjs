import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { resolveDataDir } from "../data-dir.mjs";

const SERVICES = ["server", "mitm", "tunnel/cloudflared", "tunnel/tailscale"];

function getServicePidPath(service) {
  return join(resolveDataDir(), service, ".pid");
}

export function writePidFile(service, pid) {
  try {
    const dir = join(resolveDataDir(), service);
    mkdirSync(dir, { recursive: true });
    writeFileSync(getServicePidPath(service), String(pid), "utf8");
    return true;
  } catch {
    return false;
  }
}

export function readPidFile(service) {
  try {
    const file = getServicePidPath(service);
    if (!existsSync(file)) return null;
    const pid = parseInt(readFileSync(file, "utf8").trim(), 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

export function cleanupPidFile(service) {
  try {
    unlinkSync(getServicePidPath(service));
  } catch {}
}

export function killAllSubprocesses() {
  for (const service of SERVICES) {
    const pid = readPidFile(service);
    if (!pid) continue;
    try {
      process.kill(pid, "SIGTERM");
    } catch {}
    cleanupPidFile(service);
  }
}

export function isPidRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// #2460: Default raised from 15s to 60s so Windows users (slower Next.js
// cold start due to filesystem watchers, antivirus, etc.) get a working
// "server ready" signal instead of a phantom timeout while the server is
// still booting. TCP fallback marks the server as ready when the port
// has been listening for >= 3s consecutively but /api/monitoring/health
// has not yet been mounted — common during dev cold start.
export async function waitForServer(port, timeout = 60000) {
  const start = Date.now();
  let tcpListeningSince = null;
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`http://localhost:${port}/api/monitoring/health`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return true;
      // Server responded but health endpoint is not ready yet — keep
      // polling, but the fact that we got a response means TCP is open.
      if (tcpListeningSince === null) tcpListeningSince = Date.now();
    } catch {
      const listening = await isPortListening(port).catch(() => false);
      if (listening) {
        if (tcpListeningSince === null) tcpListeningSince = Date.now();
        if (Date.now() - tcpListeningSince >= 3000) return true;
      } else {
        tcpListeningSince = null;
      }
    }
    await sleep(500);
  }
  return false;
}

async function isPortListening(port) {
  const net = await import("node:net");
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port, timeout: 1000 });
    const finish = (ok) => {
      try {
        socket.destroy();
      } catch {}
      resolve(ok);
    };
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.once("timeout", () => finish(false));
  });
}
