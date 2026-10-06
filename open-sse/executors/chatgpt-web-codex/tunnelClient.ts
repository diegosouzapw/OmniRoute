import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  chmodSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";

import { unzipSync } from "fflate";

import { atomicWriteFile, getConfigDir } from "../../vendor/codex-chatgpt-web/config.ts";

export const CHATGPT_WEB_CODEX_TUNNEL_VERSION = "0.0.13";
const MIGRATABLE_TUNNEL_VERSIONS = new Set(["0.0.10", "0.0.12"]);
const RELEASE_BASE = `https://github.com/openai/tunnel-client/releases/download/v${CHATGPT_WEB_CODEX_TUNNEL_VERSION}`;
const MAX_DOWNLOAD_BYTES = 100 * 1024 * 1024;

type InstallManifest = {
  version: 1;
  tunnelClientVersion: string;
  asset: string;
  archiveSha256: string;
  binarySha256: string;
};

export type TunnelRuntimeConfig = {
  tunnelId: string;
  runtimeKey: string;
  brokerSocketPath: string;
  alias?: string;
  profile?: string;
};

export type TunnelRuntimeStatus = {
  ok: boolean;
  processRunning: boolean;
  healthy: boolean;
  ready: boolean;
  state?: string;
  detail: string;
};

type SupervisorLease = {
  version: 1;
  pid: number;
  startedAt: string;
};

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export function tunnelClientInstallAction(installedVersion: string): "reuse" | "upgrade" {
  if (installedVersion === CHATGPT_WEB_CODEX_TUNNEL_VERSION) return "reuse";
  if (MIGRATABLE_TUNNEL_VERSIONS.has(installedVersion)) return "upgrade";
  throw new Error(
    `Installed tunnel-client version ${installedVersion} is not a trusted upgrade source`
  );
}

export function tunnelPlatformAsset(platform = process.platform, arch = process.arch): string {
  const os =
    platform === "darwin"
      ? "darwin"
      : platform === "linux"
        ? "linux"
        : platform === "win32"
          ? "windows"
          : null;
  const cpu = arch === "arm64" ? "arm64" : arch === "x64" ? "amd64" : null;
  if (!os || !cpu) {
    throw new Error(`openai/tunnel-client has no pinned build for ${platform}/${arch}`);
  }
  return `tunnel-client-v${CHATGPT_WEB_CODEX_TUNNEL_VERSION}-${os}-${cpu}.zip`;
}

export function parseTunnelChecksum(text: string, asset: string): string {
  const entry = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.endsWith(asset));
  const checksum = entry?.split(/\s+/)[0]?.toLowerCase();
  if (!checksum || !/^[a-f0-9]{64}$/.test(checksum)) {
    throw new Error(`SHA256SUMS.txt has no valid entry for ${asset}`);
  }
  return checksum;
}

async function download(url: string): Promise<Uint8Array> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`Tunnel download failed (${response.status})`);
  const declared = Number(response.headers.get("content-length") || "0");
  if (Number.isFinite(declared) && declared > MAX_DOWNLOAD_BYTES) {
    throw new Error("Tunnel download exceeds the size limit");
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > MAX_DOWNLOAD_BYTES) {
    throw new Error("Tunnel download exceeds the size limit");
  }
  return bytes;
}

export function tunnelClientPaths() {
  const root = join(getConfigDir(), "tunnel-client");
  return {
    root,
    binary: join(root, process.platform === "win32" ? "tunnel-client.exe" : "tunnel-client"),
    manifest: join(root, "manifest.json"),
    profileDir: join(root, "profiles"),
    supervisorLease: join(root, "supervisor-lease.json"),
  };
}

function safeDetail(value: unknown): string {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return String(text || "")
    .replace(/tunnel_[a-f0-9]{32}/g, "[tunnel-id]")
    .replace(/(?:sk-|rt_|rk_)[A-Za-z0-9_-]{8,}/g, "[redacted-key]")
    .replace(/runtime-key-[A-Fa-f0-9]+/g, "runtime-key-[redacted]")
    .slice(0, 2_000);
}

function processIsAlive(pid: number): boolean {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

let ownsSupervisorLease = false;

export function acquireTunnelSupervisorLease(): void {
  if (ownsSupervisorLease) return;
  const paths = tunnelClientPaths();
  mkdirSync(paths.root, { recursive: true, mode: 0o700 });
  const path = paths.supervisorLease;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const fd = openSync(path, "wx", 0o600);
      try {
        const lease: SupervisorLease = {
          version: 1,
          pid: process.pid,
          startedAt: new Date().toISOString(),
        };
        writeFileSync(fd, `${JSON.stringify(lease)}\n`);
      } finally {
        closeSync(fd);
      }
      ownsSupervisorLease = true;
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      let ownerPid = 0;
      try {
        const lease = JSON.parse(readFileSync(path, "utf8")) as Partial<SupervisorLease>;
        ownerPid = Number(lease.pid) || 0;
      } catch {
        ownerPid = 0;
      }
      if (ownerPid === process.pid) {
        ownsSupervisorLease = true;
        return;
      }
      if (processIsAlive(ownerPid)) {
        throw new Error(`ChatGPT Web (Codex) supervisor is already owned by process ${ownerPid}`);
      }
      rmSync(path, { force: true });
    }
  }
  throw new Error("ChatGPT Web (Codex) supervisor lease could not be acquired");
}

export function tunnelSupervisorLeaseStatus(): {
  ownedByCurrentProcess: boolean;
  conflict: boolean;
  ownerPid?: number;
} {
  const path = tunnelClientPaths().supervisorLease;
  if (!existsSync(path)) return { ownedByCurrentProcess: false, conflict: false };
  try {
    const lease = JSON.parse(readFileSync(path, "utf8")) as Partial<SupervisorLease>;
    const ownerPid = Number(lease.pid) || undefined;
    return {
      ownedByCurrentProcess: ownerPid === process.pid,
      conflict: Boolean(ownerPid && ownerPid !== process.pid && processIsAlive(ownerPid)),
      ...(ownerPid ? { ownerPid } : {}),
    };
  } catch {
    return { ownedByCurrentProcess: false, conflict: false };
  }
}

export function releaseTunnelSupervisorLease(): void {
  if (!ownsSupervisorLease) return;
  const status = tunnelSupervisorLeaseStatus();
  if (status.ownedByCurrentProcess) rmSync(tunnelClientPaths().supervisorLease, { force: true });
  ownsSupervisorLease = false;
}

type TunnelClientPaths = ReturnType<typeof tunnelClientPaths>;
type PreviousInstallation = { binary: Uint8Array; manifestText: string };

function requireReportedTunnelVersion(
  binary: string,
  expectedVersion: string,
  errorMessage: string
): void {
  const version = spawnSync(binary, ["--version"], { encoding: "utf8" });
  if (version.status !== 0 || !`${version.stdout}\n${version.stderr}`.includes(expectedVersion)) {
    throw new Error(errorMessage);
  }
}

function inspectExistingTunnelInstallation(
  paths: TunnelClientPaths
): { action: "reuse" | "upgrade"; previousInstallation: PreviousInstallation } | undefined {
  if (!existsSync(paths.binary) || !existsSync(paths.manifest)) return undefined;

  const manifestText = readFileSync(paths.manifest, "utf8");
  const manifest = JSON.parse(manifestText) as Partial<InstallManifest>;
  const installedBinary = new Uint8Array(readFileSync(paths.binary));
  const actual = sha256(installedBinary);
  if (
    manifest.version !== 1 ||
    typeof manifest.tunnelClientVersion !== "string" ||
    manifest.binarySha256 !== actual
  ) {
    throw new Error("Existing tunnel-client failed integrity validation");
  }

  requireReportedTunnelVersion(
    paths.binary,
    manifest.tunnelClientVersion,
    `Existing tunnel-client did not report version ${manifest.tunnelClientVersion}`
  );
  return {
    action: tunnelClientInstallAction(manifest.tunnelClientVersion),
    previousInstallation: { binary: installedBinary, manifestText },
  };
}

function restoreTunnelInstallation(
  paths: TunnelClientPaths,
  previousInstallation: PreviousInstallation | undefined
): void {
  if (!previousInstallation) return;
  atomicWriteFile(paths.binary, previousInstallation.binary);
  if (process.platform !== "win32") chmodSync(paths.binary, 0o700);
  atomicWriteFile(paths.manifest, previousInstallation.manifestText);
}

export async function ensureTunnelClientInstalled(): Promise<string> {
  const paths = tunnelClientPaths();
  const existing = inspectExistingTunnelInstallation(paths);
  if (existing?.action === "reuse") return paths.binary;
  const previousInstallation = existing?.previousInstallation;

  const asset = tunnelPlatformAsset();
  const [archive, checksumFile] = await Promise.all([
    download(`${RELEASE_BASE}/${asset}`),
    download(`${RELEASE_BASE}/SHA256SUMS.txt`),
  ]);
  const expected = parseTunnelChecksum(new TextDecoder().decode(checksumFile), asset);
  const archiveSha256 = sha256(archive);
  if (archiveSha256 !== expected) throw new Error(`Checksum mismatch for ${asset}`);

  const files = unzipSync(archive);
  const executableName = process.platform === "win32" ? "tunnel-client.exe" : "tunnel-client";
  const entry = Object.entries(files).find(([name]) => basename(name) === executableName);
  if (!entry) throw new Error(`${asset} does not contain ${executableName}`);
  const stagedBinary = `${paths.binary}.install-${process.pid}-${randomUUID()}`;
  atomicWriteFile(stagedBinary, entry[1]);
  try {
    if (process.platform !== "win32") chmodSync(stagedBinary, 0o700);
    requireReportedTunnelVersion(
      stagedBinary,
      CHATGPT_WEB_CODEX_TUNNEL_VERSION,
      "Installed tunnel-client did not report the pinned version"
    );
  } finally {
    rmSync(stagedBinary, { force: true });
  }
  const manifest: InstallManifest = {
    version: 1,
    tunnelClientVersion: CHATGPT_WEB_CODEX_TUNNEL_VERSION,
    asset,
    archiveSha256,
    binarySha256: sha256(entry[1]),
  };
  try {
    atomicWriteFile(paths.binary, entry[1]);
    if (process.platform !== "win32") chmodSync(paths.binary, 0o700);
    atomicWriteFile(paths.manifest, `${JSON.stringify(manifest, null, 2)}\n`);
  } catch (error) {
    restoreTunnelInstallation(paths, previousInstallation);
    throw error;
  }
  return paths.binary;
}

function validateRuntimeConfig(config: TunnelRuntimeConfig) {
  if (!/^tunnel_[a-f0-9]{32}$/.test(config.tunnelId)) {
    throw new Error("Tunnel ID must be tunnel_ followed by 32 lowercase hexadecimal characters");
  }
  if (!config.runtimeKey.trim() || config.runtimeKey.length > 64 * 1024) {
    throw new Error("Tunnel Runtime-Key is missing or too large");
  }
  for (const value of [
    config.alias ?? "omniroute-chatgpt-web-codex",
    config.profile ?? "omniroute",
  ]) {
    if (!/^[A-Za-z0-9._-]+$/.test(value)) throw new Error("Tunnel alias/profile is invalid");
  }
}

export async function startTunnelRuntime(config: TunnelRuntimeConfig): Promise<ChildProcess> {
  validateRuntimeConfig(config);
  acquireTunnelSupervisorLease();
  const binary = await ensureTunnelClientInstalled();
  const paths = tunnelClientPaths();
  const runtimeKeyFile = join(
    paths.root,
    `runtime-key-${createHash("sha256").update(config.tunnelId).digest("hex").slice(0, 16)}`
  );
  atomicWriteFile(runtimeKeyFile, config.runtimeKey.trim());
  runtimeKeyFiles.add(runtimeKeyFile);
  const alias = config.alias ?? "omniroute-chatgpt-web-codex";
  const profile = config.profile ?? "omniroute";
  const mcpCommand = [
    process.execPath,
    join(process.cwd(), "bin", "chatgpt-web-codex-mcp.mjs"),
    "--broker-socket",
    config.brokerSocketPath,
  ]
    .map((value) => JSON.stringify(value))
    .join(" ");
  return spawn(
    binary,
    [
      "runtimes",
      "connect",
      "--alias",
      alias,
      "--profile",
      profile,
      "--profile-dir",
      paths.profileDir,
      "--tunnel-client-bin",
      binary,
      "--tunnel-id",
      config.tunnelId,
      "--runtime-api-key",
      `file:${runtimeKeyFile}`,
      "--mcp-command",
      mcpCommand,
      "--json",
    ],
    { stdio: ["ignore", "pipe", "pipe"], env: process.env }
  );
}

export function parseTunnelRuntimeStatus(output: string, exitStatus = 0): TunnelRuntimeStatus {
  if (exitStatus !== 0) {
    return {
      ok: false,
      processRunning: false,
      healthy: false,
      ready: false,
      detail: safeDetail(output),
    };
  }
  try {
    const parsed = JSON.parse(output) as Record<string, unknown>;
    const processRunning = parsed.process_running === true;
    const healthy = parsed.healthy === true;
    const ready = parsed.ready === true || parsed.runtime_state === "ready";
    const state =
      typeof parsed.runtime_state === "string"
        ? parsed.runtime_state
        : typeof parsed.status === "string"
          ? parsed.status
          : undefined;
    const ok = processRunning && healthy && ready;
    return {
      ok,
      processRunning,
      healthy,
      ready,
      ...(state ? { state } : {}),
      detail: ok
        ? "process_running=true healthy=true ready=true"
        : safeDetail(
            `process_running=${processRunning}; healthy=${healthy}; ready=${ready}` +
              (state ? `; state=${state}` : "")
          ),
    };
  } catch {
    return {
      ok: false,
      processRunning: false,
      healthy: false,
      ready: false,
      detail: `tunnel-client returned non-JSON status: ${safeDetail(output)}`,
    };
  }
}

export function buildTunnelRuntimeStatusArgs(alias: string): string[] {
  return ["runtimes", "status", alias, "--json"];
}

export function buildTunnelRuntimeStopArgs(alias: string): string[] {
  return ["runtimes", "stop", alias, "--json"];
}

export async function getTunnelRuntimeStatus(
  config: Pick<TunnelRuntimeConfig, "alias" | "profile">
): Promise<TunnelRuntimeStatus> {
  const binary = await ensureTunnelClientInstalled();
  const alias = config.alias ?? "omniroute-chatgpt-web-codex";
  const result = spawnSync(binary, buildTunnelRuntimeStatusArgs(alias), {
    encoding: "utf8",
    timeout: 5_000,
  });
  return parseTunnelRuntimeStatus(String(result.stdout || result.stderr || ""), result.status ?? 1);
}

const connectedRuntimes = new Map<string, Promise<void>>();
const runtimeKeyFiles = new Set<string>();

function runtimeIdentity(config: TunnelRuntimeConfig): string {
  return createHash("sha256")
    .update(
      JSON.stringify({
        tunnelId: config.tunnelId,
        alias: config.alias ?? "omniroute-chatgpt-web-codex",
        profile: config.profile ?? "omniroute",
        brokerSocketPath: config.brokerSocketPath,
      })
    )
    .digest("hex");
}

export function ensureTunnelRuntimeReady(
  config: TunnelRuntimeConfig,
  timeoutMs = 30_000
): Promise<void> {
  const identity = runtimeIdentity(config);
  const existing = connectedRuntimes.get(identity);
  if (existing) return existing;
  const connecting = (async () => {
    const child = await startTunnelRuntime(config);
    await new Promise<void>((resolve, reject) => {
      let stderr = "";
      const timer = setTimeout(() => {
        child.kill("SIGTERM");
        reject(new Error("Tunnel runtime startup timed out"));
      }, timeoutMs);
      child.stderr?.on("data", (chunk) => {
        stderr = `${stderr}${String(chunk)}`.slice(-4_096);
      });
      child.once("error", (error) => {
        clearTimeout(timer);
        reject(error);
      });
      child.once("exit", (code, signal) => {
        clearTimeout(timer);
        if (code === 0 && !signal) resolve();
        else
          reject(
            new Error(`Tunnel runtime startup failed (${code ?? signal}): ${safeDetail(stderr)}`)
          );
      });
    });
    const deadline = Date.now() + timeoutMs;
    let status = await getTunnelRuntimeStatus(config);
    while (!status.ok && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      status = await getTunnelRuntimeStatus(config);
    }
    if (!status.ok) throw new Error(`Tunnel runtime is not ready: ${status.detail}`);
  })();
  connectedRuntimes.set(identity, connecting);
  void connecting.catch(() => connectedRuntimes.delete(identity));
  return connecting;
}

export async function stopChatGptWebCodexTunnelRuntime(): Promise<void> {
  const paths = tunnelClientPaths();
  if (ownsSupervisorLease && existsSync(paths.binary)) {
    spawnSync(paths.binary, buildTunnelRuntimeStopArgs("omniroute-chatgpt-web-codex"), {
      encoding: "utf8",
      timeout: 10_000,
    });
  }
  connectedRuntimes.clear();
  for (const runtimeKeyFile of runtimeKeyFiles) rmSync(runtimeKeyFile, { force: true });
  runtimeKeyFiles.clear();
  releaseTunnelSupervisorLease();
}
