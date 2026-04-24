import { execFile, spawn } from "child_process";
import fs from "fs";
import fsPromises from "fs/promises";
import os from "os";
import path from "path";
import { promisify } from "util";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { resolveDataDir } from "@/lib/dataPaths";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { execWithPassword } from "@/mitm/dns/dnsConfig";
import { getCachedPassword, setCachedPassword } from "@/mitm/manager";
import { getConsistentMachineId } from "@/shared/utils/machineId";

const execFileAsync = promisify(execFile);

const WINDOWS_TAILSCALE_BIN = "C:\\Program Files\\Tailscale\\tailscale.exe";
const WINDOWS_TAILSCALED_BIN = "C:\\Program Files\\Tailscale\\tailscaled.exe";
const IS_MAC = process.platform === "darwin";
const IS_LINUX = process.platform === "linux";
const IS_WINDOWS = process.platform === "win32";
const EXTENDED_PATH = `/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:${process.env.PATH || ""}`;
const LOGIN_TIMEOUT_MS = 15000;
const FUNNEL_TIMEOUT_MS = 30000;

type JsonRecord = Record<string, unknown>;

export type TailscaleTunnelInstallSource = "managed" | "path" | "env" | "windows-default";
export type TailscaleTunnelPhase =
  | "unsupported"
  | "not_installed"
  | "needs_login"
  | "stopped"
  | "running"
  | "error";

type PersistedTailscaleState = {
  binaryPath?: string | null;
  installSource?: TailscaleTunnelInstallSource | null;
  daemonPid?: number | null;
  tunnelUrl?: string | null;
  lastError?: string | null;
  installedAt?: string | null;
  updatedAt?: string | null;
};

type BinaryResolution = {
  binaryPath: string | null;
  installSource: TailscaleTunnelInstallSource | null;
  managedInstall: boolean;
};

type TailscaleLoginResult = { alreadyLoggedIn: true } | { authUrl: string };

type TailscaleFunnelResult =
  | { tunnelUrl: string }
  | { funnelNotEnabled: true; enableUrl: string | null };

export type TailscaleCheckStatus = {
  supported: boolean;
  installed: boolean;
  managedInstall: boolean;
  installSource: TailscaleTunnelInstallSource | null;
  binaryPath: string | null;
  loggedIn: boolean;
  daemonRunning: boolean;
  running: boolean;
  tunnelUrl: string | null;
  apiUrl: string | null;
  platform: NodeJS.Platform;
  brewAvailable: boolean;
  lastError: string | null;
  pid: number | null;
};

export type TailscaleTunnelStatus = TailscaleCheckStatus & {
  enabled: boolean;
  phase: TailscaleTunnelPhase;
};

export type TailscaleEnableResult =
  | {
      success: true;
      tunnelUrl: string;
      apiUrl: string | null;
      status: TailscaleTunnelStatus;
    }
  | {
      success: false;
      needsLogin: true;
      authUrl: string;
      status: TailscaleTunnelStatus;
    }
  | {
      success: false;
      funnelNotEnabled: true;
      enableUrl: string | null;
      status: TailscaleTunnelStatus;
    };

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shellEscape(value: string) {
  return `'${value.replace(/'/g, `'\"'\"'`)}'`;
}

function isSupportedPlatform(platform = process.platform) {
  return platform === "darwin" || platform === "linux" || platform === "win32";
}

function getTailscaleDir() {
  return path.join(resolveDataDir(), "tailscale");
}

function getManagedBinaryPath(platform = process.platform) {
  return path.join(getTailscaleDir(), "bin", platform === "win32" ? "tailscale.exe" : "tailscale");
}

function getStateFilePath() {
  return path.join(getTailscaleDir(), "state.json");
}

function getPidFilePath() {
  return path.join(getTailscaleDir(), ".tailscaled.pid");
}

function getLogFilePath() {
  return path.join(getTailscaleDir(), "tailscaled.log");
}

export function getTailscaleSocketPath() {
  return path.join(getTailscaleDir(), "tailscaled.sock");
}

async function ensureTailscaleDir() {
  await fsPromises.mkdir(path.join(getTailscaleDir(), "bin"), { recursive: true });
}

async function readStateFile(): Promise<PersistedTailscaleState> {
  try {
    const raw = await fsPromises.readFile(getStateFilePath(), "utf8");
    return JSON.parse(raw) as PersistedTailscaleState;
  } catch {
    return {};
  }
}

async function writeStateFile(state: PersistedTailscaleState) {
  await ensureTailscaleDir();
  await fsPromises.writeFile(getStateFilePath(), JSON.stringify(state, null, 2) + "\n", "utf8");
}

async function updateStateFile(patch: Partial<PersistedTailscaleState>) {
  const current = await readStateFile();
  await writeStateFile({
    ...current,
    ...patch,
    updatedAt: new Date().toISOString(),
  });
}

async function readPidFile() {
  try {
    const raw = await fsPromises.readFile(getPidFilePath(), "utf8");
    const pid = Number.parseInt(raw.trim(), 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
  }
}

async function clearPidFile() {
  try {
    await fsPromises.unlink(getPidFilePath());
  } catch {
    // Ignore stale or missing pid files.
  }
}

function isProcessAlive(pid: number | null) {
  if (!pid || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function getTailscaleApiUrl(tunnelUrl: string | null) {
  return tunnelUrl ? `${tunnelUrl.replace(/\/$/, "")}/v1` : null;
}

async function resolvePathCommand(command: string) {
  const lookupCommand = process.platform === "win32" ? "where" : "which";
  try {
    const { stdout } = await execFileAsync(lookupCommand, [command], {
      timeout: 3000,
      windowsHide: true,
      env: {
        ...process.env,
        PATH: EXTENDED_PATH,
      },
    });
    const first = stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find(Boolean);
    return first || null;
  } catch {
    return null;
  }
}

async function resolveBinary(): Promise<BinaryResolution> {
  const envPath = toNonEmptyString(process.env.TAILSCALE_BIN);
  if (envPath && fs.existsSync(envPath)) {
    return { binaryPath: envPath, installSource: "env", managedInstall: false };
  }

  const managedPath = getManagedBinaryPath();
  if (fs.existsSync(managedPath)) {
    return { binaryPath: managedPath, installSource: "managed", managedInstall: true };
  }

  const pathBinary = await resolvePathCommand("tailscale");
  if (pathBinary) {
    return { binaryPath: pathBinary, installSource: "path", managedInstall: false };
  }

  if (IS_WINDOWS && fs.existsSync(WINDOWS_TAILSCALE_BIN)) {
    return {
      binaryPath: WINDOWS_TAILSCALE_BIN,
      installSource: "windows-default",
      managedInstall: false,
    };
  }

  return { binaryPath: null, installSource: null, managedInstall: false };
}

async function resolveDaemonBinary(tailscaleBinaryPath: string | null) {
  const envPath = toNonEmptyString(process.env.TAILSCALED_BIN);
  if (envPath && fs.existsSync(envPath)) return envPath;

  const sibling = tailscaleBinaryPath
    ? path.join(
        path.dirname(tailscaleBinaryPath),
        process.platform === "win32" ? "tailscaled.exe" : "tailscaled"
      )
    : null;
  if (sibling && fs.existsSync(sibling)) return sibling;

  const pathBinary = await resolvePathCommand("tailscaled");
  if (pathBinary) return pathBinary;

  if (IS_WINDOWS && fs.existsSync(WINDOWS_TAILSCALED_BIN)) return WINDOWS_TAILSCALED_BIN;

  return null;
}

function buildExecEnv() {
  return {
    ...process.env,
    PATH: EXTENDED_PATH,
  };
}

function buildTailscaleArgs(...args: string[]) {
  if (IS_WINDOWS) return args;
  return ["--socket", getTailscaleSocketPath(), ...args];
}

async function readJsonCommand(binaryPath: string, args: string[], timeout = 5000) {
  try {
    const { stdout } = await execFileAsync(binaryPath, args, {
      timeout,
      windowsHide: true,
      env: buildExecEnv(),
    });
    return JSON.parse(stdout) as JsonRecord;
  } catch {
    return null;
  }
}

async function getLiveStatusPayload(binaryPath: string | null) {
  if (!binaryPath) return null;
  return readJsonCommand(binaryPath, buildTailscaleArgs("status", "--json"));
}

async function getLiveFunnelPayload(binaryPath: string | null) {
  if (!binaryPath) return null;
  return readJsonCommand(binaryPath, buildTailscaleArgs("funnel", "status", "--json"));
}

function isBackendRunning(payload: unknown) {
  return toNonEmptyString(asRecord(payload).BackendState) === "Running";
}

function isFunnelRunning(payload: unknown) {
  const allowFunnel = asRecord(payload).AllowFunnel;
  return Boolean(
    allowFunnel && typeof allowFunnel === "object" && Object.keys(allowFunnel).length > 0
  );
}

export function getTailscaleUrlFromStatusPayload(payload: unknown) {
  const self = asRecord(asRecord(payload).Self);
  const dnsName = toNonEmptyString(self.DNSName);
  if (!dnsName) return null;
  const normalized = dnsName.replace(/\.$/, "");
  return normalized ? `https://${normalized}` : null;
}

export function extractTailscaleAuthUrl(text: string) {
  const match = text.match(/https:\/\/login\.tailscale\.com\/a\/[a-zA-Z0-9-]+/);
  return match ? match[0] : null;
}

export function extractTailscaleEnableUrl(text: string) {
  const match = text.match(/https:\/\/login\.tailscale\.com\/[^\s"']+/);
  return match ? match[0] : null;
}

export function extractTailscaleFunnelUrl(text: string) {
  const match = text.match(/https:\/\/[a-z0-9-]+\.[a-z0-9.-]+\.ts\.net\b[^\s"']*/i);
  if (!match) return null;
  return match[0].replace(/\/$/, "");
}

async function getDefaultHostname() {
  try {
    const machineId = await getConsistentMachineId();
    const normalized = `omniroute-${machineId.slice(0, 8)}`.replace(/[^a-zA-Z0-9-]/g, "-");
    return normalized.toLowerCase();
  } catch {
    const hostname = os
      .hostname()
      .replace(/[^a-zA-Z0-9-]/g, "-")
      .toLowerCase();
    return hostname || "omniroute";
  }
}

function getLastError(state: PersistedTailscaleState) {
  return typeof state.lastError === "string" && state.lastError.trim() ? state.lastError : null;
}

async function hasBrew() {
  if (!IS_MAC) return false;
  try {
    await execFileAsync("which", ["brew"], {
      timeout: 3000,
      windowsHide: true,
      env: buildExecEnv(),
    });
    return true;
  } catch {
    return false;
  }
}

async function getLiveTunnelUrl(binaryPath: string | null) {
  const payload = await getLiveStatusPayload(binaryPath);
  return getTailscaleUrlFromStatusPayload(payload);
}

export async function getTailscaleCheckStatus(): Promise<TailscaleCheckStatus> {
  const resolution = await resolveBinary();
  const [state, statusPayload, funnelPayload, brewAvailable] = await Promise.all([
    readStateFile(),
    getLiveStatusPayload(resolution.binaryPath),
    getLiveFunnelPayload(resolution.binaryPath),
    hasBrew(),
  ]);

  const liveTunnelUrl = getTailscaleUrlFromStatusPayload(statusPayload);
  const storedTunnelUrl = toNonEmptyString(state.tunnelUrl);
  const tunnelUrl = liveTunnelUrl || storedTunnelUrl;
  const loggedIn = isBackendRunning(statusPayload);
  const daemonRunning = Boolean(statusPayload) || isProcessAlive((await readPidFile()) || null);

  return {
    supported: isSupportedPlatform(),
    installed: Boolean(resolution.binaryPath),
    managedInstall: resolution.managedInstall,
    installSource: resolution.installSource,
    binaryPath: resolution.binaryPath,
    loggedIn,
    daemonRunning,
    running: isFunnelRunning(funnelPayload),
    tunnelUrl,
    apiUrl: getTailscaleApiUrl(tunnelUrl),
    platform: process.platform,
    brewAvailable,
    lastError: getLastError(state),
    pid: await readPidFile(),
  };
}

export async function getTailscaleTunnelStatus(): Promise<TailscaleTunnelStatus> {
  const [check, settings] = await Promise.all([getTailscaleCheckStatus(), getSettings()]);
  const storedSettingUrl =
    typeof settings.tailscaleUrl === "string" && settings.tailscaleUrl.trim()
      ? settings.tailscaleUrl
      : null;
  const tunnelUrl = check.tunnelUrl || storedSettingUrl;
  const running = check.loggedIn && check.running && Boolean(tunnelUrl);
  const enabled = settings.tailscaleEnabled === true && running;

  let phase: TailscaleTunnelPhase = "stopped";
  if (!check.supported) phase = "unsupported";
  else if (!check.installed) phase = "not_installed";
  else if (running) phase = "running";
  else if (check.daemonRunning && !check.loggedIn) phase = "needs_login";
  else if (check.lastError) phase = "error";

  return {
    ...check,
    running,
    enabled,
    tunnelUrl,
    apiUrl: getTailscaleApiUrl(tunnelUrl),
    phase,
  };
}

async function runSudoShell(command: string, password: string) {
  const normalizedPassword = password.trim();
  if (!normalizedPassword) {
    throw new Error("Sudo password required");
  }
  await execWithPassword(`sudo -S sh -c ${shellEscape(command)}`, normalizedPassword);
}

export async function startTailscaleDaemon({
  sudoPassword,
}: {
  sudoPassword?: string;
} = {}) {
  const resolution = await resolveBinary();
  if (!resolution.binaryPath) {
    throw new Error("Tailscale is not installed");
  }

  const existingStatus = await getLiveStatusPayload(resolution.binaryPath);
  if (existingStatus) {
    return { started: false };
  }

  if (IS_WINDOWS) {
    try {
      await execFileAsync("net", ["start", "Tailscale"], {
        timeout: 10000,
        windowsHide: true,
        env: buildExecEnv(),
      });
    } catch {
      // Ignore service start errors and verify below.
    }

    await sleep(2500);
    if (!(await getLiveStatusPayload(resolution.binaryPath))) {
      throw new Error("Failed to start Tailscale service");
    }

    return { started: true };
  }

  const daemonBinary = await resolveDaemonBinary(resolution.binaryPath);
  if (!daemonBinary) {
    throw new Error("tailscaled binary not found");
  }

  const password = toNonEmptyString(sudoPassword) || getCachedPassword() || "";
  if (!password) {
    throw new Error("Sudo password required to start tailscaled");
  }

  setCachedPassword(password);
  await ensureTailscaleDir();

  const command = [
    `mkdir -p ${shellEscape(getTailscaleDir())}`,
    `nohup ${shellEscape(daemonBinary)} --socket=${shellEscape(getTailscaleSocketPath())} --statedir=${shellEscape(getTailscaleDir())} >> ${shellEscape(getLogFilePath())} 2>&1 & echo $! > ${shellEscape(getPidFilePath())}`,
  ].join(" && ");

  await runSudoShell(command, password);
  await sleep(3000);

  if (!(await getLiveStatusPayload(resolution.binaryPath))) {
    throw new Error("tailscaled did not become ready");
  }

  const pid = await readPidFile();
  await updateStateFile({
    binaryPath: resolution.binaryPath,
    installSource: resolution.installSource,
    daemonPid: pid,
    lastError: null,
  });

  return { started: true };
}

export async function startTailscaleLogin({
  hostname,
}: {
  hostname?: string;
} = {}): Promise<TailscaleLoginResult> {
  const resolution = await resolveBinary();
  if (!resolution.binaryPath) {
    throw new Error("Tailscale is not installed");
  }

  const currentStatus = await getLiveStatusPayload(resolution.binaryPath);
  if (isBackendRunning(currentStatus)) {
    return { alreadyLoggedIn: true };
  }

  const resolvedHostname = toNonEmptyString(hostname) || (await getDefaultHostname());

  return new Promise((resolve, reject) => {
    const child = spawn(
      resolution.binaryPath as string,
      buildTailscaleArgs(
        "up",
        "--accept-routes",
        ...(resolvedHostname ? [`--hostname=${resolvedHostname}`] : [])
      ),
      {
        detached: true,
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
        env: buildExecEnv(),
      }
    );

    let settled = false;
    let output = "";

    const settle = (callback: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      callback();
    };

    const handleData = (chunk: Buffer | string) => {
      output += chunk.toString();
      const authUrl = extractTailscaleAuthUrl(output);
      if (authUrl) {
        settle(() => resolve({ authUrl }));
      }
    };

    const timeoutId = setTimeout(() => {
      const authUrl = extractTailscaleAuthUrl(output);
      if (authUrl) {
        settle(() => resolve({ authUrl }));
        return;
      }
      settle(() => reject(new Error("Tailscale login timed out")));
    }, LOGIN_TIMEOUT_MS);

    child.stdout.on("data", handleData);
    child.stderr.on("data", handleData);
    child.on("error", (error) => settle(() => reject(error)));
    child.on("close", async (code) => {
      if (settled) return;

      const authUrl = extractTailscaleAuthUrl(output);
      if (authUrl) {
        settle(() => resolve({ authUrl }));
        return;
      }

      const latestStatus = await getLiveStatusPayload(resolution.binaryPath);
      if (code === 0 || isBackendRunning(latestStatus)) {
        settle(() => resolve({ alreadyLoggedIn: true }));
        return;
      }

      settle(() => reject(new Error(`tailscale up exited with code ${code ?? "unknown"}`)));
    });

    child.unref();
  });
}

async function resetTailscaleFunnel(binaryPath: string) {
  try {
    await execFileAsync(binaryPath, buildTailscaleArgs("funnel", "--bg", "reset"), {
      timeout: 5000,
      windowsHide: true,
      env: buildExecEnv(),
    });
  } catch {
    // Ignore stale or missing funnel state.
  }
}

export async function startTailscaleFunnel(
  port = getRuntimePorts().apiPort
): Promise<TailscaleFunnelResult> {
  const resolution = await resolveBinary();
  if (!resolution.binaryPath) {
    throw new Error("Tailscale is not installed");
  }

  await resetTailscaleFunnel(resolution.binaryPath);

  return new Promise((resolve, reject) => {
    const child = spawn(
      resolution.binaryPath as string,
      buildTailscaleArgs("funnel", "--bg", String(port)),
      {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
        env: buildExecEnv(),
      }
    );

    let settled = false;
    let output = "";

    const settle = (callback: () => void) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      callback();
    };

    const finalizeFromOutput = async () => {
      const url =
        extractTailscaleFunnelUrl(output) || (await getLiveTunnelUrl(resolution.binaryPath));
      if (url) {
        settle(() => resolve({ tunnelUrl: url }));
        return;
      }

      const enableUrl = extractTailscaleEnableUrl(output);
      if (/funnel is not enabled/i.test(output) || enableUrl) {
        settle(() => resolve({ funnelNotEnabled: true, enableUrl }));
        return;
      }

      settle(() => reject(new Error(output.trim() || "Failed to start Tailscale Funnel")));
    };

    const handleData = (chunk: Buffer | string) => {
      output += chunk.toString();

      const tunnelUrl = extractTailscaleFunnelUrl(output);
      if (tunnelUrl) {
        settle(() => resolve({ tunnelUrl }));
        return;
      }

      const enableUrl = extractTailscaleEnableUrl(output);
      if (/funnel is not enabled/i.test(output) && enableUrl) {
        settle(() => resolve({ funnelNotEnabled: true, enableUrl }));
      }
    };

    const timeoutId = setTimeout(() => {
      void finalizeFromOutput();
    }, FUNNEL_TIMEOUT_MS);

    child.stdout.on("data", handleData);
    child.stderr.on("data", handleData);
    child.on("error", (error) => settle(() => reject(error)));
    child.on("close", () => {
      void finalizeFromOutput();
    });
  });
}

export async function stopTailscaleFunnel() {
  const resolution = await resolveBinary();
  if (!resolution.binaryPath) return;
  await resetTailscaleFunnel(resolution.binaryPath);
}

export async function stopTailscaleDaemon({
  sudoPassword,
}: {
  sudoPassword?: string;
} = {}) {
  const password = toNonEmptyString(sudoPassword) || getCachedPassword() || "";
  const pid = await readPidFile();

  if (pid && isProcessAlive(pid)) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // Ignore non-owned or stale processes.
    }
  }

  await sleep(1000);

  if (pid && isProcessAlive(pid) && password) {
    try {
      await runSudoShell(`kill ${Number(pid)}`, password);
    } catch {
      // Ignore fallback failures and keep trying generic process matches.
    }
  }

  if (!IS_WINDOWS) {
    try {
      await execFileAsync("pkill", ["-x", "tailscaled"], {
        timeout: 3000,
        windowsHide: true,
        env: buildExecEnv(),
      });
    } catch {
      // Ignore when the daemon is not running or not owned by this user.
    }

    if (password) {
      try {
        await runSudoShell("pkill -x tailscaled", password);
      } catch {
        // Ignore final privileged shutdown failures.
      }
    }
  } else {
    try {
      await execFileAsync("net", ["stop", "Tailscale"], {
        timeout: 10000,
        windowsHide: true,
        env: buildExecEnv(),
      });
    } catch {
      // Ignore service stop failures on Windows.
    }
  }

  await clearPidFile();
  try {
    await fsPromises.unlink(getTailscaleSocketPath());
  } catch {
    // Ignore missing sockets.
  }
}

export async function enableTailscaleTunnel({
  sudoPassword,
  hostname,
  port,
}: {
  sudoPassword?: string;
  hostname?: string;
  port?: number;
} = {}): Promise<TailscaleEnableResult> {
  const normalizedPassword = toNonEmptyString(sudoPassword) || getCachedPassword() || "";
  if (normalizedPassword) {
    setCachedPassword(normalizedPassword);
  }

  const targetPort = port || getRuntimePorts().apiPort;

  try {
    await startTailscaleDaemon({ sudoPassword: normalizedPassword });

    const resolution = await resolveBinary();
    const currentStatus = await getLiveStatusPayload(resolution.binaryPath);

    if (!isBackendRunning(currentStatus)) {
      const loginResult = await startTailscaleLogin({ hostname });
      if ("authUrl" in loginResult) {
        await updateStateFile({ lastError: null });
        return {
          success: false,
          needsLogin: true,
          authUrl: loginResult.authUrl,
          status: await getTailscaleTunnelStatus(),
        };
      }
    }

    const funnelResult = await startTailscaleFunnel(targetPort);
    if ("funnelNotEnabled" in funnelResult) {
      await updateStateFile({ lastError: null });
      return {
        success: false,
        funnelNotEnabled: true,
        enableUrl: funnelResult.enableUrl,
        status: await getTailscaleTunnelStatus(),
      };
    }

    const tunnelUrl =
      funnelResult.tunnelUrl || (await getLiveTunnelUrl((await resolveBinary()).binaryPath));
    if (!tunnelUrl) {
      throw new Error("Failed to determine the Tailscale Funnel URL");
    }

    await updateSettings({
      tailscaleEnabled: true,
      tailscaleUrl: tunnelUrl,
    });
    await updateStateFile({
      tunnelUrl,
      lastError: null,
    });

    return {
      success: true,
      tunnelUrl,
      apiUrl: getTailscaleApiUrl(tunnelUrl),
      status: await getTailscaleTunnelStatus(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to enable Tailscale Funnel";
    await updateStateFile({ lastError: message });
    throw error;
  }
}

export async function disableTailscaleTunnel({
  sudoPassword,
}: {
  sudoPassword?: string;
} = {}) {
  const normalizedPassword = toNonEmptyString(sudoPassword) || getCachedPassword() || "";
  if (normalizedPassword) {
    setCachedPassword(normalizedPassword);
  }

  try {
    await stopTailscaleFunnel();
    await stopTailscaleDaemon({ sudoPassword: normalizedPassword });
    await updateSettings({
      tailscaleEnabled: false,
      tailscaleUrl: "",
    });
    await updateStateFile({
      tunnelUrl: null,
      lastError: null,
    });
    return {
      success: true,
      status: await getTailscaleTunnelStatus(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to disable Tailscale Funnel";
    await updateStateFile({ lastError: message });
    throw error;
  }
}

function createStreamLogger(onProgress: ((message: string) => void) | undefined) {
  return (chunk: Buffer | string) => {
    const text = chunk.toString();
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    for (const line of lines) {
      onProgress?.(line);
    }
  };
}

async function installTailscaleMac(password: string, onProgress?: (message: string) => void) {
  if (await hasBrew()) {
    await new Promise<void>((resolve, reject) => {
      const child = spawn("brew", ["install", "tailscale"], {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
        env: buildExecEnv(),
      });
      const log = createStreamLogger(onProgress);
      child.stdout.on("data", log);
      child.stderr.on("data", log);
      child.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`brew install failed with code ${code}`));
      });
      child.on("error", reject);
    });
    return;
  }

  if (!password.trim()) {
    throw new Error("Sudo password required to install Tailscale");
  }

  const pkgUrl = "https://pkgs.tailscale.com/stable/tailscale-latest.pkg";
  const pkgPath = path.join(os.tmpdir(), "tailscale.pkg");

  await new Promise<void>((resolve, reject) => {
    const child = spawn("curl", ["-fL", "--progress-bar", pkgUrl, "-o", pkgPath], {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: buildExecEnv(),
    });
    child.stderr.on("data", createStreamLogger(onProgress));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error("Failed to download the Tailscale package"));
    });
    child.on("error", reject);
  });

  await new Promise<void>((resolve, reject) => {
    const child = spawn("sudo", ["-S", "installer", "-pkg", pkgPath, "-target", "/"], {
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
      env: buildExecEnv(),
    });
    const log = createStreamLogger(onProgress);
    let stderr = "";
    child.stdin.write(`${password}\n`);
    child.stdin.end();
    child.stdout.on("data", log);
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      log(chunk);
    });
    child.on("close", async (code) => {
      try {
        await fsPromises.unlink(pkgPath);
      } catch {
        // Ignore cleanup errors.
      }
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `installer exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

async function installTailscaleLinux(password: string, onProgress?: (message: string) => void) {
  if (!password.trim()) {
    throw new Error("Sudo password required to install Tailscale");
  }

  await new Promise<void>((resolve, reject) => {
    const curlChild = spawn("curl", ["-fsSL", "https://tailscale.com/install.sh"], {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: buildExecEnv(),
    });

    let scriptContent = "";
    let downloadError = "";

    curlChild.stdout.on("data", (chunk) => {
      scriptContent += chunk.toString();
    });
    curlChild.stderr.on("data", (chunk) => {
      downloadError += chunk.toString();
      createStreamLogger(onProgress)(chunk);
    });

    curlChild.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(downloadError.trim() || "Failed to download the Tailscale installer"));
        return;
      }

      const child = spawn("sudo", ["-S", "sh"], {
        windowsHide: true,
        stdio: ["pipe", "pipe", "pipe"],
        env: buildExecEnv(),
      });

      let stderr = "";
      const log = createStreamLogger(onProgress);
      child.stdin.write(`${password}\n`);
      child.stdin.write(scriptContent);
      child.stdin.end();
      child.stdout.on("data", log);
      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
        log(chunk);
      });
      child.on("close", (installCode) => {
        if (installCode === 0) resolve();
        else reject(new Error(stderr.trim() || `install.sh exited with code ${installCode}`));
      });
      child.on("error", reject);
    });

    curlChild.on("error", reject);
  });
}

async function installTailscaleWindows(onProgress?: (message: string) => void) {
  const msiUrl = "https://pkgs.tailscale.com/stable/tailscale-setup-latest-amd64.msi";
  const msiPath = path.join(os.tmpdir(), "tailscale-setup.msi");

  await new Promise<void>((resolve, reject) => {
    const child = spawn("curl.exe", ["-L", "-#", "-o", msiPath, msiUrl], {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: buildExecEnv(),
    });
    child.stderr.on("data", createStreamLogger(onProgress));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error("Failed to download the Tailscale installer"));
    });
    child.on("error", reject);
  });

  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      "powershell",
      [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Start-Process msiexec -ArgumentList '/i','${msiPath}','TS_NOLAUNCH=true','/quiet','/norestart' -Verb RunAs -Wait`,
      ],
      {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
        env: buildExecEnv(),
      }
    );
    const log = createStreamLogger(onProgress);
    child.stdout.on("data", log);
    child.stderr.on("data", log);
    child.on("close", async (code) => {
      try {
        await fsPromises.unlink(msiPath);
      } catch {
        // Ignore cleanup errors.
      }
      if (code === 0) resolve();
      else reject(new Error(`msiexec exited with code ${code}`));
    });
    child.on("error", reject);
  });
}

export async function installTailscale({
  sudoPassword,
  onProgress,
}: {
  sudoPassword?: string;
  onProgress?: (message: string) => void;
} = {}) {
  if (!isSupportedPlatform()) {
    throw new Error(`Unsupported platform for Tailscale install: ${process.platform}`);
  }

  const password = toNonEmptyString(sudoPassword) || getCachedPassword() || "";
  if (password) {
    setCachedPassword(password);
  }

  onProgress?.("Checking existing Tailscale installation...");
  const existingBinary = await resolveBinary();
  if (existingBinary.binaryPath) {
    onProgress?.("Tailscale is already installed.");
  } else if (IS_WINDOWS) {
    onProgress?.("Downloading and installing Tailscale for Windows...");
    await installTailscaleWindows(onProgress);
  } else if (IS_MAC) {
    onProgress?.("Installing Tailscale on macOS...");
    await installTailscaleMac(password, onProgress);
  } else if (IS_LINUX) {
    onProgress?.("Installing Tailscale on Linux...");
    await installTailscaleLinux(password, onProgress);
  }

  try {
    onProgress?.("Ensuring the Tailscale daemon is available...");
    await startTailscaleDaemon({ sudoPassword: password });
  } catch (error) {
    onProgress?.(
      `Install completed, but the daemon still needs manual attention: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }

  const status = await getTailscaleTunnelStatus();
  await updateStateFile({
    binaryPath: status.binaryPath,
    installSource: status.installSource,
    lastError: null,
    installedAt: new Date().toISOString(),
  });

  return status;
}
