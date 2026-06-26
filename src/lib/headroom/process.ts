/**
 * Local headroom-proxy lifecycle management.
 *
 * Ported from upstream 9router @ b55cf36d (Cursor / decolua).
 *
 * Spawns the local `headroom proxy --port <port>` as a detached process,
 * tracks its PID in `<DATA_DIR>/headroom/proxy.pid`, and exposes start/stop/
 * status helpers. Only invoked behind the LOCAL_ONLY route-guard tier
 * (Hard Rules #15 + #17): a tunneled JWT cannot reach the start/stop routes.
 */

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { DATA_DIR } from "@/lib/db/core";
import { findHeadroomBinary } from "./detect";

const HEADROOM_DIR = path.join(DATA_DIR ?? ".", "headroom");
const PID_FILE = path.join(HEADROOM_DIR, "proxy.pid");
const LOG_FILE = path.join(HEADROOM_DIR, "proxy.log");
const DEFAULT_PORT = 8787;
const STARTUP_TIMEOUT_MS = 8000;
const STOP_GRACE_MS = 2000;

export interface StartResult {
  pid: number;
  alreadyRunning: boolean;
}

export interface StopResult {
  stopped: boolean;
  pid?: number;
  reason?: string;
}

export class HeadroomError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
}

function ensureDir(): void {
  if (!fs.existsSync(HEADROOM_DIR)) fs.mkdirSync(HEADROOM_DIR, { recursive: true });
}

function readPid(): number | null {
  try {
    if (!fs.existsSync(PID_FILE)) return null;
    const raw = fs.readFileSync(PID_FILE, "utf8").trim();
    const pid = parseInt(raw, 10);
    return Number.isFinite(pid) && pid > 0 ? pid : null;
  } catch {
    return null;
  }
}

function writePid(pid: number): void {
  ensureDir();
  fs.writeFileSync(PID_FILE, String(pid));
}

function clearPid(): void {
  try {
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
  } catch {
    // ignore
  }
}

export function isPidAlive(pid: number | null | undefined): boolean {
  if (!pid || typeof pid !== "number") return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

export function getManagedPid(): number | null {
  const pid = readPid();
  return pid && isPidAlive(pid) ? pid : null;
}

function safePort(port: unknown): number {
  const n = Number(port);
  return Number.isFinite(n) && n > 0 && n < 65536 ? n : DEFAULT_PORT;
}

export async function startHeadroomProxy(
  opts: { port?: number } = {}
): Promise<StartResult> {
  const binary = findHeadroomBinary();
  if (!binary) {
    throw new HeadroomError("Headroom CLI not installed", "NOT_INSTALLED");
  }

  const existing = getManagedPid();
  if (existing) return { pid: existing, alreadyRunning: true };

  ensureDir();
  const outFd = fs.openSync(LOG_FILE, "a");

  // spawn (no shell) with array args — argv is passed directly to the
  // headroom binary, so no shell-metacharacter handling is needed.
  const child = spawn(binary, ["proxy", "--port", String(safePort(opts.port))], {
    stdio: ["ignore", outFd, outFd],
    detached: true,
    windowsHide: true,
    env: { ...process.env },
  });

  if (!child.pid) {
    fs.closeSync(outFd);
    throw new HeadroomError("Failed to spawn headroom proxy", "SPAWN_FAILED");
  }

  child.unref();
  writePid(child.pid);

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      if (isPidAlive(child.pid!)) resolve();
      else
        reject(
          new HeadroomError(
            "headroom proxy exited during startup — see proxy.log",
            "EARLY_EXIT"
          )
        );
    }, STARTUP_TIMEOUT_MS);

    child.once("exit", (code) => {
      clearTimeout(timer);
      clearPid();
      try {
        fs.closeSync(outFd);
      } catch {
        // already closed
      }
      reject(
        new HeadroomError(
          `headroom proxy exited early (code=${code}) — see proxy.log`,
          "EARLY_EXIT"
        )
      );
    });
  });

  try {
    fs.closeSync(outFd);
  } catch {
    // already closed
  }

  return { pid: child.pid, alreadyRunning: false };
}

export function stopHeadroomProxy(): StopResult {
  const pid = getManagedPid();
  if (!pid) return { stopped: false, reason: "not_running" };
  try {
    process.kill(pid, "SIGTERM");
    setTimeout(() => {
      if (isPidAlive(pid)) {
        try {
          process.kill(pid, "SIGKILL");
        } catch {
          // already gone
        }
      }
    }, STOP_GRACE_MS);
    clearPid();
    return { stopped: true, pid };
  } catch (e) {
    clearPid();
    const msg = e instanceof Error ? e.message : String(e);
    throw new HeadroomError(`Failed to stop headroom proxy: ${msg}`, "STOP_FAILED");
  }
}

export function getHeadroomLogTail(maxLines = 200): string {
  try {
    if (!fs.existsSync(LOG_FILE)) return "";
    const content = fs.readFileSync(LOG_FILE, "utf8");
    const lines = content.split(/\r?\n/).filter(Boolean);
    return lines.slice(-maxLines).join("\n");
  } catch {
    return "";
  }
}
