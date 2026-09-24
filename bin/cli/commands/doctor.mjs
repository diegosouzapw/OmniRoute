import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { createDecipheriv, scryptSync } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isLoopbackUrl } from "../api.mjs";
import { resolveDataDir, resolveStoragePath } from "../data-dir.mjs";
import { getCliToken, CLI_TOKEN_HEADER } from "../utils/cliToken.mjs";
import { printHeading } from "../io.mjs";
import { t } from "../i18n.mjs";
import { readDatabaseHealth, readEncryptedCredentialSamples } from "../sqlite.mjs";
import { getCrashLogPath } from "../runtime/processSupervisor.mjs";
import { prebuiltBinaryName } from "../runtime/nativeDeps.mjs";
const STATIC_SALT = "omniroute-field-encryption-v1";
const KEY_LENGTH = 32;
const CHECK_TIMEOUT_MS = 2000;

function ok(name, message, details = {}) {
  return { name, status: "ok", message, details };
}

function warn(name, message, details = {}) {
  return { name, status: "warn", message, details };
}

function fail(name, message, details = {}) {
  return { name, status: "fail", message, details };
}

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

function parseConfiguredPort(value) {
  if (value === undefined || value === null || value === "") return { valid: true, port: null };
  const parsed = Number.parseInt(String(value), 10);
  return {
    valid: Number.isFinite(parsed) && parsed > 0 && parsed <= 65535,
    port: parsed,
  };
}

function formatBytes(bytes) {
  const gb = bytes / 1024 / 1024 / 1024;
  return `${gb.toFixed(1)} GB`;
}

function findEnvFileCandidates(dataDir) {
  const candidates = [];
  if (process.env.DATA_DIR) candidates.push(path.join(process.env.DATA_DIR, ".env"));
  candidates.push(path.join(dataDir, ".env"));
  candidates.push(path.join(process.cwd(), ".env"));
  return [...new Set(candidates)];
}

function checkConfig(dataDir) {
  const envCandidates = findEnvFileCandidates(dataDir);
  const envFile = envCandidates.find((candidate) => fs.existsSync(candidate));
  const portChecks = [
    ["PORT", process.env.PORT],
    ["API_PORT", process.env.API_PORT],
    ["DASHBOARD_PORT", process.env.DASHBOARD_PORT],
  ].map(([name, value]) => ({ name, value, ...parseConfiguredPort(value) }));
  const invalidPorts = portChecks.filter((item) => !item.valid);

  if (invalidPorts.length > 0) {
    return fail(
      "Config",
      `Invalid port setting: ${invalidPorts.map((item) => item.name).join(", ")}`,
      { envFile: envFile || null, invalidPorts }
    );
  }

  if (!envFile) {
    return warn("Config", ".env file not found; using defaults and process environment", {
      checked: envCandidates,
    });
  }

  return ok("Config", `.env found at ${envFile}`, { envFile });
}

function resolveMigrationsDir(rootDir) {
  const configured = process.env.OMNIROUTE_MIGRATIONS_DIR;
  const candidates = [
    configured,
    path.join(rootDir, "src", "lib", "db", "migrations"),
    path.join(rootDir, "app", "src", "lib", "db", "migrations"),
    path.join(process.cwd(), "src", "lib", "db", "migrations"),
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function readMigrationFiles(migrationsDir) {
  if (!migrationsDir) return [];
  return fs
    .readdirSync(migrationsDir)
    .filter((file) => /^\d+_.+\.sql$/.test(file))
    .sort()
    .map((file) => {
      const [, version, name] = file.match(/^(\d+)_(.+)\.sql$/) || [];
      return { version, name, file };
    });
}

async function checkDatabase(dbPath, rootDir) {
  if (!fs.existsSync(dbPath)) {
    return warn("Database", `SQLite database not found at ${dbPath}`, { dbPath });
  }

  try {
    const { quickCheckValue, hasMigrationTable, appliedMigrationVersions } =
      await readDatabaseHealth(dbPath);
    if (quickCheckValue !== "ok") {
      return fail("Database", `SQLite quick_check failed: ${quickCheckValue}`, { dbPath });
    }

    const migrationsDir = resolveMigrationsDir(rootDir);
    const migrationFiles = readMigrationFiles(migrationsDir);
    if (migrationFiles.length === 0) {
      return ok("Database", "SQLite quick_check passed", { dbPath, migrations: "not_checked" });
    }

    if (!hasMigrationTable) {
      return warn("Database", "SQLite is readable, but migration table is missing", { dbPath });
    }

    const applied = new Set(appliedMigrationVersions);
    const pending = migrationFiles.filter((migration) => !applied.has(migration.version));

    if (pending.length > 0) {
      return warn("Database", `${pending.length} migration(s) appear pending`, {
        dbPath,
        pending: pending.map((migration) => migration.file),
      });
    }

    return ok("Database", "SQLite quick_check passed and migrations look current", { dbPath });
  } catch (error) {
    return fail("Database", "SQLite database could not be read", {
      dbPath,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function deriveStorageKey() {
  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (!secret) return null;
  return scryptSync(secret, STATIC_SALT, KEY_LENGTH);
}

function decryptCredentialSample(value, key) {
  const prefix = "enc:v1:";
  const body = value.slice(prefix.length);
  const [ivHex, encryptedHex, authTagHex] = body.split(":");
  if (!ivHex || !encryptedHex || !authTagHex) throw new Error("Malformed encrypted value");

  const authTagBuf = Buffer.from(authTagHex, "hex");
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivHex, "hex"), {
    authTagLength: authTagBuf.length,
  });
  decipher.setAuthTag(authTagBuf);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

async function checkStorageEncryption(dbPath) {
  const secret = process.env.STORAGE_ENCRYPTION_KEY;
  if (secret !== undefined && String(secret).trim() === "") {
    return fail("Storage/encryption", "STORAGE_ENCRYPTION_KEY is set but empty");
  }

  if (!fs.existsSync(dbPath)) {
    return secret
      ? ok("Storage/encryption", "Encryption key is configured; database not initialized yet")
      : warn("Storage/encryption", "No STORAGE_ENCRYPTION_KEY configured; passthrough mode");
  }

  try {
    const { hasProviderTable, encryptedValues } = await readEncryptedCredentialSamples(dbPath);
    if (!hasProviderTable) {
      return secret
        ? ok("Storage/encryption", "Encryption key is configured; provider table not initialized")
        : warn("Storage/encryption", "No STORAGE_ENCRYPTION_KEY configured; passthrough mode");
    }

    if (encryptedValues.length === 0) {
      return secret
        ? ok("Storage/encryption", "Encryption key is configured; no encrypted samples found")
        : warn(
            "Storage/encryption",
            "No STORAGE_ENCRYPTION_KEY configured; credentials are plaintext"
          );
    }

    if (!secret) {
      return fail(
        "Storage/encryption",
        "Encrypted credentials exist but STORAGE_ENCRYPTION_KEY is missing",
        { encryptedSamples: encryptedValues.length }
      );
    }

    const key = deriveStorageKey();
    for (const value of encryptedValues) {
      decryptCredentialSample(value, key);
    }

    return ok("Storage/encryption", "Encrypted credential samples decrypt successfully", {
      encryptedSamples: encryptedValues.length,
    });
  } catch (error) {
    return fail("Storage/encryption", "Encrypted credential check failed", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function checkPort(port, label) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        resolve(warn("Port availability", `${label} port ${port} is already in use`, { port }));
      } else {
        resolve(
          warn("Port availability", `${label} port ${port} could not be checked`, {
            port,
            error: error.message,
          })
        );
      }
    });

    server.once("listening", () => {
      server.close(() => {
        resolve(ok("Port availability", `${label} port ${port} is available`, { port }));
      });
    });

    server.listen(port, "127.0.0.1");
  });
}

async function checkPorts() {
  const port = parsePort(process.env.PORT || "20128", 20128);
  const apiPort = parsePort(process.env.API_PORT || String(port), port);
  const dashboardPort = parsePort(process.env.DASHBOARD_PORT || String(port), port);
  const checks = await Promise.all([
    checkPort(dashboardPort, "Dashboard"),
    apiPort === dashboardPort ? Promise.resolve(null) : checkPort(apiPort, "API"),
  ]);
  const results = checks.filter(Boolean);
  const failResult = results.find((result) => result.status === "fail");
  if (failResult) return failResult;
  const warnResults = results.filter((result) => result.status === "warn");
  if (warnResults.length > 0) {
    return warn("Port availability", warnResults.map((result) => result.message).join("; "), {
      ports: { apiPort, dashboardPort },
    });
  }
  return ok("Port availability", "Configured port(s) are available", {
    ports: { apiPort, dashboardPort },
  });
}

async function checkNodeRuntime(rootDir) {
  try {
    const { getNodeRuntimeSupport } = await import(
      pathToFileURL(path.join(rootDir, "bin", "nodeRuntimeSupport.mjs")).href
    );
    const support = getNodeRuntimeSupport();
    if (!support.nodeCompatible) {
      return fail("Node runtime", `${support.nodeVersion} is outside supported policy`, support);
    }
    return ok("Node runtime", `${support.nodeVersion} is supported`, support);
  } catch {
    // nodeRuntimeSupport.mjs is only available in full source installs, not in Docker images
    const version = process.version;
    return warn(
      "Node runtime",
      `${version} (runtime support module unavailable in this environment)`,
      { nodeVersion: version }
    );
  }
}

/**
 * Name of the prebuilt binary better-sqlite3 ships for this platform.
 * Canonical definition now lives in nativeDeps.mjs (#14355 — doctor and
 * `runtime check` used to each implement their own binary-layout detection
 * and could disagree on the same install); re-exported here so existing
 * imports of `prebuiltBinaryName` from this module keep working.
 */
export { prebuiltBinaryName };

async function checkNativeBinary(rootDir) {
  // node-gyp layout — present only when better-sqlite3 was compiled locally.
  const buildRoots = [
    path.join(rootDir, "app", "node_modules", "better-sqlite3"),
    path.join(rootDir, "dist", "node_modules", "better-sqlite3"),
    path.join(rootDir, "node_modules", "better-sqlite3"),
  ];
  const prebuildName = prebuiltBinaryName();
  const candidates = [
    ...buildRoots.map((root) => path.join(root, "build", "Release", "better_sqlite3.node")),
    // Prebuilt layout — what `npm i -g omniroute` actually installs. Without
    // these, doctor warns on every prebuilt install even though the binary is
    // present and loading fine.
    ...buildRoots.map((root) => path.join(root, "prebuilds", prebuildName)),
  ];
  const binaryPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!binaryPath) {
    return warn("Native binary", "better-sqlite3 native binary was not found", { candidates });
  }

  try {
    const { isNativeBinaryCompatible } = await import(
      pathToFileURL(path.join(rootDir, "scripts", "build", "native-binary-compat.mjs")).href
    );
    const compatible = isNativeBinaryCompatible(binaryPath);
    if (!compatible) {
      return fail("Native binary", "better-sqlite3 native binary is incompatible", { binaryPath });
    }
    return ok("Native binary", "better-sqlite3 native binary is compatible", { binaryPath });
  } catch {
    // native-binary-compat.mjs is only available in full source installs, not in Docker images
    return warn("Native binary", "Compatibility check unavailable in this environment", {
      binaryPath,
    });
  }
}

function checkMemory() {
  const configured = process.env.OMNIROUTE_MEMORY_MB || "512";
  const memoryMb = Number.parseInt(configured, 10);
  if (!Number.isFinite(memoryMb) || memoryMb < 64 || memoryMb > 16384) {
    return fail("Memory", `Invalid OMNIROUTE_MEMORY_MB: ${configured}`, { configured });
  }

  const total = os.totalmem();
  const free = os.freemem();
  const requestedBytes = memoryMb * 1024 * 1024;
  if (requestedBytes > total) {
    return warn(
      "Memory",
      `Requested memory ${memoryMb} MB exceeds total RAM ${formatBytes(total)}`,
      {
        memoryMb,
        totalBytes: total,
        freeBytes: free,
      }
    );
  }

  return ok("Memory", `${memoryMb} MB limit configured; ${formatBytes(free)} free`, {
    memoryMb,
    totalBytes: total,
    freeBytes: free,
  });
}

// #13538: surfaces the supervisor's give-up crash record (persisted by
// ServerSupervisor.persistCrashLog(), bin/cli/runtime/processSupervisor.mjs)
// so a user whose `--tray` worker died silently (detached, stdio:"ignore")
// has something concrete `doctor` can point at without needing `--log`.
function checkCrashLog() {
  const crashLogPath = getCrashLogPath();
  if (!fs.existsSync(crashLogPath)) {
    return ok("Crash log", "No supervisor crash record found", { crashLogPath });
  }

  try {
    const stat = fs.statSync(crashLogPath);
    const contents = fs.readFileSync(crashLogPath, "utf8");
    const lastEntry = contents.split("\n").filter(Boolean).slice(-6).join("\n");
    return warn(
      "Crash log",
      `Supervisor recorded a give-up crash at ${crashLogPath} (last modified ${stat.mtime.toISOString()})`,
      { crashLogPath, modifiedAt: stat.mtime.toISOString(), tail: lastEntry }
    );
  } catch (error) {
    return warn("Crash log", `Crash record exists at ${crashLogPath} but could not be read`, {
      crashLogPath,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function formatHostForUrl(host) {
  return host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
}

function resolveLivenessUrl(options = {}) {
  const explicitUrl = options.livenessUrl || process.env.OMNIROUTE_DOCTOR_LIVENESS_URL;
  if (explicitUrl) return explicitUrl;

  const port = parsePort(process.env.PORT || "20128", 20128);
  const dashboardPort = parsePort(process.env.DASHBOARD_PORT || String(port), port);
  const host = String(options.livenessHost || process.env.OMNIROUTE_DOCTOR_HOST || "127.0.0.1")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

  return `http://${formatHostForUrl(host || "127.0.0.1")}:${dashboardPort}/api/health/degradation`;
}

async function probeUrl(url) {
  try {
    const response = await fetchWithTimeout(url);
    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

async function checkServerLiveness(options = {}) {
  const url = resolveLivenessUrl(options);

  // First attempt: configured health endpoint (may require auth token).
  const primary = await probeUrl(url);
  if (primary.ok) {
    return ok("Server liveness", "Server health endpoint is reachable", {
      url,
      status: primary.status,
    });
  }

  // #6162: /api/health and /api/health/degradation require a management token.
  // When unauthenticated, fall back to probing a publicly served static asset
  // (favicon.ico) to confirm the Next.js server is alive and reachable.
  // Derive the fallback URL from the primary URL (preserving protocol/host/port)
  // so custom liveness URL configurations are honored. Fall back to defaults
  // only if the primary URL can't be parsed.
  let fallbackUrl;
  try {
    const parsed = new URL(url);
    parsed.pathname = "/favicon.ico";
    parsed.search = "";
    parsed.hash = "";
    fallbackUrl = parsed.toString();
  } catch {
    const port = parsePort(process.env.PORT || "20128", 20128);
    const dashboardPort = parsePort(process.env.DASHBOARD_PORT || String(port), port);
    const host = String(options.livenessHost || process.env.OMNIROUTE_DOCTOR_HOST || "127.0.0.1")
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");
    fallbackUrl = `http://${formatHostForUrl(host || "127.0.0.1")}:${dashboardPort}/favicon.ico`;
  }
  const fallback = await probeUrl(fallbackUrl);

  if (fallback.ok) {
    return ok(
      "Server liveness",
      `Server reachable (health endpoint returned ${primary.status}, likely requires MANAGEMENT_TOKEN)`,
      {
        primaryUrl: url,
        primaryStatus: primary.status,
        fallbackUrl,
        fallbackStatus: fallback.status,
      }
    );
  }

  return warn(
    "Server liveness",
    `Server health endpoint returned HTTP ${primary.status || "no-response"} and fallback probe failed`,
    { primaryUrl: url, primaryStatus: primary.status, fallbackUrl, fallbackStatus: fallback.status }
  );
}

export async function checkMachineTokenAuth(options = {}) {
  if (process.env.OMNIROUTE_DISABLE_CLI_TOKEN === "true") {
    return warn("CLI machine token", "CLI machine-token authentication is disabled", {
      derived: false,
      accepted: false,
      disabled: true,
      tokenExposed: false,
    });
  }

  let url;
  try {
    const parsed = new URL(resolveLivenessUrl(options));
    if (
      !["http:", "https:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password ||
      !isLoopbackUrl(parsed.toString())
    ) {
      return warn(
        "CLI machine token",
        "Machine-token probes are limited to HTTP(S) loopback endpoints",
        { derived: false, accepted: false, tokenExposed: false }
      );
    }
    parsed.pathname = "/api/cli/whoami";
    parsed.search = "";
    parsed.hash = "";
    url = parsed.toString();
  } catch {
    return warn("CLI machine token", "Could not resolve the management endpoint", {
      derived: false,
      accepted: false,
      tokenExposed: false,
    });
  }

  const token = await getCliToken();
  if (!token) {
    return fail(
      "CLI machine token",
      "Could not derive a machine token; verify the node-machine-id runtime is installed",
      { derived: false, accepted: false, tokenExposed: false }
    );
  }

  try {
    const response = await fetchWithTimeout(url, {
      headers: { [CLI_TOKEN_HEADER]: token },
      redirect: "error",
    });
    if (response.ok) {
      return ok("CLI machine token", "Server accepted the local machine token", {
        url,
        status: response.status,
        derived: true,
        accepted: true,
        tokenExposed: false,
      });
    }
    if (response.status === 401 || response.status === 403) {
      return warn(
        "CLI machine token",
        "Server rejected the local machine token; if the CLI and server are on different hosts or container boundaries, run `omniroute connect <host> --key <oma_live_...>`",
        {
          url,
          status: response.status,
          derived: true,
          accepted: false,
          containerBoundaryLikely: true,
          tokenExposed: false,
        }
      );
    }
    return warn("CLI machine token", `Machine-token probe returned HTTP ${response.status}`, {
      url,
      status: response.status,
      derived: true,
      accepted: false,
      tokenExposed: false,
    });
  } catch {
    return warn("CLI machine token", "Machine-token endpoint could not be reached", {
      url,
      status: 0,
      derived: true,
      accepted: false,
      tokenExposed: false,
    });
  }
}

export async function collectDoctorChecks(context = {}, options = {}) {
  const rootDir =
    context.rootDir || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
  const dataDir = resolveDataDir();
  const dbPath = resolveStoragePath(dataDir);

  const checks = [];
  checks.push(checkConfig(dataDir));
  checks.push(await checkDatabase(dbPath, rootDir));
  checks.push(await checkStorageEncryption(dbPath));
  checks.push(await checkPorts());
  checks.push(await checkNodeRuntime(rootDir));
  checks.push(await checkNativeBinary(rootDir));
  checks.push(checkMemory());
  checks.push(checkCrashLog());

  if (!options.skipLiveness) {
    checks.push(await checkServerLiveness(options));
    checks.push(await checkMachineTokenAuth(options));
  }

  // CLI tool health checks
  try {
    const { collectCliToolChecks } = await import("../../../src/lib/cli-helper/doctor/checks.ts");
    const cliChecks = await collectCliToolChecks();
    checks.push(...cliChecks);
  } catch (err) {
    checks.push(warn("CLI Tools", `Could not run CLI tool checks: ${err.message}`));
  }

  return {
    dataDir,
    dbPath,
    checks,
    summary: {
      ok: checks.filter((check) => check.status === "ok").length,
      warn: checks.filter((check) => check.status === "warn").length,
      fail: checks.filter((check) => check.status === "fail").length,
    },
  };
}

function printCheck(check) {
  const label = check.status.toUpperCase().padEnd(4);
  const color =
    check.status === "ok" ? "\x1b[32m" : check.status === "warn" ? "\x1b[33m" : "\x1b[31m";
  console.log(`${color}${label}\x1b[0m ${check.name}: ${check.message}`);
}

export function registerDoctor(program) {
  program
    .command("doctor")
    .description(t("doctor.title"))
    .option("--no-liveness", "Skip HTTP health endpoint probing")
    .option("--host <host>", "Host for server liveness probing", "127.0.0.1")
    .option("--liveness-url <url>", "Full health endpoint URL override")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runDoctorCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runDoctorCommand(opts = {}, context = {}) {
  const isJson = (opts.output ?? "table") === "json";
  const skipLiveness = !(opts.liveness ?? true);

  const result = await collectDoctorChecks(context, {
    skipLiveness,
    livenessHost: opts.host,
    livenessUrl: opts.livenessUrl,
  });

  if (isJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    printHeading("OmniRoute Doctor");
    console.log(`Data dir: ${result.dataDir}`);
    console.log(`Database: ${result.dbPath}\n`);
    for (const check of result.checks) {
      printCheck(check);
    }
    console.log(
      `\nSummary: ${result.summary.ok} ok, ${result.summary.warn} warning(s), ${result.summary.fail} failure(s)`
    );
  }

  return result.summary.fail > 0 ? 1 : 0;
}
