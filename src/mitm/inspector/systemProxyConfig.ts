/**
 * System-wide proxy configuration toggles.
 *
 * macOS:    `networksetup -setwebproxy / -setsecurewebproxy`
 * Linux:    `gsettings set org.gnome.system.proxy.<scheme> host/port` + mode
 * Windows:  `netsh winhttp set proxy <host:port>`
 *
 * Hard Rule #13: every shell invocation here uses `execFile` with an array of
 * arguments (never a shell string), so runtime values cannot be interpreted
 * as shell syntax.
 *
 * The returned `previousState` is JSON-serialisable so callers can persist it
 * (DB row) and pass it back to `revert()` later — including across process
 * restarts (the operator-facing "Restore system proxy" button).
 */

import { execFile, type ExecFileOptions } from "node:child_process";
import os from "node:os";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export type Platform = "linux" | "macos" | "windows";

export interface MacOsPreviousState {
  platform: "macos";
  service: string;
  http: { enabled: boolean; host: string; port: string };
  https: { enabled: boolean; host: string; port: string };
}

export interface LinuxPreviousState {
  platform: "linux";
  gnomeMode: string;
  httpHost: string;
  httpPort: string;
  httpsHost: string;
  httpsPort: string;
}

export interface WindowsPreviousState {
  platform: "windows";
  netshOutput: string;
}

export type PreviousState =
  | MacOsPreviousState
  | LinuxPreviousState
  | WindowsPreviousState;

export interface ApplyResult {
  platform: Platform;
  previousState: PreviousState;
}

// Injection seam for tests. Default implementation wraps node:child_process
// `execFile` so call-sites use array args (Hard Rule #13).
export type ExecFileFn = (
  file: string,
  args: string[],
  options?: ExecFileOptions
) => Promise<{ stdout: string; stderr: string }>;

let execImpl: ExecFileFn = defaultExec;

function defaultExec(
  file: string,
  args: string[],
  options: ExecFileOptions = {}
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    execFile(file, args, options, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({
        stdout: stdout?.toString() ?? "",
        stderr: stderr?.toString() ?? "",
      });
    });
  });
}

/**
 * Replace the underlying `execFile` runner (for tests).
 * Returns a `restore()` function that puts the default back.
 */
export function __setExec(fn: ExecFileFn): () => void {
  const prev = execImpl;
  execImpl = fn;
  return () => {
    execImpl = prev;
  };
}

function detectPlatform(): Platform {
  const p = os.platform();
  if (p === "darwin") return "macos";
  if (p === "win32") return "windows";
  return "linux";
}

// ────────────────────────────────────────────────────────────────────────────
// macOS — networksetup
// ────────────────────────────────────────────────────────────────────────────

const MAC_DEFAULT_SERVICE = "Wi-Fi";

interface NetworksetupRead {
  enabled: boolean;
  host: string;
  port: string;
}

function parseNetworksetupGet(output: string): NetworksetupRead {
  // Example output:
  //   Enabled: Yes
  //   Server: 192.168.1.1
  //   Port: 3128
  //   Authenticated Proxy Enabled: 0
  const lines = output.split(/\r?\n/);
  let enabled = false;
  let host = "";
  let port = "";
  for (const line of lines) {
    const m = line.match(/^(\S[^:]*):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase();
    const val = m[2].trim();
    if (key === "enabled") enabled = /yes/i.test(val);
    else if (key === "server") host = val;
    else if (key === "port") port = val;
  }
  return { enabled, host, port };
}

async function macosApply(port: number): Promise<MacOsPreviousState> {
  const service = MAC_DEFAULT_SERVICE;
  const httpGet = await execImpl("networksetup", ["-getwebproxy", service]);
  const httpsGet = await execImpl("networksetup", ["-getsecurewebproxy", service]);
  const previousState: MacOsPreviousState = {
    platform: "macos",
    service,
    http: parseNetworksetupGet(httpGet.stdout),
    https: parseNetworksetupGet(httpsGet.stdout),
  };

  await execImpl("networksetup", ["-setwebproxy", service, "127.0.0.1", String(port)]);
  await execImpl("networksetup", ["-setsecurewebproxy", service, "127.0.0.1", String(port)]);
  return previousState;
}

async function macosRevert(state: MacOsPreviousState): Promise<void> {
  const service = state.service;
  if (state.http.enabled && state.http.host && state.http.port) {
    await execImpl("networksetup", [
      "-setwebproxy",
      service,
      state.http.host,
      state.http.port,
    ]);
  } else {
    await execImpl("networksetup", ["-setwebproxystate", service, "off"]);
  }
  if (state.https.enabled && state.https.host && state.https.port) {
    await execImpl("networksetup", [
      "-setsecurewebproxy",
      service,
      state.https.host,
      state.https.port,
    ]);
  } else {
    await execImpl("networksetup", ["-setsecurewebproxystate", service, "off"]);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Linux — gsettings (GNOME); systems without gsettings are unsupported here.
// ────────────────────────────────────────────────────────────────────────────

async function readGsetting(key: string): Promise<string> {
  try {
    const { stdout } = await execImpl("gsettings", ["get", "org.gnome.system.proxy", key]);
    return stdout.trim();
  } catch {
    return "";
  }
}

async function readGsubsetting(
  scheme: string,
  key: string
): Promise<string> {
  try {
    // HR#13: concat (not template) — scheme is a hardcoded "http"|"https" constant.
    const { stdout } = await execImpl("gsettings", [
      "get",
      "org.gnome.system.proxy." + scheme,
      key,
    ]);
    return stdout.trim();
  } catch {
    return "";
  }
}

async function linuxApply(port: number): Promise<LinuxPreviousState> {
  const previousState: LinuxPreviousState = {
    platform: "linux",
    gnomeMode: await readGsetting("mode"),
    httpHost: await readGsubsetting("http", "host"),
    httpPort: await readGsubsetting("http", "port"),
    httpsHost: await readGsubsetting("https", "host"),
    httpsPort: await readGsubsetting("https", "port"),
  };

  const portStr = String(port);
  await execImpl("gsettings", ["set", "org.gnome.system.proxy", "mode", "manual"]);
  await execImpl("gsettings", ["set", "org.gnome.system.proxy.http", "host", "127.0.0.1"]);
  await execImpl("gsettings", ["set", "org.gnome.system.proxy.http", "port", portStr]);
  await execImpl("gsettings", ["set", "org.gnome.system.proxy.https", "host", "127.0.0.1"]);
  await execImpl("gsettings", ["set", "org.gnome.system.proxy.https", "port", portStr]);
  return previousState;
}

async function linuxRevert(state: LinuxPreviousState): Promise<void> {
  const mode = state.gnomeMode || "'none'";
  await execImpl("gsettings", ["set", "org.gnome.system.proxy", "mode", mode]);
  if (state.httpHost) {
    await execImpl("gsettings", ["set", "org.gnome.system.proxy.http", "host", state.httpHost]);
  }
  if (state.httpPort) {
    await execImpl("gsettings", ["set", "org.gnome.system.proxy.http", "port", state.httpPort]);
  }
  if (state.httpsHost) {
    await execImpl("gsettings", [
      "set",
      "org.gnome.system.proxy.https",
      "host",
      state.httpsHost,
    ]);
  }
  if (state.httpsPort) {
    await execImpl("gsettings", [
      "set",
      "org.gnome.system.proxy.https",
      "port",
      state.httpsPort,
    ]);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Windows — netsh winhttp
// ────────────────────────────────────────────────────────────────────────────

async function windowsApply(port: number): Promise<WindowsPreviousState> {
  const showRes = await execImpl("netsh", ["winhttp", "show", "proxy"]);
  const previousState: WindowsPreviousState = {
    platform: "windows",
    netshOutput: showRes.stdout,
  };
  // HR#13: concat (not template) — port is Zod-validated number (z.number().int().positive().max(65535)).
  const proxyArg = "127.0.0.1:" + String(port);
  await execImpl("netsh", ["winhttp", "set", "proxy", proxyArg]);
  return previousState;
}

async function windowsRevert(_state: WindowsPreviousState): Promise<void> {
  // netsh has no idempotent restore; the safe default is "reset".
  // The previousState is preserved so the UI can show the operator what was
  // configured before, but actual reapply of obscure netsh state is out of
  // scope.
  await execImpl("netsh", ["winhttp", "reset", "proxy"]);
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Apply OmniRoute as the system-wide HTTP/HTTPS proxy at `127.0.0.1:<port>`.
 * Captures and returns the prior configuration so callers can revert later.
 *
 * Throws a sanitized `Error` if the underlying command fails (no stack/path
 * leakage — see Hard Rule #12).
 */
export async function apply(port: number): Promise<ApplyResult> {
  const platform = detectPlatform();
  try {
    let previousState: PreviousState;
    if (platform === "macos") previousState = await macosApply(port);
    else if (platform === "windows") previousState = await windowsApply(port);
    else previousState = await linuxApply(port);
    return { platform, previousState };
  } catch (err) {
    throw new Error(sanitizeErrorMessage(err) || "system proxy apply failed");
  }
}

/**
 * Restore the prior configuration captured by `apply()`. No-op if the
 * `previousState` payload does not match a known platform.
 */
export async function revert(previousState: PreviousState | unknown): Promise<void> {
  if (!previousState || typeof previousState !== "object") return;
  const state = previousState as Record<string, unknown>;
  const platform = state.platform;
  try {
    if (platform === "macos") await macosRevert(state as unknown as MacOsPreviousState);
    else if (platform === "linux") await linuxRevert(state as unknown as LinuxPreviousState);
    else if (platform === "windows")
      await windowsRevert(state as unknown as WindowsPreviousState);
  } catch (err) {
    throw new Error(sanitizeErrorMessage(err) || "system proxy revert failed");
  }
}
