import { spawn, type ChildProcess } from "child_process";
import path from "path";
import fs from "fs";
import { resolveMitmDataDir } from "./dataDir.ts";
import { removeDNSEntry, removeDNSEntries } from "./dns/dnsConfig.ts";
import { provisionDnsEntries } from "./dns/provision.ts";
import { generateCert } from "./cert/generate.ts";
import { installCertResult, uninstallCert } from "./cert/install.ts";
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

// Set while startMitm() is in flight, from the guard check through spawn.
// Guards a TOCTOU race: the "already running" check above only trips once
// `serverProcess` is assigned by spawn() — ~130 lines and several awaits
// later (DNS entries, cert generation, cert install). Two concurrent
// startMitm() calls would both pass that check before either assigns
// serverProcess. (upstream 9router#2316)
let mitmStarting = false;

/**
 * Attempt to acquire the single-flight "MITM server is starting" lock.
 * Returns `true` if acquired — the caller must release it via
 * `releaseMitmStartLock()` in a `finally` block — or `false` if another
 * `startMitm()` call already holds it. Exported so the concurrency guard is
 * unit-testable without exercising startMitm()'s full side effects
 * (DNS/cert/spawn).
 */
export function tryAcquireMitmStartLock(): boolean {
  if (mitmStarting) return false;
  mitmStarting = true;
  return true;
}

/** Release the single-flight start lock acquired via `tryAcquireMitmStartLock()`. */
export function releaseMitmStartLock(): void {
  mitmStarting = false;
}

// Set when getMitmStatus() finds a stale PID file (server died without clean
// teardown). The dashboard surfaces this to offer a one-click Repair. Cleared
// by repairMitm(). (Gap 7.)
let _orphanedStateDetected = false;

// Guards installCleanupHandlers() so the parent-process signal handlers are
// registered at most once. (Gap 7.)
let _cleanupHandlersInstalled = false;

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

export interface RepairPlan {
  dnsHostsToRemove: string[];
  removeCert: boolean;
  revertSystemProxy: boolean;
}

/**
 * Pure description of what a repair must undo. Separated from repairMitm() so
 * the enumeration is unit-testable without touching the OS or requiring sudo.
 * (Gap 7.)
 */
export function buildRepairPlan(): RepairPlan {
  return {
    dnsHostsToRemove: collectManagedHosts(),
    removeCert: true,
    revertSystemProxy: true,
  };
}

/**
 * Best-effort revert of an applied system proxy. The applied state lives
 * in-memory (captureState), so this only succeeds within the same process that
 * applied it; after a crash the previousState is gone and this is a no-op. DNS
 * + cert teardown are always reversible because they read on-disk state.
 */
async function revertSystemProxyIfApplied(): Promise<boolean> {
  try {
    const { getSystemProxyState, clearSystemProxy } = await import("@/lib/inspector/captureState");
    const state = getSystemProxyState();
    if (!state.applied || !state.previousState) return false;
    const { revert } = await import("./inspector/systemProxyConfig.ts");
    await revert(state.previousState);
    clearSystemProxy();
    return true;
  } catch (err) {
    log.error({ err }, "revertSystemProxyIfApplied failed (continuing)");
    return false;
  }
}

/**
 * Undo every system mutation startMitm() may have made, WITHOUT requiring the
 * MITM server to be running. Safe to call when state is already clean (every
 * step is idempotent). Used by: the /repair route, the CLI cleanup subcommand,
 * and the stale-PID auto-repair on app startup. (Gap 7 — the application-layer
 * analogue of ProxyBridge's destructor + `--cleanup`.)
 */
export async function repairMitm(sudoPassword: string): Promise<{ repaired: string[] }> {
  const plan = buildRepairPlan();
  const repaired: string[] = [];

  // 1. DNS — remove every host we may have spoofed (idempotent, reads /etc/hosts).
  try {
    await removeDNSEntry(sudoPassword);
    if (plan.dnsHostsToRemove.length > 0) {
      await removeDNSEntries(plan.dnsHostsToRemove, sudoPassword);
    }
    repaired.push("dns");
  } catch (err) {
    log.error({ err }, "repairMitm: DNS cleanup failed (continuing)");
  }

  // 2. Certificate — uninstall the MITM root CA from the trust store.
  if (plan.removeCert) {
    try {
      const certPath = path.join(resolveMitmDataDir(), "mitm", "server.crt");
      if (fs.existsSync(certPath)) {
        await uninstallCert(sudoPassword, certPath);
        repaired.push("cert");
      }
    } catch (err) {
      log.error({ err }, "repairMitm: cert removal failed (continuing)");
    }
  }

  // 3. System proxy — best-effort revert if applied in this process.
  if (plan.revertSystemProxy) {
    if (await revertSystemProxyIfApplied()) repaired.push("system-proxy");
  }

  // 4. Stale PID file.
  try {
    if (fs.existsSync(PID_FILE)) fs.unlinkSync(PID_FILE);
  } catch {
    // ignore
  }

  clearCachedPassword();
  _orphanedStateDetected = false;
  log.info({ repaired }, "repairMitm completed");
  return { repaired };
}

/**
 * Best-effort JS surrogate for ProxyBridge's library destructor + crash signal
 * handler. On SIGINT/SIGTERM we terminate the spawned child and, when a sudo
 * password is already cached for this session (getCachedPassword()), also
 * best-effort revert the privileged /etc/hosts entries — so a clean Ctrl+C /
 * tray-quit does not always leave orphaned state for a manual Repair. Without
 * a cached password we cannot prompt for one inside a signal handler, so we
 * fall back to flagging `_orphanedStateDetected`, exactly as before.
 * Idempotent; never blocks process exit. (Gap 7.)
 */
export function installCleanupHandlers(): void {
  if (_cleanupHandlersInstalled) return;
  _cleanupHandlersInstalled = true;
  const onSignal = (signal: string) => {
    void handleExitCleanup(signal);
  };
  process.once("SIGINT", () => onSignal("SIGINT"));
  process.once("SIGTERM", () => onSignal("SIGTERM"));
}

/**
 * Exit-cleanup body extracted from installCleanupHandlers() so it is directly
 * unit-testable (no real OS signal needs to be delivered to the test
 * process). Terminates the spawned MITM child, then:
 *   - if a sudo password is cached in this session, best-effort reverts every
 *     managed /etc/hosts entry via the same `removeDNSEntry` +
 *     `removeDNSEntries(collectManagedHosts())` pair stopMitm() uses, so the
 *     hosts file does not stay spoofed after a clean signal-driven exit;
 *   - otherwise flags `_orphanedStateDetected` (surfaced by getMitmStatus()
 *     for the dashboard's one-click Repair) — we have no way to prompt for a
 *     password inside a signal handler. (Gap 7.)
 * @param _depsOverride - optional dependency override, used in tests for DI.
 */
export async function handleExitCleanup(
  signal: string,
  _depsOverride?: {
    getCachedPassword?: () => string | null;
    removeDNSEntry?: (sudoPassword: string) => Promise<void>;
    removeDNSEntries?: (hosts: string[], sudoPassword: string) => Promise<void>;
    collectManagedHosts?: () => string[];
  }
): Promise<void> {
  const deps = {
    getCachedPassword: _depsOverride?.getCachedPassword ?? getCachedPassword,
    removeDNSEntry: _depsOverride?.removeDNSEntry ?? removeDNSEntry,
    removeDNSEntries: _depsOverride?.removeDNSEntries ?? removeDNSEntries,
    collectManagedHosts: _depsOverride?.collectManagedHosts ?? collectManagedHosts,
  };

  try {
    if (serverProcess && !serverProcess.killed) serverProcess.kill("SIGTERM");
  } catch {
    // ignore
  }

  const sudoPassword = deps.getCachedPassword();
  if (!sudoPassword) {
    _orphanedStateDetected = true;
    log.warn(
      { signal },
      "MITM parent received signal — child terminated; no cached sudo password, run Repair if DNS/CA/proxy were applied."
    );
    return;
  }

  try {
    await deps.removeDNSEntry(sudoPassword);
    const managed = deps.collectManagedHosts();
    if (managed.length > 0) {
      await deps.removeDNSEntries(managed, sudoPassword);
    }
    log.info(
      { signal },
      "MITM parent received signal — child terminated and privileged /etc/hosts entries reverted."
    );
  } catch (err) {
    _orphanedStateDetected = true;
    log.error(
      { err, signal },
      "MITM parent received signal — hosts cleanup failed; run Repair if DNS/CA/proxy were applied."
    );
  }
}

/**
 * Get MITM status
 */
export async function getMitmStatus(): Promise<{
  running: boolean;
  pid: number | null;
  dnsConfigured: boolean;
  certExists: boolean;
  orphanedStateDetected: boolean;
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
          // Stale PID file: the server died without clean teardown. We cannot
          // run privileged cleanup here (no sudo password in a status read),
          // so flag it for the dashboard to offer a one-click Repair. (Gap 7.)
          fs.unlinkSync(PID_FILE);
          _orphanedStateDetected = true;
          log.warn("Stale MITM PID file found — system state may be orphaned (offer Repair).");
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

  return {
    running,
    pid,
    dnsConfigured,
    certExists,
    orphanedStateDetected: _orphanedStateDetected,
  };
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
): Promise<{ running: true; pid: number | null; certTrusted: boolean }> {
  // Check if already running
  if (serverProcess && !serverProcess.killed) {
    throw new Error("MITM proxy is already running");
  }

  // Check if another startMitm() call is already in flight (TOCTOU guard —
  // see the `mitmStarting` comment above).
  if (!tryAcquireMitmStartLock()) {
    throw new Error("MITM server is already starting");
  }

  try {
    return await startMitmInternal(apiKey, sudoPassword, options);
  } finally {
    releaseMitmStartLock();
  }
}

/**
 * Internal body of startMitm(), extracted so the single-flight lock in
 * startMitm() cleanly wraps it in try/finally without re-indenting the
 * entire implementation.
 */
async function startMitmInternal(
  apiKey: string,
  sudoPassword: string,
  options: { port?: number }
): Promise<{ running: true; pid: number | null; certTrusted: boolean }> {
  // Register best-effort teardown on parent SIGINT/SIGTERM (Gap 7).
  installCleanupHandlers();

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

  // 2. Install certificate to system keychain. A failure here must NOT abort the
  //    bridge: in containers/headless the system trust store can't be written,
  //    so we start in "untrusted" mode and let the operator trust the CA by hand
  //    (mirrors the best-effort "continuing" pattern used for DNS below). (#4546)
  let certTrusted = false;
  try {
    const certResult = await installCertResult(sudoPassword, certPath);
    certTrusted = certResult.installed;
    if (!certResult.installed) {
      log.warn(
        { reason: certResult.reason },
        "MITM cert not auto-trusted; bridge starting in skip mode (manual trust required)"
      );
    }
  } catch (err) {
    log.error({ err }, "installCertResult threw unexpectedly (continuing without trusted cert)");
  }

  // 3. Add DNS entries: Antigravity defaults + all agents with dns_enabled=true +
  //    all custom hosts with enabled=true. Best-effort — see provisionDnsEntries.
  log.info("Adding DNS entries...");
  await provisionDnsEntries(sudoPassword);

  // 4. Start MITM server
  log.info("Starting MITM server...");
  const port =
    typeof options.port === "number" &&
    Number.isInteger(options.port) &&
    options.port > 0 &&
    options.port <= 65535
      ? options.port
      : 443;
  // D4 — resolve the inspector ingest token so the spawned proxy can post
  // captured AgentBridge traffic to the local-only ingest endpoint. The token
  // is shared with the OmniRoute process: getIngestTokenForBootstrap() returns
  // the same value the ingest route validates against (env or auto-generated).
  // Best-effort — if it cannot be resolved, the proxy simply skips capture.
  let ingestToken = process.env.INSPECTOR_INTERNAL_INGEST_TOKEN || "";
  if (!ingestToken) {
    try {
      const ingestMod = await import("@/app/api/tools/traffic-inspector/internal/ingest/route");
      if (typeof ingestMod.getIngestTokenForBootstrap === "function") {
        ingestToken = ingestMod.getIngestTokenForBootstrap();
      }
    } catch (err) {
      log.warn({ err }, "Could not resolve inspector ingest token; capture disabled");
    }
  }

  serverProcess = spawn(process.execPath, [MITM_SERVER_PATH], {
    env: {
      ...process.env,
      ROUTER_API_KEY: apiKey,
      MITM_LOCAL_PORT: String(port),
      INSPECTOR_INTERNAL_INGEST_TOKEN: ingestToken,
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
    certTrusted,
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
