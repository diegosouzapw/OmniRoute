import { spawn, execFile } from "child_process";
import { createHash } from "crypto";
import { promisify } from "util";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import proxyFetch from "@omniroute/open-sse/utils/proxyFetch.ts";
import { resolveDataDir } from "@/lib/dataPaths";
import { getRuntimePorts } from "@/lib/runtime/ports";

const execFileAsync = promisify(execFile);

const CLOUDFLARED_RELEASE_API_URL =
  "https://api.github.com/repos/cloudflare/cloudflared/releases/latest";
const START_TIMEOUT_MS = 30000;
const STOP_TIMEOUT_MS = 5000;
const GENERIC_EXIT_ERROR_PREFIX = "cloudflared exited";
const DEFAULT_CERT_FILE_CANDIDATES = [
  "/etc/ssl/certs/ca-certificates.crt",
  "/etc/pki/tls/certs/ca-bundle.crt",
  "/etc/ssl/cert.pem",
  "/private/etc/ssl/cert.pem",
] as const;
const DEFAULT_CERT_DIR_CANDIDATES = [
  "/etc/ssl/certs",
  "/etc/pki/tls/certs",
  "/system/etc/security/cacerts",
] as const;

type CloudflaredInstallSource = "managed" | "path" | "env";
type TunnelPhase = "unsupported" | "not_installed" | "stopped" | "starting" | "running" | "error";

type AssetSpec = {
  assetName: string;
  binaryName: string;
  archive: "none" | "tgz";
};

type ResolvedAssetSpec = AssetSpec & {
  downloadUrl: string;
  expectedSha256: string;
};

type CloudflaredRuntimeDirs = {
  runtimeRoot: string;
  homeDir: string;
  configDir: string;
  cacheDir: string;
  dataDir: string;
  tempDir: string;
  userProfileDir: string;
  appDataDir: string;
  localAppDataDir: string;
};

type BinaryResolution = {
  binaryPath: string | null;
  source: CloudflaredInstallSource | null;
  managed: boolean;
};

type PersistedTunnelState = {
  binaryPath?: string | null;
  installSource?: CloudflaredInstallSource | null;
  ownerPid?: number | null;
  pid?: number | null;
  publicUrl?: string | null;
  apiUrl?: string | null;
  targetUrl?: string | null;
  status?: TunnelPhase;
  lastError?: string | null;
  startedAt?: string | null;
  installedAt?: string | null;
};

export type CloudflaredTunnelStatus = {
  supported: boolean;
  installed: boolean;
  managedInstall: boolean;
  installSource: CloudflaredInstallSource | null;
  binaryPath: string | null;
  running: boolean;
  pid: number | null;
  publicUrl: string | null;
  apiUrl: string | null;
  targetUrl: string;
  phase: TunnelPhase;
  lastError: string | null;
  logPath: string;
};

const CLOUDFLARED_SAFE_ENV_KEYS = [
  "PATH",
  "HOME",
  "USERPROFILE",
  "APPDATA",
  "LOCALAPPDATA",
  "PROGRAMDATA",
  "ProgramData",
  "SYSTEMROOT",
  "SystemRoot",
  "WINDIR",
  "ComSpec",
  "COMSPEC",
  "PATHEXT",
  "TMPDIR",
  "TMP",
  "TEMP",
  "USER",
  "USERNAME",
  "LOGNAME",
  "SHELL",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
  "NODE_EXTRA_CA_CERTS",
  "XDG_CONFIG_HOME",
  "XDG_CACHE_HOME",
  "XDG_DATA_HOME",
  "XDG_RUNTIME_DIR",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
] as const;

let tunnelProcess: ReturnType<typeof spawn> | null = null;
let tunnelPid: number | null = null;
let installPromise: Promise<string> | null = null;
let startPromise: Promise<CloudflaredTunnelStatus> | null = null;
let stateFileQueue: Promise<void> = Promise.resolve();
const NON_ACTIONABLE_CLOUDFLARED_WARNING_PATTERNS = [
  /failed to sufficiently increase receive buffer size/i,
] as const;

function getTunnelDir() {
  return path.join(resolveDataDir(), "cloudflared");
}

function getManagedBinaryPath(platform = process.platform) {
  return path.join(getTunnelDir(), "bin", platform === "win32" ? "cloudflared.exe" : "cloudflared");
}

function getStateFilePath() {
  return path.join(getTunnelDir(), "quick-tunnel-state.json");
}

function getPidFilePath() {
  return path.join(getTunnelDir(), ".quick-tunnel.pid");
}

function getLogFilePath() {
  return path.join(getTunnelDir(), "quick-tunnel.log");
}

export function getCloudflaredRuntimeDirs(): CloudflaredRuntimeDirs {
  const runtimeRoot = path.join(getTunnelDir(), "runtime");
  const homeDir = path.join(runtimeRoot, "home");
  const userProfileDir = path.join(runtimeRoot, "userprofile");

  return {
    runtimeRoot,
    homeDir,
    configDir: path.join(runtimeRoot, "config"),
    cacheDir: path.join(runtimeRoot, "cache"),
    dataDir: path.join(runtimeRoot, "data"),
    tempDir: path.join(runtimeRoot, "tmp"),
    userProfileDir,
    appDataDir: path.join(userProfileDir, "AppData", "Roaming"),
    localAppDataDir: path.join(userProfileDir, "AppData", "Local"),
  };
}

function getLocalTargetUrl() {
  const { apiPort } = getRuntimePorts();
  return `http://127.0.0.1:${apiPort}`;
}

function getTunnelApiUrl(publicUrl: string | null) {
  return publicUrl ? `${publicUrl.replace(/\/$/, "")}/v1` : null;
}

async function ensureTunnelDir() {
  await fs.mkdir(path.join(getTunnelDir(), "bin"), { recursive: true });
}

async function ensureTunnelRuntimeDirs() {
  const runtimeDirs = getCloudflaredRuntimeDirs();
  await Promise.all(
    Object.values(runtimeDirs).map((dirPath) => fs.mkdir(dirPath, { recursive: true }))
  );
}

async function readStateFile(): Promise<PersistedTunnelState> {
  try {
    const content = await fs.readFile(getStateFilePath(), "utf8");
    return JSON.parse(content) as PersistedTunnelState;
  } catch {
    return {};
  }
}

async function writeStateFileNow(state: PersistedTunnelState) {
  await ensureTunnelDir();
  await fs.writeFile(getStateFilePath(), JSON.stringify(state, null, 2) + "\n", "utf8");
}

async function withStateFileLock<T>(operation: () => Promise<T>): Promise<T> {
  const previous = stateFileQueue;
  let release!: () => void;
  stateFileQueue = new Promise<void>((resolve) => {
    release = resolve;
  });

  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}

async function writeStateFile(state: PersistedTunnelState) {
  await withStateFileLock(() => writeStateFileNow(state));
}

async function updateStateFile(patch: PersistedTunnelState) {
  await withStateFileLock(async () => {
    const current = await readStateFile();
    await writeStateFileNow({ ...current, ...patch });
  });
}

async function clearPidFile() {
  try {
    await fs.unlink(getPidFilePath());
  } catch {
    // Ignore missing/stale pid files.
  }
}

async function writePidFile(pid: number) {
  await ensureTunnelDir();
  await fs.writeFile(getPidFilePath(), String(pid), "utf8");
}

async function readPidFile() {
  try {
    const content = await fs.readFile(getPidFilePath(), "utf8");
    const pid = Number.parseInt(content.trim(), 10);
    return Number.isFinite(pid) ? pid : null;
  } catch {
    return null;
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

async function appendTunnelLog(source: "stdout" | "stderr", message: string) {
  await ensureTunnelDir();
  const timestamp = new Date().toISOString();
  await fs.appendFile(getLogFilePath(), `[${timestamp}] [${source}] ${message}\n`, "utf8");
}

export function extractTryCloudflareUrl(text: string) {
  const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com\b/i);
  if (!match) return null;

  try {
    const hostname = new URL(match[0]).hostname.toLowerCase();
    if (hostname === "api.trycloudflare.com") return null;
  } catch {
    return null;
  }

  return match[0];
}

function normalizeCloudflaredLogLine(line: string) {
  return line
    .trim()
    .replace(/^\d{4}-\d{2}-\d{2}T\S+\s+(?:INF|WRN|ERR)\s+/i, "")
    .trim();
}

export function extractCloudflaredErrorMessage(text: string) {
  const lines = String(text || "")
    .split(/\r?\n/)
    .map(normalizeCloudflaredLogLine)
    .filter(Boolean);

  for (let i = lines.length - 1; i >= 0; i--) {
    if (NON_ACTIONABLE_CLOUDFLARED_WARNING_PATTERNS.some((pattern) => pattern.test(lines[i]))) {
      continue;
    }
    if (/(?:\berror\b|\bfailed\b|\btls:\b|\bx509\b|\bcertificate\b)/i.test(lines[i])) {
      return lines[i];
    }
  }

  return null;
}

function isSpecificCloudflaredError(error: string | null | undefined) {
  return !!error && !error.startsWith(GENERIC_EXIT_ERROR_PREFIX);
}

function getGenericExitError(code: number | null, signal: NodeJS.Signals | null) {
  return `cloudflared exited unexpectedly (${code ?? "signal"}${signal ? `/${signal}` : ""})`;
}

export function getDefaultCloudflaredCertEnv(
  existsSync: (candidate: string) => boolean = fsSync.existsSync,
  certFileCandidates: readonly string[] = DEFAULT_CERT_FILE_CANDIDATES,
  certDirCandidates: readonly string[] = DEFAULT_CERT_DIR_CANDIDATES
) {
  const certEnv: NodeJS.ProcessEnv = {};
  const certFile = certFileCandidates.find((candidate) => existsSync(candidate));
  const certDir = certDirCandidates.find((candidate) => existsSync(candidate));

  if (certFile) certEnv.SSL_CERT_FILE = certFile;
  if (certDir) certEnv.SSL_CERT_DIR = certDir;

  return certEnv;
}

export function buildCloudflaredChildEnv(
  sourceEnv: NodeJS.ProcessEnv = process.env,
  runtimeDirs: CloudflaredRuntimeDirs = getCloudflaredRuntimeDirs(),
  defaultCertEnv: NodeJS.ProcessEnv = getDefaultCloudflaredCertEnv()
): NodeJS.ProcessEnv {
  const childEnv: NodeJS.ProcessEnv = {};

  for (const key of CLOUDFLARED_SAFE_ENV_KEYS) {
    const value = sourceEnv[key];
    if (typeof value === "string" && value.length > 0) {
      childEnv[key] = value;
    }
  }

  childEnv.HOME = runtimeDirs.homeDir;
  childEnv.XDG_CONFIG_HOME = runtimeDirs.configDir;
  childEnv.XDG_CACHE_HOME = runtimeDirs.cacheDir;
  childEnv.XDG_DATA_HOME = runtimeDirs.dataDir;
  childEnv.USERPROFILE = runtimeDirs.userProfileDir;
  childEnv.APPDATA = runtimeDirs.appDataDir;
  childEnv.LOCALAPPDATA = runtimeDirs.localAppDataDir;

  if (!childEnv.TMPDIR) childEnv.TMPDIR = runtimeDirs.tempDir;
  if (!childEnv.TMP) childEnv.TMP = runtimeDirs.tempDir;
  if (!childEnv.TEMP) childEnv.TEMP = runtimeDirs.tempDir;
  if (!childEnv.SSL_CERT_FILE && defaultCertEnv.SSL_CERT_FILE) {
    childEnv.SSL_CERT_FILE = defaultCertEnv.SSL_CERT_FILE;
  }
  if (!childEnv.SSL_CERT_DIR && defaultCertEnv.SSL_CERT_DIR) {
    childEnv.SSL_CERT_DIR = defaultCertEnv.SSL_CERT_DIR;
  }

  const requestedProtocol = String(
    sourceEnv.CLOUDFLARED_PROTOCOL || sourceEnv.TUNNEL_TRANSPORT_PROTOCOL || "http2"
  )
    .trim()
    .toLowerCase();
  const protocol =
    requestedProtocol === "quic" || requestedProtocol === "auto" ? requestedProtocol : "http2";

  if (protocol !== "auto") {
    childEnv.TUNNEL_TRANSPORT_PROTOCOL = protocol;
  }

  return childEnv;
}

export function getCloudflaredStartArgs(targetUrl: string) {
  return ["tunnel", "--url", targetUrl, "--no-autoupdate"];
}

function isStateOwnedByCurrentProcess(state: PersistedTunnelState) {
  return !!state.ownerPid && state.ownerPid === process.pid;
}

function hasTransientRuntimeState(state: PersistedTunnelState) {
  return !!(
    state.ownerPid ||
    state.pid ||
    state.publicUrl ||
    state.apiUrl ||
    state.startedAt ||
    state.status === "running" ||
    state.status === "starting" ||
    state.status === "error"
  );
}

function buildStoppedState(
  state: PersistedTunnelState,
  binaryResolved: boolean,
  targetUrl = getLocalTargetUrl()
): PersistedTunnelState {
  return {
    ...state,
    ownerPid: null,
    pid: null,
    publicUrl: null,
    apiUrl: null,
    targetUrl,
    status: binaryResolved ? "stopped" : "not_installed",
    lastError: null,
    startedAt: null,
  };
}

export function getCloudflaredAssetSpec(
  platform = process.platform,
  arch = process.arch
): AssetSpec | null {
  const matrix: Record<string, Record<string, AssetSpec>> = {
    linux: {
      x64: {
        assetName: "cloudflared-linux-amd64",
        binaryName: "cloudflared",
        archive: "none",
      },
      arm64: {
        assetName: "cloudflared-linux-arm64",
        binaryName: "cloudflared",
        archive: "none",
      },
    },
    darwin: {
      x64: {
        assetName: "cloudflared-darwin-amd64.tgz",
        binaryName: "cloudflared",
        archive: "tgz",
      },
      arm64: {
        assetName: "cloudflared-darwin-arm64.tgz",
        binaryName: "cloudflared",
        archive: "tgz",
      },
    },
    win32: {
      x64: {
        assetName: "cloudflared-windows-amd64.exe",
        binaryName: "cloudflared.exe",
        archive: "none",
      },
      arm64: {
        assetName: "cloudflared-windows-arm64.exe",
        binaryName: "cloudflared.exe",
        archive: "none",
      },
    },
  };

  const spec = matrix[platform]?.[arch];
  if (!spec) return null;

  return spec;
}

export function getSha256FromGitHubDigest(digest: string): string | null {
  const prefix = "sha256:";
  if (!digest.toLowerCase().startsWith(prefix)) return null;

  const value = digest.slice(prefix.length);
  if (value.length !== 64) return null;
  for (const char of value) {
    const code = char.charCodeAt(0);
    const digit = code >= 48 && code <= 57;
    const lowerHex = code >= 97 && code <= 102;
    const upperHex = code >= 65 && code <= 70;
    if (!digit && !lowerHex && !upperHex) return null;
  }

  return value.toLowerCase();
}

export function verifyCloudflaredDownloadDigest(
  buffer: Buffer,
  expectedSha256: string,
  assetName = "cloudflared"
): void {
  const actualSha256 = createHash("sha256").update(buffer).digest("hex");
  if (actualSha256 !== expectedSha256.toLowerCase()) {
    throw new Error(
      `cloudflared download checksum mismatch for ${assetName}: expected ${expectedSha256}, got ${actualSha256}`
    );
  }
}

async function resolveCloudflaredDownloadSpec(spec: AssetSpec): Promise<ResolvedAssetSpec> {
  const response = await proxyFetch(CLOUDFLARED_RELEASE_API_URL, {
    headers: { Accept: "application/vnd.github+json" },
    redirect: "follow",
  });
  if (!response.ok) {
    throw new Error(
      `Failed to resolve cloudflared release metadata with status ${response.status}`
    );
  }

  const release = (await response.json()) as { assets?: unknown };
  const assets = Array.isArray(release.assets) ? release.assets : [];
  const asset = assets
    .map((entry) =>
      entry && typeof entry === "object" ? (entry as Record<string, unknown>) : null
    )
    .find((entry) => entry?.name === spec.assetName);

  if (!asset) {
    throw new Error(`cloudflared release asset not found: ${spec.assetName}`);
  }

  const downloadUrl =
    typeof asset.browser_download_url === "string" ? asset.browser_download_url : "";
  const digest = typeof asset.digest === "string" ? asset.digest : "";
  const expectedSha256 = getSha256FromGitHubDigest(digest);

  if (!downloadUrl || !expectedSha256) {
    throw new Error(`cloudflared release asset ${spec.assetName} is missing a sha256 digest`);
  }

  return {
    ...spec,
    downloadUrl,
    expectedSha256,
  };
}

async function resolvePathCommand(command: string) {
  const lookupCommand = process.platform === "win32" ? "where" : "which";
  const args = [command];

  try {
    const { stdout } = await execFileAsync(lookupCommand, args, { timeout: 3000 });
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
  const envPath = String(process.env.CLOUDFLARED_BIN || "").trim();
  if (envPath && fsSync.existsSync(envPath)) {
    return { binaryPath: envPath, source: "env", managed: false };
  }

  const managedPath = getManagedBinaryPath();
  if (fsSync.existsSync(managedPath)) {
    return { binaryPath: managedPath, source: "managed", managed: true };
  }

  const pathBinary = await resolvePathCommand("cloudflared");
  if (pathBinary) {
    return { binaryPath: pathBinary, source: "path", managed: false };
  }

  return { binaryPath: null, source: null, managed: false };
}

async function extractArchive(archivePath: string, destinationDir: string) {
  await execFileAsync("tar", ["-xzf", archivePath, "-C", destinationDir], { timeout: 15000 });
}

async function downloadToFile(
  url: string,
  destinationPath: string,
  expectedSha256: string,
  assetName: string
) {
  const response = await proxyFetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  verifyCloudflaredDownloadDigest(buffer, expectedSha256, assetName);
  await fs.writeFile(destinationPath, buffer);
}

async function ensureExecutable(binaryPath: string) {
  if (process.platform !== "win32") {
    await fs.chmod(binaryPath, 0o755);
  }
}

async function installManagedBinary() {
  if (installPromise) return installPromise;

  installPromise = (async () => {
    const spec = getCloudflaredAssetSpec();
    if (!spec) {
      throw new Error(
        `Unsupported platform for managed cloudflared install: ${process.platform}/${process.arch}`
      );
    }

    await ensureTunnelDir();
    const managedBinaryPath = getManagedBinaryPath();
    const tempDownloadPath = path.join(getTunnelDir(), `${spec.assetName}.download`);

    await updateStateFile({
      status: "starting",
      lastError: null,
    });

    try {
      const downloadSpec = await resolveCloudflaredDownloadSpec(spec);
      await downloadToFile(
        downloadSpec.downloadUrl,
        tempDownloadPath,
        downloadSpec.expectedSha256,
        downloadSpec.assetName
      );

      if (spec.archive === "tgz") {
        await extractArchive(tempDownloadPath, path.dirname(managedBinaryPath));
      } else {
        await fs.rename(tempDownloadPath, managedBinaryPath);
      }

      await ensureExecutable(managedBinaryPath);
      await updateStateFile({
        binaryPath: managedBinaryPath,
        installSource: "managed",
        installedAt: new Date().toISOString(),
        lastError: null,
      });

      return managedBinaryPath;
    } finally {
      try {
        await fs.unlink(tempDownloadPath);
      } catch {
        // Ignore temp cleanup issues.
      }
      installPromise = null;
    }
  })();

  return installPromise;
}

async function ensureBinary() {
  const resolved = await resolveBinary();
  if (resolved.binaryPath) {
    return resolved;
  }

  const binaryPath = await installManagedBinary();
  return {
    binaryPath,
    source: "managed" as const,
    managed: true,
  };
}

async function finalizeProcessExit(code: number | null, signal: NodeJS.Signals | null) {
  const currentState = await readStateFile();
  const lastError =
    code === 0 || signal === "SIGTERM" || signal === "SIGINT"
      ? null
      : isSpecificCloudflaredError(currentState.lastError)
        ? currentState.lastError
        : getGenericExitError(code, signal);

  tunnelProcess = null;
  tunnelPid = null;
  await clearPidFile();
  await writeStateFile({
    ...currentState,
    pid: null,
    publicUrl: null,
    apiUrl: null,
    status: lastError ? "error" : "stopped",
    lastError,
  });
}

async function killPid(pid: number) {
  process.kill(pid, "SIGTERM");
  const start = Date.now();
  while (Date.now() - start < STOP_TIMEOUT_MS) {
    if (!isProcessAlive(pid)) return;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  if (isProcessAlive(pid)) {
    process.kill(pid, "SIGKILL");
  }
}

async function stopExistingTunnel() {
  if (tunnelProcess && tunnelPid && !tunnelProcess.killed) {
    const pid = tunnelPid;
    tunnelProcess.kill("SIGTERM");
    await killPid(pid);
    return;
  }

  const state = await readStateFile();
  if (!isStateOwnedByCurrentProcess(state)) {
    await clearPidFile();
    return;
  }

  const pid = await readPidFile();
  if (pid && isProcessAlive(pid)) {
    await killPid(pid);
  }
}

export async function getCloudflaredTunnelStatus(): Promise<CloudflaredTunnelStatus> {
  const state = await readStateFile();
  const resolved = await resolveBinary();
  const pidFromState =
    tunnelPid || (isStateOwnedByCurrentProcess(state) ? state.pid || (await readPidFile()) : null);
  const running = isProcessAlive(pidFromState);
  const needsColdStartReset =
    !running && !isStateOwnedByCurrentProcess(state) && hasTransientRuntimeState(state);
  const effectiveState = needsColdStartReset
    ? buildStoppedState(state, !!resolved.binaryPath)
    : state;

  if (needsColdStartReset) {
    await writeStateFile(effectiveState);
  }

  const publicUrl = running ? effectiveState.publicUrl || null : null;
  const phase =
    !getCloudflaredAssetSpec() && !resolved.binaryPath
      ? "unsupported"
      : running
        ? publicUrl
          ? "running"
          : "starting"
        : resolved.binaryPath
          ? effectiveState.lastError
            ? "error"
            : "stopped"
          : "not_installed";

  if (!running && state.pid) {
    await clearPidFile();
  }

  return {
    supported: !!(getCloudflaredAssetSpec() || resolved.binaryPath),
    installed: !!resolved.binaryPath,
    managedInstall: resolved.managed,
    installSource: resolved.source,
    binaryPath: resolved.binaryPath,
    running,
    pid: running ? pidFromState : null,
    publicUrl,
    apiUrl: publicUrl ? getTunnelApiUrl(publicUrl) : null,
    targetUrl: effectiveState.targetUrl || getLocalTargetUrl(),
    phase,
    lastError: running ? null : effectiveState.lastError || null,
    logPath: getLogFilePath(),
  };
}

export async function startCloudflaredTunnel(): Promise<CloudflaredTunnelStatus> {
  const current = await getCloudflaredTunnelStatus();
  if (current.running) return current;
  if (startPromise) return startPromise;

  startPromise = (async () => {
    const spec = getCloudflaredAssetSpec();
    if (!spec && !(await resolveBinary()).binaryPath) {
      throw new Error(
        `Unsupported platform for cloudflared tunnel: ${process.platform}/${process.arch}`
      );
    }

    const binary = await ensureBinary();
    const targetUrl = getLocalTargetUrl();

    await stopExistingTunnel();
    await ensureTunnelDir();
    await ensureTunnelRuntimeDirs();
    await fs.writeFile(getLogFilePath(), "", "utf8");

    await writeStateFile({
      binaryPath: binary.binaryPath,
      installSource: binary.source,
      ownerPid: process.pid,
      pid: null,
      publicUrl: null,
      apiUrl: null,
      targetUrl,
      status: "starting",
      lastError: null,
      startedAt: new Date().toISOString(),
    });

    const child = spawn(binary.binaryPath as string, getCloudflaredStartArgs(targetUrl), {
      stdio: ["ignore", "pipe", "pipe"],
      env: buildCloudflaredChildEnv(),
    });

    tunnelProcess = child;
    tunnelPid = child.pid ?? null;

    if (!child.pid) {
      throw new Error("cloudflared failed to start");
    }

    await writePidFile(child.pid);
    await updateStateFile({ pid: child.pid, status: "starting" });

    const ready = await new Promise<CloudflaredTunnelStatus>((resolve, reject) => {
      let settled = false;
      let timeout: ReturnType<typeof setTimeout> | null = null;

      const settle = (handler: () => void) => {
        if (settled) return;
        settled = true;
        if (timeout) clearTimeout(timeout);
        handler();
      };

      const handleOutput = async (source: "stdout" | "stderr", chunk: Buffer) => {
        const text = chunk.toString("utf8").trim();
        if (!text) return;

        await appendTunnelLog(source, text);
        const errorMessage = source === "stderr" ? extractCloudflaredErrorMessage(text) : null;
        if (errorMessage) {
          await updateStateFile({
            ownerPid: process.pid,
            pid: child.pid,
            status: "error",
            lastError: errorMessage,
          });
        }
        const url = extractTryCloudflareUrl(text);
        if (!url) return;

        const apiUrl = getTunnelApiUrl(url);
        await updateStateFile({
          ownerPid: process.pid,
          pid: child.pid,
          publicUrl: url,
          apiUrl,
          status: "running",
          lastError: null,
        });

        const status = await getCloudflaredTunnelStatus();
        settle(() => resolve(status));
      };

      child.stdout.on("data", (chunk: Buffer) => {
        void handleOutput("stdout", chunk);
      });
      child.stderr.on("data", (chunk: Buffer) => {
        void handleOutput("stderr", chunk);
      });

      child.once("exit", (code, signal) => {
        void finalizeProcessExit(code, signal);
        settle(() =>
          reject(
            new Error(
              `cloudflared exited before tunnel URL was ready (${code ?? "signal"}${signal ? `/${signal}` : ""})`
            )
          )
        );
      });

      timeout = setTimeout(async () => {
        await stopExistingTunnel();
        settle(() => reject(new Error("Timed out while waiting for Cloudflare tunnel URL")));
      }, START_TIMEOUT_MS);
    });

    return ready;
  })();

  try {
    return await startPromise;
  } catch (error) {
    const currentState = await readStateFile();
    const message = isSpecificCloudflaredError(currentState.lastError)
      ? currentState.lastError
      : error instanceof Error
        ? error.message
        : "Failed to start cloudflared tunnel";

    await updateStateFile({
      ownerPid: process.pid,
      status: "error",
      lastError: message,
    });
    throw new Error(message);
  } finally {
    startPromise = null;
  }
}

export async function stopCloudflaredTunnel() {
  await stopExistingTunnel();
  const current = await readStateFile();
  await writeStateFile({
    ...buildStoppedState(current, !!(await resolveBinary()).binaryPath),
    ownerPid: null,
  });
  tunnelProcess = null;
  tunnelPid = null;
  await clearPidFile();
  return getCloudflaredTunnelStatus();
}
