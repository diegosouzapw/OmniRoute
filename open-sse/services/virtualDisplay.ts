// #15300: headed Chromium (zai-web needs a real window — Z.ai's CAPTCHA rejects headless)
// exits at launch on a host with no X server (Docker -web image, bare VPS). When a headed launch
// has no DISPLAY/WAYLAND_DISPLAY on Linux we start one private Xvfb per process and hand its
// DISPLAY to Chromium. Hosts that already have a display are left untouched.
import { spawn as nodeSpawn, type ChildProcess } from "node:child_process";

export const MISSING_DISPLAY_MESSAGE =
  "Missing X server or $DISPLAY: a headed browser needs a display. " +
  "Install Xvfb (apt-get install xvfb) or run with xvfb-run / the -web Docker image.";

export class MissingDisplayError extends Error {
  readonly code = "OMNI_NO_DISPLAY";
  constructor(detail?: string) {
    super(detail ? `${MISSING_DISPLAY_MESSAGE} (${detail})` : MISSING_DISPLAY_MESSAGE);
    this.name = "MissingDisplayError";
  }
}

type SpawnFn = typeof nodeSpawn;

interface VirtualDisplayDeps {
  spawn?: SpawnFn;
  env?: NodeJS.ProcessEnv;
  platform?: NodeJS.Platform;
  timeoutMs?: number;
}

let current: { child: ChildProcess; display: string } | null = null;
let starting: Promise<string> | null = null;
let exitHookInstalled = false;

export function hasDisplay(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.DISPLAY || env.WAYLAND_DISPLAY);
}

function startXvfb(spawn: SpawnFn, timeoutMs: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // `-displayfd 3` makes Xvfb pick a free display number and write it to fd 3.
    // Args array, no shell (hard rule #13).
    const child = spawn(
      "Xvfb",
      ["-displayfd", "3", "-screen", "0", "1280x1024x24", "-nolisten", "tcp"],
      { stdio: ["ignore", "ignore", "ignore", "pipe"] }
    );
    let settled = false;
    let out = "";
    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        child.kill("SIGTERM");
      } catch {
        /* ignore */
      }
      reject(err);
    };
    const timer = setTimeout(() => fail(new MissingDisplayError("Xvfb start timeout")), timeoutMs);
    timer.unref?.();
    child.once("error", (err: NodeJS.ErrnoException) =>
      fail(new MissingDisplayError(err.code === "ENOENT" ? "Xvfb not found" : err.message))
    );
    child.once("exit", () => {
      if (current?.child === child) current = null;
      fail(new MissingDisplayError("Xvfb exited"));
    });
    const pipe = child.stdio?.[3] as NodeJS.ReadableStream | null | undefined;
    pipe?.on("data", (chunk: Buffer | string) => {
      out += chunk.toString();
      const m = /^(\d+)\n/.exec(out);
      if (!m || settled) return;
      settled = true;
      clearTimeout(timer);
      const display = `:${m[1]}`;
      current = { child, display };
      child.unref?.();
      resolve(display);
    });
  });
}

/**
 * Returns the DISPLAY value Chromium must be launched with, or undefined when the host already
 * has a display (or is not Linux). Throws MissingDisplayError when Xvfb cannot be started.
 */
export async function ensureVirtualDisplay(
  deps: VirtualDisplayDeps = {}
): Promise<string | undefined> {
  const env = deps.env ?? process.env;
  if ((deps.platform ?? process.platform) !== "linux" || hasDisplay(env)) return undefined;
  if (current && current.child.exitCode === null && !current.child.killed) return current.display;
  current = null;
  if (!starting) {
    starting = startXvfb(deps.spawn ?? nodeSpawn, deps.timeoutMs ?? 5000).finally(() => {
      starting = null;
    });
    if (!exitHookInstalled && !deps.spawn) {
      exitHookInstalled = true;
      process.once("exit", () => stopVirtualDisplay());
    }
  }
  return starting;
}

export function stopVirtualDisplay(): void {
  const child = current?.child;
  current = null;
  try {
    child?.kill("SIGTERM");
  } catch {
    /* ignore */
  }
}
