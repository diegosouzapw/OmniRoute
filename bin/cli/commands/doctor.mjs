import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { createDecipheriv, scryptSync } from "node:crypto";
import { pathToFileURL } from "node:url";
import { parseArgs, getStringFlag, hasFlag } from "../args.mjs";
import { resolveDataDir, resolveStoragePath } from "../data-dir.mjs";
import { printHeading } from "../io.mjs";

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

async function loadBetterSqlite() {
  try {
    return (await import("better-sqlite3")).default;
  } catch (error) {
    return { error };
  }
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

  const Database = await loadBetterSqlite();
  if (Database.error) {
    return fail("Database", "better-sqlite3 could not be loaded", {
      error: Database.error instanceof Error ? Database.error.message : String(Database.error),
    });
  }

  let db;
  try {
    db = new Database(dbPath, { readonly: true, fileMustExist: true });
    const quickCheck = db.prepare("PRAGMA quick_check").get();
    const quickCheckValue = Object.values(quickCheck || {})[0];
    if (quickCheckValue !== "ok") {
      return fail("Database", `SQLite quick_check failed: ${quickCheckValue}`, { dbPath });
    }

    const migrationsDir = resolveMigrationsDir(rootDir);
    const migrationFiles = readMigrationFiles(migrationsDir);
    if (migrationFiles.length === 0) {
      return ok("Database", "SQLite quick_check passed", { dbPath, migrations: "not_checked" });
    }

    const table = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("_omniroute_migrations");
    if (!table) {
      return warn("Database", "SQLite is readable, but migration table is missing", { dbPath });
    }

    const appliedRows = db
      .prepare("SELECT version FROM _omniroute_migrations")
      .all()
      .map((row) => row.version);
    const applied = new Set(appliedRows);
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
  } finally {
    if (db) db.close();
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

  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(ivHex, "hex"));
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
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

  const Database = await loadBetterSqlite();
  if (Database.error) {
    return fail("Storage/encryption", "Could not inspect encrypted credentials", {
      error: Database.error instanceof Error ? Database.error.message : String(Database.error),
    });
  }

  let db;
  try {
    db = new Database(dbPath, { readonly: true, fileMustExist: true });
    const hasProviderTable = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
      .get("provider_connections");
    if (!hasProviderTable) {
      return secret
        ? ok("Storage/encryption", "Encryption key is configured; provider table not initialized")
        : warn("Storage/encryption", "No STORAGE_ENCRYPTION_KEY configured; passthrough mode");
    }

    const rows = db
      .prepare(
        `SELECT api_key, access_token, refresh_token, id_token
         FROM provider_connections
         WHERE api_key LIKE 'enc:v1:%'
            OR access_token LIKE 'enc:v1:%'
            OR refresh_token LIKE 'enc:v1:%'
            OR id_token LIKE 'enc:v1:%'
         LIMIT 20`
      )
      .all();
    const encryptedValues = rows.flatMap((row) =>
      ["api_key", "access_token", "refresh_token", "id_token"]
        .filter((key) => typeof row[key] === "string" && row[key].startsWith("enc:v1:"))
        .map((key) => row[key])
    );

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
  } finally {
    if (db) db.close();
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

async function checkNativeBinary(rootDir) {
  const candidates = [
    path.join(
      rootDir,
      "app",
      "node_modules",
      "better-sqlite3",
      "build",
      "Release",
      "better_sqlite3.node"
    ),
    path.join(rootDir, "node_modules", "better-sqlite3", "build", "Release", "better_sqlite3.node"),
  ];
  const binaryPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!binaryPath) {
    return warn("Native binary", "better-sqlite3 native binary was not found", { candidates });
  }

  try {
    const { isNativeBinaryCompatible } = await import(
      pathToFileURL(path.join(rootDir, "scripts", "native-binary-compat.mjs")).href
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

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
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

async function checkServerLiveness(options = {}) {
  const url = resolveLivenessUrl(options);

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) {
      return warn("Server liveness", `Server responded with HTTP ${response.status}`, { url });
    }
    return ok("Server liveness", "Server health endpoint is reachable", { url });
  } catch {
    return warn("Server liveness", "Server health endpoint is not reachable", { url });
  }
}

export async function collectDoctorChecks(context = {}, options = {}) {
  const rootDir =
    context.rootDir ||
    path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..", "..");
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

  if (!options.skipLiveness) {
    checks.push(await checkServerLiveness(options));
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

function printDoctorHelp() {
  console.log(`
Usage:
  omniroute doctor
  omniroute doctor --json
  omniroute doctor --no-liveness
  omniroute doctor --host 0.0.0.0

Options:
  --json                 Print machine-readable JSON
  --no-liveness          Skip HTTP health endpoint probing
  --host <host>          Host for server liveness probing (default: 127.0.0.1)
  --liveness-url <url>   Full health endpoint URL override

Checks:
  config, database, storage/encryption, ports, Node runtime, native binary, memory, server liveness
`);
}

function printCheck(check) {
  const label = check.status.toUpperCase().padEnd(4);
  const color =
    check.status === "ok" ? "\x1b[32m" : check.status === "warn" ? "\x1b[33m" : "\x1b[31m";
  console.log(`${color}${label}\x1b[0m ${check.name}: ${check.message}`);
}

export async function runDoctorCommand(argv, context = {}) {
  const { flags } = parseArgs(argv);
  if (hasFlag(flags, "help") || hasFlag(flags, "h")) {
    printDoctorHelp();
    return 0;
  }

  const result = await collectDoctorChecks(context, {
    skipLiveness: hasFlag(flags, "no-liveness"),
    livenessHost: getStringFlag(flags, "host"),
    livenessUrl: getStringFlag(flags, "liveness-url"),
  });

  if (hasFlag(flags, "json")) {
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
