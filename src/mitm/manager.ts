import { spawn, type ChildProcess } from "child_process";
import path from "path";
import fs from "fs";
import { resolveMitmDataDir } from "./dataDir.ts";
import { addDNSEntry, addDNSEntries, removeDNSEntry, removeDNSEntries } from "./dns/dnsConfig.ts";
import { generateCert } from "./cert/generate.ts";
import { installCert } from "./cert/install.ts";
import { ALL_TARGETS } from "./targets/index.ts";
import { detectAgent } from "./detection/index.ts";
import type { AgentId, DetectionResult, MitmTarget } from "./types.ts";
import { getAllAgentBridgeStates } from "@/lib/db/agentBridgeState.ts";
import { listCustomHosts } from "@/lib/db/inspectorCustomHosts.ts";
import { getUserBypassPatterns } from "@/lib/db/agentBridgeBypass.ts";
import { configureUpstreamCa } from "./upstreamTrust.ts";
import { createLogger } from "@/shared/utils/logger.ts";

const log = createLogger("mitm-manager");

/**
 * Map the MITM child process (`server.cjs`) stderr to the actual startup-failure
 * cause. `server.cjs` emits one of several "❌"-prefixed lines on `server.on("error")`
 * or on a missing API key, then exits. The old code only matched EADDRINUSE and so
 * always blamed "port 443", misleading users whose real problem was a permission
 * error or a missing ROUTER_API_KEY (#3606). The returned string is a controlled,
 * secret-free diagnostic (it carries no stack and no credentials). (#3606)
 */
export function interpretMitmStartupError(stderr: string, port: number): string {
  const text = (stderr || "").trim();
  const lower = text.toLowerCase();

  if (lower.includes("already in use")) {
    return `MITM server failed to start: port ${port} is already in use`;
  }
  if (lower.includes("permission denied")) {
    return `MITM server failed to start: permission denied for port ${port} (run with elevated privileges, or use a port ≥ 1024)`;
  }
  if (lower.includes("router_api_key")) {
    return "MITM server failed to start: no API key was provided (ROUTER_API_KEY is required). Set a router API key in OmniRoute and retry.";
  }

  // Surface the first "❌ <message>" diagnostic line verbatim (marker stripped),
  // so any other server.cjs failure is reported with its real cause.
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("❌")) {
      const detail = trimmed.replace(/^❌\s*/, "").trim();
      if (detail) return `MITM server failed to start: ${detail}`;
    }
  }

  // Nothing diagnostic was captured — stay generic instead of guessing port 443.
  return "MITM server failed to start (no diagnostic output was captured from the MITM server)";
}

// Store server process
let serverProcess: ChildProcess | null = null;
let serverPid: number | null = null;

// Module-scoped password cache (not exposed on globalThis).
// Cleared automatically when the MITM proxy is stopped.
let _cachedPassword: string | null = null;
export function getCachedPassword(): string | null {
  return _cachedPassword;
}
export function setCachedPassword(pwd: string | null | undefined): void {
  _cachedPassword = pwd || null;
}
export function clearCachedPassword(): void {
  _cachedPassword = null;
}

const PID_FILE = path.join(resolveMitmDataDir(), "mitm", ".mitm.pid");
const TARGETS_JSON_FILE = path.join(resolveMitmDataDir(), "mitm", "targets.json");
const BYPASS_JSON_FILE = path.join(resolveMitmDataDir(), "mitm", "bypass.json");
const CA_PATH_FILE = path.join(resolveMitmDataDir(), "mitm", "upstream-ca.path");

/** Read the persisted upstream CA path written by the POST upstream-ca route handler. */
function readStoredUpstreamCaPath(): string | null {
  try {
    if (!fs.existsSync(CA_PATH_FILE)) return null;
    const raw = fs.readFileSync(CA_PATH_FILE, "utf8").trim();
    return raw || null;
  } catch {
    return null;
  }
}

/**
 * Write the canonical `targets.json` consumed by `server.cjs` at startup.
 *
 * The file mirrors the static `ALL_TARGETS` registry; server.cjs treats it as
 * an extension of its baseline antigravity hosts. Hard Rule #13: only the
 * declarative target hosts are persisted — no runtime paths, no shell escapes.
 */
export function writeTargetsJson(targets: MitmTarget[] = ALL_TARGETS): void {
  const dir = path.join(resolveMitmDataDir(), "mitm");
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch {
    // mkdir failures are non-fatal; the write below will report the real error.
  }
  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    targets: targets.map((t) => ({
      id: t.id,
      name: t.name,
      hosts: t.hosts,
      endpointPatterns: t.endpointPatterns,
      viability: t.viability ?? "supported",
    })),
  };
  fs.writeFileSync(TARGETS_JSON_FILE, JSON.stringify(payload, null, 2));
}

/**
 * Write the canonical `bypass.json` file consumed by `server.cjs` at startup.
 *
 * Only USER-configured patterns are persisted here — the default bypass
 * regexes (banks/gov/okta/auth0) live hard-coded in `server.cjs` and in
 * `src/mitm/passthrough.ts` so they apply even when the file is missing.
 *
 * Plan reference: 11-agent-bridge.plan.md §4.6 + master-plan-group-A.md §3.7.
 * Hard Rule #13: no shell interpolation, file only.
 */
export function writeBypassJson(userPatterns?: string[]): void {
  const dir = path.join(resolveMitmDataDir(), "mitm");
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch {
    // mkdir failures are non-fatal; the write below will report the real error.
  }
  const patterns =
    Array.isArray(userPatterns) && userPatterns.length >= 0
      ? userPatterns
      : getUserBypassPatterns();
  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    patterns,
  };
  fs.writeFileSync(BYPASS_JSON_FILE, JSON.stringify(payload, null, 2));
}

export interface AgentStatus {
  id: AgentId;
  name: string;
  hosts: string[];
  viability: "supported" | "investigating" | "deprecated";
  detection: DetectionResult;
}

/**
 * Aggregate every registered MITM target with its current installation
 * detection result. Read-only — used by the AgentBridge dashboard.
 */
export function getAllAgentsStatus(): AgentStatus[] {
  return ALL_TARGETS.map((t) => ({
    id: t.id,
    name: t.name,
    hosts: t.hosts,
    viability: t.viability ?? "supported",
    detection: detectAgent(t.id),
  }));
}
const MITM_SERVER_URL = new URL("./server.cjs", import.meta.url);
const urlPath =
  process.platform === "win32" && MITM_SERVER_URL.pathname.startsWith("/")
    ? decodeURIComponent(MITM_SERVER_URL.pathname.slice(1))
    : decodeURIComponent(MITM_SERVER_URL.pathname);

const cwdPath = path.join(process.cwd(), "src", "mitm", "server.cjs");
const MITM_SERVER_PATH = fs.existsSync(cwdPath) ? cwdPath : urlPath;

// Check if a PID is alive
function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * Enumerate every hostname OmniRoute may have written to /etc/hosts during
 * startMitm(): the full agent-target registry plus all custom hosts. Removal
 * via removeDNSEntries() is idempotent (absent entries are skipped), so this
 * set is intentionally over-inclusive — a host that was never spoofed costs
 * nothing to "remove", but a host we forget to list leaks machine-wide.
 * (Gap 8 — clean-stop DNS leak.)
 */
export function collectManagedHosts(): string[] {
  const hosts = new Set<string>();
  for (const target of ALL_TARGETS) {
    for (const h of target.hosts) hosts.add(h);
  }
  try {
    for (const ch of listCustomHosts()) hosts.add(ch.host);
  } catch (err) {
    log.error({ err }, "collectManagedHosts: failed to read custom hosts (continuing)");
  }
  return [...hosts];
}

/**
 * Get MITM status
 */
export async function getMitmStatus(): Promise<{
  running: boolean;
  pid: number | null;
  dnsConfigured: boolean;
  certExists: boolean;
}> {
  // Check in-memory process first, then fallback to PID file
  let running = serverProcess !== null && !serverProcess.killed;
  let pid = serverPid;

  if (!running) {
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
        if (savedPid && isProcessAlive(savedPid)) {
          running = true;
          pid = savedPid;
        } else {
          // Stale PID file, clean up
          fs.unlinkSync(PID_FILE);
        }
      }
    } catch {
      // Ignore
    }
  }

  // Check DNS configuration
  let dnsConfigured = false;
  try {
    const hostsContent = fs.readFileSync("/etc/hosts", "utf-8");
    dnsConfigured = /\bdaily-cloudcode-pa\.googleapis\.com\b/.test(hostsContent);
  } catch {
    // Ignore
  }

  // Check cert
  const certDir = path.join(resolveMitmDataDir(), "mitm");
  const certExists = fs.existsSync(path.join(certDir, "server.crt"));

  return { running, pid, dnsConfigured, certExists };
}

/**
 * Start MITM proxy
 * @param {string} apiKey - OmniRoute API key
 * @param {string} sudoPassword - Sudo password for DNS/cert operations
 */
export async function startMitm(
  apiKey: string,
  sudoPassword: string,
  options: { port?: number } = {}
): Promise<{ running: true; pid: number | null }> {
  // Check if already running
  if (serverProcess && !serverProcess.killed) {
    throw new Error("MITM proxy is already running");
  }

  // 0. Persist the canonical targets.json so server.cjs can pick up the full
  //    AgentBridge target registry alongside its hard-coded antigravity baseline.
  try {
    writeTargetsJson();
  } catch (err) {
    log.error({ err }, "Failed to write targets.json (continuing)");
  }

  // 0b. Persist the user bypass patterns to bypass.json so server.cjs can
  //     route CONNECT tunnels for those hostnames without TLS decryption.
  //     Defaults (banks/gov/okta/auth0) are hard-coded in server.cjs.
  try {
    writeBypassJson();
  } catch (err) {
    log.error({ err }, "Failed to write bypass.json (continuing)");
  }

  // 0c. Apply upstream CA certificate (env var wins over stored path).
  //     Spec: plan 11 §4.7 + acceptance criterion §12 #18.
  try {
    const storedCaPath = readStoredUpstreamCaPath();
    const activeCaPath = process.env.AGENTBRIDGE_UPSTREAM_CA_CERT || storedCaPath;
    if (activeCaPath) {
      configureUpstreamCa(activeCaPath);
      log.info({ caPath: activeCaPath }, "Upstream CA certificate configured");
    }
  } catch (err) {
    log.error(
      { err },
      `AGENTBRIDGE_UPSTREAM_CA_CERT path invalid: ${(err as Error).message ?? err} (continuing without custom CA)`
    );
  }

  // 1. Generate SSL certificate if not exists
  const certPath = path.join(resolveMitmDataDir(), "mitm", "server.crt");
  if (!fs.existsSync(certPath)) {
    log.info("Generating SSL certificate...");
    await generateCert();
  }

  // 2. Install certificate to system keychain
  await installCert(sudoPassword, certPath);

  // 3. Add DNS entries: Antigravity defaults + all agents with dns_enabled=true +
  //    all custom hosts with enabled=true.
  log.info("Adding DNS entries...");
  await addDNSEntry(sudoPassword);

  // Collect hosts from agents that have dns_enabled=true in the DB.
  try {
    const agentStates = getAllAgentBridgeStates();
    const agentHostsToAdd: string[] = [];
    for (const state of agentStates) {
      if (!state.dns_enabled) continue;
      const target = ALL_TARGETS.find((t) => t.id === state.agent_id);
      if (target) {
        agentHostsToAdd.push(...target.hosts);
      }
    }
    if (agentHostsToAdd.length > 0) {
      log.info({ count: agentHostsToAdd.length }, "Adding DNS for agent host(s)...");
      await addDNSEntries(agentHostsToAdd, sudoPassword);
    }
  } catch (err) {
    log.error({ err }, "Failed to add agent DNS entries (continuing)");
  }

  // Collect enabled custom hosts.
  try {
    const customHosts = listCustomHosts({ enabledOnly: true });
    const customHostNames = customHosts.map((h) => h.host);
    if (customHostNames.length > 0) {
      log.info({ count: customHostNames.length }, "Adding DNS for custom host(s)...");
      await addDNSEntries(customHostNames, sudoPassword);
    }
  } catch (err) {
    log.error({ err }, "Failed to add custom host DNS entries (continuing)");
  }

  // 4. Start MITM server
  log.info("Starting MITM server...");
  const port =
    typeof options.port === "number" &&
    Number.isInteger(options.port) &&
    options.port > 0 &&
    options.port <= 65535
      ? options.port
      : 443;
  serverProcess = spawn(process.execPath, [MITM_SERVER_PATH], {
    env: {
      ...process.env,
      ROUTER_API_KEY: apiKey,
      MITM_LOCAL_PORT: String(port),
      NODE_ENV: "production",
    },
    detached: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const proc = serverProcess;
  serverPid = proc.pid ?? null;

  // Save PID to file
  if (serverPid !== null) {
    fs.writeFileSync(PID_FILE, String(serverPid));
  }

  // Buffer recent stderr so a startup failure can be reported with its real
  // cause (capped to avoid unbounded growth on a chatty/looping process). (#3606)
  let stderrBuffer = "";

  // Log server output
  proc.stdout?.on("data", (data) => {
    log.info({ source: "mitm-server" }, data.toString().trim());
  });

  proc.stderr?.on("data", (data) => {
    const chunk = data.toString();
    stderrBuffer = (stderrBuffer + chunk).slice(-4000);
    log.error({ source: "mitm-server" }, chunk.trim());
  });

  proc.on("exit", (code) => {
    log.info({ exitCode: code }, "MITM server exited");
    serverProcess = null;
    serverPid = null;

    // Remove PID file
    try {
      fs.unlinkSync(PID_FILE);
    } catch (error) {
      // Ignore
    }
  });

  // Wait and verify server actually started
  const started = await new Promise<boolean>((resolve) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(true);
      }
    }, 2000);

    proc.on("exit", () => {
      clearTimeout(timeout);
      if (!resolved) {
        resolved = true;
        resolve(false);
      }
    });

    // Fail fast on any "❌" diagnostic line from server.cjs (covers EADDRINUSE,
    // EACCES, missing ROUTER_API_KEY, and any other server.on("error") cause).
    proc.stderr?.on("data", (data) => {
      const msg = data.toString();
      if (msg.includes("❌")) {
        clearTimeout(timeout);
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      }
    });
  });

  if (!started) {
    throw new Error(interpretMitmStartupError(stderrBuffer, port));
  }

  return {
    running: true,
    pid: serverPid,
  };
}

/**
 * Stop MITM proxy
 * @param {string} sudoPassword - Sudo password for DNS cleanup
 */
export async function stopMitm(sudoPassword: string): Promise<{ running: false; pid: null }> {
  // 1. Kill server process (in-memory or from PID file)
  const proc = serverProcess;
  if (proc && !proc.killed) {
    log.info("Stopping MITM server...");
    proc.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!proc.killed) {
      proc.kill("SIGKILL");
    }
    serverProcess = null;
    serverPid = null;
  } else {
    // Fallback: kill by PID file
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, "utf-8").trim(), 10);
        if (savedPid && isProcessAlive(savedPid)) {
          log.info({ pid: savedPid }, "Killing MITM server by PID...");
          process.kill(savedPid, "SIGTERM");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (isProcessAlive(savedPid)) {
            process.kill(savedPid, "SIGKILL");
          }
        }
      }
    } catch {
      // Ignore
    }
    serverProcess = null;
    serverPid = null;
  }

  // 2. Remove DNS entries — Antigravity defaults PLUS every agent + custom host
  //    that startMitm() may have spoofed. removeDNSEntries is idempotent, so
  //    over-inclusion is safe; under-inclusion leaks /etc/hosts lines that
  //    hijack resolution machine-wide after stop (Gap 8).
  log.info("Removing DNS entries...");
  await removeDNSEntry(sudoPassword);
  try {
    const managed = collectManagedHosts();
    if (managed.length > 0) {
      await removeDNSEntries(managed, sudoPassword);
    }
  } catch (err) {
    log.error({ err }, "Failed to remove managed DNS entries during stop (continuing)");
  }

  // 3. Clean up
  clearCachedPassword(); // Clear password from memory when proxy stops
  try {
    fs.unlinkSync(PID_FILE);
  } catch (error) {
    // Ignore
  }

  return {
    running: false,
    pid: null,
  };
}
