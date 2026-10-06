/**
 * obscura.ts — Shared Obscura browser engine (#12274).
 *
 * Obscura (https://github.com/h4ckf0r0day/obscura) is a lightweight Rust
 * headless browser (~30MB resident) that speaks the Chrome DevTools Protocol.
 * Playwright's `chromium.connectOverCDP` drives it like a real Chrome, so the
 * browser pool and the cloudflare-playground executor can both use it without
 * holding a 150-400MB Chromium process.
 *
 * Lifecycle: one Obscura `serve` process is spawned lazily on first use and
 * shared for the server's lifetime. Callers receive a fresh CDP connection on
 * demand; closing the connection does not stop the shared server. Set
 * OBSCURA_CDP_ENDPOINT to point at an already-running Obscura instead of
 * spawning one here (the process is then not owned by this module). The
 * module is also disabled entirely when OMNIROUTE_BROWSER_POOL=off.
 */

import { spawn, type ChildProcess } from "node:child_process";
import { createServer } from "node:net";

export interface ObscuraConnection {
  /** Playwright Browser connected over CDP to the shared Obscura server. */
  browser: import("playwright").Browser;
  /** The spawned `obscura serve` process, or null when an external endpoint is used. */
  child: ChildProcess | null;
}

let shared: { child: ChildProcess | null; endpoint: string } | null = null;
let starting: Promise<{ child: ChildProcess | null; endpoint: string } | null> | null = null;

export function isObscuraUsable(): boolean {
  const flag = process.env.OMNIROUTE_BROWSER_POOL;
  if (flag === undefined) return true;
  return flag !== "off" && flag !== "0" && flag !== "false";
}

function findFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const address = srv.address();
      srv.close(() => {
        if (address && typeof address === "object") resolve(address.port);
        else reject(new Error("obscura: could not allocate a free port"));
      });
    });
  });
}

async function obscuraBinaryPath(): Promise<string | null> {
  const bin = process.env.OBSCURA_BIN;
  if (bin) return bin;
  const { resolve } = await import("node:path");
  const { existsSync, accessSync, constants } = await import("node:fs");
  const dirs = (process.env.PATH || "").split(":");
  for (const dir of dirs) {
    const candidate = resolve(dir, "obscura");
    try {
      accessSync(candidate, constants.X_OK);
      if (existsSync(candidate)) return candidate;
    } catch {
      /* not executable here — keep looking */
    }
  }
  return null;
}

async function waitForCdpEndpoint(endpoint: string, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 1500);
      // Probe /json/version, not the base URL: Obscura's HTTP server answers
      // the CDP info route, while a bare GET to "/" never completes a response.
      const probe = endpoint.replace(/^ws/, "http").replace(/\/$/, "") + "/json/version";
      const res = await fetch(probe, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return false;
}

/** Ensure the shared Obscura server is up; returns its endpoint or null. */
export async function ensureObscuraServer(): Promise<{
  child: ChildProcess | null;
  endpoint: string;
} | null> {
  if (!isObscuraUsable()) return null;
  if (shared) return shared;
  if (starting) return starting;
  starting = (async () => {
    const endpoint = process.env.OBSCURA_CDP_ENDPOINT;
    if (endpoint) {
      shared = { child: null, endpoint };
      return shared;
    }
    const bin = await obscuraBinaryPath();
    if (!bin) return null;
    const port = Number(process.env.OBSCURA_PORT) || (await findFreePort());
    const child = spawn(bin, ["serve", "--port", String(port), "--host", "127.0.0.1"], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    child.stderr?.on("data", () => {}); // obscura logs verbosely — swallow
    const endpointForServer = `http://127.0.0.1:${port}`;
    // A bad binary path (or a binary that cannot serve) must not hold the
    // readiness wait for the full timeout: bail as soon as the child exits
    // (or fails to spawn at all — 'exit' alone misses an ENOENT 'error').
    const died = new Promise<boolean>((resolve) => {
      child.once("exit", () => resolve(true));
      child.once("error", () => resolve(true));
    });
    const ready = await Promise.race([
      waitForCdpEndpoint(endpointForServer, 30_000),
      died.then(() => false as const),
    ]);
    if (ready !== true) {
      child.kill("SIGKILL");
      return null;
    }
    shared = { child, endpoint: endpointForServer };
    return shared;
  })();
  try {
    return await starting;
  } finally {
    starting = null;
  }
}

/**
 * Connect Playwright to the shared Obscura server. Returns null when Obscura
 * is disabled, not installed, or the server could not start (callers fall
 * back to their previous Chromium strategy).
 */
export async function connectObscuraBrowser(): Promise<ObscuraConnection | null> {
  const server = await ensureObscuraServer();
  if (!server) return null;
  try {
    const { chromium } = await import("playwright");
    const browser = await chromium.connectOverCDP(server.endpoint);
    return { browser, child: server.child };
  } catch {
    return null;
  }
}

/** Caution: this terminates the shared `obscura serve` process (process-lifetime anyway). */
export function killSharedObscuraServer(): void {
  if (shared?.child) {
    try {
      shared.child.kill("SIGKILL");
    } catch {
      /* ignore */
    }
  }
  shared = null;
}
